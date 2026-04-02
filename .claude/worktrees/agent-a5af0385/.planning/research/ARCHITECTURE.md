# Architecture Patterns

**Domain:** Real Estate / Financial Services — Static Landing Page
**Researched:** 2026-03-28
**Confidence:** HIGH (all claims sourced from MDN, Netlify docs, or official web.dev)

---

## Recommended Architecture

### File Structure Decision: Separate Files

For a landing page of this scale (8+ sections, calculator JS, smooth-scroll, scroll-reveal, contact form), use **separate files** — not a single monolithic `index.html`.

**Recommended layout:**

```
/
├── index.html
├── netlify.toml
├── css/
│   ├── main.css          # Global reset, typography, variables
│   ├── layout.css        # Grid/flexbox structures, section spacing
│   ├── components.css    # Cards, buttons, badges, form elements
│   └── animations.css    # @keyframes, scroll-reveal classes, transitions
├── js/
│   ├── nav.js            # Sticky header, mobile menu, smooth scroll
│   ├── calculator.js     # Mortgage/ROI calculator logic
│   ├── animations.js     # IntersectionObserver scroll-reveal
│   └── form.js           # Contact form validation + Netlify submission
├── img/
│   ├── hero.webp         # Critical above-the-fold images (WebP + JPEG)
│   ├── hero.jpg
│   └── ...
└── assets/
    └── favicon.ico
```

**Rationale for separate files over inline:**
- Browser caches CSS/JS independently — repeat visits load zero KB for those files
- Easier to maintain: each file has a single responsibility
- Avoids a 2000+ line `index.html` that becomes unreadable
- Netlify deploys all static assets with no build step needed

**When single-file is acceptable:** Micro-landings under ~4 sections with no JS beyond a contact form. Not this project.

---

## Section Structure — Semantic HTML5

Use `<section>` with a heading (`h2`) for each named content block. `<section>` without a heading degrades to a generic element with no accessibility landmark. `<article>` is only appropriate for self-contained, independently redistributable content (e.g., a single testimonial card inside a testimonials section).

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <!-- meta, links -->
</head>
<body>

  <!-- 1. Sticky navigation -->
  <header id="site-header">
    <nav aria-label="Navigation chính">
      <a href="#" class="logo">Brand</a>
      <ul>
        <li><a href="#dich-vu">Dịch Vụ</a></li>
        <li><a href="#san-pham">Sản Phẩm</a></li>
        <li><a href="#tinh-toan">Tính Toán</a></li>
        <li><a href="#du-an">Dự Án</a></li>
        <li><a href="#quy-trinh">Quy Trình</a></li>
        <li><a href="#lien-he">Liên Hệ</a></li>
      </ul>
      <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="nav-list">
        Menu
      </button>
    </nav>
  </header>

  <main>

    <!-- 2. Hero -->
    <section id="hero" aria-label="Giới thiệu">
      <h1>Đầu tư bất động sản thông minh</h1>
      <p>Subheadline</p>
      <a href="#lien-he" class="btn-primary">Tư Vấn Ngay</a>
    </section>

    <!-- 3. Services -->
    <section id="dich-vu" aria-labelledby="heading-dich-vu">
      <h2 id="heading-dich-vu">Dịch Vụ</h2>
      <!-- service cards -->
    </section>

    <!-- 4. Products -->
    <section id="san-pham" aria-labelledby="heading-san-pham">
      <h2 id="heading-san-pham">Sản Phẩm</h2>
    </section>

    <!-- 5. Calculator -->
    <section id="tinh-toan" aria-labelledby="heading-tinh-toan">
      <h2 id="heading-tinh-toan">Tính Toán Tài Chính</h2>
      <!-- form inputs and output display -->
    </section>

    <!-- 6. Projects -->
    <section id="du-an" aria-labelledby="heading-du-an">
      <h2 id="heading-du-an">Dự Án Tiêu Biểu</h2>
    </section>

    <!-- 7. Process -->
    <section id="quy-trinh" aria-labelledby="heading-quy-trinh">
      <h2 id="heading-quy-trinh">Quy Trình Làm Việc</h2>
    </section>

    <!-- 8. Testimonials -->
    <section id="danh-gia" aria-labelledby="heading-danh-gia">
      <h2 id="heading-danh-gia">Khách Hàng Nói Gì</h2>
      <!-- Each testimonial is an article (self-contained, redistributable) -->
      <article class="testimonial-card">
        <blockquote>...</blockquote>
        <cite>Nguyen Van A</cite>
      </article>
    </section>

    <!-- 9. Contact Form -->
    <section id="lien-he" aria-labelledby="heading-lien-he">
      <h2 id="heading-lien-he">Liên Hệ</h2>
      <!-- Netlify form -->
    </section>

  </main>

  <footer>
    <!-- address, social links, copyright -->
  </footer>

  <script defer src="js/nav.js"></script>
  <script defer src="js/animations.js"></script>
  <script defer src="js/calculator.js"></script>
  <script defer src="js/form.js"></script>
