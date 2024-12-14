'use client';

import { useEffect } from 'react';
import {
  Table, Typography, Button, Empty,
} from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import Link from 'next/link';
import dayjs from 'dayjs';
import getApiService from '@/services';
import usePagination from '@/hooks/usePagniation';
import { CANDIDATE_EXAM_STATUS } from '@/utils/constants';

const { Title } = Typography;

const History = () => {
  const { CandidateService } = getApiService();
  const [list, loadList, reset] = usePagination(CandidateService.readRegisteredExams);

  useEffect(() => {
    if (!list.isFullyLoaded && !list.length) {
      loadList();
    }
  }, []);

  const COLUMN_CONFIG = [
    {
      key: 'exam',
      dataIndex: 'exam',
      title: 'Đề thi',
      align: 'center',
      render(exam) {
        return exam.title;
      },
    },
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
      width: '200px',
      render(text) {
        return dayjs(text).format('DD-MM-YYYY HH:mm:ss');
      },
    },
    {
      key: 'end_time',
      dataIndex: 'end_time',
      title: 'Giờ nộp bài',
      align: 'center',
      width: '200px',
      render(text) {
        return text ? dayjs(text).format('DD-MM-YYYY HH:mm:ss') : '-';
      },
    },
    {
      key: 'settings',
      dataIndex: 'settings',
      width: '150px',
      align: 'center',
      render: (_, record) => (['STARTED', 'SCHEDULED'].includes(record.status) ? (
        <Link href="/exam">
          <Button type="primary">
            Tiếp tục thi
          </Button>
        </Link>
      ) : (
        <Link href={`/history/${record.id}`}>
          <Button
            type="primary"
            disabled={record.status != 'ASSESSED'}
          >
            Xem lại
          </Button>
        </Link>
      )),
    },
  ];

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Lịch sử thi&nbsp;
        <Button
          onClick={() => reset()}
          icon={<RedoOutlined rotate={270} />}
          type="text"
          title="Nhấn refresh nếu bài thi của bạn chưa có điểm"
        />
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
        locale={{
          emptyText: <Empty description="Không tìm thấy bài thi nào" />,
        }}
      />
    </>
  );
};

export default History;
