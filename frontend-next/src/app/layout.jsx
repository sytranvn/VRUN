'use client';

import React from 'react';
import '@/styles/global.scss';
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
import { Layout, Menu } from 'antd';

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

const RootLayout = () => (
  <html lang="en">
    <body>
      <Layout hasSider>
        <Layout.Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={items}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Header>
            header
          </Layout.Header>
          <Layout.Content>
            <div>
              main
            </div>
          </Layout.Content>
          <Layout.Footer>
            VRUN © {new Date().getFullYear()}
          </Layout.Footer>
        </Layout>
      </Layout>
    </body>
  </html>
);

export default RootLayout;
