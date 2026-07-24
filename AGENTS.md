# JIT — Agent Guide

## Key Structure

- **Website**: Zero-build static site. HTML5 + CSS3 + Vanilla JS (IIFE strict mode). No `package.json` at root. Just open HTML files in a browser — no dev server, no build step.
- **5 Chrome MV3 extensions** in their own directories: `MutedHue/`, `Refreshner/`, `Goofanizer/`, `Imageination/`, `Stacklens/`.
- **Stacklens/** is the only subproject with npm — uses WXT (React 19 + TypeScript + Tailwind + Zustand).

## Website Conventions (DO NOT GUESS)

- **No JS frameworks or CDN dependencies** — vanilla JS only. FormSubmit (form action URL) is the sole external service.
- **No build step, no npm, no dev server** — don't run `npm install` or `npm run dev` at root.
- **CSS**: All colors via custom properties (`var(--g-blue)`, `var(--text-2)`). Never hardcode hex values (exceptions: `_headers`, `fonts.css`, `404.html`).
- **Typography**: Always `clamp()` for font-size, line-height, spacing. Use `rem` for text, `px` for borders. Never `em` for font-size.
- **Class naming**: lowercase-hyphenated (`.header-brand-text`, `.ext-card`). No camelCase CSS classes.
- **Media queries**: Mobile-first — `<560px`, `<640px`, `<768px`, `≥769px`, `≥1440px`.
- **No em dashes (—) in HTML body** — use commas or hyphens instead.
- **No `!important`** except `::selection` in extension content scripts.
- **Headers/footers are inlined** in every HTML page — do not extract into partials or use JS fetch.
- **No analytics, tracking, or telemetry**.

## Website Deployment

- Hosted on GitHub Pages. Push to `main` branch — no build step, flat HTML at root.
- Security headers served via `_headers` (CSP, HSTS, X-Frame-Options, Permissions-Policy).
- SEO via `robots.txt`, `sitemap.xml`, per-page JSON-LD and canonical URLs.

## Extension Downloads

- ZIPs live in `zips/` with versioned names (`MutedHue-v1.0.0.zip`, `Stacklens-v2.0.0.zip`, etc.).
- `.gitignore` ignores `*.zip` except the 5 tracked versioned ZIPs in `zips/`.

## StackLens (WXT/React/TypeScript)

Only project with npm dependencies. Commands (run from `Stacklens/`):

| Command | Purpose |
|---------|---------|
| `npm install` | Install deps (first time) |
| `npm run dev` | WXT dev server with hot reload |
| `npm run build` | Build to `dist/extension/` |
| `npm run zip` | Package `.zip` for distribution |
| `npm run lint` | ESLint on `src/` |
| `npm run format` | Prettier on `src/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | `vitest run` |

- Config: `wxt.config.ts` (output: `dist/extension/`, module: `@wxt-dev/module-react`)
- Build artifacts in `.gitignore`: `Stacklens/.wxt/`, `Stacklens/typecheck/`, `Stacklens/version/`
- Prettier: semicolons, single quotes, trailing commas, 2-space indent, 100 print width, LF endings.

## Extension Patterns Quick Reference

| Extension | Permissions | Popup? | Service Worker? | Notes |
|-----------|-------------|--------|-----------------|-------|
| MutedHue | *none* | No | No | `run_at: document_start`, shadow DOM monkeypatch |
| Refreshner | storage, alarms, notifications, tabs | Yes | Yes | `chrome.alarms` scheduling, keyword matching |
| Goofanizer | debugger, storage, tabs, activeTab, downloads, windows | Yes | Yes | Chrome Debugger API (not Firefox-compatible) |
| Imageination | activeTab, downloads, storage | Yes | Yes | Dual-tab popup (Media + Color Picker), EyeDropper API, ZIP batch download, 50-entry color history |
| StackLens | storage, activeTab, webRequest, tabs | Yes | Yes | WXT build, `chrome.webRequest` (not Firefox-compatible) |

## Reference

- `CONTEXT.md` — authoritative architectural state map with detailed conventions and anti-patterns
- `README.md` — project overview, tree, and quick start
- `PRD.md` — product requirements
- `PRIVACY.md` — zero-collection privacy policy
