---
title: "[T]-Theory: Physics"
subtitle: "Field Equations of Mind"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  This volume reads the Universal Somatic Field from the standpoint of mathematical physics. Its central object is a propagator: a Green function for a tensor-valued field whose lower-scale restrictions are proposed to resemble known response kernels, Hopfield energy dynamics, and cosmological vacuum sectors. The book is deliberately cautious about status. Lean files check type decompositions, algebraic identities, imported free-field Osterwalder--Schrader theorem applications, and arithmetic fractions under their definitions. They do not establish a physical M-theory compactification, a measured somatic tensor, or a clinical mechanism. The cosmological claims are model-derived comparisons: with $H_0=67.36\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, the current P21 estimate is $\Lambda_{\mathrm{USF}}\approx 1.01\times10^{-52}\,\mathrm{m}^{-2}$ against $\Lambda_{\mathrm{obs}}\approx 1.09\times10^{-52}\,\mathrm{m}^{-2}$, ratio $0.93$, and $\Lambda$ is constant rather than an evolving $\Omega_\Lambda(z)$. QUANT-EXP-1 is an exact statevector simulation, not hardware evidence. The aim is to make the claims precise enough for physicists to test, reject, or improve.
---

# The Green Propagator

**G-ID:** *The Master Green's Function — $L_\sigma G_\sigma=\delta$ as a response convention* (`derived-under-assumptions`). In this book the Green function is not a decorative metaphor for connectedness. It is the response kernel of a linearised field operator: given an operator $L_\sigma$ at scale $\sigma$, the propagator $G_\sigma(x,x')$ satisfies $L_\sigma G_\sigma(x,x')=\delta(x-x')$ subject to boundary conditions and sign conventions. The familiar Helmholtz form may be written $(\nabla^2+k^2)G=\pm\delta$, while Lorentzian Klein--Gordon conventions differ again by signature and factors of $i$. The programme's most compact physics claim is that many of its proposed correspondences should be read through this object. A perturbation $J$ produces a field response $\phi=G*J$; changing scale changes $L_\sigma$, $k(\sigma)$, source class, and boundary conditions, not the grammar of response itself `interpretive`.

The zoom note for this volume is broad: it works from Planck-scale bookkeeping through neural and organism-scale Hopfield reductions to cosmological boundary conditions. The central caution is equally broad. The Helmholtz, retarded, Feynman, Euclidean, and resolvent Green functions are not interchangeable. The retarded kernel encodes causal response, the Euclidean kernel supports reflection-positivity and constructive-field-theory arguments, and a Feynman propagator carries time-ordering. Where the papers move between them, the move is a Wick rotation or a model choice, not automatic physics. The reader should track the operator, signature, boundary condition, and evidence label at every step `derived-under-assumptions`.

For notation, $G$ in this book usually denotes a response kernel, not necessarily a particle propagator. $E(x,t)=E_{\mathrm{body}}\otimes E_{\mathrm{neural}}$ denotes the programme's body--neural field ansatz; $e(t)$ denotes a finite affective state vector; $W$ denotes a coupling matrix; and $\Phi$ denotes the proposed Universal Somatic Field tensor. The same letter can occur at different levels of approximation, so the intended level is part of the claim. A statement about $e(t)$ in a Hopfield landscape is not automatically a statement about $\Phi$ in an 11D compactification. A statement about $\Phi$ in a type product is not automatically a statement about a physical tensor field. This book repeatedly pauses over such distinctions because most errors in the source wrappers came from sliding across them too quickly `interpretive`.

One further convention governs the evidence labels. `kernel-verified` means that a named Lean theorem compiles as a statement about the formal objects in the file. It does not mean that the file's definitions are empirically adequate. `derived-under-assumptions` means the result follows from an explicit modelling choice, axiom, or approximation. `simulated` means a numerical model produced the result. `empirical-result` would require a documented measurement; this volume uses it sparingly because the central physics claims here are not yet independently measured. `interpretive` marks a conceptual reading. `open-hypothesis` marks a proposed physical, biological, or cosmological claim with a path to discrimination. These labels are not decorative. They are part of the book's notation.

Finally, the volume treats "mind" as a scale-specific physical problem, not as a licence to bypass physics. The word refers here to organised, embodied response: state variables, integration, thresholding, memory, reportability, and coupling to a body. Whether that organisation is identical with experience is not established by the equations. The physics task is prior and narrower: define the response system well enough that it can be perturbed, measured, and rejected. Only after that can broader metaphysical claims be assessed with any seriousness `open-hypothesis`.

This framing also explains why the book includes cosmology beside organism-scale dynamics. The claim is not that the cosmos has human-like feelings. The claim is that the same response architecture is being stress-tested at its most extreme boundary condition: no nervous system, no local organism, only vacuum sectors and cosmological scales. If the formalism cannot be made coherent there, the failure should be recorded. If it can, the result is still a cosmological model, not an anthropomorphic universe `interpretive`.

The reader should expect the embedded papers to speak more boldly than this framing. They are research papers and programme documents, not neutral review articles. Where they say "is", this book often reads "is modelled as"; where they say "proved", this book asks "proved in which file, from which assumptions?"; where they say "derived", this book asks whether the derivation is physical, formal, or conditional. That translation is not hostile. It is the work required to make ambitious prose legible to physicists `interpretive`.

The practical reward of that translation is a cleaner research agenda. A sceptic can reject the cosmology while still testing the Hopfield model; a string theorist can ignore the clinical language while examining the compactification claim; a mathematical physicist can inspect the OS and Lean files without endorsing the metaphysics. The book is modular because the evidence is modular `interpretive`.

That modularity is also an ethical constraint. Claims about trauma, consciousness, and neurodivergence affect vulnerable readers if they are written as settled fact. In this physics volume they are mechanisms under investigation, never treatment advice and never proof of personal destiny `open-hypothesis`.

The labels are therefore as much a safety device as a scholarly convention `interpretive`.

They tell the reader not only what is claimed, but how much weight the claim is allowed to bear in the argument that follows `interpretive`.

Without that load limit, precision vocabulary becomes another form of persuasion rather than a check on persuasion `interpretive`.

The remaining chapters apply that load limit repeatedly and without exception from this point onward, including every embedded paper here.

# Introduction: Field Equations of Mind

Physics is already a discipline of response. Faraday's lines of force and Maxwell's field equations replaced action at a distance with a local medium whose disturbances propagate [@faraday1852lines; @maxwell1865dynamical]. Quantum field theory sharpened the lesson: the propagator is not an afterthought to the theory but one of the principal ways the theory says what it can do. A source is inserted, a field responds, singularities and poles reveal the spectrum, and boundary conditions decide which mathematical solution is physically admissible. [T]-Theory asks whether a disciplined extension of that response language can accommodate the dynamics of felt organismic state without collapsing immediately into either metaphor or category error `interpretive`.

The question is not whether emotion has a physics in the banal sense that brains and bodies are physical. It plainly does. The question is whether there is a useful field variable, a useful state space, and a useful propagator for the body--brain dynamics that precede, accompany, and sometimes enter awareness. The Soma-Field papers answer by proposing an affect state $e(t)$, a Hopfield-type energy
$$H(e)=-\tfrac12 e^\top W e-b^\top e,$$
and a Langevin evolution
$$\gamma\dot e=-\nabla H(e)+\sqrt{2D}\,\xi(t)+J(t),\qquad T_{\mathrm{eff}}=D/\gamma.$$
This is a model class, not an observation. It inherits the strength of Hopfield networks as a theory of attractors [@hopfield1982] and the weakness of any coarse-grained reduction: the chosen variables, coupling matrix, noise model, and measurement map must be justified empirically `derived-under-assumptions`.

The physics volume therefore begins from an austere rule. A claim may be formal, numerical, simulated, empirical, interpretive, or open. The Lean kernel can check that a theorem follows from definitions and axioms; it cannot check that a human field variable is the right variable or that a clinical word names the same state as a mathematical attractor. The current proof surface contains valuable checked objects, but it also contains five real `sorry`s across `BRECVEMAVariational.lean`, `DyadicField.lean`, and `SomaNetwork.lean`. `FieldAxioms.lean` is an axiom registry. Results depending on it are not theorems about nature; they are consequences of stated premises `derived-under-assumptions`.

For physicists, the most interesting object is the proposed somatic tensor $\Phi$ and its two-point function
$$G_{\mu\nu}(x,x')=\langle \Phi_\mu(x)\Phi_\nu(x')\rangle_0.$$
Read this first as a formal aspiration: if a field $\Phi$ and vacuum state are given, the two-point function is the natural response object. The programme then proposes several reductions. At a neural or organism scale it reduces to a Hopfield/Langevin attractor model. At a free-field Euclidean scale it uses imported OSforGFF theorems for a Gaussian free field, with USF identification as an interpretation. At a cosmological scale it proposes that the vacuum amplitude of the tensor trace contributes to $\Lambda$. None of these reductions is automatic. Each is a correspondence principle with assumptions and possible failure modes `open-hypothesis`.

