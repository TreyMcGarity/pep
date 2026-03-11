'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  if (!user) return null;

  const cards = [
    {
      href: '/dashboard/projects',
      icon: '🗂',
      title: 'Projects',
      description: 'Add, edit, and organize your projects by category.',
    },
    {
      href: '/dashboard/resume',
      icon: '📄',
      title: 'Resume',
      description: 'Build your resume with experience, education, and skills.',
    },
    {
      href: '/settings',
      icon: '⚙️',
      title: 'Settings',
      description: 'Update your profile, social links, and theme.',
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="surface sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <span className="font-semibold">Dashboard</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="muted text-sm hover:text-[--text-primary]">
              View portfolio
            </Link>
            <button onClick={handleLogout} className="muted text-sm hover:text-[--text-primary]">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-semibold">
            Welcome back, {user.displayName || user.firstName || 'there'}
          </h1>
          <p className="muted mt-1">Manage your personal engineering platform</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 animate-scale-in">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="surface rounded-xl p-6 hover:border hover:border-[--accent]/40 transition-all group block"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h2 className="text-lg font-semibold mb-1 group-hover:accent transition-colors">
                {card.title}
              </h2>
              <p className="muted text-sm">{card.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
