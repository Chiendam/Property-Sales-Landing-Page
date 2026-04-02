# Phase 3: javascript-interactivity - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions captured in CONTEXT.md — this log preserves the discussion.

**Date:** 2026-03-29
**Phase:** 03-javascript-interactivity
**Mode:** discuss
**Areas discussed:** Form submit (Phase 3 vs 4 boundary), Scroll-reveal scope, Mobile nav behavior

## Gray Areas Presented

| Area | Options | Chosen |
|------|---------|--------|
| Form submit endpoint | A: optimistic with failing no-cors / B: skip fetch / C: dummy URL + console.log | **C** |
| Scroll-reveal scope | A: all sections + cards / B: only cards (no section containers) / C: minimal (services, projects, process) | **C** |
| Mobile nav visual | A: slide down dropdown / B: push-down / C: full-screen overlay | **A** |

## Corrections Made

No corrections — user selections were direct choices, not corrections to pre-formed assumptions.

## Key Decisions From Discussion

- **Form Phase 3/4 boundary**: Phase 3 implements full form.js including fetch() with placeholder URL + console.log. Phase 4 only needs to swap in the real GAS URL — no structural refactor.
- **Minimal scroll-reveal**: Only `.service-card`, `.project-card`, `.process-step` get IntersectionObserver reveal. Keeps motion purposeful, avoids over-animating.
- **Mobile nav**: Slide down dropdown (not full-screen overlay) — simpler, practical for a lead-gen page where users need to navigate quickly.
