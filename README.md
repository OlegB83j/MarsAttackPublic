# Mars Attacks 🛸

An intentionally over-the-top, B-movie-themed React single-page app: a fake
"intergalactic invasion simulator" wrapped around a practical showcase of HTML
elements and interactive React component patterns.

Despite the alien branding, this is **not a product** — it is a demo and
sandbox project (the package is literally named `demo-project`). It exists to
have a colorful, animation-heavy, multi-page UI that is easy to poke at:
useful for demoing UI patterns, and — judging by `CLAUDE.md`, `agents.md`,
`.air/cloud/startup.sh` and the history of small feature pull requests — as a
playground for AI coding agents making changes against a real-but-harmless
codebase.

## What you actually see

1. **Animated project cover** (`src/components/ProjectCover.jsx`) — a splash
   screen with a starfield, orbiting planets (Mars, Earth, Saturn), floating
   UFOs, martian characters, glitching "MARS NEEDS WIFI!" title, a typewriter
   subtitle and rotating warning banners. Nothing else renders until you click
   **ENTER THE MOTHERSHIP**.
2. **The main app**, made up of three pages plus a set of always-on background
   animations (drifting particles, floating shapes, and a mouse-reactive 3D
   emoji cube).

### Pages

| Page | What it demonstrates |
| --- | --- |
| **Home** | Hero section with inline animated SVG, an "alien technology" feature grid, and an *Interactive Test Zone* of small stateful widgets: dropdown simulator, text-lines toggle, click counter, color toggle. Buttons fire a themed popup modal. |
| **HTML Elements Showcase** | A broad reference sweep of plain HTML under Martian styling: typography (`h1`–`h6`, `blockquote`, `code`, `kbd`, `mark`, `pre`), all three list types, a full `fieldset` form (text, email, range, textarea, select, checkbox, radio), a data table, media & indicators (`figure`/`figcaption`, `progress`, `meter`), semantic elements (`article`, `time`, `aside`, `details`/`summary`), and button/link states. |
| **Interactive Components Showcase** | React interaction patterns built from scratch, no UI library: timer, progress control, modal, tabs, accordion, toast notifications, image gallery, color picker, form validation with error states and a loading state, and search + filter. |

## Tech stack

- **React 19** with hooks only — no class components, no state manager.
- **Vite 7** for dev server and build (dev server on port `3000`).
- **Plain CSS** — `src/index.css`, `src/App.css` and
  `src/components/ProjectCover.css`, plus heavy use of inline styles for
  dynamic values. No CSS-in-JS, no utility framework.
- **JavaScript (`.jsx`) type-checked as JS.** There is a `tsconfig.json` with
  `strict` and `checkJs` enabled, but sources are `.jsx`, not `.tsx`; types are
  expressed through JSDoc annotations and checked via `npm run type`.
- No runtime dependencies beyond `react` and `react-dom`.

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint
npm run type      # TypeScript type-check (tsc --noEmit)
```

There is **no test suite** in this repository.

## How it is put together

- `src/main.jsx` mounts `<App />` into `#root` in `StrictMode`.
- `src/App.jsx` (~1.6k lines) holds nearly everything: the background
  animation components, the translation table, the `App` shell, and all three
  page components.
- **Routing** is a `currentPage` state variable in `App` (`'home' |
  'html-elements' | 'interactive-components'`) — there is no React Router and
  no URL changes.
- **Internationalization** is a hand-written `translations` object keyed by
  `'EN'` and `'RU'`. The active locale lives in `lang` state in `App` and the
  resolved string bundle is passed down to every page as a `t` prop.
- **Background animations** (`ParticleSystem`, `FloatingShapes`) create and
  remove DOM nodes imperatively inside `useEffect` on timers, independent of
  routing. `TrickyCube` tracks mouse position and drives a
  `requestAnimationFrame` loop.

Agent-facing conventions live in `CLAUDE.md` (architecture notes for Claude
Code) and `agents.md` (general coding-agent working rules).

## Current state / known issues

The `main` branch builds successfully, but static checks do not pass:

- **The language switcher is broken at runtime.** `setLang` is defined only
  inside `App` (`src/App.jsx:321`) but every call site sits inside the page
  components, which never receive it as a prop (`src/App.jsx:520`, `:620`,
  `:968`, `:1531`). Clicking the UFO emoji or a footer 🌐 button throws a
  `ReferenceError`, so the Russian translations are effectively unreachable.
  `npm run lint` reports this as 5 errors.
- `npm run type` reports further errors, mostly untyped component props and
  `useState({})` objects narrowed to `{}` in the form-handling code.
