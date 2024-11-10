'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import style from './style.module.scss';

const ScrollTop = () => {
  const [showScroll, setScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 200);
    });
  }, []);

  return (
    (showScroll && (
      <div className={style.scroll}>
        <Button
          onClick={scrollTop}
          icon={<ArrowUpOutlined />}
        />
      </div>
    ))
  );
};

export default ScrollTop;
