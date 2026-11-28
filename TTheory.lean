/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import TTheory.P1
import TTheory.P2
import TTheory.P3
import TTheory.P4
import TTheory.P5
import TTheory.P6
import TTheory.P7
import TTheory.P8
import TTheory.P9
import TTheory.P10
import TTheory.P11
import TTheory.P12
import TTheory.P13
import TTheory.P14
import TTheory.P15
import TTheory.P16
import TTheory.P17
import TTheory.P18
import TTheory.P19
import TTheory.P20
import TTheory.P21
import TTheory.P22
import TTheory.P23
import TTheory.P24
import TTheory.P25
import TTheory.SH1
import TTheory.P26

/-!
# [T]-Theory

The model of [T]-Theory in Lean. Open this file and read on.

**How it is built.** The mathematics and physics are Mathlib's and physlib's; common knowledge (what
a person, a language, a brain region is) is OpenCyc's, as Lean types; what is [T]-Theory's own is
written here, in chapters. The theory's languages (emotions, fields, the ladder of scales, the
eleven dimensions, designs of studies) are each written once and read by interpreters: their
meaning, with proofs; their text, the sentences of the papers and books; their OpenCyc typing; the
Soma Machine's data.

**How far each thing stands.** A chapter ends with its claims and `#status`, which computes each
claim's state from its witness (`TTheory.Claims`): kernel-verified; derived under assumptions (the
assumptions named); frontier (`sorry`); open (no witness); refuted (a proof that it is false).
Witnesses chain: a claim built on another stands or falls with it, so a new proof or a changed
import moves the states on the next build. Nothing is set by hand.

**The chapters.** One per paper, read like the paper; the papers' ids, titles and DOIs are in
`Dist/PAPERS.yaml`. The plan and its state: ISSUES.md, ISS-141.

* `TTheory.P1`: The Soma-Field, a wave-based model of emotional dynamics.
* `TTheory.P2`: Quantum topology and trauma, attractor reachability (QUANT-EXP-1).
* `TTheory.P3`: Mathematical co-identification, run on its own row COID-ENG-2 (`TTheory.Method`
  is the method itself: rows, the target check, the negative control).
* `TTheory.P4`: The research programme's synthesis: its claims chained to P1, P2 and P3, its
  numbers checked against P2's.
* `TTheory.P5`: The physical substrate: the bridges' logic checked, the predictions open until
  measured.
* `TTheory.P6`: The book: the structural fraction and its values, its Lean sketch proved, the
  figures' matrices exactly (one direction refuted).
* `TTheory.P7`: Field notes from the inside: P1's witnesses carry it; its figure, operators and
  the antisymmetric coupling checked (a limit cycle open).
* `TTheory.P8`: The Tensor: the River Film's score as a table; the phases agree, the threshold
  events and the resonance knob do not.
* `TTheory.P9`: Music-induced affect: energy, threshold and noise from P1, P2 and P7; the pilot's
  figures checked (the occupancy short by 105 samples); H2 and H3 open.
* `TTheory.P10`: Temporal dynamics: carried by the fishing's Klein-Gordon and Kramers theorems; the
  memory kernel refuted as the equation's own, kept as its Euclidean correlation.
* `TTheory.P11`: The zoomable field: the correspondence limit, FM-HN, the eleven dimensions and the
  well proved or chained; eq. (1)-(2)'s sign and the catalogue's order refuted.
* `TTheory.P12`: Experimental benchmarks: the cited theorems chained, Britain 1939 and Kuramoto
  proved; the gate exp(-W) refuted; the swarm module's variational axiom inconsistent.
* `TTheory.P13`: The missing limbic layer: the coupling equations and figures checked; the cold
  limit proved (one-step retrieval of the nearest pattern); the 1982 limit and strict descent refuted.
* `TTheory.P14`: The USF as a Euclidean QFT: the OS axioms derived under the identification m = k;
  the propagators matched; decay at the library's rate k/2, rate k open; the cited G_R and the
  quartic interaction refuted.
* `TTheory.P15`: The interacting USF: mass renormalisation, Conjecture 1 mode by mode and the
  proposed below-critical OS theorem proved; V quartic and the trauma phase's attractor refuted.
* `TTheory.P16`: The geographic field: the wave-guide's modes proved (above the cutoff they
  travel); the paper's short-wavelength decay, eq. (1)'s sign (P11) and the swarm scale refuted.
* `TTheory.P17`: Gestalt field dynamics: Proof 2's Lyapunov descent proved for any number of
  modes; the circulations and the fold checked; "negative semi-definite W bounds H" refuted.
* `TTheory.P18`: The pre-verbal manifold (N = 1): collapse and return chained to P2 and P17; the
  reading and the ten cohort predictions open. The case history is not modelled.
* `TTheory.P19`: The swarm propagator: costs, table and eigenvalues checked; one-step consensus
  forces the averaging matrix; the Gram diagonal and the CEMI scale refuted; P12's axiom inconsistent.
* `TTheory.P20`: The Universal Somatic Field: the 1D SHO and the radial equation proved; the 3D G
  as the oscillator, characteristicLength and the equation-free FieldEquation refuted.
* `TTheory.P21`: The cosmological constant: the arithmetic and 7/11 checked; "consistent with
  Planck" refuted (more than 6.5σ); the caption's H₀/c rounding refuted; w = -1 and the correction open.
* `TTheory.P22`: Dark matter as 3/11: fractions, budget, chance (about 20%) and the KK scales
  checked; the shortfall is not curvature; w = 0 and the corrections open.
* `TTheory.P23`: The [T]-Theory phenomena: the fixed point open; the seeds (type inhabitation),
  the lens laws and a merged dominant mode proved.
* `TTheory.P24`: G₂ symmetry breaking: W8ℝ is the table; the unique split and its norms checked;
  ‖W₈‖ = 3.877, "relaxes toward 6/5" and the holonomy axiom's fit to W₈ refuted.
* `TTheory.P25`: Path-sensitive transitions: the paper's three toy targets proved (the barrier
  as the soft-maximum's limit, same barrier at different cost, hysteresis); its signatures open.
* `TTheory.SH1`: Sherlock: its counts and examples checked; containment of a contradiction and
  the category error shown in the native form that replaces the design it describes.
* `TTheory.P26`: Compose once, play live: the registry score's shape checked; T1 never fires,
  T2 not at 0.74, and the file is not the appendix (P8): refuted; the listener's experience open.
-/
