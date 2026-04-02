# Phase 3: JavaScript Interactivity - Research

**Researched:** 2026-03-29
**Domain:** Vanilla JavaScript — IntersectionObserver, live input events, form validation, fetch no-cors
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**nav.js — Hamburger + Scroll-spy**
- D-01: Hamburger toggles `.site-nav` visibility via CSS class — slide down dropdown below the sticky header, full width. `aria-expanded` toggled on `.nav-toggle` button.
- D-02: Close nav on link click (all `.site-nav__link`) and on outside click.
- D-03: Scroll-spy via IntersectionObserver — add `.site-nav__link--active` to the link whose target section is in viewport. Threshold: 0.3 (section 30% visible = active).
- D-04: Smooth scroll already handled by CSS (`scroll-behavior: smooth`). nav.js does NOT add scroll behavior — only manages aria-expanded and active state.

**calculator.js — Live Amortization**
- D-05: Listen on `input` event on all 4 calc inputs: `#calc-property-value`, `#calc-ltv`, `#calc-term`, `#calc-rate`.
- D-06: Formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]` where P = property value × (LTV/100), r = annual rate / 100 / 12, n = term in years × 12.
- D-07: Result displayed in `#calc-result-value` using `Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'})`.
- D-08: Auto-fill `#field-loan-amount` with raw loan amount (P = property value × LTV/100) as a plain number — the field is `type="number"` so no formatting string.
- D-09: Show `#calc-result` container only when all 4 inputs have valid values; hide/reset when any input is cleared.

**animations.js — Scroll-reveal (Minimal)**
- D-10: Minimal scope — only 3 element types get scroll-reveal: `.service-card`, `.project-card`, `.process-step`.
- D-11: Stats counter on `.stat-item__value[data-count-target]` — count up from 0 to target number when `#services` section enters viewport. Restore "+" suffix after count (static text in HTML already has "+", so counter restores it after animation).
- D-12: Reveal mechanic: add `reveal` class to targets initially (via JS, not CSS), IntersectionObserver adds `reveal--visible` when in viewport. CSS handles fade-in/slide-up transition. Threshold: 0.15.
- D-13: Stagger delay for cards within same grid: 0ms, 100ms, 200ms (CSS `transition-delay` set via inline style).

**form.js — Validation + Optimistic Submit**
- D-14: Validate on `blur` per field: name (required, min 2 chars), phone (regex `/^(0[35789])\d{8}$/`), consent checkbox (required). Show inline error message in `.lead-form__error` span inserted after the field.
- D-15: On submit: run full validation, scroll to first error if any. If valid, proceed.
- D-16: Phase 3 submit: `fetch()` with `method:'POST'`, `mode:'no-cors'`, `body: new FormData(form)` targeting a **placeholder URL** (`https://script.google.com/placeholder`). Log form data to `console.log` for debugging. Phase 4 replaces with real GAS URL.
- D-17: Optimistic UI — immediately after submit (do NOT await fetch), hide form and show success message: "Cảm ơn! Chúng tôi sẽ liên hệ trong 24h". No redirect.
- D-18: Consent checkbox: Phase 3 treats it as required (must be checked to submit). Phase 4 adds the legal text label — Phase 3 just enforces the required behavior.

### Claude's Discretion
- CSS classes for reveal states (e.g., `reveal`, `reveal--visible`) — add to `animations.css`
- CSS class for mobile nav open state (e.g., `.site-nav--open`) — add to `components.css`
- Exact transition durations and easing curves
- Error message text content (Vietnamese)
- Counter animation duration (suggested: 1.5s)

