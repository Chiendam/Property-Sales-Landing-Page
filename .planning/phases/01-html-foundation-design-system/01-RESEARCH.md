# Phase 1: HTML Foundation + Design System — Research

**Researched:** 2026-03-28
**Domain:** Pure HTML5/CSS3 static site scaffold — CSS Custom Properties design system, Google Fonts, Phosphor Icons CDN, Netlify security headers, BEM naming, mobile-first responsive structure
**Confidence:** HIGH

---

## Summary

Phase 1 is a pure scaffold phase: no user-visible content, no JavaScript logic. Its deliverable is a stable token layer (CSS Custom Properties), a semantic HTML shell, loaded external resources (fonts, icons), and a passing Netlify deploy with security headers. Every subsequent phase depends on the BEM class names, CSS variable names, and file paths established here — none of these identifiers can be renamed after Phase 1 ships.

The technical domain is well-understood vanilla HTML/CSS. The UI-SPEC (01-UI-SPEC.md) is comprehensive and pre-resolves almost all design decisions: exact hex values, token names, spacing scale, typography scale, BEM class inventory, file structure contract, and CDN embed code are all locked. Research confirms these locked decisions are technically sound.

One version discrepancy was found: the UI-SPEC pins Phosphor Icons to `@2.1.1` but npm confirms `@2.1.2` is the current release (published 2025-03-31). The planner should use `@2.1.2`. Also confirmed: `X-XSS-Protection` is deprecated in modern browsers (Netlify docs do not recommend it); the REQUIREMENTS.md lists it and it should be included as-required, but do not treat it as a modern security control. No other blocking issues found.

**Primary recommendation:** Follow the UI-SPEC contract verbatim. Implement tasks in order: (1) file structure, (2) main.css :root tokens, (3) layout.css, (4) components.css skeleton, (5) animations.css with prefers-reduced-motion guard, (6) index.html semantic shell with all sections, (7) CDN embeds, (8) netlify.toml, (9) visual sample verification.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | File structure: index.html, css/main.css, css/layout.css, css/components.css, css/animations.css, js/nav.js, js/calculator.js, js/animations.js, js/form.js | UI-SPEC File Structure Contract defines exact paths and content obligations |
| FOUND-02 | `<html lang="vi">`, semantic HTML5 (`<main>`, `<section aria-labelledby>`), all `<script>` use `defer` | MDN landmark regions pattern: `<section>` with `aria-labelledby` creates region landmark; `defer` prevents render-blocking |
| FOUND-03 | CSS Custom Properties for full design system: navy/gold/white colors, typography, spacing, shadows | UI-SPEC provides complete token inventory with exact values; CSS Custom Properties in `:root` is the standard pattern |
| FOUND-04 | Google Fonts: Be Vietnam Pro (400, 600) + Montserrat (800) — subset=vietnamese, display=swap, preconnect | Google Fonts URL verified returning HTTP 200; `preconnect` + `display=swap` confirmed as best practice for non-render-blocking load |
| FOUND-05 | Phosphor Icons CSS variant via CDN | `@phosphor-icons/web@2.1.2` CSS bold variant confirmed available on unpkg and jsDelivr; class syntax `.ph-bold .ph-[name]` verified |
| FOUND-06 | netlify.toml with security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection) | Netlify docs confirm `[[headers]]` + `[headers.values]` TOML syntax; all three headers confirmed writable |
| FOUND-07 | Fully responsive: mobile-first, verified at 375px, 768px, 1200px | Mobile-first `@media (min-width:...)` pattern is the standard; UI-SPEC locks breakpoint values |
</phase_requirements>

---

## Standard Stack

### Core

