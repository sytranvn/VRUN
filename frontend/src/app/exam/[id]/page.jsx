'use client';

import React, { useEffect, useState } from 'react';
import {
  Layout, Flex, Button, Statistic, Modal, Anchor, Row, Col,
} from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import Logo from '@/components/elements/Logo';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import disableBodyScroll from '@/utils/scroll/disableBodyScroll';
import enableBodyScroll from '@/utils/scroll/enableBodyScroll';
import { useRouter, useParams } from 'next/navigation';
import getApiService from '@/services';

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
  const { CandidateService } = getApiService();
  const [modal, modalContext] = Modal.useModal();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [exam, setExam] = useState();
  const [totalTime, setTotalTime] = useState(0);
  const [examAnchor, setExamAnchor] = useState([]);

  const finishExam = () => {
    modal.confirm({
      title: 'Bạn có chắc muốn kết thúc bài thi?',
      onOk() {
        enableBodyScroll(document.body);
        router.push('/finish');
      },
    });
  };

  const onTimeout = () => {
    modal.warning({
      title: 'Hết giờ làm bài.',
      onOk() {
        router.push('/finish');
      },
    });
  };

  const saveExam = () => {
    console.log('save');
  };

  useEffect(() => {
    if (!exam) {
      let durationCount = 0;
      CandidateService.readAvailableExam({ id })
        .then((data) => {
          /* Group parts */
          const groupedExam = (data.parts || [])
            .reduce((current, obj) => {
              if (!Array.isArray(current[obj.question_group.skill])) {
                current[obj.question_group.skill] = [];
              }

              current[obj.question_group.skill].push({
                ...obj.question_group,
                order: obj.order,
              });

              durationCount += parseInt(obj.question_group?.duration || 0);
              return current;
            }, {});

          /* Menu anchor */
          const anchor = Object.entries(groupedExam)
            .map(([key, parts]) => {
              let totalQuestions = 0;
              for (const part of parts) {
                totalQuestions += part.answers?.length || 0;
              }

              return {
                key,
                href: `#${key}`,
                title: `${key} - ${totalQuestions} câu`,
                children: parts.map((_, idx) => ({
                  key: `${key}-p${idx + 1}`,
                  href: `#${key}-p${idx + 1}`,
                  title: `Part ${idx + 1}`,
                })),
              };
            });

          setTotalTime(+(new Date().getTime()) + durationCount * 60 * 1000);
          setExamAnchor(anchor);
          setExam(groupedExam);
        });
    }
  }, [CandidateService, exam, id]);

  useEffect(() => {
    disableBodyScroll(document.body);
    return () => {
      enableBodyScroll(document.body);
    };
  }, []);

  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Flex
          justify="space-between"
          align="center"
        >
          <Logo />
          <Countdown
            value={totalTime}
            onFinish={onTimeout}
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
      {exam && (
        <Layout.Content style={contentStyle}>
          <Row>
            <Col span={21}>
              {Object.entries(exam).map(([key, parts], idx) => (
                <div id={key} key={idx}>
                  {parts.map((part, pidx) => {
                    switch (key) {
                      case 'LISTENING':
                        return (
                          <ListeningPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                          />
                        );
                      case 'READING':
                        return (
                          <ReadingPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                          />
                        );
                      case 'WRITING':
                        return (
                          <WritingPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                          />
                        );
                      case 'SPEAKING':
                        return (
                          <SpeakingPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
            </Col>
            <Col span={3}>
              <div className="padding_top_bottom_3 padding_left_right_1">
                <Anchor
                  offsetTop={60}
                  items={examAnchor}
                />
              </div>
            </Col>
          </Row>
        </Layout.Content>
      )}
      {modalContext}
    </Layout>
  );
};

export default Exam;
