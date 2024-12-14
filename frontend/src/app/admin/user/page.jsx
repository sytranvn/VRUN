'use client';

import { useEffect } from 'react';
import {
  Card, Flex, Button, Table, Modal, Empty,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getApiService from '@/services';
import usePagination from '@/hooks/usePagniation';
import { ROLE_OPTIONS } from '@/utils/constants';

const AdminUserManagement = () => {
  const { AdminService } = getApiService();
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();
  const [list, loadList, reset] = usePagination(AdminService.readUsers);

  useEffect(() => {
    if (!list.isFullyLoaded && !list.length) {
      loadList();
    }
  }, []);

  const onRow = (record) => {
    return {
      onDoubleClick: () => {
        router.push(`/admin/user/detail/${record.id}`);
      },
    };
  };

  const handleDelete = (userId) => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteUser({ userId });
        reset();
      },
    });
  };

  const COLUMN_CONFIG = [
    {
      key: 'email', dataIndex: 'email', title: 'Email', align: 'center',
    },
    {
      key: 'full_name', dataIndex: 'full_name', title: 'Tên người dùng', align: 'center',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Nhóm người dùng',
      align: 'center',
      render(text) {
        return ROLE_OPTIONS.find((i) => i.value == text)?.label;
      },
    },
    {
      key: 'is_active',
      dataIndex: 'is_active',
      title: 'Trạng thái',
      align: 'center',
      render(isActive) {
        return isActive ? 'Đang hoạt động' : 'Đã khoá';
      },
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
            disabled={record.is_superuser}
          >
            Xoá
          </Button>
        );
      },
    },
  ];

  return (
    <Card title="Quản lý tài khoản người dùng">
      <Flex vertical gap="middle">
        <Flex gap="small" justify="flex-end">
          <Link href="/admin/user/detail">
            <Button
              icon={<PlusOutlined />}
              type="primary"
            >
              Tạo tài khoản
            </Button>
          </Link>
        </Flex>
        <Table
          dataSource={list.records}
          onRow={onRow}
          columns={COLUMN_CONFIG}
          pagination={{
            current: list.currentPage > 0 ? list.currentPage : 1,
            pageSize: list.pageSize,
            total: list.totalCount,
            onChange: (page, pageSize) => loadList({ page, pageSize }),
          }}
          bordered
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{
            emptyText: <Empty description="Không tìm thấy tài khoản nào" />,
          }}
        />
      </Flex>
      {modalContext}
    </Card>
  );
};

export default AdminUserManagement;
