'use client';

import { useState } from 'react';
import { Flex, Splitter } from 'antd';
import VoiceRecorder from '@/components/elements/VoiceRecorder';
import htmlSample4 from '@/assets/data/htmlSample4';
import style from './style.module.scss';

const { Panel } = Splitter;

const ReadingPart = ({ id }) => {
  const [isCompleted, setIsCompleted] = useState();
  const handleStart = () => {
    console.log('start');
  };
  const handleStop = (recordedUrl) => {
    console.log('stop', recordedUrl);
    setIsCompleted(true);
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
              dangerouslySetInnerHTML={{ __html: htmlSample4 }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div className={style.content}>
              <VoiceRecorder
                disabled={isCompleted}
                replay={false}
                onStart={handleStart}
                onStop={handleStop}
              />
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