The compactification language requires particular care. The Lean theorem `MTheoryIsomorphism.somaField_iso_mtheory` proves a type/product round-trip: the programme's 11-dimensional structure can be written as a 4D spacetime factor together with a 7D product sector and mapped back without loss. That is a legitimate formal statement and useful bookkeeping `kernel-verified`. It is not a derivation of physical M-theory, not a proof of a compact $G_2$-holonomy metric, and not evidence that biological states literally are Kaluza--Klein modes. Standard M-theory compactifications require geometric, spectral, anomaly, moduli-stabilisation, and phenomenological work [@witten1995; @horava1996]. The programme has a type isomorphism and a compactification hypothesis, and those should not be confused.

The same distinction applies to the Simple Harmonic Oscillator claim. The papers' attractive idea is that the oscillator need not be postulated as a little material string; it can appear as the impulse response of a field operator. Away from a source singularity, Helmholtz slices solve oscillator equations, and the Lean surface now imports physlib harmonic-oscillator and wave-equation facts. Within that framework, the SHO structure is derived from field-response form rather than added as a primitive `derived-under-assumptions`. But the leap from that mathematical observation to a physical string-theory derivation remains conditional on the field identification and compactification programme. In this book "derived" always means "derived inside the stated model", not "settled as fundamental physics".

The cosmological material is similar. P21 no longer asks the reader to treat $\Omega_\Lambda(z)$ as a constant fraction at every redshift. It identifies $\Lambda$ with a vacuum amplitude; $\Lambda$ is constant. The fraction $7/11$ is a leading-order dimensional partition used to compare the model's present-day dark-energy density with Planck 2018 TT,TE,EE+lowE+lensing values. With $H_0=67.36\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, the text now gives
$$\Lambda_{\mathrm{USF}}=\frac{21}{11}\frac{H_0^2}{c^2}\approx 1.01\times10^{-52}\,\mathrm{m}^{-2},$$
where $\Lambda_{\mathrm{obs}}\approx1.09\times10^{-52}\,\mathrm{m}^{-2}$ and the ratio is $0.93$ `derived-under-assumptions`. The numerical proximity is not independent confirmation. It is a model-derived comparison that lives or dies with the compactification, GR, vacuum-amplitude, and correction assumptions.

QUANT-EXP-1 also needs a clean boundary. It is an exact 8-qubit dense statevector simulation of a transverse-field Ising/Hopfield landscape. It reports cold classical non-escape across the hardened barriers and a quantum Awe-dominant peak around $0.408$--$0.410$ `simulated`. It did not use D-Wave, IBM, or other quantum hardware. It does not prove therapy, consciousness, or runtime quantum advantage. Its value for physicists is narrower and still real: it supplies a transparent model in which transverse-field dynamics reaches a basin that the tested low-noise classical dynamics does not. That is a useful simulation of reachability in one landscape class.

What, then, should a physicist take from the volume? Not that physics has already absorbed experience. Not that a proof assistant has verified cosmology. Not that an 8-qubit simulation demonstrates a clinical mechanism. The proposition is more modest and more demanding: field theory supplies a precise language in which these claims can be written sharply enough to be wrong. The embedded papers develop a chain from affective Hopfield dynamics, through quantum reachability, through 11D response bookkeeping, to cosmological comparisons and $G_2$-style symmetry breaking. This book's original prose supplies the warnings, units, labels, and physical reading needed to keep that chain from becoming a slogan.

## The Reader's Contract

The contract for this volume is stricter than the generated introduction it replaces. A claim is not strengthened by being repeated at another scale. It is strengthened only by a derivation, a theorem under named assumptions, a simulation whose code and parameters can be inspected, or a measurement whose protocol can be repeated. Conversely, a claim is not destroyed merely because it is speculative. Speculation is allowed when it is labelled, when its dependencies are visible, and when the author names what would make it fail `interpretive`.

The reader should therefore treat the book as a sequence of increasingly risky extensions. The Soma-Field paper begins with a comparatively modest effective model: affective states in a Hopfield-like landscape. The quantum paper adds a simulation of barrier traversal in that landscape. The USF and zUSF papers then ask whether the response formalism can be lifted to an eleven-dimensional scale architecture. The cosmology papers apply the architecture to dark-energy and dark-matter accounting. The $G_2$ paper returns to the biological interface and asks whether an 8D emotional mechanism space has a 7D traceless sector compatible with compactification language. Each step inherits unresolved assumptions from the previous one `derived-under-assumptions`.

This inheritance is not a reason to abandon the chain; it is a reason to keep a dependency graph. If the compactification hypothesis fails, the Soma-Field Hopfield model might still be useful. If QUANT-EXP-1 fails to scale, the classical affective landscape might still survive. If the cosmological fractions are coincidental, the OS free-field result and type-level scale architecture may still be mathematically interesting. Good scientific programmes degrade gracefully: local failures should identify which bridge collapsed. Bad programmes make every claim depend rhetorically on every other. This book tries to make [T]-Theory degrade gracefully `interpretive`.

The physicist's role is therefore partly adversarial. The right response to the equations is not politeness but attack. Does the kernel have the right dimensions? Does the compactification conserve what it must conserve? Does the dark sector overproduce isocurvature modes? Does the proposed detector couple to ordinary electromagnetism instead of a new tensor? Does a classical algorithm match the quantum simulation? Does the threshold model predict false positives in anaesthesia, sleep, dissociation, or high-arousal non-conscious states? These attacks are not external to the programme. They are the route by which it would become physics `open-hypothesis`.

## Why Include Experience at All?

A physicist might ask why this volume belongs in physics rather than neuroscience or philosophy. The answer is not that subjective experience is already a measured field quantity. It is not. The answer is that the programme proposes to treat experience-bearing organisms as physical systems whose internal regulatory dynamics may require field-level modelling. The object of physics, on this reading, is not private experience as such but the response structure that makes reportable, embodied state possible `open-hypothesis`.

This is continuous with existing physics when stated carefully. Statistical physics already studies macroscopic variables that are not microscopic substances: temperature, pressure, order parameters, phases, and correlation lengths. Condensed-matter physics studies quasiparticles and collective modes that are real at their scale without being fundamental particles. Affective field variables, if they become measurable and predictive, would occupy a similar effective status. They would not need to be fundamental to be physical. They would need to be well-defined, stable under appropriate coarse-graining, and experimentally useful `derived-under-assumptions`.

The hard problem of consciousness is not solved by declaring such variables. At most, the field approach relocates part of the problem. Instead of asking how inert matter gives rise to experience in one conceptual leap, it asks how a body--brain field becomes globally integrated, thresholded, and reportable; and separately whether the intrinsic nature of that field should be identified with experience. The first question can be physics and neuroscience. The second remains philosophical unless a new empirical handle is found `interpretive`.

This division of labour is important for the papers that follow. The physics reader is not being asked to accept a metaphysics of mind. The reader is being asked to inspect a proposed response formalism and decide whether it can earn physical content. If it cannot, the philosophical ambition fails with it. If it can, philosophy still has work to do.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Hopfield energy is the finite affective state model used by SFT. | `derived-under-assumptions` | Soma-Field paper; Hopfield reference |
| Lean checks formal statements relative to definitions and axioms, not physical interpretation. | `interpretive` | Lean proof files and paper caveats |
| `somaField_iso_mtheory` is a product/type isomorphism. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| Physical compactification remains a separate programme. | `open-hypothesis` | USF and zUSF papers |
| QUANT-EXP-1 is exact statevector simulation, not hardware evidence. | `simulated` | Quantum Soma paper |
| P21's current $\Lambda$ comparison is model-derived and constant-$\Lambda$ based. | `derived-under-assumptions` | Cosmological-constant paper |

# Propagators, Compactification, and Derivation

The word "propagator" hides several inequivalent objects. In a hyperbolic classical equation, the retarded Green function $G_R$ vanishes outside the future light cone and encodes causal response. In a quantum theory, the Feynman propagator encodes time-ordered correlation functions and perturbative amplitudes. In constructive Euclidean field theory, Schwinger functions live on a Riemannian signature and need Osterwalder--Schrader reconstruction conditions before they can be read as a relativistic quantum theory. A static Helmholtz Green function solves an elliptic boundary-value problem. The programme is strongest when it says exactly which of these it is using `derived-under-assumptions`.

For organism-scale dynamics, the relevant propagator is often closer to a resolvent or response kernel of a dissipative system than to a relativistic Feynman propagator. A perturbation $J(t)$ changes state through
$$\phi(t)=\int K(t-t')J(t')\,dt',$$
where $K$ may be retarded, coarse-grained, and history-dependent. Trauma and memory kernels in the papers are usually of this form. If $K(\tau)=\sum_k A_k e^{-|\tau|/\tau_k}$, then it resembles a Euclidean massive propagator in one dimension; that resemblance is mathematically informative but physically conditional. It does not by itself turn memory into a quantum field or therapy into particle scattering `interpretive`.

