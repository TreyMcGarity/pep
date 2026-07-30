'use client';

import { useState } from 'react';
import Image from 'next/image';
import logo from '../artifacts/logo.png';
import ResumePreviewModal from './ResumePreviewModal';

export default function Header() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[--bg]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <Image src={logo} alt="logo" width={52} height={52} className="h-13 w-13" />
            <div>
              <div className="text-base font-semibold text-white">Trey McGarity</div>
              <div className="text-xs text-[--text-muted]">Software Developer</div>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
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
              onClick={() => setIsResumeOpen(true)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-[--text-primary] transition hover:border-[--accent]/40 hover:text-[--accent]"
            >
              View resume
            </button>
          </div>
        </div>
      </header>

      <ResumePreviewModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
