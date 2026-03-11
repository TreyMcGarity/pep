'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logo from '../artifacts/logo.png';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ user }: { user?: { displayName?: string; title?: string; email?: string } | null }) {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  // Use the passed user (public portfolio owner) or fall back to defaults
  const displayName = user?.displayName || 'Portfolio';
  const title = user?.title || 'Software Developer';

  return (
    <header className="w-full surface sticky top-0 z-40 animate-fade-up">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={60} height={60} />
          <div>
            <div className="text-base font-semibold">{displayName}</div>
            <div className="text-xs muted">{title}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {authUser ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-md border border-[--surface] px-3 py-1.5 text-sm muted hover:border-[--accent]/50 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md border border-[--surface] px-3 py-1.5 text-sm muted hover:border-[--accent]/50 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="button-download inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
