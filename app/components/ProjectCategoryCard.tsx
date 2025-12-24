export default function ProjectCard({ title, year, description }: { title: string; year?: string | number; description?: string }) {
  return (
    <article className="surface rounded-lg p-4 animate-scale-in">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="muted text-sm">{year}</span>
      </div>
      <p className="muted text-sm">{description}</p>
      <div className="mt-4 flex items-center gap-2">
        <button className="text-sm accent">View</button>
        <button className="text-sm muted">Source</button>
      </div>
    </article>
  );
}