### Deferred Ideas (OUT OF SCOPE)
- Google Apps Script URL and legal consent text — Phase 4
- Zalo floating button — Phase 4
- Privacy policy modal — Phase 4
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CALC-01 | 4 inputs: property value, LTV %, term (years), rate (%/year) | IDs confirmed in index.html: `#calc-property-value`, `#calc-ltv`, `#calc-term`, `#calc-rate` |
| CALC-02 | Live amortization on every `input` event | Input event pattern confirmed; formula from D-06 is standard amortization |
| CALC-03 | Result formatted as VND with `Intl.NumberFormat('vi-VN', ...)` | Native browser API — no library needed |
| CALC-04 | Auto-fill `#field-loan-amount` from calculator | Field confirmed in index.html as `type="number"`, raw number assignment works |
| CALC-05 | All calc inputs have `font-size: 16px` (iOS anti-zoom) | Already set in `components.css` `.calc-form__input` — CSS audit confirms compliance |
| CALC-06 | Disclaimer "Lãi suất tham khảo..." below result | Already present in HTML: `#calc-result .calc-result__disclaimer` — no JS needed |
| FORM-01 | 4 fields: name, phone, project, loan-amount | All confirmed in index.html with correct IDs |
| FORM-02 | `font-size: 16px` on all inputs/selects | Already in `.lead-form__input` CSS — confirmed |
| FORM-03 | Blur validation + inline errors; scroll to first error on submit | Pattern: insert `.lead-form__error` span after field on blur |
| FORM-04 | Vietnamese phone regex `/^(0[35789])\d{8}$/` | Locked in D-14; covers Viettel/Mobi/Vina/Gmobile prefixes |
| FORM-05 | Consent checkbox unchecked by default, required | HTML confirms no `checked` attribute; JS enforces required in D-18 |
| FORM-06 | Submit button text: "Đăng Ký Tư Vấn Miễn Phí" | Already in HTML — no JS needed |
| FORM-07 | Privacy micro-copy below submit | Already in HTML as `.lead-form__privacy` — no JS needed |
| FORM-08 | Inline success state — replace form with thank-you message | D-17: hide form, show success `<div>` in same container |
| FORM-09 | Optimistic UI — show success immediately, don't await fetch | D-17: fire-and-forget fetch pattern |
| FORM-10 | Form accessible via hero CTA button | Already implemented in HTML: hero CTA `href="#contact"` scrolls to form |
</phase_requirements>

---

## Summary

Phase 3 is a pure vanilla JavaScript implementation — no npm packages, no build tools, no framework. All four JS stubs exist as empty files and need to be filled in. The HTML and CSS scaffolding are complete, with all required IDs, classes, and data attributes already present in `index.html`.

The most important pre-implementation discovery is a **CSS class name mismatch**: CONTEXT.md Decision D-12 specifies a `reveal` / `reveal--visible` class pattern for scroll-reveal, but `animations.css` already implements a `[data-animate]` / `is-visible` pattern with full transitions and `prefers-reduced-motion` guards. The existing CSS also already handles stagger via `[data-animate][data-delay="1/2/3"]` data attributes with 100ms/200ms/300ms delays — no inline style injection needed. Because CSS class names are listed under "Claude's Discretion," the planner should align `animations.js` to the **existing CSS** (`[data-animate]` + `is-visible`) rather than re-implementing a parallel pattern. No new CSS classes need to be added to `animations.css` — the infrastructure is already there.

The `.site-nav--open` class and `.site-nav__link--active` class are both already defined in `components.css` — these are CSS-only targets that nav.js simply toggles. All three other integrations (calculator → form auto-fill, stats counter, form success state) are straightforward DOM writes. The project has no test framework, but `nyquist_validation` is enabled — Wave 0 must establish a lightweight manual verification checklist given there is no automated test runner in this pure HTML/CSS/JS project.

**Primary recommendation:** Write JS directly against the existing DOM structure and existing CSS classes. Do not add new CSS unless implementing the `reveal` conflict resolution. The entire phase is 4 JS files + 0 new HTML + minimal CSS additions.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vanilla JS (ES2020+) | Browser-native | All 4 modules | No framework per project decision; `defer` scripts already in place |
| IntersectionObserver API | Browser-native (>96% global support) | Scroll-spy, scroll-reveal, stats counter trigger | Standard modern replacement for scroll event listeners |
| `Intl.NumberFormat` | Browser-native | VND currency formatting | Native locale-aware formatting, no library needed |
| `fetch()` | Browser-native | Form submission via no-cors | Required by BACK-03 decision |
| `FormData` | Browser-native | Serialise form for GAS POST | Works with `fetch()` + `no-cors` correctly |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | — | — | No third-party JS libraries in this phase |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vanilla IntersectionObserver | ScrollReveal.js / AOS | Those add library weight; project is framework-free by decision |
| Native `Intl.NumberFormat` | numeral.js | Native API is sufficient for VND; no extra KB |
| Native `fetch` + FormData | axios / jQuery.ajax | No build system; native fetch is fine |

