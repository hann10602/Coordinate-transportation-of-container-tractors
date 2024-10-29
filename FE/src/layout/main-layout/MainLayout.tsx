import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = () => {
	return (
		<div className="relative min-w-screen w-full min-h-screen">
			<Header />
			<div className="w-full mt-20">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