The OS material sits at a different level. `USF_OSAxioms.lean` imports OSforGFF and applies the upstream Gaussian-free-field theorem surface to a massive Gaussian free field. The named results `USF_OS0_Analyticity`, `USF_OS3_ReflectionPositivity`, `USF_OS4_Clustering`, and `freefield_USF_satisfies_OS_axioms` are valuable because they anchor a free Euclidean field in a standard reconstruction framework `kernel-verified`. The status boundary is crucial: the theorems apply to the Gaussian free field object. Identifying that object with the physical USF, and then adding Hopfield couplings or organismic semantics, is an interpretation and further model construction `interpretive`.

This matters because reflection positivity is not a rhetorical badge. OS3 is the condition that allows a Euclidean measure to define a positive Hilbert space after reconstruction. Clustering controls the decay of correlations. Analyticity and Euclidean covariance are part of the machinery that keeps Wick rotation honest. If the interacting Hopfield-coupled field violates the assumptions, the imported free-field theorem does not follow it. A physicist should therefore treat the OS result as a clean free-field base case, not as a completed axiomatic QFT for emotional dynamics `derived-under-assumptions`.

The compactification picture has a similar base-case structure. The programme writes
$$M_{11}=M_4\times P_3\times L_1\times C_3,$$
with $P_3$ a propagator sector, $L_1$ a limbic axis, and $C_3$ a cortical or information sector. In Lean these are products of simple types, with maps `toMTheory` and `fromMTheory` proving a round-trip. This is useful because it prevents casual dimension drift. It also exposes the precise shortage: a type product is not a compact Riemannian 7-manifold with $G_2$ holonomy, a spectrum, moduli stabilisation, and low-energy physics `kernel-verified`.

If one reads the compactification physically, the burden increases. One needs a compact $X_7$ or a justified non-compact effective replacement; a metric; a moduli-space analysis; a Kaluza--Klein spectrum; couplings to Standard Model fields; and a reason why the biological or somatic tensor is one of the low-energy fields rather than a new name for an existing degree of freedom. The papers sometimes sketch these steps. They do not complete them. The correct label for the physical compactification is therefore `open-hypothesis`, even though the product decomposition itself is formally checked.

The programme's strongest physics move is to use correspondence principles. At zero somatic stress, a Field-Modulated Hopfield Network should reduce to an ordinary Hopfield network. At the free-field Euclidean limit, the field should reduce to a Gaussian free field with OS properties. At weak-field cosmological limits, the tensor stress contribution should resemble the relevant GR source. At a neural electromagnetic limit, it should be compatible with CEMI-style field views of consciousness [@mcfadden2002a]. Each reduction is a demand, not merely an analogy. If the reduction fails, the theory is constrained or falsified `open-hypothesis`.

The Simple Harmonic Oscillator claim can be understood in this correspondence spirit. Let a field equation at scale $\sigma$ have a characteristic $k(\sigma)$:
$$(\nabla^2+k(\sigma)^2)G_\sigma=\delta.$$
Here the sign of the source term follows the book's response convention, not a universal Helmholtz convention. Away from the source, one-dimensional slices of $G_\sigma$ satisfy the homogeneous oscillator equation. Thus oscillator modes can be read as response modes of the substrate. This observation is standard enough in mathematical physics to be plausible; what is novel is the programme's attempt to use it as the bridge from string-theory worldsheet oscillator language to a universal response architecture `derived-under-assumptions`.

There is a helpful negative formulation: the programme does not need to say that all substrates are the same. Electromagnetic, elastic, neural, gravitational, and cosmological systems differ in signature, source terms, dispersion, dissipation, gauge symmetry, and boundary conditions. The commonality is response form under a family of operators. That is much weaker than monism about substance and much stronger than saying "waves appear everywhere." It is a mathematical co-identification claim: theorem transfer is allowed only when the type signature, units, symmetries, and boundary assumptions match `derived-under-assumptions`.

For physicists, this discipline is the difference between a research programme and a metaphor factory. The phrase "somatic tensor" should not be accepted until its transformation properties, units, coupling terms, conserved or broken symmetries, and measurement channels are specified. The phrase "Green function of feeling" should be read as a proposal for a response kernel, not as a direct detector event. The phrase "M-theory isomorphism" should be read as a formal structural isomorphism, not as a physical derivation. If the programme survives, it will do so by making these distinctions sharper, not softer.

## Compactification: Three Different Claims

There are three compactification claims in circulation, and confusing them produces most of the overreach. The first is a bookkeeping claim: the programme uses an eleven-dimensional product structure with four spacetime, three propagator, one limbic, and three cortical/information coordinates. This is the statement Lean handles well. It can prove that the proposed structure has the advertised decomposition, that projections commute in simple ways, and that a boundary point is not an interior point of the limbic interval `kernel-verified`.

The second is a structural analogy: M-theory also uses eleven-dimensional language and often studies compact seven-dimensional sectors. The programme's $P_3\times L_1\times C_3$ sector is therefore compared with an $X_7$ compact sector. This is a legitimate analogy when the comparison is restricted to dimension count and product structure. It becomes a co-identification only if the relevant geometric, spectral, and symmetry data match. At present, the papers supply some algebraic compatibility arguments and an explicit warning that full $G_2$ holonomy is not derived `interpretive`.

The third is a physical derivation: the somatic tensor would have to arise as a low-energy field in an actual compactification, with calculable couplings to matter and cosmological consequences. That claim is not established by the Lean type isomorphism. It would require the kind of work string phenomenology recognises: selecting or deriving the internal geometry, handling moduli stabilisation, computing the effective action, checking anomalies and symmetries, and showing how the Standard Model or its relevant effective degrees of freedom sit in the construction. The current programme points toward such a derivation but does not contain it `open-hypothesis`.

This three-way split also clarifies what the dark-sector papers can claim. If one assumes the physical compactification reading, then it is natural to ask which blocks of the eleven-dimensional field contribute to four-dimensional vacuum energy. If one has only the type-isomorphism reading, the same dimensional fractions are suggestive arithmetic, not cosmology. The status of $\Omega_\Lambda=7/11$ and $\Omega_{\mathrm{DM}}=3/11$ therefore depends not on arithmetic alone but on which compactification claim one has earned `derived-under-assumptions`.

## The Free Field and the Interacting Field

Another necessary split is between free and interacting theories. The OSforGFF import gives the programme a mathematically respectable free Euclidean base. A massive Gaussian free field satisfying OS axioms is exactly the kind of object constructive field theory knows how to handle. Reflection positivity gives a route to a Hilbert space; clustering controls long-range correlations; Euclidean invariance and regularity supply reconstruction data. This is a serious formal foothold `kernel-verified`.

The Soma-Field organism model, however, is not a free Gaussian field. It has nonlinear attractors, thresholds, memory kernels, effective temperature, asymmetric couplings, and external forcing. Those are precisely the features that make it interesting for affective dynamics, and precisely the features that can invalidate free-field theorems. An interacting Euclidean measure with Hopfield potential would require its own existence proof, positivity analysis, and reconstruction conditions. In a dissipative biological system, one may need a stochastic process or non-equilibrium field theory rather than OS reconstruction at all `open-hypothesis`.

This should not be read as a defect unique to [T]-Theory. Most physically useful models begin by solving a free or linearised case and then adding interactions. The defect would be to let the free case certify the interacting case by proximity of notation. The correct path is explicit perturbation theory, constructive bounds where possible, and numerical experiments where formal analysis is out of reach. The book therefore treats OS success as a base camp, not a summit.

## Green Functions and Memory

Memory kernels are where the physics language becomes most tempting. A traumatic trace written as
$$K_{\mathrm{trauma}}(\tau)=\sum_k A_k e^{-|\tau|/\tau_k}$$
resembles a sum of massive Euclidean propagators. This is mathematically useful. It says that slow modes, long correlation times, and near-zero poles can model persistence. It also suggests that interventions could be described as changes in pole location, residue, or damping. But an exponential memory kernel is common in many dissipative systems. Its presence does not by itself indicate quantum field ontology `derived-under-assumptions`.

The temporal distinction between retarded and Euclidean kernels is important here. A therapeutic or physiological response must be retarded: causes precede effects, and kernels should vanish for the wrong temporal ordering. A Euclidean kernel may be useful for energy landscapes, equilibrium analogies, or reconstruction arguments, but it is not a causal response until analytically continued or otherwise related to real time. The programme's P10 temporal-dynamics direction is therefore not optional technical polish; it is required if memory and trauma are to be modelled as physics rather than as static pictures `open-hypothesis`.

{{Visualize | lean:TemporalDynamics.retardedDecayFactor_isCausal | convolution:wave | input="exp(-((t-1)/0.05)^2)/(0.05*sqrt(pi)) + 0.6*exp(-((t-5)/0.05)^2)/(0.05*sqrt(pi))"; kernel="exp(-0.3*t)*sin(3*t)"; x=[0,14]; input_label="input: two kicks"; kernel_label="retarded kernel $G$"; output_label="response $y = G * u$"; label=fig:physics-retarded-response; height=40% }} A retarded response. Each kick starts a delayed copy of the kernel $G$, which is zero before its kick; the response is the sum of the copies. That the decay factor vanishes for the wrong time order is proved in Lean (`retardedDecayFactor_isCausal`); the kernel shape here is an illustration.

