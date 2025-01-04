import { LatLngExpression } from 'leaflet';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../../api/axios';
import { TDump } from '../../../../types';
import { Map } from './map/Map';
import { openNotification } from '../../../../utils';
import { notification } from 'antd';
import { Button } from '../../../../components';

type Props = {
  userId: number | undefined;
  setIsOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomerWarehouseList: React.Dispatch<React.SetStateAction<TDump[]>>;
};

type FormValues = {
  title: string;
  warehouseAddress: LatLngExpression;
};

export const AddCustomerWarehouseForm = ({ setIsOpenAddForm, setCustomerWarehouseList, userId }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>();

  const [api, contextHolder] = notification.useNotification();

  const warehouseAddress = watch('warehouseAddress');

  const onSubmit: SubmitHandler<FormValues> = (e) => {
    axiosInstance
      .post('dump/customer-warehouse', [
        {
          title: e.title,
          latitude: (e.warehouseAddress as any).lat,
          longitude: (e.warehouseAddress as any).lng,
          userId: userId,
          type: 'Customer'
        }
      ])
      .then(() => {
        setIsOpenAddForm(false);

        if (!userId) {
          navigate('/login');
        }

        axiosInstance
          .get('dump', {
            params: {
              type: 'Customer',
              userId: userId
            }
          })
          .then((res) => res.data.data)
          .then((dumpList: TDump[]) => setCustomerWarehouseList(dumpList.map((dump) => ({ ...dump, value: dump.id }))))
          .catch((err) => openNotification(api, 'error', err.response.data.message));
      })
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <div className="mb-5">
        <p className="mb-4 font-medium">Tên kho</p>
        <input
          type="text"
          className={`block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
          {...register('title', { required: true })}
        />
        {errors.title && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
      </div>
      <div className="h-full w-[1000px]">
        <Controller
          name="warehouseAddress"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <Map Location={warehouseAddress} setLocation={(location) => field.onChange(location)} />
            </>
          )}
        />
        {errors.warehouseAddress && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
      </div>
      <div className="flex justify-end z-10 mt-10">
        <Button
          className="bg-emerald-600 hover:bg-emerald-500 text-white w-28 h-8"
          onClick={() => handleSubmit(onSubmit)}
        >
          Thêm kho
        </Button>
      </div>
    </form>
  );
};
