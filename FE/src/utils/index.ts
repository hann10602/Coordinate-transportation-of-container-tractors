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