</body>
</html>
```

**Key decisions:**
- `lang="vi"` on `<html>` — required for Vietnamese content (screen readers, Google indexing)
- `<header>` wraps the sticky nav, not `<div>` — creates an ARIA landmark
- `<main>` wraps all page sections — one `<main>` per page
- `aria-labelledby` links each `<section>` to its heading — makes sections discoverable by screen reader navigation
- `<article>` for individual testimonial cards inside the testimonials section
- All scripts use `defer` — ensures DOM is ready before JS executes, no render blocking

---

## Navigation — Sticky Header with Smooth Scroll

### Sticky header (CSS-first)

```css
#site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  will-change: transform; /* Promotes to GPU layer, prevents jank */
  background: transparent;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

#site-header.scrolled {
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

**Gotcha:** `position: sticky` requires `top: 0` to be set — without it, the element behaves as `position: relative` and never sticks. The element also sticks relative to its nearest scrolling ancestor, not necessarily the viewport. Keep `<header>` as a direct child of `<body>` to ensure it scrolls relative to the full page.

### Scroll position detection (throttled with rAF)

```javascript
// js/nav.js
const header = document.getElementById('site-header');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
    ticking = true;
  }
});
```

### Smooth scroll — CSS-first, JS for offset correction

```css
/* css/main.css */
html {
  scroll-behavior: smooth;
}
```

The CSS-only approach works for most anchors. However, if the sticky header is present, `scroll-behavior: smooth` scrolls to the exact section top — which is hidden behind the nav. Fix with `scroll-padding-top`:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Match your header height */
}
```

This is the cleanest approach: no JS scroll libraries needed, no `window.scrollTo()` calculations. `scroll-padding-top` is Baseline widely available as of 2020.

### Active nav link highlighting (Intersection Observer)

```javascript
// Track which section is in view and highlight its nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-20% 0px -70% 0px', // Triggers when section is in upper 30% of viewport
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));
```

### Mobile menu (vanilla JS)

```javascript
const toggle = document.querySelector('.mobile-menu-toggle');
const navList = document.getElementById('nav-list');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  navList.classList.toggle('open');
});

// Close menu when a nav link is clicked
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    navList.classList.remove('open');
  });
});
```

---

## Performance

### Image strategy

**Rule:** Hero image is above-the-fold — use `loading="eager"` (default) and `fetchpriority="high"`. All other images use `loading="lazy"`. Always specify `width` and `height` to prevent Cumulative Layout Shift (CLS).

```html
<!-- Hero: eager + fetchpriority, WebP with JPEG fallback -->
<picture>
  <source srcset="img/hero.webp" type="image/webp">
  <img
    src="img/hero.jpg"
    alt="Dự án bất động sản cao cấp tại TP.HCM"
    width="1920"
    height="1080"
    loading="eager"
    fetchpriority="high"
  >
</picture>

<!-- Below-fold images: lazy -->
<picture>
  <source srcset="img/project-1.webp" type="image/webp">
  <img
    src="img/project-1.jpg"
    alt="Dự án Vinhomes Grand Park"
    width="800"
    height="600"
    loading="lazy"
  >
