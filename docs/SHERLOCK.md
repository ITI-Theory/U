# Sherlock: how to write and check an affidavit

Sherlock checks what a document claims: against the document's own numbers
and statements (arithmetic in Lean), against OpenCyc's common-sense consensus
(Lean + Aesop, microtheories as scopes), and against the programme's own Lean
(the ledger). It is a neuro-symbolic compiler for natural language, a natural
language compiler (NLC) for short: a language
model proposes the claims (the front end), Lean decides them (the back end),
and an edit re-checks what it touches. Method and results: paper SH1
(`paper/soma/sherlock-compiler/`). The epic, its end state and design
decisions D1-D12: ISS-055, `prj/.adm/issues/ISS-055-sherlock.md`. Commands:
`make -C sherlock help`.

## When to run Sherlock: the writing loop

Write and improve with a language model first, compile with Sherlock, let the
model fix what Sherlock found, then compile again. As with code: you do not
compile every keystroke, and the compiler does not fix the bugs; it says
exactly where they are and why.

1. **Draft** with the model: ideas, structure, clarity.
2. **Compile**: write the affidavit (below) and check it. Each finding comes
   with its proof ("line 779 says k = 0; line 758 says k = omega/c").
3. **Fix** with the model, guided by the findings; the author approves each fix.
4. **Compile again**: a new version, `make -C sherlock delta ID=...`, and the
   checks.
5. **Release**: the release gate (section 21), then NotebookLM as the final
   reader's check (do the fixes read right? D11).

Why this order:

- **Not on immature text.** An affidavit freezes claims; if they will change
  tomorrow, the affidavit is stale tomorrow. Run it when the text makes claims
  you would defend: a version you would show someone.
- **Sherlock does not correct, and should not.** It reports with a proof,
  which is the best instruction a model can get. The model is good at
  rewriting and poor at noticing; Sherlock is the reverse.
