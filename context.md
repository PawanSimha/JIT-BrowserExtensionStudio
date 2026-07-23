# JIT — Browser Extension Studio · Context Map

---

## 1. System Overview & Strategic Intent

**What it is:** JIT is a small studio brand with a marketing website and five Chrome Manifest V3 extensions. The website serves as landing page, extension showcase, developer portfolio, and contact gateway. The extensions (MutedHue, Refreshner, Goofanizer, Imageination, StackLens) are privacy-first tools that do one thing well.

**Who it's for:** End-users who want minimal, respectful browser extensions. Developers evaluating open-source Chrome extension patterns.

**Core operational goals:**
- Zero data collection across all surfaces (website + extensions)
- Static-first website — no backend, no build step, deployable by pushing to any static host
- Extensions that require no accounts, no sign-ups, no telemetry
- Brand presence with Google-inspired dark UI design system

---

## 2. Production Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| **Markup** | HTML5 | — | Semantic HTML5, aria-labels, JSON-LD structured data |
| **Styling** | CSS3 (custom design system) | — | 30+ custom properties, `clamp()` fluid typography, CSS Grid, 5 breakpoints |
| **Font** | Google Sans / Google Sans Text | woff2 | Self-hosted `@font-face` declarations via `fonts.css` from gstatic CDN |
| **Logic** | Vanilla JavaScript (ES6) | — | IIFE strict mode, `IntersectionObserver`, `MutationObserver`, `localStorage` |
| **Forms** | FormSubmit.io | — | Serverless POST, forwards to pawansimha.pc@gmail.com |
| **Icons** | Inline SVG + Unicode symbols | — | No icon library dependency |
| **Chrome Ext** | Manifest V3 | MV3 | content_scripts, service_worker (`background.js`), action popup |
| **Hosting** | GitHub Pages | — | Static HTML at root, no build step |
| **Security** | `_headers` (GitHub Pages) | — | CSP, HSTS, X-Frame-Options, Permissions-Policy |
| **SEO** | robots.txt + sitemap.xml + JSON-LD | — | AI crawler separation, 7-node `@graph` schema |

---

## 3. Core Architectural Design Patterns

### Website (Static Site)
- **Rendering paradigm:** Pure static (no SSR, no SSG framework). Served as flat HTML/CSS/JS.
- **Routing:** File-based, manual. `index.html` = home, `extension.html` = extensions catalog with download, `descriptions/MutedHue.html`, `descriptions/Refreshner.html`, `descriptions/Goofanizer.html`, `descriptions/Imageination.html`, and `descriptions/Stacklens.html` = extension detail pages. In-page anchor navigation (`#about`, `#faq`, etc.) via native `scroll-behavior: smooth`.
- **Extension download flow:** Click "Add to Chrome" on `extension.html` or "Download Extension" on detail pages -> downloads ZIP file -> install modal appears with step-by-step "Load unpacked" guide for Chrome Developer mode.
- **State management:** None. No frameworks, no stores, no reactive state. Cookie consent preference persisted in `localStorage` key `jit_cookie_consent`.
- **Data flow (contact form):** Browser → POST to FormSubmit.io → email to pawansimha.pc@gmail.com. No database, no storage on our end.
- **Header/Footer:** Inlined directly in each HTML page (no partials, no JS fetch). Both pages share identical nav/footer markup.
- **Scroll reveal:** `IntersectionObserver` with `threshold: 0.08`, adds `.visible` class, unobserve after reveal.
- **FAQ accordion:** Single-open pattern. Closes other items on open, manages `aria-expanded`.

### MutedHue Extension (MV3)
- **Pattern:** Content script injection (`run_at: document_start`). No popup, no background service worker.
- **Logic:** Injects a `<style data-mutedhue>` element into the page. Switches between light/dark `::selection` rules based on computed background luminance. Uses `MutationObserver` on `<html>` attributes for theme changes, and monkeypatches `Element.prototype.attachShadow` to inject into shadow DOMs.
- **Permissions:** None (no `permissions` key in manifest).

