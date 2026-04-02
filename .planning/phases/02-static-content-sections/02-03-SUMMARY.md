---
phase: 02-static-content-sections
plan: "03"
subsystem: html-css
tags: [calculator, projects, process, lazy-loading, webp, accessibility]
dependency_graph:
  requires:
    - 02-01 (hero section + section scaffolding)
    - 02-02 (services, loan products, stats bar)
  provides:
    - Calculator DOM scaffold with correct input IDs for Phase 3 JS wiring
    - 3 project cards with lazy-loaded WebP images
    - 4-step process timeline with numbered bubbles
  affects:
    - Phase 3 JS (calculator.js reads calc-property-value, calc-ltv, calc-term, calc-rate)
tech_stack:
  added: []
  patterns:
    - picture/source WebP-with-JPEG-fallback lazy loading
    - prefers-reduced-motion guard on hover zoom
    - aria-live="polite" for calculator result region
    - 4-column CSS grid collapsing to single column on mobile
key_files:
  created:
    - img/project-1.jpg
    - img/project-1.webp
    - img/project-2.jpg
    - img/project-2.webp
    - img/project-3.jpg
    - img/project-3.webp
  modified:
    - index.html
    - css/components.css
decisions:
  - Removed data-animate/data-delay attributes from project cards and process steps per plan constraint (no data-animate attributes)
  - Kept font-size: 16px on .calc-form__input even though main.css already declares it on input globally — explicit rule acts as a BEM-level documentation anchor for iOS anti-zoom requirement
metrics:
  duration: ~8 minutes
  completed: 2026-03-28
  tasks_completed: 3
  tasks_total: 3
  files_modified: 2
  files_created: 6
---

# Phase 02 Plan 03: Calculator, Projects, and Process Sections Summary

Static HTML scaffold for calculator inputs (Phase 3 JS-ready), 3 lazy-loaded WebP project cards, and 4-step process timeline with navy number bubbles and Phosphor icons.

## What Was Built

### Task 1 — 3 Placeholder Project Images (WebP + JPEG)

Downloaded 3 distinct images from picsum.photos at 400x260px and converted to WebP with cwebp -q 80:

- `img/project-1.jpg` / `img/project-1.webp` — city apartment seed
- `img/project-2.jpg` / `img/project-2.webp` — townhouse seed
- `img/project-3.jpg` / `img/project-3.webp` — mid-range apartment seed

### Task 2 — index.html Section Content

**Calculator section** (`#calculator`): 4 labeled inputs with exact IDs required by Phase 3 JS:
- `#calc-property-value` (property value in VND)
- `#calc-ltv` (loan-to-value %, 10–80, step 5)
- `#calc-term` (term in years, 1–25)
- `#calc-rate` (annual interest rate, 0–30, step 0.1)

All inputs carry `aria-describedby="calc-result"`. The result area (`#calc-result`) has `aria-live="polite"` so screen readers announce updates when Phase 3 JS writes to it.

**Projects section** (`#projects`): 3 `<article class="card project-card">` elements inside `.grid-3`. Each uses `<picture>` with WebP source and JPEG fallback, `loading="lazy"`, explicit `width="400" height="260"` (prevents layout shift), ph-map-pin location icon, price, and CTA button.

**Process section** (`#process`): `<ol class="process-list">` with 4 `<li class="process-step">` elements. Each step has a navy number bubble (`.process-step__number`), a Phosphor icon (`.process-step__icon`), title, and description.

### Task 3 — CSS in components.css

Three new CSS blocks appended:

**Calculator form:** `.calc-form` (max-width 640px, centered), `.calc-form__input` with `font-size: 16px` (iOS anti-zoom), focus ring using `outline: 2px solid var(--color-navy)`. `.calc-result` with gold left-border accent.

