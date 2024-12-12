'use client';

import React, { useEffect, useState } from 'react';
import {
  Layout, Flex, Button, Statistic, Modal, Anchor, Row, Col,
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Logo from '@/components/elements/Logo';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import disableBodyScroll from '@/utils/scroll/disableBodyScroll';
import enableBodyScroll from '@/utils/scroll/enableBodyScroll';
import { useRouter } from 'next/navigation';
import getApiService from '@/services';
import AuthProvider from '@/components/sections/Provider/AuthProvider';
import { EXAM_KEY } from '@/utils/constants';
import Cookies from 'js-cookie';

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
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [exam, setExam] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [examAnchor, setExamAnchor] = useState([]);
  const [submitQuestions, setSubmitQuestions] = useState([]);
  const [submitEssays, setSubmitEssays] = useState([]);
  const [submitRecords, setSubmitRecords] = useState([]);

  const saveAnswer = (payload) => {
    const excluded = submitQuestions.filter((i) => i.question_id != payload.question_id);
    setSubmitQuestions([...excluded].concat(payload));
  };

  const saveEssay = (payload) => {
    const excluded = submitEssays.filter((i) => i.question_id != payload.question_id);
    setSubmitEssays([...excluded].concat(payload));
  };

  const saveRecord = (payload) => {
    const excluded = submitRecords.filter((i) => i.question_id != payload.question_id);
    setSubmitRecords([...excluded].concat(payload));
  };

  const submitExam = async () => {
    try {
      setIsLoading(true);

      console.log({
        submitQuestions,
        submitEssays,
        submitRecords,
      });

      await Promise.all([
        CandidateService.addAnswers({
          id,
          requestBody: submitQuestions,
        }),
        submitEssays.forEach((essay) => {
          CandidateService.addWritingRecord({
            id,
            requestBody: essay,
          });
        }),
        submitRecords.forEach((record) => {
          CandidateService.addSpeakingRecord({
            id,
            questionId: record.question_id,
            formData: { file: record.file },
          });
        }),
      ]);

      const resp = await submitAnswer({ id });

      if (!resp.id) {
        throw new Error();
      }

      Cookies.set(EXAM_KEY, '');
      router.push(`/finish/${resp.id}`);
    } catch (e) {
      modal.error({
        title: 'Không thể nộp bài, vui lòng liên hệ giám thị coi thi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = () => {
    modal.confirm({
      title: 'Bạn có chắc muốn kết thúc bài thi?',
      onOk: submitExam,
    });
  };

  const onTimeout = () => {
    modal.warning({
      title: 'Hết giờ làm bài.',
      onOk: submitExam,
    });
  };

  useEffect(() => {
    disableBodyScroll(document.body);

    const examKey = Cookies.get(EXAM_KEY);
    if (!examKey) {
      router.push('/');

      return () => enableBodyScroll(document.body);
    }

    try {
      setId(examKey);

      CandidateService.readRegisteredExam({ id: examKey })
        .then((data) => {
          setId(data.id);
          let duration = 0;

          /* Group parts */
          const groupedExam = (data.exam?.parts || [])
            .reduce((current, obj) => {
              if (!Array.isArray(current[obj.question_group.skill])) {
                current[obj.question_group.skill] = [];
              }

              current[obj.question_group.skill].push({
                ...obj.question_group,
                order: obj.order,
              });

              duration += obj.question_group.duration * 60 * 1000;

              return current;
            }, {});

          /* Menu anchor */
          const anchor = Object.entries(groupedExam)
            .map(([key, parts]) => {
              let totalQuestions = 0;
              for (const part of parts) {
                totalQuestions += part.questions?.length || 0;
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

          setTotalTime(+(new Date().getTime()) + duration);
          setExamAnchor(anchor);
          setExam(groupedExam);
        });
    } catch (e) {
      console.error(e);
    }

    return () => {
      enableBodyScroll(document.body);
    };
  }, []);

  return (
    <AuthProvider>
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
                type="primary"
                icon={<CheckOutlined />}
                loading={isLoading}
                onClick={onFinish}
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
                              task={part.description}
                              questions={part.questions}
                              resource={part.resource}
                              onAnswer={(payload) => saveAnswer(payload)}
                            />
                          );
                        case 'READING':
                          return (
                            <ReadingPart
                              id={`${key}-p${pidx + 1}`}
                              key={pidx}
                              task={part.description}
                              questions={part.questions}
                              resource={part.resource}
                              onAnswer={(payload) => saveAnswer(payload)}
                            />
                          );
                        case 'WRITING':
                          return (
                            <WritingPart
                              id={`${key}-p${pidx + 1}`}
                              key={pidx}
                              task={part.description}
                              questions={part.questions}
                              onAnswer={(payload) => saveEssay(payload)}
                            />
                          );
                        case 'SPEAKING':
                          return (
                            <SpeakingPart
                              id={`${key}-p${pidx + 1}`}
                              key={pidx}
                              task={part.description}
                              questions={part.questions}
                              onAnswer={(payload) => saveRecord(payload)}
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
    </AuthProvider>
  );
};

export default Exam;
