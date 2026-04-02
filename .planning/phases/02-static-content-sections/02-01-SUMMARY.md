---
phase: 02-static-content-sections
plan: 01
subsystem: ui
tags: [html, css, hero, navigation, webp, picture-element, mobile-cta]

# Dependency graph
requires:
  - phase: 01-html-foundation-design-system
    provides: Design tokens (colors, spacing, typography), base component CSS (buttons, header, nav, mobile-cta-bar), HTML scaffold with section stubs
provides:
  - Sticky nav with 6 anchor links to all section IDs
  - Hero section with WebP/JPEG picture element, fetchpriority="high", dark overlay via ::after pseudo-element
  - Hero content layer (h1 + subheading + CTA) at z-index 2 above overlay
  - Mobile sticky CTA bar with tel: phone link and #contact button
  - .site-nav--open and .site-nav__link--active CSS classes for Phase 3 JS
  - img/ directory with 4 hero images (desktop/mobile, WebP/JPEG)
affects: [03-interactivity-js, 05-lighthouse-performance]

# Tech tracking
tech-stack:
  added: [cwebp (WebP conversion), Picsum Photos (placeholder images)]
  patterns:
    - "picture element with WebP source + JPEG fallback for LCP image"
    - "CSS pseudo-element (::after) for image overlay instead of extra DOM element"
    - "z-index layering: bg=0, overlay=1, content=2"
    - "100svh with 100vh cascade fallback for iOS Safari chrome-collapse prevention"
    - "Mobile nav hidden by default (display:none), .site-nav--open toggle class for Phase 3 JS"

key-files:
  created:
    - img/hero-desktop.jpg (128KB, 1200x800 JPEG)
    - img/hero-desktop.webp (102KB, 1200x800 WebP quality 80)
    - img/hero-mobile.jpg (61KB, 800x600 JPEG)
    - img/hero-mobile.webp (40KB, 800x600 WebP quality 75)
  modified:
    - index.html (nav links, hero section, mobile CTA bar)
    - css/components.css (hero CSS, nav dropdown scaffold, mobile CTA bar content CSS)

key-decisions:
  - "Used CSS ::after pseudo-element for hero dark overlay (rgba 0,0,0,0.45) — avoids extra DOM node, z-index:1 between bg image (0) and content (2)"
  - "Applied 100svh with 100vh cascade fallback — 100svh prevents iOS Safari bottom chrome from collapsing hero height"
  - "fetchpriority=high + loading=eager on hero img — LCP element needs immediate load signal for Phase 5 Lighthouse targets"
  - "Placeholder images from Picsum Photos — real estate photos to replace in Phase 4"

patterns-established:
  - "picture element pattern: WebP source (type=image/webp) before JPEG source, then img fallback"
  - "Hero z-index stack: .hero__bg(0) < .hero::after overlay(1) < .hero__content(2)"
  - "Nav hook classes: .site-nav--open and .site-nav__link--active defined in CSS, wired by JS in Phase 3"

requirements-completed: [NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04, HERO-05]

# Metrics
duration: 15min
completed: 2026-03-28
---

# Phase 2 Plan 01: Nav + Hero Summary

**Sticky nav with 6 anchor links, hero picture element (WebP/JPEG, fetchpriority=high), rgba(0,0,0,0.45) overlay via ::after, and mobile sticky CTA bar with tel: + #contact links**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-28T09:00:00Z
- **Completed:** 2026-03-28T09:15:00Z
- **Tasks:** 3
- **Files modified:** 6 (2 HTML/CSS + 4 images)

## Accomplishments

- img/ directory created with 4 hero images: desktop/mobile in WebP (cwebp q80/q75) and JPEG fallback
- Hero section replaced from placeholder stub to full picture element with WebP sources, fetchpriority="high", loading="eager", and dark overlay via .hero::after pseudo-element
- Nav populated with 6 anchor links (Dich Vu, Goi Vay, May Tinh, Du An, Quy Trinh, Dang Ky); .site-nav--open and .site-nav__link--active hook classes defined for Phase 3 JS
- Mobile sticky CTA bar populated with tel: phone button and #contact scroll anchor

## Task Commits

No git commits — per execution constraints for this plan. Files written directly to disk.

1. **Task 1: Generate placeholder hero images** - img/ directory with 4 files (128KB JPEG, 102KB WebP desktop; 61KB JPEG, 40KB WebP mobile)
2. **Task 2: Populate nav links + hero HTML + mobile CTA bar** - index.html updated with 3 targeted edits
3. **Task 3: Add hero CSS + nav mobile dropdown CSS** - css/components.css appended with hero, nav list, nav dropdown, and mobile CTA bar styles

## Files Created/Modified

- `/Users/chiendam/Dev/Projects/real_estate/img/hero-desktop.jpg` - 1200x800 JPEG placeholder (128KB)
- `/Users/chiendam/Dev/Projects/real_estate/img/hero-desktop.webp` - 1200x800 WebP quality 80 (102KB)
- `/Users/chiendam/Dev/Projects/real_estate/img/hero-mobile.jpg` - 800x600 JPEG placeholder (61KB)
- `/Users/chiendam/Dev/Projects/real_estate/img/hero-mobile.webp` - 800x600 WebP quality 75 (40KB)
- `/Users/chiendam/Dev/Projects/real_estate/index.html` - Nav links populated, hero section rewritten with picture element, mobile CTA bar content added
- `/Users/chiendam/Dev/Projects/real_estate/css/components.css` - Hero CSS block appended (min-height 100svh/100vh, ::after overlay, z-index stack, nav list, nav mobile dropdown, mobile CTA bar content rules)

## Decisions Made

- Used CSS `::after` pseudo-element for hero dark overlay rather than an explicit div — cleaner DOM, no extra element, overlay anchored to hero via `inset: 0`
- Applied `min-height: 100vh` first then `min-height: 100svh` to cascade correctly — `100svh` is the desired value but `100vh` must come first as a fallback for browsers without svh support
- `fetchpriority="high"` and `loading="eager"` explicitly set on hero img — this is the LCP element and must signal to browser to prioritize it; Phase 5 Lighthouse will validate impact
- Picsum Photos placeholder images — sufficient for layout work; real photography to replace in a later phase

## Deviations from Plan

None - plan executed exactly as written. The plan's `min-height: 100svh` CSS block had a duplicate declaration which was simplified to a clean `100vh` then `100svh` cascade without behavior change.

## Issues Encountered

None. cwebp was available at `/opt/homebrew/bin/cwebp`. Picsum Photos images downloaded successfully. All grep verification checks passed.

## Known Stubs

- `img/hero-desktop.jpg` and `img/hero-mobile.jpg` — Picsum Photos placeholder images. These flow to the hero background and will be visible to users. Intentional for Phase 2; replace with real estate photography in a later phase.
- `[Tên Tổ Chức]` in header logo and footer — organization name placeholder carried forward from Phase 1; out of scope for this plan.
- `[SĐT]` in header phone link text — phone number placeholder; out of scope for this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero section is fully structured and visually complete (pending real images)
- Nav anchor links point to all 6 section IDs already present in index.html
- `.site-nav--open` and `.site-nav__link--active` CSS hook classes are defined and ready for Phase 3 JS to toggle
- Mobile CTA bar is populated and will render at < 768px viewport
- Phase 3 (interactivity/JS) can immediately wire: hamburger toggle, nav active state on scroll, mobile CTA bar scroll behavior

---
*Phase: 02-static-content-sections*
*Completed: 2026-03-28*
