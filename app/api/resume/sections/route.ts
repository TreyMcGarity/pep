import { NextRequest } from 'next/server';
import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

const VALID_TYPES = ['experience', 'education', 'skills', 'summary', 'certifications'];

// POST /api/resume/sections
export async function POST(req: NextRequest) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();

  if (!body.title?.trim()) return Response.json({ error: 'Title is required' }, { status: 400 });
  if (!body.type || !VALID_TYPES.includes(body.type)) {
    return Response.json({ error: `Type must be one of: ${VALID_TYPES.join(', ')}` }, { status: 400 });
  }

  const [section] = await db('resume_sections')
    .insert({
      user_id: auth.userId,
      type: body.type,
      title: body.title.trim(),
      sort_order: body.sortOrder ?? 0,
    })
    .returning('*');

  return Response.json(
    {
      section: {
        id: section.id,
        userId: section.user_id,
        type: section.type,
        title: section.title,
        sortOrder: section.sort_order,
        items: [],
        createdAt: section.created_at,
        updatedAt: section.updated_at,
      },
    },
    { status: 201 }
  );
}
