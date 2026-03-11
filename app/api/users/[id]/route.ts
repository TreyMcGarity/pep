import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

// GET /api/users/:id — public profile
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await db('users').where({ id: Number(id), is_active: true }).first();
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  // Return only public fields
  return Response.json({
    user: {
      id: user.id,
      displayName: user.display_name,
      title: user.title,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      linkedinUrl: user.linkedin_url,
      githubUrl: user.github_url,
      websiteUrl: user.website_url,
      email: user.email, // shown in contact section
    },
  });
}

// PUT /api/users/:id — update profile (own profile only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  if (auth.userId !== Number(id)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();

    const updates: Record<string, unknown> = {
      updated_at: new Date(),
    };

    // Allowed updatable fields
    if (body.firstName !== undefined) updates.first_name = body.firstName;
    if (body.lastName !== undefined) updates.last_name = body.lastName;
    if (body.displayName !== undefined) updates.display_name = body.displayName;
    if (body.title !== undefined) updates.title = body.title;
    if (body.bio !== undefined) updates.bio = body.bio;
    if (body.avatarUrl !== undefined) updates.avatar_url = body.avatarUrl;
    if (body.linkedinUrl !== undefined) updates.linkedin_url = body.linkedinUrl;
    if (body.githubUrl !== undefined) updates.github_url = body.githubUrl;
    if (body.websiteUrl !== undefined) updates.website_url = body.websiteUrl;
    if (body.theme !== undefined && ['dark', 'light'].includes(body.theme)) {
      updates.theme = body.theme;
    }

    // Password change requires current password verification
    if (body.newPassword) {
      if (!body.currentPassword) {
        return Response.json({ error: 'Current password is required' }, { status: 400 });
      }
      if (body.newPassword.length < 8) {
        return Response.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
      }
      const user = await db('users').where({ id: Number(id) }).first();
      const match = await bcrypt.compare(body.currentPassword, user.password_hash);
      if (!match) return Response.json({ error: 'Current password is incorrect' }, { status: 400 });
      updates.password_hash = await bcrypt.hash(body.newPassword, 12);
    }

    const [updated] = await db('users')
      .where({ id: Number(id) })
      .update(updates)
      .returning([
        'id', 'email', 'first_name', 'last_name', 'display_name',
        'title', 'bio', 'avatar_url', 'linkedin_url', 'github_url',
        'website_url', 'theme', 'created_at', 'updated_at',
      ]);

    return Response.json({
      user: {
        id: updated.id,
        email: updated.email,
        firstName: updated.first_name,
        lastName: updated.last_name,
        displayName: updated.display_name,
        title: updated.title,
        bio: updated.bio,
        avatarUrl: updated.avatar_url,
        linkedinUrl: updated.linkedin_url,
        githubUrl: updated.github_url,
        websiteUrl: updated.website_url,
        theme: updated.theme,
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
      },
    });
  } catch (err) {
    console.error('update user error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
