'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="surface rounded-xl w-full max-w-sm p-8 animate-scale-in">
        <h1 className="text-2xl font-semibold mb-1">Sign in</h1>
        <p className="muted text-sm mb-6">Access your engineering platform</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[--surface] bg-[--bg] px-3 py-2 text-sm focus:outline-none focus:border-[--accent]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[--accent] text-[--bg-alt] py-2 text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm muted">
          No account?{' '}
          <Link href="/register" className="accent hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
