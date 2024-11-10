'use client';

import { useParams } from 'next/navigation';
import {
  Anchor, Row, Col, Typography,
} from 'antd';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import { EXAM_ANCHOR } from '@/utils/constants';

const { Title } = Typography;

const History = () => {
  const params = useParams();

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Bài thi {params.id}
      </Title>
      <Row>
        <Col span={21}>
          <div id="listening">
            <ListeningPart
              id="listening-p1"
            />
            <hr className="margin_top_bottom_2" />
            <ListeningPart
              id="listening-p2"
            />
            <hr className="margin_top_bottom_2" />
            <ListeningPart
              id="listening-p3"
            />
          </div>
          <hr className="margin_top_bottom_2" />
          <div id="reading">
            <ReadingPart
              id="reading-p1"
            />
            <hr className="margin_top_bottom_2" />
            <ReadingPart
              id="reading-p2"
            />
            <hr className="margin_top_bottom_2" />
            <ReadingPart
              id="reading-p3"
            />
            <hr className="margin_top_bottom_2" />
            <ReadingPart
              id="reading-p4"
            />
          </div>
          <hr className="margin_top_bottom_2" />
          <div id="writing">
            <WritingPart
              id="writing-p1"
            />
            <hr className="margin_top_bottom_2" />
            <WritingPart
              id="writing-p2"
            />
          </div>
          <hr className="margin_top_bottom_2" />
          <div id="speaking">
            <SpeakingPart
              id="speaking-p1"
            />
            <hr className="margin_top_bottom_2" />
            <SpeakingPart
              id="speaking-p2"
            />
            <hr className="margin_top_bottom_2" />
            <SpeakingPart
              id="speaking-p3"
            />
          </div>
        </Col>
        <Col span={3}>
          <div className="padding_top_bottom_3 padding_left_right_1">
            <Anchor
              offsetTop={60}
              items={EXAM_ANCHOR}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default History;
