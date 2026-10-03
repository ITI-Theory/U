# Differences Ledger

Date: 2026-10-01. Scope: `paper/soma` P1-P24, `paper/proofs`, QUANT-EXP-1, `books/T-Theory`, `registry`, `docs/agent/THEORY-STATUS.md`, the archived independent-replication ledger, and the current Soma Machine app code. Evidence labels are exactly those in `THEORY-STATUS.md`: `kernel-verified`, `derived-under-assumptions`, `simulated`, `empirical-result`, `interpretive`, `open-hypothesis`.

## 1. Claim inventory: what is different from the baseline?

| id | scale / level | standard baseline | [T]-Theory / SFT addition | class | evidence | source | discriminating test |
|---|---|---|---|---|---|---|---|
| D-01 | organism / affect | Circumplex: affect as valence-arousal point. | Field dynamics: `gamma e_dot = -grad H(e)+sqrt(2D)xi+J(t)`; basins, thresholds, sub-threshold field. | B | derived-under-assumptions | P1 §Model; P9 §Model | Time-series physiology should show basin dwell, hysteresis and threshold effects beyond static ratings. |
| D-02 | trauma topology | Classical Langevin/Hopfield escape needs noise over a barrier. | QUANT-EXP-1: exact 8-qubit statevector simulation; cold classical 0/48, quantum reachability 3/3 barrier cases, peak Awe-dominant about 0.39-0.42. | B | simulated | P2; `QUANT-EXP-SWEEP-2026-05-20.md` | Re-run fixed seeds, hardware/NISQ version, and negative controls; fail if low-noise classical matches without flooding. |
| D-03 | method | Analogy or metaphor across disciplines. | Mathematical co-identification: transfer theorems only where type signatures and assumptions match. | C | interpretive | P3 | Pre-register a proposed import and reject if a source theorem assumption fails. |
| D-04 | programme | Separate psychology, physics, Lean and art artefacts. | One ledgered research programme with proof-status and evidence labels. | C | interpretive | P4; `THEORY-STATUS.md` | None: organisational discipline, unless inconsistent labels appear. |
| D-05 | physical substrate | Interoception, CEMI, HRV and body schema as separate literatures. | Same field state carries somatic modes, coupling matrix, HRV/noise and cardiac tilt. | B | open-hypothesis | P5; `FIELD-NOTES.md` cardiac section | HRV/cardiac acceleration should predict threshold crossings better than emotion labels alone. |
| D-06 | lived experience | Autoethnography as testimony. | Testimony is recast as proposed field trajectory; not promoted to mechanism. | D | interpretive | P6, P7 | None: interpretive unless cohort data are gathered. |
| D-07 | art / film | Narrative film as story container. | Emotional score `e*(t)` as invariant trajectory across containers. | D | interpretive | P8; `FIELD-NOTES.md` emotional score | Audience physiology should cluster by score rather than plot if operationalised. |
| D-08 | music affect | BRECVEMA and circumplex taxonomies. | BRECVEMA mechanisms modulate field parameters: damping, bias, memory kernel, barriers. | B | open-hypothesis | P9 | Same music should predict path-dependent response trajectories, not only final ratings. |
| D-09 | temporal memory | Markovian or static attractor model. | Retarded propagator and memory kernel: `K(tau)=K0 exp(-tau/tau_m) theta(tau)`. | B | derived-under-assumptions | P10 | Fit delayed response and extinction curves; reject if no memory kernel improves prediction. |
| D-10 | scale | Separate models at each scale. | Zoom operator: same Helmholtz/Green grammar with substrate-specific `k(sigma)` and boundary conditions. | C | derived-under-assumptions | P11; registry levels | Cross-scale notation survives; physical identity remains a hypothesis. |
| D-11 | benchmarks | Compare models by final classification accuracy. | Four-model reachability benchmark and phase-transition tests; FM-HN special cases classical Hopfield in calm limit. | B | open-hypothesis | P12 | Run executable benchmarks on MNIST / attractor traps. |
| D-12 | neural network | Hopfield `beta` fixed at design time. | FM-HN: limbic field modulates `T(t)` and `W(t)` at runtime; zero-stress correspondence theorem. | B | kernel-verified for correspondence; open-hypothesis biologically | P13; `LimbicHopfield.lean` | In physiology, arousal should modulate effective inverse temperature of retrieval. |
| D-13 | QFT status | Generic field analogy. | Free USF represented as massive GFF under `m=k`; inherits OS axioms in formal model. | C | derived-under-assumptions | P14; `USF_OSAxioms.lean` | None for free formal model; physical identification needs observables. |
| D-14 | interacting QFT | Free Gaussian field only. | Hopfield-coupled action `S_kappa=S0+kappa V`; quadratic case mass-renormalises; multi-component case open. | B | open-hypothesis | P15 | Constructive proof or counterexample to OS3 / thermodynamic limit. |
| D-15 | geography | Diffusion/social contagion and active matter treated separately. | Geographic Green function: Thames corridor, parakeet murmuration, valley resonator as wave-guide examples. | C | interpretive / open-hypothesis | P16 | Fit corridor boundary conditions to observed propagation better than unbounded diffusion. |
| D-16 | Gestalt | Qualitative field metaphors. | Gestalt stuckness as candidate topological loops / winding in typed field vocabulary. | D | interpretive | P17 | None until winding numbers and clinical observables are operationalised. |
| D-17 | neurodevelopment | Onset-based diagnostic categories. | Pre-verbal manifold: downstream projections of a pre-linguistic coupling structure. | D | open-hypothesis | P18 | Longitudinal cohort: early insult + attachment should predict later attractor topology. |
| D-18 | swarm coordination | Consensus by `K` rounds, cost `O(NK)`. | Single dense propagator update `G s`; theorem `N^2 < NK` when `N<K`. | B | kernel-verified arithmetic plus modelling assumptions | P19; `SwarmPropagator.lean` | Drone or simulator trial where dense field update beats gossip for large `K`. |
| D-19 | universal field | Green functions as local tools only. | USF treats Green response as common grammar for physical, somatic and collective systems. | C | derived-under-assumptions | P20 | Shared grammar only; each scale still needs its own observables. |
| D-20 | cosmological constant | ZPE integral overshoots by `10^117`. | `Lambda_USF=(21/11)H0^2/c^2 ~=1.01e-52 m^-2`, 7.1% low vs Planck baseline. | A | derived-under-assumptions | P21; `CosmologicalConstant.lean` | Redshift constancy, compactification correction, and Planck comparison; not confirmation. |
| D-21 | dark matter | New particle species or modified gravity. | Spatial vacuum block predicts `Omega_DM=3/11=0.2727`, 3.1% high vs Planck 0.2645; gravitational-only coupling under localisation assumptions. | A | derived-under-assumptions | P22; `CosmologicalConstant.lean` | Fail if non-gravitational dark matter particle/self-interaction is confirmed at required level. |
| D-22 | cultural programme | Theory describes external phenomena only. | Fixed-point reading: [T]-Theory is a phenomenon of its own propagation. | D | interpretive | P23 | None: cultural interpretation. |
| D-23 | G2 / BRECVEMA | Eight music-affect mechanisms as taxonomy. | `W8=(6/5)I8+delta W`, `tr(delta W)=0`, `||delta W||F/||W8||F=0.484`; seven independent symmetry-breaking directions. | A | derived-under-assumptions / kernel-verified trace | P24; `BRECVEMAVariational.lean` | Re-estimate `W8` from data; number changes or vanishes. |
| D-24 | Lean proof surface | Prose proof status. | Kernel distinguishes theorems, axioms and five real `sorry`s; no global "0 sorries" claim. | C | kernel-verified where named | `THEORY-STATUS.md`; D2 | `lake build` plus per-declaration audit. |
| D-25 | Fractal Thesis | Domain monographs use separate vocabularies. | Fifteen books translate the same kernel into field-specific terms; formally shared part is the Green/response grammar, not literal identity. | C | interpretive | `books/T-Theory/PROGRAMME.md` | Domain experts should find real discriminating predictions, not only vocabulary. |
| D-26 | local GR limit | Standard local GR / linearised Einstein equations. | No claimed local departure; LocalGR is a typed gate with explicit GR axioms for cosmology. | E | derived-under-assumptions | `LocalGR.lean`; P21 | None at local-GR limit; if a local departure is claimed later, test clock/geodesic data. |

