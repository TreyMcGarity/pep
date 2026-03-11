/**
 * JWT auth helpers. Tokens are stored in httpOnly cookies (7-day expiry).
 * Uses `jose` so this can also run in the Edge runtime (middleware).
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-change-in-production'
);

export const COOKIE_NAME = 'pep_token';
export const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export interface TokenPayload {
  userId: number;
  email: string;
}

/** Sign a JWT with the user's id and email. */
export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

/** Verify and decode a JWT. Returns null if invalid / expired. */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/** Read the current user from the request cookie (server components / route handlers). */
export async function getAuthUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/** Build the Set-Cookie header value for the auth token. */
export function buildCookieHeader(token: string): string {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${TOKEN_MAX_AGE}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
}

/** Build a cookie header that clears the auth token. */
export function clearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}
