import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const RequestLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-[64px] px-4 flex justify-between items-center border-b border-gray-400">
          <Link to="/trang-chu">
            <img src="/public/images/logo.jpg" className="w-12 h-12 object-cover rounded-full" alt="Logo" />
          </Link>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
