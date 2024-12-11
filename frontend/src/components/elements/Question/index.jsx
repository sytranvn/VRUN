'use client';

import {
  Flex, Typography, Space, Radio,
} from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const Question = ({ title, answers, onCheck }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    const answer = answers.find((i) => i.id == e.target.value);
    onCheck(answer);
  };

  return (
    <Flex vertical gap="small">
      <Title level={5}>
        {title}
      </Title>
      <Radio.Group value={value} onChange={handleChange}>
        <Space direction="vertical">
          {answers.map((ans, index) => (
            <Radio value={ans.id} key={index}>
              {ans.description}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  );
};

export default Question;
