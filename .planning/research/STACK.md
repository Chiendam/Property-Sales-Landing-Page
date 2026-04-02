# Technology Stack

**Project:** Vietnamese Bank / Home Loan Landing Page (Pure HTML/CSS/JS)
**Researched:** 2026-03-28
**Confidence:** MEDIUM — based on training knowledge (cutoff Aug 2025); web verification was unavailable. All CDN URLs and version numbers should be spot-checked before use.

---

## 1. CSS Architecture for a Single Large HTML File

**Recommendation: CSS Custom Properties + simplified BEM naming**

For a single-file static page, a full BEM methodology creates unnecessary verbosity. Use BEM's block-element pattern without modifiers at the file level, combined with CSS custom properties for all design tokens.

### Structure (order of `<style>` sections)

```
1. :root — all custom properties (tokens)
2. CSS reset / base (box-sizing, margin, font)
3. Typography scale
4. Layout utilities (container, grid, flex helpers)
5. Components (nav, hero, cards, form, footer) — BEM blocks
6. Utilities (text-center, visually-hidden, etc.)
7. Media queries (mobile-first, consolidated at the bottom)
```

### Custom Properties Pattern

```css
:root {
  /* Colors */
  --color-navy:        #0D2B5E;
  --color-navy-dark:   #091D42;
  --color-navy-light:  #1A3A7A;
  --color-gold:        #C9A84C;
  --color-gold-light:  #E2C47A;
  --color-gold-dark:   #A8863A;
  --color-white:       #FFFFFF;
  --color-off-white:   #F7F5F0;
  --color-text:        #1A1A2E;
  --color-text-muted:  #5A6278;
  --color-border:      #DDD8CC;

  /* Typography */
  --font-heading:      'Be Vietnam Pro', 'Montserrat', sans-serif;
  --font-body:         'Be Vietnam Pro', sans-serif;
  --font-size-base:    16px;
  --font-size-sm:      0.875rem;
  --font-size-lg:      1.125rem;
  --font-size-xl:      1.5rem;
  --font-size-2xl:     2rem;
  --font-size-3xl:     2.75rem;

  /* Spacing */
  --space-xs:   0.25rem;
  --space-sm:   0.5rem;
  --space-md:   1rem;
  --space-lg:   1.5rem;
  --space-xl:   2.5rem;
  --space-2xl:  4rem;
  --space-3xl:  6rem;

  /* Layout */
  --container-max:     1200px;
  --container-padding: var(--space-lg);

  /* Shadows */
  --shadow-card:  0 4px 20px rgba(13, 43, 94, 0.10);
  --shadow-hover: 0 8px 32px rgba(13, 43, 94, 0.18);

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

### BEM Naming Convention (simplified)

Use only Block and Element. Avoid modifier classes for a single landing page — use state via data attributes or :hover/:focus instead.

```css
/* Block */
.hero {}
.loan-card {}
.contact-form {}

/* Element */
.hero__title {}
.hero__subtitle {}
.hero__cta {}
.loan-card__icon {}
.loan-card__amount {}
.contact-form__field {}
.contact-form__label {}
.contact-form__submit {}
```

**Why:** Flat modifier proliferation is a maintainability cost that pays off only across multiple pages. For one file, data attributes (`data-variant="primary"`) or adjacent selectors are cleaner.

---

## 2. Lightweight JS Libraries (CDN, no build step)

### Core Recommendation: Vanilla JS first, minimal CDN additions

| Need | Library | CDN | Size (gzip) | Why |
|------|---------|-----|-------------|-----|
| Smooth scroll | **Native CSS** (`scroll-behavior: smooth`) | None | 0 KB | Supported by all modern browsers; no JS needed |
| Scroll animations | **Intersection Observer API** (native) | None | 0 KB | Native browser API, no library required |
| Form validation | **Constraint Validation API** (native) + custom CSS | None | 0 KB | Built into HTML5, style with `:invalid`/`:valid` |
| Number counter animation | Vanilla JS (50 lines) | None | 0 KB | Trivial to write; no library needed |
| Sticky nav / scroll effects | Vanilla JS + `IntersectionObserver` | None | 0 KB | Native |
| Lightbox / modal | **Micromodal.js** | `https://unpkg.com/micromodal/dist/micromodal.min.js` | ~2 KB | Accessibility-correct, tiny |
| Swiper / carousel | **Swiper.js** v11 | `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js` | ~35 KB | Only add if testimonial/property carousel is needed |
| Toast notifications | **Toastify-js** | `https://cdn.jsdelivr.net/npm/toastify-js` | ~3 KB | Form submission feedback |