**Installation:** No packages to install. Pure browser APIs only.

---

## Architecture Patterns

### File Structure (existing — no new files)

```
js/
├── nav.js          # Hamburger toggle + scroll-spy (IntersectionObserver)
├── calculator.js   # Live amortization + auto-fill form field
├── animations.js   # Scroll-reveal + stats counter
└── form.js         # Blur validation + optimistic submit

css/
├── animations.css  # ALREADY HAS [data-animate]/is-visible — extend only if needed
└── components.css  # ALREADY HAS .site-nav--open, .site-nav__link--active
```

### Pattern 1: IntersectionObserver for Scroll-spy (nav.js)

**What:** One observer instance watches all 6 section targets. When a section hits 30% visibility, the corresponding nav link gets `.site-nav__link--active`; all others lose it.
**When to use:** Any scroll-position-dependent UI state. More performant than `scroll` event + `getBoundingClientRect`.

```javascript
// Source: MDN Web Docs — IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav__link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('site-nav__link--active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.site-nav__link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('site-nav__link--active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));
```

**Pitfall:** Multiple sections can fire `isIntersecting: true` simultaneously at threshold 0.3 (e.g., during fast scroll). The last one to fire wins, which is correct scroll-spy behavior.

### Pattern 2: Hamburger Toggle (nav.js)

**What:** Toggle `.site-nav--open` on `.site-nav`, toggle `aria-expanded` string (`"true"`/`"false"`) on `.nav-toggle`. Close on link click and document click outside nav.

```javascript
// aria-expanded must be STRING not boolean (per HTML spec and D-03 decision)
navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
siteNav.classList.toggle('site-nav--open', isOpen);
```

**Outside-click pattern:**
```javascript
document.addEventListener('click', (e) => {
  if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav();
  }
});
```

### Pattern 3: Live Amortization Calculator (calculator.js)

**What:** Single event delegation — add one `input` listener on the calc form container, call calculate on every change. Guard: all 4 inputs must have positive numeric values before showing result.

```javascript
// Standard amortization formula (D-06)
function calculateMonthly(propertyValue, ltv, termYears, annualRate) {
  const P = propertyValue * (ltv / 100);
  const r = (annualRate / 100) / 12;
  const n = termYears * 12;
  if (r === 0) return P / n; // zero-rate edge case
  return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
```

**Show/hide result container (D-09):**
```javascript
// Show #calc-result only when ALL 4 values are valid positive numbers
const allValid = [propVal, ltv, term, rate].every(v => v > 0 && isFinite(v));
calcResult.hidden = !allValid;
```

**VND formatting (D-07):**
```javascript
const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
calcResultValue.textContent = formatter.format(monthly);
```

**Auto-fill form field (D-08):**
```javascript
// Raw number — field is type="number", no formatting string
const loanAmountField = document.getElementById('field-loan-amount');
if (loanAmountField) loanAmountField.value = Math.round(P);
```

### Pattern 4: Scroll-reveal with Existing CSS (animations.js)

**CRITICAL FINDING — CSS already exists.** `animations.css` implements `[data-animate]` + `is-visible` with full transitions and stagger delays. Do NOT create a new `.reveal` / `.reveal--visible` pattern. Instead:

1. JS adds `data-animate` attribute to `.service-card`, `.project-card`, `.process-step` elements on init.
2. JS sets `data-delay="1"`, `data-delay="2"` on 2nd/3rd cards in each grid (matches existing CSS stagger rules).
3. IntersectionObserver adds `is-visible` class when element enters viewport (threshold: 0.15).

