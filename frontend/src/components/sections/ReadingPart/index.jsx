import { Flex, Splitter } from 'antd';
import Question from '@/components/elements/Question';
import htmlSample2 from '@/assets/data/htmlSample2';
import questionSample from '@/assets/data/questionSample';
import style from './style.module.scss';

const { Panel } = Splitter;

const ReadingPart = ({ id }) => {
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
              dangerouslySetInnerHTML={{ __html: htmlSample2 }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div className={style.content}>
              <Flex vertical gap="middle">
                {questionSample.map((question) => (
                  <Question
                    key={question.id}
                    title={question.title}
                    order={question.order}
                    answers={question.answers}
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
