'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { projectApi, categoryApi, type Project, type Category } from '../../lib/api';

export default function ProjectsDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      projectApi.list({ userId: user.id }),
      categoryApi.list(user.id),
    ])
      .then(([pRes, cRes]) => {
        setProjects(pRes.projects);
        setCategories(cRes.categories);
      })
      .finally(() => setLoading(false));
  }, [user]);

  async function handleDelete(id: number) {
    if (!confirm('Delete this project?')) return;
    await projectApi.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEdit(project: Project) {
    setEditProject(project);
    setShowForm(true);
  }

  async function handleSave(data: Partial<Project>) {
    if (editProject) {
      const res = await projectApi.update(editProject.id, data);
      setProjects((prev) => prev.map((p) => (p.id === editProject.id ? res.project : p)));
    } else {
      const res = await projectApi.create(data);
      setProjects((prev) => [res.project, ...prev]);
    }
    setShowForm(false);
    setEditProject(null);
  }

  return (
    <div className="min-h-screen">
      <header className="surface sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <Link href="/dashboard" className="muted text-sm hover:text-[--text-primary]">← Dashboard</Link>
          <span className="font-semibold">Projects</span>
          <button
            onClick={() => { setEditProject(null); setShowForm(true); }}
            className="rounded-md bg-[--accent] text-[--bg-alt] px-4 py-1.5 text-sm font-medium hover:opacity-90"
          >
            + Add project
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {showForm && (
          <ProjectForm
            initial={editProject}
            categories={categories}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditProject(null); }}
          />
        )}

        {/* Category manager */}
        <CategoryManager categories={categories} setCategories={setCategories} userId={user?.id} />

        {/* Project grid */}
        {loading ? (
          <p className="muted text-sm">Loading…</p>
        ) : projects.length === 0 ? (
          <div className="surface rounded-xl p-8 text-center muted">
            <p className="text-lg mb-2">No projects yet</p>
            <p className="text-sm">Click "+ Add project" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {projects.map((project) => (
              <article key={project.id} className="surface rounded-xl p-4 animate-scale-in">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className="muted text-xs shrink-0">{project.year}</span>
                </div>
                {project.categoryName && (
                  <span className="inline-block text-xs rounded-full px-2 py-0.5 mb-2"
                    style={{ background: `${project.categoryColor || '#8FB3C6'}22`, color: project.categoryColor || '#8FB3C6' }}>
                    {project.categoryName}
                  </span>
                )}
                <p className="muted text-sm line-clamp-2 mb-3">{project.description}</p>
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.map((t) => (
                      <span key={t} className="text-xs muted border border-[--surface] rounded px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => handleEdit(project)}
                    className="text-xs accent hover:underline">Edit</button>
                  <button onClick={() => handleDelete(project.id)}
                    className="text-xs text-red-400 hover:underline">Delete</button>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs muted hover:accent ml-auto">Live ↗</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Project Form ─────────────────────────────────────────────────────────────

function ProjectForm({
  initial, categories, onSave, onCancel,
}: {
  initial: Project | null;
  categories: Category[];
  onSave: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    categoryId: initial?.categoryId || '',
    year: initial?.year || new Date().getFullYear(),
    url: initial?.url || '',
    sourceUrl: initial?.sourceUrl || '',
    imageUrl: initial?.imageUrl || '',
    techStack: initial?.techStack?.join(', ') || '',
    isFeatured: initial?.isFeatured || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function field(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true);
    try {
      await onSave({
        ...form,
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        year: form.year ? Number(form.year) : null,
        techStack: form.techStack ? form.techStack.split(',').map((t) => t.trim()).filter(Boolean) : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  }

  return (
    <div className="surface rounded-xl mb-6 animate-scale-in">
      <h2 className="text-lg font-semibold mb-4">{initial ? 'Edit project' : 'New project'}</h2>
      {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs muted mb-1">Name *</label>
            <input value={form.name} onChange={field('name')} className="input-field w-full" placeholder="Project name" required />
          </div>
          <div>
            <label className="block text-xs muted mb-1">Year</label>
            <input type="number" value={form.year} onChange={field('year')} className="input-field w-full" />
          </div>
          <div>
            <label className="block text-xs muted mb-1">Category</label>
            <select value={form.categoryId} onChange={field('categoryId')} className="input-field w-full">
              <option value="">None</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs muted mb-1">Live URL</label>
            <input value={form.url} onChange={field('url')} className="input-field w-full" placeholder="https://…" />
          </div>
          <div>
            <label className="block text-xs muted mb-1">Source URL</label>
            <input value={form.sourceUrl} onChange={field('sourceUrl')} className="input-field w-full" placeholder="https://github.com/…" />
          </div>
          <div>
            <label className="block text-xs muted mb-1">Image URL</label>
            <input value={form.imageUrl} onChange={field('imageUrl')} className="input-field w-full" placeholder="https://…" />
          </div>
        </div>
        <div>
          <label className="block text-xs muted mb-1">Description</label>
          <textarea value={form.description} onChange={field('description')} rows={2}
            className="input-field w-full resize-none" placeholder="Brief description…" />
        </div>
        <div>
          <label className="block text-xs muted mb-1">Tech stack (comma separated)</label>
          <input value={form.techStack} onChange={field('techStack')}
            className="input-field w-full" placeholder="TypeScript, Next.js, PostgreSQL" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={form.isFeatured}
            onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))} />
          <label htmlFor="featured" className="text-sm muted">Featured project</label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="rounded-md bg-[--accent] text-[--bg-alt] px-5 py-2 text-sm font-medium disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button type="button" onClick={onCancel}
            className="rounded-md border border-[--surface] px-5 py-2 text-sm muted">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Category Manager ──────────────────────────────────────────────────────────

function CategoryManager({
  categories, setCategories, userId,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  userId?: number;
}) {
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  async function addCategory() {
    if (!newName.trim() || !userId) return;
    setAdding(true);
    try {
      const res = await categoryApi.create({ name: newName.trim(), userId });
      setCategories((prev) => [...prev, res.category]);
      setNewName('');
    } finally {
      setAdding(false);
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm('Delete category? Projects in this category will become uncategorized.')) return;
    await categoryApi.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="surface rounded-xl mb-2">
      <h2 className="text-sm font-semibold mb-3 muted uppercase tracking-wide">Categories</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((c) => (
          <span key={c.id} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
            style={{ background: `${c.color || '#8FB3C6'}22`, color: c.color || '#8FB3C6' }}>
            {c.name}
            <button onClick={() => deleteCategory(c.id)} className="hover:opacity-70 text-xs">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          className="input-field flex-1 text-sm"
          placeholder="New category name…"
        />
        <button onClick={addCategory} disabled={adding || !newName.trim()}
          className="rounded-md bg-[--accent] text-[--bg-alt] px-4 py-1.5 text-sm disabled:opacity-50">
          Add
        </button>
      </div>
    </div>
  );
}
