'use client';

import { useEffect } from 'react';
import { Table, Typography, Button } from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';
import getApiService from '@/services';
import usePagination from '@/hooks/usePagniation';
import { CANDIDATE_EXAM_STATUS } from '@/utils/constants';

const { Title } = Typography;

const History = () => {
  const { CandidateService } = getApiService();
  const [list, loadList] = usePagination(CandidateService.readRegisteredExams);

  useEffect(() => {
    if (!list.isFullyLoaded) {
      loadList();
    }
  }, [loadList, list]);

  const COLUMN_CONFIG = [
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      align: 'center',
      render(text) {
        return CANDIDATE_EXAM_STATUS.find((i) => i.value == text)?.label || '-';
      },
    },
    {
      key: 'start_time',
      dataIndex: 'start_time',
      title: 'Giờ làm bài',
      align: 'center',
      render(text) {
        return dayjs(text).format('DD-MM-YYYY');
      },
    },
    {
      key: 'end_time',
      dataIndex: 'end_time',
      title: 'Giờ nộp bài',
      align: 'center',
      render(text) {
        return dayjs(text).format('DD-MM-YYYY');
      },
    },
    {
      key: 'settings',
      dataIndex: 'settings',
      width: '150px',
      align: 'center',
      render: (_, record) => (
        <Link href={`/history/${record.id}`}>
          <Button type="primary">
            Xem lại
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Lịch sử thi
      </Title>
      <Table
        dataSource={list.records}
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
      />
    </>
  );
};

export default History;
