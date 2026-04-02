---
phase: 03-javascript-interactivity
plan: 02
subsystem: ui
tags: [javascript, form-validation, calculator, amortization, vnd, fetch, no-cors]

# Dependency graph
requires:
  - phase: 03-javascript-interactivity/03-01
    provides: nav.js, animations.js - DOM patterns and IIFE module structure established

provides:
  - Live amortization calculator with VND formatting and auto-fill to lead form
  - Blur validation for name, phone (VN regex), and consent checkbox
  - Optimistic submit: fire-and-forget fetch + instant success state
  - CSS error and success state classes for lead form

affects: [phase-04-content-legal, phase-05-deploy]

# Tech tracking
tech-stack:
  added: [Intl.NumberFormat vi-VN VND, FormData, fetch no-cors]
  patterns:
    - IIFE module pattern (function () { 'use strict'; }()) for all JS modules
    - parseFloat over Number() to avoid empty-string false positive
    - dataset.touched guard for blur-only validation (only show errors after user interaction)
    - Array of all validator results evaluated before any.every() — show all errors at once
    - Fire-and-forget fetch with .catch(noop) — optimistic UI, network failure silently swallowed

key-files:
  created: []
  modified:
    - js/calculator.js
    - js/form.js
    - css/components.css

key-decisions:
  - "parseFloat used instead of Number() for calculator inputs — Number('') returns 0, a false positive for positive-value check"
  - "calcResult.hidden = true on init hides the placeholder dash until all 4 calculator fields have valid values"
  - "validateAll() calls all 3 validators before checking results — ensures all error messages show simultaneously on submit"
  - "dataset.touched guard on blur prevents name/phone errors from showing before user types anything"
  - "fetch uses mode: no-cors with PLACEHOLDER_URL — opaque response, .catch() swallows network errors for Phase 3"

patterns-established:
  - "Calculator pattern: getPositiveFloat(input) using parseFloat + isFinite guard for safe numeric extraction"
  - "Form error pattern: showError(field, msg) / removeError(field) pair with .lead-form__error span + aria-invalid"
  - "Optimistic submit pattern: hide form, show success div immediately, fire fetch in background"

requirements-completed: [CALC-01, CALC-02, CALC-03, CALC-04, FORM-01, FORM-03, FORM-04, FORM-05, FORM-08, FORM-09]

# Metrics
duration: 15min
completed: 2026-03-29
---

# Phase 03 Plan 02: Calculator + Lead Form JavaScript Summary

**Amortization calculator with VND Intl.NumberFormat and LTV auto-fill into a validating lead form that submits optimistically via fire-and-forget fetch**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-29T03:15:00Z
- **Completed:** 2026-03-29T03:30:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Loan calculator reads 4 inputs live, computes monthly payment using standard amortization formula, formats in VND via `Intl.NumberFormat('vi-VN', { currency: 'VND' })`, and auto-fills `#field-loan-amount` with the raw loan principal
- Lead form validates name (min 2 chars), phone (VN regex `/^(0[35789])\d{8}$/`), and consent checkbox on blur (after touched) and on submit (all fields at once); invalid fields show red inline error spans with `role="alert"` and `aria-invalid="true"`
- Valid form submit immediately hides the form and shows a `Cảm ơn! / Chúng tôi sẽ liên hệ trong 24h` success div, while the fetch to the placeholder Google Apps Script URL fires in the background
- CSS error states (`.lead-form__error`, `.lead-form__input--invalid`) and success states (`.lead-form__success`, `.lead-form__success-heading`, `.lead-form__success-text`) added to `css/components.css`

## Task Commits

No git repository — changes applied directly to working files.

1. **Task 1: Implement calculator.js** - js/calculator.js (feat)
2. **Task 2: Implement form.js + CSS error/success states** - js/form.js, css/components.css (feat)

## Files Created/Modified

- `js/calculator.js` - Live amortization calculator: 4-input listener, `calculateMonthly()`, VND formatter, `calcResult.hidden` toggling, auto-fill to `#field-loan-amount` (77 lines)
- `js/form.js` - Form validation module: `showError/removeError`, `validateName/Phone/Consent`, blur+touched guard, `validateAll()`, `scrollToFirstError()`, submit handler with fire-and-forget fetch, `showSuccessState()` (157 lines)
- `css/components.css` - Appended `.lead-form__error`, `.lead-form__input--invalid`, `.lead-form__success`, `.lead-form__success-heading`, `.lead-form__success-text` rules after existing `.lead-form__privacy` rule

## Decisions Made

- Used `parseFloat` over `Number()` for calculator input extraction: `Number('')` returns `0` which passes a `> 0` check as false positive; `parseFloat('')` returns `NaN`, caught by `isFinite()` guard
- `calcResult.hidden = true` set on IIFE init so the "—" placeholder is invisible until calculation is ready
- `validateAll()` uses array-collect pattern (`var results = [v1, v2, v3]; results.every(Boolean)`) rather than short-circuit `&&` so all field errors display simultaneously on submit
- `dataset.touched` guard means blur listeners only fire after the user has typed into the field — prevents errors appearing on page load focus-tab cycles
- Success state uses `form.parentElement.appendChild(msg)` not `form.replaceWith(msg)` — preserves parent container padding/styling

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required. Google Apps Script URL is set to `PLACEHOLDER_URL = 'https://script.google.com/placeholder'` — client must replace this with the real Apps Script deployment URL in Phase 4/5.

## Known Stubs

- `PLACEHOLDER_URL` in `js/form.js` line 13: `'https://script.google.com/placeholder'` — fetch target is intentionally a placeholder. Real Google Apps Script URL to be wired in Phase 4 or 5 when client provides it. Does not block Phase 3 goal (form UI behavior works; fetch fails silently per design).

## Next Phase Readiness

- Calculator and form modules are fully functional — the page's primary conversion funnel is operational
- Phase 4 (legal/content) can replace consent checkbox label with actual legal text and `PLACEHOLDER_URL` with real Apps Script endpoint
- Phase 5 (deploy) can run end-to-end smoke test with real form submission

## Self-Check: PASSED

- FOUND: js/calculator.js (77 lines, Intl.NumberFormat, Math.pow, r===0 guard, field-loan-amount)
- FOUND: js/form.js (157 lines, VN_PHONE_RE, showError/removeError, dataset.touched, validateAll, fetch no-cors, Cam on Vietnamese diacritics)
- FOUND: css/components.css (.lead-form__error, .lead-form__input--invalid, .lead-form__success appended)
- FOUND: 03-02-SUMMARY.md

---
*Phase: 03-javascript-interactivity*
*Completed: 2026-03-29*
