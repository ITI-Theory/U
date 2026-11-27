---
title: "[T]-Theory: Background"
subtitle: "Book 0: what to know before Book 1"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  [T]-Theory is new, so a reader cannot simply ask a search engine or a chat assistant about it. They can
  ask about the ideas it is built from: a Green's function, Kramers' escape over a barrier, Kaluza and
  Klein's fifth dimension, Gestalt therapy. What no general source can give is the bridge: how the theory
  uses each idea, where, and how well established that use is. This book collects those bridges, by
  subject. It is Book 0 of the series: what to know before Book 1, and the course's companion. Its record
  is the programme's own conversations, compiled by the Universal Semantic Compiler; every explanation is
  checked before it is printed.
---

# How to read this book {.unnumbered}

Each chapter is a subject around the theory. Its entries, as they are written, give the standard idea first
(with a reference a library can supply), then its role in [T]-Theory (the papers, the proofs, the method's
verdict), then its evidence label. The conversations behind the programme discussed all of these at
length, and not always correctly: the compiler's checks found several explanations that were wrong, and
an entry follows the check, not the conversation.

Below each chapter's introduction is the record it is written from: the threads of the conversations on
that subject, laid out by the build from the conversations' affidavits, with what became of each. Nothing
is quoted from the conversations, and personal threads are never listed. The entries themselves are being
written (ISS-134); the record grows as the conversations are triaged.

# The theory's own ideas

The ideas [T]-Theory adds: the field and its dimensions, the zoom across scales, the Televator's sideways step into the mind. Each entry will say which standard idea it rests on (the next chapters) and where the papers state it.

## The field and its dimensions {#sec:bg-usf}

