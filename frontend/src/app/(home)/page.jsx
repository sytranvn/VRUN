'use client';

import {
  Button, Row, Col, Typography, Flex, Card,
} from 'antd';
import Link from 'next/link';
import VoiceRecorder from '@/components/elements/VoiceRecorder';
import getApiService from '@/services';
import { useEffect, useState } from 'react';
import randomInt from '@/utils/math/randomInt';

const { Text } = Typography;

const Index = () => {
  const { CandidateService } = getApiService();
  const [examId, setExamId] = useState(null);

  useEffect(() => {
    CandidateService.readAvailableExams({
      limit: 100,
      skip: 0,
    }).then((resp) => {
      /* Pick random exam to test */
      const randomExam = resp.data[randomInt(0, resp.data.length - 1)];

      if (randomExam) {
        setExamId(randomExam.id);
      }
    });
  }, [CandidateService]);

  return (
    <div>
      <Row
        gutter={[30, 30]}
        align="stretch"
        className="padding_top_bottom_3"
      >
        <Col
          span={24}
          lg={8}
        >
          <Card
            title="Bài thi bao gồm 4 kĩ năng"
            style={{ height: '100%' }}
          >
            <Flex gap="middle" vertical>
              <Text>
                <strong>Listening</strong>: 3 parts - 47 phút
              </Text>
              <Text>
                <strong>Reading</strong>: 4 parts - 60 phút
              </Text>
              <Text>
                <strong>Writing</strong>: 2 parts - 60 phút
              </Text>
              <Text>
                <strong>Speaking</strong>: 3 parts - 12 phút
              </Text>
            </Flex>
          </Card>
        </Col>
        <Col
          span={24}
          lg={8}
        >
          <Card
            title="Các bước kiểm tra trước khi thi"
            style={{ height: '100%' }}
          >
            <Flex gap="middle" vertical>
              <Flex gap="middle" vertical>
                <Text>
                  <strong>Bước 1:</strong> Đeo tai nghe và nghe một đoạn audio bên dưới
                </Text>
                <audio controls>
                  <track kind="captions" />
                  <source
                    src="/static/audio/dummy.mp3"
                    type="audio/mp3"
                  />
                </audio>
              </Flex>
              <Flex gap="middle" vertical>
                <Text>
                  <strong>Bước 2:</strong> Để mic sát miệng
                </Text>
              </Flex>
              <Flex gap="middle" vertical>
                <Text>
                  <strong>Bước 3:</strong> Nhấp vào nút &ldquo;Thu âm&rdquo; để thu âm
                </Text>
                <VoiceRecorder />
              </Flex>
              <Flex gap="middle" vertical>
                <Text>
                  <strong>Bước 4:</strong> Nếu không nghe được giọng nói của mình
                  vui lòng thông báo với giám thị trông thi
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col
          span={24}
          lg={8}
        >
          <Card
            title="Lưu ý"
            style={{ height: '100%' }}
          >
            <Text>
              Khi hết thời gian của từng kỹ năng,
              hệ thống sẽ tự động chuyển sang kỹ năng tiếp theo.<br /><br />
              Thí sinh không thể thao tác được với kỹ năng đã làm trước đó.
              Thí sinh phải click nút <strong>&ldquo;LƯU BÀI&rdquo;</strong>
              sau khi hoàn thành mỗi part.<br /><br />
              Để chuyển part hay kỹ năng, thí sinh click vào nút
              <strong>&ldquo;TIẾP TỤC&rdquo;</strong>.
            </Text>
          </Card>
        </Col>
      </Row>
      <Flex justify="center">
        <Link href={`/exam/${examId}`}>
          <Button
            size="large"
            type="primary"
            disabled={!examId}
          >
            Bắt đầu thi
          </Button>
        </Link>
      </Flex>
    </div>
  );
};

export default Index;
