import { NextResponse } from 'next/server';
import exampleMiddleware from '@/middlewares/example';

export const middleware = (req) => {
  if (req.nextUrl.pathname == '/') {
    return exampleMiddleware(req);
  }

  console.log('default middleware');
  return NextResponse.next();
};

export const config = {
  matcher: ['/'],
};
