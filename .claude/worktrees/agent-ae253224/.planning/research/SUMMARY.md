# Project Research Summary

**Project:** Vietnamese Real Estate Home Loan Landing Page
**Domain:** Financial Services — Static Lead Generation, Vietnamese Market
**Researched:** 2026-03-28
**Confidence:** MEDIUM-HIGH overall (HIGH for tech stack and architecture; MEDIUM for legal compliance specifics and Vietnamese market UX patterns)

---

## Executive Summary

This is a single-page lead generation site for a Vietnamese bank or mortgage broker. Its sole business goal is to collect qualified leads (name, phone, project interest) and route them to a sales team. The entire page exists to earn enough trust for a Vietnamese user to hand over their phone number. Everything that does not serve that goal — complex wizards, account registration, heavy frameworks, autoplay carousels — should be cut.

The recommended approach is a zero-build-step pure HTML/CSS/JS page deployed on Netlify, using `Be Vietnam Pro` for Vietnamese typography, Phosphor Icons for iconography, CSS custom properties for the navy-and-gold design system, and Google Apps Script as the free, unlimited form backend that pushes leads directly into Google Sheets. No frameworks, no build pipeline, no jQuery. Every piece of interactivity (scroll reveal, sticky nav, calculator, form validation) is achievable with native browser APIs in under 200 lines of vanilla JS.

The two dominant risk categories are legal compliance and mobile UX. On the legal side, Vietnamese financial advertising law requires an interest-rate disclaimer, a personal data consent checkbox (Decree 13/2023), and display of the lender's SBV license number — none of these are optional. On the UX side, approximately 75% of Vietnamese internet traffic is mobile; the hero CTA must be visible at 375px width without scrolling, all form inputs must be 16px font-size to prevent iOS Safari auto-zoom, and the phone number must be visible in the sticky header as a `tel:` link at all times.

---

## Key Findings

### Recommended Stack

A well-built static landing page needs near-zero external dependencies. The browser already ships everything required: `IntersectionObserver` for scroll animations, `fetch()` for AJAX form submission, `Intl.NumberFormat('vi-VN')` for Vietnamese dong formatting, and the Constraint Validation API for form errors. Add only what the browser genuinely cannot do.

**Core technologies:**

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| Pure HTML5 + semantic elements | Document structure | No framework overhead; `lang="vi"` is required for correct screen reader and Google indexing behavior |
| CSS Custom Properties + simplified BEM | Design system | Single-source-of-truth for navy/gold tokens; flat BEM without modifiers is sufficient for one page |
| `Be Vietnam Pro` (Google Fonts) | Body + heading typography | Purpose-built for Vietnamese diacritical marks; 9 weights; professional banking aesthetic |
| `Montserrat` (Google Fonts pairing) | Hero headings only | Geometric weight conveys authority; limit to 700/800 weights only |
| Phosphor Icons v2 (CDN CSS) | UI iconography | MIT licensed; best real-estate/finance icon coverage; ~7KB per weight class; CSS-only variant needs no JS |
| Vanilla JS (IntersectionObserver) | Scroll reveal, counter animations, nav | Native API; zero KB; GPU-composited via `transform`+`opacity` only |
| Vanilla JS (fetch + FormData) | Form submission | No library required |
| Google Apps Script web app | Form backend | Unlimited free submissions; delivers leads directly to Google Sheets; sales team needs no dashboard login |
| Netlify (deploy) + `netlify.toml` | Hosting + security headers | Auto-HTTPS; CDN; security headers (`X-Frame-Options`, `X-Content-Type-Options`) via config file |
| JSON-LD `FinancialService` schema | SEO structured data | Google rich results; most specific schema type for this domain |

**Optional / conditional:**
- **Swiper.js v11 (CDN)** — add only if testimonial carousel is confirmed. Skip if static grid is acceptable.
- **Toastify-js (CDN)** — lightweight toast feedback on form submit. Can be replaced with an inline success message (preferred).
- **Formspree** — acceptable for soft-launch testing only. Will hit 50 submissions/month free-tier limit quickly during an active campaign. Migrate to GAS before launch.

**Do not add:**
- jQuery — no use case on this page
- Bootstrap or any CSS framework — custom CSS keeps payload lean
- AOS / GSAP / ScrollMagic — IntersectionObserver replaces all of these
- Chart.js — calculator needs arithmetic, not charts

