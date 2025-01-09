import { Icon } from '@iconify/react/dist/iconify.js';
import { Dropdown, MenuProps, notification } from 'antd';
import { axiosInstance } from '../../../api/axios';
import { TLatLng, TOrder, TTruck } from '../../../types';
import { openNotification } from '../../../utils';

type Props = {
  truckList: TTruck[];
  handleGetOrderList: () => void;
  record: TOrder & {
    totalDistance: number;
    routingList: {
      id: number;
      port: TLatLng;
      customerWarehouse: TLatLng;
      startTrailer: TLatLng;
      endTrailer: TLatLng;
      container: TLatLng;
    }[];
  };
};

export const TruckColumn = ({ record, truckList, handleGetOrderList }: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const handleChangeTruck = (truckId: number) => {
    axiosInstance
      .put(`order/${record.id}`, { truckId })
      .then(() => {
        openNotification(api, 'success', 'Change truck successfully');
        handleGetOrderList();
      })
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  const items: MenuProps['items'] = truckList.map((truck, index) => ({
    key: index + 1,
    label: <div>{truck.title}</div>,
    onClick: () => {
      handleChangeTruck(truck.id);
    }
  }));

  return (
    <div className="flex justify-between items-center gap-x-2">
      {contextHolder}
      <p>{record.truckId === 0 ? `None` : truckList.find((truck) => truck.id === record.truckId)?.title}</p>
      {record.truckId !== 0 && record.status === 'Waiting' && (
        <div className="cursor-pointer">
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Icon icon="material-symbols-light:change-circle-outline" width="24" height="24" />
          </Dropdown>
        </div>
      )}
    </div>
  );
};
