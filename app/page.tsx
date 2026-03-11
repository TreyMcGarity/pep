/**
 * Public portfolio page — server component.
 * Fetches the first active user's data directly from the database.
 * Renders the full portfolio: header, projects, resume, contact, footer.
 */
import db from './lib/db';
import Header from './components/Header';
import ProjectsSection from './components/ProjectsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import type { Project, ResumeSection as ResumeSectionType } from './lib/api';

async function getPortfolioData() {
  try {
    // Get the first active user (the portfolio owner)
    const user = await db('users').where({ is_active: true }).orderBy('id', 'asc').first();
    if (!user) return { user: null, projects: [], resumeSections: [] };

    // Fetch projects with category info
    const projectRows = await db('project')
      .select('project.*', 'category.name as category_name', 'category.color as category_color')
      .leftJoin('category', 'project.category_id', 'category.id')
      .where({ 'project.user_id': user.id, 'project.is_active': true })
      .orderBy('project.sort_order', 'asc')
      .orderBy('project.created_at', 'desc');

    const projects: Project[] = projectRows.map((p) => ({
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
      techStack: p.tech_stack ? JSON.parse(p.tech_stack) : [],
      sortOrder: p.sort_order,
      isFeatured: p.is_featured,
      isActive: p.is_active,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));

    // Fetch resume sections and items
    const sectionRows = await db('resume_sections')
      .where({ user_id: user.id })
      .orderBy('sort_order', 'asc');

    const itemRows = await db('resume_items')
      .where({ user_id: user.id })
      .orderBy('sort_order', 'asc');

    const resumeSections: ResumeSectionType[] = sectionRows.map((s) => ({
      id: s.id,
      userId: s.user_id,
      type: s.type,
      title: s.title,
      sortOrder: s.sort_order,
      createdAt: s.created_at,
      updatedAt: s.updated_at,
      items: itemRows
        .filter((i) => i.section_id === s.id)
        .map((i) => ({
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
        })),
    }));

    return { user, projects, resumeSections };
  } catch (err) {
    // If the database isn't set up yet, return empty state gracefully
    console.error('Portfolio data fetch error:', err);
    return { user: null, projects: [], resumeSections: [] };
  }
}

export default async function Home() {
  const { user, projects, resumeSections } = await getPortfolioData();

  const publicUser = user
    ? {
        displayName: user.display_name,
        title: user.title,
        email: user.email,
        linkedinUrl: user.linkedin_url,
        githubUrl: user.github_url,
        websiteUrl: user.website_url,
      }
    : null;

  return (
    <div className="min-h-screen font-sans text-[--text-primary] bg-[--bg]">
      <Header user={publicUser} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <ProjectsSection projects={projects} />
        <ResumeSection sections={resumeSections} />
        <ContactSection
          email={publicUser?.email}
          linkedinUrl={publicUser?.linkedinUrl}
          githubUrl={publicUser?.githubUrl}
          websiteUrl={publicUser?.websiteUrl}
        />
      </main>

      <Footer name={publicUser?.displayName} />
    </div>
  );
}
