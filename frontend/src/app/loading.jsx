import { Flex } from 'antd';
import Image from 'next/image';

const Loading = () => {
  return (
    <Flex
      style={{ height: '100vh', overflow: 'hidden', width: '100%' }}
      align="center"
      justify="center"
    >
      <Image
        className="loading_icon"
        priority
        src="/static/images/loading.png"
        width={60}
        height={60}
        alt="Loading"
      />
    </Flex>
  );
};

export default Loading;
