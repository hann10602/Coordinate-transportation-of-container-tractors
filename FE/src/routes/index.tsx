import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout';
import { LandingPage } from '../pages/web';
import { COS, SSM, STM, STX, SWM } from '../pages/web/solution';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '',
				children: [
					{
						path: '/landing-page',
						element: <LandingPage />,
					},
					{
						path: '/stm-solution',
						element: <STM />,
					},
					{
						path: '/cos-solution',
						element: <COS />,
					},
					{
						path: '/ssm-solution',
						element: <SSM />,
					},
					{
						path: '/swm-solution',
						element: <SWM />,
					},
					{
						path: '/stx-solution',
						element: <STX />,
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
