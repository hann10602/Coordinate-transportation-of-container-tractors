import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="w-screen h-screen bg-sky-900 flex justify-center items-center">
      <div className="z-10 w-10/12 md:w-6/12 xl:w-4/12">
        <Outlet />
      </div>
    </div>
  );
};
