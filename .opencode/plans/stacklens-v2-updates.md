# StackLens v2.0.0 — JIT Website Frontend Updates

## Status: Awaiting Implementation

---

## Phase 1: ZIP Cleanup & Organization ✅ DONE

- Created `zips/` directory at root
- Moved all extension ZIPs into `zips/`:
  - `zips/MutedHue.zip`
  - `zips/Refreshner.zip`
  - `zips/Goofanizer.zip`
  - `zips/Imageination.zip`
  - `zips/Stacklens-v1.0.0.zip` (archived v1)
  - `zips/Stacklens-v2.0.0.zip` (current v2)
- Deleted `Stacklens/Stacklens.zip` (v1 duplicate inside extension folder)

---

## Phase 2: Fix All Download Links (10 edits across 6 files)

### File: `extension.html` (5 edits)
| Line | Old | New |
|------|-----|-----|
| 248 | `href="MutedHue.zip"` | `href="zips/MutedHue.zip"` |
| 267 | `href="Refreshner.zip"` | `href="zips/Refreshner.zip"` |
| 286 | `href="Goofanizer.zip"` | `href="zips/Goofanizer.zip"` |
| 305 | `href="Imageination.zip"` | `href="zips/Imageination.zip"` |
| 324 | `href="Stacklens.zip"` | `href="zips/Stacklens-v2.0.0.zip"` |

### File: `descriptions/Stacklens.html` (1 edit)
| Line | Old | New |
|------|-----|-----|
| 137 | `href="../Stacklens.zip"` | `href="../zips/Stacklens-v2.0.0.zip"` |

### File: `descriptions/MutedHue.html` (1 edit)
| Line | Old | New |
|------|-----|-----|
| 136 | `href="../MutedHue.zip"` | `href="../zips/MutedHue.zip"` |

### File: `descriptions/Refreshner.html` (1 edit)
| Line | Old | New |
|------|-----|-----|
| 137 | `href="../Refreshner.zip"` | `href="../zips/Refreshner.zip"` |

### File: `descriptions/Goofanizer.html` (1 edit)
| Line | Old | New |
|------|-----|-----|
| 137 | `href="../Goofanizer.zip"` | `href="../zips/Goofanizer.zip"` |

### File: `descriptions/Imageination.html` (1 edit)
| Line | Old | New |
|------|-----|-----|
| 137 | `href="../Imageination.zip"` | `href="../zips/Imageination.zip"` |

---

## Phase 3: Update Version & Size Metadata (12 edits across 3 files)

### File: `index.html` (3 edits)

1. **Line 193** — Update JSON-LD description:
   - Old: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies frameworks, analytics, CDNs, security, fonts, and more."`
   - New: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies 200+ technologies including frameworks, analytics, CDNs, security, fonts, and more."`

2. **Line 194** — Update version:
   - Old: `"softwareVersion": "1.0.0"`
   - New: `"softwareVersion": "2.0.0"`

3. **Line 341** — Update card description:
   - Old: `100+ other technologies`
   - New: `200+ other technologies`

### File: `extension.html` (5 edits)

1. **Line 151** — Update JSON-LD description:
   - Old: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies frameworks, analytics, CDNs, security, fonts, and more."`
   - New: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies 200+ technologies including frameworks, analytics, CDNs, security, fonts, and more."`

2. **Line 152** — Update version:
   - Old: `"softwareVersion": "1.0.0"`
   - New: `"softwareVersion": "2.0.0"`

3. **Line 153** — Update size:
   - Old: `"size": "277 KB"`
   - New: `"size": "362 KB"`

4. **Line 318** — Update card description:
   - Old: `100+ other technologies`
   - New: `200+ other technologies`

5. **Lines 320-322** — Update card details:
   - Old: `Version: 1.0` → New: `Version: 2.0`
   - Old: `Size: 277 KB` → New: `Size: 362 KB`
   - Old: `Updated: July 2026` → New: `Updated: July 2026` (keep — same month)

### File: `descriptions/Stacklens.html` (4 edits)

1. **Line 62** — Update JSON-LD version:
   - Old: `"softwareVersion": "1.0.0"`
   - New: `"softwareVersion": "2.0.0"`

2. **Line 63** — Update JSON-LD size:
   - Old: `"size": "277 KB"`
   - New: `"size": "362 KB"`

3. **Line 130** — Update display version:
   - Old: `Version 1.0`
   - New: `Version 2.0`

4. **Line 131** — Update display size:
   - Old: `277 KB`
   - New: `362 KB`

---

## Phase 4: Rewrite Features & Content in `descriptions/Stacklens.html`

### 4a: Update JSON-LD description (Line 61)
- Old: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies frameworks, analytics, CDNs, security, fonts, and more."`
- New: `"description": "Detect, explain, and visualize the technology stack of any website. Identifies 200+ technologies including frameworks, analytics, CDNs, security, hosting, fonts, and more. Features multi-theme popup, scan history, UI/UX analysis, and technology knowledge base."`

### 4b: Update Overview paragraph (Line 146)
- Old: `StackLens is a website technology detector that reveals the full tech stack behind any webpage. With a single click, it identifies frameworks, analytics tools, CDNs, security headers, font providers, hosting infrastructure, and more. Each detected technology includes a brief explanation of what it does, so you can learn as you browse. Perfect for developers, researchers, and tech enthusiasts who want to understand how websites are built.`
- New: `StackLens v2 is a powerful website technology detector that reveals the full tech stack behind any webpage. With a single click, it identifies 200+ technologies across frameworks, analytics, CDNs, security, hosting, fonts, and more. Each detection includes a confidence score and a detailed educational explanation from its built-in knowledge base. Browse through dedicated dashboards for architecture, performance, security, and UI/UX design analysis. Features a multi-theme popup (light/dim/dark), scan history with favorites, and auto-rescan for dynamic content. Perfect for developers, researchers, and tech enthusiasts.`

