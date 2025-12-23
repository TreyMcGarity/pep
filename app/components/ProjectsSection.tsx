import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const projects = [
    { title: 'Website Redesign', year: 2025, description: 'Public site redesign and performance improvements.' },
    { title: 'API Development', year: 2024, description: 'Built robust REST + GraphQL APIs.' },
    { title: 'Mobile App', year: 2023, description: 'Cross-platform mobile app.' },
    { title: 'Internal Tooling', year: 2025, description: 'Automation and monitoring tooling.' },
  ];

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} title={p.title} year={p.year} description={p.description} />
        ))}
      </div>
    </section>
  );
}
