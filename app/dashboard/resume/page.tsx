'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { resumeApi, type ResumeSection, type ResumeItem } from '../../lib/api';

const SECTION_TYPES = ['experience', 'education', 'skills', 'summary', 'certifications'] as const;
type SectionType = typeof SECTION_TYPES[number];

const TYPE_ICONS: Record<SectionType, string> = {
  experience: '💼',
  education: '🎓',
  skills: '⚡',
  summary: '📝',
  certifications: '🏆',
};

export default function ResumeDashboard() {
  const { user } = useAuth();
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddSection, setShowAddSection] = useState(false);

  useEffect(() => {
    if (!user) return;
    resumeApi.get(user.id)
      .then((res) => setSections(res.sections))
      .finally(() => setLoading(false));
  }, [user]);

  async function addSection(type: SectionType, title: string) {
    const res = await resumeApi.createSection({ type, title });
    setSections((prev) => [...prev, res.section]);
    setShowAddSection(false);
  }

  async function deleteSection(id: number) {
    if (!confirm('Delete this entire section and all its items?')) return;
    await resumeApi.deleteSection(id);
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  async function updateSection(id: number, data: Partial<ResumeSection>) {
    const res = await resumeApi.updateSection(id, data);
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...res.section } : s)));
  }

  async function addItem(sectionId: number, data: Partial<ResumeItem>) {
    const res = await resumeApi.createItem({ ...data, sectionId });
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...(s.items || []), res.item] } : s
      )
    );
  }

  async function updateItem(sectionId: number, itemId: number, data: Partial<ResumeItem>) {
    const res = await resumeApi.updateItem(itemId, data);
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => (i.id === itemId ? res.item : i)) }
          : s
      )
    );
  }

  async function deleteItem(sectionId: number, itemId: number) {
    await resumeApi.deleteItem(itemId);
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      )
    );
  }

  return (
    <div className="min-h-screen">
      <header className="surface sticky top-0 z-40">
        <div className="mx-auto max-w-3xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <Link href="/dashboard" className="muted text-sm hover:text-[--text-primary]">← Dashboard</Link>
          <span className="font-semibold">Resume Builder</span>
          <button
            onClick={() => setShowAddSection(true)}
            className="rounded-md bg-[--accent] text-[--bg-alt] px-4 py-1.5 text-sm font-medium hover:opacity-90"
          >
            + Add section
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {showAddSection && (
          <AddSectionForm onAdd={addSection} onCancel={() => setShowAddSection(false)} />
        )}

        {loading ? (
          <p className="muted text-sm">Loading…</p>
        ) : sections.length === 0 ? (
          <div className="surface rounded-xl p-8 text-center muted">
            <p className="text-lg mb-2">No resume sections yet</p>
            <p className="text-sm">Click "+ Add section" to start building your resume.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onUpdate={(data) => updateSection(section.id, data)}
                onDelete={() => deleteSection(section.id)}
                onAddItem={(data) => addItem(section.id, data)}
                onUpdateItem={(itemId, data) => updateItem(section.id, itemId, data)}
                onDeleteItem={(itemId) => deleteItem(section.id, itemId)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Add Section Form ──────────────────────────────────────────────────────────

function AddSectionForm({
  onAdd, onCancel,
}: {
  onAdd: (type: SectionType, title: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [type, setType] = useState<SectionType>('experience');
  const [title, setTitle] = useState('Work Experience');
  const [saving, setSaving] = useState(false);

  // Auto-populate title from type
  const defaultTitles: Record<SectionType, string> = {
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    summary: 'Summary',
    certifications: 'Certifications',
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onAdd(type, title);
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="surface rounded-xl mb-6 animate-scale-in">
      <h2 className="text-lg font-semibold mb-4">New resume section</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs muted mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => {
              const t = e.target.value as SectionType;
              setType(t);
              setTitle(defaultTitles[t]);
            }}
            className="input-field w-full"
          >
            {SECTION_TYPES.map((t) => (
              <option key={t} value={t}>{TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs muted mb-1">Section title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full"
            required
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="rounded-md bg-[--accent] text-[--bg-alt] px-5 py-2 text-sm font-medium disabled:opacity-50">
          {saving ? 'Adding…' : 'Add section'}
        </button>
        <button type="button" onClick={onCancel}
          className="rounded-md border border-[--surface] px-5 py-2 text-sm muted">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────

function SectionCard({
  section, onUpdate, onDelete, onAddItem, onUpdateItem, onDeleteItem,
}: {
  section: ResumeSection;
  onUpdate: (data: Partial<ResumeSection>) => Promise<void>;
  onDelete: () => Promise<void>;
  onAddItem: (data: Partial<ResumeItem>) => Promise<void>;
  onUpdateItem: (id: number, data: Partial<ResumeItem>) => Promise<void>;
  onDeleteItem: (id: number) => Promise<void>;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editItem, setEditItem] = useState<ResumeItem | null>(null);
  const [editTitle, setEditTitle] = useState(false);
  const [titleVal, setTitleVal] = useState(section.title);

  async function saveTitle() {
    if (titleVal.trim() && titleVal !== section.title) {
      await onUpdate({ title: titleVal });
    }
    setEditTitle(false);
  }

  return (
    <div className="surface rounded-xl animate-fade-up">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xl">{TYPE_ICONS[section.type as SectionType] || '📋'}</span>
          {editTitle ? (
            <input
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
              className="input-field text-lg font-semibold flex-1"
              autoFocus
            />
          ) : (
            <h2
              className="text-lg font-semibold cursor-pointer hover:opacity-80"
              onClick={() => setEditTitle(true)}
              title="Click to rename"
            >
              {section.title}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setCollapsed((c) => !c)} className="muted text-sm">
            {collapsed ? 'Show' : 'Hide'}
          </button>
          <button onClick={onDelete} className="text-red-400 text-sm hover:underline">Delete</button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Items */}
          <div className="space-y-3 mb-4">
            {(section.items || []).map((item) =>
              editItem?.id === item.id ? (
                <ItemForm
                  key={item.id}
                  initial={item}
                  sectionType={section.type as SectionType}
                  onSave={async (data) => { await onUpdateItem(item.id, data); setEditItem(null); }}
                  onCancel={() => setEditItem(null)}
                />
              ) : (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => setEditItem(item)}
                  onDelete={() => onDeleteItem(item.id)}
                />
              )
            )}
          </div>

          {/* Add item form */}
          {showItemForm ? (
            <ItemForm
              sectionType={section.type as SectionType}
              onSave={async (data) => { await onAddItem(data); setShowItemForm(false); }}
              onCancel={() => setShowItemForm(false)}
            />
          ) : (
            <button
              onClick={() => setShowItemForm(true)}
              className="w-full rounded-lg border-2 border-dashed border-[--surface] py-3 text-sm muted hover:border-[--accent]/40 transition-colors"
            >
              + Add {section.type === 'skills' ? 'skill group' : 'item'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ── Item Card ─────────────────────────────────────────────────────────────────

function ItemCard({
  item, onEdit, onDelete,
}: {
  item: ResumeItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const dateRange = [
    item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : null,
    item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : null,
  ].filter(Boolean).join(' – ');

  return (
    <div className="rounded-lg border border-[--surface] p-3 flex gap-3">
      <div className="flex-1 min-w-0">
        {item.title && <div className="font-medium text-sm">{item.title}</div>}
        {item.subtitle && <div className="muted text-xs">{item.subtitle}{item.location ? ` · ${item.location}` : ''}</div>}
        {dateRange && <div className="muted text-xs">{dateRange}</div>}
        {item.description && <p className="muted text-xs mt-1 line-clamp-2">{item.description}</p>}
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button onClick={onEdit} className="text-xs accent hover:underline">Edit</button>
        <button onClick={onDelete} className="text-xs text-red-400 hover:underline">Del</button>
      </div>
    </div>
  );
}

// ── Item Form ─────────────────────────────────────────────────────────────────

function ItemForm({
  initial, sectionType, onSave, onCancel,
}: {
  initial?: ResumeItem | null;
  sectionType: SectionType;
  onSave: (data: Partial<ResumeItem>) => Promise<void>;
  onCancel: () => void;
}) {
  const isSkills = sectionType === 'skills';
  const isSummary = sectionType === 'summary';

  const [form, setForm] = useState({
    title: initial?.title || '',
    subtitle: initial?.subtitle || '',
    description: initial?.description || '',
    location: initial?.location || '',
    startDate: initial?.startDate?.slice(0, 10) || '',
    endDate: initial?.endDate?.slice(0, 10) || '',
    isCurrent: initial?.isCurrent || false,
  });
  const [saving, setSaving] = useState(false);

  function field(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      startDate: form.startDate || null,
      endDate: form.isCurrent ? null : form.endDate || null,
    });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-[--accent]/40 p-3 space-y-2">
      {!isSummary && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs muted mb-0.5">
              {isSkills ? 'Skill / Category' : 'Title'}
            </label>
            <input value={form.title} onChange={field('title')} className="input-field w-full text-sm" />
          </div>
          {!isSkills && (
            <div>
              <label className="block text-xs muted mb-0.5">
                {sectionType === 'education' ? 'Institution' : 'Company'}
              </label>
              <input value={form.subtitle} onChange={field('subtitle')} className="input-field w-full text-sm" />
            </div>
          )}
        </div>
      )}

      {!isSkills && !isSummary && (
        <>
          <div>
            <label className="block text-xs muted mb-0.5">Location</label>
            <input value={form.location} onChange={field('location')} className="input-field w-full text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs muted mb-0.5">Start date</label>
              <input type="date" value={form.startDate} onChange={field('startDate')} className="input-field w-full text-sm" />
            </div>
            <div>
              <label className="block text-xs muted mb-0.5">End date</label>
              <input type="date" value={form.endDate} onChange={field('endDate')}
                disabled={form.isCurrent} className="input-field w-full text-sm disabled:opacity-40" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-1.5 text-xs muted cursor-pointer">
                <input type="checkbox" checked={form.isCurrent}
                  onChange={(e) => setForm((p) => ({ ...p, isCurrent: e.target.checked }))} />
                Current
              </label>
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block text-xs muted mb-0.5">
          {isSkills ? 'Skills (comma separated or description)' : 'Description'}
        </label>
        <textarea value={form.description} onChange={field('description')} rows={3}
          className="input-field w-full text-sm resize-none" />
      </div>

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={saving}
          className="rounded-md bg-[--accent] text-[--bg-alt] px-4 py-1.5 text-xs font-medium disabled:opacity-50">
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel}
          className="rounded-md border border-[--surface] px-4 py-1.5 text-xs muted">
          Cancel
        </button>
      </div>
    </form>
  );
}
