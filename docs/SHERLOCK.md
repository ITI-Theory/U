# Sherlock: how to write and check an affidavit

Sherlock checks what a document claims: against the document's own numbers
and statements (arithmetic in Lean), against OpenCyc's common-sense consensus
(Lean + Aesop, microtheories as scopes), and against the programme's own Lean
(the ledger). It is a compiler for papers: an edit re-checks what it touches.
Method and first exhibits: paper SH1 (`paper/soma/sherlock-affidavit/`). The
epic, its end state and design decisions D1-D10: ISS-055,
`prj/.adm/issues/ISS-055-sherlock.md`. Commands: `make -C sherlock help`.

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
| `make -C sherlock affidavits` | every affidavit module, one at a time, then `check` |

Reports in `bld/sherlock/`: `affidavits.md` (every claim), `values.md` (values
quoted across documents), `palace.json` (claims by scale level and concept,
for the Soma Machine), `ledger.md`, `delta-<id>.md`, `sme-<id>.md`.

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