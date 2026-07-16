# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run type      # TypeScript type-check (tsc --noEmit)
```

There is no test suite configured.

## Architecture

This is a React 19 + Vite 7 single-page application. The project uses `.jsx` files despite having a TypeScript config — TypeScript is only used for type-checking via JSDoc annotations, not for authoring `.tsx` files.

**App entry flow:**

1. `src/main.jsx` mounts `<App />` into the DOM.
2. `App` renders `<ProjectCover>` first (the animated splash screen in `src/components/ProjectCover.jsx`).
3. After the user clicks "ENTER THE MOTHERSHIP", `showCover` flips to `false` and the main app renders.

**Client-side routing** is handled entirely via a `currentPage` state variable in `App` — there is no React Router. The three pages (`'home'`, `'html-elements'`, `'interactive-components'`) map to `<HomePage>`, `<HTMLElementsPage>`, and `<InteractiveComponentsPage>`, all defined in `src/App.jsx`.

**Internationalization** is a simple `translations` object keyed by `'EN'` and `'RU'`. The active locale is held in `lang` state and toggled by clicking the UFO emoji or the footer language button. All translated strings flow down as a `t` prop.

**Background animation components** (`ParticleSystem`, `FloatingShapes`, `TrickyCube`) imperatively append/remove DOM elements inside `useEffect` and run independently of the page routing. They mount once when `showCover` becomes `false`.

**Styling** uses per-file CSS (`App.css`, `src/components/ProjectCover.css`, `src/index.css`) alongside heavy use of inline styles for interactive/dynamic values. There is no CSS-in-JS library or utility framework.
