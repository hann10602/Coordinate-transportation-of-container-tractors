import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Button, Modal, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TUser } from '../../../types';
import { openNotification } from '../../../utils';
import { AddAndUpdateUserForm } from './AddAndUpdateUserForm';

export const UserManagement = () => {
  const [currentInstance, setCurrentInstance] = useState<TUser | undefined>(undefined);
  const [isOpenAddAndUpdateForm, setIsOpenAddAndUpdateForm] = useState<boolean>(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState<boolean>(false);
  const [userList, setUserList] = useState<TUser[]>([]);

  const [api, contextHolder] = notification.useNotification();

  const columns: TableColumnsType<TUser> = [
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
      title: 'Full name',
      dataIndex: 'fullName',
      sorter: {
        compare: (a, b) => a.fullName.localeCompare(b.fullName),
        multiple: 2
      }
    },

    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber'
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
    axiosInstance.get('user').then((res) => setUserList(res.data.data));
  };

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`user/${id}`)
      .then(() => {
        openNotification(api, 'success');
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
        <p className="text-2xl font-semibold">User</p>
        <Button className="px-10 py-5" onClick={() => setIsOpenAddAndUpdateForm(true)}>
          Add
        </Button>
        <AddAndUpdateUserForm
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
          title={`Confirm to delete ${currentInstance.fullName}`}
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
        <Table<TUser> rowKey="id" columns={columns} pagination={{ pageSize: 8 }} dataSource={userList} />
      </div>
    </div>
  );
};
