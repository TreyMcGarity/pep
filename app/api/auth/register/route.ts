import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../lib/db';
import { signToken, buildCookieHeader } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Basic validation
    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check for existing account
    const existing = await db('users').where({ email: email.toLowerCase() }).first();
    if (existing) {
      return Response.json({ error: 'An account with that email already exists' }, { status: 409 });
    }

    // Hash password with bcrypt (cost factor 12 — good balance of security and speed)
    const passwordHash = await bcrypt.hash(password, 12);

    const displayName =
      firstName && lastName ? `${firstName} ${lastName}`.trim() : email.split('@')[0];

    const [user] = await db('users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        first_name: firstName || null,
        last_name: lastName || null,
        display_name: displayName,
        theme: 'dark',
      })
      .returning([
        'id', 'email', 'first_name', 'last_name', 'display_name',
        'title', 'bio', 'avatar_url', 'linkedin_url', 'github_url',
        'website_url', 'theme', 'created_at', 'updated_at',
      ]);

    const token = await signToken({ userId: user.id, email: user.email });

    return Response.json(
      { user: formatUser(user) },
      { status: 201, headers: { 'Set-Cookie': buildCookieHeader(token) } }
    );
  } catch (err) {
    console.error('register error', err);
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
