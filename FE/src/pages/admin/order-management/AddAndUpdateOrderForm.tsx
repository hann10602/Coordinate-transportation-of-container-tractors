import { Button, Modal, notification } from 'antd';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TLatLng, TOrder } from '../../../types';
import { destinationConvertion, openNotification } from '../../../utils';
import { RoutineMachineMap } from '../../web/solution/components/map/RoutineMachineMap';

type Props = {
  currentInstance?: TOrder & {
    totalDistance: number;
    routingList: {
      id: number;
      port: TLatLng;
      customerWarehouse: TLatLng;
      startTrailer: TLatLng;
      endTrailer: TLatLng;
      container: TLatLng;
    }[];
  };
  setCurrentInstance: React.Dispatch<
    React.SetStateAction<
      | (TOrder & {
          totalDistance: number;
          routingList: {
            id: number;
            port: TLatLng;
            customerWarehouse: TLatLng;
            startTrailer: TLatLng;
            endTrailer: TLatLng;
            container: TLatLng;
          }[];
        })
      | undefined
    >
  >;
  handleGetList: () => void;
  isOpenAddAndUpdateForm: boolean;
  setIsOpenAddAndUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddAndUpdateOrderForm = ({
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
        ? currentInstance.routingList.reduce((result, routing, index) => {
            if (index === 0) {
              result.push([Number(routing.startTrailer.latitude), Number(routing.startTrailer.longitude)]);
            }

            result.push(
              [
                Number(
                  (routing[destinationConvertion[currentInstance.type].startPoint as keyof typeof routing] as TLatLng)
                    .latitude
                ),
                Number(
                  (routing[destinationConvertion[currentInstance.type].startPoint as keyof typeof routing] as TLatLng)
                    .longitude
                )
              ],
              [
                Number(
                  (routing[destinationConvertion[currentInstance.type].endPoint as keyof typeof routing] as TLatLng)
                    .latitude
                ),
                Number(
                  (routing[destinationConvertion[currentInstance.type].endPoint as keyof typeof routing] as TLatLng)
                    .longitude
                )
              ]
            );

            if (index === currentInstance.routingList.length - 1) {
              result.push([Number(routing.endTrailer.latitude), Number(routing.endTrailer.longitude)]);
            }
            return result;
          }, [] as LatLngExpression[])
        : [],
    [currentInstance]
  );

  const handleNextStep = () => {
    axiosInstance
      .put(`order/next-step/${currentInstance?.id}/${currentInstance?.truckId}`, {
        endTrailerId:
          currentInstance &&
          (currentInstance[destinationConvertion[currentInstance.type].endPoint as keyof TOrder] as TLatLng).id,
        currentPosition: currentInstance && currentInstance?.currentPosition + 1,
        truckId: currentInstance?.truckId,
        status: currentInstance?.status
      })
      .then(() => {
        openNotification(api, 'success');
        handleGetList();
        if (currentInstance?.currentPosition === 2) {
          setCurrentInstance(undefined);
          setIsOpenAddAndUpdateForm(false);
        } else {
          setCurrentInstance((prev) => prev && { ...prev, currentPosition: prev.currentPosition + 1 });
        }
      })
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  return (
    <Modal
      open={isOpenAddAndUpdateForm}
      footer={null}
      title={`Order ${currentInstance && currentInstance.id}`}
      onCancel={() => {
        setCurrentInstance(undefined);
        setIsOpenAddAndUpdateForm(false);
      }}
    >
      <div className="space-y-2 mt-4">
        <div>
          <label className="font-semibold">Total Distance:</label>
          <span className="ml-2">{currentInstance?.totalDistance} km</span>
        </div>
        <div className="flex items-center">
          <label className="font-semibold">Order List:</label>
          <div className="ml-2 flex items-center">
            {currentInstance?.routingList.map((routing, index) => (
              <li key={index}>
                <div>
                  {routing.id} {index !== currentInstance.routingList.length - 1 && ' -> '}
                </div>
              </li>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto w-[1000px]">
          {contextHolder}
          <div className="relative w-full space-y-2">
            <label className="mb-2 font-semibold">Position</label>{' '}
            <div className="h-[440px]">
              <RoutineMachineMap
                key={currentInstance?.currentPosition}
                routingList={routingList}
                currentDestination={currentInstance ? routingList[currentInstance.currentPosition] : undefined}
                nextPoint={currentInstance ? currentInstance.currentPosition + 1 : undefined}
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
      </div>
    </Modal>
  );
};
