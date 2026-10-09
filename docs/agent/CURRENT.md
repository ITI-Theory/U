# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (9 Oct 2026, afternoon; author in hospital, post-op)

The therapist demo happened by phone on her older copy of the app (no tour).
Her feedback, "why a presentation for a Gestalt therapist? how does it help my
daily work?", led to the poke-centred consulting-room Presentation. Demo log and
findings: ISS-047 ("Demo of 9 Oct").

Built 8-9 Oct (all pushed; details in ISSUES):
- Spoken H-AL tours (`registry/tours/`): `hal-therapist` (Demo, 3 min),
  `hal-presentation` (10 min), `hal-gestalt` (11.5 min, HAL-UAT tailored),
  `hal-consulting-room` (9 min, built on the poke). Tour fields `abstract`,
  `overlay`, `pause`, `poke`, view key `ui=clean` (docs/TOUR-LANGUAGE.md).
- Several windows on one PC (`?screen=cockpit`, `?screen=engine`; tablets via
  spacedesk); whole-brain state panel; Further reading per level.
- HAL-UAT loaded (30 sources); the app's H-AL answers from it; the bridge renews
  the NotebookLM session itself (no login windows).
- Layout checks pass on all 46 PDFs; Atlas triptychs fixed (author to check
  printed pages 70-83); P1 text restored; P11 abstract fixed.
- New: ISS-051 (Visualize everything, equation-first tabs, one-file library).

Engine room FUEL (ISS-050) done and tested: H-AL answers from HAL-UAT (30
sources); the old HAL notebook is empty; MOTHER has only 1 source.

## Next

1. Check MOTHER's notebook (1 source only; it should hold the released work).
2. Author: run `#tour=hal-consulting-room` once with the HAL voice; check the
   Atlas pages 70-83; P21 sign-off.
3. Then the release path in ISS-047 / ISS-001: restage rc3.3, NotebookLM UAT,
   Lulu proofs, Zenodo new versions (P1, P11 and the rest marked
   needs-new-version).
4. ISS-051 Visualize everything; more slip-ins from ISSUES (rapid development:
   every pass picks up what fits).
