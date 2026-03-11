import { NextRequest } from 'next/server';
import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

// GET /api/categories/:id — includes projects
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const category = await db('category').where({ id: Number(id) }).first();
  if (!category) return Response.json({ error: 'Category not found' }, { status: 404 });

  const projects = await db('project')
    .where({ category_id: Number(id), is_active: true })
    .orderBy('sort_order', 'asc');

  return Response.json({
    category: { ...formatCategory(category), projects },
  });
}

// PUT /api/categories/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('category').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Category not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date() };
  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.color !== undefined) updates.color = body.color;
  if (body.sortOrder !== undefined) updates.sort_order = body.sortOrder;

  const [updated] = await db('category').where({ id: Number(id) }).update(updates).returning('*');
  return Response.json({ category: formatCategory(updated) });
}

// DELETE /api/categories/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('category').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Category not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  await db('category').where({ id: Number(id) }).delete();
  return Response.json({ message: 'Category deleted' });
}

function formatCategory(c: Record<string, unknown>) {
  return {
    id: c.id,
    userId: c.user_id,
    name: c.name,
    description: c.description,
    color: c.color,
    sortOrder: c.sort_order,
    createdAt: c.created_at,
    updatedAt: c.updated_at,
  };
}
