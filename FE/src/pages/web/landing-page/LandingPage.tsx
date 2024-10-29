import { Button } from '../../../components';

type Props = {};

export const LandingPage = (props: Props) => {
	return (
		<div className="w-full relative h-800">
			<img src="/public/images/stm-solution.jpg" className="w-full h-full object-cover" alt="background" />
			<div className="absolute top-0 w-full z-10 h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
				<p className="text-white font-black text-5xl">Giải pháp tối ưu về Logistic</p>
				<div className="mt-10 space-x-2">
					<Button className="text-white bg-sky-900 hover:bg-sky-800 w-40 duration-100">Xem hành trình</Button>
					<Button className="text-white bg-cyan-500 hover:bg-cyan-400 w-40 duration-100">Tư vấn ngay</Button>
				</div>
			</div>
		</div>
	);
};
