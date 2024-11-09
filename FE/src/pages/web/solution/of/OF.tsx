export const OF = () => {
  return (
    <div className="relative flex justify-center items-center h-[680px]">
      <div className="absolute top-0 w-full h-full -z-10 bg-black">
        <img className="w-full object-cover h-full opacity-55" src="/public/images/bg-image.png" alt="bg" />
      </div>
      <p className="text-5xl text-center text-white font-bold">Giải pháp vận chuyển Outbound Freight</p>
      <p>Vận chuyển container đầy từ kho khách hàng ra cảng</p>
    </div>
  );
};
