'use client';

import React, { useEffect, useState } from 'react';
import {
  Anchor, Row, Col, Typography,
} from 'antd';
import ListeningPart from '@/components/sections/ListeningPart';
import ReadingPart from '@/components/sections/ReadingPart';
import WritingPart from '@/components/sections/WritingPart';
import SpeakingPart from '@/components/sections/SpeakingPart';
import { useParams } from 'next/navigation';
import getApiService from '@/services';

const { Title } = Typography;

const HistoryDetail = () => {
  const { CandidateService } = getApiService();
  const params = useParams();
  const id = params.id;
  const [exam, setExam] = useState();
  const [examAnchor, setExamAnchor] = useState([]);

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

          setExamAnchor(anchor);
          setExam(groupedExam);
        });
    }
  }, [CandidateService, exam, id]);

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Bài thi #{id}
      </Title>
      {exam && (
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
      )}
    </>
  );
};

export default HistoryDetail;
