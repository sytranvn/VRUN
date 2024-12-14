'use client';

import { useMemo } from 'react';
import { Flex, Splitter } from 'antd';
import Question from '@/components/elements/Question';
import shuffle from '@/utils/math/shuffle';
import style from './style.module.scss';

const { Panel } = Splitter;

const ReadingPart = ({
  id, task, questions, onAnswer,
}) => {
  const displayQuestions = useMemo(() => shuffle(questions || []), [questions]);

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
              <Flex vertical gap="middle">
                {displayQuestions.map((question, index) => (
                  <Question
                    key={question.id}
                    title={question.description}
                    answers={question.answers}
                    order={index + 1}
                    onCheck={(answer) => onAnswer({
                      question_id: question.id,
                      answer_id: answer.id,
                    })}
                  />
                ))}
              </Flex>
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
