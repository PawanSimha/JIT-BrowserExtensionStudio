# Comprehensive JIT Project Audit — Execution Plan

## Overview

Multi-agent audit of all 60+ project files completed. Found **3 critical**, **9 high**, **7 medium**, **4 low** issues. Organized into 10 implementation phases.

---

## Phase 1: Fix Broken ZIP Download Links

**Files:** `extension.html`, `descriptions/*.html` (6 files)
**Severity:** CRITICAL — all non-StackLens downloads will 404

### Problem
ZIPs were moved to `zips/` with versioned names (`MutedHue-v1.0.0.zip`), but download links still point to non-versioned names (`MutedHue.zip`).

### Action: Update 8 hrefs to match actual filenames

| File | Line | Old | New |
|------|------|-----|-----|
| `extension.html` | 248 | `zips/MutedHue.zip` | `zips/MutedHue-v1.0.0.zip` |
| `extension.html` | 267 | `zips/Refreshner.zip` | `zips/Refreshner-v1.0.0.zip` |
| `extension.html` | 286 | `zips/Goofanizer.zip` | `zips/Goofanizer-v1.0.0.zip` |
| `extension.html` | 305 | `zips/Imageination.zip` | `zips/Imageination-v1.0.0.zip` |
| `descriptions/MutedHue.html` | 136 | `../zips/MutedHue.zip` | `../zips/MutedHue-v1.0.0.zip` |
| `descriptions/Refreshner.html` | 137 | `../zips/Refreshner.zip` | `../zips/Refreshner-v1.0.0.zip` |
| `descriptions/Goofanizer.html` | 137 | `../zips/Goofanizer.zip` | `../zips/Goofanizer-v1.0.0.zip` |
| `descriptions/Imageination.html` | 137 | `../zips/Imageination.zip` | `../zips/Imageination-v1.0.0.zip` |

---

## Phase 2: Fix fonts.css — Google Sans Weight Mismatch

**File:** `fonts.css`
**Severity:** CRITICAL — font rendering issue

### Problem
Lines 24, 32, 40: Google Sans weights **400**, **500**, and **700** all point to the **exact same woff2 URL**. This means:
- `font-weight: 500` renders as faux-bold (browser-synthesized) on weight 400 glyphs
- `font-weight: 700` renders as faux-bold on weight 400 glyphs
- No true medium or bold typeface is loaded

### Action
Replace with correct distinct woff2 URLs for each weight. The correct gstatic CDN URL pattern is:
- Weight 400: `.../googlesans/v69/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjIUvQ.woff2`
- Weight 500: Needs a URL with `wght@500` parameter (different hash)
- Weight 700: Needs a URL with `wght@700` parameter (different hash)

**Need to source correct URLs** from Google Fonts API or CDN.

### Secondary: Google Sans Text weight 700
Line 56: No weight 700 declared for `Google Sans Text`. If used anywhere with `font-weight: 700`, it will faux-bold. Add it if needed.

---

## Phase 3: Fix .gitignore

**File:** `.gitignore`
**Severity:** HIGH — ZIPs may be accidentally untracked

### Problem
Lines 39-44: Exception rules reference root-level ZIPs that no longer exist:
```
*.zip
!MutedHue.zip          ← doesn't exist at root
!Refreshner.zip         ← doesn't exist at root
!Goofanizer.zip         ← doesn't exist at root
!Imageination.zip       ← doesn't exist at root
!Stacklens.zip          ← doesn't exist at root
```

### Action
Replace with rules that track versioned ZIPs in `zips/`:
```gitignore
# Extension ZIPs (tracked — needed for website downloads)
!zips/MutedHue-v1.0.0.zip
!zips/Refreshner-v1.0.0.zip
!zips/Goofanizer-v1.0.0.zip
!zips/Imageination-v1.0.0.zip
!zips/Stacklens-v2.0.0.zip
!zips/Stacklens-v1.0.0.zip
```
Also add: `Stacklens/.wxt/`, `Stacklens/typecheck/`, `Stacklens/version/` for WXT build artifacts.

---

## Phase 4: Update README.md and PRD.md

**Files:** `README.md`, `PRD.md`
**Severity:** HIGH — documentation out of date

### README.md changes
| Line | Current | Should Be |
|------|---------|-----------|
| 59 | `StackLens` ... `1.0.0` | `StackLens` ... `2.0.0` |
| 56 | `Refreshner` ... `2.0` | `Refreshner` ... `2.0.0` (semver consistency) |
| 163 | `Hero JIT.webp` (space in filename) | `Hero-JIT.webp` (rename file or keep with note) |
| Various | Ensure all descriptions reflect v2 | Update StackLens feature descriptions |

