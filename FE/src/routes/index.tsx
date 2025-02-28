import { createBrowserRouter } from 'react-router-dom';
import { AuthCheck, AuthLayout, MainLayout } from '../layout';
import { AdminLayout } from '../layout/admin-layout';
import { RequestLayout } from '../layout/request-layout';
import { Dashboard, TruckManagement, UserManagement } from '../pages/admin';
import { ContainerDumpManagement } from '../pages/admin/container-dump-management/ContainerDumpManagement';
import { OrderManagement } from '../pages/admin/order-management/OrderManagement';
import { PortDumpManagement } from '../pages/admin/port-dump-management/PortDumpManagement';
import { TrailerDumpManagement } from '../pages/admin/trailer-dump-management/TrailerDumpManagement';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { LandingPage } from '../pages/web';
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
import { Completed } from '../pages/web/solution/components/completed/Completed';
import { Failure } from '../pages/web/solution/components/failure/Failure';
import { PersonalInfo } from '../pages/web/personal-info';
import { AdvisoryManagement } from '../pages/admin/advisory-management';

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
          },
          {
            path: '/personal-info',
            element: <PersonalInfo />
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
          },
          {
            path: '',
            element: <AdminLayout />,
            children: [
              {
                path: '/admin',
                element: <Dashboard />
              },
              {
                path: '/admin/user',
                element: <UserManagement />
              },
              {
                path: '/admin/container',
                element: <ContainerDumpManagement />
              },
              {
                path: '/admin/port',
                element: <PortDumpManagement />
              },
              {
                path: '/admin/trailer',
                element: <TrailerDumpManagement />
              },
              {
                path: '/admin/order',
                element: <OrderManagement />
              },
              {
                path: '/admin/advisory',
                element: <AdvisoryManagement />
              },
              {
                path: '/admin/truck',
                element: <TruckManagement />
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
      }
    ]
  }
]);