---

### Expected Features

**Must have (table stakes — users leave without these):**

| Feature | Notes |
|---------|-------|
| Loan calculator (vanilla JS) | Live calculation on every `input` event; standard amortizing formula `M = P*[r(1+r)^n]/[(1+r)^n-1]`; display monthly payment in large type; add "lai suat tham khao" disclaimer |
| Lead capture form — 3-4 fields | Ho ten, So dien thoai, Du an quan tam, So tien vay. No more. Phone before email. |
| Mobile-responsive layout at 375px | Mobile-first CSS; hero CTA visible without scrolling; sticky bottom CTA bar |
| Sticky nav with phone `tel:` link | Phone number always visible in header; one-tap call on mobile |
| Zalo contact button | Expected on every Vietnamese sales page; deeplink to Zalo OA |
| Bank partner logos | Institutional trust signal; static images are fine |
| Process steps section (3-5 steps) | Reduces anxiety about loan complexity |
| Privacy consent checkbox | Required by Decree 13/2023 — unchecked by default, must be checked to submit |
| Interest rate disclaimer | Required by Circular 39/2016/TT-NHNN |
| HTTPS (enforced) | Netlify provides automatically; mandatory for financial forms |

**Should have (differentiators that increase conversion):**

| Feature | Notes |
|---------|-------|
| Calculator auto-prefills loan amount in form | Single JS event; reduces friction significantly |
| Animated stats counter on scroll | "500+ khach hang", "1200 ty dong da giai ngan" — IntersectionObserver triggers count-up |
| Testimonials with specific loan outcomes | "Vay 2.1 ty, duyet trong 7 ngay, can ho Vinhomes Grand Park" — specificity is trust |
| Inline form validation on blur | Show error beneath the field; scroll to first error on submit |
| Post-submit success state (inline) | Replace form with "Cam on! Lien he trong 24h" — no redirect |
| OG / social meta tags (`vi_VN` locale) | Zalo share previews require `og:locale = vi_VN` and 1200x630 OG image |

**Defer to v2+:**

- Multi-project filtering / search
- Blog / SEO content pages
- Admin dashboard or CRM integration
- Full loan application wizard (income docs, CCCD)
- Account registration or login
- Live chat queue system (Zalo deeplink covers this use case at v1)
- Google Reviews embed widget
- Countdown urgency timer (only add if a genuine promotion date exists)

---

### Architecture Approach

Use separate files — not a single monolithic HTML file. The page has 8 sections, a JS calculator, form validation, scroll animations, and a sticky nav. A single file becomes unmaintainable beyond ~4 sections. Browser caching of separate CSS/JS files also significantly improves repeat-visit performance.

**Recommended file structure:**

```
/
├── index.html
├── netlify.toml
├── css/
│   ├── main.css          # :root tokens, reset, typography
│   ├── layout.css        # Section spacing, grid, container
│   ├── components.css    # Cards, buttons, form, nav, footer
│   └── animations.css    # .reveal states, @media prefers-reduced-motion
├── js/
│   ├── nav.js            # Sticky header, mobile menu, active link
│   ├── calculator.js     # Mortgage calculation, live input binding
│   ├── animations.js     # IntersectionObserver scroll reveal + counters
│   └── form.js           # Validation, GAS AJAX POST, success state
└── img/
    ├── hero.webp / hero.jpg
    └── [project images]
```

**Major components and responsibilities:**

| Component | File | Key Pattern |
|-----------|------|-------------|
| Sticky nav | `js/nav.js` | `requestAnimationFrame` ticking on scroll; `aria-expanded` on mobile toggle |
| Scroll reveal | `js/animations.js` | `IntersectionObserver`; add `.is-visible` once, then `unobserve`; animate only `transform`+`opacity` |
| Loan calculator | `js/calculator.js` | Live `input` event binding; `Intl.NumberFormat('vi-VN')` for VND output; prefill form on result change |
| Lead form | `js/form.js` | Blur validation; Vietnamese phone regex `/^(0[35789])\d{8}$/`; GAS fetch with `mode:'no-cors'` + optimistic UI |
| Design tokens | `css/main.css` | All navy/gold/white values in `:root`; never hardcode hex values in components |
| Animations | `css/animations.css` | `@media (prefers-reduced-motion: reduce)` block sets `opacity:1; transform:none; transition:none` |

