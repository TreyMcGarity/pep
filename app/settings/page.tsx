'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { userApi } from '../lib/api';

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '', lastName: '', displayName: '', title: '',
    bio: '', avatarUrl: '', linkedinUrl: '', githubUrl: '', websiteUrl: '',
  });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        title: user.title || '',
        bio: user.bio || '',
        avatarUrl: user.avatarUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
        websiteUrl: user.websiteUrl || '',
      });
    }
  }, [user]);

  function setField(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const body: Record<string, unknown> = { ...form };
      if (passwords.new) {
        if (passwords.new !== passwords.confirm) {
          setError('New passwords do not match');
          return;
        }
        body.currentPassword = passwords.current;
        body.newPassword = passwords.new;
      }
      await userApi.update(user!.id, body);
      await refreshUser();
      setSaved(true);
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleThemeChange(newTheme: 'dark' | 'light') {
    setTheme(newTheme);
    if (user) {
      try {
        await userApi.update(user.id, { theme: newTheme });
        await refreshUser();
      } catch {
        // Non-fatal — theme is still applied locally
      }
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <header className="surface sticky top-0 z-40">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <Link href="/dashboard" className="muted text-sm hover:text-[--text-primary]">← Dashboard</Link>
          <span className="font-semibold">Settings</span>
          <Link href="/" className="muted text-sm hover:text-[--text-primary]">View portfolio</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {error && (
          <div className="mb-6 rounded-md bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {saved && (
          <div className="mb-6 rounded-md bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-400">
            Settings saved!
          </div>
        )}

        {/* Theme */}
        <section className="surface rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="flex gap-3">
            {(['dark', 'light'] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={`flex-1 rounded-lg border py-3 text-sm font-medium transition-all ${
                  theme === t
                    ? 'border-[--accent] accent'
                    : 'border-[--surface] muted hover:border-[--accent]/50'
                }`}
              >
                {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            ))}
          </div>
        </section>

        {/* Profile */}
        <form onSubmit={handleSave}>
          <section className="surface rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs mb-1 muted uppercase tracking-wide">First name</label>
                <input value={form.firstName} onChange={setField('firstName')}
                  className="input-field w-full" placeholder="Trey" />
              </div>
              <div>
                <label className="block text-xs mb-1 muted uppercase tracking-wide">Last name</label>
                <input value={form.lastName} onChange={setField('lastName')}
                  className="input-field w-full" placeholder="McGarity" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs mb-1 muted uppercase tracking-wide">Display name</label>
                <input value={form.displayName} onChange={setField('displayName')}
                  className="input-field w-full" placeholder="Trey McGarity" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs mb-1 muted uppercase tracking-wide">Title / tagline</label>
                <input value={form.title} onChange={setField('title')}
                  className="input-field w-full" placeholder="Software Developer" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs mb-1 muted uppercase tracking-wide">Bio</label>
                <textarea value={form.bio} onChange={setField('bio')} rows={3}
                  className="input-field w-full resize-none" placeholder="Short bio shown on your portfolio…" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs mb-1 muted uppercase tracking-wide">Avatar URL</label>
                <input value={form.avatarUrl} onChange={setField('avatarUrl')}
                  className="input-field w-full" placeholder="https://…" />
              </div>
            </div>
          </section>

          {/* Social Links */}
          <section className="surface rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-4">Social Links</h2>
            <div className="space-y-3">
              {[
                { label: 'LinkedIn', field: 'linkedinUrl', placeholder: 'https://linkedin.com/in/…' },
                { label: 'GitHub', field: 'githubUrl', placeholder: 'https://github.com/…' },
                { label: 'Website', field: 'websiteUrl', placeholder: 'https://…' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs mb-1 muted uppercase tracking-wide">{label}</label>
                  <input
                    value={form[field as keyof typeof form]}
                    onChange={setField(field)}
                    className="input-field w-full"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Password */}
          <section className="surface rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="space-y-3">
              {[
                { label: 'Current password', field: 'current', placeholder: '••••••••' },
                { label: 'New password', field: 'new', placeholder: 'At least 8 characters' },
                { label: 'Confirm new password', field: 'confirm', placeholder: '••••••••' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs mb-1 muted uppercase tracking-wide">{label}</label>
                  <input
                    type="password"
                    value={passwords[field as keyof typeof passwords]}
                    onChange={(e) =>
                      setPasswords((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                    className="input-field w-full"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[--accent] text-[--bg-alt] px-6 py-2 text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {loading ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="rounded-md border border-[--surface] px-6 py-2 text-sm muted hover:border-[--accent]/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
