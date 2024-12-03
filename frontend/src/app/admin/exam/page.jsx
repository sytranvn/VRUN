'use client';

import { useEffect, useState } from 'react';
import {
  Card, Flex, Button, Table, Modal,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getApiService from '@/services';

const AdminExamManagement = () => {
  const { AdminService } = getApiService();
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();
  const [records, setRecords] = useState([]);

  const loadExams = async (payload = { limit: 10, skip: 1 }) => {
    const resp = await AdminService.readExams(payload);
    setRecords(resp.data || []);
  };

  useEffect(() => {
    loadExams();
  }, []);

  const onRow = (record) => {
    return {
      onDoubleClick: () => {
        router.push(`/admin/exam/detail/${record.id}`);
      },
    };
  };

  const handleDelete = (id) => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteExam({ id });
        loadExams();
      },
    });
  };

  const COLUMN_CONFIG = [
    {
      key: 'title', dataIndex: 'title', title: 'Tên bài thi', align: 'center',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      align: 'center',
      render(text) {
        return text == 'ACTIVE' ? 'Đã duyệt' : 'Nháp';
      },
    },
    {
      key: 'description', dataIndex: 'description', title: 'Mô tả', align: 'center',
    },
    {
      key: 'settings',
      dataIndex: 'settings',
      title: '',
      align: 'center',
      width: '100px',
      render(_, record) {
        return (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            type="primary"
            danger
          >
            Xoá
          </Button>
        );
      },
    },
  ];

  return (
    <Card title="Quản lý đề thi">
      <Flex vertical gap="middle">
        <Flex gap="small" justify="flex-end">
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