For physicists, a good future version of the model would infer $K(\tau)$ from time-series data and compare candidate kernel families. Does the decay require one timescale or many? Are there oscillatory components? Are the kernels state-dependent? Does a perturbation shift a pole, change a residue, or alter noise temperature? These are response-function questions in the ordinary sense. They turn psychological words into measurable hypotheses without pretending that the measurements already exist.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Retarded, Euclidean, Feynman, and Helmholtz propagators have different admissibility conditions. | `interpretive` | Standard field theory reading |
| OSforGFF supports a free Gaussian-field OS result. | `kernel-verified` | `USF_OSAxioms.lean` |
| USF = GFF is a physical interpretation, not supplied by OSforGFF. | `interpretive` | zUSF and proof boundary |
| $M_{11}=M_4\times P_3\times L_1\times C_3$ is formally encoded as products. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| Compact $G_2$ holonomy and physical KK spectra are open. | `open-hypothesis` | USF, zUSF, G2 papers |
| SHO-as-response is derived inside the field-equation setup. | `derived-under-assumptions` | USF and MTheory proof files |

# Cosmological Limit and Dark-Sector Accounting

The cosmology papers are the most vulnerable to over-reading because their numbers are memorable. Seven compact dimensions give $7/11$; three non-compact spatial dimensions give $3/11$; half of the time block gives $1/22$. The resulting present-day comparisons to dark energy, dark matter, and baryons are close enough to be interesting. They are also easy to oversell. A physicist should first ask what the calculation is, what is held fixed, and what observable would distinguish it from fitted cosmology `derived-under-assumptions`.

P21 reframes the cosmological constant problem by refusing the usual zero-point-energy sum up to a high cutoff. Instead of treating $\Lambda$ as the naive sum of oscillator vacuum energies, it identifies it with a classical background amplitude of the Universal Somatic Field trace:
$$\Lambda\equiv \frac{k_{\mathrm{cosm}}^2\langle\mathrm{tr}\,\Phi\rangle_0^2}{M_{\mathrm{Pl}}^2c^2},\qquad k_{\mathrm{cosm}}=\frac{H_0}{c}.$$
This is not a derivation from established quantum gravity. It is a model choice designed to make the vacuum amplitude, rather than a divergent mode sum, the relevant object `derived-under-assumptions`.

The current numerical statement is precise. With $H_0=67.36\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ and $\Omega_\Lambda=0.6847$ from the Planck 2018 TT,TE,EE+lowE+lensing baseline, the observed value is
$$\Lambda_{\mathrm{obs}}=\frac{3\Omega_\Lambda H_0^2}{c^2}\approx1.09\times10^{-52}\,\mathrm{m}^{-2}.$$
The model's compact-sector estimate is
$$\Lambda_{\mathrm{USF}}=\frac{21}{11}\frac{H_0^2}{c^2}\approx1.01\times10^{-52}\,\mathrm{m}^{-2},$$
so $\Lambda_{\mathrm{USF}}/\Lambda_{\mathrm{obs}}=(7/11)/0.6847\approx0.93$ [@planck2018cosmology] `derived-under-assumptions`. The agreement is at the 7.1 per cent level. It is a comparison, not a precision cosmological fit.

The distinction between $\Lambda$ and $\Omega_\Lambda(z)$ is essential. $\Lambda$ is constant in the model. The density parameter $\Omega_\Lambda(z)$ is a ratio to the critical density and therefore changes as the background cosmology changes. Saying that $7/11$ is the compact-sector partition is not the same as saying the observed dark-energy density parameter is $7/11$ at all epochs. The model predicts a constant dark-energy equation of state, $w=-1$, only under the LocalGR/static-moduli assumptions used in the proof surface `derived-under-assumptions`.

The Lean file `CosmologicalConstant.lean` is useful because it separates arithmetic from physics. The theorems `omega_lambda_fraction` and `omega_lambda_discrepancy_small` are arithmetic over the chosen constants. `usf_equation_of_state` now routes through `LocalGR.g2_implies_omega_lambda_static`. `cosmological_constant_identification` supplies a positive $\Phi_0$ witness in the formal file. These statements clarify dependencies, but the physical load remains: moduli geometry, the vacuum-amplitude interpretation, GR coupling, and the correction that moves simple dimension counting to observed cosmology `derived-under-assumptions`.

P22 extends the same bookkeeping to dark matter. The spatial block $\langle\Phi_{ij}\rangle_0$ is assigned
$$\Omega_{\mathrm{DM}}^{\mathrm{USF}}=\frac{3}{11}\approx0.2727,$$
compared with the Planck 2018 TT,TE,EE+lowE+lensing value $0.2645$ [@planck2018cosmology]. In prose this is a 3.1 per cent high discrepancy. The model then has to explain why this spatial vacuum gravitates, clusters, has no Standard Model gauge charge, and behaves as cold pressureless matter with $w\simeq0$. The file supplies formal claims such as `spatial_vacuum_em_neutral` and `spatial_vacuum_pressure_zero`, but those depend on the programme's local-geometry assumptions `derived-under-assumptions`.

The dark-matter paper's best feature is that it lists falsifiers. If the component has pressure inconsistent with cold dark matter, couples electromagnetically, fails to cluster, or produces no distinguishable structure from standard CDM, the spatial-vacuum reading loses force. A further challenge is degeneracy: a model that reproduces only the background density fraction can be observationally indistinguishable from many dark-sector parametrisations. To become physics rather than numerology, the USF dark-sector proposal needs perturbation theory, lensing predictions, structure-growth signatures, and a clear treatment of baryons and radiation `open-hypothesis`.

The same caution applies to "zero free parameters." The integer partition has no adjustable continuous parameter at the point where the fractions are written down. But the selection of the compactification structure, the identification of sectors, the decision to assign half the time block to baryons, and the moduli corrections are theoretical choices. Zero free parameters in a leading arithmetic estimate is not zero assumptions in the physical model. The appropriate phrase is "model-derived, low-parameter comparison under stated compactification assumptions" `derived-under-assumptions`.

None of this makes the cosmology uninteresting. On the contrary, it is interesting because it is rigid enough to fail. The programme says $\Lambda$ is constant, not a rolling scalar with arbitrary $w(z)$. It says the compact block and spatial block should behave differently under clustering. It says the dark matter density should trace the three non-compact spatial dimensions, not a new particle species. If the model can be extended to perturbations and still match CMB, BAO, lensing, and structure growth without ad hoc correction functions, it would deserve attention. Until then, it is a compact, falsifiable extrapolation from the USF bookkeeping `open-hypothesis`.

The relevant attitude for physicists is neither dismissal by taste nor acceptance by coincidence. Ask for the stress-energy tensor. Ask for gauge couplings. Ask for perturbations. Ask for the moduli metric. Ask whether the 7 per cent correction has the sign and magnitude predicted by an actual $X_7$ calculation. Ask whether the ratio $0.93$ survives updated $H_0$ choices, and whether the theory treats the Hubble tension as input sensitivity or as a physical diagnostic. The papers open these questions; they do not close them.

## How a Physicist Should Read the Evidence

The strongest habit this volume asks of its reader is localism about evidence. A formal theorem is local to its definitions. A simulation is local to its Hamiltonian, initial state, schedule, and numerical method. A cosmological comparison is local to its background parameters and assumption set. An analogy is local to the structure it preserves. This is not a defensive manoeuvre; it is how physics normally protects itself. Maxwellian electrodynamics did not become true because fields were a beautiful way to speak. It became unavoidable because it organised known phenomena, predicted new ones, and survived precision attack. [T]-Theory has not reached that status. It is a proposed extension written in the syntax of field theory, with a proof ledger and simulations that make some of its assumptions inspectable `interpretive`.

This means that a reader should resist two equal and opposite temptations. The first is to reject the programme because some of its vocabulary is psychologically or clinically motivated. Effective field theories often begin with phenomenological variables before a microscopic derivation is available. Hydrodynamics knew pressure and viscosity before quantum chromodynamics explained hadrons; Landau theory knew order parameters before microscopic many-body calculations could derive every coefficient. It is not illegitimate for SFT to begin with $e(t)$, $W$, $T_{\mathrm{eff}}$, and a memory kernel. The illegitimacy would be to forget that these are effective variables and to pretend they already have detector-calibrated microscopic definitions `derived-under-assumptions`.

The second temptation is to accept the programme because known mathematical structures appear in it. Green functions, Hopfield energies, $G_2$ language, Kaluza--Klein reduction, and OS axioms are not talismans. They are exact tools with domains of validity. A Green function requires a specified operator; a Hopfield theorem requires symmetry or another convergence argument; a $G_2$ compactification requires geometry, not merely the number seven; an OS theorem requires Euclidean fields satisfying the relevant axioms. The book therefore treats every impressive word as a liability until the object beneath it is named `interpretive`.

The programme's own method, mathematical co-identification, is useful here. A co-identification is stronger than analogy but weaker than identity. It says that two domains share a type signature sufficient to transfer some theorem or modelling habit under stated assumptions. A physicist might co-identify the heat equation and diffusion of probability because the same parabolic operator appears, while still refusing to say heat literally is probability. In this volume, the response kernel is the shared type signature. That permits controlled theorem transfer only when units, symmetry, boundary conditions, and source terms match `derived-under-assumptions`.

