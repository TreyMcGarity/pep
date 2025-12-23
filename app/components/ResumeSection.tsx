export default function ResumeSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Resume</h2>
      <div className="surface rounded-lg p-6 animate-fade-up">
        <p className="muted">Summary and highlights. Download the full resume above.</p>
        <ul className="mt-4 space-y-2 text-sm muted">
          <li>• Experience: Example company — Senior Engineer</li>
          <li>• Skills: JavaScript, TypeScript, Node.js, Postgres</li>
          <li>• Education: BS Computer Science</li>
        </ul>
      </div>
    </section>
  );
}
