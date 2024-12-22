import { Icon } from '@iconify/react/dist/iconify.js';
import { DatePicker, DatePickerProps, Modal, notification } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select, { MenuListProps, OptionProps, components } from 'react-select';
import { axiosInstance } from '../../../../../../../api/axios';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EIESteps } from '../../../../../../../enums';
import { TDump, TJWTToken } from '../../../../../../../types';
import { openNotification } from '../../../../../../../utils';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { TTransportInformation, useIETransportInformationStore } from '../../../store';
import { StepContext } from '../IETransportInformation';
import { AddCustomerWarehouseForm } from '../../../../components/AddCustomerWarehouseForm';

type TIEFillInformationErrors = {
  containerDump: boolean;
  customerWarehouse: boolean;
  detailAddress: boolean;
  deliveryDate: boolean;
  note: boolean;
  containerType: boolean;
};

export const IEFillInformation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setStep } = useContext(StepContext);
  const { informationStore, fillInformation, getNearestTrailerFromStartPoint, getNearestTrailerFromEndPoint } =
    useIETransportInformationStore();

  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [information, setInformation] = useState<TTransportInformation>(informationStore);
  const [containerDump, setContainerDump] = useState<TDump | undefined>(undefined);
  const [containerDumpList, setContainerDumpList] = useState<TDump[]>([]);
  const [customerWarehouseList, setCustomerWarehouseList] = useState<TDump[]>([]);
  const [customerWarehouse, setCustomerWarehouse] = useState<TDump | undefined>(undefined);
  const [error, setError] = useState<TIEFillInformationErrors>({
    containerDump: false,
    customerWarehouse: false,
    deliveryDate: false,
    detailAddress: false,
    note: false,
    containerType: false
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    const checkError = Object.keys(error).filter((key) => {
      if (!information[key as keyof TTransportInformation]) {
        setError((prev) => ({
          ...prev,
          [key as keyof TIEFillInformationErrors]: true
        }));

        return true;
      }

      return false;
    });

    if (checkError.length !== 0) return;

    if (information.customerWarehouse) {
      await axiosInstance
        .get('dump/nearest-trailer', {
          params: {
            latitude: information.customerWarehouse.latitude,
            longitude: information.customerWarehouse.longitude
          }
        })
        .then((res) => res.data.data)
        .then((data) => getNearestTrailerFromStartPoint([data.latitude, data.longitude]));
    }

    if (information.containerDump) {
      await axiosInstance
        .get('dump/nearest-trailer', {
          params: {
            latitude: information.containerDump.latitude,
            longitude: information.containerDump.longitude
          }
        })
        .then((res) => res.data.data)
        .then((data) => getNearestTrailerFromEndPoint([data.latitude, data.longitude]));
    }

    fillInformation({
      ...information
    });

    setStep(ETRANSPORT_INFORMATION_STEPS.CONFIRM_LOCATION);
  };

  const handleChangeSection = (step: EIESteps) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('section', step);

    setSearchParams(newParams);
  };

  const handleSetContainerDump = (dump: TDump) => {
    setError((prev) => ({ ...prev, containerDump: false }));
    setContainerDump(dump as TDump);
    setInformation((prev) => ({
      ...prev,
      containerDump: dump
    }));
  };

  const handleSetCustomerWarehouse = (dump: TDump) => {
    setCustomerWarehouse(dump as TDump);
    setError((prev) => ({ ...prev, customerWarehouse: false }));
    setInformation((prev) => ({
      ...prev,
      customerWarehouse: dump
    }));
  };

  const handleSetDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, detailAddress: false }));
    setInformation((prev) => ({
      ...prev,
      detailAddress: e.target.value
    }));
  };

  const handleSetNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, note: false }));
    setInformation((prev) => ({
      ...prev,
      note: e.target.value
    }));
  };

  const handleRemoveWarehouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    e.stopPropagation();

    axiosInstance
      .delete(`dump/${id}`)
      .then(() => userId && handleGetCustomerWarehouseList(userId))
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  const handleCheckContainerType = (type: ECONTAINER_TYPE) => {
    setInformation((prev) => ({ ...prev, containerType: type }));
    setError((prev) => ({ ...prev, containerType: false }));
  };

  const MenuList = (props: MenuListProps<TDump>) => {
    return (
      <components.MenuList {...props} className="overflow-y-auto h-40">
        {props.children}
      </components.MenuList>
    );
  };

  const Option = (props: OptionProps<TDump>) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          <div onClick={() => props.selectOption} className="flex-1">
            {props.children}
          </div>
          <div
            className="hover:bg-gray-100 p-1 rounded-full cursor-pointer z-10"
            onClick={(e) => handleRemoveWarehouse(e, props.data.id)}
          >
            <Icon icon="mdi:bin-outline" width="24" height="24" className="text-red-400" />
          </div>
        </div>
      </components.Option>
    );
  };

  const NoOptionsMessage = (props: any) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">Vui lòng thêm địa chỉ kho</span>
      </components.NoOptionsMessage>
    );
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  });

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const handleGetCustomerWarehouseList = (userId: number) => {
    axiosInstance
      .get('dump', {
        params: {
          type: 'Customer',
          id: userId
        }
      })
      .then((res) => res.data.data)
      .then((dumpList: TDump[]) => {
        setCustomerWarehouse('' as any);
        setInformation((prev) => ({
          ...prev,
          customerWarehouse: undefined
        }));
        setCustomerWarehouseList(dumpList.map((dump) => ({ ...dump, value: dump.id })));
      })
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  useEffect(() => {
    const containerField = document.getElementById(section as string);

    containerField?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  useEffect(() => {
    if (token) {
      const decodedToken: TJWTToken = jwtDecode(token);

      if (!decodedToken.userId) {
        navigate('/login');
      }

      setUserId(decodedToken.userId);

      handleGetCustomerWarehouseList(decodedToken.userId);
    } else {
      navigate('/login');
    }

    axiosInstance
      .get('dump', {
        params: {
          type: 'Container'
        }
      })
      .then((res) => res.data.data)
      .then((dumpList: TDump[]) => setContainerDumpList(dumpList.map((dump) => ({ ...dump, value: dump.id }))));
  }, []);

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setError((prev) => ({ ...prev, deliveryDate: false }));
    setInformation((prev) => ({
      ...prev,
      deliveryDate: dateString as string
    }));
  };

  return (
    <>
      <p className="text-3xl font-bold mb-10">Form thông tin</p>
      {contextHolder}
      <Card
        id={EIESteps.START_LOCATION}
        title="Kho của bạn"
        onClick={() => handleChangeSection(EIESteps.START_LOCATION)}
        isSelected={section === EIESteps.START_LOCATION}
        className="h-[472px]"
      >
        <Modal
          title="Thêm địa chỉ kho của bạn"
          open={isOpenAddForm}
          footer={null}
          onCancel={() => setIsOpenAddForm(false)}
        >
          <AddCustomerWarehouseForm
            userId={userId}
            setIsOpenAddForm={setIsOpenAddForm}
            setCustomerWarehouseList={setCustomerWarehouseList}
          />
        </Modal>
        <div
          onClick={() => setIsOpenAddForm(true)}
          className="mb-5 border-2 border-green-300 p-2 w-fit rounded-md cursor-pointer hover:bg-green-50"
        >
          <Icon icon="mdi:plus" width="24" height="24" />
        </div>
        <div>
          <p className="mb-4 font-medium">Chọn kho của bạn:</p>
          <Select
            menuIsOpen={true}
            options={customerWarehouseList}
            value={customerWarehouse}
            onChange={(e) => handleSetCustomerWarehouse(e as TDump)}
            placeholder={'Chọn kho của bạn'}
            isSearchable={true}
            getOptionValue={(option) => String(option.title)}
            components={{
              NoOptionsMessage,
              MenuList,
              Option,
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null
            }}
            formatOptionLabel={(dump) => (
              <div className="flex items-center">
                <span>{dump.title}</span>
              </div>
            )}
          />
          {error.customerWarehouse && <p className="text-red-400 mt-44 text-sm">Thông tin này được yêu cầu</p>}
        </div>
      </Card>
      <Card
        id={EIESteps.DETAIL_INFORMATION}
        title="Thông tin chi tiết"
        onClick={() => handleChangeSection(EIESteps.DETAIL_INFORMATION)}
        isSelected={section === EIESteps.DETAIL_INFORMATION}
      >
        <div className="mb-5">
          <p className="mb-4 font-medium">Loại container:</p>
          <div className="ml-4">
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="small"
                className="bg-green-400"
                onChange={() => handleCheckContainerType(ECONTAINER_TYPE.SMALL)}
                name="container-type"
                defaultChecked={informationStore.containerType === ECONTAINER_TYPE.SMALL}
                value={ECONTAINER_TYPE.SMALL}
              />
              <label htmlFor="small" className="text-sm ml-2">
                20 Feet (3$/km)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="large"
                className="bg-green-400"
                onChange={() => handleCheckContainerType(ECONTAINER_TYPE.LARGE)}
                name="container-type"
                defaultChecked={informationStore.containerType === ECONTAINER_TYPE.LARGE}
                value={ECONTAINER_TYPE.LARGE}
              />
              <label htmlFor="large" className="text-sm ml-2">
                40 Feet (4$/km)
              </label>
            </div>
          </div>
          {error.containerType && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div className="mb-5">
          <p className="mb-4 font-medium">Bãi Container:</p>
          <Select
            options={containerDumpList}
            value={containerDump}
            onChange={(e) => handleSetContainerDump(e as TDump)}
            placeholder={'Chọn bãi container'}
            isSearchable={true}
            getOptionValue={(option) => String(option.title)}
            components={{ MenuList }}
            formatOptionLabel={(dump) => (
              <div className="flex items-center">
                <span>{dump.title}</span>
              </div>
            )}
          />
          {error.containerDump && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div className="mb-5">
          <p className="mb-4 font-medium">Thời gian nhận đơn:</p>
          <DatePicker onChange={onChange} disabledDate={disabledDate} disabledTime={disabledDateTime} />
          {error.deliveryDate && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div className="mb-5">
          <p className="mb-4 font-medium">Địa chỉ chi tiết:</p>
          <input
            type="text"
            onChange={handleSetDetailAddress}
            className={`block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
          />
          {error.detailAddress && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div>
          <p className="mb-4 font-medium">Ghi chú:</p>
          <input
            type="text"
            onChange={handleSetNote}
            className={`block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
          />
          {error.note && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
      </Card>
      <div className="flex justify-end z-10">
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white" onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </div>
    </>
  );
};
