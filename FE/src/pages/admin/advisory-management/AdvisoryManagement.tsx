import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Button, Modal, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TAdvisory } from '../../../types';
import { openNotification } from '../../../utils';
import dayjs from 'dayjs';

export const AdvisoryManagement = () => {
  const [currentInstance, setCurrentInstance] = useState<TAdvisory | undefined>(undefined);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState<boolean>(false);
  const [orderList, setAdvisoryList] = useState<TAdvisory[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const columns: TableColumnsType<TAdvisory> = [
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
      title: 'Phone number',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Note',
      dataIndex: 'note'
    },
    {
      title: 'Created date',
      dataIndex: 'createdAt',
      render: (_, record) => {
        return <div className="flex justify-center">{dayjs(record.createdAt).format('DD MMM YYYY')}</div>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-x-2">
          <div
            className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer"
            onClick={() => {
              setCurrentInstance(record);
              setIsOpenDeleteConfirmModal(true);
            }}
          >
            <Icon icon="mdi:garbage-can-outline" width="24" height="24" />
          </div>
        </div>
      )
    }
  ];

  const handleGetList = () => {
    axiosInstance.get('advisory').then((res) => {
      const data = res.data.data;
      setAdvisoryList(data.map((advisory: TAdvisory) => advisory));
    });
  };

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`advisory/${id}`)
      .then(() => {
        openNotification(api, 'success');
        setCurrentInstance(undefined);
        handleGetList();
        setIsOpenDeleteConfirmModal(false);
      })
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div className="flex flex-col">
      {contextHolder}
      <div className="flex justify-between items-center mb-10">
        <p className="text-2xl font-semibold">Advisory list</p>
      </div>
      {isOpenDeleteConfirmModal && currentInstance && (
        <Modal
          open={isOpenDeleteConfirmModal}
          footer={null}
          title={`Confirm to delete advisory`}
          onCancel={() => {
            setCurrentInstance(undefined);
            setIsOpenDeleteConfirmModal(false);
          }}
        >
          <div className="flex justify-end">
            <Button
              className="text font-semibold mt-4 hover:!border-red-500 hover:!text-red-500 border-red-300 text-red-300 transition ease-in-out"
              onClick={() => handleDelete(currentInstance.id)}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <div className="flex-1">
        <Table<TAdvisory> rowKey="id" columns={columns} pagination={{ pageSize: 8 }} dataSource={orderList} />
      </div>
    </div>
  );
};
