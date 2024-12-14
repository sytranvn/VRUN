'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  ConfigProvider, Layout, Flex, Popover, Avatar, Button,
} from 'antd';
import Link from 'next/link';
import {
  UserOutlined, LogoutOutlined, SettingOutlined, HistoryOutlined, DatabaseOutlined,
} from '@ant-design/icons';
import AuthProvider from '@/components/sections/Provider/AuthProvider';
import Logo from '@/components/elements/Logo';
import getThemeOptions from '@/utils/antd/getThemeOptions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { TOKEN_KEY } from '@/utils/constants';

const themeOptions = getThemeOptions();

const headerStyle = {
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0px',
  borderBottom: '1px solid #ddd',
  zIndex: '10',
};

const contentStyle = {
  padding: '24px',
  minHeight: 'calc(100vh - 64px - 30px)',
};

const footerStyle = {
  textAlign: 'center',
  height: '30px',
  padding: '0',
};

const HomeLayout = ({ children }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    Cookies.set(TOKEN_KEY, '');
    router.push('/login');
  };

  const userMenu = () => (
    <Flex vertical gap="small">
      {userInfo.is_superuser && (
        <Link href="/admin">
          <Button
            style={{ width: '100%', justifyContent: 'flex-start' }}
            icon={<DatabaseOutlined />}
          >
            Admin
          </Button>
        </Link>
      )}
      <Link href="/profile">
        <Button
          style={{ width: '100%', justifyContent: 'flex-start' }}
          icon={<SettingOutlined />}
        >
          Trang cá nhân
        </Button>
      </Link>
      <Link href="/history">
        <Button
          style={{ width: '100%', justifyContent: 'flex-start' }}
          icon={<HistoryOutlined />}
        >
          Lịch sử thi
        </Button>
      </Link>
      <Button
        style={{ width: '100%', justifyContent: 'flex-start' }}
        danger
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </Flex>
  );

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={themeOptions}
      >
        <AuthProvider>
          <Layout>
            <Layout.Header style={headerStyle}>
              <Flex
                justify="space-between"
                align="center"
              >
                <Logo />
                <Flex gap="small">
                  <Popover
                    content={userMenu}
                    trigger="click"
                    placement="bottomRight"
                    arrow={false}
                  >
                    <button type="button">
                      <span style={{ marginRight: '10px' }}>
                        {userInfo?.full_name}
                      </span>
                      <Avatar
                        icon={<UserOutlined />}
                      />
                    </button>
                  </Popover>
                </Flex>
              </Flex>
            </Layout.Header>
            <Layout.Content style={contentStyle}>
              {children}
            </Layout.Content>
            <Layout.Footer style={footerStyle}>
              VRUN © {new Date().getFullYear()}
            </Layout.Footer>
          </Layout>
        </AuthProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default HomeLayout;
