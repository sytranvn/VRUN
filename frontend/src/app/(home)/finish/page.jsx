'use client';

import { Button, Result } from 'antd';

const Finish = () => {
  return (
    <Result
      status="success"
      title="Chúc mừng bạn đã hoàn thành bài thi"
      subTitle="Bạn làm như cc."
      extra={[
        <Button type="primary" key="console">
          Go 1
        </Button>,
        <Button key="buy">Go 2</Button>,
      ]}
    />
  );
};

export default Finish;
