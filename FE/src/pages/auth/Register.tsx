import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { TRegisterField } from './types';
import { axiosInstance } from '../../api/axios';
import { notification } from 'antd';
import { openNotification } from '../../utils';

export const Register = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<TRegisterField>();

  const passwordWatch = watch('password');

  const handleSubmitRegisterForm = (e: TRegisterField) => {
    axiosInstance
      .post('user', {
        ...e
      })
      .then(() => navigate('/login'))
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  return (
    <div className="bg-white rounded-md p-4 w-full flex flex-col items-center text-black">
      {contextHolder}
      <p className="my-10 font-bold text-4xl">Đăng ký</p>
      <div className="relative w-full space-y-2">
        <label className="mb-2 font-semibold" htmlFor="fullName">
          Tên đầy đủ
        </label>
        <input
          id="fullName"
          type="text"
          className={`${errors.fullName ? 'border-red-600' : 'border-black'} block rounded-md w-full p-3 text-black placeholder:text-xl border outline-none`}
          {...register('fullName', {
            required: 'Full name is required',
            minLength: { value: 6, message: 'Full name must be at least 6 characters' }
          })}
        />
        {errors.fullName && <p className="text-red-400 absolute -bottom-4 text-xs mt-2">{errors.fullName.message}</p>}
      </div>
      <div className="relative w-full space-y-2 mt-4">
        <label className="mb-2 font-semibold" htmlFor="phoneNumber">
          Số điện thoại
        </label>
        <input
          id="phoneNumber"
          type="number"
          className={`${errors.phoneNumber ? 'border-red-600' : 'border-black'} block rounded-md w-full p-3 text-black placeholder:text-xl border outline-none`}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            minLength: { value: 8, message: 'Invalid phone number' }
          })}
        />
        {errors.phoneNumber && (
          <p className="text-red-400 absolute -bottom-4 text-xs mt-2">{errors.phoneNumber.message}</p>
        )}
      </div>
      <div className="relative w-full space-y-2 mt-4">
        <label className="mb-2 font-semibold" htmlFor="username">
          Tên đăng nhập
        </label>
        <input
          id="username"
          type="text"
          className={`${errors.username ? 'border-red-600' : 'border-black'} block rounded-md w-full p-3 text-black placeholder:text-xl border outline-none`}
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 6, message: 'Username must be at least 6 characters' }
          })}
        />
        {errors.username && <p className="text-red-400 absolute -bottom-4 text-xs mt-2">{errors.username.message}</p>}
      </div>
      <div className="relative w-full space-y-2 mt-4">
        <label className="mb-2 font-semibold" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          className={`${errors.password ? 'border-red-600' : 'border-black'} block rounded-md w-full p-3 text-black placeholder:text-xl border outline-none`}
          {...register('password', {
            required: 'Password field is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
        />
        {errors.password && <p className="text-red-400 absolute -bottom-4 text-xs mt-2">{errors.password.message}</p>}
      </div>
      <div className="relative w-full space-y-2 mt-4">
        <label className="mb-2 font-semibold" htmlFor="password">
          Nhập lại mật khẩu
        </label>
        <input
          id="secondPassword"
          type="password"
          className={`${errors.secondPassword ? 'border-red-600' : 'border-black'} block rounded-md w-full p-3 text-black placeholder:text-xl border outline-none`}
          {...register('secondPassword', {
            required: 'secondPassword field is required',
            validate: {
              matchPassword: (value) => value === passwordWatch || 'Password do not match'
            }
          })}
        />
        {errors.secondPassword && (
          <p className="text-red-400 absolute -bottom-4 text-xs mt-2">{errors.secondPassword.message}</p>
        )}
      </div>
      <Button
        className="w-full text-xl font-semibold mt-12 hover:bg-cyan-700 bg-cyan-600 text-white transition ease-in-out"
        onClick={handleSubmit(handleSubmitRegisterForm)}
      >
        Đăng ký
      </Button>
      <div className="mt-2">
        Bạn dã có tài khoản?{' '}
        <Link
          rel="stylesheet"
          to="/login"
          className="
        text-cyan-700 underline"
        >
          Đăng nhập ngay!
        </Link>
      </div>
    </div>
  );
};
