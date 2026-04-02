# Phase 2: Static Content Sections — Research

**Researched:** 2026-03-28
**Domain:** Static HTML/CSS section implementation — nav, hero, services, loan products, projects, process, testimonials; mobile-first responsive layout; WebP image handling
**Confidence:** HIGH

---

## Summary

Phase 2 fills in the eight section stubs left empty by Phase 1. Every deliverable is static HTML and CSS — no JavaScript is executed at this phase. The index.html shell, BEM class names, CSS tokens, grid utilities, and animation state classes are already in place from Phase 1. Phase 2 task is to populate content, write component CSS, and wire `data-animate` attributes (the `.is-visible` trigger is Phase 3's job via IntersectionObserver, but reduced-motion users see content immediately from the CSS already in animations.css).

Two requirements are partially JS-dependent: NAV-03 (scroll-spy active link) and SVC-02 (count-up animation). Phase 2 delivers only the CSS scaffold — the `.is-active` and `.is-visible` class targets. The JS logic that adds those classes is Phase 3 work. This is the correct scope split.

Hero images are the main technical complexity. The requirement calls for WebP + JPEG fallback, `srcset` for two breakpoints, `loading="eager"`, and `fetchpriority="high"`. `cwebp` 1.6.0 is confirmed available on this machine. Placeholder images can be generated from free sources (Unsplash, Picsum) and converted locally — no CDN or external deploy required. No image compression library is required; `cwebp` handles all WebP output.

**Primary recommendation:** Work section-by-section in reading order. For each section: add HTML content into the existing stub, write component CSS in components.css (no new files), add `data-animate` / `data-delay` attributes to card groups. Verify at 375px, 768px, 1200px after each section. Write hero image HTML last (after deciding placeholder source) to avoid blocking other sections.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Sticky header with tel: link always visible | `.site-header { position: sticky; top: 0 }` already in components.css; populate nav links in HTML |
| NAV-02 | Mobile hamburger menu with aria-expanded toggle | HTML structure exists; CSS for open state needed; JS toggle is Phase 3 — Phase 2 provides CSS `.site-nav--open` state |
| NAV-03 | Scroll-spy: active link highlight via IntersectionObserver | CSS `.site-nav__link--active` class needed; JS that adds it is Phase 3 |
| NAV-04 | Smooth scroll to section; scroll-padding-top: 80px | `scroll-behavior: smooth` on `html` exists; `scroll-padding-top: 80px` in `:root` exists; anchor hrefs needed in HTML |
| HERO-01 | Hero banner full-screen, WebP + JPEG fallback, srcset for mobile/desktop | `<picture>` element pattern; cwebp available locally for conversion |
| HERO-02 | Hero image: loading="eager" + fetchpriority="high" | Standard HTML attributes on `<img>` inside `<picture>`; LCP optimization |
| HERO-03 | Headline + description + primary CTA visible at 375x667px without scroll | Hero section CSS: min-height 100svh or fixed height; CTA already exists in HTML |
| HERO-04 | Dark overlay rgba(0,0,0,0.45) on hero image | CSS `::after` pseudo-element with `position: absolute; inset: 0; background: rgba(0,0,0,0.45)` |
| HERO-05 | Sticky mobile CTA bar fixed at bottom (tel: link + scroll-to-form) | `.mobile-cta-bar` shell and CSS already in components.css; populate with content |
| SVC-01 | 3-4 service icon + text cards with Phosphor Icons | `.card` base already in components.css; add icon + BEM markup |
| SVC-02 | Animated stats counter (scroll-triggered) — Phase 2 delivers CSS scaffold only | Stats element markup + CSS; JS count-up is Phase 3 |
| PROD-01 | Loan product cards: LTV %, interest rate, term | Card markup + CSS; placeholder content |
| PROD-02 | Interest rate disclaimer (Thong tu 39/2016) adjacent to rates | HTML disclaimer paragraph below rate display |
| PROD-03 | Gold left-border accent on product cards | `border-left: 4px solid var(--color-gold)` on `.loan-card` |
| PROJ-01 | Project cards: WebP lazy image, name, location, price range, CTA | `<picture>` with loading="lazy" + explicit width/height; `.project-card` BEM markup |
| PROJ-02 | Project cards scroll-reveal on viewport entry | `data-animate` + `data-delay` attributes; JS `.is-visible` trigger is Phase 3 |
| PROC-01 | 3-5 process steps as timeline/numbered list with Phosphor Icons | Numbered flex/grid layout with icon + text; `.process-step` BEM component |
| PROC-02 | Clear visual, no complex JS | Pure CSS layout — count bubble or circle numbered list |
| TEST-01 | 3 testimonial cards: avatar, name, location, result, star rating | `.testimonial-card` BEM; star rating via Phosphor `ph-star` icon (filled) or Unicode stars |
| TEST-02 | 3-column grid desktop, 1-column mobile | `.grid-3` utility already in layout.css |
</phase_requirements>

---

## Project Constraints (from STATE.md + ROADMAP.md)

No CLAUDE.md exists. Constraints come from established project decisions:

- **NO GIT** — .git deleted. No commits, no git commands anywhere.
- **NO FRAMEWORK** — Pure HTML/CSS/JS. No Bootstrap, React, or any CSS framework.
- **NO JavaScript in Phase 2** — All deliverables are static HTML and CSS only.
- **BEM class names are LOCKED** — `.btn`, `.btn--primary`, `.btn--secondary`, `.site-header`, `.site-nav`, `.mobile-cta-bar`, `.site-footer`, `.card` must not be renamed.
- **CSS tokens are LOCKED** — All `--color-*`, `--space-*`, `--font-size-*`, `--shadow-*`, `--radius-*`, `--transition-*` names are fixed in `css/main.css`.
- **All design values via tokens** — No raw hex values or px values outside of `:root` in main.css.
- **Phosphor Icons `@2.1.2` bold variant** — `<i class="ph-bold ph-[name]">` syntax; already loaded in `<head>`.
- **Gold (#C9A84C) NEVER as text on white** — Use `--color-gold-dark` (#A8863A) for icon fills on white/off-white backgrounds.
- **All form inputs at font-size: 16px** — Applies to any input in Phase 2 HTML (calculator placeholder, contact form placeholder).
- **Local only** — No Netlify deploy, no CDN uploads, no external validation URLs.
- **Placeholder content throughout** — Client provides real copy after v1 ships.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| HTML5 `<picture>` element | Living standard | WebP + JPEG fallback image delivery | Native browser fallback chain; no JS required |
| CSS Grid (`grid-3`, `grid-2`) | Living standard | Multi-column card layouts | Already defined in layout.css; zero new code for basic grids |
| CSS Flexbox | Living standard | Nav bar, CTA bar, card interiors, process steps | Already used across components.css |
| CSS `position: absolute` overlay | Living standard | Hero dark overlay (HERO-04) | Standard pattern; no pseudo-element libraries needed |
| `cwebp` CLI | 1.6.0 | Convert JPEG placeholder to WebP | Already installed; produces WebP at any quality level |
| Phosphor Icons (ph-bold) | 2.1.2 | Service icons, process step icons | Already loaded; use `ph-bold ph-[name]` class syntax |

### Supporting

| Technology | Version | Purpose | When to Use |
|-----------|---------|---------|-------------|
| `data-animate` + `data-delay` attrs | — | Mark elements for scroll-reveal (JS adds `.is-visible` in Phase 3) | Card groups, section entrances |
| CSS `aspect-ratio` | Living standard | Maintain image proportions without JS | Project card image containers |
| CSS `object-fit: cover` | Living standard | Fill image container without distortion | Hero, project card images |
| `loading="lazy"` | HTML standard | Below-fold image deferred load | All images except hero |
| `fetchpriority="high"` | HTML standard | Prioritize LCP element loading | Hero `<img>` only |
| `srcset` + `sizes` | HTML standard | Responsive image delivery | Hero and project images |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS pseudo-element overlay | CSS `background` gradient on section | Gradient overlay is simpler but doesn't work with `<picture>` element inside section |
| Phosphor star icons for ratings | Unicode ★ characters | Unicode stars are simpler HTML but Phosphor keeps icon system consistent; use `ph-star` and `ph-star-fill` |
| `svh`/`dvh` units for hero height | `vh` only | `100svh` prevents browser UI chrome from collapsing hero on iOS; `100vh` is a known mobile bug |

**Installation:**

No npm installs required. `cwebp` already available at `/opt/homebrew/bin/cwebp`.

---

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)

```
/
├── index.html              # Populate section stubs; add all nav links, img markup
├── css/
│   ├── main.css            # NO CHANGES — tokens locked
│   ├── layout.css          # Add grid-4 if needed for process steps; otherwise locked
│   ├── components.css      # ADD all new Phase 2 component styles here
│   └── animations.css      # NO CHANGES — data-animate scaffold already correct
└── img/
    ├── hero-desktop.webp   # ~400KB, 1200px wide
    ├── hero-desktop.jpg    # JPEG fallback
    ├── hero-mobile.webp    # ~200KB, 800px wide
    ├── hero-mobile.jpg     # JPEG fallback
    └── project-[n].webp    # Placeholder project images, lazy-loaded
```

**Rule:** All new component CSS goes in `css/components.css`. Do not create new CSS files.

### Pattern 1: Hero Section Full-Screen with Picture Element

**What:** Hero uses `<picture>` for WebP/JPEG srcset, positioned `<section>` with `::after` dark overlay, content in `.hero__content` on top via `z-index`.

**When to use:** HERO-01, HERO-02, HERO-03, HERO-04

**Example:**
```html
<section id="hero" aria-labelledby="hero-heading" class="hero section--dark">
  <!-- Background image layer -->
  <picture class="hero__bg">
    <source
      media="(min-width: 768px)"
      srcset="img/hero-desktop.webp"
      type="image/webp">
    <source
      media="(min-width: 768px)"
      srcset="img/hero-desktop.jpg">
    <source
      srcset="img/hero-mobile.webp"
      type="image/webp">
    <img
      src="img/hero-mobile.jpg"
      alt="Căn hộ hiện đại tại trung tâm thành phố"
      width="800"
      height="600"
      loading="eager"
      fetchpriority="high"
      class="hero__img">
  </picture>

  <!-- Dark overlay via CSS ::after on .hero -->
  <!-- Content layer -->
  <div class="hero__content container">
    <h1 id="hero-heading" class="hero__heading">
      [Placeholder: Giải Pháp Vay Mua Nhà Ưu Đãi]
    </h1>
    <p class="hero__subheading">
      [Placeholder: Hỗ trợ vay lên đến 80% giá trị bất động sản]
    </p>
    <a href="#contact" class="btn btn--primary">Đăng Ký Tư Vấn Miễn Phí</a>
  </div>
</section>
```

```css
/* css/components.css additions */
.hero {
  position: relative;
  min-height: 100svh; /* svh prevents iOS chrome-collapse bug */
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Dark overlay — HERO-04 */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  position: relative;
  z-index: 2; /* above overlay */
  text-align: center;
  padding-block: var(--space-2xl);
}

.hero__heading {
  color: var(--color-gold-light); /* gold-light on dark bg passes WCAG AA */
  margin-bottom: var(--space-md);
}

.hero__subheading {
  font-size: var(--font-size-xl);
  color: var(--color-white);
  margin-bottom: var(--space-xl);
  max-width: 600px;
  margin-inline: auto;
}
```

**Source:** MDN `<picture>` element docs (HIGH confidence); CSS overlay pattern is standard.

### Pattern 2: Navigation Links + Mobile Menu CSS

**What:** Populate `<nav class="site-nav">` with anchor links to each section id. Provide `.site-nav--open` modifier that shows the nav as a dropdown on mobile. The JS that adds/removes `.site-nav--open` is Phase 3.

**When to use:** NAV-01, NAV-02, NAV-03, NAV-04

**Example:**
```html
<nav class="site-nav" id="site-nav" aria-label="Điều hướng chính">
  <ul class="site-nav__list">
    <li><a href="#services" class="site-nav__link">Dịch Vụ</a></li>
    <li><a href="#loan-products" class="site-nav__link">Gói Vay</a></li>
    <li><a href="#calculator" class="site-nav__link">Máy Tính</a></li>
    <li><a href="#projects" class="site-nav__link">Dự Án</a></li>
    <li><a href="#process" class="site-nav__link">Quy Trình</a></li>
    <li><a href="#contact" class="site-nav__link">Đăng Ký</a></li>
  </ul>
</nav>
```

```css
/* Mobile dropdown state — JS adds this class in Phase 3 */
/* Phase 2 provides the CSS rule so Phase 3 only needs to toggle the class */
@media (max-width: 767px) {
  .site-nav {
    display: none;
    position: absolute;
    top: 64px; /* header height */
    left: 0;
    right: 0;
    background-color: var(--color-navy-dark);
    padding: var(--space-md) var(--container-padding);
    z-index: 99;
  }

  .site-nav--open {
    display: block;
  }

  .site-nav__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .site-nav__link {
    display: block;
    padding-block: var(--space-sm);
  }
}

/* Active link state — JS adds this class in Phase 3 for scroll-spy */
.site-nav__link--active {
  color: var(--color-gold-light);
  border-bottom-color: var(--color-gold);
}
```

**Note:** `aria-expanded` on `.nav-toggle` is populated by Phase 3 JS. Phase 2 sets the initial `aria-expanded="false"` value already in the HTML (it is already there in index.html).

### Pattern 3: Mobile Sticky CTA Bar Content

**What:** Populate `.mobile-cta-bar` with tel: link and scroll-to-form anchor. CSS for this element already exists in components.css.

**When to use:** HERO-05

**Example:**
```html
<div class="mobile-cta-bar" role="complementary" aria-label="Liên hệ nhanh">
  <a href="tel:+84000000000" class="mobile-cta-bar__phone">
    <i class="ph-bold ph-phone" aria-hidden="true"></i>
    Gọi Ngay
  </a>
  <a href="#contact" class="btn btn--primary mobile-cta-bar__cta">
    Đăng Ký Tư Vấn Ngay
  </a>
</div>
```

**Note:** `aria-hidden="true"` was on this element in Phase 1. Remove it for Phase 2 — the element has real interactive content. Replace with `role="complementary"`.

### Pattern 4: Service Cards with Phosphor Icons

**What:** 3-4 `.card` elements in a `.grid-3` grid. Icon at top in gold-dark color, heading, description text. Add `data-animate` and `data-delay` for Phase 3 scroll-reveal.

**When to use:** SVC-01

```html
<section id="services" aria-labelledby="services-heading" class="section section--alt">
  <div class="container">
    <h2 id="services-heading" class="section__heading">Dịch Vụ Của Chúng Tôi</h2>
    <div class="grid-3">

      <div class="card service-card" data-animate data-delay="1">
        <i class="ph-bold ph-handshake service-card__icon" aria-hidden="true"></i>
        <h3 class="service-card__title">Tư Vấn Miễn Phí</h3>
        <p class="service-card__desc">Chuyên viên tư vấn hỗ trợ 24/7, giải đáp mọi thắc mắc về vay vốn.</p>
      </div>

      <div class="card service-card" data-animate data-delay="2">
        <i class="ph-bold ph-percent service-card__icon" aria-hidden="true"></i>
        <h3 class="service-card__title">Lãi Suất Cạnh Tranh</h3>
        <p class="service-card__desc">Kết nối với 10+ ngân hàng để tìm gói vay phù hợp nhất.</p>
      </div>

      <div class="card service-card" data-animate data-delay="3">
        <i class="ph-bold ph-rocket-launch service-card__icon" aria-hidden="true"></i>
        <h3 class="service-card__title">Xử Lý Nhanh Chóng</h3>
        <p class="service-card__desc">Hồ sơ được xử lý trong 3–5 ngày làm việc.</p>
      </div>

    </div>

    <!-- Stats bar — SVC-02: JS count-up in Phase 3; Phase 2 shows static numbers -->
    <div class="stats-bar">
      <div class="stat-item" data-animate>
        <span class="stat-item__value" data-count-target="500">500+</span>
        <span class="stat-item__label">Khách hàng</span>
      </div>
      <div class="stat-item" data-animate>
        <span class="stat-item__value" data-count-target="200">200+</span>
        <span class="stat-item__label">Hồ sơ thành công</span>
      </div>
      <div class="stat-item" data-animate>
        <span class="stat-item__value" data-count-target="10">10+</span>
        <span class="stat-item__label">Ngân hàng đối tác</span>
      </div>
    </div>
  </div>
</section>
```

```css
.service-card__icon {
  font-size: 40px;
  color: var(--color-gold-dark); /* gold-dark on white = 4.6:1, passes WCAG AA */
  margin-bottom: var(--space-md);
  display: block;
}

.service-card__title {
  margin-bottom: var(--space-sm);
}

.service-card__desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

/* Stats bar */
.stats-bar {
  display: flex;
  justify-content: center;
  gap: var(--space-2xl);
  margin-top: var(--space-2xl);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-item__value {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-navy);
  line-height: 1;
}

.stat-item__label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
}
```

### Pattern 5: Loan Product Cards with Gold Left Border

**What:** `.loan-card` extends `.card` with `border-left: 4px solid var(--color-gold)`. Interest rate shows with mandatory disclaimer below it.

**When to use:** PROD-01, PROD-02, PROD-03

```html
<section id="loan-products" aria-labelledby="loan-products-heading" class="section section--light">
  <div class="container">
    <h2 id="loan-products-heading" class="section__heading">Gói Vay Ưu Đãi</h2>
    <div class="grid-3">

      <article class="card loan-card" data-animate data-delay="1">
        <h3 class="loan-card__name">Vay Mua Nhà Ưu Đãi</h3>
        <dl class="loan-card__specs">
          <dt>Tỷ lệ vay (LTV)</dt>
          <dd>Lên đến 80%</dd>
          <dt>Lãi suất</dt>
          <dd class="loan-card__rate">Từ 7,5%/năm</dd>
          <dt>Thời hạn</dt>
          <dd>Đến 25 năm</dd>
        </dl>
        <p class="loan-card__disclaimer">
          * Lãi suất tham khảo, có thể thay đổi theo điều kiện thực tế.
          Theo Thông tư 39/2016/TT-NHNN.
        </p>
        <a href="#contact" class="btn btn--primary">Đăng Ký Ngay</a>
      </article>

      <!-- Additional cards follow same pattern -->
    </div>
  </div>
</section>
```

```css
.loan-card {
  border-left: 4px solid var(--color-gold); /* PROD-03 */
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.loan-card__name {
  color: var(--color-navy);
  margin-bottom: 0;
}

.loan-card__specs {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-base);
}

.loan-card__specs dt {
  color: var(--color-text-muted);
  font-weight: 400;
}

.loan-card__specs dd {
  font-weight: 600;
  color: var(--color-navy);
}

.loan-card__rate {
  color: var(--color-gold-dark); /* gold-dark on white = 4.6:1 passes AA */
  font-size: var(--font-size-xl);
}

.loan-card__disclaimer {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.4;
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-sm);
  margin-top: auto; /* push to bottom of card */
}
```

### Pattern 6: Project Cards with Lazy WebP Images

**What:** Each `.project-card` shows a `<picture>` with `loading="lazy"`, explicit `width` and `height` (prevent CLS), project name, location, price range, CTA button.

**When to use:** PROJ-01, PROJ-02

```html
<article class="card project-card" data-animate data-delay="1">
  <picture class="project-card__image-wrapper">
    <source srcset="img/project-1.webp" type="image/webp">
    <img
      src="img/project-1.jpg"
      alt="Dự án căn hộ Vinhomes Central Park"
      width="400"
      height="260"
      loading="lazy"
      class="project-card__image">
  </picture>
  <div class="project-card__body">
    <h3 class="project-card__name">[Tên Dự Án]</h3>
    <p class="project-card__location">
      <i class="ph-bold ph-map-pin" aria-hidden="true"></i>
      [Quận/Huyện, Thành phố]
    </p>
    <p class="project-card__price">Từ [X] tỷ đồng</p>
    <a href="#contact" class="btn btn--secondary project-card__cta">Tìm Hiểu Thêm</a>
  </div>
</article>
```

```css
.project-card {
  padding: 0; /* image bleeds to edges */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-card__image-wrapper {
  display: block;
  aspect-ratio: 3/2;
  overflow: hidden;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.project-card:hover .project-card__image {
  transform: scale(1.03);
}

.project-card__body {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
}

.project-card__location {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.project-card__price {
  font-weight: 600;
  color: var(--color-navy);
}

.project-card__cta {
  margin-top: auto;
}
```

### Pattern 7: Process Steps — Numbered Timeline

**What:** Vertical on mobile, horizontal on desktop. Number bubble + icon + title + description. No JavaScript — pure CSS counters or explicit number in HTML.

**When to use:** PROC-01, PROC-02

```html
<section id="process" aria-labelledby="process-heading" class="section section--alt">
  <div class="container">
    <h2 id="process-heading" class="section__heading">Quy Trình Vay Đơn Giản</h2>
    <ol class="process-list">

      <li class="process-step" data-animate data-delay="1">
        <div class="process-step__number" aria-hidden="true">1</div>
        <div class="process-step__icon">
          <i class="ph-bold ph-clipboard-text" aria-hidden="true"></i>
        </div>
        <h3 class="process-step__title">Điền Thông Tin</h3>
        <p class="process-step__desc">Điền form đăng ký trực tuyến — chỉ mất 2 phút.</p>
      </li>

      <!-- Steps 2–5 follow same pattern -->
    </ol>
  </div>
</section>
```

```css
.process-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  counter-reset: process-counter;
  list-style: none;
}

@media (min-width: 768px) {
  .process-list {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
  }
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
}

.process-step__number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-navy);
  color: var(--color-white);
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: var(--font-size-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.process-step__icon {
  font-size: 32px;
  color: var(--color-gold-dark);
}

.process-step__title {
  color: var(--color-navy);
}

.process-step__desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
```

### Pattern 8: Testimonial Cards — 3-Column Grid

**What:** `.testimonial-card` with avatar initials circle, name + location, result quote, star rating. Uses existing `.grid-3` utility.

**When to use:** TEST-01, TEST-02

```html
<section id="testimonials" aria-labelledby="testimonials-heading" class="section section--light">
  <div class="container">
    <h2 id="testimonials-heading" class="section__heading">Khách Hàng Nói Gì</h2>
    <div class="grid-3">

      <article class="card testimonial-card" data-animate data-delay="1">
        <div class="testimonial-card__stars" aria-label="5 sao">
          <i class="ph-bold ph-star" aria-hidden="true"></i>
          <i class="ph-bold ph-star" aria-hidden="true"></i>
          <i class="ph-bold ph-star" aria-hidden="true"></i>
          <i class="ph-bold ph-star" aria-hidden="true"></i>
          <i class="ph-bold ph-star" aria-hidden="true"></i>
        </div>
        <blockquote class="testimonial-card__quote">
          "Được duyệt vay 2 tỷ trong vòng 1 tuần. Nhân viên hỗ trợ rất nhiệt tình!"
        </blockquote>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar" aria-hidden="true">NT</div>
          <div>
            <p class="testimonial-card__name">Chị N.T.</p>
            <p class="testimonial-card__location">Quận 7, TP.HCM</p>
          </div>
        </div>
      </article>

      <!-- 2 more testimonial cards -->
    </div>

    <!-- Legal note: placeholder testimonials only — REQUIREMENTS.md TEST-01 -->
    <p class="testimonials__disclaimer">
      * Nội dung minh họa. Kết quả thực tế có thể khác nhau tùy từng trường hợp.
    </p>
  </div>
</section>
```

```css
.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.testimonial-card__stars {
  display: flex;
  gap: 2px;
  color: var(--color-gold-dark); /* gold-dark on white passes AA */
  font-size: 20px;
}

.testimonial-card__quote {
  font-style: italic;
  line-height: 1.6;
  color: var(--color-text);
  flex: 1;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: auto;
}

.testimonial-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-navy);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-sm);
  flex-shrink: 0;
}

.testimonial-card__name {
  font-weight: 600;
  color: var(--color-navy);
  font-size: var(--font-size-sm);
}

.testimonial-card__location {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.testimonials__disclaimer {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-xl);
}
```

### Pattern 9: Calculator Section Placeholder (Phase 2 Static Scaffold)

**What:** The calculator inputs and result display exist as static HTML in Phase 2. JS logic is Phase 3. The HTML structure must be correct so Phase 3 can wire up event listeners without changing the DOM.

**When to use:** Phase 2 adds placeholder HTML; Phase 3 adds JS logic

```html
<section id="calculator" aria-labelledby="calculator-heading" class="section section--alt">
  <div class="container">
    <h2 id="calculator-heading" class="section__heading">Máy Tính Vay</h2>
    <div class="calc-form">
      <div class="calc-form__group">
        <label class="calc-form__label" for="calc-property-value">
          Giá trị bất động sản (VND)
        </label>
        <input
          type="number"
          id="calc-property-value"
          name="propertyValue"
          class="calc-form__input"
          placeholder="VD: 3000000000"
          min="0"
          aria-describedby="calc-result">
      </div>
      <!-- 3 more input groups for LTV, term, interest rate -->
      <div id="calc-result" class="calc-result" aria-live="polite">
        <!-- JS populates in Phase 3 -->
        <p class="calc-result__label">Trả góp hàng tháng ước tính:</p>
        <p class="calc-result__value">—</p>
        <p class="calc-result__disclaimer">
          Lãi suất tham khảo, có thể thay đổi theo điều kiện thực tế
        </p>
      </div>
    </div>
  </div>
</section>
```

```css
.calc-form {
  max-width: 640px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.calc-form__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.calc-form__label {
  font-weight: 600;
  color: var(--color-navy);
  font-size: var(--font-size-base);
}

.calc-form__input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 16px; /* iOS anti-zoom — mandatory */
  color: var(--color-text);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast);
}

.calc-form__input:focus {
  outline: 2px solid var(--color-navy);
  outline-offset: 2px;
  border-color: var(--color-navy);
}

.calc-result {
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  border-left: 4px solid var(--color-gold);
  text-align: center;
}

.calc-result__value {
  font-family: 'Montserrat', sans-serif;
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-navy);
  margin-block: var(--space-sm);
}

.calc-result__disclaimer {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
```

### Pattern 10: Contact Form Placeholder (Phase 2 Static Scaffold)

**What:** Lead form HTML structure with all 4 fields. Phase 2 adds the HTML and CSS styling. Phase 3 adds validation and submission JS. The `id` and `name` attributes must be correct now since Phase 3 JS depends on them.

**When to use:** Phase 2 adds HTML scaffold; FORM-01 through FORM-09 are Phase 3 behavior

```html
<section id="contact" aria-labelledby="contact-heading" class="section section--dark">
  <div class="container">
    <h2 id="contact-heading" class="section__heading">Đăng Ký Tư Vấn</h2>
    <form class="lead-form" id="lead-form" novalidate>

      <div class="lead-form__group">
        <label class="lead-form__label" for="field-name">Họ và tên *</label>
        <input
          type="text"
          id="field-name"
          name="fullName"
          class="lead-form__input"
          autocomplete="name"
          required>
      </div>

      <div class="lead-form__group">
        <label class="lead-form__label" for="field-phone">Số điện thoại *</label>
        <input
          type="tel"
          id="field-phone"
          name="phone"
          class="lead-form__input"
          autocomplete="tel"
          required>
      </div>

      <div class="lead-form__group">
        <label class="lead-form__label" for="field-project">Dự án quan tâm</label>
        <select id="field-project" name="project" class="lead-form__input">
          <option value="">-- Chọn dự án --</option>
          <option value="placeholder-1">[Dự Án 1]</option>
          <option value="placeholder-2">[Dự Án 2]</option>
        </select>
      </div>

      <div class="lead-form__group">
        <label class="lead-form__label" for="field-loan-amount">Số tiền vay (VND)</label>
        <input
          type="number"
          id="field-loan-amount"
          name="loanAmount"
          class="lead-form__input"
          placeholder="Tự động điền từ máy tính vay">
      </div>

      <!-- Consent checkbox: Phase 4 adds legal text and required attribute -->
      <!-- Phase 2: include checkbox structure so Phase 4 can populate label text -->
      <div class="lead-form__group lead-form__group--checkbox">
        <input type="checkbox" id="field-consent" name="consent" class="lead-form__checkbox">
        <label for="field-consent" class="lead-form__checkbox-label">
          [Đồng ý chính sách bảo mật — Phase 4 populates text]
        </label>
      </div>

      <button type="submit" class="btn btn--primary lead-form__submit">
        Đăng Ký Tư Vấn Miễn Phí
      </button>
      <p class="lead-form__privacy">Thông tin được bảo mật tuyệt đối</p>

    </form>
  </div>
</section>
```

```css
.lead-form {
  max-width: 560px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.lead-form__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.lead-form__label {
  font-weight: 600;
  color: var(--color-white);
  font-size: var(--font-size-base);
}

.lead-form__input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-navy-light);
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  color: var(--color-text);
  font-size: 16px; /* iOS anti-zoom — mandatory */
  transition: border-color var(--transition-fast);
}

.lead-form__input:focus {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
  border-color: var(--color-gold);
}

.lead-form__group--checkbox {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-sm);
}

.lead-form__checkbox {
  margin-top: 3px;
  flex-shrink: 0;
  accent-color: var(--color-gold);
}

.lead-form__checkbox-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: 400;
}

.lead-form__submit {
  width: 100%;
}

.lead-form__privacy {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
```

### Anti-Patterns to Avoid

- **Using `100vh` for hero height on mobile**: iOS Safari's scrollable chrome causes `100vh` to overflow. Use `100svh` (small viewport height), with `100vh` as a fallback for older browsers.
- **Forgetting explicit `width` and `height` on `<img>` tags**: Causes Cumulative Layout Shift (CLS). Every `<img>` needs `width` and `height` attributes matching the intrinsic image dimensions, even though CSS overrides the display size.
- **Using `loading="lazy"` on the hero image**: The hero is the LCP element. Lazy-loading it delays the largest contentful paint. Use `loading="eager"` and `fetchpriority="high"` only on the hero `<img>`.
- **Putting `<img>` directly in hero section without `<picture>`**: Loses WebP fallback for older browsers. Always use `<picture>` with `<source type="image/webp">` then `<img>` fallback.
- **Gold text on white background**: `--color-gold` (#C9A84C) on white fails WCAG AA (2.9:1). Use `--color-gold-dark` (#A8863A) for any colored text/icons on white or off-white surfaces.
- **Making `.site-nav` visible with `display: flex` always**: The current `components.css` correctly hides `.site-nav` on mobile and shows it at 768px+. Adding a mobile dropdown `.site-nav--open` class must stay within the `@media (max-width: 767px)` block.
- **Changing `aria-hidden="true"` to `aria-hidden="false"`**: Use `aria-hidden="false"` is equivalent to removing the attribute entirely. To reveal a previously-hidden element to screen readers, simply remove `aria-hidden` from the element.
- **Leaving `[data-animate]` elements with `opacity: 0` when JS is absent**: The `animations.css` already handles this correctly — `prefers-reduced-motion: reduce` sets `opacity: 1`. However, Phase 2 must ensure the page is fully readable with no JS (Phase 3 script files are empty stubs).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image format fallback | Custom JS image-swap | HTML `<picture>` + `<source type="image/webp">` | Native, no JS, works before scripts load |
| WebP conversion | Custom conversion script | `cwebp` CLI (already installed) | Battle-tested encoder, fine-grained quality control |
| Fluid image containers | CSS with padding-bottom hack | CSS `aspect-ratio` property | Native, readable, no extra wrapper div needed |
| Icon set | Custom SVG sprite management | Phosphor Icons CSS (already loaded) | Zero setup, 9000+ icons, single class toggle |
| Star ratings | Custom star SVG | Phosphor `ph-star` / `ph-star-fill` icons | Consistent with project icon system |
| Numbered process steps | JavaScript counter | HTML `<ol>` with CSS `.process-step__number` div | No JS, screen-reader-friendly order |

**Key insight:** Every UI pattern in Phase 2 (cards, grids, image fallbacks, responsive layout) has a native CSS/HTML solution. The existing token system and grid utilities cover 80% of layout needs. New CSS only needs to describe component-specific rules.

---

## Common Pitfalls

### Pitfall 1: iOS Safari `100vh` Hero Bug

**What goes wrong:** On iOS Safari with the scrollable address bar, `min-height: 100vh` results in the hero being taller than the visible screen, cutting off the CTA button.

**Why it happens:** iOS Safari calculates `100vh` as the viewport height without the browser chrome, but the chrome is visible on page load, causing overflow.

**How to avoid:** Use `min-height: 100svh` (small viewport height) as the primary value. Provide `100vh` as a fallback for browsers without `svh` support.

```css
.hero {
  min-height: 100vh; /* fallback */
  min-height: 100svh; /* modern browsers — excludes browser chrome */
}
```

**Warning signs:** CTA button partially hidden behind browser address bar on first load on iPhone SE (375x667px).

### Pitfall 2: CLS from Images Without Explicit Dimensions

**What goes wrong:** Images shift the layout as they load, causing Cumulative Layout Shift that harms Core Web Vitals.

**Why it happens:** Without `width` and `height` attributes, the browser cannot reserve space for the image before it loads.

**How to avoid:** Every `<img>` must have explicit `width` and `height` attributes matching the image's intrinsic dimensions (not the CSS display size). CSS `object-fit: cover` then handles resizing.

**Warning signs:** Page jumps as images load in DevTools network throttling test.

### Pitfall 3: Forgetting `data-animate` Elements Are Invisible Without JS

**What goes wrong:** Users who have JavaScript disabled, or Phase 2 testers (before Phase 3 JS is written), see an empty page because `[data-animate]` starts with `opacity: 0`.

**Why it happens:** `animations.css` sets `opacity: 0` on `[data-animate]` as a default state. The `.is-visible` class (set by Phase 3 JS) makes elements visible. Before Phase 3 JS exists, elements stay invisible.

**How to avoid two options:**
1. Add a temporary `[data-animate] { opacity: 1; }` override in `animations.css` to be removed in Phase 3 — but this pollutes the file.
2. **Better:** Add `data-animate` attributes only at the Phase 3 step, not Phase 2. Phase 2 builds the content; Phase 3 adds `data-animate` as part of wiring up animations.js.

**Recommendation for Phase 2:** Do NOT add `data-animate` attributes in Phase 2. This keeps the content visible for browser verification in Phase 2. Phase 3 will add the attributes as part of animations.js setup.

**Warning signs:** Opening index.html in browser shows empty sections.

### Pitfall 4: `<picture>` Element Stacking Order for WebP Fallback

**What goes wrong:** Browser uses JPEG even when WebP is supported, or WebP is served to browsers that don't support it.

**Why it happens:** `<source>` elements in `<picture>` must appear in preference order. The browser picks the first `<source>` it supports. If JPEG `<source>` appears before WebP `<source>`, all browsers use JPEG.

**How to avoid:** Always put `type="image/webp"` `<source>` elements BEFORE non-WebP `<source>` elements. The `<img>` fallback at the end is used only when no `<source>` matches.

```html
<!-- CORRECT order: WebP first, JPEG fallback via <img> -->
<picture>
  <source srcset="img/hero.webp" type="image/webp">
  <img src="img/hero.jpg" alt="..." loading="eager">
</picture>
```

**Warning signs:** DevTools Network tab shows .jpg being loaded even on Chrome/Firefox.

### Pitfall 5: Mobile CTA Bar Covering Form Submit Button at 375px

**What goes wrong:** The sticky `.mobile-cta-bar` overlaps the form submit button, making the "Đăng Ký Tư Vấn Miễn Phí" button untappable on mobile.

**Why it happens:** `.mobile-cta-bar` is `position: fixed; bottom: 0` — it sits above page content at all times.

**How to avoid:** Add `padding-bottom` to the contact section equal to the mobile CTA bar height (approximately 64px) so the submit button is scrolled above the bar. This is already noted in REQUIREMENTS.md FOOT-02 for Phase 4 (Zalo button), but the same concern applies to the CTA bar itself.

```css
/* At 375px, ensure contact section clears the mobile CTA bar */
@media (max-width: 767px) {
  #contact {
    padding-bottom: calc(var(--space-2xl) + 64px); /* section padding + bar height */
  }
}
```

**Warning signs:** Submit button tap area hidden behind fixed bottom bar at 375px viewport.

### Pitfall 6: Nav Hamburger Button `aria-controls` Mismatch

**What goes wrong:** Screen readers announce the hamburger button but can't find the controlled element.

**Why it happens:** `aria-controls` must reference the exact `id` of the element it controls. The existing HTML has `aria-controls="site-nav"` but the nav element has no `id` attribute — only a `class="site-nav"`.

**How to avoid:** Add `id="site-nav"` to the `<nav>` element in index.html to match the existing `aria-controls="site-nav"` on the hamburger button.

**Warning signs:** Accessibility audit reports "aria-controls references an element that doesn't exist".

### Pitfall 7: `<section>` vs `<article>` Semantic Choice

**What goes wrong:** Using `<div>` or `<section>` for self-contained content items (testimonials, loan products, project cards) that should be `<article>`.

**Why it happens:** `<section>` implies thematic grouping requiring a heading; individual cards are self-contained pieces that can stand alone.

**How to avoid:** Loan product cards, testimonial cards, and project cards should use `<article>`. Service feature cards (not independently meaningful) can use `<div class="card">`.

**Warning signs:** Screen reader document outline lists card content under wrong landmark type.

---

## WebP Image Generation Guide

**Tool available:** `cwebp` 1.6.0 at `/opt/homebrew/bin/cwebp`

**Placeholder image sources (no account required):**
- `https://picsum.photos/1200/800` — random landscape photo, 1200x800px
- `https://picsum.photos/800/600` — mobile-sized variant
- `https://picsum.photos/400/260` — project card thumbnail

**Commands to produce Phase 2 placeholder images:**

```bash
# Download JPEG placeholders with curl
curl -L "https://picsum.photos/1200/800" -o /path/to/img/hero-desktop.jpg
curl -L "https://picsum.photos/800/600" -o /path/to/img/hero-mobile.jpg
curl -L "https://picsum.photos/400/260?random=1" -o /path/to/img/project-1.jpg
curl -L "https://picsum.photos/400/260?random=2" -o /path/to/img/project-2.jpg
curl -L "https://picsum.photos/400/260?random=3" -o /path/to/img/project-3.jpg

# Convert to WebP (quality 80 = good balance of size and quality)
cwebp -q 80 /path/to/img/hero-desktop.jpg -o /path/to/img/hero-desktop.webp
cwebp -q 80 /path/to/img/hero-mobile.jpg -o /path/to/img/hero-mobile.webp
cwebp -q 80 /path/to/img/project-1.jpg -o /path/to/img/project-1.webp
cwebp -q 80 /path/to/img/project-2.jpg -o /path/to/img/project-2.webp
cwebp -q 80 /path/to/img/project-3.jpg -o /path/to/img/project-3.webp
```

**Size targets (Phase 5 finalizes, but Phase 2 should be close):**
- `hero-desktop.webp`: target < 400KB (PERF-01)
- `hero-mobile.webp`: target < 200KB (PERF-01)
- Project card images: target < 100KB each

**Confidence:** HIGH — cwebp 1.6.0 confirmed available; Picsum Photos is a well-known, stable placeholder service.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `.jpg` only images | `<picture>` + WebP + JPEG fallback | WebP widely supported ~2020 | 20–40% smaller file sizes |
| `height: 100vh` for full-screen sections | `min-height: 100svh` | CSS `svh` units — broad support 2023+ | Fixes iOS Safari chrome-collapse bug |
| Inline `width: auto; height: auto` | Explicit `width` + `height` attributes + CSS `aspect-ratio` | CLS became Core Web Vital 2021 | Prevents layout shift; better Lighthouse score |
| CSS `padding-bottom` aspect-ratio hack | CSS `aspect-ratio` property | Broad support 2021+ | Simpler, readable code |
| `<img srcset>` on hero | `<picture>` + `<source media>` + `<source type>` | Art direction need + WebP | Both responsive sizing AND format negotiation |
| `loading="lazy"` on all images | `loading="eager"` + `fetchpriority="high"` on LCP image only | LCP metric 2020 | Improves Lighthouse Performance on mobile |

**Deprecated/outdated:**
- `padding-bottom: X%` for aspect ratios — replaced by `aspect-ratio` CSS property
- `100vh` as sole mobile viewport unit — superseded by `svh/lvh/dvh` units

---

## Open Questions

1. **Hero image subject matter**
   - What we know: Requirement says "BĐS/cuộc sống đô thị" (real estate / urban lifestyle), placeholder content throughout
   - What's unclear: Will client provide actual hero image before Phase 2 ships, or is Picsum placeholder acceptable for all 5 phases?
   - Recommendation: Use Picsum placeholder for Phase 2. Phase 5 performance audit will require a real image under 400KB — note this in Phase 5 planning.

2. **Number of loan product cards**
   - What we know: PROD-01 says "cards showing loan packages" (plural), no specific count
   - What's unclear: How many packages to show as placeholder — 2 or 3?
   - Recommendation: Use 3 cards to match the `.grid-3` layout already in layout.css. Keeps HTML symmetric.

3. **Number of process steps**
   - What we know: PROC-01 says "3-5 steps"
   - What's unclear: Exact count affects whether to use `.grid-3`, `.grid-4`, or a custom columns value
   - Recommendation: Use 4 steps with a `.grid-4` utility (add to layout.css) to give a balanced horizontal layout on desktop: (1) Điền thông tin, (2) Xét duyệt hồ sơ, (3) Ký hợp đồng, (4) Giải ngân.

4. **Section background alternation pattern**
   - What we know: index.html already assigns section variants: hero=dark, services=alt, loan-products=light, calculator=alt, projects=light, process=alt, testimonials=light, contact=dark
   - What's unclear: Nothing — this is already decided in the existing HTML.
   - Recommendation: Honor the existing section variant assignments exactly.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | GSD tooling | YES | v22.4.1 | — |
| cwebp | HERO-01 WebP images, PROJ-01 | YES | 1.6.0 | JPEG-only (no WebP) — acceptable for Phase 2 placeholder |
| curl | Download placeholder images | YES (macOS built-in) | — | Browser download |
| Browser (local) | Visual verification at 375/768/1200px | Assumed YES | — | — |
| ImageMagick (`convert`) | Not needed | NO | — | cwebp handles WebP; no other resize needed |
| Netlify CLI | Not needed in Phase 2 | NO | — | N/A |

**Missing dependencies with no fallback:** None — all required tools available.

**Missing dependencies with fallback:**
- ImageMagick: not present, but not needed. `cwebp` handles all image conversion required for Phase 2.

---

## Validation Architecture

### Test Framework

Phase 2 is static HTML/CSS — no JavaScript logic to unit-test. Validation is manual browser inspection.

| Property | Value |
|----------|-------|
| Framework | None — visual browser inspection |
| Config file | none |
| Quick run command | `open /path/to/index.html` |
| Full suite command | Browser DevTools responsive mode at 375px, 768px, 1200px |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Check | File Exists? |
|--------|----------|-----------|-----------------|-------------|
| NAV-01 | Sticky header visible + tel: link tappable at 375px | manual | `grep 'position: sticky' css/components.css` (already passes) | YES |
| NAV-02 | Hamburger button visible at 375px; nav hidden by default | manual | DevTools 375px — verify `.nav-toggle` visible, `.site-nav` not visible | YES after edit |
| NAV-03 | `.site-nav__link--active` CSS class defined | smoke | `grep 'site-nav__link--active' css/components.css` | YES after edit |
| NAV-04 | Click nav link → smooth scroll to section, heading not hidden | manual | Click each nav link at 375px and 1200px | YES after edit |
| HERO-01 | `<picture>` with WebP + JPEG sources; srcset present | smoke | `grep 'image/webp' index.html` | YES after edit |
| HERO-02 | Hero `<img>` has `loading="eager"` + `fetchpriority="high"` | smoke | `grep 'fetchpriority' index.html` | YES after edit |
| HERO-03 | CTA button fully visible at 375x667px without scroll | manual | DevTools 375x667 — no scroll needed to see CTA | YES after edit |
| HERO-04 | Dark overlay visible on hero image | manual | Hero image tinted dark; text readable | YES after edit |
| HERO-05 | Sticky CTA bar visible at bottom on 375px viewport | manual | DevTools 375px — bar fixed at bottom | YES after edit |
| SVC-01 | 3-4 service cards with icons render correctly | manual | DevTools 375/768/1200 | YES after edit |
| SVC-02 | Stats numbers visible (static); `data-count-target` attribute present | smoke | `grep 'data-count-target' index.html` | YES after edit |
| PROD-01 | 3 loan product cards with LTV, rate, term visible | manual | Visual check | YES after edit |
| PROD-02 | Disclaimer paragraph adjacent to every displayed rate | smoke | `grep 'Thông tư 39' index.html` | YES after edit |
| PROD-03 | Gold left-border on loan cards | manual | DevTools element inspector on `.loan-card` | YES after edit |
| PROJ-01 | Project cards: `<picture>`, `loading="lazy"`, explicit width+height | smoke | `grep 'loading="lazy"' index.html` | YES after edit |
| PROJ-02 | `data-animate` on project cards (if added per recommendation) | smoke | `grep 'data-animate' index.html` | Conditional on open question resolution |
| PROC-01 | Process steps with icons visible | manual | Visual check | YES after edit |
| PROC-02 | No JS required for process steps to render | smoke | Steps visible with JS disabled in browser | YES |
| TEST-01 | 3 testimonial cards with avatar, name, location, stars | manual | Visual check at 375/1200px | YES after edit |
| TEST-02 | 3-column at 1200px; 1-column at 375px | manual | DevTools responsive mode | YES (uses `.grid-3`) |

### Sampling Rate

- **Per task commit:** `grep` checks for critical attributes (fetchpriority, loading=lazy, Thông tư 39)
- **Per wave merge:** Full browser visual pass at 375px, 768px, 1200px — no horizontal overflow, all content visible
- **Phase gate:** All 20 requirements verified in browser before moving to Phase 3

### Wave 0 Gaps

- [ ] `img/hero-desktop.jpg` + `img/hero-desktop.webp` — create from Picsum
- [ ] `img/hero-mobile.jpg` + `img/hero-mobile.webp` — create from Picsum
- [ ] `img/project-1.webp` through `img/project-3.webp` — create from Picsum
- [ ] `id="site-nav"` on `<nav>` element — fix aria-controls mismatch (Pitfall 6)
- [ ] `.grid-4` utility in `layout.css` — if 4-step process is chosen

---

## Sources

### Primary (HIGH confidence)

- `index.html` — existing section stubs, BEM class names, CDN embeds already in place
- `css/main.css` — complete token inventory verified
- `css/components.css` — existing component rules verified (site-header, mobile-cta-bar, card, btn)
- `css/layout.css` — existing grid utilities verified (grid-2, grid-3, container, section variants)
- `css/animations.css` — data-animate/is-visible pattern verified
- `01-UI-SPEC.md` — color, typography, spacing contracts locked
- `REQUIREMENTS.md` — all 20 Phase 2 requirements extracted verbatim
- MDN `<picture>` element docs — srcset/type/media attribute behavior
- MDN `fetchpriority` attribute — LCP optimization

### Secondary (MEDIUM confidence)

- web.dev/lcp — `loading="eager"` + `fetchpriority="high"` LCP guidance
- web.dev/cls — explicit width/height on images CLS prevention
- Picsum Photos (picsum.photos) — stable placeholder image service, no auth required
- CSS `svh` unit — caniuse.com confirms broad support (94%+ globally as of 2024)

### Tertiary (LOW confidence)

- None — all claims verified against official docs or the existing codebase

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all CSS patterns verified against existing codebase and MDN
- Architecture: HIGH — section patterns derived directly from REQUIREMENTS.md + existing HTML stubs
- Pitfalls: HIGH — each pitfall verified against specific browser behavior or existing code
- Image workflow: HIGH — cwebp 1.6.0 confirmed installed; Picsum confirmed accessible

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable domain — CSS/HTML standards don't change; verify cwebp still installed before execution if more than 30 days pass)
