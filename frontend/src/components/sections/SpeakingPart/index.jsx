'use client';

import {
  Flex, Splitter, Typography, Card,
} from 'antd';
import VoiceRecorder from '@/components/elements/VoiceRecorder';
import { RECORD_EXT } from '@/utils/constants';
import style from './style.module.scss';

const { Panel } = Splitter;
const { Text } = Typography;

const SpeakingPart = ({
  id, task, questions = [], hasResult, onAnswer,
}) => {
  const handleStop = (question, payload) => {
    onAnswer && onAnswer({
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
                  {hasResult ? (
                    <>
                      {question.selected?.resource && (
                        <audio
                          controls
                          style={{ width: '100%' }}
                        >
                          <track kind="captions" />
                          <source
                            src={question.selected?.resource}
                            type="audio/mp3"
                          />
                        </audio>
                      )}
                      <Text mark>
                        <strong>Nội dung đã ghi âm:</strong> {question.selected?.content || 'Không có'}
                      </Text>
                      <Text mark>
                        <strong>Đánh giá:</strong> {question.selected?.assessment || 'Không có'}
                      </Text>
                    </>
                  ) : (
                    <VoiceRecorder
                      onStop={(payload) => handleStop(question, payload)}
                      fileName={`${question.id}${RECORD_EXT}`}
                    />
                  )}
                </Flex>
              ))}
            </div>
          </Panel>
        </Splitter>
      </Card>
    </Flex>
  );
};

export default SpeakingPart;
