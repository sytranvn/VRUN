'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  ConfigProvider, Layout, Flex, Button,
} from 'antd';
import Link from 'next/link';
import { CodeOutlined } from '@ant-design/icons';
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
                <Link href="/login">
                  <Button type="link">
                    Login
                  </Button>
                </Link>
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
