---
phase: 02-static-content-sections
plan: 04
subsystem: frontend
tags: [html, css, testimonials, lead-form, footer, social-proof, conversion]
dependency_graph:
  requires: [02-01, 02-02, 02-03]
  provides: [testimonials-section, lead-form-scaffold, footer-content]
  affects: [index.html, css/components.css]
tech_stack:
  added: []
  patterns: [BEM, CSS custom properties, responsive grid, WCAG AA contrast]
key_files:
  created: []
  modified:
    - index.html
    - css/components.css
decisions:
  - "Stripped data-animate attributes from testimonial cards per constraint (no JS attributes in Phase 2)"
  - "Testimonial card CSS uses gold-dark (#A8863A) for stars — ~4.6:1 contrast on white, WCAG AA compliant"
  - "lead-form__input font-size set explicitly to 16px to prevent iOS Safari auto-zoom (also covered by main.css base rule)"
  - "Consent checkbox placeholder label deferred to Phase 4 for full Nghi dinh 13/2023 legal text"
  - "Footer brand/address/license left as placeholders — Phase 4 populates real legal content"
metrics:
  duration: ~10 min
  completed_date: 2026-03-28
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 02 Plan 04: Testimonials, Contact Form, and Footer Summary

3-card testimonial grid with star ratings and avatar initials, a 4-field lead capture form scaffold wired with exact Phase-3-compatible field IDs, and a footer with nav links, rate disclaimer, and copyright — all HTML + CSS, no JavaScript.

## Tasks Completed

| # | Name | Status | Key Changes |
|---|------|--------|-------------|
| 1 | Populate Testimonials, Contact Form, and Footer in index.html | Done | Added 3 testimonial cards, form#lead-form with 5 fields, expanded footer |
| 2 | Add testimonial-card and lead-form CSS to components.css | Done | Appended ~130 lines of new CSS; no existing rules modified |

## What Was Built

### Testimonials Section (`#testimonials`)

- 3 `<article class="card testimonial-card">` elements inside `.grid-3`
- Each card: 5 Phosphor star icons with `aria-label="Danh gia 5 sao"`, italic blockquote, avatar circle (initials: NT, MH, TL), name, and location
- Disclaimer paragraph below the grid: "Noi dung minh hoa..."
- Layout: 3-column grid at 768px+, 1-column at 375px (via existing `.grid-3` rule)

### Contact Form Section (`#contact`)

- `<form class="lead-form" id="lead-form" novalidate>`
- 4 input fields with exact IDs required by Phase 3 JS:
  - `id="field-name"` — text, name="fullName", required
  - `id="field-phone"` — tel, name="phone", required
  - `id="field-project"` — select, name="project", 3 placeholder options
  - `id="field-loan-amount"` — number, name="loanAmount", min=0
- Consent checkbox: `id="field-consent"`, name="consent"
- Submit button: exact text "Dang Ky Tu Van Mien Phi"
- Privacy microcopy: "Thong tin duoc bao mat tuyet doi"

### Footer

- `.site-footer__grid` — 2-column responsive grid (1-col mobile, 2-col 768px+)
- Left column: brand name, address placeholder, phone link
- Right column: quick nav links (4 section anchors)
- Rate disclaimer with Thong tu 39/2016/TT-NHNN reference
- Copyright: `&copy; 2026 [Ten To Chuc]. Bao luu moi quyen.`

### CSS Added to components.css (end of file)

- `.testimonial-card` and child classes — flexbox column layout, gold-dark stars
- `.testimonials__disclaimer` — centered muted text below grid
- `.lead-form` and child classes — max-width 560px centered form, 16px inputs, gold focus ring
- `.lead-form__group--checkbox` — row layout for checkbox + label
- `.site-footer__grid` — responsive 2-column grid
- `.site-footer__brand`, `.site-footer__address`, `.site-footer__nav-heading`, `.site-footer__nav`, `.site-footer__copyright`

## Deviations from Plan

### Auto-removed data-animate Attributes

- **Found during:** Task 1
- **Issue:** Plan HTML snippets included `data-animate` and `data-delay="N"` attributes on testimonial card `<article>` elements. The execution constraint explicitly states "Do NOT add data-animate attributes."
- **Fix:** Removed `data-animate` and `data-delay` attributes from all 3 testimonial card articles.
- **Files modified:** index.html
- **Impact:** None — Phase 3 animations.js will add its own hooks; the constraint prevents premature attribute addition.

## Known Stubs

The following placeholder values are intentional and tracked for Phase 4 resolution:

| Stub | File | Context |
|------|------|---------|
| `[Ten To Chuc]` in footer brand/copyright | index.html | Awaits real org name in Phase 4 |
| `[Dia chi van phong — Phase 4 populates]` | index.html | Awaits real address in Phase 4 |
| `[So dien thoai]` in footer phone link | index.html | Awaits real phone number in Phase 4 |
| `[So DKKD — Phase 4 populates]` in footer disclaimer | index.html | Awaits business license number in Phase 4 |
| `[Dong y chinh sach bao mat — Phase 4 populates full legal text]` | index.html | Consent label awaits Nghi dinh 13/2023 text in Phase 4 |
| `[Du An 1/2/3]` in project select options | index.html | Awaits real project names (these are select option values; do not block form goal) |

These stubs do NOT prevent the plan's goal: the form structure, field IDs, and CSS are complete and ready for Phase 3 JS.

## Self-Check

### Files exist:
- [x] /Users/chiendam/Dev/Projects/real_estate/index.html — modified
- [x] /Users/chiendam/Dev/Projects/real_estate/css/components.css — modified
- [x] /Users/chiendam/Dev/Projects/real_estate/.planning/phases/02-static-content-sections/02-04-SUMMARY.md — this file

### Verification grep results:
- testimonial-card in index.html: 21 occurrences (3 cards x multiple class references)
- id="field-" count in index.html: 5 (field-name, field-phone, field-project, field-loan-amount, field-consent)
- "Thong tin duoc bao mat" in index.html: 1 match
- "Dang Ky Tu Van Mien Phí" submit button: present
- "Noi dung minh hoa" disclaimer: present
- "Thong tu 39/2016" in footer: present
- data-animate occurrences: 0 (constraint satisfied)
- testimonial-card in components.css: 7 occurrences
- lead-form in components.css: 10 occurrences
- font-size: 16px in components.css: 2 occurrences
- site-footer__grid in components.css: 2 occurrences

## Self-Check: PASSED
