'use client';

import { useState } from 'react';
import { Table, Typography, Button } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

const COLUMN_CONFIG = [
  { key: 'id', dataIndex: 'id', title: 'ID' },
  {
    key: 'date', dataIndex: 'date', title: 'Ngày thi', align: 'center',
  },
  {
    key: 'lpoint', dataIndex: 'lpoint', title: 'Listening', width: '120px', align: 'right',
  },
  {
    key: 'rpoint', dataIndex: 'rpoint', title: 'Reading', width: '120px', align: 'right',
  },
  {
    key: 'wpoint', dataIndex: 'wpoint', title: 'Writing', width: '120px', align: 'right',
  },
  {
    key: 'spoint', dataIndex: 'spoint', title: 'Speaking', width: '120px', align: 'right',
  },
  {
    key: 'totalPoint', dataIndex: 'totalPoint', title: 'Tổng điểm', width: '120px', align: 'right',
  },
  {
    key: 'settings',
    dataIndex: 'settings',
    width: '150px',
    align: 'center',
    render: (_, record) => (
      <Link href={`/history/${record.id}`}>
        <Button type="primary">Xem lại</Button>
      </Link>
    ),
  },
];

const History = () => {
  const [records, setRecords] = useState([
    {
      id: 1, date: '2020-11-11', lpoint: 8.5, rpoint: 5.5, wpoint: 7.5, spoint: 8.0, totalPoint: 10,
    },
  ]);

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Lịch sử thi
      </Title>
      <Table
        dataSource={records}
        columns={COLUMN_CONFIG}
        bordered
        pagination={false}
        rowKey="id"
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default History;
