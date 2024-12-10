'use client';

import { useEffect } from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import getApiService from '@/services';
import usePagination from '@/hooks/usePagniation';

const COLUMN_CONFIG = [
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Đề thi',
    width: '400px',
    ellipse: true,
    render(text) {
      return text.length > 100 ? `${text.slice(0, 100)}...` : text;
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
        <Link
          href={`/admin/question-group/detail/${record.id}`}
          target="_blank"
        >
          Xem chi tiết
        </Link>
      );
    },
  },
];

const QuestionGroupList = ({ skill, onSelect }) => {
  const { AdminService } = getApiService();
  const [list, loadList] = usePagination(AdminService.readQuestionGroups);

  const rowSelection = {
    onChange: (_, records) => {
      onSelect(records);
    },
  };

  useEffect(() => {
    if (!list.isFullyLoaded && !list.length) {
      loadList({ skill });
    }
  }, []);

  return (
    <Table
      dataSource={list.records}
      columns={COLUMN_CONFIG}
      rowSelection={rowSelection}
      pagination={{
        current: list.currentPage > 0 ? list.currentPage : 1,
        pageSize: list.pageSize,
        total: list.totalCount,
        onChange: (page, pageSize) => loadList({ page, pageSize }),
      }}
      bordered
      rowKey="id"
      scroll={{ x: 'max-content' }}
    />
  );
};

export default QuestionGroupList;
