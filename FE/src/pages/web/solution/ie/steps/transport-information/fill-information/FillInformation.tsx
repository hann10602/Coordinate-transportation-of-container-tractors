import { LatLngExpression } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EIESteps } from '../../../../../../../enums';
import { Map } from '../Map';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { TTransportInformation, useIETransportInformationStore } from '../../../store';
import { StepContext } from '../IETransportInformation';

type TIEFillInformationErrors = {
  startPoint: boolean;
  endPoint: boolean;
  containerType: boolean;
};

export const IEFillInformation = () => {
  const { setStep } = useContext(StepContext);
  const { informationStore, fillInformation } = useIETransportInformationStore();

  const [information, setInformation] = useState<TTransportInformation>(informationStore);
  const [error, setError] = useState<TIEFillInformationErrors>({
    startPoint: false,
    endPoint: false,
    containerType: false
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  console.log(Number('105.76609500340967'));

  const handleSubmit = () => {
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

  const handleSetLocation = (exp: LatLngExpression, type: 'start' | 'end') => {
    if (type === 'start') {
      setError((prev) => ({ ...prev, startPoint: false }));
      setInformation((prev) => ({
        ...prev,
        startPoint: exp
      }));
    } else {
      setError((prev) => ({ ...prev, endPoint: false }));
      setInformation((prev) => ({
        ...prev,
        endPoint: exp
      }));
    }
  };

  const handleCheckContainerType = (type: ECONTAINER_TYPE) => {
    setInformation((prev) => ({ ...prev, containerType: type }));
    setError((prev) => ({ ...prev, containerType: false }));
  };

  useEffect(() => {
    const containerField = document.getElementById(section as string);

    containerField?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  return (
    <>
      <p className="text-3xl font-bold mb-10">Form thông tin</p>
      <Card
        id={EIESteps.CONTAINER_INFORMATION}
        title="Thông tin container"
        onClick={() => handleChangeSection(EIESteps.CONTAINER_INFORMATION)}
        isSelected={section === EIESteps.CONTAINER_INFORMATION}
      >
        <p className="mb-4">Loại container:</p>
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
      </Card>
      <Card
        id={EIESteps.START_LOCATION}
        title="Điểm xuất phát"
        onClick={() => handleChangeSection(EIESteps.START_LOCATION)}
        isSelected={section === EIESteps.START_LOCATION}
      >
        <div className="h-full">
          <Map Location={information.startPoint} setLocation={(e) => handleSetLocation(e, 'start')} />
          {error.startPoint && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
      </Card>
      <Card
        id={EIESteps.END_LOCATION}
        title="Điểm trả hàng"
        onClick={() => handleChangeSection(EIESteps.END_LOCATION)}
        isSelected={section === EIESteps.END_LOCATION}
      >
        <div className="h-full">
          <Map Location={information.endPoint} setLocation={(e) => handleSetLocation(e, 'end')} />
          {error.endPoint && <p className="text-red-400 mt-2 text-sm">Thông tin này được yêu cầu</p>}
        </div>
      </Card>
      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white" onClick={handleSubmit}>
          Lưu thông tin
        </Button>
      </div>
    </>
  );
};
