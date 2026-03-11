import { NextRequest } from 'next/server';
import db from '../../lib/db';
import { getAuthUser } from '../../lib/auth';

// GET /api/categories?userId=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  let query = db('category').orderBy('sort_order', 'asc').orderBy('name', 'asc');
  if (userId) query = query.where({ user_id: Number(userId) });

  const rows = await query;
  return Response.json({ categories: rows.map(formatCategory) });
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  if (!body.name?.trim()) {
    return Response.json({ error: 'Category name is required' }, { status: 400 });
  }

  const [category] = await db('category')
    .insert({
      user_id: auth.userId,
      name: body.name.trim(),
      description: body.description || null,
      color: body.color || '#8FB3C6',
      sort_order: body.sortOrder ?? 0,
    })
    .returning('*');

  return Response.json({ category: formatCategory(category) }, { status: 201 });
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
