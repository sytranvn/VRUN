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
import { SKILL_OPTIONS, STATUS_OPTIONS, RECORD_UPLOAD_EXT } from '@/utils/constants';

const { Item, List } = Form;
const { Group } = Radio;
const { Dragger } = Upload;

const AdminQuestionGroupDetail = () => {
  const { AdminService } = getApiService();
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const id = params.id?.[0];

  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState('');
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
                setErrorMsg('Câu hỏi phải có đáp án đúng');
                return Promise.resolve();
              }

              let count = 0;
              for (const ans of answers) {
                if (ans.is_correct_answer) {
                  count++;
                }
              }

              if (count > 1) {
                setErrorMsg('Câu hỏi chỉ được duy nhất một đáp án đúng');
                return Promise.resolve();
              }

              setErrorMsg('');
              return Promise.resolve();
            },
          },
        ],
      },
    },
  };

  const loadQuestionGroup = (groupId) => {
    AdminService.readQuestionGroup({ id: groupId })
      .then((resp) => {
        form.setFieldsValue(resp);
      });
  };

  const handeDeleteAnswer = (field, subField, callback) => {
    const question = form.getFieldValue('questions')[field.key];

    if (question?.id) {
      const answer = question.answers[subField.key];

      if (answer?.id) {
        AdminService.deleteAnswer({
          questionGroupId: id,
          questionId: question.id,
          id: answer.id,
        });
      }
    }

    callback(subField.name);
  };

  const handleDeleteQuestion = (field, callback) => {
    const question = form.getFieldValue('questions')[field.key];

    if (question?.id) {
      AdminService.deleteQuestion({
        questionGroupId: id,
        id: question.id,
      });
    }

    callback(field.name);
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
      if (errorMsg) {
        return modal.error({
          title: errorMsg,
        });
      }

      let resp;

      if (id) {
        formData.id = id;
        const questions = [...formData.questions];
        delete formData.questions;

        resp = await AdminService.updateQuestionGroup({
          id,
          requestBody: formData,
        });

        await Promise.all([
          ...questions.map((q) => {
            if (q.id) {
              return AdminService.updateQuestion({
                questionGroupId: id,
                id: q.id,
                requestBody: {
                  id: q.id,
                  description: q.description,
                  answers: q.answers.map((i) => ({
                    id: i.id || null,
                    description: i.description,
                    is_correct_answer: i.is_correct_answer || false,
                  })),
                },
              });
            }

            return AdminService.createQuestion({
              questionGroupId: id,
              requestBody: {
                description: q.description,
                answers: q.answers.map((i) => ({
                  description: i.description,
                  is_correct_answer: i.is_correct_answer || false,
                })),
              },
            });
          }),
        ]);
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
          if (!id && resp.id) {
            router.push(`/admin/question-group/detail/${resp.id}`);
          } else {
            loadQuestionGroup(id);
            // router.push('/admin/question-group');
          }
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
      loadQuestionGroup(id);
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
              accept={RECORD_UPLOAD_EXT}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Bỏ file vào đây
              </p>
              <p className="ant-upload-hint">
                Chỉ hỗ trợ file có định dạng sau: {RECORD_UPLOAD_EXT}.
              </p>
            </Dragger>
          </Item>
          {id && (
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
                            labelCol={6}
                          >
                            <Input placeholder="Nhập câu hỏi" />
                          </Item>
                          <Button
                            onClick={() => handleDeleteQuestion(field, fieldOpt.remove)}
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
                                    labelCol={6}
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
                                    onClick={
                                      () => handeDeleteAnswer(field, subField, subOpt.remove)
                                    }
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
          )}
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
