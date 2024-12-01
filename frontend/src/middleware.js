import { NextResponse } from 'next/server';
import { TOKEN_KEY } from '@/utils/constants';
import * as api from '@/client';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get(TOKEN_KEY);
  if (!token || !token.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  api.OpenAPI.TOKEN = token.value;

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|login|register|forgot-password|reset-password|_next/static|static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