### PRD.md changes
| Line | Current | Should Be |
|------|---------|-----------|
| 88 | `StackLens ... Shipped (v1.0.0)` | `StackLens ... Shipped (v2.0.0)` |
| 5 | `Target release: Q2 2026` | `Target release: Q2 2026` (keep — original plan) |
| 7 | `Status: Active Development` | `Status: Active Development` (keep) |
| 208-209 | `->` arrows | `→` for consistency with other flows |

---

## Phase 5: Fix style.css Hardcoded Hex Colors

**File:** `style.css`
**Severity:** MEDIUM — violates design system rules

### Replace hardcoded colors with CSS custom properties

| Line | Current | Replace With |
|------|---------|-------------|
| 97 | `color: #fff;` | `color: var(--text-1);` |
| 159 | `color: #fff;` | `color: var(--text-1);` |
| 161 | `background: #3367d6;` | `background: var(--g-blue);` (darker variant, may need new var) |
| 241 | `color: #fff;` | `color: var(--text-1);` |
| 249 | `background: #3367d6;` | `background: var(--g-blue);` |
| 297-298 | `#000` in mask gradients | Use `var(--bg-0)` |
| 796 | `color: #fff;` | `color: var(--text-1);` |
| 798 | `background: #3367d6; border-color: #3367d6;` | Use `var(--g-blue)` |
| 1193 | cookie accept background | Use var fallback correctly |

**Note:** Some of these use `#3367d6` which is a darker shade of Google Blue (`#4285F4`). May need a new `--g-blue-dark` variable, or accept the hardcoded hover state as intentional.

---

## Phase 6: Fix og:image:alt on All 5 Detail Pages

**Files:** `descriptions/MutedHue.html`, `Refreshner.html`, `Goofanizer.html`, `Imageination.html`, `Stacklens.html`
**Severity:** MEDIUM — accessibility/metadata accuracy

### Problem
All 5 detail pages use `og:image:alt` text like `"MutedHue logo"`, `"Refreshner logo"`, etc. BUT the `og:image` URL points to `Logo.webp` (the JIT brand logo), not an extension-specific logo. So the alt text is misleading.

### Action
Change all 5 `og:image:alt` lines (around line 42 in each file) from:
```html
<meta property="og:image:alt" content="EXTENSION_NAME logo" />
```
to:
```html
<meta property="og:image:alt" content="JIT brand logo" />
```

---

## Phase 7: Balance Feature Grids — Conciseness

**File:** `descriptions/Stacklens.html`
**Severity:** MEDIUM — user request to match others' verbosity

### Current state
| Extension | Feature Count |
|-----------|--------------|
| MutedHue  | 5 |
| Refreshner | 6 |
| Goofanizer | 6 |
| Imageination | 7 |
| **StackLens** | **10** |

### Action
Reduce StackLens features from 10 to 7 by combining related items:

