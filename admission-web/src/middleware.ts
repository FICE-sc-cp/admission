import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import instance from './lib/api/instance';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next();
  }
  const sessionToken = request.cookies.get('session');

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/auth/sign-up', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const { data: user } = await instance.get('/auth/me', {
        withCredentials: true,
        headers: {
          Cookie: `session=${sessionToken.value}`,
        },
      });

      if (user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
