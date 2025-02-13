import { Modal } from 'antd';
import { LatLngExpression } from 'leaflet';
import React, { useMemo } from 'react';
import { TLatLng, TOrder } from '../../../types';
import { destinationConvertion } from '../../../utils';
import { RoutineMachineMap } from '../solution/components/map/RoutineMachineMap';

type Props = {
  currentInstance?: TOrder;
  setCurrentInstance: React.Dispatch<React.SetStateAction<TOrder | undefined>>;
  handleGetList: () => void;
  isOpenTrackingForm: boolean;
  setIsOpenTrackingForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TrackingForm = ({
  currentInstance,
  setCurrentInstance,
  setIsOpenTrackingForm,
  isOpenTrackingForm,
  handleGetList
}: Props) => {
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

  return (
    <Modal
      open={isOpenTrackingForm}
      footer={null}
      title={`Order ${currentInstance && currentInstance.id}`}
      onCancel={() => {
        setCurrentInstance(undefined);
        setIsOpenTrackingForm(false);
      }}
    >
      <div className="overflow-y-auto w-[1000px]">
        <div className="relative w-full space-y-2 mt-8">
          <label className="mb-2 font-semibold">Position</label>{' '}
          <div className="h-[480px]">
            <RoutineMachineMap
              key={currentInstance?.currentPosition}
              routingList={routingList}
              currentDestination={currentInstance ? routingList[currentInstance.currentPosition] : undefined}
              nextPoint={currentInstance ? currentInstance.currentPosition + 1 : undefined}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
