# Mars Attacks — Animated Project Cover

A single-page React demo app: a tongue-in-cheek "intergalactic invasion simulator"
that doubles as a playground / showcase for UI building blocks. It is a **demo and
test project** (`package.json` name is literally `demo-project`) — there is no
backend, no persistence and no product behind it. Its purpose is to give a
deliberately busy, animation-heavy surface for trying things out: markup, React
component patterns, styling, accessibility attributes and — in practice — as a
target repo for coding-agent experiments.

## What you actually see

1. **Animated cover screen** (`src/components/ProjectCover.jsx`) — 100 procedurally
   generated stars, floating UFOs, animated Mars/Earth/Saturn planets, Martian
   characters, a glitching `MARS NEEDS WIFI!` title and a typewriter subtitle.
   Nothing else renders until you click **ENTER THE MOTHERSHIP**.
2. **Home page** — hero section (`MARS ATTACKS (But First, Coffee ☕)`), three
   "alien technology" feature cards, and an *Interactive Test Zone* with four small
   self-contained widgets (dropdown simulator, text-lines toggle, click counter,
   colour toggle). The three hero buttons open a modal with a randomly picked joke
   message.
3. **HTML Elements Showcase** — seven sections walking through common markup:
   typography, lists, form controls, a table, media (`<img>`, `<figure>`,
   `<progress>`, `<meter>`), semantic elements (`<details>`, `<fieldset>`,
   `<time>`, `<blockquote>`, `<cite>`) and interactive elements.
4. **Interactive Components Showcase** — ten React patterns implemented from
   scratch, no UI library: timer, progress bar, modal, tabs, accordion, image
   gallery, colour picker, form validation with simulated async submit, search +
   filter, and toast notifications.

Three background animation layers (`ParticleSystem`, `FloatingShapes`,
`TrickyCube` — a mouse-tracking CSS 3D cube) run behind every page.

## Stack

| | |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 (`@vitejs/plugin-react`) |
| Language | JavaScript in `.jsx` files; TypeScript is used **only** for type-checking via `checkJs` + JSDoc, never for authoring `.tsx` |
| Styling | Plain CSS (`src/index.css`, `src/App.css`, `src/components/ProjectCover.css`) plus heavy inline styles for dynamic values |
| Routing | None — a `currentPage` state variable in `App` switches between `'home'`, `'html-elements'` and `'interactive-components'` |
| i18n | A hand-rolled `translations` object keyed `EN` / `RU`; the active dictionary is passed down as a `t` prop |
| Runtime deps | `react`, `react-dom` — that's it |

## Layout

```
index.html                       # meta/OG tags, mounts #root
src/main.jsx                     # createRoot + StrictMode
src/App.jsx                      # ~1650 lines: background animations, translations,
                                 #   App, the three pages and the small test widgets
src/components/ProjectCover.jsx  # the cover screen and its sub-components
src/App.css, src/index.css,
src/components/ProjectCover.css  # ~3000 lines of CSS/keyframes
CLAUDE.md, agents.md             # instructions for coding agents
.air/cloud/startup.sh            # environment bootstrap script for cloud runs
```

## Commands

```bash
npm install
npm run dev       # dev server on http://localhost:3000 (host + allowedHosts enabled)
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint
npm run type      # tsc --noEmit
```

There is no test suite.

## Known state of `main`

`npm run build` succeeds, but as of this writing both quality gates fail:

- `npm run lint` — 5 errors, all about `setLang`.
- `npm run type` — 57 errors (49 in `App.jsx`, 8 in `ProjectCover.jsx`): the same
  `setLang` problem, plus untyped component props and `useState({})` objects
  being indexed and destructured. Most of these come from `checkJs: true` +
  `strict: true` being enabled over untyped `.jsx`, so they are cosmetic rather
  than behavioural.

The `setLang` errors are a genuine runtime bug, not just lint noise: `setLang`
is declared in `App` but is referenced inside `HomePage`, `HTMLElementsPage` and
`InteractiveComponentsPage`, which never receive it as a prop. Clicking the UFO
emoji or any footer language button therefore throws a `ReferenceError` and the
EN/RU switch does not work. Fixing it means threading `lang`/`setLang` down as
props (or lifting them into context).
