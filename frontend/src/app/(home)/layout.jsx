'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  ConfigProvider, Layout, Flex, Popover, Avatar, Button,
} from 'antd';
import Link from 'next/link';
import {
  CodeOutlined, UserOutlined, LogoutOutlined, SettingOutlined, HistoryOutlined,
} from '@ant-design/icons';
import getThemeOptions from '@/utils/antd/getThemeOptions';

const themeOptions = getThemeOptions();

const headerStyle = {
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0px',
  borderBottom: '1px solid #ddd',
  zIndex: '1',
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
  const userMenu = () => (
    <Flex vertical gap="small">
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
      <Link href="/logout">
        <Button
          style={{ width: '100%', justifyContent: 'flex-start' }}
          danger
          icon={<LogoutOutlined />}
        >
          Đăng xuất
        </Button>
      </Link>
    </Flex>
  );

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={themeOptions}
      >
        <Layout>
          <Layout.Header style={headerStyle}>
            <Flex
              justify="space-between"
              align="center"
            >
              <Flex gap="small">
                <CodeOutlined />
                <h1>
                  <Link href="/" style={{ color: '#000' }}>VSTEP B2</Link>
                </h1>
              </Flex>
              <Flex gap="small">
                <Popover
                  content={userMenu}
                  trigger="click"
                  placement="bottomRight"
                  arrow={false}
                >
                  <button type="button">
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
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default HomeLayout;
