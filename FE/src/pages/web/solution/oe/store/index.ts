import { create } from 'zustand';
import { ECONTAINER_TYPE } from '../enums';
import { LatLngExpression } from 'leaflet';
import { TDump } from '../../../../../types';

export type TOETransportInformationState = {
  nearestTrailerFromStartPoint?: TDump;
  nearestTrailerFromEndPoint?: TDump;
  informationStore: TTransportInformation;
  fillInformation: (information: TTransportInformation) => void;
  getNearestTrailerFromStartPoint: (id: number, trailer: LatLngExpression) => void;
  getNearestTrailerFromEndPoint: (id: number, trailer: LatLngExpression) => void;
};

export type TTransportInformation = {
  customerWarehouse?: TDump;
  containerDump?: TDump;
  containerType?: ECONTAINER_TYPE;
  detailAddress?: string;
  deliveryDate?: string;
  note?: string;
};

export const useOETransportInformationStore = create<TOETransportInformationState>((set) => ({
  nearestTrailerFromStartPoint: undefined,
  nearestTrailerFromEndPoint: undefined,
  informationStore: {
    containerType: undefined,
    detailAddress: undefined,
    note: undefined,
    deliveryDate: undefined,
    customerWarehouse: undefined,
    containerDump: undefined
  },
  fillInformation: (information: TTransportInformation) => set(() => ({ informationStore: information })),
  getNearestTrailerFromStartPoint: (id: number, trailer: any) =>
    set((state) => {
      const dump: TDump = {
        id: id,
        latitude: trailer[0],
        longitude: trailer[1],
        title: '',
        status: '',
        createdAt: ''
      };

      return {
        ...state,
        nearestTrailerFromStartPoint: dump
      };
    }),
  getNearestTrailerFromEndPoint: (id: number, trailer: any) =>
    set((state) => {
      const dump: TDump = {
        id: id,
        latitude: trailer[0],
        longitude: trailer[1],
        title: '',
        status: '',
        createdAt: ''
      };

      return {
        ...state,
        nearestTrailerFromEndPoint: dump
      };
    })
}));
