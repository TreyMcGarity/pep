import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../lib/db';
import { signToken, buildCookieHeader } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await db('users').where({ email: email.toLowerCase() }).first();

    // Use a constant-time comparison to prevent timing attacks
    // Always call bcrypt.compare even if user not found
    const dummyHash = '$2a$12$invalidhashfortimingreasonsonlyx';
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password_hash)
      : await bcrypt.compare(password, dummyHash).then(() => false);

    if (!user || !passwordMatch) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.is_active) {
      return Response.json({ error: 'Account is disabled' }, { status: 403 });
    }

    const token = await signToken({ userId: user.id, email: user.email });

    return Response.json(
      { user: formatUser(user) },
      { headers: { 'Set-Cookie': buildCookieHeader(token) } }
    );
  } catch (err) {
    console.error('login error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function formatUser(u: Record<string, unknown>) {
  return {
    id: u.id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    displayName: u.display_name,
    title: u.title,
    bio: u.bio,
    avatarUrl: u.avatar_url,
    linkedinUrl: u.linkedin_url,
    githubUrl: u.github_url,
    websiteUrl: u.website_url,
    theme: u.theme,
    createdAt: u.created_at,
    updatedAt: u.updated_at,
  };
}
