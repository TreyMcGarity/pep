export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-[--bg]/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-[--text-muted] sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} Trey McGarity</span>
        <span>Built with Next.js and designed for clarity.</span>
      </div>
    </footer>
  );
}
