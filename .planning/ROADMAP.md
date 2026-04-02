# Roadmap: Landing Page Hỗ Trợ Vay Mua Nhà

## Overview

A pure HTML/CSS/JS static landing page for a Vietnamese home loan product, deployed on Netlify. The page's sole business goal is lead generation — every phase works toward that single conversion action: the visitor submits a consultation form. Five phases take the project from bare file scaffold to a legally compliant, SEO-optimized, production-ready page.

## Milestone: v1.0

- [ ] **Phase 1: HTML Foundation + Design System** - File scaffold, CSS tokens, Netlify config
- [ ] **Phase 2: Static Content Sections** - All 8 sections as HTML/CSS, mobile-first, no JS
- [ ] **Phase 3: JavaScript Interactivity** - nav.js, calculator.js, animations.js, form.js
- [ ] **Phase 4: Form Backend + Legal Compliance** - Google Apps Script, consent, disclaimers, privacy policy
- [ ] **Phase 5: Performance Audit + SEO + Zalo** - OG tags, JSON-LD, Zalo button, Lighthouse >= 90

## Phase Details

### Phase 1: HTML Foundation + Design System
**Goal**: The file structure and visual design system are in place so every subsequent phase can write code against stable tokens, selectors, and a working Netlify deployment
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. Opening index.html in a browser shows no layout errors at 375px, 768px, and 1200px viewports
  2. All CSS custom properties (navy, gold, white, typography, spacing, shadows) are defined in :root and visually applied to a sample element
  3. Be Vietnam Pro and Montserrat fonts load without render-blocking; Vietnamese characters render correctly
  4. Phosphor Icons CDN is loaded and a test icon renders at correct size
  5. Deploying to Netlify succeeds and the netlify.toml security headers (X-Frame-Options, X-Content-Type-Options) are present in the response
**Plans**: 3 plans
Plans:
- [x] 01-01-PLAN.md — File scaffold, netlify.toml, CSS token layer (main.css, layout.css, components.css, animations.css)
- [ ] 01-02-PLAN.md — index.html semantic shell with CDN embeds and visual sample elements
- [x] 01-03-PLAN.md — Visual browser verification + Netlify security header confirmation
**UI hint**: yes

### Phase 2: Static Content Sections
**Goal**: All 8 sections of the page are fully built as static HTML and CSS — visually complete, mobile-responsive, and reviewable in a browser — without any JavaScript
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, SVC-01, SVC-02, PROD-01, PROD-02, PROD-03, PROJ-01, PROJ-02, PROC-01, PROC-02, TEST-01, TEST-02
**Success Criteria** (what must be TRUE):
  1. The sticky header is visible at the top of the viewport on scroll, with a tappable tel: phone link, at 375px width
  2. The hero CTA button ("Đăng Ký Tư Vấn Miễn Phí") is fully visible without scrolling on a 375x667px viewport
  3. All 8 sections (Hero, Services, Loan Products, Calculator placeholder, Projects, Process, Testimonials, Form placeholder) render correctly on mobile and desktop with no horizontal overflow
  4. Below-fold images use loading="lazy" with explicit width and height attributes; the hero image uses loading="eager" and fetchpriority="high"
  5. The sticky mobile CTA bar (tel: link + scroll-to-form button) appears fixed at the bottom of the screen on mobile viewports
**Plans**: 5 plans
Plans:
- [x] 02-01-PLAN.md — Navigation links + hero section (WebP image, dark overlay, mobile CTA bar)
- [x] 02-02-PLAN.md — Services section (icon cards + stats bar) + Loan Products section (gold-border cards)
- [x] 02-03-PLAN.md — Calculator HTML scaffold + Projects section (lazy images) + Process timeline
- [x] 02-04-PLAN.md — Testimonials + Contact form scaffold + Footer
- [x] 02-05-PLAN.md — Visual browser checkpoint (human verify all 8 sections at 3 breakpoints)
**UI hint**: yes