### Refreshner Extension (MV3)
- **Pattern:** Background service worker + content script + popup. State persisted via `chrome.storage.local`.
- **Background (`background.js`):** Event-driven message router. Handlers: `startRefresh`, `stopRefresh`, `getState`, `pageReady`, `keywordMatch`. Uses `chrome.alarms` for scheduling tab refreshes. Computes fixed or random intervals. Notifies via `chrome.notifications` on keyword match.
- **Content script (`content.js`):** Scans page text for keywords on load, reports back to background via `chrome.runtime.sendMessage`. Plays audio alert on match.
- **Popup (`popup.html/popup.js/popup.css`):** Light-themed UI with Work Sans font, custom scrollbar, and brand header logo. Timer UI with countdown ring (SVG `stroke-dashoffset` animation), interval preset chips, keyword input, hard-refresh toggle, status indicator. Square layout with sticky header/footer and scrollable content area.
- **Permissions:** `storage`, `alarms`, `notifications`, `tabs`. Host permissions: `<all_urls>`.

### StackLens Extension (MV3)
- **Pattern:** Content script + popup + background service worker. Built with WXT (React 19 + TypeScript + Tailwind + Zustand + react-router v7).
- **Logic:** Injects a content script that scans on load and auto-rescans after 2.5s for late-loading scripts. Analyzes DOM attributes, `<script>`/`<link>` tags, JavaScript globals, HTTP response headers via `chrome.webRequest`, CSS classes, meta tags, cookies, HTML comments, structured data, and storage keys. Weighted confidence engine evaluates 200+ technology signatures across 14 detector types with implication resolution.
- **Popup:** Seven-page React dashboard (Dashboard, Technologies, Architecture, Performance, Security, UI/UX, History) with technology drill-down, knowledge base explanations, confidence scores, and multi-theme support (light/dim/dark).
- **History:** Stores up to 50 past scans with favorites, search, bulk delete, and re-scan.
- **Logo system:** 214 technology logos via SimpleIcons CDN with Clearbit + initials fallback.
- **Permissions:** `storage`, `activeTab`, `webRequest`, `tabs`. Host permissions: `<all_urls>`.
- **Version:** 2.0.0 (consistent across `package.json`, `wxt.config.ts`, built manifest, and popup footer).

### Imageination Extension (MV3)
- **Pattern:** Content script + dual-tab popup + background service worker. Dual-mode: Media Downloader and Color Picker.
- **Content script (`content.js`):** Scans page DOM for all media sources — `<img>`, `<picture>`/`<source>`, inline `<svg>` (serialized to data URLs via XMLSerializer), `<link rel="icon">`, CSS `background-image` (via getComputedStyle), `<video>` (sources + posters), and `<audio>` elements. Deduplicates by normalized URL. Categorizes into 21 format groups (PNG, JPEG, JPG, WebP, SVG, GIF, AVIF, ICO, MP4, WebM, MOV, FLV, MP3, M4A, WAV, OGG, AAC, WebA) plus 3 meta-categories (Favicon, Video, Audio).
- **Popup (`popup.html/popup.js/popup.css`):** 520x540px dark theme. Two-tab layout (Media + Colors) with tab bar. Media tab: left sidebar (115px) lists categories with counts, right panel shows 2-column scrollable grid of cards with thumbnail, filename, dimensions, type badge, and Download button. Colors tab: EyeDropper API integration, HEX/RGB display with swatch, copy buttons, persistent history list (up to 50 entries, deduped, per-item copy/delete, clear all).
- **Background (`background.js`):** Service worker with 5 message handlers — `downloadImage` (single file), `saveColor`, `loadColors`, `clearColors`, `removeColor` (color history CRUD via `chrome.storage.local`).
- **Batch download:** Pure-JS `ZipWriter` (CRC-32, store method) built in popup context. Fetches media blobs via extension host permissions, packages into valid ZIP, downloads via `chrome.downloads.download`. 50MB per-file cap. Skips CORS-restricted or failed fetches gracefully.
- **Permissions:** `activeTab`, `downloads`, `storage`. Host permissions: `<all_urls>`.
- **Version:** 2.0.0 (manifest, website, ZIP all consistent).

