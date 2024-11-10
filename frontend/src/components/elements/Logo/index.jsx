import { Flex } from 'antd';
import Link from 'next/link';
import { CodeOutlined } from '@ant-design/icons';

const Logo = ({ href = '/' }) => (
  <Flex gap="small">
    <CodeOutlined />
    <h1>
      <Link href={href} style={{ color: '#000' }}>VSTEP B2</Link>
    </h1>
  </Flex>
);

export default Logo;
