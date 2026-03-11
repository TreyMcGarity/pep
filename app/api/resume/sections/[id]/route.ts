import { NextRequest } from 'next/server';
import db from '../../../../lib/db';
import { getAuthUser } from '../../../../lib/auth';

// PUT /api/resume/sections/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('resume_sections').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Section not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date() };
  if (body.title !== undefined) updates.title = body.title;
  if (body.type !== undefined) updates.type = body.type;
  if (body.sortOrder !== undefined) updates.sort_order = body.sortOrder;

  const [updated] = await db('resume_sections').where({ id: Number(id) }).update(updates).returning('*');
  return Response.json({
    section: {
      id: updated.id,
      userId: updated.user_id,
      type: updated.type,
      title: updated.title,
      sortOrder: updated.sort_order,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
    },
  });
}

// DELETE /api/resume/sections/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('resume_sections').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Section not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  // Cascade deletes items (handled by DB foreign key)
  await db('resume_sections').where({ id: Number(id) }).delete();
  return Response.json({ message: 'Section deleted' });
}
