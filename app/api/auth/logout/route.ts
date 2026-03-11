import { clearCookieHeader } from '../../../lib/auth';

export async function POST() {
  return Response.json(
    { message: 'Logged out' },
    { headers: { 'Set-Cookie': clearCookieHeader() } }
  );
}
