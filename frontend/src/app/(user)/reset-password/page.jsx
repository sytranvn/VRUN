'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, Typography,
} from 'antd';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const ResetPassword = () => {
  const [userInfo, setUserInfo] = useState({
    password: '',
    retypePassword: '',
  });
  const [form] = Form.useForm();

  const RULES = {
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
    setUserInfo(formData);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Khôi phục mật khẩu
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
            label="Mật khẩu"
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
              justify="center"
              vertical
              align="center"
              gap="middle"
            >
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: '100%' }}
                size="large"
              >
                Xác nhận
              </Button>
            </Flex>
          </Item>
        </Flex>
      </Form>
    </>
  );
};

export default ResetPassword;
