# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (16 Oct 2026, evening)

**The release epic is ISS-114** (by Wed 21 Oct; content freeze end of Sat 17, confirmed). A
release-check dry run: 24 PASS, 2 FAIL, both for their days (the Lean appendix PDF in the big
build; three PDFs into Dist at `make dist`).

**Housekeeping (author, 16 Oct):** issue tasks are dev tasks; the author's steps are on the desk
(ISS-081, `bin/remind`); his walks, reads and tests are UAT (`uat/checklist.yaml`, `HAL uat`),
with a pointer left in the issue. A closed issue keeps no empty box (`[x]` done, `[-]` not done;
`bin/issues-check` enforces it). Closed today: ISS-094, ISS-102, ISS-108, ISS-110.

**Done today:** the three users (who.js, `registry/users.yaml` with companions resolved by
generate.py; THE GUIDE shows YOUR COMPANION), MOTHER's ROOTED gate and the Nostromo sounds, tours
as tabs, MY ROUTE (also on THE WORLDS' domes), WHEREAMI, POKE's IMPULSE/RESPONSE/RETURN, the model
(`registry/model.yaml`, `make -C sherlock model`), presence (`make -C sherlock presence`: 0 gaps);
the web site's source (`web/home.md`, `make web`, `make web-publish`; live when the author pushes
the site on the 21st) and `web/PITCH.md`; the names checked (`registry/presence.yaml`); the
splash credit line; the cathedral's neon pass and the palace to the great hall's standard; the
Dark Matter Lord (`make -C sherlock rivals`) and the BOFH (`make -C sherlock bofh`).

**Waiting on the author:** the jargon trap in the Gateway book (before the freeze; ISS-081); the
public notebook (ec1a7e74 or 16368cb3); the Zenodo tokens; the Lulu account; the UAT walk.

## Next: the release, by 21 October 2026 (ISS-114, the epic)

1. Content freeze end of Sat 17 Oct (confirmed by the author, 16 Oct); the big build; release-check all PASS.
2. Sun 18: the author's UAT reading and app walk; fixes.
3. Mon 19: make dist; the Zenodo sandbox rehearsal (the author's token).
4. Tue 20: Zenodo live; the DOIs everywhere; the print editions listed on Lulu at cost.
5. Wed 21: the app published as a release, the web site, the tags.
Kept open, not blockers: ISS-105 (levels shell, art pass), ISS-107, ISS-111, ISS-112.
