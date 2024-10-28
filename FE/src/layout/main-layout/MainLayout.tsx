import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = () => {
	return (
		<div className="relative w-full h-[2000px] min-h-screen">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