Counts for this inventory: A = 3, B = 9, C = 7, D = 6, E = 1.

## 2. Current app finding: what 4D / 8D / 11D buttons actually change

Honest reading of `apps/instrument/visuals/soma-field-operator/main.js`:

- The dimension button sets `state.level` only (`main.js:2016-2018`); `activeDimensionLevel()` returns `state.tTheory ? state.level : 4` (`1659-1661`). Therefore 8D/11D are unavailable when the [T]-Theory lens is off.
- The buttons change visibility, opacity, shader depth and labels more than the mathematical state. The shader uses `uLevel` in colour/depth (`279`, `308`) and `applyScene` sets `uLevel` (`2277`).
- Poke `J(t)` is implemented as a generic impulse envelope: response time runs for four seconds (`1159`, `2235-2237`) and `responsePulse = impulse * gain * exp(-responseTime*3.4)` (`2242`). It does not yet integrate the Langevin equation or flip stored basins.
- 8D currently reveals limbic/feeling visuals for human scale (`feelingWeight` line `2334`; limbic well/barrier opacity lines `2361-2366`). 11D reveals the integrated human layer (`humanWeight` line `2333`), C3/mind and BRECVEMA (`1846`, `2333-2379`).
- Compare view is the most honest current "difference" mode: left side forces baseline 4D, right side forces T-Theory; if the user selected 4D, the right side is promoted to 11D (`2399-2411`).

