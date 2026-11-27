# Copilot Instructions — U

The front door for this repo is **[README.md](../README.md)**, for people and AI
alike: read its "Working on this repo" section and follow it (start order,
`make help`, HAL, Autopilot, rules). The master layer is
`T/.github/copilot-instructions.md`; do not repeat it here.

## AI-only rules

- **Start of session:** run `HAL copilot start` yourself (no pasting needed).
  If `HAL` is not found, run `T.Dot/bin/HAL copilot start` (Git Bash) and tell
  the author the device is not set up yet (T's README, "Working in these repos").
- **After your context is summarised or compacted,** re-read CURRENT.md and the
  end of the active chat file before answering; do not trust the summary over
  the files.
- **Facts are pointed to, never copied.** Papers, DOIs and status:
  `Dist/PAPERS.yaml`. Current work: `docs/agent/CURRENT.md`. Open items:
  `ISSUES.md`. Commands: `make help`, `HAL help`. Use the full form of every
  HAL command.
- **Save as you go:** `HAL copilot save` at milestones and before long-running
  work, so a sudden break loses nothing.
- **Ignore `*.OBSOLETE`** files and directories: kept for history only.
- **Line endings are LF** in every file and repo (`.gitattributes` `eol=lf`; BUILD.md rule 7). From
  PowerShell never write files with `Set-Content`/`Out-File` (they write CRLF): use Python with
  `newline="\n"` or `[IO.File]::WriteAllText` with `\n`.
- **Builds** follow `docs/BUILD.md`: Make, pandoc and Lua; scripts never write
  markup. Commit messages end with the trailer
  `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`.
- **Evidence labels** for claims: `docs/agent/THEORY-STATUS.md`.
- **Never** paste or commit tokens; Zenodo tokens live in the environment only.
- **No sub-agents** (author, 13 Oct): do the work yourself, one step at a time. A running
  agent cannot be stopped, and the runtime may pick a model the author has ruled out (no GPT).
- **At most two Lean processes at a time** (author, 13 Oct): a `lake build`, a towers
  export, the ledger judge or a `lake env lean` count one each.
