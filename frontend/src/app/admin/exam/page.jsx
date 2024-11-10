'use client';

import { useState } from 'react';
import {
  Card, Flex, Button, Table, Modal,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const COLUMN_CONFIG = [
  {
    key: 'id', dataIndex: 'id', title: 'ID', width: '100px', align: 'center',
  },
  {
    key: 'examType', dataIndex: 'examType', title: 'Loại đề', align: 'center',
  },
  {
    key: 'author', dataIndex: 'author', title: 'Người tạo', align: 'center',
  },
  {
    key: 'date', dataIndex: 'date', title: 'Ngày tạo', align: 'center',
  },
];

const AdminExamManagement = () => {
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();
  const [records, setRecords] = useState([
    {
      id: 1, date: '2020-11-11', examType: 'B2', author: 'Admin',
    },
    {
      id: 2, date: '2020-11-11', examType: 'B2', author: 'Admin',
    },
  ]);
  const [selectedIds, setSelectedIds] = useState([]);

  const onRow = (record) => {
    return {
      onDoubleClick: () => {
        router.push(`/admin/exam/detail/${record.id}`);
      },
    };
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedIds(selectedRowKeys);
    },
  };

  const handleDelete = () => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      onOk() {
        console.log('delete');
      },
    });
  };

  return (
    <Card title="Quản lý đề thi">
      <Flex vertical gap="middle">
        <Flex gap="small" justify="space-between">
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            disabled={!selectedIds.length}
            onClick={handleDelete}
          >
            Xoá
          </Button>
          <Link href="/admin/exam/detail">
            <Button
              icon={<PlusOutlined />}
              type="primary"
            >
              Tạo đề thi
            </Button>
          </Link>
        </Flex>
        <Table
          dataSource={records}
          onRow={onRow}
          rowSelection={rowSelection}
          columns={COLUMN_CONFIG}
          bordered
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
      </Flex>
      {modalContext}
    </Card>
  );
};

export default AdminExamManagement;