So the app already makes 4D/8D/11D visually and explanatorily different; it does **not yet** make the same poke produce a persistent basin flip, memory-dependent second response, or quantum reachability difference in the dynamics.

## 3. 4D -> 8D -> 11D: what the click should do

Standard gesture: same poke strength, optional second poke after two seconds, optional noise slider. 4D means standard baseline equation; 8D means add field response, barrier, memory or coupling; 11D means add integrated cross-scale / topological / quantum reading. Badges: FORMAL = kernel theorem; SOURCED = standard science or paper equation; INTERPRETIVE = hypothesis or analogy.

| registry level | behavioural difference to implement | grounding / badge |
|---|---|---|
| quantum-foam | 4D: amplitude ripple decays. 8D: show barrier/noise threshold. 11D: anneal probability wave toward target basin; cold path remains stuck. | `G_P=<x|G|x'>`; QUANT-EXP-1; simulated / SOURCED |
| string-boundary | 4D: worldsheet response pulse. 8D: response is read as propagator pole. 11D: show "string = impulse response" overlay, no material string. | `G_string=-alpha'/2 log|s-s'|^2`; interpretive / INTERPRETIVE |
| nuclear | 4D: Yukawa pulse falls off. 8D: threshold gate appears. 11D: compare short-range barrier with emotional barrier language. | `e^{-mr}/4pi r`; standard / SOURCED |
| atomic | 4D: Coulomb perturbation rings then returns. 8D: same poke shifts a resonance line. 11D: show spectral pole as shared grammar. | `G_C=1/4pi r`; standard / SOURCED |
| molecular | 4D: conformation oscillates. 8D: add hysteretic bond-state switch. 11D: zoom links bond potential to attractor basin. | `H psi=E psi`; SOURCED |
| cellular-synaptic | 4D: subthreshold cable response decays. 8D: above-threshold poke spikes and enters refractory memory. 11D: action potential becomes a level transition. | cable equation; SOURCED |
| local-circuit | 4D: wave propagates along circuit. 8D: repeated poke entrains. 11D: phase-lock threshold shown as global integration candidate. | wave equation; SOURCED |
| whole-brain-cemi | 4D: measured CEMI/EEG shell only. 8D: field amplitude crosses limbic threshold. 11D: CEMI + L1 + C3 integration badge. | CEMI propagator; open-hypothesis / INTERPRETIVE |
| human-vertebrate | 4D: linear body/physiology pulse returns. 8D: Langevin double-well flips and stays if poke exceeds barrier. 11D: second identical poke differs because `K(tau)` memory and BRECVEMA channels changed the landscape. | P1/P9/P10/P13; SOURCED |
| dyad | 4D: two independent oscillators. 8D: coupling shows delay and partial entrainment. 11D: if `kappa>kappa_min`, phases lock; below it they drift. | `|omega_A-omega_B|<Delta omega_lock(kappa)`; SOURCED |
| human-group | 4D: crowd dots diffuse. 8D: shared timing grows order parameter. 11D: norm/attention basin persists after drive. | Kuramoto equation; SOURCED |
| bird | 4D: aerodynamic impulse changes trajectory. 8D: organism-level response time filters it. 11D: bird becomes source for flock-level field. | Newton/aero forcing; SOURCED |
| flock | 4D: local neighbour turn. 8D: alignment wave crosses flock. 11D: same poke at one edge creates whole-flock morphism. | Toner-Tu; SOURCED |
| animal-swarm | 4D: active-matter flow only. 8D: alignment threshold. 11D: swarm memory / jam avoidance route displayed. | Toner-Tu; SOURCED |
| colony-roost | 4D: density conservation. 8D: two pokes create queueing / hysteresis at roost. 11D: daily return path as memory kernel. | continuity equation; SOURCED |
| society-city | 4D: diffusion plume. 8D: threshold adoption wave. 11D: social Hopfield basin remains after source removed. | reaction-diffusion; INTERPRETIVE |
| regional-institutional | 4D: geographic Green wave. 8D: boundary selects corridor modes. 11D: institution changes boundary condition, not just colour. | P16; INTERPRETIVE |
| civilisational-solar | 4D: slow Poisson potential. 8D: attractor dwell times. 11D: policy / orbit perturbation shows path dependence. | `nabla^2 Phi=4piG rho`; INTERPRETIVE |
| species-stellar | 4D: stellar/evolutionary oscillator. 8D: selection or radiation threshold. 11D: same source produces different basin at population vs star reading. | `omega^2=k/m`; INTERPRETIVE |
| geological | 4D: elastic wave passes. 8D: fault stores stress memory. 11D: WKB nucleation threshold shown before rupture. | elastic wave; INTERPRETIVE |
| planetary | 4D: convection responds and damps. 8D: climate/interior feedback adds hysteresis. 11D: magnetosphere/atmosphere coupling persists. | Navier-Stokes-like; SOURCED |
| orbital-system | 4D: Newtonian kick changes orbit. 8D: resonant capture threshold. 11D: multi-body path dependence / slingshot memory. | `-Gm/r`; SOURCED |
| stellar | 4D: helioseismic ring. 8D: mode threshold visible. 11D: star is source node for cluster field. | Helmholtz; SOURCED |
| stellar-cluster | 4D: gravitational-wave response. 8D: relaxation / capture threshold. 11D: cluster becomes propagator substrate. | linearised Einstein; SOURCED |
| compact-object | 4D: ringdown decays exponentially. 8D: quasi-normal mode selection. 11D: no-hair memory limit contrasted with soma memory. | QNM `e^{-t/tau}cos omega t`; SOURCED |
| galactic-disc | 4D: Poisson potential. 8D: density-wave resonance. 11D: dark-sector overlay changes halo/disc coupling. | P22 / Poisson; open-hypothesis |
| galactic-halo | 4D: Vlasov/Poisson halo. 8D: clustering threshold. 11D: spatial-vacuum dark matter fraction displayed. | `Omega_DM=3/11`; derived / INTERPRETIVE |
| galaxy-cluster | 4D: BAO perturbation. 8D: lensing / cluster mode. 11D: compare baryon/dark split. | cosmological perturbation; SOURCED |
| cosmic-filaments | 4D: BAO wave. 8D: web connectivity kernel. 11D: path remembers initial conditions. | BAO equation; SOURCED |
| observable-universe | 4D: linearised metric response. 8D: retarded horizon response. 11D: `Lambda_USF` overlay and discrepancy meter. | P21; derived / INTERPRETIVE |
| cosmic-web | 4D: light-cone propagator. 8D: causal memory cone. 11D: whole zoom path lights as one retarded network. | retarded propagator; SOURCED |

