'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card, Input, Form, Flex, Button, Modal, Radio, InputNumber,
} from 'antd';
import { DeleteOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import FroalaTextEditor from '@/components/elements/FroalaTextEditor';
import getApiService from '@/services';
import { SKILL_OPTIONS, STATUS_OPTIONS } from '@/utils/constants';

const { Item, List } = Form;
const { Group } = Radio;

const AdminQuestionGroupDetail = () => {
  const { AdminService } = getApiService();
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const id = params.id?.[0];

  const [form] = Form.useForm();
  const initValues = {
    status: STATUS_OPTIONS[0].value,
    skill: SKILL_OPTIONS[0].value,
  };

  const RULES = {
    skill: [
      { required: true, message: 'Vui lòng chọn kỹ năng' },
    ],
    duration: [
      { required: true, message: 'Vui lòng điều chỉnh thời lượng' },
    ],
    description: [
      { required: true, message: 'Vui lòng nhập mô tả' },
    ],
    resource: [
      { required: true, message: 'Vui lòng thêm tài liệu' },
    ],
  };

  const handleDelete = () => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteQuestionGroup({ id });
        router.push('/admin/question-group');
      },
    });
  };

  const handleSubmit = async (formData) => {
    try {
      let resp;

      if (id) {
        formData.id = id;
        resp = await AdminService.updateQuestionGroup({
          id,
          requestBody: formData,
        });
      } else {
        resp = await AdminService.createQuestionGroup({
          requestBody: formData,
        });
      }

      if (!resp.id) throw new Error();

      modal.success({
        title: 'Đã lưu thành công!',
        onOk() {
          router.push('/admin/question-group');
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
      AdminService.readQuestionGroup({ id })
        .then((resp) => {
          form.setFieldsValue({
            ...resp,
            status: STATUS_OPTIONS[0].value,
          });
        });
    }
  }, [AdminService, id, form]);

  return (
    <Card title={id ? `Nhóm câu hỏi #${id}` : 'Tạo nhóm câu hỏi'}>
      <Form
        form={form}
        initialValues={initValues}
        onFinish={handleSubmit}
        labelCol={{ span: 3, style: { textAlign: 'left' }}}
        wrapperCol={{ span: 21 }}
        scrollToFirstError
      >
        <Item
          name="status"
          label="Trạng thái"
        >
          <Group
            options={STATUS_OPTIONS}
          />
        </Item>
        <Item
          name="skill"
          label="Kỹ năng"
          rules={RULES.skill}
        >
          <Group
            options={SKILL_OPTIONS}
          />
        </Item>
        <Item
          name="duration"
          label="Thời lượng"
          rules={RULES.duration}
        >
          <InputNumber
            addonAfter="phút"
          />
        </Item>
        <Item
          name="description"
          label="Đề thi"
          rules={RULES.description}
        >
          <FroalaTextEditor
            placeholder="Nhập đề thi"
            showCount
          />
        </Item>
        <Item
          name="resource"
          label="Tài liệu"
          rules={RULES.resource}
        >
          <Input />
        </Item>
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
              onClick={() => router.push('/admin/question-group')}
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

export default AdminQuestionGroupDetail;