**Key HTML constraints:**
- `<html lang="vi">` — required
- `<main>` wraps all sections; one per page
- Each `<section>` has `aria-labelledby` pointing to its `<h2>`
- All `<script>` tags use `defer`
- Hero image: `loading="eager"` + `fetchpriority="high"` (it is the LCP element — never lazy-load it)
- All other images: `loading="lazy"` + explicit `width` and `height` to prevent CLS

---

### Critical Pitfalls

**Legal (CRITICAL — ship blockers):**

1. **No personal data consent checkbox** — Decree 13/2023/ND-CP requires explicit consent before collecting name and phone. Add a required, unchecked checkbox: "Toi dong y cho [ten to chuc] thu thap va xu ly thong tin ca nhan theo Chinh sach bao mat." Link to a minimal privacy policy. Pre-ticking is non-compliant. Penalty: up to VND 100 million.

2. **Interest rate shown without disclaimer** — Circular 39/2016/TT-NHNN requires disclosure of rate conditions. Any displayed rate (e.g., "lai suat tu 6.5%/nam") must be accompanied by: promotional period, what the rate adjusts to afterward, and the reference rate basis. Add a disclaimer line near the rate and in the footer. Never use "lai suat thap nhat thi truong" without a verifiable source.

3. **No SBV license number displayed** — Decree 88/2019 requires financial advertising to reference the operating license of the lending institution. If the page is for a broker (not the bank directly), display both the broker's business registration number and the partner bank's license. Do not imply you are the bank if you are a broker.

**Mobile UX (HIGH — conversion killers):**

4. **Form inputs below 16px font-size on mobile** — iOS Safari auto-zooms any `<input>`, `<select>`, or `<textarea>` with font-size below 16px. This snaps the layout sideways and the user rarely recovers to submit. Set `font-size: 16px` on all form inputs unconditionally.

5. **Hero CTA below the fold on 375px viewport** — designing at 1440px then testing at 375px typically pushes the CTA button off-screen. The primary CTA must be visible without any scrolling on iPhone SE dimensions. Keep hero height content-fit on mobile, not `100vh`. Add a sticky bottom CTA bar as a secondary capture path.

6. **Gold text on white background** — `#C9A84C` on `#FFFFFF` produces a contrast ratio of ~2.9:1, which fails WCAG AA (requires 4.5:1). Use gold only on dark navy backgrounds, or use white text on a gold button. Never gold text on white.

**Performance (HIGH — affects SEO and bounce rate):**

7. **Unoptimized hero image** — a raw Unsplash JPEG at original resolution is 3-6MB. On Vietnam's 3G/4G mobile connections, this is an 8-15 second blank screen. Export hero at 1920px max, WebP format, under 400KB. Use `srcset` for a separate 800px mobile version.

8. **Render-blocking Google Fonts** — default Google Fonts embed is render-blocking. Use `rel="preconnect"` for both Google domains and add `&display=swap` to the font URL. Request only 2 weights (400 + 700).

**Form UX (HIGH):**

9. **No post-submit success state** — GAS with `mode:'no-cors'` cannot confirm server receipt. Use optimistic UI: show an inline success message immediately on submit; never redirect to a blank page or let nothing happen. Duplicate submissions are worse than optimistic success.

10. **Form placed only at the bottom** — place the primary lead form at the bottom AND add a hero-section CTA that scrolls to it (or opens a modal). Mobile users who don't scroll past section 3 will never see a bottom-only form.

---

## Implications for Roadmap

### Suggested Phase Structure

#### Phase 1: HTML Foundation + Design System
**Rationale:** Everything else depends on the HTML structure and CSS token layer. Getting semantic markup, `lang="vi"`, section IDs, and `:root` custom properties right first prevents rework. This is the lowest-risk phase — all patterns are well-documented with zero market uncertainty.
**Delivers:** `index.html` shell with all 8 sections scaffolded; `css/main.css` with complete design token layer (navy/gold/white palette, typography, spacing scale); `netlify.toml` with security headers; Google Fonts and Phosphor Icons loaded correctly.
**Addresses:** Typography (Be Vietnam Pro), color compliance (WCAG contrast), semantic HTML, `lang="vi"`, responsive viewport meta.
**Avoids:** Gold-on-white contrast failure; render-blocking fonts; missing viewport meta; missing `lang` attribute.

