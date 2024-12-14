'use client';

import React, { useEffect, useState } from 'react';
import {
  Anchor, Row, Col, Typography, Modal, Statistic, Card, Flex, Button,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import { useRouter, useParams } from 'next/navigation';
import getApiService from '@/services';

const { Title } = Typography;

const statisticStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
};

const HistoryDetail = () => {
  const { CandidateService } = getApiService();
  const [modal, modalContext] = Modal.useModal();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [exam, setExam] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [examAnchor, setExamAnchor] = useState([]);

  const loadExam = async (examId) => {
    try {
      const data = await CandidateService.readRegisteredExam({ id: examId });
      const result = await CandidateService.readExamResult({ id: examId });

      const selectedAnswers = (result.selected_answers || []).reduce((current, obj) => {
        current[obj.question_id] = obj.answer_id;
        return current;
      }, {});

      const selectedEssays = (result.essays || []).reduce((current, obj) => {
        current[obj.question_id] = obj;
        return current;
      }, {});

      /* Group parts */
      const groupedExam = (data.exam?.parts || [])
        .reduce((current, obj) => {
          const questionGroup = obj.question_group;

          if (!Array.isArray(current[questionGroup.skill])) {
            current[questionGroup.skill] = [];
          }

          questionGroup.questions = (questionGroup.questions || []).map((q) => ({
            ...q,
            selected: selectedAnswers[q.id] || selectedEssays[q.id],
          }));

          current[questionGroup.skill].push({
            ...questionGroup,
            order: obj.order,
          });

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

      setExamAnchor(anchor);
      setExam(groupedExam);
      setExamResult(result);
    } catch (e) {
      console.error(e);
      modal.error({
        title: 'Không tìm thấy kết quả.',
        onOk() {
          router.push('/history');
        },
      });
    }
  };

  useEffect(() => {
    if (!exam) {
      loadExam(id);
    }
  }, []);

  return (
    <Flex
      gap="large"
      vertical
    >
      <Title level={3} style={{ textAlign: 'center' }}>
        Bài thi #{id}
      </Title>
      {examResult && (
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Card>
              <Statistic
                style={statisticStyle}
                title="Kỹ năng nghe"
                value={examResult.listening_score}
                precision={1}
                suffix="/ 10"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                style={statisticStyle}
                title="Kỹ năng nói"
                value={examResult.speaking_score}
                precision={1}
                suffix="/ 10"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                style={statisticStyle}
                title="Kỹ năng đọc"
                value={examResult.reading_score}
                precision={1}
                suffix="/ 10"
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                style={statisticStyle}
                title="Kỹ năng viết"
                value={examResult.writing_score}
                precision={1}
                suffix="/ 10"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                style={statisticStyle}
                title="Tổng điểm"
                value={examResult.score}
                valueStyle={{ color: '#1677ff' }}
                precision={1}
                suffix="/ 10"
              />
            </Card>
          </Col>
        </Row>
      )}
      {exam && (
        <Row>
          <Col span={21}>
            <Flex vertical gap="large">
              {Object.entries(exam).map(([key, parts], idx) => (
                <Flex
                  id={key}
                  key={idx}
                  vertical
                  gap="large"
                >
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
                            hasResult
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
                            hasResult
                          />
                        );
                      case 'WRITING':
                        return (
                          <WritingPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                            task={part.description}
                            questions={part.questions}
                            hasResult
                          />
                        );
                      case 'SPEAKING':
                        return (
                          <SpeakingPart
                            id={`${key}-p${pidx + 1}`}
                            key={pidx}
                            task={part.description}
                            questions={part.questions}
                            hasResult
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </Flex>
              ))}
            </Flex>
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
      )}
      <div>
        <Button
          htmlType="button"
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/history')}
        >
          Quay lại
        </Button>
      </div>
      {modalContext}
    </Flex>
  );
};

export default HistoryDetail;
