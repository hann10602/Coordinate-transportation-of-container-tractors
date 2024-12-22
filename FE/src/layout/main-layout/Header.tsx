import { Icon } from '@iconify/react/dist/iconify.js';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TJWTToken } from '../../types';

const SOLUTION_LIST = [
  {
    title: 'Yêu cầu vận chuyển Import Express',
    path: '/ie'
  },
  {
    title: 'Yêu cầu vận chuyển Import Freight',
    path: '/if'
  },
  {
    title: 'Yêu cầu vận chuyển Outbound Express',
    path: '/oe'
  },
  {
    title: 'Yêu cầu vận chuyển Outbound Freight',
    path: '/of'
  }
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const Header = () => {
  const navigate = useNavigate();

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: TJWTToken = jwtDecode(token);

      if (decodedToken.name) {
        setUsername(decodedToken.name);
      }
    } else {
      navigate('/trang-chu');
    }
  }, []);

  return (
    <div className="fixed top-0 h-20 z-20 w-full px-10 flex justify-between items-center bg-blue-500">
      <Link to="/trang-chu">
        <img src="/public/images/logo.jpg" className="w-12 h-12 object-cover rounded-full" alt="Logo" />
      </Link>
      <div className="flex items-center gap-x-10 md:hidden">
        <div className="text-white border border-white rounded-md px-2 py-1">
          <Icon icon="material-symbols-light:menu-rounded" width="24" height="24" onClick={() => setIsOpenMenu(true)} />
        </div>
        {isOpenMenu && (
          <div className="absolute w-full h-screen top-0 left-0 bg-black bg-opacity-70">
            <div className="bg-black">
              <div className="py-6 px-4 flex justify-between items-center">
                <Link to="/trang-chu">
                  <img src="/public/images/logo.jpg" className="w-12 h-12 object-cover rounded-full" alt="Logo" />
                </Link>
                <div className="text-white border border-white rounded-md px-2 py-1">
                  <Icon
                    icon="material-symbols-light:menu-rounded"
                    width="24"
                    height="24"
                    onClick={() => setIsOpenMenu(false)}
                  />
                </div>
              </div>
              {SOLUTION_LIST.map((solution) => (
                <Link
                  key={solution.path}
                  to={solution.path}
                  className="w-full font-semibold px-4 py-8 flex items-center text-white gap-x-4 border-t border-slate-700"
                  onClick={scrollToTop}
                >
                  <p>{solution.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="md:flex items-center gap-x-10 hidden">
        <div className="solution-dropdown cursor-pointer relative text-gray-100 hover:text-white text-md font-semibold flex items-center gap-x-2 h-10">
          <p className="text-lg">Giải pháp</p> <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
          <div className="solution-menu hidden absolute top-10 right-0 w-80 bg-white rounded-md overflow-hidden">
            {SOLUTION_LIST.map((solution) => (
              <Link
                key={solution.path}
                to={solution.path}
                className="w-full px-4 py-6 text-black flex items-center gap-x-4 hover:bg-gray-300 transition duration-200"
                onClick={scrollToTop}
              >
                <p>{solution.title}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="cursor-pointer text-gray-100 text-md whitespace-pre font-semibold h-10 flex items-center">
          {username ? (
            <Link className="hover:text-white hover:underline text-lg" to="/personal-info">
              {username}
            </Link>
          ) : (
            <>
              <Link className="hover:text-white hover:underline text-lg" to="/login">
                Đăng nhập
              </Link>{' '}
              /{' '}
              <Link className="hover:text-white hover:underline text-lg" to="/register">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
