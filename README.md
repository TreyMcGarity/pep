# PEP — Personal Engineering Platform

A self-hosted portfolio web app where engineers can showcase their projects, build a visual resume, and let visitors send contact messages — all from a single, themeable platform.

---

## Features

| Feature | Description |
|---|---|
| **Auth** | Email + password registration/login with bcrypt (cost 12) + JWT httpOnly cookies |
| **Themes** | Dark / light mode toggle, preference persisted per user and in localStorage |
| **Projects** | Full CRUD with categories, tech stack tags, live/source links, featured flag |
| **Resume Builder** | Section-based builder (experience, education, skills, summary, certifications) |
| **Contact** | Displays user's email + social links; functional contact form via `/api/contact` |
| **Settings** | Update profile, social links, theme, and password from a single page |
| **Public Portfolio** | Main page (`/`) shows the first user's portfolio without requiring login |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Database**: PostgreSQL via Knex.js
- **Auth**: bcryptjs + jose (JWT in httpOnly cookies)
- **Styling**: Tailwind CSS 4 with CSS custom properties

---

## Getting Started

### 1. Prerequisites

- Node.js 18+
- PostgreSQL 14+

### 2. Clone & install

```bash
git clone <your-fork-url>
cd pep
npm install
```

### 3. Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your PostgreSQL credentials and a random JWT_SECRET
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Database setup

Create the database:
```bash
createdb pep_dev
# or: psql -U postgres -c "CREATE DATABASE pep_dev;"
```

Run all migrations (creates tables in alphabetical order):
```bash
npm run migrate:latest
```

Optionally seed sample categories:
```bash
npm run seed:run
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and register your account at `/register`.

---

## Project Structure

```
pep/
├── app/
│   ├── api/                    # REST API route handlers
│   │   ├── auth/               # register, login, logout, me
│   │   ├── users/[id]/         # profile CRUD
│   │   ├── projects/           # project CRUD
│   │   ├── categories/         # category CRUD
│   │   ├── resume/             # resume sections + items CRUD
│   │   └── contact/            # contact form endpoint
│   ├── components/             # Shared UI components
│   │   ├── Header.tsx          # Sticky header with auth state + theme toggle
│   │   ├── ProjectsSection.tsx # Project grid (data-driven)
│   │   ├── ProjectCategoryCard.tsx # Individual project card
│   │   ├── ResumeSection.tsx   # Resume display (data-driven)
│   │   ├── ContactSection.tsx  # Contact links + contact form
│   │   ├── Footer.tsx          # Footer with dynamic name
│   │   └── ThemeToggle.tsx     # Dark/light toggle button
│   ├── contexts/
│   │   ├── AuthContext.tsx     # JWT session state, login/logout
│   │   └── ThemeContext.tsx    # Theme state + localStorage sync
│   ├── lib/
│   │   ├── db.ts               # Singleton Knex instance
│   │   ├── auth.ts             # JWT sign/verify, cookie helpers
│   │   └── api.ts              # Client-side fetch helpers + shared types
│   ├── dashboard/
│   │   ├── page.tsx            # Dashboard home (auth protected)
│   │   ├── projects/page.tsx   # Manage projects + categories
│   │   └── resume/page.tsx     # Resume builder
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── settings/page.tsx       # Profile, theme, password
│   ├── page.tsx                # Public portfolio (SSR, no auth needed)
│   ├── layout.tsx              # Root layout with AuthProvider + ThemeProvider
│   └── globals.css             # CSS variables (dark/light) + animations
├── db/
│   ├── migrations/             # Run in alphabetical order by Knex
│   │   ├── category.js         # category table
│   │   ├── project.js          # project table
│   │   ├── r_users.js          # users table
│   │   ├── s_update_category.js# Adds user_id, color, sort_order
│   │   ├── t_update_project.js # Adds user_id, year, url, tech_stack, etc.
│   │   ├── u_resume_sections.js# resume_sections table
│   │   └── v_resume_items.js   # resume_items table
│   └── seeds/
│       ├── categories.js       # Sample categories
│       └── projects.js         # Sample projects
├── middleware.ts               # Edge middleware: protects /dashboard + /settings
├── knexfile.js                 # DB config (env-based)
└── .env.local.example          # Environment variable template
```

---

## Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| email | varchar(255) UNIQUE | lowercase, required |
| password_hash | varchar(255) | bcrypt hash (cost 12) |
| first_name / last_name | varchar(100) | |
| display_name | varchar(200) | shown publicly |
| title | varchar(200) | e.g. "Software Developer" |
| bio | text | |
| avatar_url | varchar(500) | |
| linkedin_url / github_url / website_url | varchar(500) | social links |
| theme | varchar(10) | `'dark'` or `'light'` |
| is_active | boolean | default true |
| created_at / updated_at | timestamptz | |

### `category`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| user_id | integer FK → users | nullable for legacy rows |
| name | varchar UNIQUE | |
| description | text | |
| color | varchar(20) | hex color for badge |
| sort_order | integer | |

### `project`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| user_id | integer FK → users | |
| category_id | integer FK → category | nullable |
| name | varchar | required |
| description | text | |
| year | integer | |
| url | varchar(500) | live demo |
| source_url | varchar(500) | GitHub etc. |
| image_url | varchar(500) | preview image |
| tech_stack | text | JSON array e.g. `["TypeScript"]` |
| sort_order / is_featured / is_active | | ordering + soft-delete |

### `resume_sections`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| user_id | integer FK → users | cascade delete |
| type | varchar(50) | `experience`, `education`, `skills`, `summary`, `certifications` |
| title | varchar(200) | e.g. "Work Experience" |
| sort_order | integer | |

### `resume_items`
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| section_id | integer FK → resume_sections | cascade delete |
| user_id | integer FK → users | |
| title | varchar(200) | job title, degree, skill name |
| subtitle | varchar(200) | company, institution |
| description | text | detail / bullet points |
| location | varchar(200) | |
| start_date / end_date | date | nullable |
| is_current | boolean | hides end_date when true |
| sort_order | integer | |

---

## API Reference

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account, sets JWT cookie |
| POST | `/api/auth/login` | — | Login, sets JWT cookie |
| POST | `/api/auth/logout` | — | Clears JWT cookie |
| GET | `/api/auth/me` | cookie | Returns current user |

### Users
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/users/:id` | — | Public profile (no password) |
| PUT | `/api/users/:id` | own | Update profile / change password |

