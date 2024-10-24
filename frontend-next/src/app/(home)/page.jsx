import getAxios from '@/utils/getAxios';

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
