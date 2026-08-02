'use client';

import { useState } from 'react';
import Image from 'next/image';
import logo from '../artifacts/logo.png';
import ResumePreviewModal from './ResumePreviewModal';

export default function Header() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[--bg]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <Image src={logo} alt="logo" width={52} height={52} className="h-13 w-13" />
            <div className="min-w-0">
              <div className="text-base font-semibold text-white">Trey McGarity</div>
              <div className="truncate text-xs text-[--text-muted]">Software Developer</div>
            </div>
          </a>

          <div className="hidden items-center gap-2 sm:gap-3 md:flex">
            <a
              href="https://github.com/TreyMcGarity"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-2 text-sm font-medium text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]"
            >
              LinkedIn
            </a>
            <button
              onClick={handleOpenResume}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]"
            >
              View resume
            </button>
          </div>

          <div className="relative md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-lg border border-white/15 p-2 text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-white/10 bg-[#0D1721] p-2 opacity-100 shadow-2xl shadow-black/30">
                <a
                  href="https://github.com/TreyMcGarity"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-[--text-primary] transition hover:bg-white/8 hover:text-[--accent]"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-1 block rounded-xl px-3 py-2 text-sm font-medium text-[--text-primary] transition hover:bg-white/8 hover:text-[--accent]"
                >
                  LinkedIn
                </a>
                <button
                  type="button"
                  onClick={handleOpenResume}
                  className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-[--text-primary] transition hover:bg-white/8 hover:text-[--accent]"
                >
                  View Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ResumePreviewModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
