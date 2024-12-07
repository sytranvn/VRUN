'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import getThemeOptions from '@/utils/antd/getThemeOptions';
import AuthProvider from '@/components/sections/Provider/AuthProvider';

const themeOptions = getThemeOptions();

const ExamLayout = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={themeOptions}
      >
        <AuthProvider>
          { children }
        </AuthProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default ExamLayout;
