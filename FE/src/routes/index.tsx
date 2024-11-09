import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout';
import { LandingPage } from '../pages/web';
import { OE, OF } from '../pages/web/solution';
import { IE } from '../pages/web/solution/ie';
import { IF } from '../pages/web/solution/if';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
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
        path: '/auth',
        children: [
          {
            path: '',
            element: <></>
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
