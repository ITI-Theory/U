# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (6 Oct 2026, 22:30; author in hospital, post-op)

Admin before release (ISS-044) is done except the scope check and UAT: README
front doors, working rules, HAL on Git Bash, one chat process, stale-file review
(release-check section 15 guards `.OBSOLETE`).

Tonight: the Soma Machine went up as a **public UAT preview** at
https://www.t-theory.org/app/ (repo ITI-Theory/t-theory.org, cloned beside the
others; built from U 728ac85 with `vite build --base=./`, copied by hand; home
page has a preview label and contact details). Fixes on the way: 11D falls back
to 8D at the quantum scales; maths re-renders once KaTeX loads. First outside
reaction logged in paper/FIELD-NOTES.md (informal). `make app-start` runs it
locally; `make app-publish` is still to do (ISS-046).

NotebookLM UAT is ready but blocked on the author's `notebooklm login`
(saved login dates from 5 Oct). Both tracks are restaged (6 Oct); `make uat-nlm
TRACK=... DRY=1` works and reuses the standing notebooks (f6189d45 papers,
f9c01519 ttheory), replacing their sources.

Active chat: `write_a_book` (Me/chats/Inbox). Parked: HAL next steps (ISS-045),
carried-over items and app follow-ups (ISS-046).

## Next

1. Scope check: upload the chat files and the release candidates to a private
   NotebookLM notebook and ask what was asked for and is missing (by hand in
   the web UI until `HAL uat scope` exists, ISS-045).
2. UAT, release runbook `Dist/README.md`:
   - P21 sign-off (author): read `bld/papers/cosmological-constant-derivation.pdf`;
     if happy, P21 `status: pending-upload` in `Dist/PAPERS.yaml`, then `make generate`.
   - NotebookLM UAT: author runs `notebooklm login` (mother venv; press Enter
     in the terminal after signing in); then `make uat-nlm TRACK=papers|ttheory`
     (DRY=1 first; tracks already staged 6 Oct, restage if sources change);
     review with the author; log in `paper/UAT.md`.
   - Lulu preview of the volumes (author).
   - `make dist` only after UAT passes; compare with the manifests; commit Dist.
   - Zenodo with the author's tokens: sandbox, then live (plan: 44 records, 0 errors).
3. Decide whether the course book (`make textbook`, ISS-041) and the Field
   Atlas (`make atlas`; bookfactory print, ISS-040) ship in this release.

## Built and current

- Course book *[T]-Theory: A Course*: A4, about 258 pages, `make -C
  Part2/book/field-atlas-textbook check` passes; awaiting the author's read-through.
- Field Atlas: A3 and HTML; bookfactory edition (ISS-040).
- Soma Machine: tours and observatory mode (ISS-038), H-AL voice (ISS-037);
  public preview at www.t-theory.org/app/ (6 Oct).
- `bin/release-check`: 15 PASS, 0 FAIL (5 Oct).
