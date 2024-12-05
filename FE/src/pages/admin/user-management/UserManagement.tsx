import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataType {
  id: number;
  fullName: string;
  username: string;
  phoneNum: string;
  status: string;
}

const columns: TableColumnsType<DataType> = [
  {
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
    dataIndex: 'username',
    sorter: {
      compare: (a, b) => a.username.localeCompare(b.username),
      multiple: 1
    }
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNum',
    sorter: {
      compare: (a, b) => a.phoneNum.localeCompare(b.phoneNum),
      multiple: 1
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className="flex items-center gap-x-2">
        <div className="px-1 py-0.5 rounded-sm bg-blue-400 text-white cursor-pointer">
          <Icon icon="ic:round-edit-note" width="24" height="24" />
        </div>
        <div className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer">
          <Icon icon="material-symbols-light:group-remove" width="24" height="24" />
        </div>
      </div>
    )
  }
];

const data: DataType[] = [
  {
    id: 1,
    fullName: 'John Brown',
    username: 'asd1',
    phoneNum: '0988464108',
    status: 'NONE'
  },
  {
    id: 2,
    fullName: 'Alone',
    username: 'asd223',
    phoneNum: '0988464108',
    status: 'NONE'
  },
  {
    id: 3,
    fullName: 'Busy',
    username: 'asdasd456456',
    phoneNum: '0988464108',
    status: 'NONE'
  }
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

type Props = {};

export const UserManagement = (props: Props) => {
  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />;
};
