'use client';

import { Button, Result, Flex } from 'antd';
import Link from 'next/link';
import { HistoryOutlined } from '@ant-design/icons';

const Finish = () => {
  return (
    <Result
      status="success"
      title="Chúc mừng bạn đã hoàn thành bài thi"
      subTitle="Bạn làm như cc."
      extra={[
        <Flex key="finish" justify="center" gap="middle">
          <Link href="/history/1" key="history">
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
              Tiếp tục
            </Button>
          </Link>
        </Flex>,
      ]}
    />
  );
};

export default Finish;