```javascript
// Add data-animate to reveal targets
const revealTargets = document.querySelectorAll('.service-card, .project-card, .process-step');
revealTargets.forEach((el, i) => {
  el.setAttribute('data-animate', '');
  // Stagger: assign delay based on position within parent grid
  const siblings = Array.from(el.parentElement.children);
  const pos = siblings.indexOf(el);
  if (pos > 0) el.setAttribute('data-delay', String(pos));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // reveal once only
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));
```

**Reduced-motion:** Handled entirely in CSS (`animations.css` already has `prefers-reduced-motion: reduce` rule that makes `[data-animate]` instantly visible). JS does not need to check `prefers-reduced-motion`.

### Pattern 5: Stats Counter (animations.js)

**What:** One-shot counter that fires when `#services` enters viewport. Uses `requestAnimationFrame` for smooth count-up. After animation completes, appends "+" suffix.

```javascript
function animateCount(el, target, duration = 1500) {
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out: 1 - (1-t)^2
    const eased = 1 - Math.pow(1 - progress, 2);
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

**Trigger:** Separate IntersectionObserver on `#services` section (threshold 0.3). Fire once only (`unobserve` after trigger). Targets: `[data-count-target]` elements.

### Pattern 6: Form Blur Validation + Optimistic Submit (form.js)

**Inline error insertion:**
```javascript
function showError(field, message) {
  removeError(field); // clear existing first
  const error = document.createElement('span');
  error.className = 'lead-form__error';
  error.setAttribute('role', 'alert');
  error.textContent = message;
  field.parentElement.appendChild(error);
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', error.id);
}
```

**Phone validation (D-14, FORM-04):**
```javascript
const VN_PHONE_RE = /^(0[35789])\d{8}$/;
```

**Optimistic submit (D-16, D-17):**
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAll()) {
    scrollToFirstError();
    return;
  }
  // Log for Phase 3 debugging
  const data = new FormData(form);
  console.log('Form data:', Object.fromEntries(data));
  // Fire-and-forget — do NOT await
  fetch('https://script.google.com/placeholder', {
    method: 'POST',
    mode: 'no-cors',
    body: data,
  }).catch(() => {}); // swallow no-cors opaque response errors silently
  // Show success immediately (D-17)
  showSuccessState();
});
```

**Success state:**
```javascript
function showSuccessState() {
  form.hidden = true;
  const msg = document.createElement('div');
  msg.className = 'lead-form__success';
  msg.setAttribute('role', 'status');
  msg.textContent = 'Cảm ơn! Chúng tôi sẽ liên hệ trong 24h';
  form.parentElement.appendChild(msg);
}
```

### Anti-Patterns to Avoid

- **Scroll event + getBoundingClientRect for scroll-spy:** High CPU cost on mobile. Use IntersectionObserver.
- **`aria-expanded` as boolean:** HTML spec requires string `"true"`/`"false"`. Native `toggle` uses boolean — must use `setAttribute`.
- **Creating new CSS animation classes:** `animations.css` already has `[data-animate]`/`is-visible`. Adding a parallel `.reveal`/`.reveal--visible` system creates dead code and conflicts.
- **Awaiting fetch in no-cors mode:** `mode:'no-cors'` returns opaque response — you cannot read the response. Optimistic UI is the only UX option here.
- **Using `input.value` as number without explicit parsing:** `Number('')` returns 0, not NaN — use `parseFloat` and check `> 0` explicitly for validation guard.
- **Multiple IntersectionObservers for the same use case:** One observer instance can observe multiple elements. Don't create one observer per element.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| VND currency formatting | Custom number formatter | `Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'})` | Handles thousands separator (`.`), decimal (`,`), ₫ symbol correctly for vi-VN locale |
| Scroll-position detection | `scroll` event + `getBoundingClientRect` loop | `IntersectionObserver` | Browser-native, off-main-thread, no scroll jank |
| Smooth scroll | JS `scrollIntoView` with polyfill | CSS `scroll-behavior: smooth` (already in place) | Already handled by CSS per D-04 |
| Animation frame loop | `setInterval` counter | `requestAnimationFrame` | Syncs to display refresh rate, pauses when tab not visible |
| Form serialization | Manual `input` value collection loop | `new FormData(form)` | Captures all named fields including select, checkbox state |

