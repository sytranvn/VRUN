'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, Typography,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const ChangePassword = () => {
  const [userInfo, setUserInfo] = useState({
    oldPassword: '',
    password: '',
    retypePassword: '',
  });
  const [form] = Form.useForm();

  const RULES = {
    oldPassword: [
      { required: true, message: 'Vui lòng nhập mật khẩu' },
      () => ({
        validator(_, value) {
          if (value.length > 8) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('Mật khẩu có ít nhất 8 ký tự'));
        },
      }),
    ],
    password: [
      { required: true, message: 'Vui lòng nhập mật khẩu' },
      () => ({
        validator(_, value) {
          if (value.length > 8) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('Mật khẩu có ít nhất 8 ký tự'));
        },
      }),
    ],
    retypePassword: [
      { required: true, message: 'Vui lòng nhập lại mật khẩu' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value && getFieldValue('password') == value) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('Mật khẩu không trùng khớp'));
        },
      }),
    ],
  };

  const handleSubmit = (formData) => {
    console.log('formData', formData);
    setUserInfo(formData);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Đổi mật khẩu
      </Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ width: '100%', maxWidth: '500px' }}
        initialValues={userInfo}
        labelCol={{ span: 8, style: { textAlign: 'left' }}}
        scrollToFirstError
      >
        <Flex vertical gap="small">
          <Item
            name="password"
            label="Mật khẩu cũ"
            rules={RULES.oldPassword}
            hasFeedback
          >
            <Password
              autoComplete="current-password"
              size="large"
            />
          </Item>
          <Item
            name="password"
            label="Mật khẩu mới"
            rules={RULES.password}
            hasFeedback
          >
            <Password
              autoComplete="new-password"
              size="large"
            />
          </Item>
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
          <Item>
            <Flex
              justify="space-between"
              align="center"
              gap="middle"
            >
              <Link href="/">
                <Button
                  htmlType="button"
                  size="large"
                >
                  Quay lại
                </Button>
              </Link>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                icon={<SaveOutlined />}
              >
                Thay đổi
              </Button>
            </Flex>
          </Item>
        </Flex>
      </Form>
    </>
  );
};

export default ChangePassword;