| Library/Technology | Version | Purpose | Why Standard |
|-------------------|---------|---------|--------------|
| HTML5 | Living standard | Page structure, semantics, accessibility | Platform — no alternative |
| CSS Custom Properties | Living standard | Design token layer (colors, spacing, typography) | Zero tooling, cascade-aware, supports runtime override |
| Google Fonts | — | Be Vietnam Pro + Montserrat with Vietnamese subset | Free CDN, subset=vietnamese reduces payload, display=swap avoids FOIT |
| @phosphor-icons/web | 2.1.2 | Icon system via CSS font | CSS-only (no JS execution), MIT license, 9,000+ icons in 6 weights |
| Netlify | — | Static deploy + headers config | Locked decision; netlify.toml handles both deploy and security headers |

### Supporting

| Library/Technology | Version | Purpose | When to Use |
|-------------------|---------|---------|-------------|
| BEM naming (vanilla CSS) | — | Class naming convention | All CSS classes — no build tool required |
| CSS Grid + Flexbox | Living standard | Layout system inside layout.css | Grid for 2D section layouts; Flex for 1D component rows |
| CSS `clamp()` | Living standard | Fluid typography on `--font-size-2xl` | Locked in UI-SPEC for `<h1>` and `<h2>` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Custom Properties | Sass/LESS variables | Build tooling required, no runtime access — out of scope per project constraints |
| Phosphor Icons CSS | Font Awesome, Material Icons | Phosphor locked in project; heavier alternatives not needed |
| Google Fonts CDN | Self-hosted fonts | Self-hosting better for privacy/performance but adds file management complexity — acceptable for v1 |

**Installation:**

No npm packages required for Phase 1. All resources loaded via CDN links in `<head>`.

**Version verification (confirmed 2026-03-28):**

- `@phosphor-icons/web` — latest: `2.1.2` (npm verified)
- `X-XSS-Protection` header — deprecated in modern browsers; Netlify docs do not recommend it. Include it as required by FOUND-06 but note it is a no-op in Chrome/Firefox/Edge. Do NOT add it as a new security control in future phases.

---

## Architecture Patterns

### Recommended Project Structure

```
/
├── index.html                  # lang="vi", all sections scaffolded, CDN links in <head>
├── netlify.toml                # Security headers block
├── css/
│   ├── main.css                # :root tokens ONLY + CSS reset + base typography
│   ├── layout.css              # Container, section spacing, grid/flex utilities
│   ├── components.css          # .btn, .site-header, .site-nav, card shells, footer
│   └── animations.css          # [data-animate] reveal states + prefers-reduced-motion guard
├── js/
│   ├── nav.js                  # Empty with placeholder comment
│   ├── calculator.js           # Empty with placeholder comment
│   ├── animations.js           # Empty with placeholder comment
│   └── form.js                 # Empty with placeholder comment
└── img/
    └── .gitkeep                # Directory placeholder
```

**Source:** UI-SPEC File Structure Contract (locked).

### Pattern 1: CSS Custom Properties Token Layer

**What:** All design values (colors, spacing, typography sizes, shadows, radii, transitions) declared as `--token-name: value` on `:root` in `css/main.css`. Components reference tokens, never raw values.

**When to use:** Every CSS rule that uses a color, spacing value, font size, shadow, radius, or transition duration.

**Example:**
```css
/* css/main.css */
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
  --color-success:     #2D6A4F;
  --color-error:       #C0392B;

  /* Spacing (4px base grid) */
  --space-xs:   0.25rem;  /* 4px  */
  --space-sm:   0.5rem;   /* 8px  */
  --space-md:   1rem;     /* 16px */
  --space-lg:   1.5rem;   /* 24px */
  --space-xl:   3rem;     /* 48px */
  --space-2xl:  4rem;     /* 64px */
  --space-3xl:  4rem;     /* 64px — same as 2xl, use contextually */

  /* Typography */
  --font-size-sm:    0.875rem;               /* 14px */
  --font-size-base:  1rem;                   /* 16px */
  --font-size-xl:    1.25rem;                /* 20px */
  --font-size-2xl:   clamp(1.75rem, 5vw, 2.5rem); /* 28–40px fluid */

  /* Shadows */
  --shadow-card:  0 4px 20px rgba(13, 43, 94, 0.10);
  --shadow-hover: 0 8px 32px rgba(13, 43, 94, 0.18);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;

  /* Layout */
  --container-max:     1200px;
  --container-padding: var(--space-lg);

  /* Scroll behavior */
  scroll-padding-top: 80px;
}
```

