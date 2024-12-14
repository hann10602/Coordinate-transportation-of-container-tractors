import { Button, Modal, notification } from 'antd';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../../api/axios';
import { TUser } from '../../../types';
import { openNotification } from '../../../utils';
import { TAddAndUpdateUser } from './types';

type Props = {
  handleCloseModal: () => void;
  currentInstance?: TUser;
  setCurrentInstance: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  handleGetList: () => void;
  isOpenAddAndUpdateForm: boolean;
  setIsOpenAddAndUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAndUpdateUserForm = ({
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
    watch,
    reset,
    formState: { errors }
  } = useForm<TAddAndUpdateUser>();

  const [api, contextHolder] = notification.useNotification();

  const passwordWatch = watch('password');

  console.log(errors);

  const handleSubmitAddForm = (e: TAddAndUpdateUser) => {
    const result = currentInstance
      ? axiosInstance.put(`user/${currentInstance.id}`, {
          fullName: e.fullName,
          username: e.username,
          phoneNumber: e.phoneNumber
        })
      : axiosInstance.post('user', {
          fullName: e.fullName,
          username: e.username,
          password: e.password,
          phoneNumber: e.phoneNumber
        });

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
    setValue('fullName', currentInstance ? currentInstance.fullName : '');
    setValue('username', currentInstance ? currentInstance.username : '');
    setValue('phoneNumber', currentInstance ? currentInstance.phoneNumber : '');
    setValue('password', currentInstance ? 'test' : '');
    setValue('confirmPassword', currentInstance ? 'test' : '');
  }, [currentInstance]);

  return (
    <Modal
      open={isOpenAddAndUpdateForm}
      footer={null}
      title={`${currentInstance ? 'Update' : 'Add'} User`}
      onCancel={() => {
        reset();
        setCurrentInstance(undefined);
        setIsOpenAddAndUpdateForm(false);
      }}
    >
      <div className="overflow-y-auto">
        {contextHolder}
        <div className="relative w-full space-y-2 mt-10">
          <label className="mb-2 font-semibold" htmlFor="phoneNumber">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            className={`${errors.fullName ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.fullName.message}</p>}
        </div>
        <div className="relative w-full space-y-2 mt-10">
          <label className="mb-2 font-semibold" htmlFor="phoneNumber">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={`${errors.username ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.username.message}</p>}
        </div>
        {!currentInstance && (
          <>
            <div className="relative w-full space-y-2 mt-10">
              <label className="mb-2 font-semibold" htmlFor="phoneNumber">
                Password
              </label>
              <input
                id="password"
                type="text"
                className={`${errors.password ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.password.message}</p>}
            </div>
            <div className="relative w-full space-y-2 mt-10">
              <label className="mb-2 font-semibold" htmlFor="phoneNumber">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="text"
                className={`${errors.confirmPassword ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: {
                    matchPassword: (value) => {
                      if (currentInstance) {
                        return true;
                      } else {
                        return value === passwordWatch || 'Password do not match';
                      }
                    }
                  }
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 absolute -bottom-7 mt-2">{errors.confirmPassword.message}</p>
              )}
            </div>
          </>
        )}
        <div className="relative w-full space-y-2 mt-10">
          <label className="mb-2 font-semibold" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            id="phoneNumber"
            type="text"
            className={`${errors.phoneNumber ? 'border-red-600' : 'border-black'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
            {...register('phoneNumber', { required: 'Phone number is required' })}
          />
          {errors.phoneNumber && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.phoneNumber.message}</p>}
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
