export default function Footer({ name }: { name?: string }) {
  return (
    <footer className="surface mt-12">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm muted">
        © {new Date().getFullYear()} {name || 'PEP'} — Built with Next.js
      </div>
    </footer>
  );
}
