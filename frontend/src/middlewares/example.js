import { NextResponse } from 'next/server';

const exampleMiddleware = (request) => {
  console.log('custom middleware');
  return NextResponse.next();
};

export default exampleMiddleware;
