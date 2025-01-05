import { useContext, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../../../../../../api/axios';
import { Button } from '../../../../../../../components';
import { Card } from '../../../../../../../components/Card';
import { EIFSteps } from '../../../../../../../enums';
import { ECONTAINER_TYPE, ETRANSPORT_INFORMATION_STEPS } from '../../../enums';
import { useIFTransportInformationStore } from '../../../store';
import { StepContext } from '../IFTransportInformation';
import { RoutineMachineMap } from '../../../../components/map/RoutineMachineMap';
import { LatLngExpression } from 'leaflet';
import { TJWTToken } from '../../../../../../../types';
import { jwtDecode } from 'jwt-decode';

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

export const IFConfirmInformation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { setStep } = useContext(StepContext);
  const { informationStore, nearestTrailerFromStartPoint, nearestTrailerFromEndPoint } =
    useIFTransportInformationStore();

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
            [Number(nearestTrailerFromStartPoint.latitude), Number(nearestTrailerFromStartPoint.longitude)],
            [Number(informationStore.portDump.latitude), Number(informationStore.portDump.longitude)],
            [Number(informationStore.customerWarehouse.latitude), Number(informationStore.customerWarehouse.longitude)],
            [Number(nearestTrailerFromEndPoint.latitude), Number(nearestTrailerFromEndPoint.longitude)]
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
    let userId;

    if (token) {
      const decodedToken: TJWTToken = jwtDecode(token);

      if (!decodedToken.userId) {
        navigate('/login');
      }

      userId = decodedToken.userId;
    } else {
      navigate('/login');
    }

    axiosInstance
      .post('payment/create-checkout-session', {
        totalPrice: totalPrice.toString().replace('.', ''),
        type: 'IF',
        deliveryDate: informationStore.deliveryDate,
        detailAddress: informationStore.detailAddress,
        note: informationStore.note,
        userId: String(userId),
        customerWarehouseId: String(informationStore.customerWarehouse?.id),
        startTrailerId: String(nearestTrailerFromStartPoint?.id),
        endTrailerId: String(nearestTrailerFromEndPoint?.id),
        portId: String(informationStore.portDump?.id)
      })
      .then((res) => window.open(res.data.data));
  };

  const handleChangeSection = (step: EIFSteps) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('section', step);

    setSearchParams(newParams);
  };

  return (
    <>
      <p className="text-3xl font-bold mb-10">Xác nhận thông tin</p>
      <Card
        id={EIFSteps.DISTANCE}
        title="Quãng đường"
        isSelected={section === EIFSteps.DISTANCE}
        onClick={() => handleChangeSection(EIFSteps.DISTANCE)}
      >
        <div className="h-[600px]">
          <RoutineMachineMap routingList={routingList} setDistance={setDistance} />
        </div>
      </Card>
      <Card
        id={EIFSteps.RESULT}
        title="Chi phí"
        isSelected={section === EIFSteps.RESULT}
        onClick={() => handleChangeSection(EIFSteps.RESULT)}
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
          <Button
            className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white"
            disabled={totalPrice === 0}
            onClick={handleCheckout}
          >
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
