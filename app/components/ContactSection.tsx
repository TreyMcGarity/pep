export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-xl shadow-black/20 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[--accent]">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Let&apos;s build something useful together</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[--text-muted]">
            If you have a product idea, a team need, or a role that fits this kind of work, I’d love to hear about it.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:hello@yourdomain.com" className="rounded-full bg-[--accent] px-5 py-3 text-sm font-semibold text-[--bg-alt] transition hover:translate-y-[-1px]">
            Email me
          </a>
          <a href="https://github.com/TreyMcGarity" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]">
            GitHub
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
