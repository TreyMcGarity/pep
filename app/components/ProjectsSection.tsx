import ProjectCategoryCard from './ProjectCategoryCard';
import type { Project } from '../lib/api';

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
        <div className="surface rounded-xl p-8 text-center muted">
          <p>No projects yet. Sign in to add your first project.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Projects</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCategoryCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