The right question for every chapter is therefore: what is invariant under the mapping? If the invariant is only "there is a curve" or "there is a barrier", the mapping is weak. If the invariant is an operator class, spectral property, energy functional, or reconstruction theorem, the mapping is stronger. The Soma-Field model is strongest when it proposes a concrete energy landscape and weakest when it uses topology as a general word for difficulty. The cosmological papers are strongest where they state exact density fractions and weakest where they postpone perturbations. The $G_2$ paper is strongest where it proves tracelessness and weakest where it gestures at holonomy. This gradient of strength is the book's organising principle.

A second organising principle is scale humility. The zUSF architecture speaks across Planck, neural, organismic, social, geological, and cosmological scales. Physicists know that scale changes can preserve form while destroying ontology. The renormalisation group was powerful precisely because it explained why very different microscopic systems share critical exponents [@wilson1971rg; @stanley1971phase]. It did not imply that magnets and fluids are the same substance. Anderson's warning that "more is different" remains relevant [@anderson1972more]. A scale-invariant response grammar may be real even if the substrates are irreducibly different `interpretive`.

That is why this book does not require the reader to believe that emotion, dark matter, and strings are "the same thing." It asks whether a response formalism can be written so that each domain is a scale-specific instantiation with its own boundary conditions. If the answer is no, the programme fails as physics. If the answer is yes, the reward is not mystical unity but a disciplined dictionary: which observables correspond, which equations survive, which parameters flow, and where the dictionary breaks.

## What Would Count as Progress

Progress would first be formal. The proof surface should separate theorem, axiom, placeholder, and `sorry` so clearly that no prose can accidentally promote one status into another. A revised `FieldAxioms.lean` could be renamed or annotated as a conjecture and assumption registry. QUANT-EXP-1 could encode its empirical counts or probability inequalities rather than relying on an axiom `quant_exp_1`. The interacting Hopfield field could state precisely which OS axioms survive and which fail. The $G_2$ files could distinguish algebraic octonionic decomposition from metric holonomy throughout `open-hypothesis`.

Progress would next be computational. The simulation suite should include baseline sensitivity, schedule dependence, noise robustness, finite-size scaling, and alternative classical methods. A physicist will not be persuaded by a comparison to one cold Langevin baseline if simulated annealing, cluster updates, nonlocal proposals, or path-sampling methods cross the barrier. That would not necessarily destroy the topological story, but it would change its target from "classical cannot" to "this local low-noise classical dynamic does not." The narrower claim is often the more valuable one `simulated`.

Progress would then be experimental. On the biological side, an instrument would need to infer state variables and couplings with known error bars. On the quantum side, hardware tests would need to show that an annealer or gate model reproduces the statevector pattern after calibration and noise analysis. On the cosmological side, perturbation observables would need to be computed. On the compactification side, the claimed moduli correction would need a sign and magnitude from geometry. Each route has a null result that should be welcomed: a failed detector, a failed hardware reproduction, an inconsistent perturbation spectrum, or a wrong correction sign would localise the error `open-hypothesis`.

The volume's strongest claim, then, is not that [T]-Theory is already a new physics. It is that the programme has reached the point where several of its claims can be made locally accountable. That is the threshold this book tries to enforce.

## Ledger

| Claim | Label | Source |
|---|---|---|
| P21 identifies $\Lambda$ with a vacuum amplitude, not a ZPE cutoff sum. | `derived-under-assumptions` | Cosmological-constant paper |
| Current P21 uses $H_0=67.36$ and gives $\Lambda_{\mathrm{USF}}\approx1.01\times10^{-52}\,\mathrm{m}^{-2}$. | `derived-under-assumptions` | Cosmological-constant paper |
| $\Lambda$ is constant; $\Omega_\Lambda(z)$ is not. | `derived-under-assumptions` | P21 model reading |
| $\Omega_{\mathrm{DM}}=3/11$ is arithmetic from sector counting. | `kernel-verified` | `CosmologicalConstant.lean` |
| Spatial-vacuum pressurelessness and neutrality depend on local-geometry assumptions. | `derived-under-assumptions` | Dark Matter paper; `LocalGeometry.lean` |
| Perturbation-level cosmological predictions remain open. | `open-hypothesis` | P21/P22 falsification sections |

# Quantum, Biological, and Symmetry-Broken Regimes

At organism scale, the USF programme is not primarily a cosmology. It is a dynamical model of body--brain affect, using a field vocabulary to represent sub-perceptual persistence and thresholded awareness. The finite model is Hopfield-like: the system has a state vector, a coupling matrix, an energy landscape, and attractor basins. That vocabulary is familiar to physicists because it resembles spin-glass and associative-memory models. The novelty is the interpretation of the state components as affective and somatic modes `derived-under-assumptions`.

The model should be read as a coarse-grained effective theory. No one observes $W$ directly in a clinic. A future instrument might infer effective couplings from physiological, behavioural, and report data; until then $W$ is a modelling object. The same is true of the threshold $T_i$ for conscious emotion and $T_c=\sqrt2$ in the formal USF file. `UniversalSomaticField.consciousness_dichotomy` proves that a real amplitude is either below $\sqrt2$ or at/above it. That is arithmetic `kernel-verified`. The claim that human consciousness is a phase transition at a calibrated limbic amplitude is an empirical and philosophical hypothesis `open-hypothesis`.

QUANT-EXP-1 is best understood in this effective-theory setting. It takes an 8-mode Hopfield landscape with a strong Fear--Awe barrier and studies classical low-noise dynamics versus transverse-field quantum annealing. The quantum Hamiltonian is the standard transverse-field Ising form
$$\hat H_Q=-\frac12\sum_{ij}W_{ij}\hat\sigma_i^z\hat\sigma_j^z-\sum_i b_i\hat\sigma_i^z-\Gamma\sum_i\hat\sigma_i^x.$$
At $\Gamma=0$ it reduces to the classical problem Hamiltonian; at nonzero $\Gamma$ it permits tunnelling-like transitions across barriers in the model landscape `simulated`.

The exact status matters. The calculation is a dense statevector simulation on $2^8=256$ states. The hardened results report cold classical $0/200$ escapes for B8, B10, and B12, Wilson interval $[0,0.019]$, and quantum peak Awe-dominant occupancy $0.408$--$0.410$ across the same barriers `simulated`. Earlier summaries sometimes use 3/3 barrier cases versus 0/48 cold classical trajectories; the hardened table is the safer statement for this book. No quantum processor was used. The simulation is therefore evidence about a model class, not about hardware speed-up or human therapy.

The Penrose connection should also be narrowed. Penrose argued that classical computation misses something essential about consciousness [@penrose1971]. QUANT-EXP-1 does not vindicate Orch-OR, quantum gravity in microtubules, or non-computability. It identifies a smaller gap: a classical local dynamic tested in the simulation does not cross a constructed topological barrier, while a transverse-field simulation produces nonzero occupancy of the target basin. This is a useful mathematical contrast, not a proof that minds require quantum mechanics `interpretive`.

At the biological symmetry level, P24 studies an 8D BRECVEMA coupling matrix. It decomposes
$$W_8=W_{G_2}+\delta W,\qquad W_{G_2}=\frac65 I_8,$$
with $\delta W$ traceless and $\|\delta W\|_F/\|W_8\|_F=0.484$. The exact rational tracelessness is a matrix identity; the interpretation that the biological emotional system is 48.4 per cent symmetry-broken from a $G_2$ ideal is a model reading. The paper is careful that it resolves an algebraic $8\to7$ compatibility question but does not derive a compact $G_2$-holonomy metric for $X_7$ `derived-under-assumptions`.

That distinction is not pedantry. $G_2$ is a specific exceptional holonomy group with stringent geometric meaning. An 8D real vector space decomposing as $\mathbb{R}\oplus\mathbb{R}^7$ is compatible with octonionic language, but compatibility is weaker than holonomy. The Lean facts in `BRECVEMAVariational.lean` include exact matrix definitions and some arithmetic results; the file also contains open variational and moduli-space statements. The result is a promising algebraic bridge, not a completed compactification theorem `open-hypothesis`.

The clinical-sounding consequences of P24 should therefore be stated as model hypotheses. A reduction in $\|\delta W\|_F$ can be used as a formal picture of movement toward balanced coupling; it is not a measured therapeutic invariant. Tracelessness means the algebraic sum of symmetry-breaking eigenvalues is zero. It does not automatically imply conservation of clinical "symmetry-breaking energy" in a patient. If that conservation law is intended physically, it needs a defined observable and longitudinal data `open-hypothesis`.

The physics payoff of the organism-scale material is not that it gives physicists a new treatment manual. It gives them a set of effective operators to criticise. Is $W$ symmetric or asymmetric? Does asymmetry destroy standard Hopfield convergence? What noise model is appropriate for autonomic regulation? Can a retarded memory kernel be inferred from time-series data? Does a threshold model predict hysteresis, critical slowing, or spectral signatures? These questions are mathematical and experimental. They are where a field theory of affect could become falsifiable `open-hypothesis`.

