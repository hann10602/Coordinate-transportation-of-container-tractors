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
      <div className="relative w-full">
        <img
          src="/public/images/landing-page-bg.png"
          className="w-full h-[60vh] md:h-[70vh] object-cover"
          alt="background"
        />
        <div className="absolute top-0 w-full z-10 h-full bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 text-center">
          <p className="text-white font-black text-3xl md:text-5xl">Giải pháp tối ưu về Logistic</p>
          <div className="mt-6 md:mt-10 space-x-2 flex flex-wrap justify-center items-center">
            <Link to="/personal-info">
              <Button className="text-white bg-sky-900 hover:bg-sky-800 w-36 md:w-40 duration-100">
                Xem hành trình
              </Button>
            </Link>
            <Button
              className="text-white bg-cyan-500 hover:bg-cyan-400 w-36 md:w-40 duration-100"
              onClick={handleScrollToConsultingForm}
            >
              Tư vấn ngay
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-20 py-10 md:py-20 w-full bg-sky-800 text-center text-white">
        <p className="text-2xl md:text-4xl font-bold mb-6">Giải pháp số quản lý logistics</p>
        <p className="text-base md:text-lg mb-10 md:mb-16">
          Quản lý vận hành trên hệ sinh thái số: vận chuyển, kho bãi, container, phân phối,… thông minh – hiệu quả!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
          {[
            {
              to: '/ie',
              img: 'visualize-ie.png',
              title: 'IE',
              desc: 'Vận chuyển container rỗng từ kho khách đem về bãi container'
            },
            {
              to: '/if',
              img: 'visualize-if.png',
              title: 'IF',
              desc: 'Vận chuyển container đầy từ cảng về kho của khách hàng'
            },
            {
              to: '/oe',
              img: 'visualize-oe.png',
              title: 'OE',
              desc: 'Vận chuyển container rỗng từ bãi container tới kho khách để thêm hàng'
            },
            {
              to: '/of',
              img: 'visualize-of.png',
              title: 'OF',
              desc: 'Vận chuyển container đầy từ kho khách hàng ra cảng'
            }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center hover:bg-white bg-slate-300 hover:bg-opacity-30 bg-opacity-30 py-4 px-6 rounded-md"
            >
              <img className="w-full h-80 md:h-44 object-cover" src={`/public/images/${item.img}`} alt={item.title} />
              <p className="mt-4 mb-2 text-lg md:text-xl font-bold">{item.title}</p>
              <p className="font-medium line-clamp-3 text-sm md:text-base">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-32 py-10 md:py-20 text-black space-y-6 md:flex items-center justify-between">
        <div>
          <p className="text-2xl md:text-4xl font-bold mb-6">Hệ sinh thái logistics toàn diện nhất Việt Nam</p>
          <p className="text-base md:text-xl mb-6">
            Quản lý vận hành trên hệ sinh thái số: vận chuyển, kho bãi, container, phân phối,… thông minh – hiệu quả!
          </p>
          <Button
            className="text-white bg-cyan-500 hover:bg-cyan-400 w-40 duration-100"
            onClick={handleScrollToConsultingForm}
          >
            Tham gia ngay
          </Button>
        </div>
        <img
          className="w-full md:w-1/2 mt-6 md:mt-0"
          src="/public/images/logistics-ecosystem.jpg"
          alt="time-schedule"
        />
      </div>

      <div className="px-6 md:px-32 py-10 md:py-20 w-full flex flex-col md:flex-row gap-y-6 md:gap-x-20 items-center bg-sky-800">
        <img className="w-full md:w-1/2" src="/public/images/time-schedule.png" alt="time-schedule" />
        <div className="w-full" ref={consultingFormRef}>
          <ConsultingForm />
        </div>
      </div>
    </div>
  );
};
