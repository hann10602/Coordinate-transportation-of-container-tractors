import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const SOLUTION_LIST = [
	{
		title: 'Yêu cầu vận chuyển IE',
		path: '/ie',
	},
	{
		title: 'Yêu cầu vận chuyển IF',
		path: '/if',
	},
	{
		title: 'Yêu cầu vận chuyển OE',
		path: '/oe',
	},
	{
		title: 'Yêu cầu vận chuyển OF',
		path: '/of',
	},
];

export const Header = () => {
	return (
		<div className="fixed top-0 h-20 z-20 w-full px-10 flex justify-between items-center bg-blue-500">
			<Link to="/trang-chu">
				<img src="/public/images/logo.jpg" className="w-12 h-12 object-cover rounded-full" alt="Logo" />
			</Link>
			<div className="flex items-center gap-x-10">
				<div className="solution-dropdown cursor-pointer relative text-gray-100 hover:text-white text-md font-semibold flex items-center gap-x-2 h-10">
					<p>Giải pháp</p> <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
					<div className="solution-menu hidden absolute top-10 right-0 w-80 bg-white rounded-md overflow-hidden">
						{SOLUTION_LIST.map((solution) => (
							<Link
								key={solution.path}
								to={solution.path}
								className="w-full px-4 py-6 text-black flex items-center gap-x-4 hover:bg-gray-300 transition duration-200"
							>
								<p>{solution.title}</p>
							</Link>
						))}
					</div>
				</div>
				<div className="cursor-pointer text-gray-100 text-md whitespace-pre font-semibold h-10 flex items-center">
					<Link className="hover:text-white hover:underline" to="/dang-nhap">
						Đăng nhập
					</Link>{' '}
					/{' '}
					<Link className="hover:text-white hover:underline" to="/dang-ky">
						Đăng ký
					</Link>
				</div>
			</div>
		</div>
	);
};
