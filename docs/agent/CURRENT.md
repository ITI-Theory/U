# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (27 Nov 2026, early morning)

**USC: the chats as Lean models (ISS-126).** The author's design is in his AI Mode chats of 18-26 Nov
(USC = Sherlock + MTC; every chat fails until triaged; the models put together). Done 27 Nov:
`make -C sherlock chats` compiles every chat in Me/chats/Inbox (349 chats, 6489 prompts, all formats)
with its affidavit (Me/chats/affidavits/*.aff, written by the LLM pass) into the Lean library `Chats`
(about 100 s); the model is `sherlock/Chat`, the questions `sherlock/ChatQueries.lean`, whose
acceptance test (the model answers what grep did: USC, putting the models together, the tags' line
of descent, Einstein) passes. 115 chats fail the triage; 25 threads are open. `python sherlock/chats.py
route STAMP THREAD DISPOSITION [REF]` routes a thread. The generated modules are private (bld/).

**Also 27 Nov:** the Takeouts of 27 Nov imported (Me 72faf78; export_gemini reads `My Activity.json`
and the AI Mode folder); the "write a book" chat, too big to reload in VS Code, exported to its end
(20 Oct); chat volumes 15-17 in H-AL's notebook (HAL-UAT, 45 of 50 sources); HAL on the PATH of this
laptop (`U.Dot/bin/HAL1 init`); `audio` merged into `main` and tagged `pre-usc-2026-11-27`: one line
of work again. NotebookLM's `cold` profile (johnsonusm.com) still fails to authenticate.

**Rules that stand (author, 18-19 Oct):** music is made in Ableton Live, never outside it; the music
is private (the Soma Machine passes its emotional score in, generates nothing); Phase Plant takes no
audio. Details in ISS-118 and ISS-120 and `registry/studio/standard.yaml`.

## Next

1. AUTHOR: settle the name, Universal Semantic or Somantic Compiler (ISS-126).
2. AUTHOR: triage the chats that fail (`Chat.untriaged`), starting with the USC chats of 18-26 Nov.
3. ISS-126: the chats in Me/chats/notebooks and Me/archive/sessions; join the chat models to the
   paper models (MTC, a core the documents project from); the Einstein backtest; the `{{usc:...}}`
   tags and their Lua filter.
4. The release epic (ISS-114, planned for 21 Oct) is still open: its state since 20 Oct to review
   with the author.
