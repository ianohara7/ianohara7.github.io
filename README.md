# Game Programmer CV — Landing Page

A steampunk / Final Fantasy VII-inspired single-page CV built with React, Vite, Framer Motion, and a Three.js 3D museum.

> **Full documentation: see [`DOCUMENTATION.md`](./DOCUMENTATION.md)** — covers every file, animation, the 3D museum, and how to change anything.

## Features

- Canvas particle field (mako motes + ember sparks) hero background
- Typewriter role animation
- Scroll-triggered reveals (Framer Motion)
- Hover cards with glare + shine for skills
- Magnetic buttons
- Animated experience timeline
- **3D museum** (Three.js / react-three-fiber, lazy-loaded)
- Steampunk terminal contact panel
- **English / Spanish bilingual** — toggle in the navbar, remembers your choice
- Fully responsive + `prefers-reduced-motion` support

## Local development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Edit your info

All page content (name, bio, skills, jobs, links) lives in one file:

```
src/content.js
```

- Every string exists twice: in `translations.en` and `translations.es` (section titles/buttons live under each block's `ui` object). Keep both in sync when editing.
- `contact` (email/phone/links) is shared and doesn't change per language.
- Add a real portrait image in `src/assets/` and swap it in `src/components/About.jsx`.
- The browser tab title derives from `profile.name` + `ui.titleSuffix` and updates when the language changes.

## Deploy to GitHub Pages

1. Create a repo on GitHub and push this project to `main`.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. On every push to `main`, the included workflow (`.github/workflows/deploy.yml`) builds and publishes `dist/` automatically.

`base` is already set to `./` so assets resolve correctly under your `https://<user>.github.io/<repo>/` URL.
