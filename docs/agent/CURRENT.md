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

**Overnight (Copilot):** the full UAT after the quota resets at 03:48: the books track, the
papers track, then HAL-UAT (uat/RC3/hal-uat-questions-rc3.2.md: built the right thing, never
written, the Dark Matter Lord's rivals, the emotions next door). Reports in uat/results/.

## Next (author)

1. Read the UAT reports (uat/results/*rc3.2*) and this file's overnight notes.
2. Your desk: the Zenodo sandbox account and token (Dist/zenodo/README.md); the physlib PR
   (ISS-085, read PR-DESCRIPTION.md first).
3. Then `make dist`, the Zenodo sandbox rehearsal, live, the DOIs; the Lulu order.
