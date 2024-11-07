'use client';

import {
  Flex, Typography, Space, Radio,
} from 'antd';

const { Title } = Typography;

const Question = ({ title, order, answers }) => {
  return (
    <Flex vertical gap="small">
      <Title level={5}>
        {order}. {title}
      </Title>
      <Space direction="vertical">
        {answers.map((ans, index) => (
          <Radio value={ans.value} key={index}>
            {ans.label}
          </Radio>
        ))}
      </Space>
    </Flex>
  );
};

export default Question;
