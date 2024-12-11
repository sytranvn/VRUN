import { Flex, Splitter } from 'antd';
import Question from '@/components/elements/Question';
import style from './style.module.scss';

const { Panel } = Splitter;

const ReadingPart = ({
  id, task, questions, onAnswer,
}) => {
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
                {questions.map((question) => (
                  <Question
                    key={question.id}
                    title={question.description}
                    answers={question.answers}
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