</picture>
```

### Unsplash URLs with size parameters

For placeholder or stock images hosted on Unsplash CDN, append size parameters to avoid downloading full-resolution images:

```
https://images.unsplash.com/photo-[ID]?w=800&q=80&auto=format&fit=crop
```

Parameters:
- `w=800` — resize to 800px width
- `q=80` — 80% quality (good balance)
- `auto=format` — Unsplash serves WebP automatically to browsers that support it
- `fit=crop` — crops to exact dimensions

For responsive images with Unsplash:

```html
<img
  src="https://images.unsplash.com/photo-[ID]?w=800&q=80&auto=format"
  srcset="
    https://images.unsplash.com/photo-[ID]?w=400&q=80&auto=format 400w,
    https://images.unsplash.com/photo-[ID]?w=800&q=80&auto=format 800w,
    https://images.unsplash.com/photo-[ID]?w=1200&q=80&auto=format 1200w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 800px"
  loading="lazy"
  width="800"
  height="600"
  alt="..."
>
```

### Render-blocking resources

```html
<head>
  <!-- 1. Preconnect to external origins used above the fold -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">

  <!-- 2. DNS prefetch for origins used below the fold -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- 3. Preload hero image (LCP element) -->
  <link
    rel="preload"
    as="image"
    href="img/hero.webp"
    type="image/webp"
  >

  <!-- 4. CSS: inline critical styles OR load as normal link (Netlify serves with HTTP/2 push) -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/animations.css">
</head>

<!-- 5. All JS at end of body with defer -->
<script defer src="js/nav.js"></script>
```

**What NOT to do:**
- Do not put `<script>` in `<head>` without `defer` or `async` — it blocks parsing
- Do not use `async` for scripts that touch the DOM or depend on other scripts — use `defer` for all landing page JS
- Do not `@import` CSS inside CSS files — each `@import` creates a serial request waterfall

### CSS custom properties for theme

```css
/* css/main.css */
:root {
  --color-primary: #1a4f8a;
  --color-accent: #e8a020;
  --color-text: #2d2d2d;
  --color-bg: #fafafa;
  --font-heading: 'Be Vietnam Pro', sans-serif;
  --font-body: 'Inter', sans-serif;
  --section-padding: clamp(3rem, 8vw, 6rem);
  --container-max: 1200px;
}
```

---

## SEO — Meta Tags and Structured Data

### Head meta tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>Bất Động Sản [Brand] — Đầu Tư Thông Minh Tại Việt Nam</title>
  <meta name="description" content="[Brand] cung cấp dịch vụ tư vấn đầu tư bất động sản, tài chính và cho vay mua nhà uy tín tại TP.HCM. Liên hệ ngay để được tư vấn miễn phí.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://yourdomain.com/">

  <!-- Open Graph (Facebook, Zalo, LinkedIn previews) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/">
  <meta property="og:title" content="Bất Động Sản [Brand] — Đầu Tư Thông Minh">
  <meta property="og:description" content="Tư vấn đầu tư bất động sản và tài chính uy tín tại Việt Nam.">
  <meta property="og:image" content="https://yourdomain.com/img/og-cover.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="[Brand]">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bất Động Sản [Brand]">
  <meta name="twitter:description" content="Tư vấn đầu tư bất động sản tại Việt Nam.">
  <meta name="twitter:image" content="https://yourdomain.com/img/og-cover.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon.png">
</head>
```

**Notes for Vietnamese financial services:**
- `og:locale` should be `vi_VN` — important for Zalo and Facebook sharing previews in Vietnam
- OG image should be 1200x630px — Zalo, Facebook, and LinkedIn all use this ratio
- Meta description 150-160 characters — Google truncates at ~160 characters
- `canonical` URL prevents duplicate-content issues if the site is accessible at multiple URLs (with/without www, with/without trailing slash)

### JSON-LD Structured Data

Place in `<head>` or just before `</body>`. Uses `FinancialService` schema which extends `LocalBusiness`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "[Brand Name]",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/img/logo.png",
  "image": "https://yourdomain.com/img/og-cover.jpg",
  "description": "Dịch vụ tư vấn đầu tư bất động sản và tài chính uy tín tại TP.HCM.",
  "telephone": "+84-xxx-xxx-xxxx",
  "email": "info@yourdomain.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Đường ABC",
    "addressLocality": "Quận 1",
    "addressRegion": "TP. Hồ Chí Minh",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.7769",
    "longitude": "106.7009"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/[brand]",
    "https://zalo.me/[zalo-oa-id]"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Vietnam"
  }
}
</script>
```

**Schema type rationale:** `FinancialService` (subtype of `LocalBusiness`) is the most specific match for a real estate financial services company. It is recognized by Google Search for rich results. `RealEstateAgent` is an alternative if the primary offering is brokerage rather than financial services.

---

## Animations — CSS + Intersection Observer

### Scroll-reveal pattern

Three layers:

1. **Initial hidden state** via CSS class `.reveal` (hidden by default)
2. **Visible state** via CSS class `.is-visible` (triggered by JS)
3. **IntersectionObserver** adds `.is-visible` when element enters viewport

```css
/* css/animations.css */

