import { createBrowserRouter } from 'react-router-dom';
import { IERequestMenu } from '../constants';
import { AuthCheck, AuthLayout, MainLayout } from '../layout';
import { RequestLayout } from '../layout/request-layout';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { LandingPage } from '../pages/web';
import { OE, OEStartLocation, OF, OFStartLocation } from '../pages/web/solution';
import { IE, IEStartLocation } from '../pages/web/solution/ie';
import { IF, IFStartLocation } from '../pages/web/solution/if';

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
                path: '/ie-request/location',
                element: (
                  <RequestLayout menu={IERequestMenu}>
                    <IEStartLocation />
                  </RequestLayout>
                )
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: '/if-request/location',
                element: (
                  <RequestLayout menu={IERequestMenu}>
                    <IFStartLocation />
                  </RequestLayout>
                )
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: '/oe-request/location',
                element: (
                  <RequestLayout menu={IERequestMenu}>
                    <OEStartLocation />
                  </RequestLayout>
                )
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: '/of-request/location',
                element: (
                  <RequestLayout menu={IERequestMenu}>
                    <OFStartLocation />
                  </RequestLayout>
                )
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
