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
    CandidateService.readRegisteredExam({ id })
      .then((data) => {
        setIsCompleted(data.status == 'FINISHED');
      })
      .catch((e) => router.push('/'));
  }, []);

  return (
    <div>
      {isCompleted && (
        <Result
          status="success"
          title="Chúc mừng bạn đã hoàn thành bài thi"
          subTitle="Kết quả sẽ được cập nhật trong một vài phút nữa."
          extra={[
            <Flex key="finish" justify="center" gap="middle">
              <Link href="/history" key="history">
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