### 4c: Rewrite the entire Key Features grid (Lines 149-194)

Replace the 6-item feature grid with 10 items:

1. **200+ Technology Detections** (updated from 100+)
   - Old description: `Detects frameworks (React, Vue, Angular), meta frameworks (Next, Nuxt, Gatsby), build tools (Webpack, Vite, esbuild), and more`
   - New description: `Detects 200+ technologies across 20+ categories including frameworks, meta frameworks, build tools, databases, backend runtimes, CMS platforms, and more. Signature-based detection with weighted confidence scoring.`

2. **Analytics & Ads** (keep, update description)
   - Old: `Identifies Google Analytics, Facebook Pixel, Hotjar, Mixpanel, Plausible, Matomo, and 15+ other tracking platforms`
   - New: `Identifies Google Analytics, Facebook Pixel, Hotjar, Mixpanel, Plausible, Matomo, Amplitude, Segment, and 20+ other analytics, advertising, and marketing platforms.`

3. **Hosting & CDN** (keep, update description)
   - Old: `Detects Cloudflare, AWS, Netlify, Vercel, GitHub Pages, Fastly, DigitalOcean, and other infrastructure providers`
   - New: `Detects 30+ hosting and CDN providers including Cloudflare, AWS, Netlify, Vercel, GitHub Pages, Azure, Google Cloud, DigitalOcean, Fastly, and more.`

4. **Security & Performance Analysis** (expanded)
   - Old: `Checks for HSTS, CSP headers, HTTP/3, reCAPTCHA, hCaptcha, and security frameworks`
   - New: `Analyzes security headers (CSP, HSTS, X-Frame-Options), CAPTCHA providers, HTTP/3 support, bot detection, and performance-related technologies. Dedicated Security and Performance dashboards.`

5. **UI/UX Design Analysis** (new expanded feature)
   - Old: `Detects Google Fonts, Adobe Fonts, icon libraries, and UI component frameworks like Mantine, Chakra, and Material UI`
   - New: `Extracts design system details including color palette, typography scale, font families, spacing units, border radius, box shadows, gradients, dark mode support, layout system, and animation libraries.`

6. **Smart Dashboard with Drill-Down** (expanded)
   - Old: `Organizes detected technologies into clear categories with counts, explanations, and visual indicators`
   - New: `Seven-page popup dashboard (Dashboard, Technologies, Architecture, Performance, Security, UI/UX, History) with full technology drill-down, knowledge base explanations, and confidence scores.`

7. **Architecture Detection** (new)
   - `Identifies framework architecture patterns — SPA vs SSR vs SSG, meta framework layers (Next.js on React, Nuxt on Vue), backend runtimes, and full-stack compositions with implication chains.`

8. **Scan History & Favorites** (new)
   - `Stores up to 50 past scans with domain, timestamp, and technology counts. Mark favorites for quick access, search through history, bulk delete, and re-scan any page directly from history.`

9. **Technology Knowledge Base** (new)
   - `Built-in educational content for 129 technologies. Each detected technology includes a plain-English explanation of what it does, why websites use it, and its role in the stack. Learn as you browse.`

10. **Multi-Theme Popup** (new)
    - `Three built-in themes — Light, Dim, and Dark — with persistent preference saved locally. Choose what feels best for your eyes and workflow.`

### 4d: Update "How It Works" section (Lines 197-200)
- Old: `StackLens injects a content script that scans the page on load. It analyzes DOM attributes and elements, inspects <script> and <link> tags, checks JavaScript global variables, examines HTTP response headers via chrome.webRequest, and evaluates known signatures for 100+ technologies. Results are categorized and displayed in a clean, searchable popup dashboard built with React. All analysis happens locally in your browser — nothing is sent to any server.`
- New: `StackLens injects a content script that scans the page on load and auto-rescans after 2.5 seconds to catch late-loading scripts. It analyzes DOM attributes, <script> and <link> tags, JavaScript globals, HTTP response headers via chrome.webRequest (including dynamically loaded scripts), CSS classes, meta tags, cookies, HTML comments, structured data, and storage keys. Its weighted confidence engine evaluates 200+ technology signatures across 14 detector types, with implication resolution for chained technologies. Results are displayed in a seven-page React popup dashboard with technology drill-down, knowledge base explanations, and confidence indicators. All analysis happens locally — nothing is sent to any server.`

### 4e: Update Privacy card text (optional minor update)
- Can add mention that scan history is stored only in localStorage and is user-controllable

---

## Verification Checklist

After all edits, verify:
- [ ] `extension.html` — click "Add to Chrome" for StackLens → downloads `zips/Stacklens-v2.0.0.zip`
- [ ] `descriptions/Stacklens.html` — click "Download Extension" → downloads `../zips/Stacklens-v2.0.0.zip`
- [ ] All 5 detail page download links point to correct `../zips/` paths
- [ ] `index.html` — JSON-LD shows `"softwareVersion": "2.0.0"`
- [ ] `extension.html` — catalog card shows `Version: 2.0`, `Size: 362 KB`
- [ ] `descriptions/Stacklens.html` — header shows `Version 2.0`, `362 KB`
- [ ] All "100+" changed to "200+" in descriptions
- [ ] Feature grid has 10 items with correct icons and descriptions
- [ ] ZIP files exist in `zips/` and no broken `Stacklens.zip` references remain at root
- [ ] Delete the old `Stacklens/Stacklens.zip` (already done in Phase 1)
- [ ] Run `npm run lint` if available, or manually verify HTML structure
