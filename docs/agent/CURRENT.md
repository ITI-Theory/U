# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (13 Oct 2026, late evening; before the big build)

**Ready for the big build.** The author's order (21:34): ISS-051, ISS-063, ISS-093, then
ISS-092/094's book parts; then `make uat-stage-full`, the release check, the UAT (HAL-UAT
for Sherlock, the Wizard and the adversaries; a fresh notebook for the reader tests), the
Lulu preview, `make dist`, Zenodo (sandbox first). The course goes in the release (ISS-081).

**Done today, books and papers:**
- ISS-051 closed: sweep strips for all 91 varied figures (one y-scale), "see it move" Soma
  Machine views, both in HTML and the figure library (PDFs unchanged); the Soma Machine's
  equation panel has EQUATION / FIGURES / READ MORE tabs (the textbook's figures by level).
- ISS-063: the disclaimers as microtheories (`registry/microtheories.yaml`; P1, P2, P3, P18
  got the disclaimer they lacked); one set of types from OpenCyc for Sherlock and the app
  (`registry/level-types.yaml`, `make -C sherlock level-types`; musical expectancy was typed
  with a microtheory). Left: the private inversion test (the author confirms the cases first).
- ISS-093 closed: SH1's "After the snapshot" (ten lessons), a Formal Mathematics chapter on
  stale proof status. The lessons kept proving themselves: stale `sorry` rows in that book,
  overclaims on the booklets' summary page ("0 extra axioms", G2 "closed", "quantum
  advantage real"), all fixed.
- ISS-092: the Wizard scopes all fifteen domain books from the fractal manifest and checks
  every assigned paper is printed somewhere: P10, P14, P15, P25 were printed nowhere; now in
  Neuroscience, Physics and Trauma.
- ISS-094: Moriarty (`make moriarty`) 13 of 14 faults caught (the miss: a `sorry` count in
  prose naming no theorem); biological leakage checked (`make -C sherlock leakage`); the
  Wizard's adversary is the Dark Matter Lord (author). Left: the random-matrix stress test;
  the Dark Matter Lord's rivals and the BOFH's attacks go to the UAT.
- Ledger: reads camelCase names and "sorry"/"proof debt" claims: 586 citations, 0 disagree.
- Zenodo sandbox: `bin/zenodo-publish --sandbox check-token | rehearse`; P25's metadata;
  stale counts out of Dist/zenodo. **Author: create the sandbox account and token** (Dist
  zenodo/README.md, "Sandbox setup").
- The app: tours narrate by default with a START button; the Duet audio driver crashed
  Windows (17:29), not the app: use the Realtek speakers for demos.

## Next

1. The big build: `make uat-stage-full`, then `bin/release-check` (the standalone books and
   volumes grow by P10, P14, P15, P25: check Lulu's 800-page cap).
2. UAT: HAL-UAT (Wizard, Cyc neighbours, never written, the Dark Matter Lord's rivals, the
   BOFH), then a fresh notebook (reader tests), the author's reading, the Lulu preview.
3. `make dist`, Zenodo sandbox rehearsal, live, DOIs.
4. After the release: ISS-052 (app), the inversion test, the random-matrix test, ISS-090/091.
