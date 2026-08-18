export default function ResumeSection() {
  return (
    <section id="resume" className="scroll-mt-24">
      <div className="rounded-[28px] border border-white/10 bg-[#162230] p-8 shadow-xl shadow-black/20 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[--accent]">Resume snapshot</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">A practical mix of product, systems, and teamwork</h2>
          </div>
          <a href="#contact" className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]">
            Let&apos;s connect
          </a>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-[#192534] p-6">
            <p className="text-sm leading-7 text-[--text-muted]">
              I’m a security-minded software developer with experience building secure, role-based applications in regulated environments. My background blends full-stack development, ServiceNow platform work, SQL/data operations, and IT support, with a strong focus on reliable systems, clear access controls, and practical problem solving. In my current role, I work with the Service Operations Workspace, ITSM application configuration, and a custom Marketing CSM application to support enterprise workflows and operational efficiency.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#192534] p-6">
            <ul className="space-y-3 text-sm leading-7 text-[--text-muted]">
              <li>• Active Secret clearance, CompTIA Security+, and ServiceNow CSA/CAD credentials</li>
              <li>• Experience with ServiceNow applications including Service Operations Workspace, ITSM configuration, and custom Marketing CSM development</li>
              <li>• Comfortable translating compliance, operations, and user needs into dependable software solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