**Source:** UI-SPEC Spacing Scale, Typography, Color, Shadow/Elevation, Border Radius, Transition Tokens tables (all locked).

### Pattern 2: BEM Naming (Block + Element, no modifier in Phase 1)

**What:** CSS class names follow `.block`, `.block__element`, `.block--modifier` pattern. Phase 1 uses Block and Element only (modifiers introduced in Phase 2+).

**When to use:** Every CSS class name.

**Example:**
```css
/* Block */
.site-header { }

/* Element */
.site-header__logo { }
.site-header__nav { }
.site-nav__link { }

/* Modifier (Phase 2+, declared in Phase 1 for .btn only) */
.btn { }
.btn--primary { }
.btn--secondary { }
```

**Source:** UI-SPEC Component Inventory (BEM blocks locked).

### Pattern 3: Semantic HTML5 Shell with ARIA Landmarks

**What:** Each page section uses `<section id="[name]" aria-labelledby="[name]-heading">` with a corresponding `<h2 id="[name]-heading">`. One `<main>` wraps all sections. One `<h1>` (hero only). All scripts use `defer`.

**When to use:** All content sections in index.html.

**Example:**
```html
<!-- Correct — <section> with aria-labelledby creates a region landmark -->
<section id="services" aria-labelledby="services-heading">
  <h2 id="services-heading">Dịch Vụ Của Chúng Tôi</h2>
  <!-- content -->
</section>

<!-- Scripts at bottom of <body> with defer -->
<script src="js/nav.js" defer></script>
<script src="js/calculator.js" defer></script>
<script src="js/animations.js" defer></script>
<script src="js/form.js" defer></script>
```

**Source:** REQUIREMENTS.md FOUND-02; MDN Landmark Regions guide (HIGH confidence).

### Pattern 4: Google Fonts Non-Render-Blocking Load

**What:** Two `<link rel="preconnect">` hints precede the Google Fonts stylesheet. `display=swap` in the font URL ensures text renders immediately with a fallback font.

**When to use:** In `<head>` of index.html, before any stylesheet link.

**Example:**
```html
<!-- Preconnect: opens TCP connection early, reduces latency -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font request: weights 400 + 600 for Be Vietnam Pro, 800 for Montserrat -->
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&family=Montserrat:wght@800&display=swap&subset=vietnamese" rel="stylesheet">
```

**Source:** UI-SPEC CDN Reference; web.dev optimize-web-fonts guide (MEDIUM confidence).

### Pattern 5: Phosphor Icons CDN — CSS Bold Variant

**What:** Include a single `<link>` stylesheet for the bold weight. Use `<i class="ph-bold ph-[icon-name]"></i>` tags.

**When to use:** In `<head>` after font links.

**Example:**
```html
<!-- Pin to specific version — never use @latest in production -->
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.2/src/bold/style.css">

<!-- Usage: house icon at 24px -->
<i class="ph-bold ph-house" style="font-size: 24px;"></i>
```

**Note:** UI-SPEC pins to `@2.1.1` but npm confirms current release is `@2.1.2`. Use `@2.1.2`. The unpkg URL for `@2.1.1` is confirmed functional (verified 2026-03-28), but `@2.1.2` is preferred as the current stable release.

**Source:** github.com/phosphor-icons/web (npm version 2.1.2 confirmed); unpkg `@2.1.1` verified returning valid CSS.

### Pattern 6: prefers-reduced-motion Guard in animations.css

**What:** All CSS transitions and animations are opt-in — wrapped in `@media (prefers-reduced-motion: no-preference)`. Users with reduced-motion system preference get no animation, not a broken experience.

