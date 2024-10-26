'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  ConfigProvider, Layout, Menu, theme,
} from 'antd';

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

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
};

const contentStyle = {
  padding: '24px',
};

const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#fff',
};

const AdminLayout = ({ children }) => (
  <AntdRegistry>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorBgLayout: '#fff',
        },
      }}
    >
      <Layout hasSider>
        <Layout.Sider>
          <Menu
            style={menuStyle}
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
          />
        </Layout.Sider>
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
      </Layout>
    </ConfigProvider>
  </AntdRegistry>
);

export default AdminLayout;