The strongest cross-scale point is methodological. At every scale, the programme tries to say: choose a substrate, define its state space, identify the operator, compute the response kernel, state the correspondence limit, and label the unproved identifications. That is good physics practice. The danger is to let a successful calculation at one scale license ontology at another. A statevector simulation licenses only a statement about that simulation. A type isomorphism licenses only a statement about those types. A close cosmological fraction licenses only a comparison under that model. The discipline of this volume is to keep those permissions local.

## The Operator Dictionary

The operator dictionary implicit in the programme can be made explicit. At the electromagnetic scale, $L$ may be a Maxwell operator in a gauge-fixed representation, and the propagator transmits charge-current disturbances. At the elastic or seismic scale, $L$ is an elasticity operator with Lamé parameters and boundary geometry. At the neural electromagnetic scale, $L$ is neither fundamental QED nor a mere metaphor; it is an effective operator for macroscopic tissue fields, with conductivity, permittivity, synaptic currents, geometry, and dissipation. At the Hopfield scale, $L$ is closer to the Hessian or transition generator around an attractor. At the cosmological scale, $L$ is the linearised Einstein operator or a scalar/tensor perturbation operator on a chosen background `derived-under-assumptions`.

This dictionary shows why the same notation cannot carry the same meaning everywhere. A pole in a relativistic propagator may correspond to a particle excitation. A pole in a linear response function of a damped biological system may correspond to a resonance, instability, or persistent mode. A near-zero mode in a memory kernel may model slow decay without implying a new particle. When the Soma-Field paper writes that emotional percepts and particles are both poles in propagators, the safe statement is structural: both are singled out by response singularities or resonances in their respective operators. The unsafe statement would be ontological equality `interpretive`.

The same care applies to sources. In QFT, a source term may be an external current coupled to a field in the generating functional. In the Soma-Field model, $J(t)$ may stand for sensory input, interoceptive forcing, therapeutic perturbation, music, social contact, or regulatory effort. Unless those sources are measured and assigned units, they are placeholders. This is acceptable at the stage of effective modelling, but it means that parameter-fitting and identifiability matter. A model with enough unmeasured source channels can explain anything after the fact. A good physics programme must specify which perturbations are allowed before the response is observed `open-hypothesis`.

Boundary conditions are equally decisive. The same differential operator can yield different spectra on a line, a circle, a bounded domain, a curved manifold, or a dissipative medium. The programme's "limbic axis" language often treats $L_1$ as an interval with attractor-like endpoints. That can be a useful effective coordinate; it is not automatically a Hořava--Witten orbifold. If the interval boundary conditions are used to import intuition from branes or tunnelling, the boundary problem must be stated. Which variable lives on the interval? What is continuous at the boundary? What is reflected, absorbed, or transmitted? `derived-under-assumptions`.

The result is a simple audit table a physicist can apply to any proposed scale: identify $L_\sigma$, state the signature, state the domain, state the source class, state the boundary conditions, state the observable, and state the correspondence limit to an accepted theory. Claims that cannot fill this table may still be philosophical or heuristic, but they are not yet field physics. Claims that can fill it become vulnerable in the right way.

## Renormalisation, Coarse-Graining, and the Status of Scale Invariance

Scale invariance is one of the programme's most attractive and most dangerous words. In statistical physics, scale invariance near a critical point is not a general permission to map any large thing to any small thing. It is a precise statement about correlation functions, coarse-graining transformations, and fixed points. The zUSF paper gestures toward this by using a Zoom Operator and scale-indexed types. To become physical, the operator must do more than relabel scales; it must say how parameters flow `open-hypothesis`.

For the organism model, the relevant coarse-graining might run from cellular electrophysiology to neural populations, from neural populations to autonomic variables, and from those to affective state coordinates. Couplings in $W$ would then be renormalised summaries of many lower-level interactions. This is plausible, but it raises familiar questions. Which variables are relevant, irrelevant, or marginal? Does the threshold $T_c$ survive coarse-graining, or is it a normalisation convention? Are there universality classes of affective dynamics, or only individual fits? Without answers, "scale invariant" means only "reusing a form" `open-hypothesis`.

