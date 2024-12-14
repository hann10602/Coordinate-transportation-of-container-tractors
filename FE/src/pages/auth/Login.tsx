import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import { TLoginField } from './types';

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TLoginField>();

  const handleSubmitLoginForm = (e: TLoginField) => {
    console.log(e);
  };

  return (
    <div className="bg-white rounded-md p-4 w-full max-w-md mx-auto flex flex-col items-center text-black">
      <p className="my-10 font-bold text-4xl">Đăng nhập</p>
      <div className="relative w-full space-y-2">
        <label className="mb-2 font-semibold" htmlFor="phoneNumber">
          Tên đăng nhập
        </label>
        <input
          id="username"
          type="text"
          className={`${errors.username ? 'border-red-600' : 'border-black'} block rounded-md w-full p-4 text-black placeholder:text-xl border outline-none`}
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.username.message}</p>}
      </div>
      <div className="relative w-full space-y-2 mt-8">
        <label className="mb-2 font-semibold" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          className={`${errors.password ? 'border-red-600' : 'border-black'} block rounded-md w-full p-4 text-black placeholder:text-xl border outline-none`}
          {...register('password', { required: 'Password field is required' })}
        />
        {errors.password && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.password.message}</p>}
      </div>
      <Button
        className="w-full text-xl font-semibold mt-12 hover:bg-cyan-700 bg-cyan-600 text-white transition ease-in-out"
        onClick={handleSubmit(handleSubmitLoginForm)}
      >
        Đăng nhập
      </Button>
      <div className="mt-2">
        Bạn chưa có tài khoản?{' '}
        <Link rel="stylesheet" to="/register" className="text-cyan-700 underline">
          Đăng ký ngay!
        </Link>
      </div>
    </div>
  );
};
