'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, Typography,
} from 'antd';
import Link from 'next/link';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (formData) => {
    console.log('formData', formData);
    setUserInfo(formData);
  };

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Đăng nhập
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
            placeholder="Tài khoản"
          />
        </Item>
        <Item
          name="password"
        >
          <Password
            autoComplete="current-password"
            size="large"
            placeholder="Mật khẩu"
          />
        </Item>
        <Item>
          <Button
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
            size="large"
          >
            Đăng nhập
          </Button>
        </Item>
        <Item>
          <Flex justify="space-between">
            <Link href="/forgot-password">Quên mật khẩu?</Link>
            <Link href="/register">Đăng ký</Link>
          </Flex>
        </Item>
      </Form>
    </>
  );
};

export default Login;
