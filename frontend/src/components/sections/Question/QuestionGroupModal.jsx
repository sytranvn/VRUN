import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import QuestionGroupList from './QuestionGroupList';

const QuestionGroupListModal = ({ skill, children, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSubmit = () => {
    onSubmit(selectedRecords);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedRecords([]);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<PlusOutlined />}
      >
        {children}
      </Button>
      <Modal
        title={`Danh sách nhóm câu hỏi cho kỹ năng ${skill}`}
        centered
        open={open}
        onOk={() => handleSubmit()}
        onCancel={() => handleCancel()}
        width={1000}
      >
        <QuestionGroupList
          skill={skill}
          onSelect={(records) => setSelectedRecords(records)}
        />
      </Modal>
    </>
  );
};

export default QuestionGroupListModal;
