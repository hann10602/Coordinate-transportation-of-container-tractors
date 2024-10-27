import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout';
import { LandingPage } from '../pages/web';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '',
				children: [
					{
						path: '',
						element: <LandingPage />,
					},
				],
			},
			{
				path: '/auth',
				children: [
					{
						path: '',
						element: <></>,
					},
				],
			},
			{
				path: '/admin',
				children: [
					{
						path: '',
						element: <></>,
					},
				],
			},
		],
	},
]);
