'use client';

import { useEffect, useState } from 'react';
import { Button, Result, Flex } from 'antd';
import Link from 'next/link';
import { HistoryOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import getApiService from '@/services';

const Finish = () => {
  const { CandidateService } = getApiService();
  const [isCompleted, setIsCompleted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    CandidateService.readExamResult({ id })
      .then((data) => {
        setIsCompleted(!!data.id);
      })
      .catch((e) => router.push('/'));
  }, []);

  return (
    <div>
      {isCompleted && (
        <Result
          status="success"
          title="Chúc mừng bạn đã hoàn thành bài thi"
          subTitle="Bạn làm như cc."
          extra={[
            <Flex key="finish" justify="center" gap="middle">
              <Link href={`/history/${id}`} key="history">
                <Button
                  icon={<HistoryOutlined />}
                  size="large"
                >
                  Xem điểm
                </Button>
              </Link>
              <Link href="/" key="home">
                <Button
                  type="primary"
                  size="large"
                >
                  Đăng ký thi lại
                </Button>
              </Link>
            </Flex>,
          ]}
        />
      )}
    </div>
  );
};

export default Finish;