/* 1. Initial state — elements start hidden and offset */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-left {
  opacity: 0;
  transform: translateX(-32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-right {
  opacity: 0;
  transform: translateX(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* 2. Visible state */
.reveal.is-visible,
.reveal-left.is-visible,
.reveal-right.is-visible {
  opacity: 1;
  transform: none;
}

/* 3. Stagger delays for card grids */
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
.reveal:nth-child(4) { transition-delay: 0.3s; }

/* 4. Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-left,
  .reveal-right {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```javascript
// js/animations.js

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // Fire once, then stop watching
    }
  });
}, {
  root: null,           // Use viewport
  rootMargin: '0px 0px -60px 0px', // Trigger 60px before element reaches bottom of viewport
  threshold: 0.1        // Element must be 10% visible
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});
```

**Why `unobserve` after triggering:** Frees memory — once animated in, there is no need to keep observing. A static landing page never re-hides elements.

**Why `transform` + `opacity` only:** These two properties are GPU-composited by modern browsers (OMTA — Off Main Thread Animation). Animating `top`, `margin`, `height`, or `width` triggers layout recalculations (reflow) on the main thread, causing dropped frames. Stick to `transform` and `opacity` for all scroll-reveal effects.

### Counter animation (numbers counting up)

```javascript
// For the stats section (e.g., "500+ dự án", "10 năm kinh nghiệm")
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('vi-VN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObserver.observe(el);
});
```

---

## Netlify Deployment

### netlify.toml

Place in repository root. No build command needed for a pure static site.

```toml
[build]
  publish = "."
  command = ""

# Security headers for all pages
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

# Aggressive cache for versioned static assets
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"

# HTML: short cache (content changes on redeploy)
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**Note on cache headers:** Netlify's CDN invalidates files on every deploy. The `immutable` flag on CSS/JS is safe because a redeploy replaces the files at the CDN level, but returning visitors with cached copies load instantly.

### Netlify Forms

Netlify Forms requires no backend code. Submissions are stored in the Netlify dashboard and can trigger email notifications.

```html
<form
  name="lien-he"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <!-- Honeypot: hidden from users, bots fill it in, Netlify rejects the submission -->
  <p class="hidden-field">
    <label>Do not fill: <input name="bot-field"></label>
  </p>

  <input type="hidden" name="form-name" value="lien-he">

  <div class="form-group">
    <label for="name">Họ và Tên *</label>
    <input type="text" id="name" name="name" required autocomplete="name">
  </div>

  <div class="form-group">
    <label for="phone">Số Điện Thoại *</label>
    <input type="tel" id="phone" name="phone" required autocomplete="tel"
           pattern="[0-9]{10,11}">
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" autocomplete="email">
  </div>

  <div class="form-group">
    <label for="message">Nội Dung</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>

  <button type="submit" class="btn-primary">Gửi Yêu Cầu</button>
</form>
```

```css
.hidden-field {
  display: none; /* Hide honeypot from humans */
}
```

**Critical:** The `data-netlify="true"` attribute must be present in the deployed HTML. Netlify scans the HTML at deploy time and registers the form. If you add the form post-deploy without redeploying, it will not work.

**AJAX submission (optional — avoids page redirect):**

```javascript
// js/form.js
const form = document.querySelector('[data-netlify="true"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new URLSearchParams(new FormData(form));

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data.toString()
    });

    if (res.ok) {
      form.innerHTML = '<p class="success-message">Cảm ơn! Chúng tôi sẽ liên hệ sớm.</p>';
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
  }
});
```

---

## Component Boundaries

| Component | File | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| Sticky Nav | `js/nav.js` | Scroll detection, mobile menu toggle, active link | DOM (header, nav links, sections) |
| Scroll Reveal | `js/animations.js` | IntersectionObserver for `.reveal` elements | DOM (section elements) |
| Calculator | `js/calculator.js` | Mortgage/ROI calculation, live input → output | DOM (form inputs, result display) |
| Contact Form | `js/form.js` | Validation, AJAX POST to Netlify | DOM (form), Netlify Forms API |
| Global Styles | `css/main.css` | CSS variables, reset, typography | All components |
| Animations | `css/animations.css` | Keyframes, reveal states, reduced-motion | `animations.js` (via class toggling) |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: jQuery or Animation Libraries for Simple Effects
**What:** Importing jQuery, AOS (Animate on Scroll), GSAP, or similar for basic scroll reveal and smooth scroll.
**Why bad:** 80-300 KB of JavaScript for functionality that is native in modern browsers. Adds render-blocking overhead.
**Instead:** `IntersectionObserver` + CSS transitions + `scroll-behavior: smooth`. Zero dependencies.

### Anti-Pattern 2: Lazy loading hero/above-fold images
**What:** Applying `loading="lazy"` to the hero image because "lazy loading is good."
**Why bad:** The LCP image is the most critical asset for Core Web Vitals. Lazy loading it delays its fetch, increasing LCP time. Google measures LCP and uses it in rankings.
**Instead:** Hero image uses `loading="eager"` (default) and `fetchpriority="high"`. Only below-fold images use `loading="lazy"`.

### Anti-Pattern 3: `position: sticky` without `top: 0`
**What:** Setting `position: sticky` on the nav without a threshold property.
**Why bad:** Without `top: 0` (or another inset value), sticky behaves identically to `position: relative` and the header never sticks.
**Instead:** Always set `top: 0` on sticky headers.

### Anti-Pattern 4: Animating layout-triggering properties
**What:** Animating `top`, `left`, `margin`, `width`, or `height` for scroll-reveal effects.
**Why bad:** These properties trigger reflow on the main thread — the browser must recalculate layout for the entire document on every animation frame. Results in dropped frames and jank on mobile.
**Instead:** Animate only `transform` and `opacity`. These are GPU-composited off the main thread.

### Anti-Pattern 5: Scroll event listeners without throttling
**What:** Running heavy logic directly in `addEventListener('scroll', handler)`.
**Why bad:** Scroll events fire at 60+ Hz. Without throttling, expensive DOM reads/writes execute hundreds of times per second.
**Instead:** Wrap scroll handlers in a `requestAnimationFrame` ticking pattern.

### Anti-Pattern 6: `@import` in CSS
**What:** Using `@import url('other.css')` inside a CSS file.
**Why bad:** Creates serial (waterfall) HTTP requests — each `@import` must be downloaded before the browser can discover the next import. Significantly delays page render.
**Instead:** Use multiple `<link rel="stylesheet">` tags in `<head>`. HTTP/2 (which Netlify uses) handles these in parallel.

---

## Scalability Considerations

| Concern | This deployment (static) | If traffic scales |
|---------|--------------------------|-------------------|
| Hosting cost | Free on Netlify/GitHub Pages | Netlify CDN auto-scales, no action needed |
| Form submissions | Netlify Forms free tier: 100/month | Upgrade Netlify plan or switch to Formspree/EmailJS |
| Image hosting | Bundled with repo | Move to Cloudinary or Imgix for transform-on-demand |
| Internationalization | Single `lang="vi"` page | Separate `index.html` + `en/index.html`, Netlify redirects by `Accept-Language` |
| CMS | Static HTML edits | Add Netlify CMS (Git-based) with no backend changes |

---

## Sources

- MDN: `<section>` element — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
- MDN: `<img loading>` — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading
- MDN: `<picture>` element — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
- MDN: `position: sticky` — https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning
- MDN: `window.scrollY` — https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
- MDN: `IntersectionObserver` — https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN: CSS animation performance — https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance
- MDN: `prefers-reduced-motion` — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- MDN: `defer` vs `async` — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer
- MDN: `<link rel>` preload/preconnect/dns-prefetch — https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#rel
- Netlify Forms setup — https://docs.netlify.com/forms/setup/
- Netlify file-based configuration — https://docs.netlify.com/configure-builds/file-based-configuration/
- schema.org/FinancialService — https://schema.org/FinancialService
