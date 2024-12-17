'use client';

import React, { useEffect, useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  PaperClipOutlined,
  HomeOutlined,
  ExceptionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  ConfigProvider, Layout, Menu, Flex, Button, theme,
} from 'antd';
import Link from 'next/link';
import Logo from '@/components/elements/Logo';
import AuthProvider from '@/components/sections/Provider/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/utils/constants';

const items = [
  {
    key: 'dashboard',
    icon: React.createElement(HomeOutlined),
    label: <Link href="/admin">Trang chủ</Link>,
  },
  {
    key: 'exam',
    icon: React.createElement(PaperClipOutlined),
    label: 'Quản lý đề thi',
    children: [
      {
        key: 'exam-management',
        label: <Link href="/admin/exam">Đề thi</Link>,
      },
      {
        key: 'question-group-management',
        label: <Link href="/admin/question-group">Nhóm câu hỏi</Link>,
      },
    ],
  },
  // {
  //   key: 'history-management',
  //   icon: React.createElement(ExceptionOutlined),
  //   label: <Link href="/admin/history">Lịch sử dự thi</Link>,
  // },
  {
    key: 'user-management',
    icon: React.createElement(UserOutlined),
    label: <Link href="/admin/user">Quản lý người dùng</Link>,
  },
];

const menuStyle = {
  height: '100vh',
  overflow: 'auto',
  position: 'sticky',
  top: '0px',
};

const headerStyle = {
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0px',
  borderBottom: '1px solid #ddd',
  zIndex: '10',
};

const contentStyle = {
  padding: '24px',
  backgroundColor: '#fafafa',
};

const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#fafafa',
};

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const path = usePathname();

  useEffect(() => {
    if (path.startsWith('/admin/exam')) {
      setSelectedKeys(['exam-management']);
    } else if (path.startsWith('/admin/history')) {
      setSelectedKeys(['history-management']);
    } else if (path.startsWith('/admin/user')) {
      setSelectedKeys(['user-management']);
    } else if (path.startsWith('/admin/question-group')) {
      setSelectedKeys(['question-group-management']);
    } else {
      setSelectedKeys(['dashboard']);
    }
  }, [path]);

  const handleLogout = () => {
    Cookies.set(TOKEN_KEY, '');
    router.push('/login');
  };

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorBgLayout: '#fff',
          },
        }}
      >
        <AuthProvider>
          <Layout hasSider>
            <Layout.Sider>
              <Menu
                style={menuStyle}
                mode="inline"
                selectedKeys={selectedKeys}
                items={items}
              />
            </Layout.Sider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Flex justify="space-between" align="center">
                  <Logo href="/admin" />
                  <Button onClick={handleLogout} type="link">
                    Đăng xuất
                  </Button>
                </Flex>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                {children}
              </Layout.Content>
              <Layout.Footer style={footerStyle}>
                VRUN © {new Date().getFullYear()}
              </Layout.Footer>
            </Layout>
          </Layout>
        </AuthProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AdminLayout;
