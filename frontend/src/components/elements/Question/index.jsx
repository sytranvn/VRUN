'use client';

import {
  Flex, Typography, Space, Radio,
} from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const Question = ({ title, order, answers }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Flex vertical gap="small">
      <Title level={5}>
        {order}. {title}
      </Title>
      <Radio.Group value={value} onChange={handleChange}>
        <Space direction="vertical">
          {answers.map((ans, index) => (
            <Radio value={ans.value} key={index}>
              {ans.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  );
};

export default Question;
