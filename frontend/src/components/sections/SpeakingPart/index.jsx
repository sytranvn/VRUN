'use client';

import { Flex, Splitter } from 'antd';
import VoiceRecorder from '@/components/elements/VoiceRecorder';
import style from './style.module.scss';

const { Panel } = Splitter;

const ReadingPart = ({
  id, task, questions, onAnswer,
}) => {
  const handleStop = (question, payload) => {
    onAnswer({
      question_id: question.id,
      file: payload.file,
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
              {questions.map((question) => (
                <Flex
                  vertical
                  gap="middle"
                  key={question.id}
                  style={{ marginBottom: '30px' }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: question.description }}
                  />
                  <VoiceRecorder
                    onStop={(payload) => handleStop(question, payload)}
                  />
                </Flex>
              ))}
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
