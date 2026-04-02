---
phase: 1
slug: html-foundation-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static file validation (browser + curl) |
| **Config file** | none |
| **Quick run command** | `ls index.html css/main.css css/layout.css css/components.css css/animations.css` |
| **Full suite command** | `curl -I https://[netlify-url]` post-deploy |
| **Estimated runtime** | ~5 seconds (smoke checks); manual browser inspection for visual checks |

---

## Sampling Rate

- **After every task commit:** Run `ls` smoke check for required files + `grep` for critical tokens
- **After every plan wave:** Full browser visual check at 375px, 768px, 1200px
- **Before `/gsd:verify-work`:** Full suite must be green + post-deploy curl header verification
- **Max feedback latency:** ~10 seconds for automated smoke checks

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-T1 | 01-01 | 1 | FOUND-01 | smoke | `ls index.html css/main.css css/layout.css css/components.css css/animations.css js/nav.js js/calculator.js js/animations.js js/form.js netlify.toml img/.gitkeep` | ❌ W0 | ⬜ pending |
| 01-01-T2 | 01-01 | 1 | FOUND-03 | smoke | `grep -c '\-\-color-navy' css/main.css && grep -c '\-\-space-md' css/main.css && grep -c '\-\-shadow-card' css/main.css` | ❌ W0 | ⬜ pending |
| 01-01-T3 | 01-01 | 1 | FOUND-07 | smoke | `grep -c '375px\|768px\|1200px' css/layout.css` | ❌ W0 | ⬜ pending |
| 01-02-T1 | 01-02 | 2 | FOUND-02,04,05 | smoke+manual | `grep -c 'lang="vi"' index.html && grep -c 'defer' index.html` + browser visual | ❌ W0 | ⬜ pending |
| 01-03-T1 | 01-03 | 3 | FOUND-07 | manual | Browser DevTools responsive mode at 375px, 768px, 1200px | N/A | ⬜ pending |
| 01-03-T2 | 01-03 | 3 | FOUND-06 | smoke | `curl -I https://[netlify-url] \| grep -E "X-Frame-Options\|X-Content-Type-Options"` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `img/.gitkeep` — required by FOUND-01 file structure contract
- [ ] `index.html` stub — required before Plan 01-02 content task
- [ ] `css/main.css`, `css/layout.css`, `css/components.css`, `css/animations.css` stubs — required before token/layout tasks
- [ ] `js/nav.js`, `js/calculator.js`, `js/animations.js`, `js/form.js` stubs — required by FOUND-01
- [ ] `netlify.toml` — required by FOUND-06

*All Wave 0 items are created in Plan 01-01 Task 1.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Be Vietnam Pro + Montserrat fonts render correctly; Vietnamese diacritics display | FOUND-04 | Font rendering requires visual browser inspection | Open index.html, verify "Đăng Ký Tư Vấn Miễn Phí" renders with correct typeface and diacritics |
| Phosphor Icons CDN loads; test icon renders at 24px | FOUND-05 | Icon rendering requires visual browser inspection | Open index.html, verify `<i class="ph-bold ph-house">` renders as house icon at correct size |
| No layout errors at 375px, 768px, 1200px viewports | FOUND-07 | Responsive layout requires visual browser inspection | Open DevTools, test each breakpoint, verify no overflow or misaligned elements |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s for automated checks
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
