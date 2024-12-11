import { Button, Modal, notification } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../api/axios';
import { TTruck } from '../../../types';
import { openNotification } from '../../../utils';
import { TAddAndUpdateTruck } from './types';

type Props = {
  handleCloseModal: () => void;
  currentInstance?: TTruck;
  setCurrentInstance: React.Dispatch<React.SetStateAction<TTruck | undefined>>;
  handleGetList: () => void;
  isOpenAddAndUpdateForm: boolean;
  setIsOpenAddAndUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAndUpdateTruckForm = ({
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
    formState: { errors }
  } = useForm<TAddAndUpdateTruck>();

  const [api, contextHolder] = notification.useNotification();

  const handleSubmitAddForm = (e: TAddAndUpdateTruck) => {
    const result = currentInstance
      ? axiosInstance.put(`truck/${currentInstance.id}`, {
          ...e
        })
      : axiosInstance.post('truck', [
          {
            ...e
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
    setValue('numberPlate', currentInstance ? currentInstance.numberPlate : '');
  }, [currentInstance]);

  return (
    <Modal
      open={isOpenAddAndUpdateForm}
      footer={null}
      title={'Add truck'}
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
        <div className="relative w-full space-y-2 mt-5">
          <label className="mb-2 font-semibold" htmlFor="numberPlate">
            Number plate
          </label>
          <input
            id="numberPlate"
            type="text"
            className={`${errors.numberPlate ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
            {...register('numberPlate', { required: 'Number plate is required' })}
          />
          {errors.numberPlate && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.numberPlate.message}</p>}
        </div>
        <div className="flex justify-end">
          <Button
            className="text font-semibold mt-12 hover:bg-cyan-700 border-cyan-700 transition ease-in-out"
            onClick={handleSubmit(handleSubmitAddForm)}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};
