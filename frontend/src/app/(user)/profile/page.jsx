'use client';

import { useState } from 'react';
import {
  Flex, Form, Input, Button, DatePicker, Typography,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Item } = Form;
const { Title } = Typography;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    birthdate: '',
    username: '',
    password: '',
    retypePassword: '',
  });
  const [form] = Form.useForm();

  const RULES = {
    fullname: [
      { required: true, message: 'Vui lòng nhập họ tên' },
    ],
    birthdate: [
      { required: true, message: 'Vui lòng nhập ngày tháng năm sinh' },
    ],
    username: [
      { required: true, message: 'Vui lòng nhập tên tài khoản' },
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
    setUserInfo({
      ...formData,
      birthdate: formData.birthdate.format('YYYY-MM-DD'),
    });
  };

  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        Chỉnh sửa thông tin
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
            name="fullname"
            label="Họ và tên"
            rules={RULES.fullname}
            hasFeedback
          >
            <Input
              autoComplete="fullname"
              size="large"
            />
          </Item>
          <Item
            name="birthdate"
            label="Ngày sinh"
            rules={RULES.birthdate}
            hasFeedback
          >
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="YYYY-MM-DD"
            />
          </Item>
          <Item
            name="username"
            label="Tài khoản"
          >
            <Input
              autoComplete="username"
              size="large"
              readOnly
            />
          </Item>
          <Item
            name="password"
            label="Mật khẩu"
            rules={RULES.password}
            hasFeedback
          >
            <Link href="/change-password">
              <Button>Thay đổi mật khẩu</Button>
            </Link>
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

export default Profile;
