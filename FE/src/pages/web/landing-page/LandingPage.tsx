import { useRef } from 'react';
import { Button } from '../../../components';
import { ConsultingForm } from '../solution/components';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const consultingFormRef = useRef<HTMLDivElement>(null);

  const handleScrollToConsultingForm = () => {
    consultingFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full">
      <div className="w-full relative">
        <img src="/public/images/landing-page-bg.png" className="w-full h-full object-cover" alt="background" />
        <div className="absolute top-0 w-full z-10 h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <p className="text-white font-black text-5xl">Giải pháp tối ưu về Logistic</p>
          <div className="mt-10 space-x-2 flex items-center">
            <Button className="text-white bg-sky-900 hover:bg-sky-800 w-40 duration-100">Xem hành trình</Button>
            <Button
              className="text-white bg-cyan-500 hover:bg-cyan-400 w-40 duration-100"
              onClick={handleScrollToConsultingForm}
            >
              Tư vấn ngay
            </Button>
          </div>
        </div>
      </div>
      <div className="px-20 py-20 w-full bg-sky-800 text-center text-white">
        <p className="text-4xl font-bold mb-6">Giải pháp số quản lý logistics</p>
        <p className="text-lg mb-16">
          Quản lý vận hành trên hệ sinh thái số: vận chuyển, kho bãi, container, phân phối,… thông minh – hiệu quả!
        </p>
        <div className="flex gap-x-10 items-center justify-between">
          <Link to="/ie" className="bg-white bg-opacity-30 py-4 px-10 rounded-md">
            <img className="w-80 h-40" src="/public/images/visualize-ie.png" alt="time-schedule" />
            <p className="mt-10 mb-2 text-xl font-bold">IE</p>
            <p className="font-medium">Vận chuyển container rỗng từ kho khách đem về bãi container</p>
          </Link>
          <Link to="/if" className="bg-white bg-opacity-30 py-4 px-10 rounded-md">
            <img className="w-80 h-40" src="/public/images/visualize-if.png" alt="time-schedule" />
            <p className="mt-10 mb-2 text-xl font-bold">IF</p>
            <p className="font-medium">Vận chuyển container đầy từ cảng về kho của khách hàng</p>
          </Link>
          <Link to="/oe" className="bg-white bg-opacity-30 py-4 px-10 rounded-md">
            <img className="w-80 h-40" src="/public/images/visualize-oe.png" alt="time-schedule" />
            <p className="mt-10 mb-2 text-xl font-bold">OE</p>
            <p className="font-medium">Vận chuyển container rỗng từ bãi container tới kho khách để thêm hàng</p>
          </Link>
          <Link to="/of" className="bg-white bg-opacity-30 py-4 px-10 rounded-md">
            <img className="w-80 h-40" src="/public/images/visualize-of.png" alt="time-schedule" />
            <p className="mt-10 mb-2 text-xl font-bold">OF</p>
            <p className="font-medium">Vận chuyển container đầy từ kho khách hàng ra cảng</p>
          </Link>
        </div>
      </div>
      <div className="px-32 py-20 text-black space-y-6 flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold mb-6">Hệ sinh thái logistics toàn diện nhất Việt Nam</p>
          <p className="text-xl mb-6">
            Quản lý vận hành trên hệ sinh thái số: vận chuyển, kho bãi, container, phân phối,… thông minh – hiệu quả!
          </p>
          <Button
            className="text-white bg-cyan-500 hover:bg-cyan-400 w-40 duration-100"
            onClick={handleScrollToConsultingForm}
          >
            Tham gia ngay
          </Button>
        </div>
        <img className="w-1/2" src="/public/images/logistics-ecosystem.jpg" alt="time-schedule" />
      </div>
      <div className="px-32 py-20 w-full flex gap-x-20 items-center bg-sky-800">
        <img className="w-1/2" src="/public/images/time-schedule.png" alt="time-schedule" />
        <div className="w-full" ref={consultingFormRef}>
          <ConsultingForm />
        </div>
      </div>
    </div>
  );
};
