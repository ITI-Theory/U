# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (19 Oct 2026, 01:00)

**Two lines of work.** `main` is the release line (ISS-114, Wed 21 Oct). `audio` is the audio work
(ISS-118, from tag `pre-audio-2026-10-18`): NKS reader, the rig, the Soma script for Live, the eight
knobs (Macros 1-7 the feelings, 8 the field; the app now sends Φ as CC 29). `main` is merged into
`audio` regularly; `audio` goes into `main` when the author says.

**The music is private** (author, 18 Oct): it runs on his machine only, the Soma Machine generates
nothing, it passes its emotional score in; the output must be free (information about music, never
its notes). Me/music: compose.py (the score to MusicXML and MIDI), brief.py (YouTube text only),
preview.py, to_live.py (`make live`: the score straight into Live over AbletonOSC, tested: 646 notes).
What the project uses is kept by hand in Me/Ops/music-inventory.md (as the author adds things);
where things live in Me/Ops/locations.md and OneDrive\lib\README.md (pkg installers, lib content,
prj work). Installed 18-19 Oct: Phase Plant, Scaler 3, Serum 2 (its orchestra: strings, winds,
choir; content in OneDrive\lib\xfer), OBS with plugins, ffmpeg, AbletonOSC (Live slot 1, answering).
Left in Live: Configure Serum 2's and Phase Plant's Macro 1-8 (Live hides big plugins' parameters).

**Closed 18 Oct:** ISS-087 (the Jumbo cut by edition, 294 pages), ISS-100 (the overview plate),
ISS-101 (the frequency axis and the limbic route in their papers), ISS-116 (privacy: eight files to
Me, the markers). Also: the Gestalt paper names interoception (ISS-094), the rivals check 0 gaps,
46 features approved (the gate after the release), the 2021 score's header neutral, the River Film
attested. Tools: `make show-film` (the music film recorded), `make film-render` (frame by frame at
4K), `make obs-soma` (OBS's Soma collection) and MOTHER's `/obs`, interview.py (Isa, Kokoro
bf_isabella 0.9, asks; Whisper large-v3 hears; answers in Me/todo/answers), macfac.py on a private
case folder (ISS-063's inversion test drafted in Me/film/cases, for the author to confirm).

**Waiting on the author:** the facts of the inversion test; the strap test (ISS-111); the Gallery's
proof, cover, cut and SNAP shoot (ISS-097); the real show film (90 minutes); the Azure Speech role
(the free account exists, optional); the Zenodo tokens and the Lulu account (release days).

## Next: the release, by 21 October 2026 (ISS-114, the epic)

1. Content freeze end of Sat 17 Oct (confirmed by the author, 16 Oct); the big build; release-check all PASS.
2. Sun 18: the author's UAT reading and app walk; fixes.
3. Mon 19: make dist; the Zenodo sandbox rehearsal (the author's token); release-check (privacy now clean).
4. Tue 20: Zenodo live; the DOIs everywhere; the print editions listed on Lulu at cost.
5. Wed 21: the app published as a release, the web site, the tags.
Kept open, not blockers: ISS-105 (levels shell, art pass), ISS-107, ISS-111, ISS-112.
