'use client';

import { useState } from 'react';
import {
  Card, Flex, Button, Table, Modal,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const COLUMN_CONFIG = [
  {
    key: 'id', dataIndex: 'id', title: 'ID', width: '100px', align: 'center',
  },
  {
    key: 'fullname', dataIndex: 'fullname', title: 'Họ và Tên', align: 'center',
  },
  {
    key: 'birthdate', dataIndex: 'birthdate', title: 'Ngày sinh', align: 'center',
  },
  {
    key: 'username', dataIndex: 'username', title: 'Tài khoản', align: 'center',
  },
];

const AdminExamManagement = () => {
  const [modal, modalContext] = Modal.useModal();
  const [records, setRecords] = useState([
    {
      id: 1, birthdate: '2020-11-11', username: 'abc123', fullname: 'Admin',
    },
    {
      id: 2, birthdate: '2020-11-11', username: 'abc123', fullname: 'Admin',
    },
  ]);
  const [selectedIds, setSelectedIds] = useState([]);

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
    <Card title="Quản lý người dùng">
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
        </Flex>
        <Table
          dataSource={records}
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
