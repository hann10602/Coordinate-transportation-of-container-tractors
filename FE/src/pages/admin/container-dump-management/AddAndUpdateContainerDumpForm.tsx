import { Button, Modal, notification } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../api/axios';
import { TDump } from '../../../types';
import { openNotification } from '../../../utils';
import { Map } from '../../web/solution/components/map/Map';
import { TAddAndUpdateContainerDump } from './types';
import { useEffect } from 'react';

type Props = {
  handleCloseModal: () => void;
  currentInstance?: TDump;
  setCurrentInstance: React.Dispatch<React.SetStateAction<TDump | undefined>>;
  handleGetList: () => void;
  isOpenAddAndUpdateForm: boolean;
  setIsOpenAddAndUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAndUpdateContainerDumpForm = ({
  handleCloseModal,
  currentInstance,
  setCurrentInstance,
  setIsOpenAddAndUpdateForm,
  isOpenAddAndUpdateForm,
  handleGetList
}: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm<TAddAndUpdateContainerDump>();

  const [api, contextHolder] = notification.useNotification();
  const latitudeWatch = watch('latitude');
  const longitudeWatch = watch('longitude');

  const handleSetLocation = (exp: LatLngExpression) => {
    setValue('latitude', (exp as any).lat);
    setValue('longitude', (exp as any).lng);
  };

  const handleSubmitAddForm = (e: TAddAndUpdateContainerDump) => {
    const result = currentInstance
      ? axiosInstance.put(`dump/${currentInstance.id}`, {
          ...e,
          latitude: e.latitude ? e.latitude : currentInstance.latitude,
          longitude: e.longitude ? e.longitude : currentInstance.longitude
        })
      : axiosInstance.post('dump', [
          {
            ...e,
            type: 'Container'
          }
        ]);

    result
      .then(() => {
        handleCloseModal();
        openNotification(api, 'success');
        handleGetList();
        reset();
        setCurrentInstance(undefined);
      })
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  useEffect(() => {
    setValue('title', currentInstance ? currentInstance.title : '');
  }, [currentInstance]);

  return (
    <Modal
      open={isOpenAddAndUpdateForm}
      footer={null}
      title={`${currentInstance ? 'Update' : 'Add'} container dump`}
      onCancel={() => {
        reset();
        setCurrentInstance(undefined);
        setIsOpenAddAndUpdateForm(false);
      }}
    >
      <div className="overflow-y-auto">
        {contextHolder}
        <div className="relative w-full space-y-2">
          <label className="mb-2 font-semibold" htmlFor="phoneNumber">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`${errors.title ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.title.message}</p>}
        </div>
        <div className="relative w-full space-y-2 mt-8">
          <label className="mb-2 font-semibold" htmlFor="phoneNumber">
            Position
          </label>
          <Map
            Location={latitudeWatch && longitudeWatch ? [Number(latitudeWatch), Number(longitudeWatch)] : undefined}
            setLocation={handleSetLocation}
          />
          <input
            type="text"
            className="hidden"
            value={latitudeWatch}
            {...register('latitude', { required: currentInstance ? false : 'Position is required' })}
          />
          {(errors.latitude || errors.latitude) && (
            <p className="text-red-400 absolute -bottom-7 mt-2">Position is required</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            className="text font-semibold mt-12 hover:bg-cyan-700 border-cyan-700 transition ease-in-out"
            onClick={handleSubmit(handleSubmitAddForm)}
          >
            {currentInstance ? 'Update' : 'Add'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
