import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await db('users').where({ id: auth.userId }).first();
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      displayName: user.display_name,
      title: user.title,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      linkedinUrl: user.linkedin_url,
      githubUrl: user.github_url,
      websiteUrl: user.website_url,
      theme: user.theme,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    },
  });
}