#### Phase 2: Static Content Sections (Visual Build)
**Rationale:** Build all sections that require no JS — Hero, Services intro, Loan products, Project listings, Process steps, Testimonials — as static HTML/CSS. This produces a shippable visual page early and keeps JS integration isolated to later phases. Catching layout and mobile-responsiveness issues on static content is far faster than debugging them after JS is wired up.
**Delivers:** All 8 sections rendered at both 375px mobile and 1200px desktop; sticky nav (CSS `position:sticky` + mobile menu toggle); hero image optimized (WebP + srcset + `fetchpriority="high"`); all below-fold images `loading="lazy"`; bank partner logos; testimonials with placeholder specifics.
**Addresses:** Mobile-first layout, hero CTA visibility at 375px, tap target sizes (44px min), horizontal scroll prevention, image performance.
**Avoids:** CTA below fold on mobile; unoptimized hero image; horizontal scroll breaking trust; auto-play carousel hero.

#### Phase 3: JavaScript Interactivity
**Rationale:** Add all JS in one phase after static layout is verified — this isolates bugs to JS, not HTML/CSS. All four JS modules are independent and can be built in parallel, but should be tested in integration together.
**Delivers:** `js/nav.js` (rAF-throttled scroll detection, mobile menu, active link via IntersectionObserver); `js/animations.js` (scroll reveal with `prefers-reduced-motion` guard, stats counter); `js/calculator.js` (live amortization calculator, VND formatting, form prefill on result change); `js/form.js` (blur validation with Vietnamese phone regex, GAS AJAX POST, inline success state).
**Uses:** Native `IntersectionObserver`, `fetch`, `Intl.NumberFormat('vi-VN')`, `requestAnimationFrame`.
**Avoids:** jQuery, AOS, Chart.js, Bootstrap; animating layout-triggering CSS properties; unthrottled scroll listeners; auto-zoom on iOS from sub-16px inputs.

#### Phase 4: Form Backend + Legal Compliance Layer
**Rationale:** The form backend (GAS) and legal compliance elements (consent checkbox, disclaimers, privacy policy) are grouped together because neither can go live without the other. Compliance is a ship-blocker — the page must not be published without it.
**Delivers:** Google Apps Script endpoint publishing leads to Google Sheets with email notification; consent checkbox (unchecked, required); interest rate disclaimer text; SBV license reference in footer; privacy policy text (minimal modal or inline); footer legal block; "Thong tin duoc bao mat" micro-copy adjacent to form submit button.
**Addresses:** Decree 13/2023 personal data consent; Circular 39/2016 rate disclaimer; Decree 88/2019 license display; Law on Advertising 2012 superlative claims.
**Avoids:** CORS surprise on GAS (use `mode:'no-cors'` + optimistic UI, documented pattern); Formspree 50/month limit (GAS is unlimited free).

#### Phase 5: Performance Audit + SEO + Zalo Integration
**Rationale:** Final pass before launch. Performance, SEO, and social sharing are polish — they cannot be done until content is final, but they must be done before publishing.
**Delivers:** OG meta tags (`og:locale = vi_VN`, 1200x630 OG image); JSON-LD `FinancialService` structured data; `canonical` URL; Zalo Chat floating button (bottom-left, tested for non-overlap with form submit at 375px); sticky mobile CTA bar (fixed bottom, `tel:` link + "Dang ky ngay" scroll anchor); final Lighthouse pass targeting 90+ Performance score; HTTPS confirmed on Netlify.
**Avoids:** Floating Zalo button overlapping form submit on mobile; missing `vi_VN` locale breaking Zalo/Facebook share previews; tracking pixels in `<head>` without `async`/`defer`.

---

### Phase Ordering Rationale

- **Foundation first:** CSS tokens must exist before any component can use them; HTML structure must be finalized before JS selectors are written.
- **Static before dynamic:** Verifying layout at 375px and 1200px on static content takes minutes; doing the same after JS complexity is added takes significantly longer.
- **JS isolated:** All four JS files are independent (no shared state beyond DOM). Building them in one phase reduces context-switching.
- **Backend + legal together:** GAS setup is ~15 minutes of work; the legal layer is non-negotiable. Bundling them prevents the pattern of "we'll add the disclaimer later" — which in financial services means never.
- **Polish last:** Performance and SEO depend on final content. Running Lighthouse before images and copy are finalized produces misleading scores.

