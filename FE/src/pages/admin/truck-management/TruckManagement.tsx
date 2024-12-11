import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Button, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { openNotification } from '../../../utils';
import { AddAndUpdateTruckForm } from './AddAndUpdateTruckForm';
import { TTruck } from '../../../types';

export const TruckManagement = () => {
  const [currentInstance, setCurrentInstance] = useState<TTruck | undefined>(undefined);
  const [isOpenAddAndUpdateForm, setIsOpenAddAndUpdateForm] = useState<boolean>(false);
  const [truckList, setTruckList] = useState<TTruck[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const columns: TableColumnsType<TTruck> = [
    {
      key: '',
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 3
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 2
      }
    },
    {
      title: 'Number plate',
      dataIndex: 'numberPlate'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status),
        multiple: 2
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <div
            className="px-1 py-0.5 rounded-sm bg-blue-400 text-white cursor-pointer"
            onClick={() => {
              setCurrentInstance(record);
              setIsOpenAddAndUpdateForm(true);
            }}
          >
            <Icon icon="ic:round-edit-note" width="24" height="24" />
          </div>
          <div
            className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer"
            onClick={() => handleDelete(record.id)}
          >
            <Icon icon="mdi:garbage-can-outline" width="24" height="24" />
          </div>
        </div>
      )
    }
  ];

  const handleGetList = () => {
    axiosInstance.get('truck').then((res) => setTruckList(res.data.data));
  };

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`truck/${id}`)
      .then(() => {
        openNotification(api, 'success');
        handleGetList();
      })
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div className="flex flex-col">
      {contextHolder}
      <div className="flex justify-between items-center mb-10">
        <p className="text-2xl font-semibold">Truck</p>
        <Button className="px-10 py-5" onClick={() => setIsOpenAddAndUpdateForm(true)}>
          Add
        </Button>
        <AddAndUpdateTruckForm
          currentInstance={currentInstance}
          setCurrentInstance={setCurrentInstance}
          handleGetList={handleGetList}
          isOpenAddAndUpdateForm={isOpenAddAndUpdateForm}
          setIsOpenAddAndUpdateForm={setIsOpenAddAndUpdateForm}
          handleCloseModal={() => setIsOpenAddAndUpdateForm(false)}
        />
      </div>
      <div className="flex-1">
        <Table<TTruck> rowKey="id" columns={columns} pagination={{ pageSize: 8 }} dataSource={truckList} />
      </div>
    </div>
  );
};
