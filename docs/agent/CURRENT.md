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

**The method as a model (27 Nov, late).** P3, the author's methodology paper (mathematical
co-identification), is now Lean: `sherlock/Method` (registration rows, scope labels S1-S3,
disconfirmation rules, negative control, the loop; `make -C sherlock method`). The Einstein backtest
is row COID-EINSTEIN-1905 (S3); the first fishing catch, gravity, is COID-GRAV-1 (S1,
`make -C sherlock fishing`), with five open assumptions. The first is a sign contradiction in the
cheatsheet's master equation (ISS-126, AUTHOR).

**Round 2 (27 Nov, night).** The catches are the `Fishing` library (U's lakefile) and cite each
other; `make -C sherlock fishing` prints the method's ledger (7 rows) and the bait (the open
assumptions, the next round's targets). New rows: Klein-Gordon (the memory kernel is not a solution),
the cosmic budget (closes at 21/22; 15/22 pre-registered), the author's expansion question (fixed
fractions need created mass and are excluded), Kaluza-Klein on D8 (the extra dimension as the witness
for the sign). ISSUES.md is a Lean model too (`make -C sherlock issues`), joined to the chats.

**Also 27 Nov:** the Takeouts of 27 Nov imported (Me 72faf78; export_gemini reads `My Activity.json`
and the AI Mode folder); the "write a book" chat, too big to reload in VS Code, exported to its end
(20 Oct); chat volumes 15-17 in H-AL's notebook (HAL-UAT, 45 of 50 sources); HAL on the PATH of this
laptop (`U.Dot/bin/HAL1 init`); `audio` merged into `main` and tagged `pre-usc-2026-11-27`: one line
of work again. NotebookLM's `cold` profile (johnsonusm.com) still fails to authenticate.

**Rules that stand (author, 18-19 Oct):** music is made in Ableton Live, never outside it; the music
is private (the Soma Machine passes its emotional score in, generates nothing); Phase Plant takes no
audio. Details in ISS-118 and ISS-120 and `registry/studio/standard.yaml`.

## Next

1. The name is settled: the Universal Semantic Compiler (author, 27 Nov; T.Ops naming standard).
2. AUTHOR: the master equation's sign (ISS-126): +k² (oscillation) or -k² (a mass, decay)?
3. AUTHOR: triage the chats that fail (`Chat.untriaged`), starting with the USC chats of 18-26 Nov.
4. ISS-126: further fishing catches as Method rows; the chats in Me/chats/notebooks and Me/archive/sessions; join the chat models to the
   paper models (MTC, a core the documents project from); the `{{usc:...}}`
   tags and their Lua filter.
5. The release epic (ISS-114, planned for 21 Oct) is still open: its state since 20 Oct to review
   with the author.
