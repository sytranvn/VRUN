## Image

```js
import Image from 'next/image';
```

## Local font

```js
import localFont from 'next/font/local';

const myfont = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const Component = ({ children }) => {
  return (
    <div className={`${myfont.variable}`}>
      {children}
    </div>
  );
}

```

## API call

```js
import getAxios from '@/utils/axios/getAxios';

const axios = getAxios();

const Index = async () => {
  const { data } = await axios.request({
    url: '/api/example',
    method: 'get',
    params: { abc: '123' },
  });

  return (
    <div>
      Main page {JSON.stringify(data)}
    </div>
  );
};

export default Index;

```

## Froala usage

```js
import { useState } from 'react';
import FroalaTextEditor from '@/components/FroalaTextEditor';

const Component = () => {
  const [model, setModel] = useState('');

  return (
    <FroalaTextEditor
      model={model}
      onModelChange={setModel}
    />
  );
}
```