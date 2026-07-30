'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import ProjectsSection from './components/ProjectsSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const focusItems = [
  {
    title: 'Secure Applications',
    body: 'with strong access patterns, clean architecture, and reliable workflows.',
  },
  {
    title: 'Modern Frontends',
    body: 'built with React, Next.js, and polished UI systems.',
  },
  {
    title: 'Practical Delivery',
    body: 'from product thinking to implementation and iteration.',
  },
  {
    title: 'Thoughtful Engineering',
    body: 'focused on clarity, maintainability, and long-term product value.',
  },
  {
    title: 'Reliable Collaboration',
    body: 'bridging product needs, technical constraints, and user experience.',
  },
  {
    title: 'APIs',
    body: 'designing clean, reliable interfaces that connect systems with intention.',
  },
  {
    title: 'Secure Databases & Data Analytics',
    body: 'building data foundations that are safe, structured, and useful for insight.',
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % focusItems.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[--bg] font-sans text-[--text-primary]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-x-0 top-40 bottom-0 flex items-stretch justify-center gap-[7vw] opacity-30 sm:top-44 lg:top-48">
          <div
            className="mt-[2.5rem] h-[calc(100%-2.5rem)] w-[14vw] min-w-[86px] max-w-[190px] bg-[rgba(143,179,198,0.22)] [clip-path:polygon(0_1%,100%_0,100%_100%,0_100%)] sm:mt-[3rem] sm:h-[calc(100%-3rem)] sm:[clip-path:polygon(0_3%,100%_0,100%_100%,0_100%)]"
          />
          <div
            className="-mt-[2.5rem] h-[calc(100%+2.5rem)] w-[16vw] min-w-[98px] max-w-[220px] bg-[rgba(143,179,198,0.38)] [clip-path:polygon(0_1%,100%_0,100%_100%,0_100%)] sm:-mt-[5rem] sm:h-[calc(100%+5rem)] sm:[clip-path:polygon(0_3%,100%_0,100%_100%,0_100%)]"
          />
          <div
            className="mt-[2.5rem] h-[calc(100%-2.5rem)] w-[14vw] min-w-[86px] max-w-[190px] bg-[rgba(143,179,198,0.22)] [clip-path:polygon(0_0,100%_1%,100%_100%,0_100%)] sm:mt-[3rem] sm:h-[calc(100%-3rem)] sm:[clip-path:polygon(0_0,100%_3%,100%_100%,0_100%)]"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(143,179,198,0.07),transparent_35%),linear-gradient(135deg,rgba(7,16,25,0.2),rgba(13,23,33,0.16))]" />
      <div className="relative z-10">
        <Header />

        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl rounded-[24px] border border-white/10 bg-white/5 p-5 text-center transition duration-700 sm:p-6">
              <div className="text-sm leading-7 text-[--text-muted]">
                <span className="block text-lg font-semibold text-white">{focusItems[activeIndex].title}</span>
                <span className="mt-2 block">{focusItems[activeIndex].body}</span>
              </div>
              <div className="mt-5 flex justify-center gap-2">
                {focusItems.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-8 bg-[--accent]' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section>
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

        </section>

        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
