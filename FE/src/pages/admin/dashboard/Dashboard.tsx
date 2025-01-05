import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { axiosInstance } from '../../../api/axios';
import { useCallback, useEffect, useState } from 'react';
import { TOrder } from '../../../types';
import dayjs from 'dayjs';

export const Dashboard = () => {
  const [orderList, setOrderList] = useState<TOrder[]>([]);

  const handleGetList = () => {
    axiosInstance.get('order').then((res) => {
      const data = res.data.data;
      setOrderList(
        data.map((order: TOrder) => {
          return {
            ...order,
            totalPrice: order.totalPrice / 100
          };
        })
      );
    });
  };

  const handleGetStatistics = useCallback(() => {
    const monthList = {
      Jan: {
        orders: 0,
        income: 0
      },
      Feb: {
        orders: 0,
        income: 0
      },
      Mar: {
        orders: 0,
        income: 0
      },
      Apr: {
        orders: 0,
        income: 0
      },
      May: {
        orders: 0,
        income: 0
      },
      Jun: {
        orders: 0,
        income: 0
      },
      Jul: {
        orders: 0,
        income: 0
      },
      Aug: {
        orders: 0,
        income: 0
      },
      Sep: {
        orders: 0,
        income: 0
      },
      Oct: {
        orders: 0,
        income: 0
      },
      Nov: {
        orders: 0,
        income: 0
      },
      Dec: {
        orders: 0,
        income: 0
      }
    };

    orderList.map((order) => {
      const month = dayjs(order.createdAt).format('MMM') as keyof typeof monthList;
      monthList[month].orders += 1;
      monthList[month].income += order.totalPrice;
    });

    return {
      orders: Object.keys(monthList).map((month) => ({
        month,
        orders: monthList[month as keyof typeof monthList].orders
      })),
      income: Object.keys(monthList).map((month) => ({
        month,
        income: monthList[month as keyof typeof monthList].income
      }))
    };
  }, [orderList]);

  const { orders, income } = handleGetStatistics();

  useEffect(() => {
    handleGetList();
  }, []);

  return (
    <div>
      <p className="font-semibold text-xl mb-4">Order quantity</p>
      <LineChart width={600} height={300} data={orders}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      <p className="font-semibold text-xl mb-4 mt-5">Total income</p>
      <BarChart width={600} height={300} data={income}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
