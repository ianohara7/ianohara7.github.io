# Project Documentation — FF7 Steampunk CV

A single-page CV/portfolio for a videogame developer, styled after Final Fantasy VII's steampunk aesthetic (mako-teal glow, copper and brass, gears, scanlines). Built with **React**, **Vite**, **Framer Motion**, and a **Three.js** 3D museum section.

This document is the complete manual: what every file does, how every animation works, and how to change anything.

---

## Table of contents

1. [Quick reference](#1-quick-reference)
2. [Tech stack](#2-tech-stack)
3. [Project structure](#3-project-structure)
4. [How the app is assembled](#4-how-the-app-is-assembled)
5. [content.js — where all your text lives](#5-contentjs--where-all-your-text-lives)
6. [Component guide](#6-component-guide)
7. [Styling system (index.css)](#7-styling-system-indexcss)
8. [Animation index](#8-animation-index)
9. [The 3D Museum](#9-the-3d-museum)
10. [Deploying to GitHub Pages](#10-deploying-to-github-pages)
11. [Customization recipes](#11-customization-recipes)
12. [Troubleshooting](#12-troubleshooting)
13. [Dependencies reference](#13-dependencies-reference)

---

## 1. Quick reference

```bash
npm install        # install dependencies (first time)
npm run dev        # start local dev server (hot reload)
npm run build      # production build into dist/
npm run preview    # preview the production build locally
npm run lint       # run oxlint (fast JS/JSX linter)
```

- **Edit your text/content** → `src/content.js` (remember: it exists in both `en` and `es`)
- **Edit the page title** → derived from `profile.name` + `ui.titleSuffix` in `src/context/LanguageContext.jsx` (with the static fallback in `index.html`)
- **Edit colors/fonts** → CSS variables at the top of `src/index.css`
- **Edit the 3D scene** → `src/components/Museum.jsx`

---

## 2. Tech stack

| Tool | What it does | Why it's here |
| --- | --- | --- |
| **React 19** | UI library; the page is one React app | Component model fits a sectioned CV; huge ecosystem |
| **Vite 8** | Dev server + bundler | Instant hot reload, tiny config, first-class GitHub Pages support |
| **Framer Motion 13** | Animation library | Scroll-triggered reveals, magnetic buttons, hover cards, typewriter |
| **Three.js 0.185** | WebGL 3D engine | Renders the 3D museum |
| **@react-three/fiber 9** | React renderer for Three.js | Write Three.js as declarative JSX (`<mesh>`, `<pointLight>`) |
| **@react-three/drei 10** | Helpers for react-three-fiber | `OrbitControls`, `Float`, `Sparkles` — ready-made 3D utilities |
| **Oxlint** | Fast linter | `npm run lint`; configured in `.oxlintrc.json` |
| **GitHub Actions** | CI/CD | Auto-builds and publishes to GitHub Pages on push |

All versions are pinned in `package.json`.

### Code-splitting
The Three.js museum is loaded with `React.lazy()` (`src/App.jsx:10`). Three.js (≈240 KB gzip) is bundled into its own file `Museum-*.js` that only loads after the page renders. The main page stays fast (~107 KB gzip).

---

## 3. Project structure

```
Default Project/
├── index.html                     # HTML shell: fonts, <title> fallback, mounts #root
├── package.json                   # scripts + dependencies
├── vite.config.js                 # Vite config; base: './' (needed for GitHub Pages)
├── .oxlintrc.json                 # lint rules
├── .gitignore                     # ignores node_modules, dist, editor files
├── README.md                      # short readme
├── DOCUMENTATION.md               # this file
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions: build + publish on push to main
├── public/
│   └── favicon.svg                # browser tab icon
└── src/
    ├── main.jsx                   # entry point; wraps the app in LanguageProvider
    ├── App.jsx                    # page layout: Navbar, sections, Footer
    ├── content.js                 # ★ ALL text/data — English (en) and Spanish (es)
    ├── index.css                  # entire design system + styles (one file)
    ├── context/
    │   ├── language.js            # LanguageContext object (shared language state)
    │   └── LanguageContext.jsx    # LanguageProvider — manages the current language
    ├── hooks/
    │   ├── useContent.js          # hook: read translated content (t, contact, lang…)
    │   └── useTypewriter.js       # typing/deleting text effect for the hero
    └── components/
        ├── Navbar.jsx             # fixed top bar + language toggle + mobile menu
        ├── Hero.jsx               # full-screen intro (particles, typewriter, buttons)
        ├── About.jsx              # portrait frame, bio, stats
        ├── Skills.jsx             # 6 hover-cards with animated bars
        ├── Experience.jsx         # animated timeline of jobs
        ├── Museum.jsx             # ★ Three.js 3D museum (lazy-loaded)
        ├── Contact.jsx            # contact panel + "terminal" card
        ├── Footer.jsx             # bottom bar
        ├── Section.jsx            # reusable section wrapper (heading + reveal)
        ├── Gear.jsx               # SVG gear icon used everywhere
        ├── MagneticButton.jsx     # button that pulls toward the cursor
        ├── HoverCard.jsx          # 2D hover card (lift, glare, shine)
        └── ParticleField.jsx      # canvas particle background (hero)
```

---

## 4. How the app is assembled

**`src/main.jsx`** is the entry point:

1. Wraps `<App />` in `<LanguageProvider>` (from `src/context/LanguageContext.jsx`)
2. Imports the global stylesheet `index.css`
3. Mounts `<App />` into `<div id="root">` (defined in `index.html`)

**`src/App.jsx`** lays out the page top to bottom:

```
<div class="app">
  <div class="scanlines" />     ← full-screen CRT scanline overlay
  <Navbar />                    ← fixed nav
  <main>
    <Hero />                    ← section id="top"
    <About />                   ← id="about"
    <Skills />                  ← id="skills"
    <Experience />              ← id="experience"
    <Museum />                  ← id="museum"  (lazy-loaded)
    <Contact />                 ← id="contact"
  </main>
  <Footer />
</div>
```

**Page flow:** Sections order = page order. The navbar links are anchor tags (`#about`, `#skills`, ...) so clicking scrolls to that section. The `scroll-padding-top` in CSS keeps the fixed navbar from covering section headings.

---

## 5. content.js — where all your text lives

Almost every string on the page comes from this single file. **You don't touch JSX to change content — only this file.**

The site is fully bilingual. `content.js` exports two things:

| Export | Shape | Used by |
| --- | --- | --- |
| `contact` | object `{ email, phone, github, website }` | Contact section (language-independent — shared) |
| `translations` | `{ en: <block>, es: <block> }` | everything else |

Each language block (`translations.en`, `translations.es`) has the same shape:

| Key | Shape | Used by |
| --- | --- | --- |
| `profile` | object | everywhere (see below) |
| `stats` | array of `{ value, label }` | About section stat tiles |
| `skillGroups` | array of `{ title, skills: [{ name, level }] }` | Skills cards |
| `experience` | array of `{ role, company, period, points: [] }` | Experience timeline |
| `links` | array of `{ label, href }` | Navbar menu |
| `ui` | object | UI chrome (section titles, buttons, footer, aria labels) |

### `profile`
```js
{
  name: "Ian O'Hara",              // hero headline + footer + browser tab title
  fullName: '...',                 // About signature (long version)
  tagline: '...',                  // one-liner under the typewriter
  location: 'Lima, Perú · UTC-5',  // badge at the top of the hero
  roles: [ '...', '...' ],         // words cycled by the typewriter
  summary: `...`,                  // About bio (newlines respected)
}
```

### `ui` — the "chrome" translations
Everything that isn't content data lives under `ui`:
`titleSuffix` (tab title suffix like `Game Programmer`), `langAria` (label for the language toggle button), `hero` (badge/kicker/buttons), `about`, `skills`, `experience`, `museum`, `contact`, and `footer` (each holding that section's kicker, title, and any button/label text).

### How the language is chosen
1. A saved choice in `localStorage` under key `lang` wins (`'en'` or `'es'`).
2. Otherwise, if `navigator.language` starts with `es`, Spanish is shown.
3. Otherwise English.

The Navbar's `EN/ES` button toggles the language. Every change is saved to `localStorage`, the browser tab title and `<html lang>` update instantly, and all components re-render via `LanguageProvider`/`useContent()`.

### Adding a new string
Every visible string must exist in **both** `translations.en` and `translations.es` (including inside `ui`). If you only add it to one, the other language will render `undefined`. Keep the two blocks structurally identical.

### `skillGroups` — the `level` values (0–100)
`level` is **the percentage the progress bar animates to**. It's your call — the CV lists skills but not proficiencies, so treat them as your own self-rating. Adjust freely.

### `experience`
Each entry becomes one timeline card. `period` is a free-text string (`'2021 — 2025'`). Newest first is conventional.

### `contact`
Used for the buttons and the terminal card. `github` and `website` are full URLs. `phone` is shown as text and copied via the "Copy phone" button. `contact` lives outside the language blocks because phone/e-mail/URLs don't change per language.

### `links`
These are the navbar items. `href` must match a section `id` (e.g. `'#museum'`). Adding a link to a section that doesn't exist will just scroll nowhere. The language toggle button is added automatically next to the links — don't put it in `links`.

---

## 6. Component guide

Every component reads its text through the `useContent()` hook (from `src/hooks/useContent.js`):

```js
import { useContent } from '../hooks/useContent.js'

const { t, contact, lang, toggleLang } = useContent()
// t = translations[lang]  →  t.profile, t.ui.hero.title, t.links, …
```

It must be called inside `<LanguageProvider>` (wrapped around the whole app in `main.jsx`) or it throws. Use `t.*` for translated strings and `contact.*` for the shared contact info.

### Shared building blocks

**`Gear.jsx`** — The cog icon. An SVG with 8 teeth + rings.
Props: `size` (px), `color` (CSS color, default `currentColor`), `spin` (bool → adds the `gear-spin` CSS rotation animation). Used as the site's visual signature.

**`Section.jsx`** — Wrapper for every content section. Props: `id`, `kicker` (small copper label like `02 · Arsenal`), `title` (big heading), `children` (section body).
It renders the section header (gear + kicker + title + animated divider line) and wraps everything in a Framer Motion **scroll-reveal** (`initial opacity 0 / y 28px → visible` when 20% of it enters the viewport). If you add a new section, use this wrapper for a consistent look.

**`MagneticButton.jsx`** — A button/link that drifts toward the cursor.
- Props: `children`, `href` (renders `<a>`; external URLs open in a new tab), `variant` (`'primary'` copper or `'ghost'` outline), `onClick` (renders `<button>` if no `href`).
- How it works: on `mousemove` it measures the cursor offset from the button's center, then animates `x`/`y` via Framer Motion `useSpring` (soft follow-back). On leave it springs back to center. `whileTap` squishes it slightly (`scale 0.96`).
- Tuning: the `0.35` factor in `onMouseMove` = pull strength; the spring `stiffness`/`damping`/`mass` in `useSpring` = how rubbery it feels.

**`HoverCard.jsx`** — The skill-card effect (replaced the old 3D tilt).
- Lifts the card 6px on hover (`whileHover={{ y: -6 }}`, spring).
- A **glare** highlight follows the mouse: a radial-gradient whose center is derived from cursor position via motion values.
- A **shine sweep** crosses the card once on hover (pure CSS, `.hover-shine`).
- It intentionally uses **only 2D transforms** — the previous 3D `rotateX/rotateY` version caused text to disappear in Chromium, so it was removed.

**`ParticleField.jsx`** — Canvas-based background used in the hero.
- Renders three particle types: teal **motes**, amber **embers**, copper sparks, drifting upward with a sine-wave sway.
- Two large blurred color "orbs" (teal + copper) give depth.
- Uses additive blending (`globalCompositeOperation = 'lighter'`) + `shadowBlur` for the glow look.
- Density: `density` prop (default `16000`), particle count capped at 110. Higher divisor = fewer particles.
- Honors `prefers-reduced-motion` (renders one static frame).
- Resizes with the window (re-inits canvas, respects devicePixelRatio up to 2×).

### Sections

**`Navbar.jsx`**
- Fixed header. Adds a blurred dark background + shadow once you scroll past 24px (`nav-scrolled` class).
- Brand = spinning gear + `profile.name` first word.
- Desktop: horizontal links from `t.links` (the current language's links). Mobile (<900px): hamburger toggles an animated dropdown (`AnimatePresence` for the open/close animation).
- **Language toggle**: an `EN`/`ES` button (`.lang-btn`) sits after the links; it shows the *other* language and calls `toggleLang()`. Labeled with `t.ui.langAria` for screen readers.
- Entire bar slides in from the top on load.

**`Hero.jsx`**
- Full viewport height. Layers: `ParticleField` (canvas) → vignette gradient → content.
- Content (all staggered fade-up via the local `fadeUp(delay)` helper):
  1. location/status badge (spinning gear + pulsing dot)
  2. `profile.name` (giant, with a teal glow text-shadow)
  3. **typewriter line**: `> <typed role>▍` using `useTypewriter(profile.roles)`; the caret blinks via CSS
  4. tagline
  5. two magnetic buttons ("View My Work" → `#experience`, "Get In Touch" → `#contact")
- Four copper corner brackets frame the hero (`.hero-corner`).
- A "SCROLL" cue at the bottom has a small animated line (`.scroll-line::after`).

**`About.jsx`**
- Two columns: portrait frame (left) + text/stats (right).
- The **portrait** is a placeholder: a brass-cornered panel with a gear and text. To add a photo: put an image in `src/assets/` and replace the contents of `.portrait` in `About.jsx` (e.g. `<img src={...} alt="..." />`), plus CSS for `.portrait img { width:100%; height:100%; object-fit:cover; }`.
- `profile.summary` renders with newlines preserved (`white-space: pre-line`).
- Signature line uses `profile.fullName`.
- Stats grid maps over `stats` with a per-tile staggered fade-up.

**`Skills.jsx`**
- Renders `skillGroups` as a responsive grid (3 columns desktop, 1 column mobile).
- Each card is a `HoverCard`. Inside: title, then one row per skill = name + `level%` + an animated progress bar (`.skill-fill` animates `width` from 0 → `level%` when scrolled into view, staggered).
- A "rivets" row of brass dots at the bottom for flavor.

**`Experience.jsx`**
- A vertical timeline: an absolute line that **draws itself downward** (`scaleY 0 → 1` on scroll).
- Each job slides in from the left or right (alternating based on index).
- Gear "node" sits on the line beside each card (aligned so it never overlaps the card).
- Card: role, period (teal), company (copper), bullet points (`▸` markers).

**`Museum.jsx`** — see [Section 9](#9-the-3d-museum).

**`Contact.jsx`**
- Left: "Open a channel" panel with magnetic buttons — Email (mailto), GitHub, Website, and **Copy phone** (writes `contact.phone` to the clipboard with `navigator.clipboard`).
- Right: a fake **terminal** styled like a Shinra HR config (`shinra://hr/init.cfg`) showing `whoami` / `cat contact.conf` output. Uses `profile.name.split(' ')[0]` for the prompt user.

**`Footer.jsx`**
- Gear + auto-year copyright (`new Date().getFullYear()`) + "Back to top" link.

---

## 7. Styling system (index.css)

Everything is in one file, `src/index.css` (~1150 lines), organized by section with banner comments.

### Design tokens (CSS variables, top of file)
```css
:root {
  --bg: #0a1417;          /* page background (dark teal-black) */
  --bg-2: #0e1b1f;        /* footer/terminal background */
  --panel: #122125;       /* card/section panel */
  --panel-2: #17282d;     /* slightly lighter panel top */
  --line: #2b4745;        /* borders */
  --mako: #3fe6b3;        /* ★ FF7 "mako" teal — primary accent */
  --mako-bright: #8effdd; /* brighter teal */
  --mako-dim: rgba(63,230,179,.3); /* translucent teal */
  --copper: #c8763a;      /* copper accent */
  --copper-deep: #a85f2c;
  --brass: #d8a94f;       /* brass accent */
  --amber: #ffb84d;
  --paper: #e6e0cf;       /* main text (warm off-white) */
  --muted: #93a89f;       /* secondary text */
  --steel: #4a5a58;
  --shadow: 0 14px 40px rgba(0,0,0,.45);
  --font-display: 'Chakra Petch', sans-serif; /* headings */
  --font-mono: 'IBM Plex Mono', monospace;    /* body/labels */
}
```
**To re-theme the site, change these variables.** Fonts are loaded in `index.html` via Google Fonts.

### Global layers
- `.scanlines` — fixed full-screen repeating gradient (CRT scanline texture), `mix-blend-mode: overlay`, sits above everything (`z-index 999`, `pointer-events: none`).
- `html { scroll-behavior: smooth; scroll-padding-top: 84px }` — smooth anchors + offset for the fixed nav.
- `@media (prefers-reduced-motion: reduce)` — kills all CSS animations/transitions for users who request it (JS canvas also checks this).

### Section anatomy
Every section shares: `.section` (max-width 1080px, generous vertical padding), `.section-head`, `.kicker` (copper uppercase label), `.section-title` (Chakra Petch, uppercase, with spinning brass gear), `.rule` (gradient divider with a glowing teal diamond).

### Responsive breakpoints
| Breakpoint | Change |
| --- | --- |
| `max-width: 900px` | Nav links → hamburger; skills grid → 1 column; about/contact grids → 1 column; stats → 2×2 |
| `max-width: 560px` | Hero buttons stack; corner brackets hidden |
| `prefers-reduced-motion` | All CSS animations disabled |

---

## 8. Animation index

| Animation | Where it lives | How to tune |
| --- | --- | --- |
| Typewriter | `useTypewriter.js` | Function args `typeSpeed=75, deleteSpeed=40, pause=1800` (ms). In `Hero.jsx` it's called with defaults. |
| Hero fade-up stagger | `Hero.jsx` `fadeUp(delay)` | Change delays (0.15 → 0.3 → ...) or duration. |
| Scroll reveals | Every section via `Section.jsx` + `whileInView` | `viewport={{ amount: 0.2 }}` = % visible to trigger; `transition` controls duration/delay. |
| Timeline draw | `Experience.jsx` (`.timeline-line` scaleY) | `duration: 1.2`. |
| Skill bars | `Skills.jsx` `.skill-fill` width | `duration: 1`, per-card delay `0.2`. |
| Magnetic buttons | `MagneticButton.jsx` | Pull factor `0.35`; spring `{ stiffness:200, damping:15, mass:0.4 }`. |
| Hover card lift/shine | `HoverCard.jsx` + CSS | Lift `-6`; shine speed in `.hover-shine::after transition`. |
| Gear spin | `index.css .gear-spin` | `14s linear infinite` rotation. |
| Particle field | `ParticleField.jsx` | `density` prop; colors in `COLORS`; count cap 110. |
| 3D museum | `Museum.jsx` | Auto-rotate speed `0.8`; see section 9. |
| Nav slide-in / burger | `Navbar.jsx` | `transition` on header; `AnimatePresence` for menu. |

Framer Motion pattern cheat-sheet (used everywhere):
- `initial` = starting state, `whileInView` = state when scrolled into view, `whileHover` = on hover, `animate` = on mount.
- `viewport={{ once: true }}` → reveal only the first time.

---

## 9. The 3D Museum

`src/components/Museum.jsx`. Rendered with **react-three-fiber** (Three.js in JSX), helpers from **drei**.

### What the placeholder scene contains
- **Environment**: background color + fog matching the theme (`#0a1417`), ambient + teal/copper point lights + a soft directional light.
- **Floor**: a large dark circle mesh + `gridHelper` grid.
- **Sparkles**: drei's `<Sparkles>` = drifting glitter (90 particles, teal) for the mako vibe.
- **5 exhibits**: each `Exhibit` = a pedestal (cylinder) with a glowing teal ring, topped by a different floating geometric shape (dodecahedron, torus knot, sphere, octahedron, torus) wrapped in drei `<Float>` (bobs + rotates gently). Materials use `emissive` so artifacts self-glow.

### Camera + controls
```jsx
<Canvas frameloop={...} dpr={[1,1.6]} camera={{ position:[0,3.4,8.6], fov:50 }}>
  <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.8}
                 minDistance={4} maxDistance={15} maxPolarAngle={Math.PI/2.15} />
```
- Auto-rotates on its own; drag = orbit, wheel = zoom, pan disabled.
- `maxPolarAngle` stops the camera going under the floor.

### Performance features
- **Pause off-screen**: an `IntersectionObserver` toggles `frameloop` (`'always'` when visible, `'never'` when not) so the GPU isn't wasted off-screen.
- **DPR cap**: `dpr={[1, 1.6]}` renders at most 1.6× device pixel ratio.
- **Lazy-loaded**: see [Section 4](#4-how-the-app-is-assembled).

### Swapping in your real model
1. Export your model as **GLB/GLTF** (e.g. from Blender). Keep textures either embedded or in the same folder.
2. Put it in `src/assets/` (Vite will bundle it).
3. Replace one exhibit's geometry (or the whole `Exhibit`) with the model:

```jsx
import { useGLTF } from '@react-three/drei'
import modelUrl from '../assets/your-model.glb'

function YourExhibit() {
  const { scene } = useGLTF(modelUrl)
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.4}>
      <primitive object={scene} scale={1} />
    </Float>
  )
}
```
4. For multiple models, `useGLTF(url)` per model, or a single `.glb` whose scene contains everything.
5. To light a model well, keep the point lights and consider adding `<Environment preset="studio" />` (from drei) — it downloads HDR from a CDN at runtime, so it's fine for dev but keep that in mind for production.

### Model notes (for your Blender/Maya workflow)
- **Scale**: this scene is roughly "meters". A model meant for VR/AR at real-world scale will fit perfectly (e.g. human-height statue ~1.8 units). If your model is huge (e.g. exported in cm), set `scale` accordingly.
- **Center the pivot** at the base of the object so it sits on the pedestal (`position={[0, -1.15, 0]}` puts an exhibit base on the floor).
- **Y-up** is the convention here (Three.js default) — same as most game engines.
- Export with **embedded textures** or alongside the file so `useGLTF` finds them.

---

## 10. Deploying to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) handles everything automatically.

### Setup (one time)
1. Create a GitHub repo and push the project's `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. That's it. Every push to `main` triggers:
   - `npm ci` (install exact deps from lockfile)
   - `npm run build` (production build → `dist/`)
   - upload `dist/` as a Pages artifact and publish it

### Why it works at `<user>.github.io/<repo>/`
`vite.config.js` sets `base: './'`, so all asset URLs in the build are **relative** (`./assets/...`). Relative URLs work no matter what sub-path the site is served from. If you switch to a custom domain or root deploy, you can change `base` to `'/'`.

### Local production check
```bash
npm run build
npm run preview     # serves dist/ — test exactly what will deploy
```

---

## 11. Customization recipes

### Change all colors (re-theme)
Edit the `:root` variables in `index.css` — mako teal → your accent, copper → your accent, etc.

### Change the fonts
Edit the Google Fonts `<link>` in `index.html` and the `--font-display` / `--font-mono` variables. (If you want self-hosted fonts, download the `woff2` files into `src/assets/fonts/` and use `@font-face` in `index.css`.)

### Add a new section (e.g. "Projects")
1. Create `src/components/Projects.jsx` using the `Section` wrapper (copy `Skills.jsx` as a template).
2. Add it to `App.jsx` `<main>` in the order you want.
3. Add `{ label: 'Projects', href: '#projects' }` to `links` in **both** `translations.en` and `translations.es` in `content.js`.
4. Bump the "kicker" numbers if you care about the ordering (e.g. the next section becomes `06`).

### Add your photo
Put the image in `src/assets/`, then in `About.jsx` replace the `.portrait` placeholder contents with `<img>`, and add CSS:
```css
.portrait img { width: 100%; height: 100%; object-fit: cover; }
```

### Make the hero name smaller/bigger
`.hero-name { font-size: clamp(44px, 9vw, 104px) }` in `index.css`.

### Change particle feel
`ParticleField.jsx`: `COLORS`, `density` prop, `count` cap, speeds (`vy`, `swayAmp`, `swayFreq`).

### Change the typewriter roles
Just edit `profile.roles` in `content.js` — for each language (`translations.en.profile.roles` and `translations.es.profile.roles`).

### Change the default language
Edit `getInitialLang()` in `src/context/LanguageContext.jsx` (currently: saved choice → browser `es` → `en`).

### Add a project/social link to Contact
Add a `<MagneticButton href="..." variant="ghost">Label</MagneticButton>` inside `.contact-actions` in `Contact.jsx` (or add the field to `contact` in `content.js`).

---

## 12. Troubleshooting

| Problem | Cause / fix |
| --- | --- |
| `npm install` peer warnings | Framer Motion / drei may show peer warnings; installs still succeed. If a hard failure occurs, install the suggested peer version. |
| Museum box is empty / black | WebGL is blocked or unavailable (old GPU, headless browser, some privacy settings). The site itself is unaffected. Check the browser console. |
| Text disappears when hovering skill cards | Should not happen anymore — the old 3D tilt was replaced with 2D `HoverCard`. If you re-add 3D transforms, note `perspective` + `overflow: hidden` on the same element breaks text in Chromium. |
| Google Fonts don't load | No network, or the CDN is blocked. Site still works with fallback system fonts. Consider self-hosting fonts. |
| Build warns about chunk size | The `Museum-*.js` chunk (~240 KB gz) is expected. The main bundle stays small because the museum is lazy-loaded. |
| Deploy fails on GitHub | Make sure Settings → Pages → Source = **GitHub Actions** (not the "Deploy from a branch" option). Also confirm your default branch is `main`. |
| Anchors don't scroll to the right spot | The `scroll-padding-top: 84px` accounts for the fixed navbar. If you change nav height, update it. |
| Nothing shows after `npm run build` | Run `npm run preview` to test the built output; a blank page usually means `base` is wrong for the deploy path. |
| `useGLTF` can't find textures | Keep textures embedded in the `.glb`, or place them next to the file and export with relative paths. |

---

## 13. Dependencies reference

**Runtime**
- `react` / `react-dom` — UI framework
- `framer-motion` — motion values, `whileInView`, springs, `AnimatePresence`
- `three` — WebGL 3D engine (math, materials, renderer, geometries)
- `@react-three/fiber` — React reconciler for Three.js (Canvas, meshes, lights as JSX)
- `@react-three/drei` — high-level three helpers (`OrbitControls`, `Float`, `Sparkles`, `useGLTF`, ...)

**Dev**
- `vite` — bundler + dev server + build
- `@vitejs/plugin-react` — fast refresh / JSX transform for Vite
- `oxlint` — linting (`npm run lint`)
- `@types/react`, `@types/react-dom` — type hints for editors (JS project)

**Config files worth knowing**
- `vite.config.js` — `base: './'` for GitHub Pages; React plugin.
- `.oxlintrc.json` — hooks rules + export rules.
- `.gitignore` — keeps `node_modules/`, `dist/`, editor junk out of git.
- `index.html` — fonts, meta description, favicon, title fallback.

---

### Suggested next steps
1. Add your photo to the About section.
2. Replace the museum placeholder shapes with your model (Section 9).
3. Self-host the fonts if you care about offline/robust loading.
4. Deploy and share the link (Section 10).
