'use client';

import {
  Flex, Splitter,
} from 'antd';
import Image from 'next/image';
import htmlSample4 from '@/assets/data/htmlSample4';
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
              dangerouslySetInnerHTML={{ __html: htmlSample4 }}
            />
          </Panel>
          <Panel defaultSize="50%">
            <div className={style.content}>
              <Image
                src="/static/images/sample_speaking.png"
                width={500}
                height={500}
                alt="sample"
              />
            </div>
          </Panel>
        </Splitter>
      </div>
    </Flex>
  );
};

export default ReadingPart;
