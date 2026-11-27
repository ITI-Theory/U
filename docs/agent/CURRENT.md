# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (27 Nov 2026, evening; updated 18:40)

Three layers: USF (the theory: papers and books), USM (the Soma Machine, the theory made visible) and
USC (the Universal Semantic Compiler: Sherlock plus the meta-theory compiler). The author's order:
**USC first, USF points, then USM correctness**; Neovim in USM later (ISS-129). Every layer has a Lean
model and a make target in `sherlock/`; how to use them is `docs/SHERLOCK.md`, "USC: the working record".

- **USC (ISS-126).** The chats (349, 6507 prompts, each with an affidavit), ISSUES.md (131 issues, 820
  boxes), the `{{usc:...}}` tags (120, classes IDEA, LOOSE_END, DECISION, QUESTION, written where the
  thing was said, kept across re-exports) and the linker. `python sherlock/chats.py ideas` writes
  Me/chats/ideas.md by kind (16 loose ends, 15 drift, 264 pursued not yet routed); `--grep WORD --by
  kind|product|date` searches it. Tag loose ends in the chat as they come up, on their own lines.
- **USF (ISS-130).** The fishing's corrections, place by place (17 boxes); the method's ledger
  (`make -C sherlock fishing`): 16 rows, 1 validated (the Einstein backtest), 2 falsified (the
  cosmological budget), 13 at S1 with 32 open assumptions. Several boxes wait on the author's
  decisions (desk, ISS-081).
- **USM (ISS-127).** The app audit (93 screens): the 3D scene's INTERPRETIVE plates at 4D and 8D, and
  the buttons' contrast; fixes wait on the author's approval (desk).
- **The write-up (ISS-131, done 27 Nov).** SH1 "A second run"; P3's next version, "The Protocol as
  Code" (with the failure ledger table); the course, ch. 15 "Backtest: Einstein, 1905". Sherlock run
  on its own write-up: affidavits re-frozen at 13a3fb3, 428 of 428 checks. The technical-book idea
  (Manning and others) is parked until USC ships as a plugin.
- **The big bang (ISS-132, epic).** Three products, one package. Done 27 Nov: `make -C sherlock usc` (one
  fast command for every editor, bld/sherlock/usc.txt); the VS Code extension 0.2.0 (USC's findings, tag
  the selection, the ideas list, the `.aff` language, the papers and books by DOI; `node test/run.js` in
  apps/vscode: 13 ok); usc.nvim (U apps/nvim, installable; U.Dot's sherlock.lua is a shim). Waiting on the
  author: accounts, the name ("[T]-Theory Explorer" proposed), the date.
- **The chats in three forms.** Phase Dot (raw, private, Me; its Part I now split into 11 dated conversations
  with affidavits, Me/chats/phase-dot, `make -C Me/chats phasedot`); The Evolution (by time, public, ISS-133,
  `make -C books/T-Theory evolution`); Background, Book 0 (by concept, the course's companion, ISS-134,
  `make -C books/T-Theory background`). Both from `chats.py chronicle` (301 threads). Their prose (layer 2)
  is next; the record improves with every routed thread.
- **Triage, 27 Nov evening.** 78 threads routed with evidence or queued to the issue that covers them;
  the 16 loose ends no issue covered are in ISS-135. 200 threads remain untriaged (`Me/chats/ideas.md`).
- **Decided (author, 27 Nov):** the big bang in December (1 Dec the earliest, no stress); "[T]-Theory
  Explorer"; one repository until the release; The Evolution and Background (spines "[T] ...").
- **Line endings.** LF everywhere (.gitattributes in every repo, 27 Nov); never `Set-Content` from
  PowerShell for repo files.

**Rules that stand (author, 18-19 Oct):** music is made in Ableton Live, never outside it; the music
is private (the Soma Machine passes its emotional score in, generates nothing); Phase Plant takes no
audio. Details in ISS-118 and ISS-120 and `registry/studio/standard.yaml`.

## Next

1. AUTHOR (desk, ISS-081): read the write-up and upload P3's new version; the provisional decisions
   (sign, bulk or brane, the fractions, SQ = λ₂, b, Kramers' γ, "deep"), which unlock ISS-130's edits;
   approve the two app fixes (ISS-127); wire `usc-tags.lua` into the builds.
2. USC: a template that checks a prose count against a build's output (ISS-131); route the 264
   pursued-but-unrouted threads, the USC chats of 18-26 Nov first; the USC language server (ISS-129).
3. USF: the ISS-130 boxes that wait on no decision; the equation-by-equation match (ISS-128).
4. The release epic (ISS-114) is still open: review its state with the author.
