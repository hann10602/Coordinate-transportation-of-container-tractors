import { Icon } from '@iconify/react/dist/iconify.js';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axios';
import { TDump } from '../../../types';

const columns: TableColumnsType<TDump> = [
  {
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className="flex items-center gap-x-2">
        <div className="px-1 py-0.5 rounded-sm bg-blue-400 text-white cursor-pointer">
          <Icon icon="ic:round-edit-note" width="24" height="24" />
        </div>
        <div className="px-1 py-0.5 rounded-sm bg-red-400 text-white cursor-pointer">
          <Icon icon="mdi:garbage-can-outline" width="24" height="24" />
        </div>
      </div>
    )
  }
];

export const ContainerDumpManagement = () => {
  const [dumpList, setDumpList] = useState<TDump[]>([]);

  useEffect(() => {
    axiosInstance
      .get('dump', {
        params: {
          type: 'Container'
        }
      })
      .then((res) => setDumpList(res.data.data));
  }, []);

  return <Table<TDump> columns={columns} dataSource={dumpList} />;
};
