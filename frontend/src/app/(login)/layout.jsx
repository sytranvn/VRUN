'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Flex } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import getThemeOptions from '@/utils/antd/getThemeOptions';

const themeOptions = getThemeOptions();

const LoginLayout = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={themeOptions}
      >
        <Flex
          style={{ minHeight: '100vh', padding: '40px 20px' }}
          align="center"
          justify="center"
          gap="middle"
          vertical
        >
          <Flex gap="small" justify="center">
            <CodeOutlined />
            <h1>VSTEP B2</h1>
          </Flex>
          <Flex
            style={{ width: '100%' }}
            justify="center"
            vertical
            align="center"
            gap="small"
          >
            { children }
          </Flex>
        </Flex>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default LoginLayout;