---

## 4. Folder Architecture & Mapping

```
JIT/
├── index.html                  # Main landing page — hero, about, extensions, FAQ, developer, contact, footer
├── extension.html              # Extensions catalog — all extensions listed with details + download + install modal
├── 404.html                    # Branded error page — dark theme, Google Sans, "Back to Home" CTA
│
├── style.css                   # Design system (~1140 lines) — 30+ custom properties, clamp() typography,
│                               # CSS Grid layout, 5 mobile-first breakpoints, micro-interactions,
│                               # scroll reveal, cookie banner, custom scrollbar, install modal, ext-detail
├── fonts.css                   # Google Sans / Google Sans Text @font-face declarations from gstatic CDN
├── script.js                   # Vanilla JS IIFE — scroll reset, hamburger toggle, FAQ accordion,
│                               # IntersectionObserver reveal, contact form submit, cookie consent, install modal
│
├── Logo.webp                  # Brand logo — used in nav (36px), about section (300px), footer (44px),
│                               # favicon (32/192/180), apple-touch-icon, OG image, JSON-LD image
├── Hero JIT.webp              # README hero / banner image
│
├── MutedHue/                   # Chrome Extension MV3 — adaptive text selection color replacer
│   ├── manifest.json           #   content_scripts matches <all_urls>, run_at document_start
│   ├── content.css             #   ::selection override rules (light + dark via @media)
│   ├── content.js              #   Luminance detection, style injection, MutationObserver, Shadow DOM
│   └── icons/MutedHue.png      #   Extension icon (same asset used for all sizes 16-128)
│
├── Refreshner/                 # Chrome Extension MV3 — smart auto-refresh + keyword page monitor
│   ├── manifest.json           #   background service_worker, action popup, 4 permissions
│   ├── background.js           #   Alarm scheduler, message router, notification dispatcher
│   ├── content.js              #   Page text scanner, keyword matching, audio alert trigger
│   ├── popup.html              #   Timer UI with countdown ring, interval chips, keyword input
│   ├── popup.js                #   Tab state management, countdown animation, chip/input handlers
│   ├── popup.css               #   Glassmorphism popup design, ring progress bar, responsive layout
│   ├── index.html              #   Standalone landing page for Refreshner (separate branding)
│   └── icons/Refreshner.png    #   Extension icon
│
├── Goofanizer/                 # Chrome Extension MV3 — responsive device switcher
│   ├── manifest.json           #   debugger, storage, tabs, activeTab, downloads, windows
│   ├── background/             #   service-worker.js — debugger attach, emulation, screenshot, ZIP
│   ├── popup/                  #   popup.html/popup.js/popup.css — device cards, controls, export
│   ├── utils/                  #   devices.js — 4 device presets (Android, iPhone, Tablet S, iPad Pro)
│   └── assets/                 #   Icon.png, Android-OS.svg, Apple-IOS.svg, Tablet.svg
│
├── Imageination/               # Chrome Extension MV3 — media scanner + color picker
│   ├── manifest.json           #   activeTab, downloads, storage, host_permissions all_urls
│   ├── background.js           #   Service worker — 5 handlers: downloadImage, saveColor, loadColors, clearColors, removeColor
│   ├── content.js              #   Full page scan: img, picture, svg, icon, bg, video, audio
│   ├── popup.html              #   Dual-tab layout (Media + Colors), 520x540px
│   ├── popup.js                #   ZipWriter, batch download, EyeDropper color picker, 50-entry history
│   ├── popup.css               #   Dark theme, 2-column grid, tab bar, slide-in animations
│   ├── fonts/                  #   PressStart2P-Regular.woff2 (retro pixel font for title)
│   └── icons/icon.png          #   Extension icon (300x300, 32-bit ARGB)
│
├── Stacklens/                   # Chrome Extension MV3 — website technology stack detector
│   ├── manifest.json           #   storage, activeTab, webRequest, tabs, host_permissions all_urls
│   ├── dist/extension/         #   WXT build output — background.js, popup.html, content-scripts/, chunks/
│   ├── src/                    #   React + TypeScript source — pages, stores, utils, knowledge base, 227 fingerprints
│   ├── public/icons/           #   StackLens.png source asset
│   └── icons/StackLens.png     #   Extension logo (used by website for cards and detail pages)
│
├── zips/                       # Extension download ZIPs
│   ├── MutedHue-v1.0.0.zip
│   ├── Refreshner-v1.0.0.zip
│   ├── Goofanizer-v1.0.0.zip
│   ├── Imageination-v1.0.0.zip
│   ├── Imageination-v2.0.0.zip
│   ├── Stacklens-v1.0.0.zip
│   └── Stacklens-v2.0.0.zip
│
├── descriptions/               # Extension detail pages
│   ├── MutedHue.html           #   Full MutedHue detail page with logo, features, how-it-works, privacy, install guide
│   ├── Refreshner.html         #   Full Refreshner detail page with logo, features, how-it-works, privacy, install guide
│   ├── Goofanizer.html         #   Full Goofanizer detail page with logo, features, how-it-works, privacy, install guide
│   ├── Imageination.html       #   Full Imageination detail page with logo, features, how-it-works, privacy, install guide
│   └── Stacklens.html          #   Full StackLens detail page with logo, features, how-it-works, privacy, install guide
│
├── PRD.md                      # Product Requirements Document — personas, OKRs, MoSCoW, user journeys
├── README.md                   # Documentation — badges, tech stack, project tree, quick start, roadmap
├── PRIVACY.md                  # Privacy policy — zero-collection, functional cookies, FormSubmit, GDPR/CCPA
├── LICENSE                     # GNU General Public License v3.0 — full text with copyright header
│
├── robots.txt                  # AI crawler directives — search bots allowed, training scrapers blocked
├── sitemap.xml                 # SEO sitemap — 7 URLs (/ at 1.0, /extension.html at 0.8, descriptions/* at 0.6)
├── site.webmanifest            # PWA manifest — name, theme_color, icons (192 + 512)
├── _headers                    # Security headers — HSTS, CSP, X-Frame-Options, Permissions-Policy
├── .gitignore                  # Ignores — OS files, editor configs, env secrets, stale partials, ZIP exceptions
└── context.md                  # THIS FILE — architectural state map for session continuity
```