**Key insight:** Every complex operation in this phase has a native browser API that handles edge cases correctly. The value is in wiring them together properly, not in building them.

---

## Common Pitfalls

### Pitfall 1: CSS Class Name Conflict (animations.js)
**What goes wrong:** CONTEXT.md D-12 specifies `.reveal`/`.reveal--visible` but `animations.css` already implements `[data-animate]`/`is-visible`. If the planner follows D-12 literally, a second CSS rule must be written in `animations.css` — creating duplicate animation infrastructure.
**Why it happens:** CONTEXT.md was authored before inspecting the existing `animations.css`.
**How to avoid:** Use the **existing** `[data-animate]` / `is-visible` pattern. The CSS class names are under "Claude's Discretion" so this substitution is valid. The planner should note this alignment explicitly.
**Warning signs:** If a task creates `.reveal { opacity: 0 }` CSS, it's duplicating work already done.

### Pitfall 2: `aria-expanded` Must Be a String
**What goes wrong:** `element.setAttribute('aria-expanded', true)` → sets `"true"` (OK). But `element.setAttribute('aria-expanded', isOpen)` where `isOpen` is boolean `false` → sets `"false"` (also OK). The danger is using `element.ariExpanded = false` (property assignment) which may behave differently in some browsers.
**How to avoid:** Always use `setAttribute('aria-expanded', isOpen ? 'true' : 'false')`.

### Pitfall 3: Calculator Shows `NaN` or `Infinity`
**What goes wrong:** If user enters 0 for rate (zero-rate mortgage), formula `r = 0`, and `(1+r)^n - 1 = 0` causes division by zero → Infinity. If LTV is 0 or empty, P = 0, result is 0 shown as "0 ₫" which confuses users.
**How to avoid:** Guard: `if (r === 0) return P / n` for zero-rate case. Validate all 4 inputs are `> 0` before computing (D-09).

### Pitfall 4: `fetch()` in `no-cors` Mode Throws on Non-200 / Network Error
**What goes wrong:** `fetch` with `mode:'no-cors'` to a placeholder URL will reject the Promise. If `.catch()` is not chained, an unhandled Promise rejection appears in console.
**How to avoid:** Always chain `.catch(() => {})` on the fire-and-forget fetch. The success message is already shown before the fetch resolves or rejects.

### Pitfall 5: Stats Counter Fires Multiple Times
**What goes wrong:** If IntersectionObserver fires each time the `#services` section enters viewport (user scrolls down, then up, then down again), the counter animates multiple times from 0.
**How to avoid:** Call `observer.unobserve(servicesSection)` immediately inside the callback when `isIntersecting` is true.

### Pitfall 6: Outside-click Closes Nav When Clicking Nav Toggle
**What goes wrong:** Document click listener fires AFTER button click listener. If both run, the nav opens then immediately closes.
**How to avoid:** In the document click handler, check `!navToggle.contains(e.target)` — if the click was on the toggle button, don't close from the document handler (the button handler manages that case).

### Pitfall 7: Blur Validation Fires on First Page Load Focus
**What goes wrong:** If a field receives focus and immediately blurs (tab through), an error appears before the user has entered anything.
**How to avoid:** Only show errors on blur if the field has been dirtied: track `field.dataset.touched = 'true'` on first input event, only validate on blur if `touched`.

### Pitfall 8: `#calc-result` Initially Visible Shows `—`
**What goes wrong:** The HTML has `#calc-result` rendered with `—` as placeholder. No `hidden` attribute is set. Until the user fills in all 4 fields, the container remains visible with a dash.
**How to avoid:** In `calculator.js` initialization, set `calcResult.hidden = true` immediately. Show only when all 4 valid inputs present (D-09). This is a JS-only state — no CSS change needed.

---

## Code Examples

