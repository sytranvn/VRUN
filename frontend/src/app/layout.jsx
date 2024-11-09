import React from 'react';
import '@/styles/global.scss';
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: '../assets/fonts/Quicksand/static/Quicksand-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Quicksand/static/Quicksand-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Quicksand/static/Quicksand-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata = {
  title: 'VRUN',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
