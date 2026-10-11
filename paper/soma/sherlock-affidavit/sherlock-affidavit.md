---
title: "Sherlock: An Affidavit for an Abstract Film"
subtitle: "Checking what a document claims against itself and against OpenCyc, in Lean 4"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  Sherlock writes what a document is trying to say as a short set of
  checkable claims, an affidavit, and checks it in two ways: against the
  document's own numbers, in ordinary mathematics, and against OpenCyc, a
  knowledge base of common-sense consensus, inside the Lean 4 theorem prover
  with the Aesop proof search. All of OpenCyc, as distributed in NextKB
  (1,366,193 ground facts in 678 microtheories), is loaded into Lean with
  each microtheory kept as a separate scope, because the knowledge base taken
  as one flat ontology is inconsistent. A contradiction is then a theorem,
  `Holds mt falsum`, whose proof says why, and it stays inside its
  microtheory. The first exhibit is *The Tensor*, the author's abstract film
  definition, frozen at a stated version. Sherlock finds six problems in it:
  four in its own statements and numbers (a table of three under "Two
  operating modes", a control knob that removes the film from its own model
  equation, a threshold the score never reaches, a threshold time the score
  does not support), one between its two copies of the score (11 of 77
  values differ), and one against OpenCyc (Language is not an emotion, and
  calling it an emotional mode makes Arabic a feeling). A second exhibit
  tests the paper's claim that its three narrative containers are "the same
  film": OpenCyc's relation of a story to its plot makes them the same
  *score*, not the same film. A third, the question "did you see the Claude
  advert?", shows why: OpenCyc keeps a work apart from its showings. The
  findings are of two kinds and are labelled as such: kernel-verified
  arithmetic, and derivations under OpenCyc's consensus, which is not
  mathematics.
---

# Introduction

