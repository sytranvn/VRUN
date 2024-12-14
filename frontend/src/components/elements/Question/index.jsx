'use client';

import { useMemo, useState } from 'react';
import {
  Flex, Typography, Space, Radio,
} from 'antd';
import shuffle from '@/utils/math/shuffle';

const { Title } = Typography;

const Question = ({
  title, answers, order, onCheck,
}) => {
  const [value, setValue] = useState('');
  const displayAnswers = useMemo(() => shuffle(answers || []), [answers]);

  const handleChange = (e) => {
    setValue(e.target.value);
    const answer = answers.find((i) => i.id == e.target.value);
    onCheck(answer);
  };

  return (
    <Flex vertical gap="small">
      <Title level={5}>
        {order}. {title}
      </Title>
      <Radio.Group value={value} onChange={handleChange}>
        <Space direction="vertical">
          {displayAnswers.map((ans, index) => (
            <Radio value={ans.id} key={index}>
              {String.fromCharCode(65 + index)}. {ans.description}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  );
};

export default Question;
