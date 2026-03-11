/**
 * Client-side API helper functions.
 * All functions throw on non-OK responses with the server error message.
 */

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
  register: (body: { email: string; password: string; firstName: string; lastName: string }) =>
    request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () => request('/api/auth/logout', { method: 'POST' }),

  me: () => request<{ user: User }>('/api/auth/me'),
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const userApi = {
  get: (id: number) => request<{ user: User }>(`/api/users/${id}`),

  update: (id: number, body: Partial<User>) =>
    request<{ user: User }>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
};

// ── Projects ──────────────────────────────────────────────────────────────────

export const projectApi = {
  list: (params?: { userId?: number; categoryId?: number; featured?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.userId) q.set('userId', String(params.userId));
    if (params?.categoryId) q.set('categoryId', String(params.categoryId));
    if (params?.featured) q.set('featured', 'true');
    return request<{ projects: Project[] }>(`/api/projects?${q}`);
  },

  get: (id: number) => request<{ project: Project }>(`/api/projects/${id}`),

  create: (body: Partial<Project>) =>
    request<{ project: Project }>('/api/projects', { method: 'POST', body: JSON.stringify(body) }),

  update: (id: number, body: Partial<Project>) =>
    request<{ project: Project }>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (id: number) => request(`/api/projects/${id}`, { method: 'DELETE' }),
};

// ── Categories ────────────────────────────────────────────────────────────────

export const categoryApi = {
  list: (userId?: number) => {
    const q = userId ? `?userId=${userId}` : '';
    return request<{ categories: Category[] }>(`/api/categories${q}`);
  },

  get: (id: number) => request<{ category: Category }>(`/api/categories/${id}`),

  create: (body: Partial<Category>) =>
    request<{ category: Category }>('/api/categories', { method: 'POST', body: JSON.stringify(body) }),

  update: (id: number, body: Partial<Category>) =>
    request<{ category: Category }>(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (id: number) => request(`/api/categories/${id}`, { method: 'DELETE' }),
};

// ── Resume ────────────────────────────────────────────────────────────────────

export const resumeApi = {
  get: (userId: number) => request<{ sections: ResumeSection[] }>(`/api/resume?userId=${userId}`),

  createSection: (body: Partial<ResumeSection>) =>
    request<{ section: ResumeSection }>('/api/resume/sections', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updateSection: (id: number, body: Partial<ResumeSection>) =>
    request<{ section: ResumeSection }>(`/api/resume/sections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  deleteSection: (id: number) => request(`/api/resume/sections/${id}`, { method: 'DELETE' }),

  createItem: (body: Partial<ResumeItem>) =>
    request<{ item: ResumeItem }>('/api/resume/items', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  updateItem: (id: number, body: Partial<ResumeItem>) =>
    request<{ item: ResumeItem }>(`/api/resume/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  deleteItem: (id: number) => request(`/api/resume/items/${id}`, { method: 'DELETE' }),
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactApi = {
  send: (body: { name: string; email: string; message: string }) =>
    request('/api/contact', { method: 'POST', body: JSON.stringify(body) }),
};

// ── Shared types ──────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  title: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  theme: 'dark' | 'light';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  userId: number;
  categoryId: number | null;
  categoryName?: string;
  categoryColor?: string;
  name: string;
  description: string;
  year: number | null;
  url: string;
  sourceUrl: string;
  imageUrl: string;
  techStack: string[]; // parsed from JSON
  sortOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  userId: number;
  name: string;
  description: string;
  color: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeSection {
  id: number;
  userId: number;
  type: 'experience' | 'education' | 'skills' | 'summary' | 'certifications';
  title: string;
  sortOrder: number;
  items: ResumeItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ResumeItem {
  id: number;
  sectionId: number;
  userId: number;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
