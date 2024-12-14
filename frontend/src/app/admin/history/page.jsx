'use client';

import { useState } from 'react';
import {
  Card, Flex, Button, Table, Modal, Empty,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const COLUMN_CONFIG = [
  {
    key: 'id', dataIndex: 'id', title: 'ID', width: '100px', align: 'center',
  },
  {
    key: 'author', dataIndex: 'author', title: 'Thí sinh', align: 'center',
  },
  {
    key: 'date', dataIndex: 'date', title: 'Ngày thi', align: 'center',
  },
  {
    key: 'totalPoint', dataIndex: 'totalPoint', title: 'Tổng điểm', align: 'center',
  },
  {
    key: 'examType', dataIndex: 'examType', title: 'Loại đề', align: 'center',
  },
];

const AdminExamHistoryManagement = () => {
  const [modal, modalContext] = Modal.useModal();
  const [records, setRecords] = useState([
    {
      id: 1, date: '2020-11-11', examType: 'B2', author: 'Admin', totalPoint: 8.5,
    },
    {
      id: 2, date: '2020-11-11', examType: 'B2', author: 'Admin', totalPoint: 8,
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
    <Card title="Lịch sử dự thi">
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
          locale={{
            emptyText: <Empty description="Không tìm thấy bài thi nào" />,
          }}
        />
      </Flex>
      {modalContext}
    </Card>
  );
};

export default AdminExamHistoryManagement;
