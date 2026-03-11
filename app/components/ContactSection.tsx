'use client';

import { useState, FormEvent } from 'react';

interface Props {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export default function ContactSection({ email, linkedinUrl, githubUrl, websiteUrl }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Send failed');
      setStatus('error');
    }
  }

  const links = [
    email && { href: `mailto:${email}`, label: 'Email' },
    linkedinUrl && { href: linkedinUrl, label: 'LinkedIn' },
    githubUrl && { href: githubUrl, label: 'GitHub' },
    websiteUrl && { href: websiteUrl, label: 'Website' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Contact</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Links */}
        <div className="surface rounded-xl p-6 animate-fade-up">
          <h3 className="text-sm font-semibold muted uppercase tracking-wide mb-4">Reach out</h3>
          {links.length > 0 ? (
            <div className="flex flex-col gap-2">
              {links.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-[--surface] px-4 py-2.5 text-sm muted hover:border-[--accent]/50 hover:accent transition-all"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          ) : (
            <p className="muted text-sm">No contact info added yet.</p>
          )}
        </div>

        {/* Contact form */}
        <div className="surface rounded-xl p-6 animate-fade-up">
          <h3 className="text-sm font-semibold muted uppercase tracking-wide mb-4">Send a message</h3>
          {status === 'sent' ? (
            <div className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-400">
              Message sent! I&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {status === 'error' && (
                <div className="text-sm text-red-400">{errorMsg}</div>
              )}
              <div>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  className="input-field w-full text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="input-field w-full text-sm"
                />
              </div>
              <div>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Your message…"
                  className="input-field w-full text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-md bg-[--accent] text-[--bg-alt] py-2 text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
