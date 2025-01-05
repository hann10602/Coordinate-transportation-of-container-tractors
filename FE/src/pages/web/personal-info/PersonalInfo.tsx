import { Button, Flex, Modal, notification, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../api/axios';
import { TJWTToken, TOrder, TUserDetails } from '../../../types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { convertStatus, openNotification } from '../../../utils';
import { TrackingForm } from './TrackingForm';

export const PersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userDetails, setUserDetails] = useState<TUserDetails | undefined>(undefined);
  const [currentInstance, setCurrentInstance] = useState<TOrder | undefined>(undefined);
  const [isOpenTrackingForm, setIsOpenTrackingForm] = useState<boolean>(false);
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [api, contextHolder] = notification.useNotification();

  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`order/${id}`)
      .then(() => {
        openNotification(api, 'success');
        handleGetList();
      })
      .catch((err) => openNotification(api, 'error', err.response.data.message));
  };

  const handleGetList = () => {
    if (token) {
      const decodedToken: TJWTToken = jwtDecode(token);

      if (!decodedToken.userId) {
        navigate('/login');
      }

      axiosInstance
        .get(`user/${decodedToken.userId}`)
        .then((res) => {
          setLoading(true);
          setUserDetails(res.data.data);
        })
        .catch(() => navigate('/trang-chu'))
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    handleGetList();
  }, [token]);

  if (loading || userDetails === undefined) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  const columns: TableColumnsType<TOrder> = [
    {
      key: 'id',
      title: 'Mã đơn',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 3
      }
    },
    {
      title: <p className="text-center">Loại vận chuyển</p>,
      dataIndex: 'type',
      render: (_, record) => <div className="flex justify-center items-center">{record.type} </div>
    },
    {
      title: <p className="text-center">Trạng thái</p>,
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
      title: <p className="text-center">Tổng giá đơn hàng</p>,
      dataIndex: 'totalPrice',
      render: (_, record) => <div className="text-center">{record.totalPrice / 100}$</div>
    },
    {
      title: <p className="text-center">Hành động</p>,
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center justify-center">
          {record.status === 'Pending' && (
            <div
              className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer"
              onClick={() => {
                setCurrentInstance(record);
                setIsOpenDeleteConfirmModal(true);
              }}
            >
              <Icon icon="mdi:receipt-text-remove-outline" width="24" height="24" />
            </div>
          )}
          {record.status === 'OnGoing' && (
            <div
              className="px-1 py-0.5 rounded-sm bg-yellow-400 text-white cursor-pointer"
              onClick={() => handleGetOrder(record.id)}
            >
              <Icon icon="mdi:location-circle" width="24" height="24" />{' '}
            </div>
          )}
        </div>
      )
    }
  ];

  const handleGetOrder = (id: number) => {
    axiosInstance
      .get(`order/${id}`)
      .then((res) => setCurrentInstance(res.data.data))
      .then(() => setIsOpenTrackingForm(true));
  };

  return (
    <div>
      {contextHolder}
      {isOpenTrackingForm && (
        <TrackingForm
          currentInstance={currentInstance}
          setCurrentInstance={setCurrentInstance}
          handleGetList={handleGetList}
          isOpenTrackingForm={isOpenTrackingForm}
          setIsOpenTrackingForm={setIsOpenTrackingForm}
        />
      )}
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
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-10">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <div className="user-info">
            <div className="info-item flex justify-between p-4 border-b border-gray-200">
              <span className="info-label font-semibold">Full Name:</span>
              <span className="info-value text-gray-600 font-semibold">{userDetails.fullName}</span>
            </div>
            <div className="info-item flex justify-between p-4 border-b border-gray-200">
              <span className="info-label font-semibold">Phone Number:</span>
              <span className="info-value text-gray-600 font-semibold">{userDetails.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          <Table dataSource={userDetails.orders} columns={columns} rowKey="id" />
        </div>
      </div>
    </div>
  );
};
