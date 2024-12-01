'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import initStore from '@/stores';

const StoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = initStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
