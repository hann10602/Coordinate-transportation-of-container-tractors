import { useForm } from 'react-hook-form';
import { Button } from '../../../../components';
import { emailValidation } from '../../../../utils';
import { TConsultingField } from './types';

export const ConsultingForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<TConsultingField>();

  const handleSubmitConsultingForm = (e: TConsultingField) => {
    console.log(e);
  };

  return (
    <div className="w-full text-white">
      <p className="mb-10 text-4xl font-bold">Tư vấn giải pháp quản lý vận tải</p>
      <p className="mb-10 text-xl font-semibold">
        Điền thông tin vào đăng ký dưới đây, Transportation sẽ liên lạc để hẹn một buổi demo giải pháp quản lý vận tải
        sớm nhất.
      </p>
      <form action="" className="flex flex-col w-full">
        <div className="relative space-y-2 w-8/12">
          <label className="" htmlFor="full-name">
            Họ và tên
          </label>
          <input
            id="full-name"
            type="text"
            className="block rounded-sm w-full p-4 text-black"
            {...register('fullName', { required: 'Full-name field is required' })}
          />
          {errors.fullName && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.fullName.message}</p>}
        </div>

        <div className="relative space-y-2 mt-8 w-8/12">
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="block rounded-sm w-full p-4 text-black"
            {...register('email', {
              required: 'Email field is required',
              validate: {
                isEmail: (value) => emailValidation(value)
              }
            })}
          />
          {errors.email && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.email.message}</p>}
        </div>
        <div className="relative space-y-2 mt-8 w-8/12">
          <label className="mb-2" htmlFor="phoneNumber">
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            type="text"
            className="block rounded-sm w-full p-4 text-black placeholder:text-xl"
            placeholder="0912345678"
            {...register('phoneNumber', { required: 'Phone number field is required' })}
          />
          {errors.phoneNumber && <p className="text-red-400 absolute -bottom-7 mt-2">{errors.phoneNumber.message}</p>}
        </div>
        <div className="space-y-2 mt-8 w-full">
          <label className="mb-2" htmlFor="note">
            Lời nhắn
          </label>
          <textarea
            id="note"
            className="block rounded-sm w-full p-4 text-black h-40 resize-none placeholder:text-xl"
            placeholder="Nội dung yêu cầu, thắc mắc, hỗ trợ sản phẩm..."
            {...register('note')}
          />
        </div>
        <Button
          className="border border-white bg-transparent text-sm font-semibold mt-12 hover:bg-cyan-700 hover:bg-opacity-65 transition ease-in-out"
          onClick={handleSubmit(handleSubmitConsultingForm)}
        >
          Nhận tư vấn ngay!
        </Button>
      </form>
    </div>
  );
};
