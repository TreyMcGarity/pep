This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This repository includes a basic personal homepage in the `app/` folder with the following sections:

- Header: top bar with your logo (from `app/artifacts/logo.png`), your name, role and a "Download Resume" button.
- Projects: simple responsive project gallery cards for showcasing projects.
- Resume: a short summary and highlights panel; full resume can be linked with `/resume.pdf`.
- Contact: email and social links.
- Footer: small copyright/footer bar.

Styling and colors were added in `app/globals.css` using these tokens:

- Background: `#0F1419` (fallback `#12171C` as alt)
- Surface panels: `#1A222B`
- Accent (logo blue): `#8FB3C6`
- Primary text: `#E6EEF3`
- Muted text: `#9FB3C1`

To run the site locally:

```bash
npm install
npm run dev
```

Files you may want to edit:

- `app/page.tsx` — the homepage layout and content
- `app/globals.css` — color tokens and simple utilities
- `app/artifacts/logo.png` — replace with your logo image


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