**The idea.** A field gives a value to every point of a space, and its response to a source is its Green's
function (the physics chapter's first entry).

**In [T]-Theory.** The Universal Somatic Field: one master equation of that kind, read at every scale, on
eleven dimensions decomposed as $4 + 3 + 1 + 3$, spacetime, the propagator, the limbic dimension and cortex
[@P20]. The cosmology paper counts the same eleven as $7 + 3 + 1$: seven compact, three spatial, one of time
[@P21].

**The method's verdict.** The counts are arithmetic and kernel-checked; that the dimensions are these is the
programme's modelling choice, and the master equation's sign is still open (`COID-GRAV-1`). Labels:
`kernel-verified` for the counts, `interpretive` for the reading.

## The zoom: one equation at every scale {#sec:bg-zoom}

**The idea.** Physics at different scales is related by a flow: the renormalisation group follows how a
theory's parameters change as the scale changes [@wilson1971].

**In [T]-Theory.** The zoom operator: the same equation at every scale from the Planck length to the cosmic
horizon, with a scale-dependent $k(\sigma)$, and the dial continuous between named positions [@P11]. The paper's
abstract says twenty-one scale levels and its body twenty: one count to settle (ISS-130).

**The method's verdict.** The level hierarchy is a formal structure in Lean; that one response grammar holds at
every level is an organising idea, testable level by level. Labels: `derived-under-assumptions` for the
structure, `interpretive` for the grammar.

## The Televator {#sec:bg-televator}

**The idea.** Not borrowed: a device of the programme's own.

**In [T]-Theory.** The Soma Machine's way of moving: up and down the scales, sideways from the brain to the mind
at the same scale, and through time; the visual form of the zoom.

**The method's verdict.** A design for navigation, not a claim about nature. Label `interpretive`.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="TTheory,TTheoryCore,Televator" flat="true"}
:::

# Physics, Einstein and the equations

The physics the theory borrows: fields and their Green's functions, waves and their damping, Kaluza and Klein's extra dimension, the cosmological budget, and Einstein's own route to E = mc², which the compiler was tested on. Each entry: the standard idea with a textbook reference, then its role in the theory, then the method's verdict where there is one (sherlock/Fishing).

## Green's functions and the screened potential {#sec:bg-green}

**The idea.** A Green's function is a system's response to a point source; once it is known, the response
to any source is a sum of point responses. For the static operator with a mass term, $(\nabla^2 - k^2)G =
-\delta$, the response is the screened (Yukawa) potential $e^{-kr}/4\pi r$, which becomes Newton's $1/r$
as $k \to 0$ [@yukawa1935interaction]. With the opposite sign, $(\nabla^2 + k^2)G = -\delta$, the response
oscillates, $\cos kr/4\pi r$: a wave, not a decay.

**In [T]-Theory.** The master equation is of this kind, and the programme reads gravity as the field's static
response to a mass.

**The method's verdict.** `COID-GRAV-1`: exploratory, scope S1, five open assumptions. The first is the sign:
the documents write $+k^2$ (a wavenumber, oscillation) where gravity needs $-k^2$ (a mass, decay), and the
equation census found the source term written with three different signs. `COID-GRAV-2` adds the bound on a
massive graviton from gravitational waves, $m_g \le 1.27 \times 10^{-23}$ eV/$c^2$, which limits how large $k$
can be where gravity is measured. Labels: the physics `derived-under-assumptions`; the reading
`open-hypothesis`.

## The Klein-Gordon equation and memory {#sec:bg-kg}

**The idea.** $(\partial_t^2/v^2 - \nabla^2 + k^2)\varphi = 0$ is the wave equation of a field with mass $k$:
waves with $\omega^2 = v^2(p^2 + k^2)$. In imaginary (Euclidean) time $\tau$ the same operator gives
correlations that fall off as $e^{-kv\tau}$.

**In [T]-Theory.** The time-dependent master equation and its memory kernel $K(\tau) = K_0 e^{-\tau/\tau_m}$,
$\tau_m = 1/kv$.

**The method's verdict.** `COID-KG-1`: exploratory, S1, two open assumptions. The Lean shows that the kernel
does not solve the real-time equation: it is the field's Euclidean correlation, right in imaginary time and
wrong when read as a memory in real time, which would need a damping term the master equation does not have.
Labels: the finding `kernel-verified`; the memory reading `open-hypothesis`.

## A fifth dimension: Kaluza and Klein {#sec:bg-kk}

**The idea.** A massless field in five dimensions, with one dimension curled into a small circle of radius
$R$, appears in four dimensions as a tower of fields with masses $n/R$ [@kaluza1921unitatsproblem;
@klein1926quantentheorie]. On an interval, the orbifold $S^1/\mathbb{Z}_2$, the same holds with a wall at each
end [@horava1996].

**In [T]-Theory.** The master equation's mass term $k$, with the limbic dimension D8 as the orbifold.

**The method's verdict.** `COID-KK-1`: exploratory, S1, two open assumptions: which fields cross the bulk and
which stay on the walls, and a radius below the torsion-balance bound. If the reduction is accepted, it is
the witness for the sign of $k^2$ above: one row's theorem closing another's open assumption. Label
`open-hypothesis`.

## The cosmological budget {#sec:bg-budget}

**The idea.** In Friedmann's cosmology the energy fractions add to one, $\Omega_\Lambda + \Omega_m + \Omega_r
+ \Omega_K = 1$. Planck 2018 measures $\Omega_\Lambda = 0.6847 \pm 0.0073$ [@planck2018cosmology].

**In [T]-Theory.** Dimension counting: $\Omega_\Lambda = 7/11$, $\Omega_c = 3/11$, $\Omega_b = 1/22$.

**The method's verdict.** `COID-COSMO-1` is falsified: $7/11 = 0.636$ lies 6.6σ below Planck, and the three
fractions sum to $21/22$, a shortfall. `COID-COSMO-2` pre-registers the flat closure, $\Omega_\Lambda = 15/22
= 0.682$, within 0.4σ of Planck; but a grid of 22nds comes that close to any value about 13 per cent of the
time, so the next surveys decide. `COID-COSMO-3`, the fractions fixed at every epoch, is falsified: it would
leave the universe no decelerating era. Labels: the arithmetic `kernel-verified`; the counting
`open-hypothesis`.

## Tunnelling: Gamow and WKB {#sec:bg-wkb}

**The idea.** A quantum particle crosses a barrier it could not cross classically, with probability $T
\approx \exp(-\tfrac{2}{\hbar}\int\sqrt{2m(V - E)}\,dx)$; Gamow used it to explain alpha decay
[@gamow1928quantentheorie].

**In [T]-Theory.** Tunnelling between the wells of the limbic double well $V = W(x^2 - 1)^2$, and the
QUANT-EXP-1 simulation.

**The method's verdict.** `COID-WKB-1`: exploratory, S1, three open assumptions: units with $m = \hbar = 1$
and the energy at the well's bottom (both assumed, as in the standard calculation), and $e^{-2S}$ called an
amplitude, which is a probability ($|e^{-S}|^2$): a word to correct. Label `open-hypothesis`.

## Escape over a barrier: Kramers {#sec:bg-kramers}

**The idea.** A particle pushed about by noise of strength $D$ escapes over a barrier of height $W$ at a
rate proportional to $e^{-W/D}$, with a prefactor that depends on the friction $\gamma$ [@kramers1940;
@hanggi1990reaction].

**In [T]-Theory.** The persistence of a trauma state: a state held in a deep well.

**The method's verdict.** `COID-KRAMERS-1`: exploratory, S1, three open assumptions: $\gamma = 1$ (the
summary sheet's formula omits it), $W \gg D$, and that a clinical state is a coordinate in such a well,
which is interpretive. Label `open-hypothesis`.

## Mass and energy: Einstein, 1905 {#sec:bg-einstein}

**The idea.** A body that emits light of energy $L$ loses mass $L/c^2$ [@einstein1905inertia], confirmed to
four parts in $10^7$ [@rainville2005direct].

**In [T]-Theory.** The compiler's calibration: before it was pointed at the theory, it was given Einstein's
argument, and it found the result and the lemma his first proof left unstated (the course, chapter 15).

**The method's verdict.** `COID-EINSTEIN-1905`: validated, scope S3, every assumption witnessed. Label
`kernel-verified` for the derivation, `empirical-result` for the measurement.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Physics,Einstein,EinsteinBacktest,Equations" flat="true"}
:::

# Mind, body and the clinic

The clinical and psychological ideas the theory reads in field terms: trauma and its persistence, attunement, autism and ADHD, Gestalt therapy, the emotions of music (BRECVEMA), and the uses in teaching. Models and readings, not medical advice: every entry carries its evidence label.

## Locking: Adler {#sec:bg-adler}

**The idea.** Two oscillators with frequencies $\Delta\omega$ apart lock when their coupling $K$ is strong
enough: Adler's equation $\dot\varphi = \Delta\omega - K\sin\varphi$ has a fixed point when $|\Delta\omega|
< K$ [@adler1946locking].

**In [T]-Theory.** Rapport as frequency locking between two people's rhythms.

**The method's verdict.** `COID-ADLER-1`: exploratory, S1, two open assumptions: that rapport is a phase
difference between two people's rhythms, and that $K$ grows with the coupling the theory names. Label
`open-hypothesis`; not medical advice.

## Dwell times and the clinical operators {#sec:bg-dwell}

**The idea.** With noise $D = 1/\beta$, the time spent in a well of depth $W$ grows as $e^{\beta W}$
(Arrhenius and Kramers; see the entry on Kramers in the physics chapter): colder means longer in the same well, not a deeper one.

**In [T]-Theory.** The summary sheet's clinical operators: autism with C-PTSD as "high $\beta$, deeper wells",
ADHD as a flat landscape at high temperature.

**The method's verdict.** `COID-CLIN-1`: exploratory, S1, two open assumptions: the readings themselves
(interpretive), and "deeper wells", which the formula does not give (a higher $\beta$ lengthens the stay in a
well of the same depth). A model and a reading, not medical advice. Label `interpretive`.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Clinical,Teaching" flat="true"}
:::

# Groups, games and the Earth

The ideas the theory borrows for many bodies at once: networks, games, and the statistics of earthquakes.
The conversations discussed them under the theory's own name, so their record is in the first chapter.

## Consensus on a network: Fiedler {#sec:bg-fiedler}

**The idea.** On a network with diffusive coupling, how fast the members come to agree is set by the second
smallest eigenvalue $\lambda_2$ of the network's Laplacian, its algebraic connectivity [@fiedler1973algebraic].

**In [T]-Theory.** The social quotient SQ as a community's synchronisation rate.

**The method's verdict.** `COID-SQ-1`: exploratory, S1, two open assumptions: that SQ means $\lambda_2$ (the
summary sheet writes $\lambda_1$, which is $\lambda_2$ only when the count starts at $\lambda_0$), and that a
community's trust network is such a graph. Label `open-hypothesis`.