Top five "wow" demos, ranked by honesty x surprise x effort:

1. Human hysteresis: same poke flips basin at 8D and stays; second poke differs because memory kernel changed the state.
2. QUANT-EXP panel: same barrier, cold classical stuck, quantum probability wave reaches Awe-dominant basin in the exact simulation.
3. Dyad phase-lock: same rhythm below/above `kappa_min` either drifts or locks.
4. Cellular threshold: subthreshold poke decays; slightly stronger poke spikes and enters refractory memory.
5. Compare cosmology: 4D Planck baseline vs 11D dimensional-counting overlay for `Lambda` and `Omega_DM`, with "model-derived, not confirmation" stamped on screen.

Implemented in the app on 2026-10-01/02: demos 1-4 are active only for their
own levels with the T lens on. `dynamics.js` adds the human 4D damped baseline,
8D Langevin double well plus P10 memory-kernel readout, and 11D QUANT-EXP-1
replay; DYAD now shows the standard Adler/Kuramoto phase-lock threshold
`kappa_min = Delta omega/2`; CELLULAR-SYNAPTIC now shows standard passive cable
decay, spike threshold, and refractory memory. The dyad/cellular panels are
labelled SOURCED; the [T]-Theory contribution is only the shared response
grammar across levels, not new phase-locking or membrane physics.

