import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="w-screen h-screen bg-sky-900 relative flex justify-center items-center">
      <img
        src="/public/images/login-background.png"
        className="absolute object-cover h-full opacity-15"
        alt="login-background"
      />
      <div className="z-10 w-10/12 md:w-6/12 xl:w-4/12">
        <Outlet />
      </div>
    </div>
  );
};
