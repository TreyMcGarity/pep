export default function ContactSection() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
      <div className="surface rounded-lg p-6 animate-fade-up">
        <p className="muted">Reach out via email or follow on social media.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="mailto:you@example.com" className="rounded-md border px-3 py-2 text-sm muted">Email</a>
          <a href="#" className="rounded-md border px-3 py-2 text-sm muted">LinkedIn</a>
          <a href="#" className="rounded-md border px-3 py-2 text-sm muted">GitHub</a>
        </div>
      </div>
    </section>
  );
}
