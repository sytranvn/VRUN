'use client';

import { useEffect } from 'react';
import {
  Flex, Form, Input, Button, Typography, Modal,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from '@/stores/slices/user';
import getApiService from '@/services';
import AuthProvider from '@/components/sections/Provider/AuthProvider';

const { Item } = Form;
const { Title } = Typography;

const Profile = () => {
  const { MeService } = getApiService();
  const [modal, modalContext] = Modal.useModal();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      form.setFieldValue(userInfo);
    }
  }, [userInfo]);

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

  const handleSubmit = async (formData) => {
    try {
      const data = await MeService.updateUserMe({
        requestBody: formData,
      });

      if (data.id) {
        dispatch(setUser(data));
        modal.success({
          title: 'Chỉnh sửa thông tin thành công.',
          onOk: () => router.push('/'),
        });
      }
    } catch (e) {
      console.error(e);
      modal.error({
        title: 'Không thể cập nhật thông tin.',
      });
    }
  };

  return (
    <AuthProvider>
      <Title level={3} style={{ textAlign: 'center' }}>
        Chỉnh sửa thông tin cá nhân
      </Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ width: '100vw', maxWidth: '500px' }}
        initialValues={userInfo}
        labelCol={{ span: 8, style: { textAlign: 'left' }}}
        scrollToFirstError
      >
        <Flex vertical gap="small">
          <Item
            name="full_name"
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
            name="email"
            label="Tài khoản"
          >
            <Input
              autoComplete="email"
              size="large"
              readOnly
            />
          </Item>
          <Item
            label="Mật khẩu"
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
      {modalContext}
    </AuthProvider>
  );
};

export default Profile;
