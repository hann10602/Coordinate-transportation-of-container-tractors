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

export type TUser = {
  id: number;
  fullName: string;
  username: string;
  password: string;
  role: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
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
