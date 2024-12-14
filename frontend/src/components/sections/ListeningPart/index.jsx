'use client';

import { useMemo } from 'react';
import { Flex, Splitter, Card } from 'antd';
import Question from '@/components/elements/Question';
import shuffle from '@/utils/math/shuffle';
import style from './style.module.scss';

const { Panel } = Splitter;

const ListeningPart = ({
  id, task, questions = [], hasResult, resource, onAnswer,
}) => {
  const displayQuestions = useMemo(() => shuffle(questions), [questions]);

  return (
    <Flex
      id={id}
      vertical
      align="center"
      className={style.section}
    >
      <div className={style.audio}>
        <audio controls>
          <track kind="captions" />
          <source
            src={resource}
            type="audio/mp3"
          />
        </audio>
      </div>
      <Card className={style.exam}>
        <Splitter resizable>
          <Panel>
            <div
              className={style.content}
              style={{ height: hasResult ? 'auto' : '' }}
              dangerouslySetInnerHTML={{ __html: task }}
            />
          </Panel>
          <Panel>
            <div
              className={style.content}
              style={{ height: hasResult ? 'auto' : '' }}
            >
              <Flex vertical gap="middle">
                {displayQuestions.map((question, index) => (
                  <Question
                    key={question.id}
                    title={question.description}
                    answers={question.answers}
                    order={index + 1}
                    selected={question.selected}
                    onCheck={(answer) => onAnswer && onAnswer({
                      question_id: question.id,
                      answer_id: answer.id,
                    })}
                  />
                ))}
              </Flex>
            </div>
          </Panel>
        </Splitter>
      </Card>
    </Flex>
  );
};

export default ListeningPart;
