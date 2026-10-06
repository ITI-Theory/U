# Copilot Instructions — U

The front door for this repo is **[README.md](../README.md)**, for people and AI
alike: read its "Working on this repo" section and follow it (start order,
`make help`, HAL, Autopilot, rules). The master layer is
`T/.github/copilot-instructions.md`; do not repeat it here.

## AI-only rules

- **Start of session:** run `HAL copilot start` yourself (no pasting needed).
  Until it is installed (ISS-044), read README.md, `docs/agent/CURRENT.md` and
  the end of the active chat file in `Me/chats/Inbox/`.
- **After your context is summarised or compacted,** re-read CURRENT.md and the
  end of the active chat file before answering; do not trust the summary over
  the files.
- **Facts are pointed to, never copied.** Papers, DOIs and status:
  `Dist/PAPERS.yaml`. Current work: `docs/agent/CURRENT.md`. Open items:
  `ISSUES.md`. Commands: `make help`, `HAL help`. Use the full form of every
  HAL command.
- **Save as you go:** `HAL copilot save` at milestones (until installed:
  export the chat with `make -C ../../Me/chats copilot`, once that target
  exists) and before long-running work, so a sudden break loses nothing.
- **Ignore `*.OBSOLETE`** files and directories: kept for history only.
- **Builds** follow `docs/BUILD.md`: Make, pandoc and Lua; scripts never write
  markup. Commit messages end with the trailer
  `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`.
- **Evidence labels** for claims: `docs/agent/THEORY-STATUS.md`.
- **Never** paste or commit tokens; Zenodo tokens live in the environment only.
