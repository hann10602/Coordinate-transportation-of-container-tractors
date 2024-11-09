import { createBrowserRouter } from 'react-router-dom';
import { AuthCheck, AuthLayout, MainLayout } from '../layout';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { LandingPage } from '../pages/web';
import { OE, OF } from '../pages/web/solution';
import { IE } from '../pages/web/solution/ie';
import { IF } from '../pages/web/solution/if';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: '/trang-chu',
            element: <LandingPage />
          },
          {
            path: '/ie',
            element: <IE />
          },
          {
            path: '/if',
            element: <IF />
          },
          {
            path: '/oe',
            element: <OE />
          },
          {
            path: '/of',
            element: <OF />
          }
        ]
      },
      {
        path: '',
        element: <AuthCheck />,
        children: [
          {
            path: '',
            children: [
              {
                path: '/ie-request/start-location',
                element: <></>
              }
            ]
          }
        ]
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          }
        ]
      },
      {
        path: '/admin',
        children: [
          {
            path: '',
            element: <></>
          }
        ]
      }
    ]
  }
]);
