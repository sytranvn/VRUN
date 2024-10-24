export async function GET() {
  return Response.json({ text: '123' });
}

/*
Call example:

const data = await fetch('http://localhost:3000/api/example', {
  method: 'GET',
}).then((res) => res.json());

console.log('response', data);
*/