---

### Research Flags

**Phases likely needing deeper research during planning:**

- **Phase 4 (GAS + Legal):** The CORS workaround for Google Apps Script (`mode:'no-cors'`) is well-documented but requires testing in the deployment environment. GAS deployment URLs also change on redeploy — confirm team workflow for URL management. Legal text should be reviewed by a Vietnamese-licensed legal professional before publishing; research findings are MEDIUM confidence.
- **Phase 5 (Zalo integration):** Zalo OA deeplink format and embed script should be verified against current Zalo developer documentation before implementation. Zalo API changes are not infrequent.

**Phases with standard patterns (research-phase not needed):**

- **Phase 1 (Foundation):** CSS custom properties, BEM, Google Fonts embed — all fully documented, zero ambiguity.
- **Phase 2 (Static sections):** Semantic HTML5, image optimization patterns — HIGH confidence, MDN-sourced.
- **Phase 3 (JS modules):** IntersectionObserver, amortization formula, Intl.NumberFormat — all HIGH confidence, standard web APIs.

---

## Open Questions (Must Answer Before or During Build)

These were not resolvable from training knowledge alone and require real answers before the corresponding section is built.

| Question | Blocks | How to Resolve |
|----------|--------|----------------|
| Is the client a direct bank, or a mortgage broker/agent? | Phase 4 legal layer | Determines which license numbers to display and whether "partnership" framing is needed |
| What is the actual SBV license number or business registration number? | Phase 4 | Client provides |
| What interest rate will be advertised, and what is the promotional period? | Phase 2 hero copy | Client provides; disclaimer text cannot be written without this |
| Which real estate projects is the lender supporting? | Phase 2 project section | Determines project card content, photos, price ranges |
| Does the client have a Zalo Official Account? What is the OA ID/phone? | Phase 5 | Client provides |
| What phone number should appear in the header? (1800-XXXX free, or local?) | Phase 2 | Client provides |
| What Google Sheet should GAS write leads to? Who has access? | Phase 4 | Client provides |
| Are there real testimonials with customer permission to publish? | Phase 2 | Client provides; placeholder testimonials should never ship |
| What is the final domain name? | Phase 5 (canonical, OG URLs) | Client provides before launch |
| Should the privacy policy be a modal, an inline section, or a separate page? | Phase 4 | Team decision; modal is simplest for static site |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core technologies are native web platform or stable CDN libraries with MDN documentation |
| Architecture | HIGH | File structure, HTML semantics, CSS patterns all sourced from MDN and Netlify docs |
| Mortgage formula + calculator JS | HIGH | Standard financial math; `Intl.NumberFormat` vi-VN is a stable browser API |
| Form backend (GAS mechanics, CORS) | HIGH | Well-documented GAS limitation; CORS workaround is a known pattern |
| Mobile UX pitfalls | HIGH | iOS input zoom, tap targets, CLS — reproducible, verifiable behaviors |
| Vietnamese market UX patterns | MEDIUM | Drawn from known Vietnamese bank site patterns as of mid-2025; should be spot-checked against 3-5 live competitor pages |
| Legal / compliance (Decree 13, Circular 39, Decree 88) | MEDIUM | Law citations are plausible and consistent with known Vietnamese regulatory framework, but not independently verified via live legal sources. Must be reviewed by a licensed Vietnamese legal professional before publishing. |
| CTA copy recommendations | MEDIUM | Regional CRO literature and inference; A/B testing would validate |
| Vietnamese phone number regex | MEDIUM | Prefix list (03x, 05x, 07x, 08x, 09x) was accurate as of mid-2025; verify against current VNPT/Viettel/Mobifone prefix allocations |

**Overall confidence:** MEDIUM-HIGH

The technical decisions (stack, architecture, formulas) are HIGH confidence and ready to build against. The market-specific patterns and legal details are MEDIUM confidence and should be validated before final copy is written.

### Gaps to Address

