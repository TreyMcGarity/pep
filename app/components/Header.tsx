import Image from 'next/image';
import logo from '../artifacts/logo.png';

export default function Header() {
  return (
    <header className="w-full surface sticky top-0 z-40 animate-fade-up">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <Image src={logo} alt="logo" width={80} height={80} />
          <div>
            <div className="text-base font-semibold">Trey McGarity</div>
            <div className="text-xs muted">Software Developer</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            className="button-download inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm"
            download
          >
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
