import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Button, Modal, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TDump } from '../../../types';
import { openNotification } from '../../../utils';
import { AddAndUpdateTrailerDumpForm } from './AddAndUpdateTrailerDumpForm';

export const TrailerDumpManagement = () => {
  const [currentInstance, setCurrentInstance] = useState<TDump | undefined>(undefined);
  const [isOpenAddAndUpdateForm, setIsOpenAddAndUpdateForm] = useState<boolean>(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState<boolean>(false);
  const [dumpList, setDumpList] = useState<TDump[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const columns: TableColumnsType<TDump> = [
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
      title: 'Latitude',
      dataIndex: 'latitude'
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude'
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
      title: 'CreatedAt',
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
    axiosInstance
      .get('dump', {
        params: {
          type: 'Trailer'
        }
      })
      .then((res) => setDumpList(res.data.data));
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
      <div className="flex justify-between items-center mb-10">
        <p className="text-2xl font-semibold">Order</p>
        <Button className="px-10 py-5" onClick={() => setIsOpenAddAndUpdateForm(true)}></Button>
        <AddAndUpdateTrailerDumpForm
          currentInstance={currentInstance}
          setCurrentInstance={setCurrentInstance}
          handleGetList={handleGetList}
          isOpenAddAndUpdateForm={isOpenAddAndUpdateForm}
          setIsOpenAddAndUpdateForm={setIsOpenAddAndUpdateForm}
          handleCloseModal={() => setIsOpenAddAndUpdateForm(false)}
        />
      </div>
      {isOpenDeleteConfirmModal && currentInstance && (
        <Modal
          open={isOpenDeleteConfirmModal}
          footer={null}
          title={`Confirm to delete ${currentInstance.title}`}
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
        <Table<TDump> rowKey="id" columns={columns} pagination={{ pageSize: 8 }} dataSource={dumpList} />
      </div>
    </div>
  );
};