**When to use:** Every `transition`, `animation`, and `@keyframes` declaration in animations.css.

**Example:**
```css
/* animations.css */

/* Default: no animation (safe for all users) */
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
}

/* Only animate if user has no reduced-motion preference */
@media (prefers-reduced-motion: no-preference) {
  [data-animate] {
    transition: opacity var(--transition-base), transform var(--transition-base);
  }
  [data-animate].is-visible {
    opacity: 1;
    transform: none;
  }
}

/* For users who prefer reduced motion: instant reveal */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
  }
}
```

**Source:** W3C C39 technique; UI-SPEC Transition Tokens (prefers-reduced-motion guard locked).

### Pattern 7: netlify.toml Security Headers

**What:** `[[headers]]` table in netlify.toml at project root. Applies to all routes via `for = "/*"`.

**When to use:** Required for FOUND-06. Deploy-time — no runtime cost.

**Example:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**TOML gotcha:** `[headers.values]` MUST be indented under its `[[headers]]` section. Misaligned TOML tables silently fail or cause deploy errors.

**Source:** Netlify official docs (docs.netlify.com/manage/routing/headers/) — HIGH confidence.

### Anti-Patterns to Avoid

- **Using `@latest` for Phosphor Icons CDN:** Resolves at request time and can introduce breaking changes without notice. Always pin to a specific version.
- **Declaring CSS values directly instead of via token:** e.g., `color: #0D2B5E` instead of `color: var(--color-navy)`. Breaks design system consistency; later phases cannot update globally.
- **Using `max-width` media queries for mobile-first:** Leads to specificity battles. Use `min-width` only.
- **Nesting `<section>` without `aria-labelledby`:** A `<section>` without an accessible name is not a landmark — it provides no navigation benefit to screen reader users.
- **Gold on white backgrounds:** `#C9A84C` on `#FFFFFF` fails WCAG AA (2.9:1 contrast). Use `#A8863A` (gold-dark) for icon fills on white surfaces. This is a hard constraint from UI-SPEC.
- **Form inputs without `font-size: 16px`:** iOS Safari auto-zooms the viewport on focus for any input with font-size < 16px. Set unconditionally on all `<input>`, `<select>`, `<textarea>`.
- **Loading fonts without `display=swap`:** Causes FOIT (flash of invisible text) during font load. Always include `display=swap` in Google Fonts URL.
- **Putting `<script>` in `<head>` without `defer`:** Blocks HTML parsing. All scripts must use `defer` (FOUND-02).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Design tokens | Custom JS token management | CSS Custom Properties on `:root` | Native browser feature, zero overhead, cascade-aware |
| Icon system | SVG sprite or custom icon font | Phosphor Icons CSS variant | Maintained library, 9,000+ icons, correct Unicode mappings |
| Font loading optimization | Custom font preloading script | Google Fonts + `preconnect` + `display=swap` | Handles FOIT, subsetting, WOFF2 format automatically |
| Security headers | Server-side middleware | netlify.toml `[[headers]]` | Deploy-time, zero runtime cost, version-controlled |

**Key insight:** Phase 1's entire domain is solved by native browser features and two CDN resources. Custom solutions in this domain add complexity with no benefit.

---

## Common Pitfalls

### Pitfall 1: TOML Indentation in netlify.toml

**What goes wrong:** Headers silently fail to apply, or Netlify deploy errors with "invalid config".

**Why it happens:** TOML requires `[headers.values]` to be a sub-table of `[[headers]]`. If indentation is wrong or the blocks are separated, TOML parsers may treat them as sibling tables.

**How to avoid:** Always indent `[headers.values]` under `[[headers]]`. Validate locally with `netlify deploy --dry-run` if netlify CLI is available (it is not on this machine — see Environment Availability).

**Warning signs:** Response headers missing from curl output after deploy.

### Pitfall 2: Phosphor Icons Version Mismatch

