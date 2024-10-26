'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  ConfigProvider, Layout, theme,
} from 'antd';

const headerStyle = {
  backgroundColor: '#fff',
  position: 'sticky',
  top: '0px',
  borderBottom: '1px solid #ddd',
};

const contentStyle = {
  padding: '24px',
  minHeight: 'calc(100vh - 64px - 70px)',
};

const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#fff',
  height: '70px',
};

const HomeLayout = ({ children }) => (
  <AntdRegistry>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorBgLayout: '#fff',
          fontFamily: 'inherit',
        },
      }}
    >
      <Layout>
        <Layout.Header style={headerStyle}>
          VRUN
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

export default HomeLayout;