## Equilibria as minima: potential games {#sec:bg-nash}

**The idea.** In an exact potential game every player's gain is the change of one shared function, and its
maxima are Nash equilibria [@monderer1996potential].

**In [T]-Theory.** Game theory as attractor dynamics: the equilibria as the minima of the field's energy, the
potential with its sign turned.

**The method's verdict.** `COID-NASH-1`: exploratory, S1, one open assumption: that the social game has an
exact potential, which needs symmetric couplings. Label `open-hypothesis`.

## Earthquakes: Gutenberg and Richter {#sec:bg-gr}

**The idea.** The number of earthquakes of magnitude at least $M$ falls as $\log N = a - bM$, with $b$ close to
1 [@gutenberg1944frequency]. Since the seismic moment grows as $10^{1.5M}$, a moment law $N \propto
M_0^{-\beta}$ gives $b = 1.5\beta$, so $b = 1$ needs $\beta = 2/3$.

**In [T]-Theory.** $b \approx 1$, claimed as derived from the field at a critical point.

**The method's verdict.** `COID-GR-1`: exploratory, S1, two open assumptions: that the crust's universality
class has $\beta = 2/3$, and that $b$ grows with the gap $\Delta\lambda$; but $b \to 0$ as the gap closes, so
the book's two premises conflict at the critical point itself. Label `open-hypothesis`.

# Philosophy and history

