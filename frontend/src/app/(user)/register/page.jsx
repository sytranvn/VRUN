'use client';

import { useEffect, useState } from 'react';
import {
  Flex, Form, Input, Button, Typography, Modal,
} from 'antd';
import Link from 'next/link';
import getApiService from '@/services';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/utils/constants';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Register = () => {
  const [modal, modalContext] = Modal.useModal();
  const router = useRouter();
  const { MeService } = getApiService();
  const [isRegisterAllowed, setIsRegisterAllowed] = useState(false);
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
    password: [
      { required: true, message: 'Vui lòng nhập mật khẩu' },
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
      { required: true, message: 'Vui lòng nhập lại mật khẩu' },
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

  const handleSubmit = (formData) => {
    MeService.registerUser({
      requestBody: formData,
    })
      .then((data) => {
        if (data.is_active) {
          modal.success({
            title: 'Đăng ký thành công.',
            onOk() {
              router.push('/login');
            },
          });
        }
      })
      .catch((e) => {
        modal.error({
          title: 'Đăng ký không thành công.',
        });
      });
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      router.push('/');
    } else {
      setIsRegisterAllowed(true);
    }
  }, []);

  return (
    <div>
      {isRegisterAllowed && (
        <>
          <Title level={3} style={{ textAlign: 'center' }}>
            Đăng ký
          </Title>
          <Form
            form={form}
            onFinish={handleSubmit}
            style={{ width: '100vw', maxWidth: '500px' }}
            labelCol={{ span: 8, style: { textAlign: 'left' }}}
            scrollToFirstError
          >
            <Flex vertical gap="small">
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
                    Đăng ký
                  </Button>
                  <Link href="/login" style={{ textAlign: 'right' }}>
                    Đăng nhập
                  </Link>
                </Flex>
              </Item>
            </Flex>
          </Form>
          {modalContext}
        </>
      )}
    </div>
  );
};

export default Register;