- **Vietnamese market validation:** Before finalizing hero headline, section order, and CTA copy, review 3-5 live competitor loan landing pages (VPBank home loan, Techcombank, BIDV, any Vinhomes affiliate page) to confirm section ordering and messaging patterns are current.
- **Legal text review:** Interest rate disclaimer, privacy policy, and consent checkbox wording must be reviewed by a Vietnamese legal professional. The research provides a structural framework, not final legal text.
- **Zalo OA integration:** Zalo developer documentation for OA chat button embed format must be checked at implementation time — Zalo's platform evolves and training knowledge may be outdated.
- **GAS quota behavior:** GAS free-tier quotas (20,000 calls/day) should be verified in the Google Workspace documentation at setup time.

---

## Section-by-Section Build Notes

| Section | Key Implementation Detail | Critical Constraint |
|---------|--------------------------|---------------------|
| **Nav** | `position:sticky; top:0` — must have `top:0` or sticky won't activate. rAF-throttled scroll listener. `aria-expanded` on mobile toggle. | Phone `tel:` link always visible in header |
| **Hero** | Static background image with dark overlay (`rgba(0,0,0,0.45)` gradient). `fetchpriority="high"` on `<img>`. Hero height: content-fit on mobile, not `100vh`. | CTA must be in first viewport at 375x667 |
| **Services intro** | 3-4 icon+text cards. Phosphor Icons CSS variant. Scroll-reveal with stagger delay. | |
| **Loan products** | Cards with gold left-border accent. Key numbers: LTV %, rate, term. Rate must include disclaimer text. | Disclaimer adjacent to displayed rate |
| **Loan calculator** | 4 inputs: property value, LTV %, term, rate. Live recalculation on `input`. Monthly payment in large type (32-40px). Prefills loan amount field in form. Add "lai suat tham khao" notice. | 16px font-size on all `<input>` elements |
| **Project listings** | Property cards: photo (WebP + lazy), project name, location, price range, CTA. Limit to 3-6 projects for v1. | Images: explicit `width`+`height` to prevent CLS |
| **Process steps** | 3-5 numbered steps with Phosphor icons. Scroll-reveal. Simple, no interactivity needed. | |
| **Testimonials** | 3 testimonial cards with: avatar (Vietnamese faces), abbreviated name, district+city, loan outcome quote, star rating. Use Swiper only if carousel is confirmed; otherwise a 3-column grid is simpler and faster. | No generic placeholder testimonials at launch |
| **Lead form** | 3-4 fields: Ho ten, So dien thoai (required, tel:), Du an, So tien vay (pre-filled from calculator). Consent checkbox (unchecked). Submit: "Dang ky tu van mien phi". Inline success state. Privacy micro-copy below submit. | Consent checkbox required by Decree 13/2023; 16px input font-size; single-column layout on mobile |
| **Footer** | Company name, SBV license number, physical address, phone, Zalo link, copyright. Legal disclaimer paragraph. | SBV license display required by Decree 88/2019 |

---

## Sources

### Primary (HIGH confidence)
- MDN Web Docs — IntersectionObserver, position:sticky, img loading, defer/async, Constraint Validation API, CSS Custom Properties, scroll-padding-top
- Netlify Forms documentation — data-netlify attribute, honeypot field, AJAX submission pattern
- schema.org/FinancialService — structured data type selection
- WCAG 2.1 AA — contrast ratio requirements (4.5:1 normal text, 3:1 large text)
- Standard amortizing mortgage formula — financial mathematics

### Secondary (MEDIUM confidence)
- Google Fonts — Be Vietnam Pro Vietnamese subset support (verified against known font specs)
- Phosphor Icons v2 — icon coverage and CDN URL
- Google Apps Script — CORS behavior on web app deployments (well-known, widely documented limitation)
- Formspree — free-tier submission limits (50/month as of mid-2025)
- Vietnamese banking regulations — Circular 39/2016/TT-NHNN, Decree 13/2023, Decree 88/2019, Law on Advertising 2012

### Tertiary (MEDIUM — validate before use)
- Vietnamese mobile number prefix allocations (03x/05x/07x/08x/09x) — accurate as of mid-2025
- Vietnamese BDS market UX patterns — competitor site observations, not independently verified
- Zalo OA integration format — should be checked against current Zalo developer docs
- CTA copy conversion data ("mien phi" outperforms generic "gui") — regional CRO inference, not A/B test data

---

*Research completed: 2026-03-28*
*Ready for roadmap: yes*
