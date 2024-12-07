'use client';

import { useEffect, useState } from 'react';
import {
  Descriptions,
} from 'antd';
import getApiService from '@/services';
import { SKILL_OPTIONS, STATUS_OPTIONS } from '@/utils/constants';

const { Item } = Descriptions;

const QuestionGroupDetail = ({ id }) => {
  const { AdminService } = getApiService();
  const [questionGroup, setQuestionGroup] = useState(null);

  useEffect(() => {
    if (id) {
      AdminService.readQuestionGroup({ id })
        .then((resp) => {
          setQuestionGroup(resp);
        });
    }
  }, [AdminService, id]);
  return (
    <div>
      {questionGroup && (
        <Descriptions layout="vertical">
          <Item label="ID">{ id }</Item>
        </Descriptions>
      )}
    </div>
  );
};

export default QuestionGroupDetail;
