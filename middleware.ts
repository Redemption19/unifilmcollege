import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Skip auth check for login and signup pages
  if (
    request.nextUrl.pathname === '/admin/login' ||
    request.nextUrl.pathname === '/admin/signup'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET || 'fallback_secret');
    return NextResponse.next();
  } catch (error) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};