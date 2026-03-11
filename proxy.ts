/**
 * Next.js 16 Proxy (formerly middleware) — protects /dashboard and /settings.
 * Redirects unauthenticated requests to /login.
 * Uses jose (Edge-compatible) to verify the JWT cookie.
 */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-change-in-production'
);

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('pep_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired — clear cookie and redirect
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.delete('pep_token');
    return res;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
