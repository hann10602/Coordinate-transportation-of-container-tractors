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

export type TAdvisory = {
  id: number;
  phoneNumber: string;
  email: string;
  note: string;
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
  orders: TOrder[];
};

export type TLatLng = {
  id: number;
  latitude: string;
  longitude: string;
};

export type TOrder = {
  id: number;
  deliveryDate: string;
  currentPosition: number;
  truckId: number;
  user: {
    username: string;
  };
  status: string;
  totalPrice: number;
  note: string;
  detailAddress: string;
  type: 'IE' | 'IF' | 'OE' | 'OF';
  port: TLatLng;
  customerWarehouse: TLatLng;
  startTrailer: TLatLng;
  endTrailer: TLatLng;
  container: TLatLng;
  createdAt: string;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
