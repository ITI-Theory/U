# Chapter 14b — Decoherence and the Warm Wet Brain

\begin{quote}\itshape
The most important critique of the quantum-soma proposal is Max
Tegmark's 2000 calculation that the brain is far too warm and far too
wet to sustain quantum coherence at the timescales required. This
chapter takes the critique seriously and shows where the response
must come from.
\end{quote}

\vspace{1em}

## 14b.1  Decoherence: what it is

A quantum system that is isolated evolves *coherently*: its state
vector evolves according to the Schrödinger equation and remains a
superposition of basis states. A quantum system that is *coupled* to
an environment evolves *incoherently*: interactions with environmental
degrees of freedom transfer information about the system's state
into the environment, and the system's reduced density matrix
becomes diagonal in the basis that the environment "monitors".

This is *decoherence*. It is the mechanism by which classical
behaviour emerges from quantum substrate for any sufficiently
isolated system: the coherent superpositions are not destroyed *per
se*, but become entangled with the environment in a way that makes
them locally indistinguishable from classical mixtures.

The decoherence time $\tau_d$ for a system of size $L$ at
temperature $T$ in an environment with characteristic scattering
rate $\Lambda$ is approximately

$$\tau_d \sim \frac{\hbar^2}{2 m k_B T L^2 \Lambda}$$

For a microtubule of size $L \sim 25$ nm at body temperature
$T \sim 310$ K in an aqueous environment with $\Lambda \sim 10^{12}$
Hz, Tegmark's 2000 paper calculated[^tegmark]

$$\tau_d \sim 10^{-13}\,\mathrm{s}.$$

[^tegmark]: Max Tegmark, "Importance of quantum decoherence in brain
processes," *Physical Review E* 61 (2000): 4194–4206, arXiv:quant-
ph/9907009.

This is *thirteen orders of magnitude shorter* than the millisecond
timescale at which neural activity is thought to be functionally
relevant. Tegmark's conclusion: the brain is far too warm and wet for
quantum coherence to be functionally relevant.

## 14b.2  Hameroff and Penrose's response

Stuart Hameroff and Roger Penrose published a series of responses
through the 2000s and into the 2010s.[^hp14] The key claims:

[^hp14]: Stuart Hameroff and Roger Penrose, "Consciousness in the
universe: A review of the 'Orch OR' theory," *Physics of Life
Reviews* 11 (2014): 39–78.

1. Tegmark's decoherence calculation assumes the microtubule is a
   single coherent system. In Hameroff-Penrose, the relevant coherent
   units are *much smaller* — individual tubulin dimers in specific
   electronic states. The effective $L$ in the decoherence formula
   should be on the order of 1 nm, not 25 nm.

2. The aqueous environment within the microtubule lumen is *ordered*,
   not bulk water. Ordered water has much lower decoherence-causing
   scattering rates than bulk water. The effective $\Lambda$ should
   be at least $10^{-3}$ times the bulk value.

3. The Penrose *objective reduction* (OR) mechanism includes a
   gravitational-self-energy term that triggers state reduction at a
   timescale independent of the decoherence calculation. The
   functional timescale is OR, not classical decoherence.

With these revisions, the relevant timescale becomes

$$\tau_{\mathrm{OR}} \sim \frac{\hbar}{E_G}$$

where $E_G$ is the gravitational self-energy of the spatial
separation associated with the superposition. For microtubule
tubulin-state superpositions of physiologically plausible mass-
separation, $\tau_{\mathrm{OR}}$ comes out at $\sim 25$ ms — the
gamma-band neural timescale.

## 14b.3  Where the argument stands

Tegmark's critique is *not* refuted. The Hameroff-Penrose response
is *not* established. The current empirical situation is:

- Direct experimental measurements of quantum coherence times in
  living microtubules have been attempted (notably by Anirban
  Bandyopadhyay's group) with claimed coherence times of $\sim 1$ms,
  consistent with the Hameroff-Penrose prediction. The
  measurements have not been independently replicated by groups
  outside Bandyopadhyay's collaborator network as of 2024.

- Theoretical analyses by Reimers and others find that some
  Hameroff-Penrose assumptions about ordered water and tubulin
  electronic states require parameter values at the edge of
  physical plausibility.

- The XPRIZE-style proposals for *experimental settlement* of the
  question are now technically feasible. A consortium-scale
  experimental programme would, in principle, resolve the question
  in five to ten years.

## 14b.4  The honest position

The soma-field model does *not* require Hameroff-Penrose to be
correct in detail. What it requires is *some* mechanism by which the
soma field can undergo barrier-crossing transitions at rates that
classical thermal physics forbids.

There are at least three candidate mechanisms:

(i) **Hameroff-Penrose microtubule quantum coherence**, as above.
The most fleshed-out proposal, also the most contested.

(ii) **Popp biophoton coherence**. Ultraweak photon emission from
living cells has been observed; Fritz-Albert Popp argued in the
1980s that this represents coherent biophoton fields. The mechanism
is less well-developed than Hameroff-Penrose and has substantial
critiques of its own.

(iii) **Classical composite mechanism**. The barrier-crossing
might be achievable by a *classical* but non-local mechanism —
correlated noise across multiple substrates, non-Markovian effects
of the kind that *appear* quantum because they break detailed
balance.

The QUANT-EXP-1 result rules out (iii) in its simplest form. It does
not distinguish between (i) and (ii), and it does not rule out more
sophisticated classical mechanisms.

The honest position is: the soma-field model needs a mechanism in
this category; the candidates are known; the experimental settlement
is years away; in the interim, the model can be advanced and
clinically tested while keeping the mechanism question open.

## 14b.5  A constructive proposal

I will close this chapter with a constructive proposal for the
empirical settlement.

The *cleanest* discriminating experiment between candidate
mechanisms would compare:

1. *Soma-field transition rates* (clinical observation of basin-
   escape events in trauma patients) under conditions of
   pharmacologically *enhanced* vs *suppressed* microtubule stability.

2. *Soma-field transition rates* under conditions of *enhanced* vs
   *suppressed* biophoton emission (some compounds modulate
   biophoton emission detectably).

3. *Soma-field transition rates* under control conditions varying
   only the autonomic-nervous-system baseline.

If (1) shows a substantial effect and (2) and (3) do not,
Hameroff-Penrose is supported. If (2) shows the effect, Popp is
supported. If (3) shows the effect alone, classical composite
mechanisms are supported and the quantum proposal becomes
unnecessary.

The trial design is ethically and practically challenging — the
relevant pharmacological agents are non-trivial, and identifying
basin-escape events requires substantial subjective-report
infrastructure. But it is *doable*, and would be definitive.

The protocol is sketched in Appendix B; a full preregistered version
is in preparation.

\newpage
