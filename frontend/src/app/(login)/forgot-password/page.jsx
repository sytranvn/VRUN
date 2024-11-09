'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, Typography,
} from 'antd';
import Link from 'next/link';
import { CodeOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Title } = Typography;

const ForgotPassword = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });

  const handleSubmit = (formData) => {
    console.log('formData', formData);
    setUserInfo(formData);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Quên mật khẩu
      </Title>
      <Form
        onFinish={handleSubmit}
        style={{ width: '100%', maxWidth: '500px' }}
        initialValues={userInfo}
      >
        <Item
          name="username"
        >
          <Input
            autoComplete="username"
            size="large"
            placeholder="Tên tài khoản"
          />
        </Item>
        <Item
          name="email"
        >
          <Input
            autoComplete="email"
            size="large"
            placeholder="Email"
          />
        </Item>
        <Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
            size="large"
          >
            Xác thực
          </Button>
        </Item>
        <Item>
          <Flex justify="space-between">
            <Link href="/register">Đăng ký</Link>
            <Link href="/login">Đăng nhập</Link>
          </Flex>
        </Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
