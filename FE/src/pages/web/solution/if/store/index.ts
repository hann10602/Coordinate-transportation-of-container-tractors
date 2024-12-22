import { create } from 'zustand';
import { ECONTAINER_TYPE } from '../enums';
import { LatLngExpression } from 'leaflet';
import { TDump } from '../../../../../types';

export type TIFTransportInformationState = {
  nearestTrailerFromStartPoint?: LatLngExpression;
  nearestTrailerFromEndPoint?: LatLngExpression;
  informationStore: TTransportInformation;
  fillInformation: (information: TTransportInformation) => void;
  getNearestTrailerFromStartPoint: (trailer: LatLngExpression) => void;
  getNearestTrailerFromEndPoint: (trailer: LatLngExpression) => void;
};

export type TTransportInformation = {
  customerWarehouse?: TDump;
  portDump?: TDump;
  containerType?: ECONTAINER_TYPE;
  detailAddress?: string;
  deliveryDate?: string;
  note?: string;
};

export const useIFTransportInformationStore = create<TIFTransportInformationState>((set) => ({
  nearestTrailerFromStartPoint: undefined,
  nearestTrailerFromEndPoint: undefined,
  informationStore: {
    containerType: undefined,
    detailAddress: undefined,
    note: undefined,
    deliveryDate: undefined,
    customerWarehouse: undefined,
    portDump: undefined
  },
  fillInformation: (information: TTransportInformation) => set(() => ({ informationStore: information })),
  getNearestTrailerFromStartPoint: (trailer: LatLngExpression) =>
    set(() => ({ nearestTrailerFromStartPoint: trailer })),
  getNearestTrailerFromEndPoint: (trailer: LatLngExpression) => set(() => ({ nearestTrailerFromEndPoint: trailer }))
}));
