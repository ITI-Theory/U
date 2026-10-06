# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (6 Oct 2026, evening)

Admin before release, ISS-044. Done: README front doors (T, U, U.Dot), working
rules (T.Ops naming standard), instruction files point to README, HAL on Git
Bash (dry run `-n`, `copilot start|save|wrapup`, `chat new|list`,
`mother|hal ask`), one bash standard, one chat process (Me/chats `make copilot`).
In progress: nothing; the stale-file review finished on 6 Oct (ISS-044).

Active chat: `write_a_book` (Me/chats/Inbox). Parked: HAL next steps (ISS-045,
including installing HAL on the laptop), items carried over from the old
CURRENT.md (ISS-046).

## Next

1. Scope check: upload the chat files and the release candidates to a private
   NotebookLM notebook and ask what was asked for and is missing (by hand in
   the web UI until `HAL uat scope` exists, ISS-045).
2. UAT, release runbook `Dist/README.md`:
   - P21 sign-off (author): read `bld/papers/cosmological-constant-derivation.pdf`;
     if happy, P21 `status: pending-upload` in `Dist/PAPERS.yaml`, then `make generate`.
   - NotebookLM UAT: restage both tracks, then `make uat-nlm TRACK=papers|ttheory`
     (DRY=1 first) swaps the standing notebooks' sources and asks the worksheets
     (PROCESS.md, UAT Setup); review with the author; log in `paper/UAT.md`.
     Needs `notebooklm login` (expired since 1 Oct).
   - Lulu preview of the volumes (author).
   - `make dist` only after UAT passes; compare with the manifests; commit Dist.
   - Zenodo with the author's tokens: sandbox, then live (plan: 44 records, 0 errors).
3. Decide whether the course book (`make textbook`, ISS-041) and the Field
   Atlas (`make atlas`; bookfactory print, ISS-040) ship in this release.

## Built and current

- Course book *[T]-Theory: A Course*: A4, about 258 pages, `make -C
  Part2/book/field-atlas-textbook check` passes; awaiting the author's read-through.
- Field Atlas: A3 and HTML; bookfactory edition (ISS-040).
- Soma Machine: tours and observatory mode (ISS-038), H-AL voice (ISS-037).
- `bin/release-check`: 15 PASS, 0 FAIL (5 Oct).
