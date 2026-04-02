---
phase: 3
slug: javascript-interactivity
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — pure HTML/CSS/JS, no test runner |
| **Config file** | None — Wave 0 specifies manual verification steps per plan |
| **Quick run command** | Open `index.html` in browser, verify specific feature for that task |
| **Full suite command** | Open `index.html` in browser, verify all 5 ROADMAP Phase 3 success criteria |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Open `index.html`, verify the specific feature implemented in that task
- **After every plan wave:** Full manual checklist — all 5 ROADMAP Phase 3 success criteria
- **Before `/gsd:verify-work`:** Full suite must pass
- **Max feedback latency:** 5 minutes

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-nav-01 | nav.js | 1 | NAV-02, NAV-03 | manual | Open browser, DevTools 375px, tap hamburger | ✅ | ⬜ pending |
| 3-nav-02 | nav.js | 1 | NAV-04 | manual | Scroll page, observe active link class change | ✅ | ⬜ pending |
| 3-calc-01 | calculator.js | 1 | CALC-01, CALC-02, CALC-03 | manual | Enter 2000000000, 70, 20, 8 → see "9.342.000 ₫" | ✅ | ⬜ pending |
| 3-calc-02 | calculator.js | 1 | CALC-04, CALC-05, CALC-06 | manual | Fill calc → scroll to form → verify loan amount field | ✅ | ⬜ pending |
| 3-anim-01 | animations.js | 1 | SVC-02, PROJ-02, PROC-01 | manual | Scroll page, observe cards fade in; stats count up | ✅ | ⬜ pending |
| 3-form-01 | form.js | 2 | FORM-03, FORM-04, FORM-05 | manual | Submit empty form → errors; invalid phone → error | ✅ | ⬜ pending |
| 3-form-02 | form.js | 2 | FORM-08, FORM-09 | manual | Valid submit → form hides, "Cảm ơn!" shown instantly | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Manual verification checklist for all CALC + FORM requirements included in each plan's Wave 0 task
- [ ] `#calc-result` initial hidden state step in calculator.js plan
- [ ] Nav hamburger open/close test step at 375px DevTools mobile viewport

*No automated framework to install — all manual. Wave 0 tasks in each plan must include explicit browser verification steps.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Calculator live output "5.234.000 ₫" | CALC-02, CALC-03 | No test runner; DOM output | Enter 2000000000, 70, 20, 8 in calc fields; verify `#calc-result-value` text |
| Loan amount auto-fills form field | CALC-04 | Cross-module DOM write | Fill calculator; scroll to contact form; verify `#field-loan-amount` has numeric value |
| Inline error on blur | FORM-03 | DOM mutation | Click name field, blur without typing → error span appears |
| Phone regex blocks 0123456789 | FORM-04 | Regex behavior | Enter "0123456789" → error; "0912345678" → no error |
| Consent blocks submit | FORM-05 | UX behavior | Submit without checkbox → error; check box → no error |
| Optimistic success message | FORM-08, FORM-09 | Async timing | Valid submit → "Cảm ơn!" appears immediately, form hidden |
| Nav scroll-spy active state | NAV-03, NAV-04 | IntersectionObserver | Scroll to each section; verify correct nav link gets `.site-nav__link--active` |
| Stats counter counts up | SVC-02 | Animation timing | Scroll to services section; verify numbers animate from 0 to target |
| Scroll-reveal on cards | PROJ-02, PROC-01 | IntersectionObserver | Scroll to project cards and process steps; verify fade-in animation |
| Mobile hamburger toggle | NAV-02 | Mobile viewport | DevTools 375px; tap hamburger; nav slides down; tap link; nav closes |

---

## Validation Sign-Off

- [ ] All tasks have manual verify steps in Wave 0
- [ ] Sampling continuity: manual verify step after every task
- [ ] Wave 0 covers all MISSING automated references
- [ ] No watch-mode flags (n/a — no test runner)
- [ ] Feedback latency < 5 minutes (manual)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
