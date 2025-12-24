import ProjectCategoryCard from './ProjectCategoryCard';

export default function ProjectsSection() {
  const projects = [
    { title: 'ServiceNow', year: 2025, description: 'Public site redesign and performance improvements.' },
    { title: 'Full-Stack Dev', year: 2024, description: 'Built robust REST + GraphQL APIs.' },
    { title: 'Data Science', year: 2023, description: 'Cross-platform mobile app.' },
    { title: 'Game Dev', year: 2025, description: 'Automation and monitoring tooling.' },
  ];

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCategoryCard key={p.title} title={p.title} year={p.year} description={p.description} />
        ))}
      </div>
    </section>
  );
}
