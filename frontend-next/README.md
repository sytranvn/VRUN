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