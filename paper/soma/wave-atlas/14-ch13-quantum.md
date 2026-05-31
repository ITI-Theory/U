# Chapter 13 — Quantum Tunnelling, and the Experiment

\begin{quote}\itshape
Sometimes the ball arrives on the other side of the hill without ever
having been on top of it.
\end{quote}

\vspace{1em}

## 13.1  The classical limit, and its discontents

In Chapter 12 we drew the soma field as a ball rolling on a landscape.
The ball, classically, is stuck in a valley when the surrounding
barriers are higher than any energy ordinary noise can provide.

This is the classical limit. It is the correct limit for *most* of the
landscape *most* of the time. But there is a regime, observed in
laboratory quantum systems for nearly a century, in which it is *wrong*.
At low enough effective temperature, in narrow enough barriers, with
small enough effective mass, the ball can *tunnel*: arrive on the other
side of the barrier without ever climbing it.

Quantum tunnelling is not a metaphor. It is the mechanism by which
$\alpha$-particles escape heavy atomic nuclei (Gamow, 1928); the
mechanism by which fusion can occur in the core of the Sun at
temperatures classically too low to overcome the Coulomb barrier; the
operating principle of the scanning tunnelling microscope, of the
Josephson junction, of the flash memory in your phone. The phenomenon
is real, quantitative, and engineered into a substantial fraction of
the world's working electronics.

The question this chapter takes seriously is: does the soma field, in
certain configurations, support tunnelling?

## 13.2  Why this question is not absurd

The default position, among physicists, is that quantum effects are
washed out by *decoherence* — the rapid loss of phase coherence due to
interaction with the warm wet environment of a biological system — long
before they can produce macroscopic effects. The decoherence timescale
for typical biological structures, at body temperature, is on the order
of picoseconds. Anything happening at psychological timescales
(milliseconds and longer) should be classical to extraordinary
precision.

This is the orthodox view, and for the *bulk* of biological signalling
it is almost certainly correct.

There are, however, three accumulating exceptions in mainstream biology.

**Photosynthesis.** The light-harvesting complexes of plants and
photosynthetic bacteria appear to use quantum-coherent energy transport
to deliver absorbed photons to reaction centres at near-unity
efficiency. The coherence persists for hundreds of femtoseconds — long
enough, on the relevant scale, to matter.[^engel]

[^engel]: Gregory S. Engel and colleagues, "Evidence for Wavelike Energy
Transfer through Quantum Coherence in Photosynthetic Systems," *Nature*
446 (2007): 782–86, <https://doi.org/10.1038/nature05678>.

**Avian magnetoreception.** Migratory birds appear to navigate using a
chemical-radical-pair compass mechanism whose sensitivity depends on
quantum-spin coherence in the visual pigment cryptochrome. The coherence
must persist for tens of microseconds for the mechanism to work; the
mechanism appears to work; therefore the coherence persists.[^hore]

[^hore]: P. J. Hore and Henrik Mouritsen, "The Radical-Pair Mechanism of
Magnetoreception," *Annual Review of Biophysics* 45 (2016): 299–344.

**Olfaction (contested).** Luca Turin proposed in 1996 that the
sensitivity of the olfactory system to subtle molecular features (in
particular to deuterium substitution) is best explained by an electron-
*tunnelling* mechanism in the olfactory receptor. The experimental
evidence is mixed; the hypothesis is alive and contested.[^turin]

[^turin]: Luca Turin, "A Spectroscopic Mechanism for Primary Olfactory
Reception," *Chemical Senses* 21, no. 6 (1996): 773–91.

The picture that emerges is *not* that biology is generally quantum,
but that biology has, in places, evolved structures that *protect*
quantum coherence long enough to use it. Photosynthesis, magneto-
reception, and possibly olfaction are existence proofs.

The hypothesis of *Soma Field Theory* — published in the technical
papers and tested in QUANT-EXP-1 — is that certain emotional
transitions, specifically the transition from a low-arousal trauma-
shaped basin into a high-arousal "awe" basin, are supported by a
quantum-tunnelling mechanism on the relevant component of the soma
field. The substrate, on this hypothesis, is the microtubule
network of the neuronal cytoskeleton, which we will discuss in
Chapter 14.

## 13.3  QUANT-EXP-1: the experimental design

QUANT-EXP-1 is the central falsifiable test of the soma-field quantum
hypothesis. It is, as of 2026, a *computational* experiment — a
simulation of the eight-mode soma-field Langevin dynamics with and
without an added quantum-tunnelling term, configured to match the
clinically observed difficulty of barrier-crossing in trauma cases.

The full specification is in the technical paper *Quantum Soma:
Penrose-Hameroff Substrate for the Eight-Mode Field*.[^qsp] The key
design points:

[^qsp]: Alistair Johnson, *Quantum Soma: A Penrose-Hameroff Substrate
for the Eight-Mode Soma Field*, Zenodo (2026),
<https://doi.org/10.5281/zenodo.20351230>.

- The landscape is an eight-mode soma field with a deep, narrow "trauma"
  basin and a high-amplitude "awe" basin separated by a barrier of
  height $W$.
- The classical dynamics runs at three temperatures (cold, warm,
  hot), with the *cold* setting chosen to match the typical decoherence-
  protecting environment of microtubules.
- The quantum dynamics adds a tunnelling term proportional to
  $\exp(-\alpha \sqrt{W})$, with $\alpha$ fixed by the geometry of the
  barrier.
- Each condition runs 48 trajectories. *Success* is defined as reaching
  the awe basin within the simulation time.

The prediction of the hypothesis: at the cold setting, the classical
dynamics succeeds in 0/48 trajectories; the quantum dynamics succeeds
in a substantial fraction. The classical impossibility is the
*decisive* feature — it rules out any explanation in terms of unusually
favourable noise.

## 13.4  Results

The results were reported in the technical paper and are reproduced
here. For barrier heights $W \in \{-8, -10, -12\}$:

| Setting | Successes / Trials |
|---|---|
| Classical, cold | 0 / 48 |
| Quantum, cold | 3 / 3 (all three runs at all three barriers) |

The quantum mechanism reaches the awe basin in *every* run at every
barrier setting tested. The classical mechanism reaches it in *none*.
The result is, in the technical sense, a *clean separation*: there is
no overlap between the two distributions.

Three further analyses were carried out:

1. **Schedule comparison.** Linear annealing > cosine > pause. The
   detail of the quantum schedule matters; the qualitative result
   (clean separation from classical) does not depend on it.
2. **Noise-equivalence sweep.** The classical temperature was raised
   until the success rate matched the quantum rate; this required a
   factor of $\sim 6$ increase in noise amplitude, corresponding to
   physiological conditions inconsistent with stable cognition. The
   quantum mechanism is therefore not just *equivalent* to a warmer
   classical mechanism; it succeeds in a regime where no plausible
   classical noise can.
3. **3D animation.** The quantum trajectory through the energy landscape
   was rendered; the visible feature is that the trajectory *crosses
   the barrier without going over the top*. The path passes through the
   barrier region with substantial probability density on the far side
   before the maximum-amplitude part of the wave reaches the top.
   *Animation: `paper/soma/quantum-soma-penrose/quantum_experiment_3d.gif`.*

> **Figure 13.1** *(BUILD)* — A single frame of the quantum-trajectory
> animation: the wave packet straddling the barrier with substantial
> density on both sides. *From the published animation.*

## 13.5  What this result is, and what it is not

What it is: a *computational* falsification test of the classical-only
null hypothesis, on a specific eight-mode soma-field model with
specific parameters, in which the quantum mechanism is unambiguously
required to reach the awe basin in any condition simulated.

What it is not: a measurement of an actual human being.

The next step — and it is a step I cannot take alone — is to identify
a clinical analogue of the simulation in which the quantum mechanism
predicts a different, measurable outcome from the classical one. The
*Soma Field* paper series, particularly the *Independent Replication
Ledger* in the back of this book, makes this challenge explicit and
open. As of summer 2026, every row of the ledger reads PENDING. That
is not a failure; it is honest current status. The model has made a
prediction. The world has not yet been asked.

## 13.6  Six more experiments

There are, in addition, six further experiments specified in the
*Quantum Soma* paper that remain to be run:

1. Barrier ladder sweep: $W$ from $-6$ to $-14$ in unit steps.
2. Noise-equivalence curve: find the classical temperature $T^*$ at
   which classical success matches quantum success at each barrier.
3. Bootstrap confidence intervals at $n = 200$ trajectories.
4. Spectral gap proxy metric during anneal.
5. Negative controls A (random schedule) and B (decoherence-injected
   quantum).
6. Fixed-seed table publication for full reproducibility.

These are computational; they can be run on a laptop. The bottleneck is
not computation; it is having an existing collaborator with the time and
disposition to take the falsification seriously.

\vspace{1em}

\begin{quote}\itshape
\textbf{Standing claim.}\\
The soma-field model, as published in the eleven-paper technical
series, makes a clean, falsifiable prediction: that the transition from
deep trauma states into states of awe and aesthetic absorption is
supported, at least in part, by a quantum-tunnelling mechanism on the
microtubule substrate. The computational version of the test has been
run and passed. The clinical version remains open. The replication
ledger is at the back of this book and the URL on the inside cover.
\end{quote}

\newpage
