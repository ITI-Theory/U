# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (13 Oct 2026, small hours)

**Sherlock is a neuro-symbolic compiler for natural language** (a natural language
compiler, NLC; renamed 13 Oct) (ISS-055; paper
SH1, `paper/soma/sherlock-compiler/`). A language model proposes a document's
claims, a person confirms them, Lean decides: against the document's own numbers
(templates, kernel-checked), against the programme's Lean (the ledger), against
the other documents (values), and against all of OpenCyc in Lean (NextKB, 678
microtheories as scopes, `sherlock/`). Affidavits for all 24 papers, SH1 and now
fourteen domain books (40 documents; 399 template checks, all kernel-checked);
the ledger reads every one of them (`make -C sherlock ledger`: 419 citations, 0 disagree with the Lean, 13 Oct, after
the fixes and Sherlock's findings dispositioned; as compiler errors in VS Code).
New tonight: `make -C sherlock clinical` (sentences claiming a clinical effect
with no hedge or label: 2 candidates, P1 line 499 and the synthesis line 437,
for the author) and `make -C sherlock skyline`. How to use it, and when:
`docs/SHERLOCK.md`.

**Structure mapping** (`registry/cases/`, 41 cases, `sherlock/macfac.py`): the
Russell reading (ISS-064): the philosophy book's own chapter-7 readings as cases;
Parmenides pairs with Plato (0.53), Heraclitus with Socrates (0.49), the
"opposites" share a frame (0.35); Pythagoras finds no close partner even with a
new P9 case (a proposed `forces` predicate): written up as "Reading Russell with
Sherlock" in chapter 7.

**Proofs.** `LimbicTunnel.classical_trapped`, a placeholder that proved `True`,
now states and proves the trapping (V is a Lyapunov function; a state below the
barrier top never reaches it), kernel-checked on Lean's standard axioms. New: `paper/proofs/FieldEvent.lean`,
"same field, different type" (emotion at D8, thought at D9-11) as a definition.

**Soma Machine**, tonight (all Playwright-checked, `scripts/explorer-check.mjs`):
- The towers of code: a floor per declaration (sorry flickers red, axioms amber,
  beams to them); click a tower to walk in (code rain, each floor's statement,
  axioms and citing papers); OpenCyc's skyline (1.37M facts, 547 microtheories)
  and the EmotionCyc bridge; the Root Monster's tour (`#tour=root-monster`).
- The stone in the ureter (ISS-076): WALL, the boing, the elevator down six
  scales to a 0.2 nm gap where an electron tunnels (13 %); FX off the honest wave
  drawing, FX high the secret tunnel; ORBIT and CLIMB the north face of a
  weddellite stone with a climber drawn to scale.
- Music: MIDI OUT to Ableton and MIDI IN from a controller (Twister CCs); the
  score's heartbeat; the pulse follows the score so entrainment can be measured;
  on the landscape the rhythm is a forcing (FREEZE to SAFE 48 % to 90 % at Φ 0.4).
- MY FILM: the score editor (EDIT), each point with the sentence it came from;
  the interview protocol (`docs/INTERVIEW.md`, a draft).
- Inside the brain (ISS-077): THOUGHTS as neural avalanches (the power law, ignition, the
  conditions' operators), PAIN's path to the neuromatrix (acute, chronic), the CAVE: the
  ventricles as a stone cathedral where C-PTSD makes every thought echo.
- PAST on the memory stop (the kernel and the defence cascade); Beisser in the
  mind tour; the elevator shows τ and the carrier field retyping; RICE route plan.
- Screens: ROLE on every window; a relay for tablets (`make relay LAN=1`, kept
  apart from the MOTHER bridge, which stays on localhost).
- H-AL: the H-AL-ifier (`docs/HALIFY.md`: delivery in the bridge, a lexicon
  applied to every spoken line, the rule sheet).

**Visualize** (ISS-051): papers 204 of 233 equations, books 35 of 38, the course
131 of 142.

**Stopped for a BIOS update (13 Oct, 05:10), both safe to rerun:** `make uat-build`
had built all papers, the domain books and the omnibus (no errors) and was on vol1;
the Lean refresh (`make -C sherlock towers`, then `make -C sherlock ledger`) was part-way
through the towers export. On restart: rerun both (towers, then ledger, one Lean process at
a time; the build alongside), then a full `lake build`, `make -C sherlock check`, `make
uat-check`. The ledger's last 7 lines are names written tonight awaiting Lean's judge.
The Body and Session lines are in The Tensor's Part II (author, 13 Oct: "go with yours").

## Next

Working rules (author, 11-12 Oct): work first; experiments (NotebookLM) only
at the end of a usage period; new requirements go into ISSUES.md; ask only
about important things, otherwise work through the issue list.

1. Author: Sherlock's findings to dispose of (the books' Lean claims in the
   ledger; the two clinical candidates; the Body and Session draft for the
   containers test, ISS-063); by ear: the lexicon's guesses (H-AL as "Hal",
   BRECVEMA); UAT with real hardware: strap, Twister, tablets via the relay,
   LAYOUT on the monitors, Ableton via loopMIDI.
2. Release path (ISS-001): review P21, the UAT build, NotebookLM UAT, Lulu,
   Zenodo.
3. The NotebookLM runs left (exp0 Q3-5, exp1 Q4, exp2 Q5), then SH2 (ISS-067).
4. Proof debts (ISS-036): the other placeholders proving `True`, the five sorries.
5. The final project: Sergeant Major (ISS-065).
