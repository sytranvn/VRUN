'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import getThemeOptions from '@/utils/antd/getThemeOptions';

const themeOptions = getThemeOptions();

const ExamLayout = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={themeOptions}
      >
        { children }
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default ExamLayout;
