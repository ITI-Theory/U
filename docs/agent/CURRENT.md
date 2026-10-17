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

**Evening (16 Oct):** the cheat sheets stand on their own (a credit line on every page,
`make -C sherlock standalone`, release-check 12a); the Gateway book's glossary (Words You Will
Meet); the QR codes decoded by `make -C sherlock presence`; the Gallery's pictures checked as the
programme's own (release-check 14d); spoken UAT notes (`v` in `HAL uat`, uat/scripts/dictate.py);
Kokoro beside Piper in the bridge (`voices.py`, choose by ear); the mix read into a cue sheet
(`make show-cues`) and SHOW mode (ROOTED, MOTHER /show); where a feeling is in the brain, sourced
(registry/regions.yaml) and `/feel` in MOTHER; ISS-115 records what Sherlock needs before a piece
can carry the author's emotions (a sound grammar, read-back, provenance). Closed: ISS-099.

**Later (16 Oct, 21:20):** what is private stays private (ISS-116: `make -C sherlock privacy`,
release-check 14e; H-AL's answers now go to Me, never U, which is public; five old files await the
author's decision); Sherlock for music (ISS-115): the sound grammar (`make -C sherlock grammar`),
provenance of the scores (`make -C sherlock provenance`), read-back of a recording against a score
(`make -C sherlock readback`); the band over MIDI OUT (channel 2: chord pads 60-66, CC 30-33) for
Scaler 3, which the author is setting up.

**The feature hour (16 Oct, late):** the jokes on the web (web/home.md); the overview as a tour stop
(`overview: 1`); the Gallery in the app (GALLERY, 13 rooms, 87 plates); the hubs registry
(registry/hubs.yaml, checked at build); every feature tagged science or show (registry/features.yaml,
`make -C sherlock features`, for the author's approval); the strap beyond the score (the body's heart,
the dyad, the landscape's noise); the film's titles and credits; levels of visualisation by viewer
(registry/views.yaml, `make -C sherlock views`). Closed: ISS-079, 092, 098, 109, 113. The music
notebook upload (HAL-UAT-MUSIC, 38 old sources + 11 music) is planned in Me and paused.

**The visual pipeline (17 Oct, ISS-117; the audio comes after it):** docs/PIPELINE.md (one state; compose
once, the viewer's baseline compiled on top, perform with small live overrides; five kinds of jump; the
three FLY windows; questions in, pictures out; a new tool's save and see); the grand tour
(registry/tours/grand-tour.yaml, 18 places, UAT `app-grand-tour`); the film compiler
(scripts/compile-film.mjs, to bld/film/*.timeline.json, for picture and sound). Open: the app playing a
compiled timeline; transitions as declared kinds.

**Waiting on the author:** HAL's login (then the never-written questions, ISS-092); the voice by
ear; the Dark Matter Lord's two gaps; ISS-116's five files and the fis-2021 header; attesting the scores; the public notebook (ec1a7e74 or 16368cb3); the Zenodo
tokens; the Lulu account; the UAT walk (now 33 steps).

## Next: the release, by 21 October 2026 (ISS-114, the epic)

1. Content freeze end of Sat 17 Oct (confirmed by the author, 16 Oct); the big build; release-check all PASS.
2. Sun 18: the author's UAT reading and app walk; fixes.
3. Mon 19: make dist; the Zenodo sandbox rehearsal (the author's token).
4. Tue 20: Zenodo live; the DOIs everywhere; the print editions listed on Lulu at cost.
5. Wed 21: the app published as a release, the web site, the tags.
Kept open, not blockers: ISS-105 (levels shell, art pass), ISS-107, ISS-111, ISS-112.
