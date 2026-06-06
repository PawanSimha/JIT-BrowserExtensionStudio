# Product Requirement Document (PRD)

## Project Name: MutedHue
**Version:** 1.0.0  
**Status:** Implemented  
**Type:** Google Chrome Extension (Manifest V3)

---

## 1. Executive Summary & Problem Statement

### 1.1 Objective
Build a lightweight, seamless Chrome extension that overrides the browser's default text-selection highlight color.

### 1.2 Problem Statement
Chrome's default selection highlight is a vivid blue (or site-specific bright color) that can be jarring and visually distracting for users who browse extensively.

### 1.3 Solution
**MutedHue** overrides all text-selection backgrounds globally with a subtle, adaptive grey — `rgba(211,211,211,0.2)` on light pages, `rgba(211,211,211,0.12)` on dark pages.

---

## 2. Product Scope & Requirements

### 2.1 Functional Requirements

| ID | Requirement | Description | Priority |
|---|---|---|---|
| **FR-01** | Global Selection Override | Grey highlight applies to all URLs (`<all_urls>`) via `::selection`. | P0 |
| **FR-02** | Color Overriding | `!important` flags override site-specific selection styles. | P0 |
| **FR-03** | Adaptive Luminance | Detects page background brightness; switches between light (0.2 alpha) and dark (0.12 alpha) rules. | P0 |
| **FR-04** | Early Injection | CSS + JS injected at `document_start` to prevent blue flash. | P1 |
| **FR-05** | Dynamic DOM | `MutationObserver` + `attachShadow` patch covers SPAs and web components. | P1 |

### 2.2 Non-Functional Requirements

| ID | Requirement | Specification | Priority |
|---|---|---|---|
| **NFR-01** | Architecture | Chrome Extension Manifest V3. | P0 |
| **NFR-02** | Performance | Zero blocking time; CSS-only injection. | P0 |
| **NFR-03** | Privacy | Zero data collection. No permissions required. | P0 |

---

## 3. Technical Architecture & File Structure

```
MutedHue/
├── manifest.json    # Extension config (MV3)
├── content.css      # Static selection override stylesheet
├── content.js       # Selection override + luminance adaptation + Shadow DOM
└── icons/
    └── MutedHue.png # Extension icon
```

### 3.1 Technical Approach

- **CSS Injection via Manifest:** `content.css` declared in `content_scripts` — Chrome applies rules during initial parsing.
- **CSS Specificity:** `::selection` uses `!important` to guarantee priority over site-specific styles.
- **Luminance Detection:** Samples computed `document.body.backgroundColor` → weighted luminance formula → selects light (`0.2` alpha) or dark (`0.12` alpha) rule.
- **Shadow DOM:** `Element.prototype.attachShadow` monkey-patch injects styles into every open shadow root.

---

## 4. Edge Cases & Constraints

- **Google Docs & Canvas Editors:** Faux-selection layers not affected. Documented limitation.
- **Very Dark Backgrounds:** `color: inherit !important` ensures legibility.
- **Browser UI Elements:** `chrome://` pages and extension management screens cannot be injected.
- **Closed Shadow DOM:** `attachShadow({ mode: 'closed' })` cannot be accessed.
- **Chrome PDF Viewer:** Third-party extensions cannot inject into Chrome's internal PDF viewer.

---

## 5. Success Metrics & KPIs

- **Functional Success:** Selection override works on top 50 domains.
- **Performance Success:** 0ms blocking time.
- **User Satisfaction:** Zero complaints on color contrast.
