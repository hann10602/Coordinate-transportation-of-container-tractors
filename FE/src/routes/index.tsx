import { createBrowserRouter } from 'react-router-dom';
import { AuthCheck, AuthLayout, MainLayout } from '../layout';
import { RequestLayout } from '../layout/request-layout';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { LandingPage } from '../pages/web';
import { Completed } from '../pages/web/solution/components/completed/Completed';
import { Failure } from '../pages/web/solution/components/failure/Failure';
import {
  IE,
  IETransportInformation,
  IF,
  IFTransportInformation,
  OE,
  OETransportInformation,
  OF,
  OFTransportInformation
} from '../pages/web/solution';

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
                  <RequestLayout>
                    <IETransportInformation />
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
                  <RequestLayout>
                    <IFTransportInformation />
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
                  <RequestLayout>
                    <OETransportInformation />
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
                  <RequestLayout>
                    <OFTransportInformation />
                  </RequestLayout>
                )
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: '/payment-completed',
                element: (
                  <RequestLayout>
                    <Completed />
                  </RequestLayout>
                )
              }
            ]
          },
          {
            path: '',
            children: [
              {
                path: '/payment-failure',
                element: (
                  <RequestLayout>
                    <Failure />
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
