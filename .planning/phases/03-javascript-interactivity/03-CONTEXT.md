# Phase 3: JavaScript Interactivity - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire up all four JS modules so the page is fully interactive: nav responds to scroll and hamburger toggle, calculator computes live mortgage payments, scroll animations play on entry, and the lead form validates and submits. No new HTML/CSS — only JavaScript added to existing stubs.

Phase 3 covers: `nav.js`, `calculator.js`, `animations.js`, `form.js`
Phase 4 covers: actual Google Apps Script URL + legal text on consent checkbox.

</domain>

<decisions>
## Implementation Decisions

### nav.js — Hamburger + Scroll-spy
- **D-01:** Hamburger toggles `.site-nav` visibility via CSS class — slide down dropdown below the sticky header, full width. `aria-expanded` toggled on `.nav-toggle` button.
- **D-02:** Close nav on link click (all `.site-nav__link`) and on outside click.
- **D-03:** Scroll-spy via IntersectionObserver — add `.site-nav__link--active` to the link whose target section is in viewport. Threshold: 0.3 (section 30% visible = active).
- **D-04:** Smooth scroll already handled by CSS (`scroll-behavior: smooth`). nav.js does NOT add scroll behavior — only manages aria-expanded and active state.

### calculator.js — Live Amortization
- **D-05:** Listen on `input` event on all 4 calc inputs: `#calc-property-value`, `#calc-ltv`, `#calc-term`, `#calc-rate`.
- **D-06:** Formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]` where P = property value × (LTV/100), r = annual rate / 100 / 12, n = term in years × 12.
- **D-07:** Result displayed in `#calc-result-value` using `Intl.NumberFormat('vi-VN', {style:'currency', currency:'VND'})`.
- **D-08:** Auto-fill `#field-loan-amount` with raw loan amount (P = property value × LTV/100) as a plain number — the field is `type="number"` so no formatting string.
- **D-09:** Show `#calc-result` container only when all 4 inputs have valid values; hide/reset when any input is cleared.

### animations.js — Scroll-reveal (Minimal)
- **D-10:** Minimal scope — only 3 element types get scroll-reveal: `.service-card`, `.project-card`, `.process-step`.
- **D-11:** Stats counter on `.stat-item__value[data-count-target]` — count up from 0 to target number when `#services` section enters viewport. Restore "+" suffix after count (static text in HTML already has "+", so counter restores it after animation).
- **D-12:** Reveal mechanic: add `reveal` class to targets initially (via JS, not CSS), IntersectionObserver adds `reveal--visible` when in viewport. CSS handles fade-in/slide-up transition. Threshold: 0.15.
- **D-13:** Stagger delay for cards within same grid: 0ms, 100ms, 200ms (CSS `transition-delay` set via inline style).

### form.js — Validation + Optimistic Submit
- **D-14:** Validate on `blur` per field: name (required, min 2 chars), phone (regex `/^(0[35789])\d{8}$/`), consent checkbox (required). Show inline error message in `.lead-form__error` span inserted after the field.
- **D-15:** On submit: run full validation, scroll to first error if any. If valid, proceed.
- **D-16:** Phase 3 submit: `fetch()` with `method:'POST'`, `mode:'no-cors'`, `body: new FormData(form)` targeting a **placeholder URL** (`https://script.google.com/placeholder`). Log form data to `console.log` for debugging. Phase 4 replaces with real GAS URL.
- **D-17:** Optimistic UI — immediately after submit (do NOT await fetch), hide form and show success message: "Cảm ơn! Chúng tôi sẽ liên hệ trong 24h". No redirect.
- **D-18:** Consent checkbox: Phase 3 treats it as required (must be checked to submit). Phase 4 adds the legal text label — Phase 3 just enforces the required behavior.

### Claude's Discretion
- CSS classes for reveal states (e.g., `reveal`, `reveal--visible`) — add to `animations.css`
- CSS class for mobile nav open state (e.g., `.site-nav--open`) — add to `components.css`
- Exact transition durations and easing curves
- Error message text content (Vietnamese)
- Counter animation duration (suggested: 1.5s)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### HTML hooks (read before implementing any module)
- `index.html` — All IDs and classes targeted by JS: `.nav-toggle`, `.site-nav`, `.site-nav__link`, `#calc-property-value`, `#calc-ltv`, `#calc-term`, `#calc-rate`, `#calc-result`, `#calc-result-value`, `#field-loan-amount`, `#lead-form`, `#field-name`, `#field-phone`, `#field-consent`, `.stat-item__value[data-count-target]`, `.service-card`, `.project-card`, `.process-step`

### Requirements (JS-relevant)
- `.planning/REQUIREMENTS.md` §Loan Calculator Section (CALC-01 to CALC-06)
- `.planning/REQUIREMENTS.md` §Lead Capture Form (FORM-01 to FORM-10)
- `.planning/REQUIREMENTS.md` §Navigation (NAV-02, NAV-03, NAV-04)
- `.planning/REQUIREMENTS.md` §Services Section (SVC-02)
- `.planning/REQUIREMENTS.md` §Projects Section (PROJ-02)
- `.planning/REQUIREMENTS.md` §Process Section (PROC-01)

### CSS stubs to extend
- `css/animations.css` — Add `.reveal` / `.reveal--visible` classes here
- `css/components.css` — Add `.site-nav--open` mobile nav state here

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- All 4 JS files exist as stubs with comment headers — just fill them in, no new files needed
- `index.html` already has `defer` on all script tags (FOUND-02) — load order is guaranteed

### Established Patterns
- CSS custom properties in `:root` for all values — JS should NOT hardcode colors/sizes
- BEM class names locked: `.site-nav`, `.site-nav__link`, `.nav-toggle`, `.lead-form`, `.calc-form__input` — must not be renamed
- `aria-expanded="false"` already on `.nav-toggle` — JS toggles to `"true"`/`"false"` (strings, not booleans)

### Integration Points
- **calculator.js → form.js**: Calculator writes to `#field-loan-amount` (raw number). Form reads it on submit. No shared module needed — direct DOM write.
- **animations.js → CSS**: Needs `.reveal` initial state and `.reveal--visible` transition added to `animations.css`
- **nav.js → CSS**: Needs `.site-nav--open` class for mobile dropdown state added to `components.css`
- **Stats counter**: `data-count-target` values are integers (500, 200, 10). HTML static text includes "+" — counter restores "+" suffix after animation completes.

</code_context>

<specifics>
## Specific Ideas

- Form submit: Phase 3 logs to console for testing; Phase 4 drops in real GAS URL — no structural change needed between phases
- Scroll-reveal minimal scope deliberately chosen — avoids animating every element, keeps motion purposeful
- Mobile nav: slide down dropdown (không overlay) — simpler, không che content

</specifics>

<deferred>
## Deferred Ideas

- Google Apps Script URL và legal consent text — Phase 4
- Zalo floating button — Phase 4
- Privacy policy modal — Phase 4

</deferred>

---

*Phase: 03-javascript-interactivity*
*Context gathered: 2026-03-29*
