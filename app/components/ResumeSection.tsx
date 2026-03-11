import type { ResumeSection as ResumeSectionType } from '../lib/api';

interface Props {
  sections: ResumeSectionType[];
}

const TYPE_ICONS: Record<string, string> = {
  experience: '💼',
  education: '🎓',
  skills: '⚡',
  summary: '📝',
  certifications: '🏆',
};

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function ResumeSection({ sections }: Props) {
  if (sections.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Resume</h2>
        <div className="surface rounded-xl p-8 text-center muted">
          <p>No resume content yet. Sign in to build your resume.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Resume</h2>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="surface rounded-xl p-6 animate-fade-up">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <span>{TYPE_ICONS[section.type] || '📋'}</span>
              {section.title}
            </h3>

            {section.items && section.items.length > 0 ? (
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="pl-4 border-l-2 border-[--surface]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      {item.title && <span className="font-medium text-sm">{item.title}</span>}
                      {(item.startDate || item.endDate || item.isCurrent) && (
                        <span className="muted text-xs">
                          {formatDate(item.startDate)}
                          {(item.endDate || item.isCurrent) && ` – `}
                          {item.isCurrent ? 'Present' : formatDate(item.endDate)}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div className="muted text-sm">
                        {item.subtitle}
                        {item.location && <span> · {item.location}</span>}
                      </div>
                    )}
                    {item.description && (
                      <p className="muted text-sm mt-1 leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted text-sm">No items in this section yet.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