A paper makes claims. Some are mathematics and can be proved; most are not.
They say what a thing is ("an emotional mode"), how many there are ("two
operating modes"), when something happens ("at $t = 0.74$") and what is the
same as what ("all three are the same film"). A careful reader checks such
claims against the paper itself and against what everyone knows. Sherlock is
that reader, made explicit.

The method has three steps. First, the claims are written as an **affidavit**:
a short list of facts in a fixed vocabulary, each pointing to the sentence it
comes from. Second, the claims about numbers are checked as arithmetic in the
Lean 4 theorem prover [@moura2021lean4]. Third, the claims about kinds of
things are typed against OpenCyc [@lenat1995cyc; @opencyc2012owl], and the
Aesop proof search [@limperg2023aesop] looks for what follows. What follows
may be a contradiction; Sherlock reports it with its proof.

This paper describes the method and its first three exhibits. The code is in
the repository's `sherlock/` directory, every finding below is a named Lean
theorem, and `make -C sherlock all` rebuilds everything from the published
NextKB archive.

# Consensus is not mathematics

OpenCyc was built to hold the common sense that a reader brings to a text:
that a film is shown, that a showing happens somewhere at some time, that a
language is not a feeling [@lenat1995cyc]. It is consensus, entered by
people, and two of its properties shape everything Sherlock does.

**It is incomplete, and incompleteness is not falsity.** OpenCyc has an entry
for *Oliver Twist*, `OliverTwist-TheMovie`, and one for Charles Dickens, but
none for the novel. A question about the novel finds nothing; that says
something about the knowledge base, not about Dickens. Sherlock therefore
never reads "not provable" as "false". It reports three outcomes: proved,
contradicted (a proof of `falsum`), and not provable from what OpenCyc holds.

**It is not one theory.** Statements hold in *microtheories*, contexts with
their own assumptions [@mccarthy1993context; @guha1991contexts]: what holds in
a microtheory of fiction need not hold in one of biology. We tested the flat
reading first. The OpenCyc 2012 OWL release, repaired by ten SPARQL updates
from about 1.02 million OWL 2 DL profile violations to none, is reported
**inconsistent** by the HermiT reasoner. Taken as one ontology, the consensus
contradicts itself. Kept as microtheories, each part can be reasoned over on
its own terms, and a contradiction found inside one stays there.

The everyday shape of the problem is a conversation. "Did you see the latest
advert for Claude?" "Yes, on Tuesday." "I saw it on Thursday." We saw the
same thing, and we did not. OpenCyc settles this by refusing to let one word
name two things: the advert is a `Commercial-CW`, a conceptual work with no
place in space; what each television showed is a `Commercial-IBT`, an
information-bearing thing that happened somewhere; `instantiationOfWork`
links each showing to the work. Exhibit C makes this a proof. The abstract
film of Exhibit A is the same idea at the scale of a feature film: a score
that is none of its renderings.

# Method

## OpenCyc in Lean

NextKB [@nextkb2019] distributes OpenCyc as CycL with one file per
microtheory. A generator turns each microtheory into a Lean module of axioms
of the form

`axiom f : Holds (.c "UniversalVocabularyMt") (.genls (.c "Fear") (.c "Displeasure"))`

where `Holds mt φ` is Cyc's `ist`, "sentence φ is true in microtheory mt".
`Holds` is opaque, so whatever OpenCyc asserts, Lean itself stays consistent:
a contradiction in OpenCyc is not an explosion but a theorem
`Holds mt .falsum`. Microtheory inheritance (`genlMt`) is a separate
relation, and every microtheory inherits `BaseKB`. The ground facts are
translated; OpenCyc's implication rules are counted and not yet translated.
The largest microtheories are split into parts, and the modules are built one
Lean process at a time.

The meaning of the core predicates is given by a handful of axioms about
`Holds`: an instance of a collection is an instance of every more general
one; `genls` is transitive; two disjoint collections share no instance (a
shared one proves `falsum`); disjointness passes to specialisations. A second
file adds what the exhibits needed: `typeGenls` (every instance of a type of
collections specialises a given collection), the meta-predicates `genlPreds`
and `genlInverse`, transitive and antisymmetric predicates, equality, and
Cyc's unique names assumption.

## The affidavit

An affidavit is a Lean file. The document's claims are axioms in a
microtheory of their own that inherits OpenCyc's vocabulary
(`UniversalVocabularyMt`); the findings are theorems. Where a claim can be
read in two ways, each reading gets its own microtheory, so a contradiction
under one does not touch the other. A "not provable" result is a test that
passes when Aesop fails (`fail_if_success`).

Aesop finds single facts and short chains by itself; it does not guess the
middle collection of a long `genls` chain. Such chains are written out link
by link, and Aesop finds each link as a fact. This makes the proofs longer
and the explanations better: each finding lists the facts it uses.

## Evidence labels

Findings carry the programme's evidence labels. Arithmetic over the
document's own numbers is `kernel-verified`; most of it is checked by
evaluation (`decide`), which proves that the stated numbers have the stated
property and nothing more. Findings against OpenCyc are
`derived-under-assumptions`: the assumptions are OpenCyc's facts and the
affidavit's choice of which OpenCyc constant a word of the document means.
That choice is the weakest link and is stated with each finding. How to read
a claim (Exhibit B's two readings) is `interpretive`.

# Exhibit A: The Tensor

*The Tensor* [@johnson2026tensor] defines a film as an emotional score, a
trajectory of seven "emotional modes" over story-time $t \in [0, 1]$, rendered
at run time through control knobs and, optionally, the viewer's own
heartbeat. Its worked example is *The River Film*. The exhibit is the text at
repository commit `2d36eaf` (1 October 2026), file
`paper/soma/the-tensor/the-tensor.md`, SHA-256
`0ec7a4dfe0d36413ea2e1e597fed624cebc5a26e98138a0d3fe7a46aada1e012`. Later
versions of the paper may correct what follows; the exhibit does not change.

The paper gives the score twice: as a 0 to 9 chart in Part II and as
keyframes in its Appendix. Between keyframes it is read by linear
interpolation, the only reading the Appendix offers.

| # | Claim in the paper | Finding | Theorem | Label |
|---|---|---|---|---|
| A1 | "Two operating modes:" | the table under it has three (Projection, Resonance, Mirror) | `operating_modes_not_two` | kernel-verified |
| A2 | Projection, $\kappa_r \approx 0$: "the score drives the viewer" | the model equation $\dot{e}_V = -\nabla H_V + \kappa_r \lambda S + \eta_V$ puts $\kappa_r$ on the film-to-viewer term, so at $\kappa_r = 0$ the screen signal drops out; the knob table defines $\kappa_r$ the other way, as the weight of the viewer on the film | `projection_screen_drops_out` | kernel-verified |
| A3 | Threshold 1 when "F > 0.7" | fear peaks at exactly 0.70; at every rational story-time it is at most 0.70, so the score never crosses, and at the default $\kappa_r = 0$ the film holds at T1 for ever | `threshold1_unreached` | kernel-verified |
| A4 | Threshold 2 at $t = 0.74$ when "L < 0.1 AND PV > 0.85" | the condition holds at 0.70 and fails at 0.74 and on all of $[0.72, 0.8]$; the chart's "$t \approx 0.71$" is right | `threshold2_fails_at_074` | kernel-verified |
| A5 | the chart and the keyframes are one score | 11 of 77 values differ, all at $t \geq 0.7$ | `chart_keyframes_differ` | kernel-verified |
| A6 | seven "emotional modes" | Fear, Awe, Grief, Curiosity and Shame are OpenCyc emotions (`EmotionalQuantityType`); Safety and Pre-verbal are not (the nearest emotion to Safety is `Security-Emotion`); Language as an emotional mode proves `falsum` | `language_mode_contradiction` | derived-under-assumptions |

A6 needs OpenCyc and is worth spelling out. The affidavit maps the mode
"Language" to OpenCyc's `Language` and asserts the paper's typing,
`isa Language EmotionalQuantityType`. OpenCyc holds that every emotional
quantity type specialises `FeelingAttribute` (`typeGenls`), which is a
`MentalQuantity`, a `ScalarQuantity`, a `ScalarInterval` and so a
`ScalarOrVectorInterval`; that `Language` is a `CommunicationConvention` and
so an `InformationStore`; that `InformationStore` and `ScalarOrVectorInterval`
are disjoint; and that Arabic is a language. If Language were an emotional
mode, Arabic would be both a store of information and a quantity of
feeling. The paper itself describes the mode as "symbolic, conceptual,
narrative organisation", which is not a feeling; the finding is that its
heading says otherwise.

A1 and A2 a careful proofreader could find; A3 to A5 need the arithmetic
done. A6 needs the consensus: no rule of grammar or arithmetic says that a
language is not an emotion.

# Exhibit B: "All three are the same film"

The Tensor's last part claims that the River Film's score "can be realised in
at least three containers without changing a single value in the score
definition": a river journey, a voyage through the body, a therapy session.
"All three are the same film."

OpenCyc has a relation for exactly this. `genlWorks NARROW GENERAL` means that
NARROW "includes all of GENERAL, but has additions (refinements). This is the
relationship of a story to its plot … or 'variations on a theme' to the
musical theme itself." `genlWorks` is reflexive, transitive and
antisymmetric. The claim has two readings, and each gets a microtheory.

**Same score.** Each container film is a refinement of one score
(`genlWorks river score`, and likewise for body and session). OpenCyc then
derives that a showing of the river film instantiates it, and that the score
generalises the river film. It does *not* derive that the showing is a
performance of the score: no rule in OpenCyc links `performanceOfWork` to
`genlWorks`, so the paper's "the score is what is being rendered" is not
provable. That is a gap in the consensus, not a refutation.

**Same film.** Each container film includes all of the other
(`genlWorks river body` and `genlWorks body river`). Antisymmetry makes them
equal, and Cyc's unique names assumption makes two differently named works
being equal a contradiction (`same_film_contradiction`). The paper's own
table gives the containers different deep attractors, so they are not one
work.

Sherlock's advice is to say "the same score", not "the same film". The
analogy the paper intends, the same relational structure in three settings
[@gentner1983structure; @forbus2017analogy], is then a claim about the score,
and it can be tested by comparing three independently written container
descriptions, which the paper does not yet contain.

The exhibit also found a slip in OpenCyc. It states
`genlInverse genlWorks parts`, which makes the river film a *part* of its
score (`river_part_of_score`); the gloss of `genlWorks` says the reverse,
that the story includes its plot. Consensus can be wrong, and a proof makes
the error visible.

# Exhibit C: Did you see the Claude advert?

The conversation of Section 2 as an affidavit (`ClaudeAdvertMt`): the advert
is a `Commercial-CW`; the Tuesday and Thursday showings are
`Commercial-IBT`s; each is an `instantiationOfWork` of the advert. Three
theorems follow.

- **We saw the same thing:** one work is instantiated by both showings
  (`same_work`).
- **We did not:** the two showings are two things (`different_showings`).
- **Taking a showing for the work is a contradiction**
  (`showing_is_not_the_work`): a `Commercial-IBT` is ultimately a
  `SpatialThing`, a `Commercial-CW` an `AspatialThing`, and OpenCyc holds the
  two disjoint.

The answer to "did we see the same thing?" depends on which thing the
question is about, and the consensus makes the question say.

# Discussion

**More than a text linter.** Of the six findings in Exhibit A, three need
arithmetic over the score and one needs common-sense knowledge that no style
checker has. Exhibit B turns an informal claim into a choice between two
precise ones and finds the one that holds.

**The mapping is the weak link.** Which OpenCyc constant a word means is a
choice made by whoever writes the affidavit. "Language" could have been
mapped to something else, and "Safety" has no emotion of that name in
OpenCyc. Sherlock makes the choice explicit and checkable; it does not make
it for the author. A front end that proposes mappings (for instance from
NextKB's links between words, FrameNet frames and OpenCyc) and lets the
author confirm them is the natural next step.

**Limits.** OpenCyc's implication rules and its default reasoning are not yet
in Lean; Aesop needs long chains spelled out; and the knowledge base is
OpenCyc's 2012 consensus, with its gaps (no *Oliver Twist* novel) and its
slips (`genlInverse genlWorks parts`).

**Where the idea came from.** The author added the W3C OWL 2 Primer's family
ontology [@hitzler2012owlprimer] as a test to the Scala RDF library
banana-rdf on 13 February 2015 [@bananardf]: a document's facts, typed and
checked. Sherlock is that test grown up, with the document a scientific paper
and the ontology the common sense its reader brings.

**Next.** An affidavit for each paper of the programme; affidavits as a form
of legal argument (claims, exhibits, precedent); analogy between affidavits by
structure mapping [@gentner1983structure; @forbus2017analogy], to ask where
else a claim has been made; and a reading of the history of philosophy
[@russell1945history] as a sequence of affidavits about the same questions.

# Conclusion

An affidavit is cheap to write and exact to check. On its first document,
Sherlock found six problems, separated the mathematical findings from the
consensus ones, and turned the claim that three films are one into the
precise statement that they share a score. OpenCyc is not mathematics, and
Sherlock does not pretend it is: it says what follows from the consensus, in
which microtheory, and why.

# Reproducing the exhibits

`make -C sherlock fetch lean-gen lean affidavits` downloads NextKB (checked
by SHA-256), generates the Lean modules, builds them one at a time (hours,
several gigabytes) and checks the affidavits in `sherlock/Affidavits/`:
`TheTensor/Score.lean` (A1 to A5), `TheTensor/Language.lean` (A6),
`TheTensor/Containers.lean` (Exhibit B) and `ClaudeAdvert.lean`
(Exhibit C). The River Film score is also exported as W3C EmotionML
[@burkhardt2014emotionml] by `make emotionml`.

# References