**What goes wrong:** Some icons render as missing glyphs (Unicode replacement character or empty box).

**Why it happens:** Icon names and Unicode codepoints can change between major/minor versions. Using `@latest` pulls the newest version which may rename or remove icons referenced in the HTML.

**How to avoid:** Pin to `@2.1.2`. Verify `ph-house` renders on page load (visual sample requirement #4 in UI-SPEC).

**Warning signs:** Empty box or question mark where icon should appear.

### Pitfall 3: Google Fonts `subset=vietnamese` Not Applied

**What goes wrong:** Vietnamese diacritics (ắ, ư, ổ, etc.) render as boxes or fallback glyphs.

**Why it happens:** The `subset=vietnamese` parameter must be in the URL query string. Omitting it loads the Latin subset only.

**How to avoid:** Include `&subset=vietnamese` in the Google Fonts URL. Verify by rendering the string "Đăng Ký Tư Vấn Miễn Phí" and inspecting that diacritics appear correctly.

**Warning signs:** Boxes or fallback serif glyphs for characters with diacritics.

### Pitfall 4: CSS Custom Property Naming Drift Between Files

**What goes wrong:** `css/components.css` references `--color-navy` but `css/main.css` defines `--color-dark-navy`. Build succeeds, browser silently uses `initial` value (empty/transparent).

**Why it happens:** Token names are split across two files. Copy-paste errors create undetectable typos.

**How to avoid:** All tokens are defined ONLY in `:root` in `css/main.css`. Components and layout files ONLY reference tokens — never define new ones. Do a grep for `--color` in components.css to confirm zero definitions there.

**Warning signs:** Unexpected transparent backgrounds or `initial` color values in DevTools.

### Pitfall 5: Missing `crossorigin` on fonts.gstatic.com Preconnect

**What goes wrong:** Font files still experience connection setup delay, negating the preconnect benefit.

**Why it happens:** `fonts.gstatic.com` serves cross-origin CORS resources (font binaries). Without `crossorigin` on the preconnect hint, the browser opens an anonymous connection but the actual font request uses a credentialed connection — they don't match, so a new connection is opened anyway.

**How to avoid:** Always include `crossorigin` on the `fonts.gstatic.com` preconnect specifically (not the `fonts.googleapis.com` one).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Warning signs:** Waterfall in DevTools shows a new connection to `fonts.gstatic.com` after preconnect.

### Pitfall 6: `scroll-padding-top` Declared on Wrong Selector

**What goes wrong:** Smooth scroll to anchors places the section heading behind the sticky header.

**Why it happens:** `scroll-padding-top` must be on the `:root` or `html` element (or the scroll container), not on individual sections.

**How to avoid:** Declare `scroll-padding-top: 80px` in the `:root` block in `css/main.css`.

**Warning signs:** Clicking nav links hides the section heading under the sticky header.

### Pitfall 7: Gold Color Used as Text on White/Off-White

**What goes wrong:** WCAG AA contrast failure. `#C9A84C` on `#FFFFFF` = 2.9:1 (minimum 4.5:1 required for normal text).

**Why it happens:** Gold looks visually prominent but its luminance is too high for white backgrounds.

**How to avoid:** Gold (`#C9A84C`) is reserved for CTA button backgrounds, product card left-border, and nav hover indicators only. For icon fills on white surfaces, use `#A8863A` (gold-dark, 4.6:1 on white).

**Warning signs:** Accessibility audits flagging contrast errors on gold-colored text.

---

## Code Examples

Verified patterns from official sources:

### Full `<head>` CDN Embed Block

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Tên Tổ Chức] — Tư Vấn Vay Mua Nhà</title>

  <!-- Fonts: preconnect first, then stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&family=Montserrat:wght@800&display=swap&subset=vietnamese" rel="stylesheet">

  <!-- Phosphor Icons v2.1.2 — CSS bold variant, pinned version -->
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.2/src/bold/style.css">

  <!-- CSS: load order matters — main (tokens) before layout before components -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
