'use client';

import { useState } from 'react';
import {
  Flex, Splitter, Input, Typography,
} from 'antd';
import htmlSample3 from '@/assets/data/htmlSample3';
import style from './style.module.scss';

const { Panel } = Splitter;
const { TextArea } = Input;
const { Text } = Typography;

const ReadingPart = ({ id }) => {
  const [text, setText] = useState();
  const [wordCount, setWordCount] = useState(0);

  const saveResult = (e) => {
    const value = e.target.value;
    setText(value);

    if (value) {
      setWordCount(value.split(/[\n\r]/g).join(' ').split(/[\s]/g).filter((i) => !!i).length);
    }
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
              dangerouslySetInnerHTML={{ __html: htmlSample3 }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div className={style.content}>
              <TextArea
                placeholder="Điền vào đây"
                rows={6}
                style={{ minHeight: '300px' }}
                autoSize
                onChange={saveResult}
              />
              <div className={`${style.wc} padding_top_1`}>
                <Text type="secondary">
                  Word Count: {wordCount}
                </Text>
              </div>
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
