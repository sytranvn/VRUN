'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, Typography, Modal,
} from 'antd';
import Link from 'next/link';
import getApiService from '@/services';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { TOKEN_KEY } from '@/utils/constants';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();
  const { LoginService } = getApiService();
  const [userInfo] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (formData) => {
    LoginService.loginAccessToken({ formData })
      .then((data) => {
        if (!data.access_token) {
          throw new Error();
        }
        Cookies.set(TOKEN_KEY, data.access_token, { expires: 1 });
        router.replace('/');
      })
      .catch(() => {
        modal.error({
          title: 'Tài khoản hoặc mật khẩu không đúng.',
        });
      });
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
      {modalContext}
    </>
  );
};

export default Login;