| # | Current (10 items) | Proposed (7 items) |
|---|-------------------|-------------------|
| 1 | 200+ Technology Detections | **200+ Technology Detections** (keep) |
| 2 | Analytics & Ads | **Analytics, Ads & Marketing** (merge with existing) |
| 3 | Hosting & CDN | **Hosting, CDN & Architecture** (merge with Architecture) |
| 4 | Security & Performance Analysis | **Security & Performance Analysis** (keep) |
| 5 | UI/UX Design Analysis | **UI/UX Design Analysis** (keep) |
| 6 | Architecture Detection | *(merged into #3)* |
| 7 | Smart Dashboard with Drill-Down | **Smart Dashboard with Drill-Down** (keep) |
| 8 | Scan History & Favorites | **Scan History & Favorites** (keep) |
| 9 | Technology Knowledge Base | *(mention in overview, not feature item)* |
| 10 | Multi-Theme Popup | *(merge into dashboard feature)* |

This brings it to **7 features** — matching Imageination's count exactly.

Also consider adding 1 more feature to MutedHue to balance upward:
- Current MutedHue: 5 — could add "Shadow DOM Support" as a separate feature (currently embedded in how-it-works)

---

## Phase 8: Fix Refreshner Version Consistency

**Files:** `index.html`, `extension.html`, `descriptions/Refreshner.html`
**Severity:** MEDIUM — inconsistent version formatting

### Problem
Manifest says `2.0.0` but website uses `"2.0"` (missing patch number).

| File | Line | Current | Should Be |
|------|------|---------|-----------|
| `index.html` JSON-LD | 140 | `"2.0"` | `"2.0.0"` |
| `extension.html` JSON-LD | 86 | `"2.0"` | `"2.0.0"` |
| `descriptions/Refreshner.html` JSON-LD | 62 | `"2.0"` | `"2.0.0"` |
| `extension.html` visible | 263 | `Version: 2.0` | `Version: 2.0` (keep for display — readable) |
| `descriptions/Refreshner.html` visible | 130 | `Version 2.0` | `Version 2.0` (keep for display) |

**Note:** Only JSON-LD needs fixing to `"2.0.0"` for schema accuracy. Visible display can stay as `2.0`.

---

## Phase 9: Minor Fixes

### 9a. sitemap.xml — Imageination lastmod
- Line 36: Change `2026-06-23` to `2026-07-01` for consistency (or verify the actual date)

### 9b. site.webmanifest — PWA icons
- Add `"purpose": "any maskable"` to both icon entries
- Keep using Logo.webp (acceptable for now)

### 9c. Refreshner/index.html — JSON-LD author url
- Line 42: Add `"url": "https://portfolio-pawansimha.vercel.app"` to author object

### 9d. Refreshner/index.html — aria-label
- Line 152: Change `aria-label="Menu"` to `aria-label="Toggle navigation menu"`

### 9e. Delete stale test file
- Remove `Imageination/test-media.html` (4.6 KB test artifact)

### 9f. Clean up StackLens build artifacts
- `Stacklens/typecheck/` and `Stacklens/version/` — ensure they're gitignored

---

## Phase 10: SEO/GEO/AEO Enhancements

### 10a. Answer Engine Optimization (AEO)
Add AI-assistant-friendly structured data by including `@graph` context on detail pages (currently only single-item JSON-LD). Helps ChatGPT, Gemini, Perplexity extract accurate extension info.

**Files:** All 5 detail pages — wrap existing JSON-LD in a `@graph` with `@context`, add `author` Person node.

### 10b. Add missing `"@context"` to JSON-LD (minor)
Some JSON-LD blocks use implicit context. Ensure all explicitly include `"@context": "https://schema.org"`.

Check: `index.html` (has it at line 117), `extension.html` (has it), but detail pages and 404.html (lines 54-77, 29-37) — verify.

### 10c. Author name audit — all verified consistent ✅
**No issues found.** `Pawan Simha R` is used consistently across:
- All HTML meta author tags
- All JSON-LD author objects
- README.md, PRD.md, PRIVACY.md, LICENSE, CONTEXT.md
- All detail pages, index, extension, 404 pages

### 10d. AI Discoverability
- robots.txt already has excellent AI crawler separation ✅
- Consider adding `<link rel="author" href="...">` or `rel="me"` for Google's E-E-A-T signals
- Add copyright year note in footer metadata

---

## Summary of All Changes by File

| File | Changes |
|------|---------|
| `extension.html` | Fix 4 ZIP hrefs (Phase 1), Fix Refreshner JSON-LD version (Phase 8) |
| `index.html` | Fix Refreshner JSON-LD version (Phase 8) |
| `descriptions/Stacklens.html` | Fix ZIP href (Phase 1), Fix og:image:alt (Phase 6), Rebalance features to 7 (Phase 7) |
| `descriptions/MutedHue.html` | Fix ZIP href (Phase 1), Fix og:image:alt (Phase 6) |
| `descriptions/Refreshner.html` | Fix ZIP href (Phase 1), Fix og:image:alt (Phase 6), Fix JSON-LD version (Phase 8) |
| `descriptions/Goofanizer.html` | Fix ZIP href (Phase 1), Fix og:image:alt (Phase 6) |
| `descriptions/Imageination.html` | Fix ZIP href (Phase 1), Fix og:image:alt (Phase 6) |
| `fonts.css` | Fix Google Sans 500/700 woff2 URLs (Phase 2) |
| `.gitignore` | Fix ZIP exception rules, add WXT artifacts (Phase 3) |
| `README.md` | Update StackLens to v2.0.0, fix Refreshner semver (Phase 4) |
| `PRD.md` | Update StackLens to v2.0.0 (Phase 4) |
| `style.css` | Replace hardcoded hex colors with CSS vars (Phase 5) |
| `sitemap.xml` | Fix Imageination lastmod date (Phase 9a) |
| `site.webmanifest` | Add `purpose: any maskable` (Phase 9b) |
| `Refreshner/index.html` | Add author url, fix aria-label (Phase 9c/d) |
| `Imageination/test-media.html` | Delete stale file (Phase 9e) |
| All 5 detail pages | AEO JSON-LD enhancement (Phase 10) |

---

**Ready to implement these 10 phases when you give the go-ahead.**