## 4. Where we are not different

- Local gravity, local time dilation and ordinary weak-field GR are not changed. `LocalGR.lean` explicitly uses local axioms for linearised Einstein / G2-to-moduli claims; it is a type-correct gate, not a new local-GR prediction.
- QUANT-EXP-1 used no quantum hardware. It is an exact 256-state statevector simulation and demonstrates reachability in a model class, not runtime advantage, consciousness, therapy or clinical efficacy.
- Clinical language remains testimony, case-study or hypothesis. P18 is N=1; P6/P7 are interpretive; no treatment recommendation follows.
- In the calm/zero-stress limit, FM-HN deliberately reduces to classical Hopfield. That is a feature, not a difference.
- The free-field OS result is a representation of the free USF as GFF under `m=k`; physical identification remains an assumption.
- [T]-Theory OFF in the app should remain a physics baseline. If T-OFF changes a physical prediction, that is a bug unless a paper states the departure.

## 5. Penrose, *The Road to Reality*, as a baseline index

Do not quote or reproduce the book. Use it only as a private/public index of standard baseline topics. A useful registry would be:

| field | meaning |
|---|---|
| chapter | Penrose chapter number or topic heading, no prose copied |
| standard equation | public-domain equation, e.g. geodesic equation, Einstein equation, Schrödinger equation, Dirac equation, path integral, twistor incidence relation |
| baseline role | what ordinary 4D science says |
| our level id | one of the 31 registry levels |
| difference class | A-E from this ledger |
| our equation | registry or paper equation |
| boundary note | "identical limit", "interpretive only", "new model-derived comparison", etc. |

Example entries: Newton/GR gravity -> `orbital-system`, `stellar-cluster`, `observable-universe`, class E/A depending on whether local GR or cosmology is being discussed; quantum oscillator -> `string-boundary`, class D/C; Green functions and propagators -> many levels, class C; thermodynamics/statistical mechanics -> Hopfield/FM-HN levels, class B. This gives the Soma Machine a disciplined 4D baseline: every click can ask "what does standard physics already say here?" before showing what [T]-Theory adds.
