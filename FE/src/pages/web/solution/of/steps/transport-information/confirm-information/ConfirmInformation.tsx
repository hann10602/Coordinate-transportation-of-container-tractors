import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../../../../../../api/axios';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EOFSteps } from '../../../../../../../enums';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { useOFTransportInformationStore } from '../../../store';
import { StepContext } from '../OFTransportInformation';
import { RoutineMachineMap } from '../../../../components/map/RoutineMachineMap';
import { LatLngExpression } from 'leaflet';

const containerTypeConvert = {
  [ECONTAINER_TYPE.SMALL]: {
    title: '20 Feet',
    price: 3
  },
  [ECONTAINER_TYPE.LARGE]: {
    title: '40 Feet',
    price: 4
  }
};

export const OFConfirmInformation = () => {
  const { setStep } = useContext(StepContext);
  const { informationStore, nearestTrailerFromStartPoint, nearestTrailerFromEndPoint } =
    useOFTransportInformationStore();

  const [distance, setDistance] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const totalPrice = informationStore.containerType
    ? (containerTypeConvert[informationStore.containerType].price * distance).toFixed(2)
    : 0;

  const routingList: LatLngExpression[] = useMemo(
    () =>
      informationStore.customerWarehouse &&
      informationStore.portDump &&
      nearestTrailerFromStartPoint &&
      nearestTrailerFromEndPoint
        ? [
            nearestTrailerFromStartPoint,
            [Number(informationStore.customerWarehouse.latitude), Number(informationStore.customerWarehouse.longitude)],
            [Number(informationStore.portDump.latitude), Number(informationStore.portDump.longitude)],
            nearestTrailerFromEndPoint
          ]
        : [],
    [
      informationStore.customerWarehouse,
      informationStore.portDump,
      nearestTrailerFromStartPoint,
      nearestTrailerFromEndPoint
    ]
  );

  const handleCheckout = async () => {
    axiosInstance
      .post('payment/create-checkout-session', {
        price: Number(totalPrice.toString().replace('.', '')),
        'delivery-type': 'Delivery request OF'
      })
      .then((res) => window.open(res.data.data));
  };

  const handleChangeSection = (step: EOFSteps) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('section', step);

    setSearchParams(newParams);
  };

  return (
    <>
      <p className="text-3xl font-bold mb-10">Xác nhận thông tin</p>
      <Card
        id={EOFSteps.DISTANCE}
        title="Quãng đường"
        isSelected={section === EOFSteps.DISTANCE}
        onClick={() => handleChangeSection(EOFSteps.DISTANCE)}
      >
        <div className="h-[600px]">
          <RoutineMachineMap routingList={routingList} setDistance={setDistance} />
        </div>
      </Card>
      <Card
        id={EOFSteps.RESULT}
        title="Chi phí"
        isSelected={section === EOFSteps.RESULT}
        onClick={() => handleChangeSection(EOFSteps.RESULT)}
      >
        <div className="w-full flex justify-between items-center mb-2">
          <p className="font-semibold">Loại container:</p>
          {informationStore.containerType && <p>{containerTypeConvert[informationStore.containerType].title}</p>}
        </div>
        <div className="w-full flex justify-between items-center mb-2">
          <p className="font-semibold">Khoảng cách:</p>
          <p>{distance.toFixed(2)} Km</p>
        </div>
        <hr className="h-0.5 bg-gray-400 w-full" />
        <div className="w-full flex justify-between items-center mt-2">
          <p className="font-semibold">Tổng chi phí:</p>
          <p>{totalPrice}$</p>
        </div>
        <div className="flex justify-end mt-10">
          <Button className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white" onClick={handleCheckout}>
            Xác nhận thanh toán
          </Button>
        </div>
      </Card>
      <div className="flex justify-end gap-x-2">
        <Button
          className="border border-gray-300 hover:bg-gray-100 text-black bg-transparent"
          onClick={() => setStep(ETRANSPORT_INFORMATION_STEPS.FILL_LOCATION)}
        >
          Chỉnh sửa thông tin
        </Button>
      </div>
    </>
  );
};
