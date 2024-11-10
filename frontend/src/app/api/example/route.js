export async function GET() {
  return Response.json({ text: '123' });
}

/*
Call example:

import getAxios from '@/utils/axios/getAxios';

const axios = getAxios();

const { data } = await axios.request({
  url: '/api/example',
  method: 'get',
  params: { abc: '123' },
});

console.log('response', data);
*/
