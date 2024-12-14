import { DatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { LatLngExpression } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select, { MenuListProps, components } from 'react-select';
import { axiosInstance } from '../../../../../../../api/axios';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EOESteps } from '../../../../../../../enums';
import { TDump } from '../../../../../../../types';
import { Map } from '../../../../components/map/Map';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { TTransportInformation, useOETransportInformationStore } from '../../../store';
import { StepContext } from '../OETransportInformation';

type TOEFillInformationErrors = {
  startPoint: boolean;
  containerDump: boolean;
  detailAddress: boolean;
  deliveryDate: boolean;
  note: boolean;
  containerType: boolean;
};

export const OEFillInformation = () => {
  const { setStep } = useContext(StepContext);
  const { informationStore, fillInformation, getNearestTrailerFromStartPoint, getNearestTrailerFromEndPoint } =
    useOETransportInformationStore();

  const [information, setInformation] = useState<TTransportInformation>(informationStore);
  const [containerDump, setContainerDump] = useState<TDump | undefined>(undefined);
  const [containerDumpList, setContainerDumpList] = useState<TDump[]>([]);
  const [error, setError] = useState<TOEFillInformationErrors>({
    startPoint: false,
    containerDump: false,
    deliveryDate: false,
    detailAddress: false,
    note: false,
    containerType: false
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const handleSubmit = async () => {
    const checkError = Object.keys(error).filter((key) => {
      if (!information[key as keyof TTransportInformation]) {
        setError((prev) => ({
          ...prev,
          [key as keyof TOEFillInformationErrors]: true
        }));

        return true;
      }

      return false;
    });

    if (checkError.length !== 0) return;

    if (information.startPoint) {
      await axiosInstance
        .get('dump/nearest-trailer', {
          params: {
            latitude: (information.startPoint as any).lat,
            longitude: (information.startPoint as any).lng
          }
        })
        .then((res) => res.data.data)
        .then((data) => getNearestTrailerFromEndPoint([data.latitude, data.longitude]));
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
        .then((data) => getNearestTrailerFromStartPoint([data.latitude, data.longitude]));
    }

    fillInformation({
      ...information
    });

    setStep(ETRANSPORT_INFORMATION_STEPS.CONFIRM_LOCATION);
  };

  const handleChangeSection = (step: EOESteps) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('section', step);

    setSearchParams(newParams);
  };

  const handleSetLocation = (exp: LatLngExpression) => {
    setError((prev) => ({ ...prev, startPoint: false }));
    setInformation((prev) => ({
      ...prev,
      startPoint: exp
    }));
  };

  const handleSetContainerDump = (dump: TDump) => {
    setError((prev) => ({ ...prev, containerDump: false }));
    setContainerDump(dump as TDump);
    setInformation((prev) => ({
      ...prev,
      containerDump: dump
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

  useEffect(() => {
    const containerField = document.getElementById(section as string);

    containerField?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  useEffect(() => {
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
      <Card
        id={EOESteps.START_LOCATION}
        title="Kho của bạn"
        onClick={() => handleChangeSection(EOESteps.START_LOCATION)}
        isSelected={section === EOESteps.START_LOCATION}
      >
        <div className="h-full">
          <Map Location={information.startPoint} setLocation={(e) => handleSetLocation(e)} />
          {error.startPoint && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
      </Card>
      <Card
        id={EOESteps.DETAIL_INFORMATION}
        title="Thông tin chi tiết"
        onClick={() => handleChangeSection(EOESteps.DETAIL_INFORMATION)}
        isSelected={section === EOESteps.DETAIL_INFORMATION}
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
