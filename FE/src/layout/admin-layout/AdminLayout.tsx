import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, MenuProps } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TJWTToken } from '../../types';

const items: MenuProps['items'] = [
  {
    label: (
      <Link className="flex items-center gap-x-3" to="/login">
        <Icon icon="mdi-light:logout" width="24" height="24" />
        <p>Logout</p>
      </Link>
    ),
    key: '1'
  }
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const location = useLocation().pathname;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: TJWTToken = jwtDecode(token);

      if (decodedToken.role !== 'Admin') {
        navigate('/trang-chu');
      }
    } else {
      navigate('/trang-chu');
    }
  }, []);

  return (
    <div className="flex h-screen">
      <aside className={`${isOpenSidebar ? 'w-60' : 'w-max'} bg-gray-800 text-white flex-shrink-0`}>
        <div className="p-2 h-16 text-xl font-bold flex justify-between items-center">
          {isOpenSidebar && <p className="px-2">Admin Panel</p>}
          <div
            className="px-2 py-2 rounded hover:bg-gray-700 cursor-pointer"
            onClick={() => setIsOpenSidebar((prev) => !prev)}
          >
            <Icon icon="material-symbols:menu-rounded" width="32" height="32" />
          </div>
        </div>
        <div className="mt-4 px-2">
          <div className="space-y-2">
            <Link
              to="/admin"
              className={`${location === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="material-symbols:dashboard-2-rounded" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Dashboard</p>}
            </Link>
            <Link
              to="/admin/user"
              className={`${location === '/admin/user' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="mdi:user-multiple-outline" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">User</p>}
            </Link>
            <Link
              to="/admin/container"
              className={`${location === '/admin/container' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="mdi:train-car-container" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Container dump</p>}
            </Link>
            <Link
              to="/admin/port"
              className={`${location === '/admin/port' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="mdi:anchor" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Port dump</p>}
            </Link>
            <Link
              to="/admin/trailer"
              className={`${location === '/admin/trailer' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="mdi:truck-trailer" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Trailer dump</p>}
            </Link>
            <Link
              to="/admin/order"
              className={`${location === '/admin/order' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="ic:outline-border-color" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Order</p>}
            </Link>
            <Link
              to="/admin/truck"
              className={`${location === '/admin/truck' ? 'bg-gray-700' : 'hover:bg-gray-700'} px-2 py-2 rounded flex items-center gap-x-3`}
            >
              <Icon icon="mdi:dump-truck" width="32" height="32" />
              {isOpenSidebar && <p className="font-semibold text-sm">Truck</p>}
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen bg-gray-100">
        <header className="border border-b-neutral-400 p-4 h-16 flex justify-between items-center">
          <Link to="/admin">
            <img src="/public/images/logo.jpg" className="w-12 h-12 object-cover rounded-full" alt="Logo" />
          </Link>
          <Dropdown menu={{ items }}>
            <Icon icon="mdi-light:settings" width="32" height="32" />
          </Dropdown>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
