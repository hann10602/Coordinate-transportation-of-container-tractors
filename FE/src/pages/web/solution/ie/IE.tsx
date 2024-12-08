import { useRef } from 'react';
import { Button } from '../../../../components';
import { ConsultingForm } from '../components';
import { Link } from 'react-router-dom';

export const IE = () => {
  const consultingFormRef = useRef<HTMLDivElement>(null);
  const handleScrollToConsultingForm = () => {
    consultingFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="relative flex justify-center items-center h-[680px]">
        <div className="absolute top-0 w-full h-full -z-10 bg-black">
          <img className="w-full object-cover h-full opacity-55" src="/public/images/bg-image.png" alt="bg" />
        </div>
        <div className="text-center px-4">
          <p className="text-4xl md:text-6xl font-bold">Giải pháp vận chuyển Import Express</p>
          <p className="text-base md:text-xl mt-3">Vận chuyển container rỗng từ kho khách đem về bãi container</p>
          <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-10 mt-6">
            <Link to="/ie-request/location">
              <Button className="w-32 md:w-40 py-2 md:py-3 font-semibold bg-cyan-900 hover:bg-cyan-800">
                Đặt vận chuyển
              </Button>
            </Link>
            <Button
              className="w-32 md:w-40 py-2 md:py-3 font-semibold bg-teal-500 hover:bg-teal-400"
              onClick={handleScrollToConsultingForm}
            >
              Tư vấn ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="px-6 md:px-32 py-16 w-full border-b-4 border-yellow-500 bg-sky-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-4">
          <p className="text-5xl md:text-6xl font-bold">90%</p>
          <p className="text-base md:text-lg">Tiết kiệm 90% thời gian lên kế hoạch và điều phối vận tải.</p>
        </div>
        <div className="space-y-4">
          <p className="text-5xl md:text-6xl font-bold">20%</p>
          <p className="text-base md:text-lg">Tối ưu hóa 20% năng lực vận hành đội xe, giao hàng.</p>
        </div>
        <div className="space-y-4">
          <p className="text-5xl md:text-6xl font-bold">24/7</p>
          <p className="text-base md:text-lg">Quản lý đơn hàng và phương tiện 24/7 theo thời gian thực.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-32 py-20 w-full flex flex-wrap md:flex-nowrap gap-10 text-black">
        <div className="space-y-6 md:w-7/12">
          <p className="text-2xl md:text-4xl font-bold">Từ nhà kho tới cửa hàng và hơn thế nữa…</p>
          <p className="text-sm md:text-xl">
            Sự dịch chuyển của hàng hóa là một mắt xích quan trọng trong chuỗi cung ứng...
          </p>
          <p className="text-sm md:text-xl font-bold">
            Hệ thống hóa toàn bộ các hoạt động vận tải của doanh nghiệp trên một nền tảng duy nhất!
          </p>
          <p className="text-sm md:text-xl">Tự động hóa các chu trình kinh doanh như lập kế hoạch, báo cáo KPI…</p>
          {/* Additional content */}
        </div>
        <img
          className="w-full md:w-5/12 object-cover"
          src="/public/images/order-management-life-cycle.png"
          alt="order-management-life-cycle"
        />
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-20 w-full bg-sky-800">
        <p className="text-center text-2xl sm:text-3xl font-bold mb-4">Các tính năng nổi bật</p>
        <p className="text-center text-base sm:text-lg font-semibold mb-10 sm:mb-20">
          Giúp doanh nghiệp quản lý vận tải dễ dàng hơn, thông minh hơn, tối ưu hơn!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-16">
          <div className="bg-teal-400 space-y-2 rounded-md p-4">
            <p className="text-base sm:text-lg font-bold text-center">Tự động hóa điều phối</p>
            <p className="text-sm sm:text-base">
              Điều phối viên cập nhật kế hoạch điều phối vận tải lên hệ thống IE, thuật toán tự động đề xuất kế hoạch
              vận tải tối ưu chỉ từ 5 – 15 phút.
            </p>
          </div>
          <div className="bg-emerald-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Tối ưu hóa năng lực</p>
            <p className="text-sm sm:text-base">
              Tối ưu hóa năng lực vận hành đội xe, thời gian giao hàng, quãng đường giao hàng, chi phí nhà thầu vận tải,
              giao hàng đa kênh, đa điểm,…
            </p>
          </div>
          <div className="bg-yellow-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Giám sát giao hàng</p>
            <p className="text-sm sm:text-base">
              Giám sát vận tải theo thời gian thực, tự động cảnh báo khi có vi phạm: trễ giờ giao hàng, lệch tuyến
              đường, dừng đỗ sai điểm, sai nhiệt độ,…
            </p>
          </div>
          <div className="bg-pink-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Quản lý đội xe</p>
            <p className="text-sm sm:text-base">
              Quản lý vận hành: xăng dầu, nhiên liệu, sửa chữa, chi phí cầu đưởng, bảo trì bảo dưỡng. Quản lý tài xế:
              lương, thưởng, chấm công, KPI,…
            </p>
          </div>
          <div className="bg-gray-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Đánh giá KPI</p>
            <p className="text-sm sm:text-base">
              Cập nhật nhiều loại mẫu báo cáo KPI vận tải theo thời gian thực để theo dõi hiệu suất giao hàng theo đối
              tác, đầu xe, lộ trình,…
            </p>
          </div>
          <div className="bg-amber-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Sử dụng linh hoạt</p>
            <p className="text-sm sm:text-base">
              Hệ thống STM có thể được truy cập bằng nhiều thiết bị: máy tính, máy tính bảng, điện thoại. Và tính năng
              phân quyền người dùng.
            </p>
          </div>
          <div className="bg-red-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Kinh doanh thông minh</p>
            <p className="text-sm sm:text-base">
              Thông tin vận hành được cập nhật theo biểu đồ thời gian thực. Nhà quản lý dễ dàng ra quyết định kinh doanh
              nhanh chóng.
            </p>
          </div>
          <div className="bg-cyan-400 space-y-2 rounded-md p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-center">Quản lý chứng từ</p>
            <p className="text-sm sm:text-base">
              Quản lý – đối chiếu chứng từ POD trực tuyến. Ghi nhận – phê duyệt các chứng từ phát sinh tức thì thông qua
              ứng dụng di động tài xế.
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-10 sm:py-20 text-black space-y-4 sm:space-y-6 w-full lg:w-7/12">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">Hiển thị và kiểm soát vận tải</p>
        <p className="text-base sm:text-lg">Hiển thị và kiểm soát theo thời gian thực mọi hoạt động vận tải.</p>
        <p className="text-base sm:text-lg">
          Giám sát vận tải là một trong những tính năng nổi bật của hệ thống STM. Tính năng này giải quyết những khó
          khăn trong việc giám sát vận chuyển nhằm đảm bảo hoạt động giao hàng được thực hiện một cách an toàn, đến nơi
          giao hàng đúng thời gian trong điều kiện hàng hóa không bị hư hỏng.
        </p>
        <p className="text-base sm:text-lg">
          Qua đó, người vận hành có thể kiểm tra toàn bộ thông tin về hàng hoá bất cứ thời điểm nào, cập nhật thời gian,
          quản lý chi phí, giải quyết các vấn đề phát sinh.
        </p>
      </div>

      {/* Consulting Form Section */}
      <div className="px-6 md:px-32 py-20 w-full flex flex-wrap md:flex-nowrap gap-6 md:gap-20 items-center bg-sky-800">
        <img className="w-full md:w-1/2" src="/public/images/time-schedule.png" alt="time-schedule" />
        <div className="w-full" ref={consultingFormRef}>
          <ConsultingForm />
        </div>
      </div>
    </div>
  );
};
