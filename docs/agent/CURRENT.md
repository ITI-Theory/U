# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (12 Oct 2026, night)

**Sherlock is a neuro-symbolic compiler for free-form text** (ISS-055; paper
SH1, `paper/soma/sherlock-compiler/`, renamed from sherlock-affidavit). A
language model proposes a document's claims, a person confirms them, Lean
decides: against the document's own numbers (templates, kernel-checked),
against the programme's Lean (the ledger), against the other documents
(values), and against all of OpenCyc in Lean (NextKB, 678 microtheories as
scopes, `sherlock/`). Affidavits for all 24 papers and for SH1 itself: 248
claims, 42 problems in 16 papers; 301 template checks kernel-checked; the
ledger over the 24 papers: 171 citations, 17 disagree (it also reads theorems
that prove only `True`). Run `make -C sherlock
affidavits` (hours the first time); the release gate's section 21 runs the
checks. How to use it, and when (the writing loop: draft with a model,
compile, fix with the model, compile again): `docs/SHERLOCK.md`.

**Structure mapping and types.** MAC/FAC over a case library
(`registry/cases/`, 35 cases, `sherlock/macfac.py`): most "identical in
structure" claims share a form, not a structure; P11 contradicts itself on k.
OpenCyc collections as Lean types (`Cyc.Types`; the root package requires
Sherlock's package, no rebuild): `paper/proofs/EmotionCyc.lean` anchors the
programme's emotions with proofs (a wrong name does not compile), and `make
-C sherlock types` turns the concept registry into types. Sherlock found 25
invented OpenCyc names in `EmotionOntology.lean` (fixed); TypeDB is retired.

**Books.** Philosophy: Sherlock built; "Denoting, fiction and consensus"
(Frege, Russell). Computer Science: Sherlock's engineering notes. Law:
"Affidavits: Claims, Exhibits and Precedent". Course: ch. 15's worked
example; line spacing 1.3, the QR title page (also the atlas).

**Soma Machine.** The twin view and viewer presets (as in 2021 fitted from
the two films; ADHD, ASD, C-PTSD as model operators); A/B on one screen
(`ab=b`); WORDS, how much language the film gives (`kx`, from a number only
to narration); NAMES in the Engine Room; the towers of code being fed from an
export of the programme's Lean (`make -C sherlock towers`: 980 declarations;
ISS-071); RICE (the author's switch) with crew alerts; PILOT (autopilot, co-pilot,
manual, ISS-074); LAYOUT profiles (ISS-069); the body container's blood vessel built
from the wall's anatomy (`vessel.js`).

**Visualize** (ISS-051): papers 164 of 233 equations, books 35 of 38, the course
131 of 142.

## Next

Working rules (author, 11-12 Oct): work first; experiments (NotebookLM) only
at the end of a usage period; new requirements go into ISSUES.md; ask only
about important things, otherwise work through the issue list.

1. Author: correct the Body and Session draft
   (`paper/soma/the-tensor/body-and-session-phases.draft.md`), which unblocks
   the containers test (ISS-063); dispose of Sherlock's findings (fix in a new
   version, or keep as an exhibit); MU/TH/UR in MOTHER's title (ISS-066).
2. Release path (ISS-001): review P21, the UAT build, NotebookLM UAT, Lulu,
   Zenodo (SH1 included, as `sherlock-compiler`).
3. The NotebookLM runs left (exp0 Q3-5, exp1 Q4, exp2 Q5), then SH2 (ISS-067).
4. Soma Machine: autopilot / co-pilot / manual (ISS-074); four-screen layouts
   (ISS-069); the score as MIDI into Ableton (ISS-073); the towers walk-through
   (ISS-071).
5. The final project: Sergeant Major (ISS-065).
