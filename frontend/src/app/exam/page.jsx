'use client';

import React, { useEffect } from 'react';
import {
  Layout, Flex, Button, Statistic, Modal, Anchor, Row, Col,
} from 'antd';
import Link from 'next/link';
import { CodeOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import disableBodyScroll from '@/utils/scroll/disableBodyScroll';
import { EXAM_ANCHOR } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const { Countdown } = Statistic;

const headerStyle = {
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0px',
  borderBottom: '1px solid #ddd',
  zIndex: '11',
  padding: '0 20px',
};

const contentStyle = {
  minHeight: 'calc(100vh - 64px)',
  paddingBottom: '80px',
};

const Exam = () => {
  const [modal, modalContext] = Modal.useModal();
  const router = useRouter();

  const finishExam = () => {
    // modal.confirm({ title: '123' });
    console.log('finishExam');
    router.push('/finish');
  };

  const timeout = () => {
    console.log('timeout');
  };

  const saveExam = () => {
    console.log('save');
  };

  useEffect(() => {
    disableBodyScroll(document.body);
  }, []);

  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Flex
          justify="space-between"
          align="center"
        >
          <Flex gap="small">
            <CodeOutlined />
            <h1>
              <Link href="/" style={{ color: '#000' }}>VSTEP B2</Link>
            </h1>
          </Flex>
          <Countdown
            value={new Date().getTime() + 360000}
            onFinish={timeout}
          />
          <Flex gap="small">
            <Button
              icon={<SaveOutlined />}
              onClick={saveExam}
            >
              Lưu bài
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={finishExam}
            >
              Nộp bài
            </Button>
          </Flex>
        </Flex>
      </Layout.Header>
      <Layout.Content style={contentStyle}>
        <Row>
          <Col span={21}>
            <div id="listening">
              <ListeningPart
                id="listening-p1"
              />
              <ListeningPart
                id="listening-p2"
              />
              <ListeningPart
                id="listening-p3"
              />
            </div>
            <div id="reading">
              <ReadingPart
                id="reading-p1"
              />
              <ReadingPart
                id="reading-p2"
              />
              <ReadingPart
                id="reading-p3"
              />
              <ReadingPart
                id="reading-p4"
              />
            </div>
            <div id="writing">
              <WritingPart
                id="writing-p1"
              />
              <WritingPart
                id="writing-p2"
              />
            </div>
            <div id="speaking">
              <SpeakingPart
                id="speaking-p1"
              />
              <SpeakingPart
                id="speaking-p2"
              />
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
      </Layout.Content>
      {modalContext}
    </Layout>
  );
};

export default Exam;
