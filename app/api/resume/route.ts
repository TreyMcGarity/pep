import { NextRequest } from 'next/server';
import db from '../../lib/db';

// GET /api/resume?userId= — returns all sections with their items
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return Response.json({ error: 'userId is required' }, { status: 400 });

  const sections = await db('resume_sections')
    .where({ user_id: Number(userId) })
    .orderBy('sort_order', 'asc');

  const items = await db('resume_items')
    .where({ user_id: Number(userId) })
    .orderBy('sort_order', 'asc');

  // Nest items under their parent section
  const result = sections.map((section) => ({
    id: section.id,
    userId: section.user_id,
    type: section.type,
    title: section.title,
    sortOrder: section.sort_order,
    createdAt: section.created_at,
    updatedAt: section.updated_at,
    items: items
      .filter((item) => item.section_id === section.id)
      .map(formatItem),
  }));

  return Response.json({ sections: result });
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
