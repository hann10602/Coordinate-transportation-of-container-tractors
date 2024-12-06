import { LatLngExpression } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select, { MenuListProps, components } from 'react-select';
import { axiosInstance } from '../../../../../../../api/axios';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EIESteps } from '../../../../../../../enums';
import { TDump } from '../../../../../../../types';
import { Map } from '../../../../components/map/Map';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { TTransportInformation, useIETransportInformationStore } from '../../../store';
import { StepContext } from '../IETransportInformation';

type TIEFillInformationErrors = {
  startPoint: boolean;
  portDump: boolean;
  detailAddress: boolean;
  note: boolean;
  containerType: boolean;
};

export const IEFillInformation = () => {
  const { setStep } = useContext(StepContext);
  const { informationStore, fillInformation, getNearestTrailer } = useIETransportInformationStore();

  const [information, setInformation] = useState<TTransportInformation>(informationStore);
  const [portDump, setPortDump] = useState<TDump | undefined>(undefined);
  const [portDumpList, setPortDumpList] = useState<TDump[]>([]);
  const [error, setError] = useState<TIEFillInformationErrors>({
    startPoint: false,
    portDump: false,
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
          [key as keyof TIEFillInformationErrors]: true
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
        .then((data) => getNearestTrailer([data.latitude, data.longitude]));
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

  const handleSetLocation = (exp: LatLngExpression) => {
    setError((prev) => ({ ...prev, startPoint: false }));
    setInformation((prev) => ({
      ...prev,
      startPoint: exp
    }));
  };

  const handleSetPortDump = (dump: TDump) => {
    setError((prev) => ({ ...prev, portDump: false }));
    setPortDump(dump as TDump);
    setInformation((prev) => ({
      ...prev,
      portDump: dump
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

  useEffect(() => {
    const containerField = document.getElementById(section as string);

    containerField?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  useEffect(() => {
    axiosInstance
      .get('dump', {
        params: {
          type: 'Port'
        }
      })
      .then((res) => res.data.data)
      .then((dumpList: TDump[]) => setPortDumpList(dumpList.map((dump) => ({ ...dump, value: dump.id }))));
  }, []);

  return (
    <>
      <p className="text-3xl font-bold mb-10">Form thông tin</p>
      <Card
        id={EIESteps.START_LOCATION}
        title="Kho của bạn"
        onClick={() => handleChangeSection(EIESteps.START_LOCATION)}
        isSelected={section === EIESteps.START_LOCATION}
      >
        <div className="h-full">
          <Map Location={information.startPoint} setLocation={(e) => handleSetLocation(e)} />
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
          <p className="mb-4 font-medium">Địa chỉ chi tiết:</p>
          <Select
            options={portDumpList}
            value={portDump}
            onChange={(e) => handleSetPortDump(e as TDump)}
            placeholder={'Select port dump'}
            isSearchable={true}
            getOptionValue={(option) => String(option.title)}
            components={{ MenuList }}
            formatOptionLabel={(dump) => (
              <div className="flex items-center">
                <span>{dump.title}</span>
              </div>
            )}
          />
          {error.portDump && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div className="mb-5">
          <p className="mb-4 font-medium">Địa chỉ chi tiết:</p>
          <input
            type="text"
            onChange={handleSetDetailAddress}
            className={`${error.detailAddress ? '!border-red-600' : '!border-gray-400'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
          />
          {error.detailAddress && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
        <div>
          <p className="mb-4 font-medium">Ghi chú:</p>
          <input
            type="text"
            onChange={handleSetNote}
            className={`${error.note ? '!border-red-600' : '!border-gray-400'} block rounded-md w-full px-4 py-2 text-black placeholder:text-xl border outline-none`}
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
