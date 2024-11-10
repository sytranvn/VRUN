import { Flex, Splitter } from 'antd';
import Question from '@/components/elements/Question';
import htmlSample from '@/assets/data/htmlSample';
import questionSample from '@/assets/data/questionSample';
import style from './style.module.scss';

const { Panel } = Splitter;

const ListeningPart = ({ id }) => {
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
            src="/static/audio/dummy.mp3"
            type="audio/mp3"
          />
        </audio>
      </div>
      <div className={style.exam}>
        <Splitter resizable>
          <Panel>
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: htmlSample }}
            />
          </Panel>
          <Panel>
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

export default ListeningPart;
