'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card, Input, Form, Flex, Button, Modal,
} from 'antd';
import { DeleteOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const AdminExamDetail = () => {
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const id = params.id?.[0];

  const [record, setRecord] = useState({});
  const [form] = Form.useForm();

  const handleDelete = () => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      onOk() {
        console.log('delete');
        router.push('/admin/exam');
      },
    });
  };

  const handleSubmit = (formData) => {
    console.log('formData', formData);
    modal.success({
      title: 'Đã lưu thành công!',
      onOk() {
        router.push('/admin/exam');
      },
    });
  };

  return (
    <Card title={id ? `Đề thi #${id}` : 'Tạo đề thi'}>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={record}
        labelCol={{ span: 3, style: { textAlign: 'left' }}}
        wrapperCol={{ span: 21 }}
        scrollToFirstError
      >
        <Form.Item
          name="id"
          label="ID"
          rules={[]}
          hasFeedback
        >
          <Input placeholder="Enter ID" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Flex
            justify="space-between"
            align="center"
            gap="small"
          >
            <Button
              htmlType="button"
              type="default"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/admin/exam')}
            >
              Quay lại
            </Button>
            <Flex justify="flex-end" gap="small">
              { id && (
                <Button
                  htmlType="button"
                  type="primary"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleDelete}
                >
                  Xoá
                </Button>
              ) }
              <Button
                htmlType="submit"
                type="primary"
                icon={<SaveOutlined />}
              >
                { id ? 'Cập nhật' : 'Tạo mới' }
              </Button>
            </Flex>
          </Flex>
        </Form.Item>
      </Form>
      {modalContext}
    </Card>
  );
};

export default AdminExamDetail;