---

## 5. Engineering Guardrails & Anti-Patterns

### Style Conventions
- **Typography:** Always use `clamp()` for font-size, line-height, and spacing. Minimum 3 values: `clamp(min, preferred, max)`.
- **Color:** All colors must reference CSS custom properties from `:root` (e.g., `var(--g-blue)`, `var(--text-2)`). Never hardcode hex/rgba values inline except in `_headers`, `fonts.css`, or isolated components like `404.html`.
- **Units:** Use `rem` for text sizing, `px` for borders/outlines, `vw/vh` for viewport-relative spacing, `%` for fluid widths. Never use `em` for font-size (compound scaling risk).
- **Naming:** BEM-lite. Class names are lowercase-hyphenated (e.g., `.header-brand-text`, `.footer-social`, `.ext-card`). No camelCase CSS classes.
- **Media queries:** Mobile-first. Breakpoints: `<560px` (small phone), `<640px` (cookie banner), `<768px` (tablet), `≥769px` (laptop/desktop), `≥1440px` (ultra-wide).
- **JS:** Strict mode IIFE `(function () { 'use strict'; ... })();`. Variables declared with `const` (preferred) or `let` (when reassigned). No `var`. No global namespace pollution.

### Strict Anti-Patterns
- **Do NOT add JavaScript frameworks or libraries** — no React, Vue, Alpine, jQuery, etc. Vanilla JS only.
- **Do NOT use external npm/CDN dependencies** for functionality. Only Google Fonts (via `fonts.css` self-hosted `@font-face`) and FormSubmit (form action URL) are allowed.
- **Do NOT add a build step** — no Webpack, Vite, Parcel, etc. This is a zero-build static site.
- **Do NOT use em dashes (—) in HTML body content.** Use commas or hyphens instead. CSS comments and markdown files are exempt.
- **Do NOT add analytics, tracking pixels, or telemetry** to the website. The cookie banner explicitly states "no tracking or analytics cookies."
- **Do NOT revert to external partial loading** (header/footer via JS fetch). The header/footer are inlined directly in each HTML page to support `file://` protocol and offline use.
- **Do NOT use `<link rel="preconnect">` without `crossorigin` for cross-origin font resources.**
- **Do NOT add server-side code** — PHP, Node.js, Python, etc. The site is 100% static. FormSubmit handles the only dynamic operation.
- **Do NOT use `!important`** in CSS except for `::selection` in extension content scripts (where it's required to override page styles).

---

## 6. Active Session State & Milestone Checklist

### `[x]` Completed Features (Milestones Reached)
- `[x]` Initial repo setup + first commit (June 6, 2026)
- `[x]` Google-inspired dark theme design system (`style.css`: 30+ custom properties, `clamp()` fluid typography, CSS Grid)
- `[x]` Floating pill navigation bar (glassmorphism, responsive, hamburger on mobile)
- `[x]` Hero section with aurora gradient + wave animation (4 colors, equal split, animated `background-position`)
- `[x]` About section (3-column grid on desktop, logo between text and features on mobile)
- `[x]` Extensions section (5 cards: MutedHue, Refreshner, Goofanizer, Imageination, StackLens)
- `[x]` FAQ accordion (8 questions, single-open, aria-expanded management)
- `[x]` Developer section (7-link grid, full-width Portfolio button)
- `[x]` Contact form (FormSubmit.io, serverless POST, disabled-on-submit UX)
- `[x]` Footer (logo + brand text side-by-side, email, social links, 3-column product/company/legal)
- `[x]` Extension catalog page (`extension.html`) with version/size details and Chrome Web Store links
- `[x]` JSON-LD structured data (7-node `@graph`: Organization + Person + 5× SoftwareApplication)
- `[x]` Open Graph + Twitter Card meta tags (full set on all HTML pages)
- `[x]` SEO/GEO meta tags (keywords, robots, canonical, googlebot directives)
- `[x]` Favicon set (32, 192, apple-touch-icon 180) + `site.webmanifest`
- `[x]` Preload critical assets (Logo.webp, Google Sans woff2 files, fonts.css)
- `[x]` `robots.txt` with 2026 AI crawler separation (search allowed, training scrapers blocked)
- `[x]` `sitemap.xml` (7 URLs with priority + lastmod)
- `[x]` `_headers` with security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- `[x]` `404.html` branded error page (dark theme, Google Sans, "Back to Home" button)
- `[x]` Cookie consent banner (localStorage, Accept/Decline, visible on first visit only)
- `[x]` `PRIVACY.md` (GDPR/CCPA compliant, zero-collection, FormSubmit disclosure)
- `[x]` `LICENSE` (GNU GPLv3) + per-file copyright headers
- `[x]` `PRD.md` (problem statement, personas, MoSCoW, OKRs, technical constraints)
- `[x]` `.gitignore` (OS files, editor configs, env secrets, stale partials, ZIP exceptions)
- `[x]` Custom scrollbar (black track, Google Blue dragger, Firefox `scrollbar-color`)
- `[x]` Width/height attributes on all images (CLS prevention)
- `[x]` `aria-label` on all icon-only links and interactive controls
- `[x]` `:focus-visible` outlines enhanced per element type
- `[x]` MutedHue extension (content script, luminance detection, Shadow DOM support)
- `[x]` Refreshner extension (background service worker, alarm scheduler, keyword monitoring, popup UI)
- `[x]` Extension detail pages (all 5: MutedHue, Refreshner, Goofanizer, Imageination, StackLens) with full features, privacy, and install guide
- `[x]` ZIP download + install modal flow for Chrome Developer mode installation
- `[x]` "Learn More" links on index.html linking to detail pages
- `[x]` Structured feature cards, privacy card, and numbered install steps on detail pages
- `[x]` sitemap.xml updated with 7 URLs
- `[x]` JSON-LD structured data on extension detail pages (SoftwareApplication schema)
- `[x]` Responsive breakpoints for ext-detail, feature-grid, install-steps on mobile
- `[x]` Refreshner version consistency (manifest 2.0.0, website 2.0.0)
- `[x]` Site Audit — 0 issues remaining
- `[x]` Goofanizer extension (responsive device switcher, debugger API, 4 device presets, screenshot/export)
- `[x]` Goofanizer detail page, catalog card, JSON-LD, sitemap integration
- `[x]` Imageination extension (media scanner, sidebar popup, 21-type categorization, ZipWriter batch download)
- `[x]` Imageination detail page, catalog card, JSON-LD, sitemap integration
- `[x]` Imageination v2.0.0 upgrade — color picker with EyeDropper API, persistent 50-entry history, dual-tab popup (Media + Colors), background service worker with 5 handlers, storage permission, retro pixel font
- `[x]` StackLens extension v1.0.0 (website technology stack detector, 100+ detections, WXT/React/Tailwind)
- `[x]` StackLens detail page, catalog card, JSON-LD, sitemap integration
- `[x]` StackLens v2.0.0 upgrade — 200+ detections, 14 detector types, weighted confidence engine, 129 knowledge base entries, 7-page dashboard, auto-rescan, multi-theme, scan history, UI/UX analysis, tech logos
- `[x]` ZIPS reorganization — moved all ZIPs to `zips/` with versioned names, removed root-level duplicates
- `[x]` Comprehensive multi-perspective audit — 0 critical/high issues
- `[x]` Stacklens icons cleanup — deleted 9 unused files, kept only StackLens.png
- `[x]` Audit fix: gitignore rules corrected for zips/ tracking and WXT artifacts
- `[x]` Audit fix: 4 junk OLD icon files deleted from MutedHue, Imageination, Goofanizer
- `[x]` fonts.css fix: Google Sans consolidated to single variable font (weight range 300-700)
- `[x]` style.css: removed 8 instances of hardcoded hex colors, replaced with CSS custom properties
- `[x]` og:image:alt corrected on all 5 detail pages
- `[x]` StackLens detail page: features reduced to 7 concise items
- `[x]` README.md & PRD.md updated for StackLens v2.0.0
- `[x]` Refreshner JSON-LD version normalized to 2.0.0
- `[x]` 404.html: og:image:alt corrected
- `[x]` sitemap.xml: Imageination lastmod date unified
- `[x]` site.webmanifest: added purpose field to PWA icons
- `[x]` Deleted stale `Imageination/test-media.html`
- `[x]` Refreshner standalone page: author.url added to JSON-LD
- `[x]` Beinghuman rewrite applied to README.md, CONTEXT.md, PRD.md, and all 5 HTML detail page Overview sections

### `[/]` In-Progress Workloads
- `[/]` GitHub Pages activation (requires manual click in repo settings)

### `[ ]` Upcoming Implementations (Next Steps)
- `[ ]` Deploy live at `https://pawansimha.github.io/JIT/`
- `[ ]` Submit MutedHue, Refreshner, Goofanizer, Imageination, and StackLens to Chrome Web Store
- `[ ]` Firefox WebExtension port for MutedHue and Refreshner (Goofanizer excluded — uses Chrome-specific debugger API; StackLens excluded — uses Chrome-specific webRequest)
- `[ ]` Add Privacy Policy / Terms of Service as dedicated HTML pages (footer links currently point to `PRIVACY.md`)
- `[ ]` Set up custom FormSubmit thank-you redirect page
- `[ ]` Add PWA service worker for offline caching