For cosmology, the issue is sharper. The model moves from Planck-scale compactification language to Hubble-scale vacuum amplitude. If a background field amplitude remains pinned across scales, one needs a reason why it does not run like an ordinary quantum fluctuation. P21 states such a reason in terms of a regulated attractor and boundary condition. A physicist will want the RG equation, fixed point, stability analysis, and correction terms. The stated $\mathcal{O}(\alpha')$ correction cannot remain an explanatory bucket for a 7.1 per cent discrepancy; it must become a calculation `derived-under-assumptions`.

For QUANT-EXP-1, finite-size scaling is the analogous demand. Eight qubits are transparent and exact. They are not enough to establish how barrier traversal behaves as the number of modes grows. Does the spectral gap close exponentially? Does the target occupancy persist? Do classical nonlocal methods erase the contrast? Does decoherence in hardware destroy the effect? A scale claim about quantum reachability needs a sequence of instances, not only one clean toy landscape `simulated`.

The programme can accommodate these demands. Indeed, its emphasis on response kernels almost invites a renormalisation treatment: the object that flows under coarse-graining is the effective propagator. But until those flows are computed, scale invariance remains an architectural hypothesis, not an established law.

## Ledger

| Claim | Label | Source |
|---|---|---|
| The affective Hopfield model is an effective coarse-grained dynamics. | `derived-under-assumptions` | Soma-Field paper |
| `consciousness_dichotomy` is arithmetic on $\sqrt2$. | `kernel-verified` | `UniversalSomaticField.lean` |
| Consciousness as calibrated threshold crossing is open. | `open-hypothesis` | USF/zUSF papers |
| QUANT-EXP-1 is an exact 8-qubit statevector simulation. | `simulated` | Quantum Soma paper |
| Penrose relevance is attractor-topology analogy, not Orch-OR confirmation. | `interpretive` | Quantum Soma paper; Penrose reference |
| $W_8=W_{G_2}+\delta W$ is algebraic; compact $G_2$ holonomy remains open. | `derived-under-assumptions` | G2 paper; `BRECVEMAVariational.lean` |

# Reading The Soma-Field

The first embedded paper should be read as the effective-field-theory entry point rather than as the final physics. Its central move is to replace discrete emotion labels with a persistent body--brain field whose thresholded excitations become conscious emotional reports. The useful physics object is the Hopfield energy landscape: attractor basins correspond to stable affective regimes, couplings encode co-activation and inhibition, and noise or forcing terms drive transitions `derived-under-assumptions`.

For physicists, the most productive reading is to ask what would make the model measurable. What are the components of $e(t)$? How is $W$ inferred? Which physiological variables couple to the field, and with what units? How does the model treat asymmetric couplings, non-equilibrium driving, memory, and hysteresis? The paper is strongest when it states these as formal modelling commitments and weakest when clinical language appears to carry more evidence than the mathematics supplies. Its clinical implications are hypotheses and testimony-sensitive interpretations, not efficacy claims `open-hypothesis`.

The paper also introduces a useful cross-language discipline. A claim can be written in QFT notation, categorical language, Lean sketches, and clinical prose. Agreement across notations is not proof, but disagreement exposes where the model is under-specified. Read the appendices in that spirit: the `sorry` markers and proof obligations are not embarrassments to hide; they are the map of the remaining physics.

{{AddPaper ../../paper/soma/soma-field-paper/soma-field-paper.md}}

{{AddPage}}

# Reading Quantum Topology and Trauma

The quantum paper should be read as a controlled simulation study. Its 8-qubit Ising/Hopfield instance has analytic ground truth, a deliberately difficult Fear--Awe barrier, and a transparent transverse-field annealing schedule. The reported contrast is not between human therapy and a quantum computer; it is between a tested low-noise classical dynamics and an exact statevector transverse-field evolution on the same model landscape `simulated`.

The paper's Penrose framing is provocative but should not distract from the narrower result. Penrose's large claim concerned classical computation and consciousness; this paper identifies a specific attractor-topology limitation in one model. It therefore gives physicists something cleaner than a metaphysical argument: a Hamiltonian, a Hilbert space of 256 states, a schedule, baseline dynamics, controls, and reproducible counts. The hardened version to remember is cold classical $0/200$ at B8/B10/B12 and quantum peak Awe occupancy near $0.41$ `simulated`.

The correct next physics questions are obvious. Does the result persist under alternative schedules, noise models, and larger landscapes? Can hardware reproduce the statevector behaviour? Is there a rigorous probabilistic theorem connecting barrier topology to escape rates in this class? Until then, the result is model-class reachability evidence and an invitation to formal analysis, not proof of a quantum mechanism in brains.

{{AddPaper ../../paper/soma/quantum-soma-penrose/quantum-soma-penrose.md}}

{{AddPage}}

# Reading The Universal Somatic Field

The USF paper is the architectural centre of this volume. It states the eleven-dimensional decomposition, the scale-invariant Green-function idea, the threshold model of consciousness, and the type-level relationship to M-theory bookkeeping. It is also where many readers will be tempted to accept too much too quickly. The right reading is layered: the formal type decomposition is one layer, the compactification analogy another, and the physical identification of a somatic field another still `derived-under-assumptions`.

The paper's most useful contribution for physics is its insistence that the response function is primary. A system is characterised by how it answers a perturbation; the SHO appears as a response mode rather than as a small object vibrating in an ontological void. This is a fruitful idea, especially where it is tied to explicit operators. But claims that the universe satisfies structural requirements for consciousness, or that a limbic threshold solves the hard problem, must be read as open hypotheses, with formal predicates separated from empirical calibration `open-hypothesis`.

Lean names should be read precisely. `somaField_iso_mtheory` checks a product isomorphism. `consciousness_dichotomy` checks an order split around $\sqrt2$. Imported OS results apply to a Gaussian free-field object. None of these makes the biological or cosmological interpretation automatic. The paper is best treated as a map of a research programme, not as a completed unification.

{{AddPaper ../../paper/soma/universal-somatic-field/universal-somatic-field.md}}

{{AddPage}}

# Reading The Zoomable Universal Somatic Field

The zoomable paper generalises the architecture across scales. It is the place to look for the programme's scale discipline: each scale $\sigma$ has a substrate, characteristic $k(\sigma)$, boundary conditions, and a version of the response equation. The best physicist's reading is not "the same equation proves all systems are one thing," but "the same response grammar is instantiated under different operators and constraints" `interpretive`.

Its treatment of existing theories is also valuable. McFadden's CEMI field appears as a neural-scale restriction [@mcfadden2002a]; Hopfield dynamics appears as a finite associative-memory limit; cosmology appears as a boundary-condition limit. These reductions must preserve the original theories where they are already successful. A claimed unification that fails its correspondence limits is not a unification.

The paper's proof-status table should be read with the current ledger in mind. It contains strong formal objects and explicit axioms, but project-wide "no sorry" rhetoric is no longer accurate. Its cosmological fractions, consciousness threshold, and $G_2$ language should be brought forward with the evidence labels used here: arithmetic or type facts where checked, model-derived comparisons where assumptions enter, and open hypotheses where physical calibration is absent.

{{AddPaper ../../paper/soma/zoomable-somatic-field/zoomable-somatic-field.md}}

{{AddPage}}

# Reading The Cosmological Constant as Vacuum Amplitude

This paper is the volume's most direct challenge to standard cosmological intuition. It proposes that the cosmological constant is not the naive zero-point-energy sum but a vacuum amplitude of the USF tensor trace. The current numerical result is specific: $\Lambda_{\mathrm{USF}}=(21/11)H_0^2/c^2\approx1.01\times10^{-52}\,\mathrm{m}^{-2}$ for $H_0=67.36$, compared with $\Lambda_{\mathrm{obs}}\approx1.09\times10^{-52}\,\mathrm{m}^{-2}$, ratio $0.93$ `derived-under-assumptions`.

Read the derivation as a model-derived comparison. It does not solve the cosmological constant problem in the sense of deriving the observed value from accepted quantum gravity. It changes the object being calculated. That may be a legitimate research move, but it transfers the burden to compactification geometry, vacuum-amplitude dynamics, GR coupling, and observational predictions.

The paper's most important clarification is that $\Lambda$ is constant. The fraction $7/11$ is used for a present-day density comparison under the model; it is not a claim that $\Omega_\Lambda(z)$ is constant. Any future development must therefore confront expansion history, perturbations, and dark-energy constraints with that distinction explicit.

{{AddPaper ../../paper/soma/cosmological-constant-derivation/cosmological-constant-derivation.md}}

{{AddPage}}

# Reading Dark Matter as the Spatial Vacuum

The dark-matter paper extends dimensional bookkeeping from the compact sector to the three non-compact spatial directions. Its headline value, $\Omega_{\mathrm{DM}}=3/11\approx0.2727$, lies close to the Planck 2018 TT,TE,EE+lowE+lensing dark-matter fraction $0.2645$ [@planck2018cosmology]. The paper then argues that the spatial block should cluster gravitationally, carry no electromagnetic charge, and behave as pressureless matter `derived-under-assumptions`.

The density fraction is the easy part. The physical behaviour is the hard part. Cold dark matter is constrained not only by an integrated energy budget but by lensing, CMB peaks, matter power spectra, halo formation, Bullet-Cluster-like systems, and direct limits on non-gravitational coupling. A spatial-vacuum model must reproduce these phenomena while making at least one distinctive prediction.

The paper is useful because it states the needed properties clearly: clustering, neutrality, and $w\simeq0$. Treat its Lean-backed arithmetic as arithmetic; treat its local-geometry neutrality and pressure claims as assumptions or derived consequences of assumptions. The research path is perturbative cosmology, not further numerological comparison.

{{AddPaper ../../paper/soma/dark-matter-spatial-vacuum/dark-matter-spatial-vacuum.md}}

{{AddPage}}

# Reading G₂ Symmetry Breaking

The G2 paper is narrower and, for that reason, cleaner. It asks how an 8D BRECVEMA emotional mechanism space can relate to a 7D compact-sector story. Its answer is algebraic: decompose $W_8$ into a symmetric ideal $(6/5)I_8$ and a traceless perturbation $\delta W$. The ratio $\|\delta W\|_F/\|W_8\|_F=0.484$ quantifies the symmetry breaking in the chosen coupling matrix `derived-under-assumptions`.

Physicists should appreciate both the usefulness and the limit. Traceless decomposition is a real matrix operation. It can be checked exactly for rational entries. It supplies a bridge between an 8-component biological interface and a 7-dimensional traceless sector. But it does not prove that the compact sector has $G_2$ holonomy, nor that therapeutic change is motion toward a $G_2$ attractor. Those are model interpretations `open-hypothesis`.

Read this paper as an algebraic compatibility result. It strengthens the programme by replacing a vague 8-to-7 handwave with a concrete decomposition. It also sharpens the remaining obligation: to derive or reject the geometric $G_2$ compactification, rather than borrowing its prestige from the notation.

{{AddPaper ../../paper/soma/g2-symmetry-breaking/g2-symmetry-breaking.md}}

{{AddPage}}

# Conclusion: What a Physics of Response Would Require

The physics volume makes one proposal in many dialects: start from response. A field is known by the way it answers perturbation. A Green function is the concentrated form of that answer. If there is to be a physics of felt organismic state, it must have an operator, a source, a state space, a kernel, a coupling to known matter, and observables. Without those, "field" is only an honorific. With them, the proposal can be tested by the ordinary cruelty of physics `interpretive`.

The programme's virtues are real. It writes equations where psychology often writes metaphors. It distinguishes sub-threshold state from reportable percept. It uses Hopfield energy landscapes rather than loose "stuckness" language. It gives QUANT-EXP-1 as code and numbers rather than as an anecdote. It moves cosmology claims into formulas with ratios that can be checked. It exposes proof obligations in Lean. It has enough structure to be criticised precisely `derived-under-assumptions`.

Its risks are equally real. Type isomorphism can be mistaken for physical derivation. Arithmetic fractions can be mistaken for cosmological explanation. A statevector simulation can be mistaken for hardware evidence. A Gaussian free-field OS theorem can be mistaken for an interacting theory of experience. A traceless matrix can be mistaken for a clinical conservation law. The programme's survival depends on refusing those mistakes, especially when the resulting prose is less dramatic `interpretive`.

The next physics tasks are concrete. First, define the somatic tensor as a field with units, transformation rules, action, stress tensor, and couplings. Second, separate the free Euclidean field, the interacting Hopfield-coupled field, and the dissipative organism-scale model. Third, compute compactification data rather than relying on type-level dimensional agreement. Fourth, extend P21/P22 from background fractions to perturbations and structure formation. Fifth, reproduce QUANT-EXP-1 on hardware only after the simulation theorem and scaling analysis are clear. Sixth, propose instruments that could couple to the predicted field or decisively show that no such coupling exists `open-hypothesis`.

The status of the hard problem should remain modest in this physics book. A field theory can model reportability, integration, thresholds, and attractors. It can suggest when an organism-scale system becomes globally ordered. It cannot, by formalism alone, establish that the inside of such an ordered mode is experience. That claim belongs partly to philosophy and partly to future measurement. The physics contribution is to make the structural side exact enough that philosophers, neuroscientists, and experimentalists are not arguing over a fog `open-hypothesis`.

If the programme fails, it may still leave useful tools: a labelled claim ledger, a correspondence-principle method for cross-domain theorem transfer, a warning about proof-versus-world slippage, and a set of simulations that make affective landscapes computationally explicit. If it succeeds, it will not be because the words "M-theory" or "$G_2$" were placed near "emotion." It will be because a response kernel, defined with the precision physicists demand, predicted something that existing models did not and survived an attempt to destroy it.

This is therefore not a book asking physicists for belief. It asks for calculation. Compute the moduli correction. Write the interacting OS problem or show why it fails. Derive the perturbation spectra. Build the null experiment. Tighten the Lean statements so theorem, axiom, and placeholder cannot be rhetorically exchanged. The equations are not the end of the matter; they are the beginning of accountability.

## A Minimal Falsification Programme

A compact way to test the volume is to ask for one falsifier at each layer. At the formal layer, a claimed theorem may fail to compile, depend on an axiom not advertised in prose, or prove only a trivial statement such as `True`. That is not a scientific falsifier of the world, but it is a falsifier of the book's proof rhetoric. The immediate formal programme is therefore mechanical: rebuild the Lean surface, list all axioms and `sorry`s, classify theorem content, and forbid any paper sentence from exceeding that classification `kernel-verified`.

At the effective organism layer, the falsifier is predictive failure under perturbation. If $W$ and $K(\tau)$ can be inferred from baseline data, the model should predict response to a controlled stimulus better than lower-dimensional alternatives. A music perturbation, interoceptive perturbation, breathing intervention, or startle-like input should shift state along a predicted direction in the inferred landscape. If the model fits retrospectively but cannot predict perturbative response, the field language has not earned its complexity `open-hypothesis`.

At the threshold layer, the falsifier is miscalibration. A threshold theory should predict hysteresis, critical slowing, discontinuity, or at least a measurable change in integration near $T_c$. If reportability, physiological integration, and neural synchrony vary smoothly without any useful threshold or if different putative thresholds have to be chosen for every task, the sharp phase-transition language should be retired in favour of a graded model. The Lean dichotomy would remain true as arithmetic, but the biological interpretation would fail `open-hypothesis`.

At the quantum-simulation layer, the falsifier is algorithmic and scaling robustness. If straightforward classical methods cross the same barriers with comparable cost once allowed the same nonlocal information, QUANT-EXP-1 becomes a statement about one baseline rather than a topological gap. If the quantum peak collapses under larger instances, altered schedules, or hardware noise, the simulation remains a useful toy but loses its broader force. Conversely, if finite-size scaling and hardware reproduce the separation, the result becomes more interesting without becoming clinical evidence `simulated`.

At the compactification layer, the falsifier is geometric specificity. A real compactification programme should compute the moduli correction invoked in P21, derive the low-energy field content, and show why the somatic tensor is not merely an arbitrary label. If no geometry can yield the required correction, coupling, or sector behaviour, the physical M-theory reading fails even if the type isomorphism remains intact. The book should then fall back to a scale-indexed effective-field architecture, not pretend the compactification survived `open-hypothesis`.

At the cosmological layer, the falsifier is observational degeneracy or contradiction. The dark-energy sector must remain consistent with $w=-1$ and precision expansion data. The spatial-vacuum dark-matter sector must match structure formation, lensing, CMB anisotropies, and halo phenomenology. If it is indistinguishable from CDM in all observables, it may be a reinterpretation rather than a new theory. If it differs, the differences must match data. A close background fraction is not enough `derived-under-assumptions`.

At the $G_2$ layer, the falsifier is overextension from algebra to geometry. The traceless decomposition can be right while the holonomy story is wrong. If no compact $G_2$ metric or representation-theoretic derivation links the biological $\delta W$ sector to $X_7$, the result should be presented as a useful algebraic compression of BRECVEMA couplings. That would still be valuable, but it would no longer support compactification rhetoric `derived-under-assumptions`.

This layered falsification programme has a virtue: it lets partial success matter. A failed cosmology would not erase the organism-scale field model. A failed threshold interpretation would not erase the Hopfield landscape. A failed physical compactification would not erase the type-isomorphism exercise. The price of such resilience is honesty about labels. Only a programme that knows where it can fail can know what it has established.

## What Would Make the Volume Worth Returning To

The decisive future document would not be another manifesto. It would be a table of operators. For each scale it would list $L_\sigma$, domain, signature, source, boundary condition, response kernel, observable, proof status, and falsifier. Beside it would be a dependency graph: which cosmological claims require compactification, which organism claims require only effective dynamics, which formal claims require axioms, and which simulations require particular baselines. Such a document would make [T]-Theory easier to attack, and therefore more credible `interpretive`.

The second decisive document would be a null-results ledger. If an instrument fails to detect a predicted coupling, write it down. If a classical algorithm crosses the QUANT barrier, write it down. If an updated cosmological parameter worsens the ratio, write it down. If a Lean theorem proves less than the prose implied, write it down. A theory of response should itself respond to failed perturbations. Otherwise the field language becomes immunising rather than scientific `open-hypothesis`.

The third decisive document would be a measured perturbation experiment at organism scale. It need not mention M-theory. It could simply infer a low-dimensional affective landscape, perturb it, and test whether the Green-kernel/Hopfield model predicts the resulting trajectory. If that experiment worked, the physics of the book would have a foothold independent of the speculative high-energy and cosmological extensions. If it failed cleanly, the programme would learn where its first effective variable choice went wrong `open-hypothesis`.

## Ledger

| Claim | Label | Source |
|---|---|---|
| A physics of felt state needs operators, couplings, sources, and observables. | `interpretive` | Physics-volume argument |
| The programme currently has useful formal scaffolding and simulations. | `derived-under-assumptions` | Embedded papers |
| Type/product facts do not establish physical compactification. | `interpretive` | `MTheoryIsomorphism.lean` and M-theory caveats |
| Cosmological fractions require perturbation-level development. | `open-hypothesis` | P21/P22 |
| QUANT-EXP-1 should be scaled and hardware-tested only with simulation boundaries intact. | `simulated` | Quantum Soma paper |
| Experience-as-intrinsic-field remains outside what physics formalism alone establishes. | `open-hypothesis` | Philosophy boundary |

# Evidence Ledger

| Claim | Label | Source |
|---|---|---|
| The master equation used throughout the volume is a Green-function response form, not a single identical physical medium. | `interpretive` | USF and zUSF papers |
| The affective finite model uses Hopfield energy $H(e)=-\tfrac12 e^\top W e-b^\top e$. | `derived-under-assumptions` | Soma-Field paper |
| `somaField_iso_mtheory` proves a Lean product/type round-trip. | `kernel-verified` | `MTheoryIsomorphism.lean` |
| The product/type isomorphism is not a physical M-theory compactification. | `interpretive` | `MTheoryIsomorphism.lean` and M-theory caveats |
| The product sector is formal; compact $G_2$ holonomy is an open physical hypothesis. | `open-hypothesis` | MTheory and G2 papers |
| OS results are imported OSforGFF theorem applications to the Gaussian free field. | `kernel-verified` | `USF_OSAxioms.lean` |
| Identifying that Gaussian free field with the physical USF is an interpretive model step. | `interpretive` | OS proof boundary |
| `consciousness_dichotomy` proves an order split around $\sqrt2$. | `kernel-verified` | `UniversalSomaticField.lean` |
| Consciousness as a calibrated limbic phase transition remains unmeasured. | `open-hypothesis` | USF/zUSF papers |
| QUANT-EXP-1 is an exact 8-qubit statevector simulation. | `simulated` | Quantum Soma paper |
| QUANT-EXP-1 does not provide hardware evidence, therapy evidence, or runtime advantage. | `simulated` | Quantum Soma limitations |
| P21 identifies $\Lambda$ with a vacuum amplitude, not a naive ZPE sum. | `derived-under-assumptions` | Cosmological-constant paper |
| With $H_0=67.36$, P21 gives $\Lambda_{\mathrm{USF}}\approx1.01\times10^{-52}\,\mathrm{m}^{-2}$ versus $\Lambda_{\mathrm{obs}}\approx1.09\times10^{-52}\,\mathrm{m}^{-2}$. | `derived-under-assumptions` | Cosmological-constant paper |
| $\Lambda$ is constant in the model; $\Omega_\Lambda(z)$ is a changing density ratio. | `derived-under-assumptions` | P21 model reading |
| $\Omega_{\mathrm{DM}}=3/11$ is an arithmetic sector-counting result. | `kernel-verified` | `CosmologicalConstant.lean` |
| Dark-matter clustering, neutrality, and pressurelessness depend on local-geometry and KK assumptions. | `derived-under-assumptions` | Dark Matter paper |
| $W_8=(6/5)I_8+\delta W$ with traceless $\delta W$ is an algebraic decomposition. | `derived-under-assumptions` | G2 paper; `BRECVEMAVariational.lean` |
| The 48.4 per cent symmetry-breaking number is model-specific to the chosen BRECVEMA matrix. | `derived-under-assumptions` | G2 paper |
| Five real `sorry`s remain project-wide. | `interpretive` | Lean proof-file audit |
| `FieldAxioms.lean` is an axiom registry, not a theorem file about the world. | `derived-under-assumptions` | `FieldAxioms.lean` |
| Direct detection of a somatic tensor remains an undeveloped experimental problem. | `open-hypothesis` | Conclusion and paper limitations |
| Perturbative cosmology for P21/P22 remains to be done. | `open-hypothesis` | P21/P22 falsification sections |

# [T]-Theory Cheatsheet

The cheatsheet gives the compact version of the field vocabulary used in this book: propagators, scale levels, evidence labels, and the distinction between formal theorem, model assumption, simulation, and empirical result. Read it as a map of claims, not as a substitute for the boundary conditions and caveats in the chapters above.

{{AddBooklet ../bld/booklet-physics.pdf recto}}
