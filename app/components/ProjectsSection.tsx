import ProjectCategoryCard from './ProjectCategoryCard';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Game of Life',
      year: '2026',
      accent: 'Interactive logic',
      description: 'A classic cellular automaton build that highlights algorithmic thinking and interactive UI implementation.',
      stack: ['JavaScript', 'Algorithms', 'UI'],
      metrics: 'Live app + GitHub repo',
      repoUrl: 'https://github.com/TreyMcGarity/Game_Of_Life',
      liveUrl: 'https://treymcgarity.github.io/Game_Of_Life/',
      theme: 'javascript',
    },
    {
      title: 'Airline Reservation System',
      year: '2025',
      accent: 'Full-stack project',
      description: 'A connected reservation experience split across frontend and backend work, reflecting a full-stack approach to building an app end to end.',
      stack: ['React', 'JavaScript', 'Node.js', 'API'],
      metrics: 'Frontend + backend repos',
      repoUrl: 'https://github.com/TreyMcGarity/airline-reservation-frontend',
      secondaryRepoUrl: 'https://github.com/TreyMcGarity/airline-reservation-backend',
      theme: 'fullstack',
    },
    {
      title: 'Coach Me',
      year: '2024',
      accent: 'Full-stack project',
      description: 'A coaching-focused app experience that spans a polished interface and supporting backend services.',
      stack: ['React', 'Frontend', 'Backend', 'Services'],
      metrics: 'Frontend + backend repos',
      repoUrl: 'https://github.com/TreyMcGarity/coach-me-fe',
      secondaryRepoUrl: 'https://github.com/TreyMcGarity/coach-me-be',
      theme: 'fullstack',
    },
    {
      title: 'VillageGuard',
      year: '2025',
      accent: 'Java project',
      description: 'A Java-based project that reflects a broader software engineering focus and structured implementation work.',
      stack: ['Java', 'OOP', 'Engineering'],
      metrics: 'GitHub repo',
      repoUrl: 'https://github.com/TreyMcGarity/VillageGuard',
      theme: 'java',
    },
    {
      title: 'Runner',
      year: '2024',
      accent: 'C++ terminal game',
      description: 'A terminal-based game project that demonstrates systems thinking, game logic, and C++ implementation skills.',
      stack: ['C++', 'Terminal Game', 'Systems'],
      metrics: 'GitHub repo',
      repoUrl: 'https://github.com/TreyMcGarity/Runner',
      theme: 'cpp',
    },
    {
      title: 'CS379_ML',
      year: '2024',
      accent: 'LLM and training with Python',
      description: 'A machine learning project focused on LLM-related experimentation and Python-based training workflows.',
      stack: ['Python', 'LLM', 'Machine Learning'],
      metrics: 'GitHub repo',
      repoUrl: 'https://github.com/TreyMcGarity/CS379_ML',
      theme: 'python',
    },
  ];

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[--accent]">Featured from GitHub</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Projects that reflect my engineering profile</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[--text-muted]">
          These repositories highlight frontend work, service-layer projects, and a range of web development experiments tied to my GitHub account.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCategoryCard
            key={project.title}
            title={project.title}
            year={project.year}
            accent={project.accent}
            description={project.description}
            stack={project.stack}
            metrics={project.metrics}
            repoUrl={project.repoUrl}
            secondaryRepoUrl={project.secondaryRepoUrl}
            liveUrl={project.liveUrl}
            theme={project.theme}
          />
        ))}
      </div>
    </section>
  );
}
