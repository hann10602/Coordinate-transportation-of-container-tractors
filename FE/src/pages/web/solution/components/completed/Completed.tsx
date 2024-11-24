import { Link } from 'react-router-dom';

export const Completed = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img
        src="/public/images/submit-successfully.png"
        className="w-64 h-64 mb-2 object-cover rounded-full"
        alt="Logo"
      />
      <p className="text-emerald-500 mb-10 text-xl">Thanh Toán thành công</p>
      <Link
        to="/trang-chu"
        className="bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer flex justify-center items-center h-12 w-40 rounded-md"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};