```

**Source:** UI-SPEC CDN Reference. Version bumped from 2.1.1 to 2.1.2 per npm verification.

### Primary CTA Button Token Application

```css
/* css/components.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;             /* WCAG 2.5.5 touch target */
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
}

.btn--primary {
  background-color: var(--color-gold);
  color: var(--color-navy-dark);  /* #091D42 on #C9A84C = ~4.6:1, passes AA */
}

.btn--primary:hover {
  background-color: var(--color-gold-light);
}

.btn--primary:active {
  background-color: var(--color-gold-dark);
}

.btn--secondary {
  background-color: var(--color-navy);
  color: var(--color-white);
}
```

### netlify.toml Security Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Note:** `X-XSS-Protection` is required by FOUND-06 but is deprecated in modern browsers. Include as specified. `Referrer-Policy` is a sensible addition from UI-SPEC — not in REQUIREMENTS.md but standard security practice.

### Responsive Container (mobile-first)

```css
/* css/layout.css */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-xl);
  }
}

/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .container {
    padding-inline: var(--space-2xl);
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sass/LESS variables | CSS Custom Properties | ~2018 (broad support) | No build step required; properties accessible in JS |
| Font loading without display= | `font-display: swap` | ~2019 | Eliminates FOIT — text visible immediately during font load |
| X-XSS-Protection header | Content-Security-Policy | ~2019 (XSS-Protection deprecated) | X-XSS-Protection included per requirements but is a no-op in modern browsers |
| `@latest` CDN URLs | Pinned version URLs | Ongoing | Prevents breaking changes from silent dependency updates |
| `max-width` media queries | `min-width` mobile-first | ~2010 (Ethan Marcotte) | Progressive enhancement; base styles serve lowest capability |

**Deprecated/outdated:**
- `X-XSS-Protection: 1; mode=block` — Removed from Chrome 78+, Firefox, Edge. Include because FOUND-06 requires it, but it provides no modern browser protection.

---

## Open Questions

1. **Phosphor Icons version: 2.1.1 vs 2.1.2**
   - What we know: UI-SPEC pins `@2.1.1`; npm confirms `@2.1.2` is current (released 2025-03-31)
   - What's unclear: Whether any icon names changed between 2.1.1 and 2.1.2 (changelog not reviewed)
   - Recommendation: Use `@2.1.2`. The `ph-house` icon (used in visual sample) is a core icon unlikely to change between minor releases. Verify on page load.

2. **Netlify deploy verification without netlify CLI**
   - What we know: `netlify` CLI is not installed on this machine
   - What's unclear: How the planner intends to verify security headers locally before push
   - Recommendation: After deploying to Netlify, use `curl -I https://[deploy-url]` to confirm headers. Alternatively, install Netlify CLI via `npm install -g netlify-cli` as a Wave 0 step if local verification is required.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build tooling (GSD tools) | YES | v22.4.1 | — |
| npm | Package management | YES | 10.8.1 | — |
| git | Version control | YES | 2.45.2 | — |
| Netlify CLI | Local header verification | NO | — | Verify headers post-deploy with `curl -I` |
| Browser (local) | Visual verification at 375/768/1200px | Assumed YES | — | — |
| Google Fonts CDN | FOUND-04 | YES | — (HTTP 200 confirmed) | — |
| unpkg CDN (Phosphor Icons) | FOUND-05 | YES | 2.1.1 confirmed, 2.1.2 available | jsDelivr alternative: `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/bold/style.css` |

**Missing dependencies with no fallback:** None — all required dependencies available.

**Missing dependencies with fallback:**
- Netlify CLI: not installed. Post-deploy `curl -I` is sufficient for header verification.

---

## Validation Architecture

### Test Framework

Phase 1 is a static HTML/CSS scaffold. There is no JavaScript logic to unit-test. Validation is manual browser inspection and automated header verification.

| Property | Value |
|----------|-------|
| Framework | None — static file validation (browser + curl) |
| Config file | none |
| Quick run command | `open index.html` (local browser) |
| Full suite command | `curl -I https://[netlify-url]` post-deploy |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | All required files exist with correct paths | smoke | `ls index.html css/main.css css/layout.css css/components.css css/animations.css js/nav.js js/calculator.js js/animations.js js/form.js netlify.toml img/.gitkeep` | No — create in Wave 0 |
| FOUND-02 | `<html lang="vi">`, `<main>`, `<section aria-labelledby>`, `defer` on scripts | smoke | `grep -c 'lang="vi"' index.html && grep -c 'defer' index.html` | No — manual after index.html created |
| FOUND-03 | All CSS tokens defined in `:root` of main.css | smoke | `grep -c '\-\-color-navy\|--space-md\|--font-size-base\|--shadow-card' css/main.css` | No — manual after main.css created |
| FOUND-04 | Be Vietnam Pro + Montserrat load; Vietnamese diacritics render | manual | Open browser, render "Đăng Ký Tư Vấn Miễn Phí", visually verify | No — browser only |
| FOUND-05 | Phosphor Icons CDN loads; test icon renders at 24px | manual | Open browser, verify `<i class="ph-bold ph-house">` renders | No — browser only |
| FOUND-06 | netlify.toml security headers present in HTTP response | smoke | `curl -I https://[deploy-url] \| grep -E "X-Frame-Options\|X-Content-Type"` | No — post-deploy |
| FOUND-07 | No layout errors at 375px, 768px, 1200px viewports | manual | Browser DevTools responsive mode at 3 breakpoints | No — browser only |

### Sampling Rate

- **Per task commit:** `ls` check for required files + `grep` for critical tokens
- **Per wave merge:** Full browser visual check at 3 breakpoints
- **Phase gate:** Netlify deploy + curl header verification before phase sign-off

### Wave 0 Gaps

- [ ] `img/.gitkeep` — required by FOUND-01 file structure contract
- [ ] All 9 source files (index.html, 4 CSS, 4 JS) created as empty stubs before content tasks begin

No automated test framework installation required for Phase 1 (static HTML — no JS logic to test).

---

## Sources

### Primary (HIGH confidence)
- Netlify official docs (docs.netlify.com/manage/routing/headers/) — netlify.toml header syntax verified
- npm registry — `@phosphor-icons/web` version 2.1.2 confirmed current
- unpkg CDN — `@phosphor-icons/web@2.1.1/src/bold/style.css` HTTP 200 confirmed returning valid CSS
- Google Fonts CDN — Be Vietnam Pro + Montserrat URL returning HTTP 200 confirmed
- `01-UI-SPEC.md` — all token values, BEM class names, file structure, CDN embeds pre-resolved
- `REQUIREMENTS.md` — FOUND-01 through FOUND-07 extracted verbatim

### Secondary (MEDIUM confidence)
- github.com/phosphor-icons/web — icon class syntax `.ph-bold .ph-[name]` documented (verified against CDN CSS)
- web.dev optimize-web-fonts — preconnect + display=swap pattern (verified against CDN behavior)
- W3C C39 technique — prefers-reduced-motion CSS pattern (authoritative source)
- MDN landmark regions — `<section aria-labelledby>` creates region landmark (authoritative)

### Tertiary (LOW confidence)
- WebSearch results on BEM, mobile-first breakpoints, WCAG 2025 (cross-referenced with official MDN/W3C sources, upgraded to MEDIUM)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all CDN URLs verified live, version confirmed via npm
- Architecture: HIGH — token layer pattern is native CSS, file structure locked in UI-SPEC
- Pitfalls: HIGH — each pitfall verified against official docs or actual CDN response
- Validation: HIGH — test map maps directly to FOUND requirements

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable domain — CDN versions should be re-verified before execution if more than 30 days pass)
