import { Flex, Splitter } from 'antd';
import Question from '@/components/elements/Question';
import style from './style.module.scss';

const { Panel } = Splitter;

const ListeningPart = ({
  id, task, questions, resource, onAnswer,
}) => {
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
      <div className={style.exam}>
        <Splitter resizable>
          <Panel>
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: task }}
            />
          </Panel>
          <Panel>
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

export default ListeningPart;