Discovery or invention, analogy or identity, what counts as evidence: the philosophy of science the programme leans on, and the history it learns from.

## Abduction: reasoning to the best explanation {#sec:bg-abduction}

**The idea.** Peirce's third kind of inference, beside deduction and induction: from a surprising fact to the
hypothesis that would explain it, held until it is tested [@peirce1903abduction].

**In [T]-Theory.** The methodology paper's loop (observation, hypothesis, proof, prediction, test) is abductive,
and so is Sherlock's half of the compiler: it proposes what a text claims, and Lean decides.

**The method's verdict.** The loop is now a Lean model (`sherlock/Method`): a hypothesis is a registered row, and
it cannot rise above S1 while an assumption is open. Label `interpretive` for the philosophy; the model itself
`kernel-verified`.

## Falsification and research programmes {#sec:bg-falsification}

**The idea.** A theory is scientific when some observation could refute it [@popper1959logic]; a research
programme keeps a hard core and a protective belt of auxiliary claims, and is judged by whether its changes
predict new facts or only absorb old ones [@lakatos1978methodology].

**In [T]-Theory.** The programme names its own disconfirmation rules and registers its predictions before the
data.

**The method's verdict.** The failure ledger is public: two of the programme's rows are falsified (the budget
$7/11$, and fractions fixed at every epoch), and the flat closure $15/22$ is registered for the next surveys
instead of being counted as a success (see the cosmological budget in the physics chapter). Label
`interpretive`.

## Analogy and structure {#sec:bg-structure}

**The idea.** An analogy is a mapping of relations, not of surface features: two systems share structure when
their relations correspond one to one [@gentner1983structure]; a structure can be searched for across a case
library in two stages, cheaply then carefully [@forbus1995macfac].

**In [T]-Theory.** The programme says, many times, that two things share "the same structure".

**The method's verdict.** Run as structure mapping, most of those claims share the form of one equation rather
than a structure, and one hides a contradiction (the Sherlock paper, SH1). Label `derived-under-assumptions`.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Philosophy,History" flat="true"}
:::

# Music and the arts

The music behind the Soma Machine's emotional score: how a score carries feeling, and the tools the programme composes with.

## How music evokes emotion: BRECVEMA {#sec:bg-brecvema}

**The idea.** Juslin's account names eight mechanisms by which music evokes emotion: brain stem reflexes,
rhythmic entrainment, evaluative conditioning, emotional contagion, visual imagery, episodic memory, musical
expectancy and aesthetic judgement [@juslin2013].

**In [T]-Theory.** The music paper reads the eight mechanisms as inputs to the field, and the Soma Machine's
score drives its picture and sound from the same knobs.

**The method's verdict.** No method row yet: the reading is a design, not a derivation. Label `interpretive`.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Music" flat="true"}
:::

# Knowledge, proof and machines

What the compiler stands on: Lean and its proofs, OpenCyc's common sense, documents compiled to models, and the adversary that tries to break them.

## Proof assistants {#sec:bg-proof}

**The idea.** A proof assistant accepts a statement only when every step follows by rules its kernel checks;
Lean 4 is one [@moura2021lean4], and Aesop searches for proofs in it, best first [@limperg2023aesop]. What it
checks is that the statement follows from the definitions, not that the definitions fit the world (the
course, chapter 15).

**In [T]-Theory.** The programme's proofs, and the compiler's back end: every claim it confirms is a theorem
the kernel has checked.

**The method's verdict.** Not a row but the judge of the rows. Label `kernel-verified` for what it checks.

## Common sense as a knowledge base: Cyc {#sec:bg-cyc}

**The idea.** Cyc set out to write down the common sense people never state, as millions of logical
assertions in contexts (microtheories) [@lenat1995cyc]; its open part, OpenCyc, is available as data
[@opencyc2012owl].

**In [T]-Theory.** OpenCyc loaded into Lean, so that a category error in a document (a galaxy that feels, a
matrix that is an organ) fails to compile.

**The method's verdict.** Consensus is not mathematics: a result against OpenCyc holds under OpenCyc's facts
and the chosen mapping. Label `derived-under-assumptions`.

## Qualitative reasoning about processes {#sec:bg-qp}

**The idea.** Qualitative process theory describes how quantities change (increasing, decreasing, through
which process) without their numbers [@forbus1984qp].

**In [T]-Theory.** The compiler's front end uses it to read a sentence about change into facts without
guessing.

**The method's verdict.** Not a row: a tool of the compiler. Label `derived-under-assumptions`.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="OpenCyc,OpenCycInLean,NextKB,Lake,LeanModelOfDocument,Sherlock,USC,MTC,Moriarty,EpistemicGrades,CombineModels" flat="true"}
:::
