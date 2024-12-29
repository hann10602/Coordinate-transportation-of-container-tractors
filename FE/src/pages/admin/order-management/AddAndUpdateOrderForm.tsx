import { Button, Modal, notification } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TLatLng, TOrder } from '../../../types';
import { openNotification } from '../../../utils';
import { RoutineMachineMap } from '../../web/solution/components/map/RoutineMachineMap';

const destinationConvertion = {
  IE: {
    startPoint: 'customerWarehouse',
    endPoint: 'container'
  },
  IF: {
    startPoint: 'port',
    endPoint: 'customerWarehouse'
  },
  OE: {
    startPoint: 'container',
    endPoint: 'customerWarehouse'
  },
  OF: {
    startPoint: 'customerWarehouse',
    endPoint: 'port'
  }
};

type Props = {
  handleCloseModal: () => void;
  currentInstance?: TOrder;
  setCurrentInstance: React.Dispatch<React.SetStateAction<TOrder | undefined>>;
  handleGetList: () => void;
  isOpenAddAndUpdateForm: boolean;
  setIsOpenAddAndUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAndUpdateOrderForm = ({
  handleCloseModal,
  currentInstance,
  setCurrentInstance,
  setIsOpenAddAndUpdateForm,
  isOpenAddAndUpdateForm,
  handleGetList
}: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const routingList: LatLngExpression[] = useMemo(
    () =>
      currentInstance
        ? [
            [Number(currentInstance.startTrailer.latitude), Number(currentInstance.startTrailer.longitude)],
            [
              Number(
                (currentInstance[destinationConvertion[currentInstance.type].startPoint as keyof TOrder] as TLatLng)
                  .latitude
              ),
              Number(
                (currentInstance[destinationConvertion[currentInstance.type].startPoint as keyof TOrder] as TLatLng)
                  .longitude
              )
            ],
            [
              Number(
                (currentInstance[destinationConvertion[currentInstance.type].endPoint as keyof TOrder] as TLatLng)
                  .latitude
              ),
              Number(
                (currentInstance[destinationConvertion[currentInstance.type].endPoint as keyof TOrder] as TLatLng)
                  .longitude
              )
            ],
            [Number(currentInstance.endTrailer.latitude), Number(currentInstance.endTrailer.longitude)]
          ]
        : [],
    [currentInstance]
  );

  const handleNextStep = () => {
    axiosInstance
      .put(`order/next-step/${currentInstance?.id}`, {
        currentPosition: currentInstance?.currentPosition,
        truckId: currentInstance?.truckId
      })
      .then(() => {
        handleCloseModal();
        openNotification(api, 'success');
        handleGetList();
        setCurrentInstance(undefined);
      })
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  useEffect(() => {
    // setValue('title', currentInstance ? currentInstance.title : '');
  }, [currentInstance]);

  return (
    <Modal
      open={isOpenAddAndUpdateForm}
      footer={null}
      title={`Order checking`}
      onCancel={() => {
        setCurrentInstance(undefined);
        setIsOpenAddAndUpdateForm(false);
      }}
    >
      <div className="overflow-y-auto w-[1000px]">
        {contextHolder}
        <div className="relative w-full space-y-2 mt-8">
          <label className="mb-2 font-semibold">Position</label>{' '}
          <div className="h-[480px]">
            <RoutineMachineMap
              routingList={routingList}
              currentDestination={currentInstance ? routingList[currentInstance.currentPosition] : undefined}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="text font-semibold mt-12 hover:bg-cyan-700 border-cyan-700 transition ease-in-out"
            onClick={handleNextStep}
          >
            Next step
          </Button>
        </div>
      </div>
    </Modal>
  );
};
