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

export type TJWTToken = {
  userId: number;
  name: string;
  role: string;
  ttl: number;
};

export type TUserDetails = {
  fullName: string;
  phoneNumber: string;
  orders: TOrdersForUserDetails[];
};

export type TOrdersForUserDetails = {
  id: number;
  deliveryDate: string;
  status: string;
  totalPrice: number;
  type: string;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
