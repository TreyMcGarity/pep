import { NextRequest } from 'next/server';
import db from '../../../../lib/db';
import { getAuthUser } from '../../../../lib/auth';

// PUT /api/resume/items/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('resume_items').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Item not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date() };
  if (body.title !== undefined) updates.title = body.title;
  if (body.subtitle !== undefined) updates.subtitle = body.subtitle;
  if (body.description !== undefined) updates.description = body.description;
  if (body.location !== undefined) updates.location = body.location;
  if (body.startDate !== undefined) updates.start_date = body.startDate;
  if (body.endDate !== undefined) updates.end_date = body.endDate;
  if (body.isCurrent !== undefined) updates.is_current = body.isCurrent;
  if (body.sortOrder !== undefined) updates.sort_order = body.sortOrder;

  const [updated] = await db('resume_items').where({ id: Number(id) }).update(updates).returning('*');
  return Response.json({ item: formatItem(updated) });
}

// DELETE /api/resume/items/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('resume_items').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Item not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  await db('resume_items').where({ id: Number(id) }).delete();
  return Response.json({ message: 'Item deleted' });
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
