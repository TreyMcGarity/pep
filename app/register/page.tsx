'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      await refreshUser();
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="surface rounded-xl w-full max-w-sm p-8 animate-scale-in">
        <h1 className="text-2xl font-semibold mb-1">Create account</h1>
        <p className="muted text-sm mb-6">Set up your personal engineering platform</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1 muted">First name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={set('firstName')}
                className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
                placeholder="Trey"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 muted">Last name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={set('lastName')}
                className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
                placeholder="McGarity"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 muted">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 muted">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={set('password')}
              className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 muted">Confirm password</label>
            <input
              type="password"
              required
              value={form.confirm}
              onChange={set('confirm')}
              className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[--accent] text-[--bg-alt] py-2 text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm muted">
          Already have an account?{' '}
          <Link href="/login" className="accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
