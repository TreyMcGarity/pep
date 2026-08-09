## PEP

Personal engineering portfolio built with Next.js, React, TypeScript, and a small PostgreSQL/Knex setup for local database work.

Hosted Link on github pages: https://treymcgarity.github.io/pep/

## Overview

The site is a static-exported portfolio with these main sections:

- Hero area with an animated focus carousel and calls to action.
- Featured projects rendered as responsive cards.
- Resume snapshot with a short summary and highlights.
- Contact section with email and profile links.
- Footer with site-level branding.

The app uses the Next.js App Router, custom styling in `app/globals.css`, and production export settings in `next.config.ts`.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the local Next.js development server.
- `npm run build` - create the production export.
- `npm run start` - start the production server.
- `npm run lint` - run ESLint.
- `npm run deploy` - publish the exported site from `out/` with GitHub Pages.
- `npm run migrate:make` - create a new Knex migration.
- `npm run migrate:latest` - apply database migrations.
- `npm run migrate:rollback` - roll back the latest migration.
- `npm run seed:make` - create a new seed file.
- `npm run seed:run` - run database seeds.

## Database

The repository includes a small PostgreSQL/Knex setup under `db/` and helper scripts under `scripts/`.

Default local connection values come from `knexfile.js` and the scripts:

- Host: `127.0.0.1`
- Port: `5432`
- User: `postgres`
- Password: `password`
- Database: `pep_dev`

Useful helper scripts:

- `scripts/create_database.js` - create the local development database if it does not exist.
- `scripts/clean_db_migrations.js` - remove the portfolio migration tables and records.
- `scripts/inspect_tables.js` - inspect the current public tables and their columns.

## Project Structure

- `app/` - main Next.js app, layout, page, and UI sections.
- `app/components/` - reusable portfolio sections and cards.
- `db/migrations/` - Knex migrations for `category` and `project` tables.
- `db/seeds/` - sample seed data for categories and projects.
- `scripts/` - local database utilities.

## Notes

- Production output is configured for static export in `next.config.ts`.
- The production build uses a `/pep` base path and asset prefix.
- The portfolio content is centered in `app/page.tsx`, with metadata defined in `app/layout.tsx`.
