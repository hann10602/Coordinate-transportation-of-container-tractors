import { NotificationInstance } from 'antd/es/notification/interface';
import { NotificationType } from '../types';

export const emailValidation = (value: string) => {
  if (!new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)) return 'Email is invalid';
};

export const openNotification = (api: NotificationInstance, type: NotificationType, log?: string) => {
  let message;

  switch (type) {
    case 'success':
      message = 'Success';
      break;
    case 'info':
      message = 'Info';
      break;
    case 'error':
      message = 'Error';
      break;
    case 'warning':
      message = 'Warning';
      break;
    default:
      message = 'Success';
      break;
  }

  api[type]({
    message,
    description: log
  });
};

export const convertStatus = (status: string) => {
  switch (status) {
    case 'Done':
      return {
        title: 'Hoàn thành',
        class: 'bg-green-500'
      };
    case 'Deleted':
      return {
        title: 'Đã xóa',
        class: 'bg-red-500'
      };
    case 'OnGoing':
      return {
        title: 'Đang vận chuyển',
        class: 'bg-blue-500'
      };
    case 'Waiting':
      return {
        title: 'Chờ Vận chuyển',
        class: 'bg-yellow-500'
      };
    case 'Pending':
      return {
        title: 'Chờ duyệt',
        class: 'bg-gray-500'
      };
    default:
      return {
        title: 'Chờ duyệt',
        class: 'bg-gray-500'
      };
  }
};

export const destinationConvertion = {
  IE: {
    startPoint: 'customerWarehouse',
    endPoint: 'container'
  },
  IF: {
    startPoint: 'port',
    endPoint: 'customerWarehouse'
  },
  OE: {
    startPoint: 'container',
    endPoint: 'customerWarehouse'
  },
  OF: {
    startPoint: 'customerWarehouse',
    endPoint: 'port'
  }
};