### Phase 3: JavaScript Interactivity
**Goal**: All four JS modules are wired up and functional — the nav responds to scroll, the calculator computes live mortgage payments, scroll animations play on entry, and the lead form validates and submits
**Depends on**: Phase 2
**Requirements**: CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, CALC-06, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, FORM-08, FORM-09, FORM-10
**Success Criteria** (what must be TRUE):
  1. Entering a property value, LTV %, loan term, and interest rate into the calculator instantly displays a correctly formatted monthly payment in VND (e.g., "5.234.000 ₫") with a "lãi suất tham khảo" disclaimer beneath it
  2. The loan amount calculated auto-fills the "Số tiền vay" field in the lead form
  3. Submitting the form with an invalid Vietnamese phone number shows an inline error under the phone field; the form does not submit
  4. Submitting the form with the consent checkbox unchecked is blocked; checking it and resubmitting replaces the form with an inline "Cảm ơn! Chúng tôi sẽ liên hệ trong 24h" message
  5. Scroll-reveal animations trigger on section entry and the animated stats counter counts up when the Services section enters the viewport
**Plans**: 3 plans
Plans:
- [x] 03-01-PLAN.md — nav.js (hamburger toggle + scroll-spy) + animations.js (scroll-reveal + stats counter)
- [x] 03-02-PLAN.md — calculator.js (live amortization + auto-fill) + form.js (validation + optimistic submit)
- [x] 03-03-PLAN.md — Visual browser checkpoint (human verify all 5 success criteria)
**UI hint**: yes

### Phase 4: Form Backend + Legal Compliance
**Goal**: Lead submissions flow from the browser to a Google Sheet with email notification, and every legally required element (consent, disclaimers, license number, privacy policy) is present on the page
**Depends on**: Phase 3
**Requirements**: BACK-01, BACK-02, BACK-03, LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, FOOT-01, FOOT-02
**Success Criteria** (what must be TRUE):
  1. Submitting the lead form causes a new row to appear in the connected Google Sheet within 30 seconds, and a notification email is sent to the configured address
  2. The consent checkbox is unchecked by default and blocks form submission until checked; the checkbox label links to the privacy policy text
  3. An interest rate disclaimer (Thông tư 39/2016/TT-NHNN) appears adjacent to every displayed rate and in the footer
  4. The SBV license number or business registration number is visible in the footer (Nghị định 88/2019)
  5. The Zalo floating button renders at bottom-right and does not overlap the form submit button at 375px width
**Plans**: TBD

### Phase 5: Performance Audit + SEO + Zalo
**Goal**: The page scores >= 90 on Lighthouse mobile performance, is discoverable by Vietnamese search engines and social sharing tools, and is ready to publish
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06
**Success Criteria** (what must be TRUE):
  1. Lighthouse mobile Performance score is >= 90 with no critical accessibility or best-practices failures
  2. The hero image is served as WebP under 400KB at 1200px and under 200KB at 800px; all below-fold images are lazy-loaded with explicit dimensions
  3. Sharing the page URL on Zalo or Facebook shows the correct og:title, og:description, and 1200x630 og:image preview
  4. The page HTML contains a valid JSON-LD FinancialService structured data block and a canonical link tag pointing to the live domain
  5. HTTPS is enforced on the Netlify deployment; no mixed-content warnings appear in the browser console
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. HTML Foundation + Design System | 2/3 | In Progress|  |
| 2. Static Content Sections | 5/5 | Complete | - |
| 3. JavaScript Interactivity | 2/3 | In Progress|  |
| 4. Form Backend + Legal Compliance | 0/? | Not started | - |
| 5. Performance Audit + SEO + Zalo | 0/? | Not started | - |

## Coverage

**v1 requirements:** 52 total
**Mapped:** 52/52
**Unmapped:** 0

| Phase | Requirements |
|-------|-------------|
| Phase 1 | FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07 (7 reqs) |
| Phase 2 | NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, SVC-01, SVC-02, PROD-01, PROD-02, PROD-03, PROJ-01, PROJ-02, PROC-01, PROC-02, TEST-01, TEST-02 (20 reqs) |
| Phase 3 | CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, CALC-06, FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, FORM-08, FORM-09, FORM-10 (16 reqs) |
| Phase 4 | BACK-01, BACK-02, BACK-03, LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, FOOT-01, FOOT-02 (9 reqs) |
| Phase 5 | PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06 (6 reqs) |

---
*Roadmap created: 2026-03-28*
*Milestone: v1.0*
*Granularity: Coarse (5 phases)*
