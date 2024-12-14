'use client';

import { useState } from 'react';
import {
  Flex, Splitter, Input, Typography,
} from 'antd';
import countWords from '@/utils/math/countWords';
import style from './style.module.scss';

const { Panel } = Splitter;
const { TextArea } = Input;
const { Text } = Typography;

const ReadingPart = ({
  id, task, questions, onAnswer,
}) => {
  const [text, setText] = useState();
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
    setWordCount(value ? countWords(value) : 0);
  };

  const saveEssay = (question) => {
    onAnswer({
      question_id: question.id,
      content: text,
    });
  };

  return (
    <Flex
      id={id}
      vertical
      align="center"
      className={style.section}
    >
      <div className={style.exam}>
        <Splitter resizable>
          <Panel defaultSize="50%">
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: task }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div className={style.content}>
              <Flex
                vertical
                gap="small"
                style={{ marginBottom: '20px' }}
              >
                <Text>
                  {questions[0].description}
                </Text>
                <TextArea
                  placeholder="Điền vào đây"
                  rows={6}
                  style={{ minHeight: '300px' }}
                  autoSize
                  value={text}
                  onChange={handleChange}
                  onBlur={() => saveEssay(questions[0])}
                />
                <div className={`${style.wc}`}>
                  <Text type="secondary">
                    Word Count: {wordCount}
                  </Text>
                </div>
              </Flex>
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