**Verdict:** A well-built landing page needs zero external JS libraries. Add Swiper only if a carousel is explicitly required; add Toastify only for form feedback. Skip jQuery entirely.

### Form Validation Pattern (pure JS, no library)

```js
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fields = this.querySelectorAll('[required]');
  let valid = true;
  fields.forEach(field => {
    if (!field.validity.valid) {
      field.closest('.contact-form__field').classList.add('is-error');
      valid = false;
    } else {
      field.closest('.contact-form__field').classList.remove('is-error');
    }
  });
  if (valid) { /* submit via fetch */ }
});
```

### Scroll Animation Pattern (pure JS)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

CSS counterpart:
```css
[data-animate] { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; }
[data-animate].is-visible { opacity: 1; transform: none; }
```

---

## 3. Google Fonts — Vietnamese Language Support

**Confidence: HIGH** — Be Vietnam Pro is purpose-built for Vietnamese; Montserrat has full Vietnamese subset support since 2020.

### Primary Recommendation: Be Vietnam Pro

- Designed specifically for Vietnamese typography
- Full Unicode support for all Vietnamese diacritical marks (Chữ Quốc ngữ)
- Clean, modern, professional — appropriate for banking/financial services
- 9 weights: 100–900, with italic variants
- Google Fonts ID: `Be+Vietnam+Pro`

### Secondary / Pairing Option: Montserrat

- Strong Vietnamese subset support
- Heavier/bolder feel — good for hero headings
- Geometric sans-serif, conveying stability and authority
- Pairs well with Be Vietnam Pro for body text

### Embed Code (optimized, subset-limited)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Montserrat:wght@700;800;900&display=swap&subset=vietnamese" rel="stylesheet">
```

**Performance note:** Specify only the weights you use. `display=swap` prevents invisible text during font load. For a production site, self-host via `google-webfonts-helper.herokuapp.com` to avoid Google network dependency.

### Fallback Stack

```css
--font-heading: 'Montserrat', 'Be Vietnam Pro', 'Arial Black', sans-serif;
--font-body:    'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif;
```

---

## 4. Icon Libraries (CDN, Free, Financial/Real Estate Icons)

### Primary Recommendation: Phosphor Icons

- **CDN:** `https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js` (ES module)
- **CSS CDN:** `https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css`
- **Size:** Tree-shakeable; ~7 KB per weight class when used via CSS
- **Why:** Superior real estate + financial icon set. Has `house`, `bank`, `currency-circle-dollar`, `percent`, `handshake`, `shield-check`, `chart-line-up`, `calculator`, `key`, `buildings`, `map-pin`, `phone`, `envelope`, `check-circle`
- **Usage:** `<i class="ph-bold ph-house"></i>` — no JS required for CSS variant
- **License:** MIT

### Alternative: Font Awesome 6 Free (CSS-only subset)

- **CDN:** `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css`
- **Size:** ~90 KB CSS + fonts (larger than Phosphor)
- **Relevant icons:** `fa-house`, `fa-building-columns` (bank), `fa-percent`, `fa-handshake`, `fa-shield-halved`, `fa-chart-line`, `fa-calculator`, `fa-key`, `fa-phone`, `fa-envelope`, `fa-circle-check`
- **License:** Free tier (CC BY 4.0 for icons, OFL for fonts)
- **Why consider:** Larger ecosystem, more developers familiar with it

### Alternative: Heroicons (via CDN SVG sprite)

- **CDN:** No official CSS CDN; copy SVG files or inline them
- **Why consider:** Minimal, clean design language; good for fintech/banking aesthetics
- **Limitation:** No CDN delivery of CSS icon font; must inline SVGs

**Verdict:** Use Phosphor Icons. Better icon coverage for real estate/finance, smaller payload than Font Awesome, MIT licensed, works as CSS-only (no JS required).

---

## 5. Color Palette — Navy Blue + Gold + White (Financial/Luxury)

**Confidence: HIGH** — These values are derived from established financial brand color theory and WCAG contrast requirements.

### Core Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Navy | `#0D2B5E` | Header bg, CTA buttons, section bg |
| Primary Dark | Midnight Navy | `#091D42` | Footer bg, hover states |
| Primary Light | Royal Navy | `#1A3A7A` | Card accents, dividers |
| Accent | Antique Gold | `#C9A84C` | CTAs, headings, border accents, icons |
| Accent Light | Pale Gold | `#E2C47A` | Hover on gold elements, highlights |
| Accent Dark | Deep Gold | `#A8863A` | Active states, pressed buttons |
| Background | Pure White | `#FFFFFF` | Main content bg |
| Background Alt | Warm Off-White | `#F7F5F0` | Alternating section bg |
| Text Primary | Near Black | `#1A1A2E` | Body text on white bg |
| Text Muted | Slate Gray | `#5A6278` | Secondary text, captions |
| Border | Warm Gray | `#DDD8CC` | Card borders, input borders |
| Success | Financial Green | `#2D6A4F` | Approved/positive states |
| Error | Deep Red | `#C0392B` | Form errors |

