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

const AdminQuestionGroup = () => {
  const { AdminService } = getApiService();
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();
  const [list, loadList, reset] = usePagination(AdminService.readQuestionGroups);

  useEffect(() => {
    if (!list.isFullyLoaded && !list.length) {
      loadList();
    }
  }, []);

  const onRow = (record) => {
    return {
      onDoubleClick: () => {
        router.push(`/admin/question-group/detail/${record.id}`);
      },
    };
  };

  const handleDelete = (id) => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteQuestionGroup({ id });
        reset();
      },
    });
  };

  const COLUMN_CONFIG = [
    {
      key: 'skill', dataIndex: 'skill', title: 'Kỹ năng', align: 'center', width: '250px',
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Đề bài',
      width: '600px',
      ellipse: true,
      render(text) {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            style={{
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              maxHeight: '40px',
            }}
          />
        );
      },
    },
    {
      key: 'duration', dataIndex: 'duration', title: 'Thời lượng (phút)', align: 'center', width: '150px',
    },
    {
      key: 'count',
      dataIndex: 'count',
      title: 'Số câu hỏi',
      align: 'center',
      render(_, record) {
        return (record.questions || []).length;
      },
      width: '150px',
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
    <Card title="Quản lý nhóm câu hỏi">
      <Flex vertical gap="middle">
        <Flex gap="small" justify="flex-end">
          <Link href="/admin/question-group/detail">
            <Button
              icon={<PlusOutlined />}
              type="primary"
            >
              Tạo nhóm
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
            emptyText: <Empty description="Không tìm thấy câu hỏi nào" />,
          }}
        />
      </Flex>
      {modalContext}
    </Card>
  );
};

export default AdminQuestionGroup;
