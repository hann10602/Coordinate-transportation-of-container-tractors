import { Flex, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../api/axios';
import { TJWTToken, TOrder, TUserDetails } from '../../../types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { convertStatus } from '../../../utils';

export const PersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userDetails, setUserDetails] = useState<TUserDetails | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
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
      title: 'Trạng thái',
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
      title: 'Tổng giá đơn hàng',
      dataIndex: 'totalPrice',
      render: (_, record) => <div className="text-center">{record.totalPrice}$</div>
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <div
            className="px-1 py-0.5 rounded-sm bg-blue-400 text-white cursor-pointer"
            // onClick={() => {}}
          >
            <Icon icon="ic:round-edit-note" width="24" height="24" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {userDetails.fullName}</p>
      <p>Name: {userDetails.phoneNumber}</p>
      <h2>Orders</h2>
      <Table dataSource={userDetails.orders} columns={columns} rowKey="id" />
    </div>
  );
};
