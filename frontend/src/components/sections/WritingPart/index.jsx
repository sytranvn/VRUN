'use client';

import { useState, useEffect } from 'react';
import {
  Flex, Splitter, Input, Typography, Card,
} from 'antd';
import countWords from '@/utils/math/countWords';
import style from './style.module.scss';

const { Panel } = Splitter;
const { TextArea } = Input;
const { Text } = Typography;

const WritingPart = ({
  id, task, questions = [], hasResult, onAnswer,
}) => {
  const [text, setText] = useState();
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
    setWordCount(value ? countWords(value) : 0);
  };

  const saveEssay = (question) => {
    onAnswer && onAnswer({
      question_id: question.id,
      content: text,
    });
  };

  useEffect(() => {
    if (hasResult && questions[0]) {
      setText(questions[0].selected?.content);
    }
  }, []);

  return (
    <Flex
      id={id}
      vertical
      align="center"
      className={style.section}
    >
      <Card className={style.exam}>
        <Splitter resizable>
          <Panel defaultSize="50%">
            <div
              className={style.content}
              style={{ height: hasResult ? 'auto' : '' }}
              dangerouslySetInnerHTML={{ __html: task }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div
              className={style.content}
              style={{ height: hasResult ? 'auto' : '' }}
            >
              <Flex
                vertical
                gap="small"
                style={{ marginBottom: '20px' }}
              >
                <Text>
                  {questions[0]?.description}
                </Text>
                <TextArea
                  placeholder="Điền vào đây"
                  rows={6}
                  style={{ minHeight: '300px' }}
                  autoSize
                  value={text}
                  readOnly={hasResult}
                  onChange={handleChange}
                  onBlur={() => saveEssay(questions[0])}
                />
                <div className={`${style.wc}`}>
                  <Text type="secondary">
                    Word Count: {wordCount}
                  </Text>
                </div>
                {hasResult && (
                  <Text mark>
                    <strong>Đánh giá:</strong> {questions[0].selected?.assessment || 'Không có'}
                  </Text>
                )}
              </Flex>
            </div>
          </Panel>
        </Splitter>
      </Card>
    </Flex>
  );
};

export default WritingPart;
