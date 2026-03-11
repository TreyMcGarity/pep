import { NextRequest } from 'next/server';
import db from '../../lib/db';
import { getAuthUser } from '../../lib/auth';

// GET /api/projects?userId=&categoryId=&featured=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const categoryId = searchParams.get('categoryId');
  const featured = searchParams.get('featured');

  let query = db('project')
    .select(
      'project.*',
      'category.name as category_name',
      'category.color as category_color'
    )
    .leftJoin('category', 'project.category_id', 'category.id')
    .where('project.is_active', true)
    .orderBy('project.sort_order', 'asc')
    .orderBy('project.created_at', 'desc');

  if (userId) query = query.where('project.user_id', Number(userId));
  if (categoryId) query = query.where('project.category_id', Number(categoryId));
  if (featured === 'true') query = query.where('project.is_featured', true);

  const rows = await query;

  return Response.json({ projects: rows.map(formatProject) });
}

// POST /api/projects — create a project (auth required)
export async function POST(req: NextRequest) {
  const auth = await getAuthUser();
  if (!auth) return Response.json({ error: 'Not authenticated' }, { status: 401 });

  try {
    const body = await req.json();

    if (!body.name?.trim()) {
      return Response.json({ error: 'Project name is required' }, { status: 400 });
    }

    const [project] = await db('project')
      .insert({
        user_id: auth.userId,
        category_id: body.categoryId || null,
        name: body.name.trim(),
        description: body.description || null,
        year: body.year || null,
        url: body.url || null,
        source_url: body.sourceUrl || null,
        image_url: body.imageUrl || null,
        tech_stack: body.techStack ? JSON.stringify(body.techStack) : null,
        sort_order: body.sortOrder ?? 0,
        is_featured: body.isFeatured ?? false,
        is_active: true,
      })
      .returning('*');

    return Response.json({ project: formatProject(project) }, { status: 201 });
  } catch (err) {
    console.error('create project error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
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
