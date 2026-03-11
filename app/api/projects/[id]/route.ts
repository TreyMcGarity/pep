import { NextRequest } from 'next/server';
import db from '../../../lib/db';
import { getAuthUser } from '../../../lib/auth';

// GET /api/projects/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await db('project')
    .select('project.*', 'category.name as category_name', 'category.color as category_color')
    .leftJoin('category', 'project.category_id', 'category.id')
    .where('project.id', Number(id))
    .first();

  if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });
  return Response.json({ project: formatProject(project) });
}

// PUT /api/projects/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('project').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Project not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  const updates: Record<string, unknown> = { updated_at: new Date() };
  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.categoryId !== undefined) updates.category_id = body.categoryId;
  if (body.year !== undefined) updates.year = body.year;
  if (body.url !== undefined) updates.url = body.url;
  if (body.sourceUrl !== undefined) updates.source_url = body.sourceUrl;
  if (body.imageUrl !== undefined) updates.image_url = body.imageUrl;
  if (body.techStack !== undefined) updates.tech_stack = JSON.stringify(body.techStack);
  if (body.sortOrder !== undefined) updates.sort_order = body.sortOrder;
  if (body.isFeatured !== undefined) updates.is_featured = body.isFeatured;
  if (body.isActive !== undefined) updates.is_active = body.isActive;

  const [updated] = await db('project').where({ id: Number(id) }).update(updates).returning('*');
  return Response.json({ project: formatProject(updated) });
}

// DELETE /api/projects/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const { id } = await params;
  const existing = await db('project').where({ id: Number(id) }).first();
  if (!existing) return Response.json({ error: 'Project not found' }, { status: 404 });
  if (existing.user_id !== auth.userId) return Response.json({ error: 'Forbidden' }, { status: 403 });

  await db('project').where({ id: Number(id) }).delete();
  return Response.json({ message: 'Project deleted' });
}

function formatProject(p: Record<string, unknown>) {
  return {
    id: p.id,
    userId: p.user_id,
    categoryId: p.category_id,
    categoryName: p.category_name,
    categoryColor: p.category_color,
    name: p.name,
    description: p.description,
    year: p.year,
    url: p.url,
    sourceUrl: p.source_url,
    imageUrl: p.image_url,
    techStack: p.tech_stack ? JSON.parse(p.tech_stack as string) : [],
    sortOrder: p.sort_order,
    isFeatured: p.is_featured,
    isActive: p.is_active,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}
