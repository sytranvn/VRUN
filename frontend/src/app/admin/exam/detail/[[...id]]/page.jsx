'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card, Input, Form, Flex, Button, Modal, Radio, Table,
} from 'antd';
import {
  DeleteOutlined, SaveOutlined, ArrowLeftOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import getApiService from '@/services';
import { STATUS_OPTIONS, SKILL_OPTIONS } from '@/utils/constants';
import QuestionGroupModal from '@/components/sections/Question/QuestionGroupModal';

const { Item } = Form;
const { TextArea } = Input;
const { Group } = Radio;

const COLUMN_CONFIG = [
  {
    key: 'id', dataIndex: 'id', title: 'ID', width: '200px',
  },
  {
    key: 'duration', dataIndex: 'duration', title: 'Thời lượng (phút)', align: 'center', width: '150px',
  },
  {
    key: 'count',
    dataIndex: 'count',
    title: 'Số câu hỏi',
    align: 'center',
    render(_, record) {
      return (record.questions || []).length;
    },
    width: '150px',
  },
  {
    key: 'settings',
    dataIndex: 'settings',
    title: '',
    align: 'center',
    width: '100px',
    render(_, record) {
      return (
        <Link
          href={`/admin/question-group/detail/${record.id}`}
          target="_blank"
        >
          Xem chi tiết
        </Link>
      );
    },
  },
];

const AdminExamDetail = () => {
  const { AdminService } = getApiService();
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const id = params.id?.[0];
  const [examParts, setExamParts] = useState(SKILL_OPTIONS.reduce((current, skill) => {
    if (!Array.isArray(current[skill.value])) {
      current[skill.value] = [];
    }

    return current;
  }, {}), {});

  const [form] = Form.useForm();
  const initValues = {
    status: STATUS_OPTIONS[0].value,
  };

  const RULES = {
    title: [
      { required: true, message: 'Vui lòng nhập tiêu đề' },
    ],
    description: [
      { required: true, message: 'Vui lòng nhập mô tả' },
    ],
  };

  const handleDelete = () => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteExam({ id });
        router.push('/admin/exam');
      },
    });
  };

  const handleSubmit = async (formData) => {
    try {
      let resp;

      if (id) {
        resp = await AdminService.updateExam({
          id,
          requestBody: formData,
        });
      } else {
        resp = await AdminService.createExam({
          requestBody: formData,
        });
      }

      if (!resp.id) throw new Error();

      modal.success({
        title: 'Đã lưu thành công!',
        onOk() {
          if (!id && resp.id) {
            router.push(`/admin/exam/detail/${resp.id}`);
          } else {
            // router.push('/admin/exam');
          }
        },
      });
    } catch (e) {
      modal.error({
        title: id ? 'Không thể sửa đề thi' : 'Không thể tạo đề thi',
      });
    }
  };

  useEffect(() => {
    if (id) {
      AdminService.readExam({ id })
        .then((resp) => {
          form.setFieldsValue(resp);
        });
    }
  }, []);

  return (
    <Card title={id ? `Đề thi #${id}` : 'Tạo đề thi'}>
      <Form
        form={form}
        initialValues={initValues}
        onFinish={handleSubmit}
        labelCol={{ span: 3, style: { textAlign: 'left' }}}
        wrapperCol={{ span: 21 }}
        scrollToFirstError
      >
        <Item
          name="title"
          label="Tiêu đề"
          rules={RULES.title}
          hasFeedback
        >
          <Input placeholder="Nhập tiêu đề" />
        </Item>
        <Item
          name="description"
          label="Mô tả"
          rules={RULES.description}
        >
          <TextArea
            rows={4}
            placeholder="Nhập mô tả"
            maxLength={1000}
          />
        </Item>
        <Item
          name="status"
          label="Trạng thái"
        >
          <Group
            options={STATUS_OPTIONS}
          />
        </Item>
        {SKILL_OPTIONS.map((skill) => (
          <Item
            key={skill.value}
            label={`Kỹ năng ${skill.label}`}
          >
            <Flex
              vertical
              gap="middle"
            >
              <div>
                <QuestionGroupModal
                  skill={skill.value}
                  onSubmit={(records) => setExamParts({ ...examParts, [skill.value]: records })}
                >
                  Thêm phần câu hỏi
                </QuestionGroupModal>
              </div>
              {examParts[skill.value].length > 0 && (
                <Table
                  dataSource={examParts[skill.value]}
                  columns={COLUMN_CONFIG}
                  pagination={false}
                  bordered
                  rowKey="id"
                  scroll={{ x: 'max-content' }}
                />
              )}
            </Flex>
          </Item>
        ))}
        <Item wrapperCol={{ span: 24 }}>
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
        </Item>
      </Form>
      {modalContext}
    </Card>
  );
};

export default AdminExamDetail;
