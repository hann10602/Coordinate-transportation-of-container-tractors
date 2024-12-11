export type TRequestSidebarMenu = {
  title: string;
  code: string;
};

export type TDump = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
};

export type TTruck = {
  id: number;
  title: string;
  numberPlate: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
