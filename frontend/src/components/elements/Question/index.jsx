'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Flex, Typography, Space, Radio,
} from 'antd';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import shuffle from '@/utils/math/shuffle';

const { Title } = Typography;

const Question = ({
  title, answers = [], order, selected, onCheck,
}) => {
  const [value, setValue] = useState('');
  const displayAnswers = useMemo(() => shuffle(answers), [answers]);

  const handleChange = (e) => {
    if (!selected) {
      setValue(e.target.value);
      const answer = answers.find((i) => i.id == e.target.value);
      onCheck && onCheck(answer);
    }
  };

  useEffect(() => {
    if (selected) {
      setValue(selected);
    }
  }, []);

  return (
    <Flex vertical gap="small">
      <Title level={5}>
        {order}. {title}
      </Title>
      <Radio.Group
        value={value}
        onChange={handleChange}
      >
        <Space direction="vertical">
          {displayAnswers.map((ans, index) => (
            <Radio
              value={ans.id}
              key={index}
            >
              {String.fromCharCode(65 + index)}. {ans.description}&nbsp;
              {selected && ans.is_correct_answer && (
                <CheckCircleFilled style={{ color: '#52c41a' }} />
              )}
              {selected && ans.id === selected && !ans.is_correct_answer && (
                <CloseOutlined style={{ color: '#F5222D' }} />
              )}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  );
};

export default Question;
