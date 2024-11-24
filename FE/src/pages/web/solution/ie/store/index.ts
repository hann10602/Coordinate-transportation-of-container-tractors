import { create } from 'zustand';
import { ECONTAINER_TYPE } from '../enums';
import { LatLngExpression } from 'leaflet';

export type TIETransportInformationState = {
  informationStore: TTransportInformation;
  fillInformation: (information: TTransportInformation) => void;
};

export type TTransportInformation = {
  startPoint?: LatLngExpression;
  endPoint?: LatLngExpression;
  containerType?: ECONTAINER_TYPE;
};

export const useIETransportInformationStore = create<TIETransportInformationState>((set) => ({
  informationStore: {
    containerType: undefined,
    startPoint: undefined,
    endPoint: undefined
  },
  fillInformation: (information: TTransportInformation) => set(() => ({ informationStore: information }))
}));
