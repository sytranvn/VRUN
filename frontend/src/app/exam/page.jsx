'use client';

import React, { useEffect } from 'react';
import {
  Layout, Flex, Button, Statistic, Modal, Splitter, Anchor, Row, Col,
} from 'antd';
import { CodeOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons';
import disableBodyScroll from '@/utils/scroll/disableBodyScroll';
import { EXAM_ANCHOR } from '@/utils/constants';

const { Countdown } = Statistic;
const { Panel } = Splitter;

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

  const finishExam = () => {
    // modal.confirm({ title: '123' });
    console.log('finishExam');
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
            <h1>VSTEP B2</h1>
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
          <Col span={22}>
            <Row gutter={[40, 40]}>
              <Col span={24} id="part-1">
                <Splitter style={{ height: 'calc(100vh - 64px)' }} resizable>
                  <Panel defaultSize="40%">
                    Content
                  </Panel>
                  <Panel defaultSize="40%">
                    Answer 1
                  </Panel>
                </Splitter>
              </Col>
              <Col span={24} id="part-2">
                <Splitter style={{ height: 'calc(100vh - 64px)' }} resizable>
                  <Panel defaultSize="40%">
                    Content
                  </Panel>
                  <Panel defaultSize="40%">
                    Answer 2
                  </Panel>
                </Splitter>
              </Col>
              <Col span={24} id="part-3">
                <Splitter style={{ height: 'calc(100vh - 64px)' }} resizable>
                  <Panel defaultSize="40%">
                    Content
                  </Panel>
                  <Panel defaultSize="40%">
                    Answer 3
                  </Panel>
                </Splitter>
              </Col>
              <Col span={24} id="part-3-1">
                <Splitter style={{ height: 'calc(100vh - 64px)' }} resizable>
                  <Panel defaultSize="40%">
                    Content
                  </Panel>
                  <Panel defaultSize="40%">
                    Answer 3-1
                  </Panel>
                </Splitter>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <div className="padding_all_3">
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
