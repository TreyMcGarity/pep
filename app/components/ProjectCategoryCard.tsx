export default function ProjectCard({
  title,
  year,
  description,
  accent,
  stack,
  metrics,
  repoUrl,
  secondaryRepoUrl,
  liveUrl,
}: {
  title: string;
  year?: string | number;
  description?: string;
  accent?: string;
  stack?: string[];
  metrics?: string;
  repoUrl?: string;
  secondaryRepoUrl?: string;
  liveUrl?: string;
}) {
  return (
    <article className="group rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-[--accent]/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[--accent]">{accent}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-[--text-muted]">{year}</span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[--text-muted]">{description}</p>

      {metrics ? (
        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-[--text-primary]">
          {metrics}
        </div>
      ) : null}

      {stack && stack.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-[--text-muted]">
              {item}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noreferrer" className="font-semibold text-[--accent] transition hover:text-white">
            Open live app
          </a>
        ) : null}
        {repoUrl ? (
          <a href={repoUrl} target="_blank" rel="noreferrer" className="font-semibold text-[--accent] transition hover:text-white">
            Open frontend repo
          </a>
        ) : null}
        {secondaryRepoUrl ? (
          <>
            <span className="text-[--text-muted]">•</span>
            <a href={secondaryRepoUrl} target="_blank" rel="noreferrer" className="text-[--text-muted] transition hover:text-white">
              Open backend repo
            </a>
          </>
        ) : null}
      </div>
    </article>
  );
}
