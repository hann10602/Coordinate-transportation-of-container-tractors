import { EIESteps } from '../enums';
import { TRequestSidebarMenu } from '../types';

export const IEFillInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Vị trí kho', code: EIESteps.START_LOCATION },
  { title: 'Thông tin chi tiết', code: EIESteps.DETAIL_INFORMATION },
  { title: 'Cảng', code: EIESteps.PORT_DUMP }
];

export const IEConfirmInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Khoảng cách', code: EIESteps.DISTANCE },
  { title: 'Chi phí', code: EIESteps.RESULT }
];

export const IFFillInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Vị trí kho', code: EIESteps.START_LOCATION },
  { title: 'Thông tin chi tiết', code: EIESteps.DETAIL_INFORMATION },
  { title: 'Cảng', code: EIESteps.PORT_DUMP }
];

export const IFConfirmInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Khoảng cách', code: EIESteps.DISTANCE },
  { title: 'Chi phí', code: EIESteps.RESULT }
];

export const OEFillInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Vị trí kho', code: EIESteps.START_LOCATION },
  { title: 'Thông tin chi tiết', code: EIESteps.DETAIL_INFORMATION },
  { title: 'Cảng', code: EIESteps.PORT_DUMP }
];

export const OEConfirmInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Khoảng cách', code: EIESteps.DISTANCE },
  { title: 'Chi phí', code: EIESteps.RESULT }
];

export const OFFillInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Vị trí kho', code: EIESteps.START_LOCATION },
  { title: 'Thông tin chi tiết', code: EIESteps.DETAIL_INFORMATION },
  { title: 'Cảng', code: EIESteps.PORT_DUMP }
];

export const OFConfirmInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Khoảng cách', code: EIESteps.DISTANCE },
  { title: 'Chi phí', code: EIESteps.RESULT }
];
