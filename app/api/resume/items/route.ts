import { NextRequest } from 'next/server';
import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

// POST /api/resume/items
export async function POST(req: NextRequest) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  if (!body.sectionId) return Response.json({ error: 'sectionId is required' }, { status: 400 });

  // Verify section belongs to this user
  const section = await db('resume_sections').where({ id: body.sectionId }).first();
  if (!section) return Response.json({ error: 'Section not found' }, { status: 404 });
  if (section.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const [item] = await db('resume_items')
    .insert({
      section_id: body.sectionId,
      user_id: auth.userId,
      title: body.title || null,
      subtitle: body.subtitle || null,
      description: body.description || null,
      location: body.location || null,
      start_date: body.startDate || null,
      end_date: body.endDate || null,
      is_current: body.isCurrent ?? false,
      sort_order: body.sortOrder ?? 0,
    })
    .returning('*');

  return Response.json({ item: formatItem(item) }, { status: 201 });
}

function formatItem(i: Record<string, unknown>) {
  return {
    id: i.id,
    sectionId: i.section_id,
    userId: i.user_id,
    title: i.title,
    subtitle: i.subtitle,
    description: i.description,
    location: i.location,
    startDate: i.start_date,
    endDate: i.end_date,
    isCurrent: i.is_current,
    sortOrder: i.sort_order,
    createdAt: i.created_at,
    updatedAt: i.updated_at,
  };
}
