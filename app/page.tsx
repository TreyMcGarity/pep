import Header from './components/Header';
import ProjectsSection from './components/ProjectsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg] font-sans text-[--text-primary]">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="surface animate-fade-up rounded-[28px] border border-white/10 p-8 shadow-2xl shadow-black/20 sm:p-10">
            <div className="inline-flex items-center rounded-full border border-[--accent]/30 bg-[--accent]/10 px-3 py-1 text-sm font-medium text-[--accent]">
              Building secure, reliable software with a product mindset
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              I build software that feels thoughtful, dependable, and ready for real users.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[--text-muted]">
              From modern web experiences to service-driven platforms, I focus on creating work that is practical, secure, and enjoyable to use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-[--accent] px-5 py-3 text-sm font-semibold text-[--bg-alt] transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[--accent]/20">
                Explore projects
              </a>
              <a href="#contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-[--text-primary] transition duration-200 hover:-translate-y-1 hover:border-[--accent]/40 hover:text-[--accent]">
                Let&apos;s connect
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <div className="text-2xl font-semibold text-white">5+</div>
                <div className="mt-1 text-sm text-[--text-muted]">years building</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <div className="text-2xl font-semibold text-white">ServiceNow</div>
                <div className="mt-1 text-sm text-[--text-muted]">secure platforms</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <div className="text-2xl font-semibold text-white">Full-stack</div>
                <div className="mt-1 text-sm text-[--text-muted]">web + systems</div>
              </div>
            </div>
          </div>

          <div className="surface animate-scale-in rounded-[28px] border border-white/10 p-6 shadow-xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[--accent]">Current focus</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[--text-muted]">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <span className="font-semibold text-white">Secure applications</span> with strong access patterns, clean architecture, and reliable workflows.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <span className="font-semibold text-white">Modern frontends</span> built with React, Next.js, and polished UI systems.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-[--accent]/30 hover:bg-white/10">
                <span className="font-semibold text-white">Practical delivery</span> from product thinking to implementation and iteration.
              </li>
            </ul>
          </div>
        </section>

        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