- **The model is also a source of errors** (values that drift between
  documents, plausible names that do not exist: 25 invented OpenCyc names in
  the programme's own Lean). So its fix is compiled again.

Two speeds: the **cheap checks** (templates, the ledger, values across
documents, types) run all the time, like a linter, in the release gate and in
CI (ISS-068); the **expensive front end** (extracting and confirming a new
affidavit's claims) runs at milestones. Who runs what, and when, is the
user's choice; this is the default.

## Setup (once, hours)

`make -C sherlock fetch lean-gen rules-gen lean`: NextKB (SHA-256 checked),
one Lean module per microtheory in `bld/sherlock/lean`, OpenCyc's Horn rules
(`CycRules`, never rebuilding the facts), built one Lean process at a time
(several GB; never two Lean builds at once).

## Tools

| Command | What it does |
|---|---|
| `python sherlock/lookup.py WORD` | candidate OpenCyc constants for a word (FrameNet translations, names), with comment, isa, genls |
| `python sherlock/chain.py genls\|isa\|disjoint A B` | the OpenCyc path between two constants, printed as the Lean term |
| `make -C sherlock check` | the registry: frozen sources, quotes, lines, levels, concepts; cited theorems exist; template checks (kernel); reports |
| `make -C sherlock ledger LEDGER_DOCS=...` | documents' claims about the programme's own Lean (axiom, kernel-checked, sorry) against the Lean |
| `make -C sherlock delta ID=... [REV=...]` | what an edit did to an affidavit's claims (unchanged, edited, probably fixed, lost, new text) |
| `python sherlock/sme.py ID` | structure mapping between two relational descriptions (`registry/analogies/`) |
| `python sherlock/macfac.py check\|report` | MAC/FAC over the case library (`registry/cases/`): where else a structure occurs; the documents' sameness claims as tests |
| `lake build EmotionCyc` (root) | the programme's emotions as OpenCyc types (`Cyc.Types`): a wrong name does not compile |
| `make -C sherlock affidavits` | every affidavit module, one at a time, then `check` |
| `make -C sherlock clinical` | sentences claiming a clinical effect with no hedge in the sentence and no evidence label in the paragraph |
| `make -C sherlock towers`, `skyline` | the programme's Lean and OpenCyc exported for the Soma Machine's city of code |

Reports in `bld/sherlock/`: `affidavits.md` (every claim), `values.md` (values
quoted across documents), `palace.json` (claims by scale level and concept,
for the Soma Machine), `ledger.md`, `delta-<id>.md`, `sme-<id>.md`.

**As a compiler.** The ledger and the clinical check also print their findings the way a
compiler does, `path:line: error|warning: message` (`bld/sherlock/ledger.txt`). In VS Code,
run the task **Sherlock: report** (fast, from the last Lean judge) or **Sherlock: ledger**
(re-judges with Lean): each finding appears in the Problems panel and as a squiggle on its
line in the paper or book. A finding read and accepted as not an error goes into
`registry/ledger-accepted.yaml` with its reason (a disposition); the ledger then reports it
as accepted, as a compiler's warning is silenced with a reason, never quietly.

## Writing an affidavit for a document

1. **Freeze the document**: its commit and SHA-256
   (`git show <commit>:<file> | sha256sum`). The affidavit is about that text.
2. **Extract the checkable claims** with the prompt below (an AI agent,
   read-only); verify every candidate yourself: about one in eight is wrong.
3. **Write the registry entry** `registry/affidavits/<doc>.yaml` (schema in
   `sherlock/registry.py`): per claim the exact quote (it must be found in the
   frozen text), lines, kind, finding, verdict, label, and
   - arithmetic: a `check:` template with the document's numbers (`eq`, `ne`,
     `lt`, `sum`, `diff`, `rel-between`, `monotone`, `not-monotone`); the
     kernel checks it from the data, no Lean to write;
   - what templates cannot say: a Lean theorem in `sherlock/Affidavits/<Doc>/`
     (core Lean for numbers; `CycKB.UniversalVocabularyMt`, `Cyc.Typing` and
     `Cyc.TTheory` for typing, the document's microtheory inheriting
     `TTheoryVocabularyMt`, one microtheory per reading), named in `lean:`;
   - `mapping` (word to OpenCyc constant, from `lookup.py`), `formal`
     (CycL-shaped sentence), `values` (quoted quantities, for cross-document
     checks), `levels` and `concepts` (registry ids: where the claim lives in
     the mind palace).
4. Run `make -C sherlock affidavits` (or `check` when only the registry
   changed) and `make -C sherlock ledger` for the document.
5. Labels (`docs/agent/THEORY-STATUS.md`): arithmetic on the document's
   numbers is `kernel-verified`; a result against OpenCyc is
   `derived-under-assumptions` (OpenCyc's facts plus the chosen mapping);
   choosing a reading is `interpretive`. "Not provable" is never "false".
6. The author disposes of each finding (`disposition`: open, fixed in a new
   version, kept as an exhibit). After an edit, `make -C sherlock delta`
   proposes what changed; a new version gets a new freeze.

## Claim extraction (step 2, with an AI agent)

The ZSF affidavit used a read-only agent with this prompt (one in eight of
its candidates was wrong, so check each before writing Lean):

> Read the whole paper `<file>` (all of it, in chunks). Read-only: no edits,
> builds or commits. Sherlock checks a document's claims in two ways: against
> its own numbers and statements (counts, sums, ranges, values stated twice,
> tables against prose, equations at the paper's own parameter values, "N
> things" against the list given) and against OpenCyc typing (what kind of
> thing something is said to be; category errors). Report candidate
> findings, each with: the exact quote(s) and line numbers; the kind
> (internal-count, internal-arithmetic, internal-duplicate-mismatch,
> internal-unit, cross-paper, opencyc-typing with the OpenCyc concept you
> would map to); your verdict (CONFIRMED / CONSISTENT / UNCLEAR) with the
> computation shown; and for internal ones the exact numbers needed to state
> it in Lean. Cover every table, every count, every equation with numbers,
> every repeated constant, the abstract against the body, and every claim
> about Lean (theorem names, axioms, sorries). Most important confirmed
> findings first, then consistent positives, then 5-10 typing candidates.

Claims about the programme's own Lean (axioms, theorems, sorries) are checked
by the ledger (`make -C sherlock ledger`), which asks the root package's Lean,
one module per process, what each cited declaration is.