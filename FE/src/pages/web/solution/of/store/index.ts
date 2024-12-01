import { create } from 'zustand';
import { ECONTAINER_TYPE } from '../enums';
import { LatLngExpression } from 'leaflet';
import { TDump } from '../../../../../types';

export type TOFTransportInformationState = {
  informationStore: TTransportInformation;
  fillInformation: (information: TTransportInformation) => void;
};

export type TTransportInformation = {
  startPoint?: LatLngExpression;
  portDump?: TDump;
  containerType?: ECONTAINER_TYPE;
  detailAddress?: string;
  note?: string;
};

export const useOFTransportInformationStore = create<TOFTransportInformationState>((set) => ({
  informationStore: {
    containerType: undefined,
    detailAddress: undefined,
    note: undefined,
    startPoint: undefined,
    portDump: undefined
  },
  fillInformation: (information: TTransportInformation) => set(() => ({ informationStore: information }))
}));
