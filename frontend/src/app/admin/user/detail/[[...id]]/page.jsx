'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card, Input, Form, Flex, Button, Modal, Radio, Switch,
} from 'antd';
import {
  DeleteOutlined, SaveOutlined, ArrowLeftOutlined,
} from '@ant-design/icons';
import getApiService from '@/services';
import { ROLE_OPTIONS } from '@/utils/constants';

const { Item } = Form;
const { Password } = Input;
const { Group } = Radio;

const AdminUserDetailManagement = () => {
  const { AdminService } = getApiService();
  const [modal, modalContext] = Modal.useModal();

  const router = useRouter();
  const params = useParams();
  const userId = params.id?.[0];
  const [showPassword, setShowPassword] = useState(!userId);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const initValues = {
    role: ROLE_OPTIONS[0].value,
    is_active: true,
    is_superuser: false,
  };
  const [form] = Form.useForm();

  const RULES = {
    full_name: [
      { required: true, message: 'Vui lòng nhập họ tên' },
    ],
    email: [
      { required: true, message: 'Vui lòng nhập tên tài khoản' },
      () => ({
        validator(_, value) {
          if (/^[^@]+@[^@.]+\.[^@]+$/.test(value)) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('Vui lòng nhập đúng email'));
        },
      }),
    ],
    role: [
      { required: true },
    ],
    password: [
      { required: showPassword, message: 'Vui lòng nhập mật khẩu' },
      () => ({
        validator(_, value) {
          if (value && value.length < 8) {
            return Promise.reject(new Error('Mật khẩu có ít nhất 8 ký tự'));
          }

          return Promise.resolve();
        },
      }),
    ],
    retypePassword: [
      { required: showPassword, message: 'Vui lòng nhập lại mật khẩu' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value && getFieldValue('password') !== value) {
            return Promise.reject(new Error('Mật khẩu không trùng khớp'));
          }

          return Promise.resolve();
        },
      }),
    ],
  };

  const handleDelete = () => {
    modal.confirm({
      title: 'Xác nhận xoá?',
      async onOk() {
        await AdminService.deleteUser({ userId });
        router.push('/admin/user');
      },
    });
  };

  const handleSubmit = async (formData) => {
    try {
      let resp;

      if (userId) {
        formData.userId = userId;
        resp = await AdminService.updateUser({
          userId,
          requestBody: formData,
        });
      } else {
        resp = await AdminService.createUser({
          requestBody: formData,
        });
      }

      if (!resp.email) throw new Error();

      modal.success({
        title: 'Đã lưu thành công!',
        onOk() {
          router.push('/admin/user');
        },
      });
    } catch (e) {
      console.error(e);
      modal.error({
        title: userId ? 'Không thể cập nhật tài khoản' : 'Không thể tạo tài khoản',
      });
    }
  };

  useEffect(() => {
    if (userId) {
      AdminService.readUserById({ userId })
        .then((resp) => {
          form.setFieldsValue(resp);
          setIsSuperUser(resp.is_superuser);
        });
    }
  }, []);

  return (
    <Card title={userId ? `Tài khoản #${userId}` : 'Tạo tài khoản'}>
      <Form
        form={form}
        initialValues={initValues}
        onFinish={handleSubmit}
        labelCol={{ span: 3, style: { textAlign: 'left' }}}
        wrapperCol={{ span: 21 }}
        scrollToFirstError
      >
        <Flex vertical gap="middle">
          <Item
            name="full_name"
            label="Họ và tên"
            rules={RULES.full_name}
            hasFeedback
          >
            <Input
              autoComplete="fullname"
              size="large"
            />
          </Item>
          <Item
            name="email"
            label="Email"
            rules={RULES.email}
            hasFeedback
          >
            <Input
              autoComplete="email"
              size="large"
            />
          </Item>
          <Item
            name="role"
            label="Vai trò"
            rules={RULES.role}
          >
            <Group
              options={ROLE_OPTIONS}
            />
          </Item>
          <Item
            name="is_active"
            label="Kích hoạt"
            rules={RULES.role}
          >
            <Switch />
          </Item>
          <Item
            name="password"
            label="Mật khẩu"
            rules={RULES.password}
            hasFeedback
          >
            {!showPassword && (
              <Button
                onClick={() => setShowPassword(true)}
              >
                Đổi mật khẩu
              </Button>
            )}
            {showPassword && (
              <Password
                autoComplete="new-password"
                size="large"
              />
            )}
          </Item>
          {showPassword && (
            <Item
              name="retypePassword"
              label="Nhập lại mật khẩu"
              rules={RULES.retypePassword}
              hasFeedback
            >
              <Password
                autoComplete="new-password"
                size="large"
              />
            </Item>
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
                onClick={() => router.push('/admin/user')}
              >
                Quay lại
              </Button>
              <Flex justify="flex-end" gap="small">
                { userId && !isSuperUser && (
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
                  { userId ? 'Cập nhật' : 'Tạo mới' }
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

export default AdminUserDetailManagement;