**Project cards:** `.project-card` (padding: 0 for full-bleed image), `.project-card__image-wrapper` with `aspect-ratio: 3/2`, hover zoom (`transform: scale(1.03)`) wrapped in `@media (prefers-reduced-motion: no-preference)` guard.

**Process timeline:** `.process-list` as single-column grid on mobile, 4-column at 768px+. `.process-step__number` 48x48 navy circle with Montserrat 800 weight. `.process-step__icon` in `var(--color-gold-dark)` (passes WCAG AA on off-white background).

## Deviations from Plan

### Auto-fixed Issues

**1. [Constraint] Removed data-animate/data-delay attributes**
- **Found during:** Task 2
- **Issue:** The plan's HTML snippets included `data-animate` and `data-delay` attributes on project card `<article>` elements and process step `<li>` elements. The execution constraint explicitly states "Do NOT add data-animate attributes."
- **Fix:** Removed `data-animate` and `data-delay` from all 3 project cards and 4 process steps.
- **Files modified:** index.html
- **Impact:** None on Phase 2 (pure HTML/CSS). Phase 3 animations plan must not rely on these attributes being present — if the animations plan requires them, it will add them in that phase.

## Known Stubs

The following placeholder values exist by design — they represent real content that will be replaced when the client provides project details:

| Stub | File | Element | Reason |
|------|------|---------|--------|
| `[Tên Dự Án 1]` | index.html | `.project-card__name` | Client project name not yet provided |
| `[Tên Dự Án 2]` | index.html | `.project-card__name` | Client project name not yet provided |
| `[Tên Dự Án 3]` | index.html | `.project-card__name` | Client project name not yet provided |
| `[Quận 1, TP.HCM]` | index.html | `.project-card__location` | Client project location not yet provided |
| `[Quận Bình Thạnh, TP.HCM]` | index.html | `.project-card__location` | Client project location not yet provided |
| `[Quận Thủ Đức, TP.HCM]` | index.html | `.project-card__location` | Client project location not yet provided |
| `[3,5] tỷ` / `[5,2] tỷ` / `[2,1] tỷ` | index.html | `.project-card__price` | Client pricing not yet provided |
| Picsum placeholder images | img/project-*.jpg/webp | project card images | Actual project photos not yet provided |

These stubs do not block the plan goal. The calculator scaffold, card layout, and process timeline are fully functional HTML/CSS structures. Content population is a client data dependency, not a code deficiency.

## Verification Results

```
grep -c "loading=\"lazy\""  index.html  → 3  (project images only)
grep -c "loading=\"eager\""  index.html  → 1  (hero only)
grep -c "calc-property-value"  index.html  → 2  (label for= + input id=)
grep -c "aria-live=\"polite\""  index.html  → 1
grep -c "process-step"  index.html  → 20  (4 steps × 5 class refs each)
grep -c "calc-form"  components.css  → 5
grep -c "project-card"  components.css  → 9
grep -c "process-step"  components.css  → 5
grep -c "font-size: 16px"  components.css  → 1
```

## Self-Check: PASSED

Files verified present:
- /Users/chiendam/Dev/Projects/real_estate/img/project-1.jpg - FOUND
- /Users/chiendam/Dev/Projects/real_estate/img/project-1.webp - FOUND
- /Users/chiendam/Dev/Projects/real_estate/img/project-2.jpg - FOUND
- /Users/chiendam/Dev/Projects/real_estate/img/project-2.webp - FOUND
- /Users/chiendam/Dev/Projects/real_estate/img/project-3.jpg - FOUND
- /Users/chiendam/Dev/Projects/real_estate/img/project-3.webp - FOUND
- /Users/chiendam/Dev/Projects/real_estate/index.html - FOUND (modified)
- /Users/chiendam/Dev/Projects/real_estate/css/components.css - FOUND (modified)
- /Users/chiendam/Dev/Projects/real_estate/.planning/phases/02-static-content-sections/02-03-SUMMARY.md - FOUND (this file)
</content>
</invoke>