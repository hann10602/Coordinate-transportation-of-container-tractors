import { EIESteps } from '../enums';
import { TRequestSidebarMenu } from '../types';

export const IEFillInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Container information', code: EIESteps.CONTAINER_INFORMATION },
  { title: 'Start location', code: EIESteps.START_LOCATION },
  { title: 'End location', code: EIESteps.END_LOCATION }
];

export const IEConfirmInformationMenu: TRequestSidebarMenu[] = [
  { title: 'Distance', code: EIESteps.DISTANCE },
  { title: 'Result', code: EIESteps.RESULT }
];