### Full VND Formatter (verified against MDN)
```javascript
// Source: MDN Intl.NumberFormat — vi-VN locale
const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});
// vndFormatter.format(5234000) → "5.234.000 ₫"
```

### Safe Input Value Extraction for Calculator
```javascript
// parseFloat returns NaN for '', handles decimal comma input
function getPositiveFloat(id) {
  const val = parseFloat(document.getElementById(id).value);
  return isFinite(val) && val > 0 ? val : null;
}
// Returns null (not 0) when invalid — enables clean allValid guard
const allValid = [propVal, ltv, term, rate].every(v => v !== null);
```

### IntersectionObserver One-Shot Pattern
```javascript
// Observe once, then stop watching
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      doThing(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
```

### Scroll to First Error
```javascript
function scrollToFirstError() {
  const firstError = document.querySelector('.lead-form__error');
  if (firstError) {
    firstError.closest('.lead-form__group').scrollIntoView({
      behavior: 'smooth', block: 'center'
    });
  }
}
```

---

## Runtime State Inventory

> This is a greenfield JS implementation — no rename/refactor/migration. Section not applicable.

Step 2.5: SKIPPED (greenfield JS implementation, no rename/migration).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Browser (modern) | IntersectionObserver, fetch, Intl | N/A — static site, client-side | All browsers released after 2019 | None needed — all APIs have >96% global support |
| Node.js / npm | Phase 3 implementation | N/A — no build step, no package.json in project root | — | Not needed |

Step 2.6: No external tool dependencies — Phase 3 is pure browser-native JS. All APIs (`IntersectionObserver`, `fetch`, `FormData`, `Intl.NumberFormat`, `requestAnimationFrame`) are universally available in modern browsers without polyfills.

---

## Validation Architecture

> `nyquist_validation: true` in config.json — this section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — pure HTML/CSS/JS, no test runner configured |
| Config file | None — Wave 0 must establish manual verification checklist |
| Quick run command | Open `index.html` in browser, follow manual checklist |
| Full suite command | Open `index.html` in browser, verify all 5 success criteria from ROADMAP.md |

**Note:** This project has no npm dependencies and no test runner. Automated testing is not applicable. All validation is manual browser verification. Wave 0 for each plan should specify exact manual steps.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Verification Method | Manual Steps |
|--------|----------|-----------|---------------------|-------------|
| CALC-01 | 4 inputs present and respond to input event | manual | Open browser, tab through inputs | ✓ HTML exists |
| CALC-02 | Live calculation updates on every keystroke | manual | Type in calc fields, see result update | Wave 0 |
| CALC-03 | Result formatted as "5.234.000 ₫" | manual | Enter known values, verify format | Wave 0 |
| CALC-04 | Loan amount auto-fills form field | manual | Fill calc, scroll to form, verify field value | Wave 0 |
| CALC-05 | iOS anti-zoom: font-size 16px | CSS audit | `grep font-size css/components.css` | ✓ Confirmed |
| CALC-06 | Disclaimer text below result | HTML audit | Visible in `#calc-result` | ✓ HTML exists |
| FORM-01 | 4 fields present | HTML audit | Check index.html | ✓ Confirmed |
| FORM-02 | iOS anti-zoom: 16px on inputs | CSS audit | Confirmed in components.css | ✓ Confirmed |
| FORM-03 | Inline errors on blur, scroll to first error | manual | Tab through fields without filling, submit | Wave 0 |
| FORM-04 | Phone regex blocks invalid numbers | manual | Enter "0123456789" → error; "0912345678" → pass | Wave 0 |
| FORM-05 | Checkbox unchecked blocks submit | manual | Submit without checking → error | Wave 0 |
| FORM-06 | Submit button text | HTML audit | Confirmed in index.html | ✓ Confirmed |
| FORM-07 | Privacy micro-copy | HTML audit | Confirmed in index.html | ✓ Confirmed |
| FORM-08 | Success state replaces form | manual | Valid submit → form hidden, message shown | Wave 0 |
| FORM-09 | Optimistic UI — no wait | manual | Valid submit → message appears instantly | Wave 0 |
| FORM-10 | Form accessible from hero | HTML audit | Hero CTA `href="#contact"` confirmed | ✓ Confirmed |

