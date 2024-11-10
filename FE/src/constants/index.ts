import { EIESteps } from '../enums';
import { TRequestSidebarMenu } from '../types';

export const IERequestMenu: TRequestSidebarMenu[] = [
  { title: 'Start location', code: EIESteps.START_LOCATION },
  { title: 'Container information', code: EIESteps.CONTAINER_INFORMATION },
  { title: 'End location', code: EIESteps.END_LOCATION }
];
