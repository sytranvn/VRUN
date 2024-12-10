'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card, Input, Form, Flex, Button, Modal, Radio, InputNumber,
  Switch, Upload,
} from 'antd';
import {
  DeleteOutlined, SaveOutlined, ArrowLeftOutlined, CloseOutlined,
  PlusOutlined, InboxOutlined,
} from '@ant-design/icons';
import FroalaTextEditor from '@/components/elements/FroalaTextEditor';
import getApiService from '@/services';
import { SKILL_OPTIONS, STATUS_OPTIONS } from '@/utils/constants';

const { Item, List } = Form;
const { Group } = Radio;
const { Dragger } = Upload;
const ACCEPT = '.mp3';

const AdminQuestionGroupDetail = () => {
  const { AdminService } = getApiService();
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const id = params.id?.[0];

  const [form] = Form.useForm();
  const [uploadFile, setUploadFile] = useState(null);
  const initValues = {
    status: STATUS_OPTIONS[0].value,
    skill: SKILL_OPTIONS[0].value,
    resource: null,
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
    questions: {
      description: [
        { required: true, message: 'Vui lòng nhập câu hỏi' },
      ],
      answers: {
        description: [
          { required: true, message: 'Vui lòng nhập câu trả lời' },
          {
            validator: async (rule) => {
              const { field } = rule;
              const [, qIndex] = field.match(/^questions\.(\d+)\..+/);
              const values = form.getFieldsValue();
              const currentQuestion = values.questions[qIndex];
              const answers = currentQuestion?.answers || [];

              if (!answers.some((i) => i.is_correct_answer)) {
                return Promise.reject(new Error('Câu hỏi phải có đáp án đúng'));
              }

              let count = 0;
              for (const ans of answers) {
                if (ans.is_correct_answer) {
                  count++;
                }
              }

              if (count > 1) {
                return Promise.reject(new Error('Câu hỏi chỉ được duy nhất một đáp án đúng'));
              }

              return Promise.resolve();
            },
          },
        ],
      },
    },
  };

  const handleFileUpload = ({ file }) => {
    if (file.status != 'done') return;
    setUploadFile(file.originFileObj);
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

      if (uploadFile) {
        await AdminService.createQuestionGroupResources({
          id: resp.id,
          formData: { file: uploadFile },
        });
      }

      setUploadFile(null);
      modal.success({
        title: 'Đã lưu thành công!',
        onOk() {
          router.push('/admin/question-group');
        },
      });
    } catch (e) {
      console.error(e);
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
  }, []);

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
        <Flex gap="middle" vertical>
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
          <List name="questions">
            {(fields, fieldOpt) => (
              <Card title="Danh sách câu hỏi">
                <Flex vertical gap="middle">
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Flex gap="middle">
                        <Item
                          style={{ width: '100%' }}
                          label={`Câu hỏi ${index + 1}`}
                          name={[field.name, 'description']}
                          rules={RULES.questions.description}
                        >
                          <Input placeholder="Nhập câu hỏi" />
                        </Item>
                        <Button
                          onClick={() => fieldOpt.remove(field.name)}
                          danger
                          icon={<CloseOutlined />}
                        >
                          Xoá
                        </Button>
                      </Flex>
                      <List name={[field.name, 'answers']}>
                        {(subFields, subOpt) => (
                          <Card
                            title="Đáp án"
                            style={{ marginBottom: '20px' }}
                          >
                            {subFields.map((subField, subIndex) => (
                              <Flex gap="middle" key={subField.key}>
                                <Item
                                  style={{ width: '100%' }}
                                  name={[subField.name, 'description']}
                                  label={`Đáp án ${String.fromCharCode(65 + subIndex)}`}
                                  rules={RULES.questions.answers.description}
                                >
                                  <Input
                                    placeholder="Nhập đáp án"
                                  />
                                </Item>
                                <Item
                                  name={[subField.name, 'is_correct_answer']}
                                >
                                  <Switch
                                    checkedChildren="Đúng"
                                    unCheckedChildren="Sai"
                                  />
                                </Item>
                                <Button
                                  onClick={() => subOpt.remove(subField.name)}
                                  danger
                                  icon={<CloseOutlined />}
                                  type="text"
                                />
                              </Flex>
                            ))}
                            <Flex justify="flex-end">
                              <Button
                                onClick={() => subOpt.add()}
                                icon={<PlusOutlined />}
                                type="primary"
                              >
                                Thêm đáp án
                              </Button>
                            </Flex>
                          </Card>
                        )}
                      </List>
                    </div>
                  ))}
                  <Button
                    onClick={() => fieldOpt.add()}
                    icon={<PlusOutlined />}
                    type="primary"
                  >
                    Thêm câu hỏi
                  </Button>
                </Flex>
              </Card>
            )}
          </List>
          <Item
            name="resource"
            label="Link tài liệu"
          >
            <Input readOnly />
          </Item>
          <Item label="Tài liệu đính kèm">
            <Dragger
              name="file"
              multiple={false}
              onChange={handleFileUpload}
              accept={ACCEPT}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Bỏ file vào đây
              </p>
              <p className="ant-upload-hint">
                Chỉ hỗ trợ file có định dạng sau: {ACCEPT}.
              </p>
            </Dragger>
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
        </Flex>
      </Form>
      {modalContext}
    </Card>
  );
};

export default AdminQuestionGroupDetail;