### Sampling Rate
- **Per task commit:** Open `index.html`, verify the specific feature implemented in that task
- **Per wave merge:** Full manual checklist — all 5 ROADMAP success criteria
- **Phase gate:** All 5 success criteria pass before advancing to Phase 4

### Wave 0 Gaps
- [ ] Manual verification checklist document — covers all CALC + FORM requirements
- [ ] `#calc-result` initial hidden state test step
- [ ] Nav hamburger open/close test on mobile viewport (375px DevTools)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `scroll` event + `getBoundingClientRect` for scroll-spy | `IntersectionObserver` | Chrome 51 / 2016 | Off-main-thread, no jank, cleaner API |
| `setInterval` for count-up animations | `requestAnimationFrame` | Widely adopted ~2014 | Syncs to display refresh, pauses on hidden tab |
| jQuery `$.ajax` | Native `fetch()` | Widespread ~2017-2018 | No library dependency, Promise-based |
| Custom currency formatting | `Intl.NumberFormat` | ES2015 / 2015 | Locale-correct output for vi-VN |

---

## Open Questions

1. **Nav scroll-spy with sticky header offset**
   - What we know: CSS has `scroll-padding-top: 80px` (from ROADMAP Phase 1 reference) for smooth scroll. IntersectionObserver does not respect `scroll-padding-top`.
   - What's unclear: Whether using threshold 0.3 alone is sufficient to avoid the header obscuring the active section trigger, or if `rootMargin` should be set to `-80px 0px 0px 0px` to subtract the header height.
   - Recommendation: Use `rootMargin: '-80px 0px 0px 0px'` on the scroll-spy observer to match the sticky header height. This is a detail the planner should specify.

2. **Stats counter "+" suffix and HTML content**
   - What we know: HTML currently shows `500+` as static text in `.stat-item__value`. D-11 says "counter restores '+' suffix after animation." The counter must overwrite `textContent` during animation.
   - What's unclear: Whether the counter should start by setting `textContent = '0'` (wiping the static `500+`) and then restore `+` at end, or whether to operate on just the numeric part via a child `<span>`.
   - Recommendation: On counter start, store original suffix, set `textContent = '0'`, animate to target, then set `textContent = target + '+'`. The HTML's static `500+` is the pre-JS fallback — JS replaces it.

---

## Project Constraints (from CLAUDE.md)

CLAUDE.md does not exist in this project. No additional project-level constraints to report. All constraints derive from CONTEXT.md and the decisions documented above.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection: `index.html`, `css/animations.css`, `css/components.css`, `js/*.js` stubs — all IDs, classes, data attributes verified against actual files
- `.planning/phases/03-javascript-interactivity/03-CONTEXT.md` — locked decisions
- `.planning/REQUIREMENTS.md` — CALC-01 through FORM-10 requirement text

### Secondary (MEDIUM confidence)
- MDN Web Docs (IntersectionObserver, Intl.NumberFormat, fetch, FormData, requestAnimationFrame) — standard browser APIs with stable, well-documented behavior
- Vietnamese phone number regex `/^(0[35789])\d{8}$/` — covers major Vietnamese carriers (Viettel: 032-039, 086, 096-098; Mobi: 070, 079, 077, 076, 078, 089, 090, 093; Vina: 081-086, 091, 094; Gmobile: 059, 099) — the regex in D-14 covers prefixes 03x, 05x, 07x, 08x, 09x

### Tertiary (LOW confidence)
- None. All claims verified against actual project files or standard browser API documentation.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all browser-native APIs, no third-party dependencies
- Architecture: HIGH — all DOM targets verified against actual `index.html`; CSS classes verified against actual `components.css` and `animations.css`
- Pitfalls: HIGH — derived from direct code inspection (e.g., CSS mismatch discovery, `#calc-result` initial state) and well-known JS gotchas

**Research date:** 2026-03-29
**Valid until:** 2026-09-29 (browser APIs are stable; CSS and HTML structure will not change in this project)