### Contrast Compliance (WCAG AA minimum 4.5:1 for text)

| Foreground | Background | Ratio | Pass |
|-----------|------------|-------|------|
| `#FFFFFF` | `#0D2B5E` | ~12:1 | AA / AAA |
| `#FFFFFF` | `#091D42` | ~15:1 | AA / AAA |
| `#C9A84C` | `#0D2B5E` | ~5.8:1 | AA |
| `#1A1A2E` | `#FFFFFF` | ~18:1 | AA / AAA |
| `#1A1A2E` | `#F7F5F0` | ~16:1 | AA / AAA |
| `#5A6278` | `#FFFFFF` | ~5.2:1 | AA |

**Warning:** Do NOT put gold text (`#C9A84C`) on white (`#FFFFFF`) — contrast ratio is ~2.9:1, which fails WCAG. Gold is for use on dark navy backgrounds only.

### Application Guide

```
Hero section:     bg #0D2B5E, heading #E2C47A, body text #FFFFFF
Feature cards:    bg #FFFFFF, border-left 4px #C9A84C, text #1A1A2E
CTA button:       bg #C9A84C, text #091D42, hover bg #E2C47A
Alternate section: bg #F7F5F0, heading #0D2B5E, text #1A1A2E
Footer:           bg #091D42, text #FFFFFF, links #E2C47A
Form inputs:      border #DDD8CC, focus-border #C9A84C, label #1A1A2E
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Fonts | Be Vietnam Pro | Nunito, Raleway | Weaker Vietnamese diacritic support |
| Icons | Phosphor Icons | Font Awesome 6 | FA6 is 3x larger, requires more network requests |
| Icons | Phosphor Icons | Heroicons | No CSS font CDN; inline SVG only |
| JS animations | Intersection Observer (native) | AOS.js, GSAP | Unnecessary dependencies for a landing page |
| Form validation | Native Constraint API | Parsley.js, VeeValidate | JS frameworks not applicable here |
| Scroll | CSS scroll-behavior | smooth-scroll.js | Deprecated by native browser support |

---

## Installation / CDN Reference

```html
<!-- Fonts (add to <head>) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Montserrat:wght@700;800&display=swap&subset=vietnamese" rel="stylesheet">

<!-- Icons (add to <head>) -->
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css">

<!-- Optional: Swiper (add only if carousel needed) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>

<!-- Optional: Toastify (add only if form feedback needed) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script src="https://cdn.jsdelivr.net/npm/toastify-js" defer></script>
```

---

## Sources

- Google Fonts Vietnamese subset: https://fonts.google.com/?subset=vietnamese (training knowledge, verified against known font specs)
- Phosphor Icons v2: https://phosphoricons.com (training knowledge)
- Font Awesome 6.5: https://fontawesome.com (training knowledge)
- WCAG 2.1 contrast guidelines: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- MDN Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Constraint Validation API: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
- CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

**Note:** Web access was unavailable during research. All CDN versions and URLs should be verified against current releases before production use. Phosphor Icons version, Swiper version, and Font Awesome version in particular should be confirmed at their respective project pages.