### Projects
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | — | List (`?userId=`, `?categoryId=`, `?featured=true`) |
| POST | `/api/projects` | required | Create |
| GET | `/api/projects/:id` | — | Single project |
| PUT | `/api/projects/:id` | own | Update |
| DELETE | `/api/projects/:id` | own | Delete |

### Categories
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/categories` | — | List (`?userId=`) |
| POST | `/api/categories` | required | Create |
| GET | `/api/categories/:id` | — | Category with its projects |
| PUT | `/api/categories/:id` | own | Update |
| DELETE | `/api/categories/:id` | own | Delete |

### Resume
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/resume` | — | All sections + items for `?userId=` |
| POST | `/api/resume/sections` | required | Create section |
| PUT | `/api/resume/sections/:id` | own | Update section |
| DELETE | `/api/resume/sections/:id` | own | Delete section + items |
| POST | `/api/resume/items` | required | Create item |
| PUT | `/api/resume/items/:id` | own | Update item |
| DELETE | `/api/resume/items/:id` | own | Delete item |

### Contact
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | — | Submit contact form (name, email, message) |

---

## Security

- Passwords hashed with **bcrypt at cost 12**.
- JWTs stored in **httpOnly, SameSite=Lax cookies** (Secure flag in production).
- Login uses **constant-time bcrypt.compare** to prevent timing attacks.
- All write endpoints check token ownership before modifying data.
- Route protection enforced at the Edge via `middleware.ts`.

---

## Deployment (Vercel + Neon/Supabase)

1. Push your fork to GitHub
2. Import project in Vercel
3. Set environment variables: `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_DATABASE`, `JWT_SECRET`
4. Run migrations once against the production DB:
   ```bash
   PG_HOST=... PG_DATABASE=... npm run migrate:latest
   ```
5. Deploy — Vercel handles the rest.
