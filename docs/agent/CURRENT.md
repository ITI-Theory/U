# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (14 Oct 2026, night; the author asleep from 01:55)

**Release candidate rc3.2, rebuilt and in UAT.** The big build ran (13 Oct 23:40) and again
after each fix; the release check passes apart from what `make dist` brings (P25 and Vol III
PDFs into Dist). Volumes: I 617, II about 511, III 562 pages, all under Lulu's 800.

**Found and fixed since the build:**
- The UAT (books track, 3 answers before the quota ran out): the master contents ran to 25
  pages (each embedded paper's sections listed as chapters; now one entry per paper), the
  cheatsheet inserts were in no contents (now listed), and 34 headings in four books were
  printed as text (no blank line before them; fixed, and release check 12b).
- QUANT-EXP-1 under stress (sherlock/stress_quant.py): P2's 0.41 is the occupancy of a quarter
  of the states, starting at 0.25; the Awe state itself ends below 0.01; simulated annealing,
  untested, does better on random landscapes. Author: yes; P2's abstract, a sixth limitation,
  verdict and conclusions corrected; the old "3/3 against 0/48" gone from P11, P12, P13, the
  thesis preamble and the books; the booklets' "D-Wave ... quantum advantage is real" gone.
  P2's translations keep the old abstract (not in this release).
- The books Makefile now rebuilds volumes and books when an embedded paper changes.
- The Wizard's neighbourhood (sherlock/neighbours.py): 27 feelings next to the programme's that
  no book names.
- physlib: the FLRW structure prepared in ../physlib-flrw for the author to open (ISS-085).

**Overnight (Copilot), what happened:**
- The UAT did not run: the NotebookLM login expired before 03:52 (AUTH_ERROR), so no question
  was asked and no quota used. It needs a fresh login (`.venv\Scripts\notebooklm login` in
  apps/instrument/mother); then `make uat-nlm TRACK=ttheory`, `make uat-nlm TRACK=papers` and
  `apps/instrument/mother/.venv/Scripts/python.exe uat/scripts/hal_uat.py
  uat/RC3/hal-uat-questions-rc3.2.md` (about 30 questions, under an hour).
- Staged for it: papers at 7e46900, books at c2a7f27, both with the QUANT-EXP-1 corrections (the
  Lean appendix too); release check: 24 pass, 1 fail (the 3 PDFs `make dist` brings).
- Fixed: the books Makefile now rebuilds volumes when an embedded paper changes (the omnibus had
  kept P2's old text).
- DOIs before the print run, ready: `bin/zenodo-publish reserve` (unpublished drafts with
  reserved DOIs for the 22 new records), `fill-dois` (into PAPERS.yaml), then the build; runbook
  in Dist/zenodo/README.md. Needs ZENODO_TOKEN (and the sandbox token for the rehearsal).
- VS Code extension (ISS-090): packaged locally (apps/vscode/bld/soma-machine-0.1.0.vsix),
  Sherlock: Set up added (warned first), the WAY IN stop added, Marketplace metadata prepared;
  nothing published.
- For a decision some day: the papers omnibus shows its two books (the Soma-Field book, the
  Tensor) with the same headings as papers (UAT TH-1); the omnibus document model wants them as
  books. Not urgent.

## Next (author)

1. Log in to NotebookLM (as last night); I run the UAT (under an hour) and fix what it finds.
2. Set ZENODO_SANDBOX_TOKEN and ZENODO_TOKEN (user environment, Dist/zenodo/README.md); I
   rehearse on the sandbox, then `reserve` and `fill-dois` with your go, and rebuild with the DOIs.
3. Your read of the UAT reports; `make dist`; publish; the Lulu uploads (early afternoon).
4. When you like: the physlib PR (ISS-085), the VSIX (ISS-090).
