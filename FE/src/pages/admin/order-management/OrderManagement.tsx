import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Button, Modal, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TOrder } from '../../../types';
import { convertStatus, openNotification } from '../../../utils';
import { AddAndUpdateOrderForm } from './AddAndUpdateOrderForm';

export const OrderManagement = () => {
  const [currentInstance, setCurrentInstance] = useState<TOrder | undefined>(undefined);
  const [isOpenAddAndUpdateForm, setIsOpenAddAndUpdateForm] = useState<boolean>(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<TOrder[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const columns: TableColumnsType<TOrder> = [
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
      title: 'Total price',
      dataIndex: 'totalPrice',
      render: (_, record) => <div className="text-center">{record.totalPrice}$</div>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => {
        const status = convertStatus(record.status);
        return (
          <div className="flex justify-center items-center">
            <div className={`${status.class} w-fit px-2 py-1 rounded-full text-white font-semibold`}>
              {status.title}
            </div>
          </div>
        );
      }
    },
    {
      title: 'Delivery date',
      dataIndex: 'deliveryDate'
    },
    {
      title: 'Note',
      dataIndex: 'note'
    },
    {
      title: 'Detail address',
      dataIndex: 'detailAddress'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-x-2">
          {record.status === 'Ongoing' && (
            <div
              className="px-1 py-0.5 rounded-sm bg-blue-400 text-white cursor-pointer"
              onClick={() => handleGetOrder(record.id)}
            >
              <Icon icon="ic:round-edit-road" width="24" height="24" />
            </div>
          )}
          <div
            className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer"
            onClick={() => {
              setIsOpenDeleteConfirmModal(true);
            }}
          >
            <Icon icon="mdi:garbage-can-outline" width="24" height="24" />
          </div>
        </div>
      )
    }
  ];

  const handleGetOrder = (id: number) => {
    axiosInstance
      .get(`order/${id}`)
      .then((res) => setCurrentInstance(res.data.data))
      .then(() => setIsOpenAddAndUpdateForm(true));
  };

  const handleGetList = () => {
    axiosInstance.get('order').then((res) => setOrderList(res.data.data));
  };

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`dump/${id}`)
      .then(() => {
        openNotification(api, 'success');
        handleGetList();
        setIsOpenDeleteConfirmModal(false);
      })
      .catch((err) => openNotification(api, 'error', err.response.data.log));
  };

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div className="flex flex-col">
      {contextHolder}
      <AddAndUpdateOrderForm
        currentInstance={currentInstance}
        setCurrentInstance={setCurrentInstance}
        handleGetList={handleGetList}
        isOpenAddAndUpdateForm={isOpenAddAndUpdateForm}
        setIsOpenAddAndUpdateForm={setIsOpenAddAndUpdateForm}
        handleCloseModal={() => setIsOpenAddAndUpdateForm(false)}
      />
      {isOpenDeleteConfirmModal && currentInstance && (
        <Modal
          open={isOpenDeleteConfirmModal}
          footer={null}
          title={`Confirm to delete order`}
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
        <Table<TOrder> rowKey="id" columns={columns} pagination={{ pageSize: 8 }} dataSource={orderList} />
      </div>
    </div>
  );
};
