import type { Project } from '../lib/api';

interface Props {
  project: Project;
}

export default function ProjectCategoryCard({ project }: Props) {
  return (
    <article className="surface rounded-xl p-5 animate-scale-in flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* Image preview */}
      {project.imageUrl && (
        <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-[--bg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-semibold leading-tight">{project.name}</h3>
        {project.year && <span className="muted text-xs shrink-0">{project.year}</span>}
      </div>

      {/* Category badge */}
      {project.categoryName && (
        <span
          className="self-start mb-2 inline-block text-xs rounded-full px-2.5 py-0.5 font-medium"
          style={{
            background: `${project.categoryColor || '#8FB3C6'}20`,
            color: project.categoryColor || '#8FB3C6',
          }}
        >
          {project.categoryName}
        </span>
      )}

      {/* Description */}
      {project.description && (
        <p className="muted text-sm leading-relaxed mb-3 flex-1 line-clamp-3">{project.description}</p>
      )}

      {/* Tech stack */}
      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs muted border border-[--surface] rounded px-1.5 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm accent font-medium hover:underline"
          >
            View ↗
          </a>
        ) : (
          <span className="text-sm muted opacity-40">No demo</span>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm muted hover:accent transition-colors"
          >
            Source ↗
          </a>
        )}
        {project.isFeatured && (
          <span className="ml-auto text-xs accent">★ Featured</span>
        )}
      </div>
    </article>
  );
}
