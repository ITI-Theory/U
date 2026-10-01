---
title: "[T]-Theory: Computing"
subtitle: "Verified Emotional Computing"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  This volume reads the Universal Somatic Field as a software architecture for affective state, multi-agent coordination, and machine-checkable scientific claims. It is written for computer scientists, machine-learning researchers, and software engineers who want to know what the programme offers once the metaphysical language is translated into interfaces, kernels, state spaces, costs, and proof obligations. The central object is the affective-state propagator: a Green-function update that maps a distributed state and a source term into a next response state. The book connects that kernel to classical Hopfield networks, modern Hopfield attention, Field-Modulated Hopfield Networks, Lean 4 formalisation, the swarm propagator, and the Soma Field Operator app. Its claim is deliberately bounded: Lean checks formal consequences of definitions and axioms; simulations test models; software can make evidence boundaries visible. The Universal Somatic Field is therefore treated here as an architecture to be implemented, profiled, audited, and falsified, not as a slogan.
---

# The Green Propagator

**G-ID:** *Affective State Propagator — computational kernel for agent field dynamics* `derived-under-assumptions`. In this volume the Green propagator is a software interface: given a state vector $x(t)$, a coupling kernel $G$, and a source term $J(t)$, compute a response $x(t+1)=Gx(t)+J(t)$ or its continuous-time analogue. The mathematical language comes from field theory, but the engineering question is familiar. What is the state representation? Which kernel is authoritative? What is precomputed? What is measured at runtime? Which claims are checked by a proof kernel, which are numerical, and which are architectural interpretations?

The scale note for this book is mostly $\sigma=5$ through $\sigma=10$: proof kernels, local software agents, organism-scale affect models, dyads, and multi-agent swarms. When the book mentions higher or lower scales it does so as a typed re-use of a kernel form, not as a claim that cities, drones, or cosmic structures literally have human emotions. The computing task is to preserve the useful invariant--a response grammar under explicit boundary conditions--while retyping the substrate and observables.

# Introduction: Verified Emotional Computing

Computer science already knows how to turn informal behaviour into a formal interface. The history of the field is partly the history of replacing vague competence with a specification: a grammar for valid strings, a type for valid inputs, a protocol for allowed message orderings, a loss function for trainable behaviour, a proof obligation for safety-critical code. The Universal Somatic Field enters that tradition by asking whether affective dynamics can be written as a state-space architecture rather than left as natural-language psychology `open-hypothesis`.

That question matters for machine learning because affect has become operational without becoming formal. Reinforcement learning systems optimise reward signals. Recommenders infer preference. Large language models produce emotionally legible text. Multi-agent systems negotiate, coordinate, defer, compete, and imitate. Yet the computational object called value or motivation is often a scalar, a token pattern, or a reward model whose semantics are external to the code. The [T]-Theory proposal is not that all of these systems secretly feel. It is that the missing level in many architectures is a typed account of field state: persistent activation, coupling, thresholds, attractors, barriers, memory kernels, and propagators `interpretive`.

The title phrase, "Verified Emotional Computing", is therefore not a claim that emotion itself has been verified. It names a design ambition: put the formal parts of an affective-field model into a machine-checkable surface; label what remains assumed; test the dynamics numerically; and expose the result in software. In this book, Lean 4 is not treated as an oracle. It is treated as a small trusted kernel that checks whether theorems follow from the definitions and axioms actually present in source files `kernel-verified`.

The distinction is essential. A Lean theorem about a real-valued threshold proves a logical split in the formal model; it does not prove that phenomenal consciousness is a threshold crossing in a biological organism. A theorem comparing $N^2$ and $N\cdot K$ proves an arithmetic cost relation under specified parameters; it does not prove a universal lower bound for every possible coordination algorithm. A compiled app can display a claim badge; it does not make the claim true. The computing contribution is the discipline of separations: formal statement, model assumption, simulation, empirical measurement, and interpretation.

For computer scientists, the first useful reading of the Universal Somatic Field is as a layered architecture. At the bottom is a state representation: a vector or field of modes, sometimes eight or sixteen dimensional in the human-affect papers, sometimes $N$-agent state in the swarm paper. Above it is an energy landscape: Hopfield-style minima, barriers, and transition costs. Above that is a propagator layer: a Green function, attention-like matrix, or communication kernel that distributes perturbations. Above that is an evidence layer: theorem names, proof status, simulations, citations, and claim labels. Finally there is a presentation layer: the Soma Field Operator, which allows a reader to navigate scale, projection, and evidence without confusing one with the other.

This software reading also clarifies what the programme is not. It is not a finished AI-alignment solution. It is not a clinical device. It is not a production theorem prover for all of biology. It is not a full implementation of Sherlock, the proposed adversarial auditor. It is a repository of formal files, simulations, papers, and visual tooling whose strongest engineering promise is compositional: state spaces, kernels, proof ledgers, and UI claims can be made to agree or fail loudly `derived-under-assumptions`.

The Hopfield lineage is the best entry point. Hopfield networks made content-addressable memory computational by writing neural recall as energy minimisation in a recurrent network with symmetric couplings under the classical convergence assumptions [@hopfield1982]. Modern Hopfield networks, including Ramsauer et al.'s formulation, show that transformer-style softmax attention is an update rule of a continuous modern Hopfield network under the stated energy and normalisation choices [@ramsauer2020hopfield]. The programme's Field-Modulated Hopfield Network extends the lineage by adding a limbic field variable that modulates temperature and weights. Whether that is biologically adequate remains open; as software, it is a precise pattern: make affective modulation an explicit argument of the update rule rather than an untyped story about context.

The swarm propagator gives the most immediately architectural claim. Classical message passing over $K$ rounds has a cost written as $O(NK)$ in the paper's simplified accounting. A dense single-step propagator has cost $O(N^2)$ after the Green matrix is distributed. Lean checks the arithmetic theorem that the propagator cost is lower when $K>N$, and also checks the break-even and single-round cases in `SwarmPropagator.lean` `kernel-verified`. The strong engineering reading is conditional, not universal: if the field is linear, if the agents are the only relevant sources, if $G$ is available locally, if the task is well-modelled by the propagator, and if the classical baseline genuinely requires more than $N$ rounds, the one-step scheme can beat iterative message passing.

That conditional result is useful precisely because it is not inflated. Multi-agent AI often hides costs in synchronisation, broadcast, shared memory, learned attention, or centralised aggregation. The swarm theorem says: state your accounting. Count setup, storage, matrix-vector cost, communication after distribution, and reconfiguration. If your architecture claims exact single-cycle coordination, ask where the $N^2$ interaction structure lives. It may be in a dense matrix, a central controller, a learned attention map, an all-reduce primitive, or a physical field. The programme's propagator is one way of making that hidden structure explicit.

The Lean layer is the second concrete deliverable. The proof surface includes files such as `SwarmPropagator.lean`, `LimbicHopfield.lean`, `QuantumSim.lean`, `UniversalSomaticField.lean`, `EmotionOntology.lean`, and `FieldProofs.lean`. The important reading for a software engineer is not "the corpus is proved". It is that each theorem has a dependency shape. Some proofs are by definition or `rfl`; some are arithmetic; some use imported libraries; some depend on explicit axioms; seven real `sorry`s remain across the proof surface. That dependency shape is what a serious verification culture should expose.

The Soma Field Operator shows the same discipline in UI form. Its README freezes new theory data out of the browser bundle: publication metadata belongs in `Dist/PAPERS.yaml`; routes, transitions, and claim boundaries belong in `operator-theory.yaml`; scientific prose and proof status belong in papers and Lean files. JavaScript may render scenes, controls, and reusable registries, but it should not become a second, divergent source of truth. That is ordinary data architecture, and it is one of the most credible design constraints in the current software stack `derived-under-assumptions`.

This book proceeds accordingly. It first treats the USF as software architecture. It then reads classical and modern Hopfield networks as the computational substrate for the FM-HN. It states the swarm complexity claims with their assumptions. It explains what Lean checks and what it cannot check. It describes the Operator app as an evidence-aware interface. It then introduces the embedded papers as modules in a research stack. Sherlock is discussed only briefly here: the fuller philosophical treatment belongs in the philosophy volume, because Sherlock is as much an epistemology of audit as a piece of software.

## Ledger

| Claim | Label | Source |
|---|---|---|
| The volume treats USF as a software architecture, not as completed ontology. | `interpretive` | This introduction |
| Lean checks formal consequences of definitions and axioms. | `kernel-verified` | Lean theorem files and toolchain |
| Biological or phenomenal readings of formal thresholds remain open. | `open-hypothesis` | `UniversalSomaticField.lean`; empirical validation still required |
| The swarm complexity comparison is conditional on $K>N$ and available $G$. | `kernel-verified` / `derived-under-assumptions` | `SwarmPropagator.lean` |
| The Operator app separates source authority from browser rendering. | `derived-under-assumptions` | Soma Field Operator README |

# USF as Software Architecture

A useful software architecture starts by assigning responsibilities. In the computing reading of the Universal Somatic Field, the first responsibility is the state model. A state is not merely a label such as fear, calm, or awe. It is a vector or field whose components can be active below report, can interfere, can be coupled, and can persist. In the human-affect papers this appears as $e(t)$, often with somatic and cognitive channels. In the swarm paper it appears as an $N$-agent state. In the Operator app it appears as three normalised runtime controls--`somatic`, `limbic`, and `cognitive`--used to drive the visual scene. These are different implementations of the same architectural slot `derived-under-assumptions`.

The second responsibility is the energy model. The Hopfield form $H(e)=-\tfrac12 e^\top W e-b^\top e$ turns state into landscape. The matrix $W$ is not just a parameter table; it is the coupling contract. Positive and negative entries define co-activation, inhibition, and barriers. Local minima define attractors. Transitions become operations on a landscape rather than arbitrary jumps between labels. For ML researchers this is familiar: the model's behaviour is constrained not by a symbolic taxonomy but by the geometry induced by an objective or energy function `derived-under-assumptions`.

The third responsibility is the update kernel. A standard Hopfield update, a modern Hopfield softmax attention update, a Langevin step, and a Green-function matrix-vector multiply are different answers to the same question: how does the current state become the next state? The programme's distinctive software move is to make propagators first-class. Rather than treating communication, perception, or affective forcing as side effects, it writes them as kernels that can be inspected, cached, composed, and tested.

The fourth responsibility is the source term. In field notation, $J(t)$ is where the world enters the system. In a clinical or musical model it might be a sound, memory, bodily perturbation, or volitional input. In a swarm model it might be a lead drone or external threat. In an ML architecture it might be an observation, prompt, reward event, peer message, or environment update. The source term is the architectural protection against closed-world fantasies. It reminds the implementer that the system is not merely relaxing internally; it is being driven.

The fifth responsibility is the evidence ledger. A modern ML stack already distinguishes training data, validation set, test set, benchmarks, ablations, model card, and deployment monitor. The [T]-Theory stack asks for an analogous distinction in mathematical prose: theorem, axiom, simulation, empirical result, interpretation, open hypothesis. That distinction is particularly important because the papers intentionally move across mathematics, physics, neuroscience, computation, and philosophy. Without labels, a type isomorphism can be misread as a physical derivation, or a simulation can be misread as a hardware result.

From a software-engineering standpoint, the architecture can be written as five interfaces. `StateSpace` owns dimensions, units, bounds, and observables. `EnergyLandscape` owns $H$, $W$, barriers, and attractor definitions. `Propagator` owns $G$, boundary conditions, storage, update cost, and validity regime. `EvidenceRecord` owns theorem names, files, labels, and failure modes. `Renderer` owns user-visible presentation. The repository is not yet organised exactly in those interfaces, but much of its content already falls into them `interpretive`.

This decomposition helps separate two claims that are often conflated. The strong metaphysical claim says that the same field is physically realised across scales. That is not established by software architecture. The weaker but practically valuable claim says that a common interface can represent response systems across scales while forcing each instantiation to retype substrate, units, and evidence. The Operator's theory contract explicitly follows the weaker route: cross-scale visual mappings are labelled interpretive; clinical vocabulary is not projected onto non-human scales without retyping; missing renderers appear as coverage gaps rather than hidden success.

The state-space layer also clarifies what "affective computing" could mean in this programme. It need not mean that software has emotions. It can mean that software manipulates structured affective-state models, exposes thresholds and attractors, and reasons about compatibility between landscapes. An AI assistant, for example, might carry a model of user arousal or uncertainty as an evidence-labelled field state, without claiming that either the user model or the assistant has first-person feeling. The ethical and empirical burden would then move to calibration, consent, privacy, and validation, not to poetic assertion.

The architectural reading is also robust to partial failure. If the proposed physics of the USF fails, the software pattern may still be useful: typed state, energy landscape, propagator update, and evidence record. If the clinical interpretation fails, the swarm cost comparison may remain a valid arithmetic fact. If the swarm protocol turns out not to outperform learned communication in realistic benchmarks, the Operator's data-governance discipline may still be worth preserving. Good architecture is modular enough that local falsification does not destroy every component `interpretive`.

For ML researchers, the most interesting design pressure is compositionality. Modern models are built from differentiable modules whose internal representations are often opaque. The USF architecture asks whether affective and coordination modules can be made explicit enough to verify some invariants. For example: a limbic modulator must reduce to a base Hopfield update when the field amplitude is zero; a claim badge must not display `FORMAL` unless a named proof source is linked; a single-step propagator must expose whether its $G$ was precomputed, learned, or analytically specified.

This is not a call to replace neural networks with hand-built symbolic dynamics. It is a call to put the implicit geometry of the system under version control. A transformer already contains attention matrices; a multi-agent system already contains coupling; a recommender already contains value gradients; a robotic swarm already contains coordination kernels. The field-theoretic vocabulary is useful if it lets us name, audit, and test those objects more carefully.

The most concrete current software artefact is the Soma Field Operator. It imports educational data from JavaScript modules such as `theory-atlas.js` and `cheat-sheet-registry.js`, presents scale entries, claim badges, routes, morphisms, and scene coverage, and drives a Three.js scene. The README states that these hard-coded tables are migration debt rather than a pattern for new work. The intended next phase is a generator that validates authority files and emits one app-data module. That is exactly the kind of boring architectural sentence that makes the work credible: the repository knows that renderer convenience must not own scientific truth.

The Operator's runtime contract is deliberately small. It exposes normalised `somatic`, `limbic`, and `cognitive` fields in $[0,1]$. These drive visual mappings: D1--4 body/substrate layers, D5--7 nervous or propagator pathways, D8 limbic coupling, and D9--11 mind/cortex fields. At the application layer, these are not measurements. They are controls and render-state variables. The README is explicit that the app is a presentation and exploration layer, not a diagnostic display. A good computing volume should preserve that humility.

There is a lesson here for AI interfaces. If a system displays a model of user affect, the UI must say whether the model is measured, inferred, simulated, or interpretive. A confidence score alone is not enough. The Operator's badge vocabulary--FORMAL, SOURCED, INTERPRETIVE--is coarser than the six evidence labels used in this book, but it points in the right direction. Future systems that model human state should carry evidence provenance as visibly as they carry model output.

A second lesson is about scale. The Operator treats zoom as a typed morphism rather than a camera trick. Moving from cellular, neural, organism, dyadic, swarm, institutional, geological, and cosmic scenes is supposed to change substrate, observable, equation ledger, renderer, and claim status. The software problem is the same one that appears in scientific prose: if only the label changes, the mapping is decorative. If variables are retyped and evidence changes with them, the interface teaches the reader what is preserved and what is not.

A third lesson is about coverage. `scene-coverage.js` lists dedicated and generic scenes. This sounds like an implementation detail, but it is methodologically important. A speculative visual system can easily imply that everything has been implemented simply because the control surface has twenty positions. Coverage data prevents that. It says which scales have dedicated renderers, which use generic morphology, and which named solutions are planned. In scientific software, absence should be represented explicitly.

These lessons point towards a more general pattern for AI systems that expose scientific or human-state models. Keep source authority outside the renderer. Generate app data from validated registries. Attach claim badges to user-visible statements. Separate controls from measurements. Mark generic fallbacks as generic. Retype variables across domain shifts. Link every formal claim to a theorem or mark it otherwise. This pattern is independent of whether the USF eventually succeeds as physics.

## Ledger

| Claim | Label | Source |
|---|---|---|
| USF can be read as state, energy, propagator, source, evidence, and renderer layers. | `interpretive` | This chapter |
| Hopfield energy supplies the finite attractor-landscape pattern. | `derived-under-assumptions` | Soma-Field paper; `Hopfield.lean` |
| Runtime Operator controls are visual state, not clinical measurements. | `derived-under-assumptions` | Operator README and runtime contract |
| Claim badges are interface discipline, not proof. | `interpretive` | Operator theory contract |
| Cross-scale reuse requires retyping substrate and observables. | `derived-under-assumptions` | `operator-theory.yaml` |

# Hopfield Memory, Modern Hopfield Attention, and FM-HN

Hopfield networks matter in this volume because they make memory geometric. A stored pattern is not merely a row in a database. It is a basin of attraction. Recall is not a lookup by key but a dynamical relaxation towards a minimum. This is why the original Hopfield model has remained conceptually powerful for four decades: it gives computation a landscape [@hopfield1982]. The Soma Field Theory inherits that grammar and uses it to describe affective stability, transition, and stuckness `derived-under-assumptions`.

The standard Hopfield energy can be stated compactly: $H(e)=-\tfrac12 e^\top W e-b^\top e$. If $W$ is symmetric under the classical assumptions, asynchronous updates decrease or preserve energy until the system reaches a stable state. The programme's use of this fact is not a proof that emotion is a Hopfield network. It is a co-identification: under a finite state projection, emotional modes, coupling, attractors, and barriers can be represented by the same mathematical type signature as a Hopfield energy landscape. That representation imports useful questions: What are the minima? What is the barrier height? What noise level changes transition probability? What happens if $W$ is asymmetric?

Modern Hopfield networks re-enter the story through attention. Ramsauer and colleagues showed that transformer-style attention is equivalent to a modern continuous Hopfield update under their construction, and that the resulting networks can have very large capacity for suitably separated patterns [@ramsauer2020hopfield]. For ML researchers, this is the bridge from classical associative memory to transformer-era practice. The attention matrix is not called a Green function in mainstream ML, and it is not identical to one; it plays a related architectural role by defining how activation at one token or pattern influences another. The programme's comparison between modern Hopfield softmax and field propagators is therefore a structural analogy first, not an identity `interpretive`.

The experimental validation paper places four models side by side: Hopfield 1982 with sign activation, Krotov and Hopfield's dense-associative/polynomial variant [@krotov2016dense], Hopfield 2020 with softmax attention, and the Field-Modulated Hopfield Network. The benchmark task is a stylised basin-crossing from startle or fear toward musical awe. The reported qualitative result is that the classical models settle into the wrong attractor while the FM-HN reaches the target through a WKB-like gate `simulated`. The exact task is small and stylised; the important computing point is the model comparison protocol, not a general performance claim.

The Field-Modulated Hopfield Network adds an explicit limbic state. In `LimbicHopfield.lean`, the variable `ls.φ` enters a temperature function `modulatedTemp T₀ σ ls := T₀ + σ * ls.φ` and a weight modulation `modulatedW W₀ J γ ls := W₀ + (γ * ls.φ) • J`. The theorem `correspondence_principle` states that at zero somatic stress, both temperature and weights reduce to baseline. This is a clean software invariant: the extended model contains the classical model as a special case when the modulating field is zero `kernel-verified`.

That invariant is more important than the prose around it. It means an implementer can test the extension by regression. Set $\phi=0$ and the FM-HN should behave like the baseline. Increase $\phi$ under positive $\sigma$ and `stress_raises_temp` states that the formal temperature rises. Whether that captures biology is open; whether the encoded arithmetic follows is checked. This is exactly the distinction formal methods are good at preserving.

FM-HN also reframes some ML design patterns. Temperature is not merely a sampling trick; it becomes an affective control surface. Weight modulation is not merely fine-tuning; it becomes context-sensitive coupling. A WKB gate is not merely an optimisation hack; it is a proposed mechanism for crossing barriers that ordinary gradient relaxation does not cross. Each of these claims has a different evidence status. The temperature and zero-stress reductions are formal under definitions. The basin-crossing demonstrations are simulated. The biological and clinical readings are open hypotheses.

Modern ML already uses temperature, attention, gating, and residual pathways. The programme's contribution is to insist that these objects can be read geometrically and typed by evidence. For example, a large language model's attention weights are not emotional coupling weights. But both are matrices that distribute influence. A recommender's user embedding is not a somatic field. But both are state vectors whose trajectories matter. The safe architectural transfer is not ontology; it is interface discipline: define the state, define the update, define the coupling, state the assumptions, and test the consequences.

This view also makes overclaim detection easier. If a paper says "the FM-HN proves attention has a body", the software architect should ask for the theorem, definitions, and instantiation. If the theorem says only that zero limbic amplitude recovers baseline weights, the wider biological claim remains an interpretation. If a benchmark says a WKB gate reaches a target in a toy landscape, the software architect should not read it as a theorem about therapy or consciousness. The model may still be useful; it is just useful at the level actually shown.

The relationship between Hopfield energy and alignment is suggestive but unsettled. In many alignment framings, the hard part is specifying what objective the system should optimise. In a landscape framing, the question becomes: which attractors are safe, which transitions are allowed, and which barriers should be high or low? That is a productive vocabulary for AI safety, especially in multi-agent or human-interaction systems. But the programme does not yet give a validated procedure for deriving a human-compatible landscape. That remains an engineering and empirical research programme `open-hypothesis`.

A practical FM-HN implementation for ML research would therefore begin modestly. Choose a low-dimensional state representation whose components are operationally defined. Implement baseline Hopfield or modern Hopfield retrieval. Add a field modulator with explicit controls. Verify correspondence tests. Run ablations over temperature, coupling, and gates. Report whether the extension improves robustness, controllability, interpretability, or human-rated interaction quality. Only after such work should stronger claims about affective architecture be entertained.

One reason to keep the Hopfield lineage central is that it gives falsifiers. If the model is an attractor model, one can ask whether dwell times, transition probabilities, and hysteresis appear in data. If the model is a temperature-modulated model, one can ask whether a single control parameter explains both exploration and settling. If the model claims classical networks fail where FM-HN succeeds, one can test against stronger baselines. A field theory that cannot be benchmarked is only metaphor. The computing volume should keep dragging the field language back to benchmarks.

There is also a capacity question. Modern Hopfield networks earned attention partly because they recast storage and retrieval at the scale of contemporary representation learning. The Soma Field programme has not yet shown an equivalent capacity theorem for affective state. That absence should be stated openly. The current value is not a new capacity result; it is a modelling architecture that can connect classical associative memory, attention-like softmax retrieval, and explicit affect modulation. Capacity, generalisation, and scalability must be measured or proved separately.

The same caution applies to differentiability. Many useful ML components survive because they are differentiable end to end. Some USF-inspired modules would be differentiable, such as softmax retrieval, linear propagators, and smooth temperature modulation. Others, such as symbolic evidence records or theorem checks, sit outside gradient descent. That is not a problem. It means an implementation should separate trainable dynamics from verified constraints and evidence metadata. A system can learn a kernel while separately checking that the learned kernel is used only under declared conditions.

FM-HN should therefore be understood as a hybrid pattern. It is continuous enough to speak to modern ML, discrete enough to expose modes and thresholds, and formal enough to carry Lean invariants. That hybridity is the point. The field language is not a substitute for ordinary model selection. It is a way to insist that affective state, contextual modulation, and transition barriers are architectural objects rather than after-the-fact explanations.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Hopfield networks make memory and affective stability representable as landscapes. | `derived-under-assumptions` | Soma-Field paper; Hopfield lineage |
| Modern Hopfield attention is structurally relevant to propagator thinking. | `interpretive` | Ramsauer comparison |
| FM-HN reduces to baseline Hopfield dynamics at zero limbic field in the encoded model. | `kernel-verified` | `LimbicHopfield.correspondence_principle` |
| The four-model basin-crossing benchmark is a simulation, not a general ML result. | `simulated` | Experimental-validation paper; `Benchmark.lean` |
| Alignment as landscape compatibility is a research framing, not a solved method. | `open-hypothesis` | This chapter |

# Swarm Propagators and Complexity Claims

The swarm propagator is the computing volume's sharpest algorithmic object. The paper defines a swarm state $s\in\mathbb R^N$ and a propagator matrix $G\in\mathbb R^{N\times N}$. A single update computes $s'=G\cdot s$. This is deliberately close to linear algebra every ML researcher already uses. The novelty is the interpretation: $G$ is treated as a Green-function kernel encoding the response geometry of the collective field `derived-under-assumptions`.

The cost accounting is simple but easy to overstate. Classical message passing is written as $O(N\cdot K)$: $N$ agents for $K$ rounds. The dense propagator update is $O(N^2)$: one matrix-vector multiply. `SwarmPropagator.lean` defines `classicalCost N K := N * K` and `propagatorCost N := N * N`. The theorem `propagator_beats_classical` proves that `propagatorCost N < classicalCost N K` when $0<N$ and $N<K$. That is an arithmetic theorem, not a universal distributed-computing lower bound `kernel-verified`.

The break-even theorem is equally important. `breakeven_at_N` says the costs are equal at $K=N$. `classical_wins_single_round` says classical cost for $K=1$ is lower than the dense propagator cost when $1<N$. These two theorems prevent a misleading reading. The propagator wins only when the comparison baseline needs enough rounds. The paper's engineering value is therefore not "field methods always beat message passing". It is "if convergence is slow enough, precomputed dense response can be cheaper than repeated local rounds" `kernel-verified`.

A precise architectural statement must include setup. Distributing or learning $G$ costs something. Storing $G$ costs $O(N^2)$ memory if it is dense. Updating $G$ under changing geometry costs something. If the physical topology changes faster than $G$ can be recomputed, the single-step advantage may disappear. If $G$ is sparse, low-rank, structured, or learned, the cost profile changes again. The current theorem abstracts these questions away. That is acceptable for a first formal comparison, but production systems cannot ignore them.

The jam-resistance theorem is similarly bounded. `jam_resistant` is proved by `rfl`: `propagatorStep G s = G.mulVec s`. The interpretation is that after $G$ is already local, no further communication round is needed for that update, so a jammer affecting later message rounds has no target. This is a valid statement about the encoded update. It is not a claim that the system is immune to sensor spoofing, stale $G$, corrupted initial distribution, actuator faults, or adversarial state injection `derived-under-assumptions`.

The global optimality claim is weaker in the current proof surface. The file states `greens_achieves_minimum_energy` as an axiom requiring PDE theory such as Sobolev spaces and Lax-Milgram machinery. That is a valuable proof obligation, not a completed theorem. A careful book should say exactly this: the arithmetic complexity comparison is checked; global field-energy optimality is assumed pending analytic formalisation `derived-under-assumptions`.

For multi-agent AI, the useful lesson is not that every swarm should use a dense Green matrix. It is that coordination architecture should be honest about where global structure is represented. A transformer uses an attention matrix. A graph neural network uses adjacency and message-passing layers. A distributed optimisation system uses synchronisation primitives. A market-making system uses shared price signals. A drone formation may use local neighbour rules, central planning, or broadcast fields. The propagator pattern is one explicit point in this design space.

The Green-function interpretation becomes attractive when boundary conditions matter. If agents live in a space with known geometry--a formation, road network, wireless propagation environment, or task manifold--then a kernel that already encodes response under those boundaries may reduce the number of iterative correction rounds. In numerical PDEs this is ordinary: if one can invert the operator once, repeated local relaxation can be replaced by application of the inverse or an approximate preconditioner. The swarm paper imports that intuition into multi-agent coordination `interpretive`.

However, ML systems often work in learned latent spaces where the geometry is not known a priori. In that regime, the propagator must itself be learned or approximated. The conditional theorem still gives a diagnostic: compare the amortised cost of learning and applying the kernel against the cost of iterative communication. A learned attention matrix may already be a data-driven propagator. The question becomes whether it is stable, interpretable, reusable, and evidence-labelled.

The jellyfish-drone example is best read as a design sketch. A lead drone is a source; followers evaluate the field and assume positions along response contours. The Lean theorem `jellyfish_single_step` states that the formal update equals `swarm.G.mulVec s`. This proves the encoded one-step update, not flight stability in wind or hardware timing. Still, as a software pattern it is clear: separate formation geometry from communication protocol; precompute response; execute local evaluation.

The swarm paper's connection to the Universal Somatic Field also needs care. Treating a swarm as a macroscopic brane projection is a mathematical and visual reading, not a mainstream robotics result. The computing reader can keep the useful part while suspending the ontology: model the collective as a field over agents; define a Green-function response; compare update costs; test against message-passing baselines. That is enough for engineering research without claiming that every swarm is literally a somatic organism.

The strongest possible next benchmark would be mundane. Implement three or four coordination tasks with known geometries. Compare local message passing, graph neural baselines, centralised planning, dense propagator, sparse/low-rank propagator, and learned attention. Include setup, memory, recomputation, communication, convergence, robustness to stale kernels, and adversarial perturbations. Report regimes where $K>N$ actually occurs. If the field method wins only in narrow regimes, that is still valuable. If it loses, the theorem remains true but its engineering range narrows.

This is how formal methods and ML benchmarks should interact. Formal proof nails down a claim in a simplified model. Benchmarking searches for the real regime where the assumptions pay rent. The programme is strongest when it invites that search and weakest when it writes as if the formal comparison has already solved distributed coordination. A computer-science volume should choose the stronger path.

The complexity claim also illustrates the difference between operation count and systems cost. A matrix-vector multiply may be cheap on a GPU, expensive on a microcontroller, and impossible if the network cannot store the dense matrix. Message passing may be slow in a high-latency network, but efficient in a sparse local topology. Learned communication may appear sub-quadratic because it compresses state, but the compression may sacrifice exactness. An honest architecture states which resource is being optimised: arithmetic operations, wall-clock latency, energy, bandwidth, memory, or robustness.

The same distinction matters in multi-agent AI. A central coordinator can hide $O(N^2)$ interactions in a server-side attention block. A decentralised system can spread them across agents. A learned bottleneck can approximate them. A physical medium can perform some propagation outside digital computation. These are different engineering choices, not moral categories. The swarm propagator paper is useful because it gives a vocabulary for comparing them instead of pretending that coordination is free.

## Ledger

| Claim | Label | Source |
|---|---|---|
| `propagator_beats_classical` proves $N^2<NK$ under $K>N$. | `kernel-verified` | `SwarmPropagator.lean` |
| Break-even at $K=N$ and classical win at $K=1$ constrain the claim. | `kernel-verified` | `SwarmPropagator.lean` |
| Jam resistance holds only after $G$ is distributed and for the encoded update. | `derived-under-assumptions` | `jam_resistant` |
| Global minimum-energy optimality is currently axiomatic in the proof surface. | `derived-under-assumptions` | `greens_achieves_minimum_energy` |
| Multi-agent applications require empirical benchmarks with setup and storage costs. | `open-hypothesis` | This chapter |

# Lean, Operator Data Architecture, and Sherlock

Lean is a proof assistant, not a laboratory. Its kernel checks whether a term inhabits a type under the definitions, imports, and axioms in scope [@leanprover2021]. This is exactly what computer scientists should want from it, and no more. When the repository contains `theorem consciousness_dichotomy (φ) : isPreconscious φ ∨ isConscious φ`, Lean checks that the theorem follows from `lt_or_ge` over real numbers after unfolding the definitions. It does not check that a biological organism has a measurable limbic amplitude or that $\sqrt2$ is an empirically calibrated threshold `kernel-verified`.

The repository root pins `leanprover/lean4:v4.31.0`; `lakefile.toml` directly requires Mathlib and physlib at v4.31.0 and OSforGFF at a pinned commit. Those are build-configuration facts, not proof results. The proof surface therefore has to be read as dependency information. `SwarmPropagator.lean` contains arithmetic cost theorems and an axiom for global optimality. `LimbicHopfield.lean` contains algebraic theorems about temperature and weight modulation. `QuantumSim.lean` contains a small WKB-gate reachability theorem for a two-state abstraction and theorem `quant_exp_1_awe_reachable` derived from it. `UniversalSomaticField.lean` contains scale and threshold definitions. `FieldAxioms.lean` is explicitly an axiom registry with twenty `axiom` declarations. The repository also has seven real `sorry`s in four files, so whole-programme "no sorries" language would be wrong.

For software engineers, this is not a defect. It is a map. A theorem proved by `rfl` is different from a theorem proved by arithmetic; both are different from an imported theorem; all are different from an axiom; all are different from a simulation. A serious verification workflow should expose those differences in generated documentation. The Lean appendix is useful as a guide to the proof surface, but this book treats the proof files directly as the verification layer whose claims must be summarised with dependency status.

The phrase "what Lean checks" can be made precise for this corpus. It checks datatypes and definitions. It checks that functions reduce as claimed. It checks arithmetic inequalities such as $N^2<NK$ under hypotheses. It checks that the FM-HN baseline equations reduce at $\phi=0$. It checks finite encodings in the emotion ontology where proofs are by `decide` or definitional equality. It checks that a formal statement follows from an axiom if that axiom has been introduced. It does not check external truth, measurement validity, philosophical adequacy, or clinical efficacy.

This is analogous to type safety in software. A type checker can prove that a function will not receive an integer where a string is required. It cannot prove that the product strategy is wise or that the input data are representative. Formal verification can prove that an implementation meets a formal specification. It cannot prove that the specification captures the user's actual need. The [T]-Theory proof surface should be read with that ordinary humility.

The Soma Field Operator implements a parallel architecture in the visual layer. It is a Three.js app with modules for theory atlas entries, cheat-sheet registries, scale morphisms, zoom implementations, scene coverage, and runtime rendering. Its README states that new hard-coded theory, publication, scale, route, equation, G-ID, or claim tables should not be added to JavaScript. Authority remains outside the bundle: `Dist/PAPERS.yaml` owns publication metadata and G-IDs; `operator-theory.yaml` owns routes, visual contracts, scale transitions, and claim boundaries; paper Markdown and Lean proofs own scientific prose, equations, and proof status.

That separation is the app's most important data-architecture claim. The current JavaScript still contains hand-authored educational tables; the README calls this migration debt. The intended next step is `make operator-generate`, which validates source files and emits a generated app-data module. Browser JavaScript should then contain renderers, controls, and a stable renderer registry, not copied authority data. Missing renderer IDs should appear as explicit placeholders and in a coverage report. This is standard static-site and product engineering, applied to a speculative scientific programme `derived-under-assumptions`.

The app's scale model is likewise data-driven in intent. `operator-theory.yaml` defines a $\Lambda_M(\sigma)$ architecture as `(substrate, k, boundary_conditions, operator, Green_function)`, the invariant $L_{M,\sigma}G_{M,\sigma}=\delta_\sigma$, a zoom operator, hierarchy projections $M_{11}\to M_8\to M_4$, layers M4/P3/L1/C3, human-scale affect controls, cross-scale guardrails, and a scale atlas. The important guardrail says that cross-scale affect dynamics should be off, interpretive, or human-clinical; a city, planet, or universe should not be described with human clinical vocabulary without explicit retyping. This is a software constraint protecting conceptual hygiene.

The implementation already exposes evidence in UI form. `cheat-sheet-registry.js` defines sections such as identity, physics, response, morphism, evidence, interpretation, operate, and renderer. `updateScaleReadout` computes the active badge from the selected 4D/8D/11D projection and writes source, papers, claim status, controls, and route information into the UI. `scene-coverage.js` lists dedicated versus generic visual scenes, making gaps visible. This is not proof of the theory, but it is an implemented pattern for evidence-aware presentation.

The same pattern could be extended to generated claim records. A build step could parse Lean declarations, detect axioms and sorries, map paper claims to theorem names, pull publication metadata from `Dist/PAPERS.yaml`, and emit a signed app-data bundle. Claims that lack a source would fail generation or receive `INTERPRETIVE`. Claims that cite an axiom would display `derived-under-assumptions`, not `kernel-verified`. Claims that cite a simulation would link to code and parameters. This is Sherlock as engineering rather than persona `open-hypothesis`.

Sherlock itself should be described briefly in this computing volume. The current repository contains seeds: `EmotionOntology.lean`, `FieldProofs.lean`, and OpenCyc-to-TypeDB scripts such as `schema.tql`, `load_opencyc.py`, and `query_cyc.py`. But Sherlock is not yet a complete implemented programme. It is a design and philosophy of audit: synthesise the claim, ask Moriarty for the single point of failure, check the proof surface, check the ontology, check the data, and label the residue. The philosophy volume handles Sherlock's wider epistemology.

For AI researchers, the Sherlock idea is attractive because it resembles adversarial evaluation with provenance. A model proposes a claim. An auditor maps it to formal declarations, source papers, simulations, and assumptions. An adversary searches for category errors: theorem versus axiom, simulation versus hardware, analogy versus identity, UI display versus measurement. The output is not a single true/false bit but a labelled claim graph. That is a plausible tool for scientific ML, not only for [T]-Theory.

The link to mathematical co-identification is direct. Co-identification says that theorem transfer is justified only when type signatures match under assumptions. A Sherlock-like system would operationalise that rule: extract signatures, search candidate structures, list imported theorems, verify assumptions, and generate falsifiers. It would also remember that AI-assisted discovery is just accelerated search. The AI is a faster library, not a different epistemology.

The computing challenge is therefore not to make the prose more dramatic. It is to make the repository stricter. Every theorem named in a book should resolve to a Lean declaration or be marked otherwise. Every app badge should be generated from authority data. Every simulation claim should link parameters and code. Every cross-scale route should say what is preserved, what is retyped, and what is lost. Every open hypothesis should have a discriminating test. That is a software architecture worthy of the title.

There is also a security lesson. The Operator and future Sherlock should avoid treating generated prose as trusted input. A paper claim is not trusted because it appears in Markdown; it becomes a claim record only after parsing, source resolution, and labelling. A theorem name is not trusted because it appears in prose; it must resolve in Lean. A DOI is not trusted because an app table says so; it belongs in the publication registry. This is ordinary supply-chain thinking applied to research artefacts.

The same logic applies to ML evaluations. If an agent summarises the programme, it should not be allowed to promote an `open-hypothesis` into a `kernel-verified` statement. If it writes code for the Operator, it should not hard-code new theory tables into renderer files. If it reports a benchmark, it should include parameters and failure modes. The system needs not only model intelligence but epistemic permissions.

## Ledger

| Claim | Label | Source |
|---|---|---|
| Lean checks consequences of formal statements, not empirical meaning. | `kernel-verified` | Lean kernel discipline |
| Seven real sorries remain, so whole-corpus no-sorry claims are wrong. | `empirical-result` | Lean source inspection |
| Operator authority is intended to live in YAML, papers, Lean, and registries, not renderer code. | `derived-under-assumptions` | Operator README |
| Generated claim records are a natural next implementation step. | `open-hypothesis` | This chapter |
| Sherlock is currently a design/audit philosophy with partial substrates, not a finished programme. | `interpretive` | `EmotionOntology.lean`; `FieldProofs.lean`; ontology scripts |

# Implementation Patterns for Affective and Coordinating Systems

A computing volume should leave the reader with design patterns, not only with claims. The first pattern is the affective state object. In ordinary applications a state object contains fields such as user identifier, session, permissions, current view, and cached results. In an affective-field architecture it would contain mode amplitudes, thresholds, damping, coupling, memory terms, and provenance. The point is not to guess a user's inner life. The point is to avoid pretending that a scalar sentiment score can carry all the structure that an interaction system may need `interpretive`.

Such a state object should be typed by observability. A directly measured signal, such as a keyboard latency or heart-rate input in an approved study, is not the same as an inferred state from language. A simulated field variable is not the same as a measured one. A clinical word is not the same as a control variable. The design pattern is therefore to split the state into `observed`, `inferred`, `simulated`, and `interpretive` components, each with its own retention and consent rules. This is ordinary privacy engineering with better mathematical names.

The second pattern is the propagator adapter. A propagator is a function object with a validity regime. It should declare its input shape, output shape, boundary conditions, update cost, storage cost, refresh policy, and evidence status. In code, one can imagine a `Propagator` interface with implementations such as `DenseGreenMatrix`, `SparseGraphKernel`, `LearnedAttentionKernel`, `LocalMessagePassing`, and `AnalyticBoundaryKernel`. The USF language does not require that one implementation dominate. It asks that all of them make their assumptions inspectable.

The third pattern is the correspondence test. If an extended model claims to include a simpler model as a special case, that claim should become a unit test or theorem. FM-HN offers a good example: zero limbic amplitude recovers baseline temperature and weights. A transformer extension, a safety wrapper, or a multi-agent field module should offer analogous tests. Set the extension parameter to the neutral value; the baseline should reappear. If it does not, the extension may still be useful, but it has not earned the correspondence claim `kernel-verified` where formalised.

The fourth pattern is the falsifier harness. A field-theoretic model often sounds persuasive because it unifies many phenomena. Software should make it easier to break. For a Hopfield/FM-HN module, falsifiers might include absence of hysteresis, failure of transition predictions, no advantage over stronger baselines, or poor calibration of threshold variables. For a swarm propagator, falsifiers include regimes where recomputing $G$ erases the advantage, where sparse message passing wins, or where stale kernels destabilise coordination. For an Operator display, a falsifier is any user-visible claim whose source cannot be resolved.

The fifth pattern is the claim compiler. Instead of writing badges by hand, the project should compile them. A claim source file would state the proposition, source paper, theorem dependency, simulation dependency, and label. The compiler would verify paths, theorem names, paper IDs, and allowed label transitions. If a claim cites `greens_achieves_minimum_energy`, the compiler would mark it as assumption-dependent because that declaration is an axiom. If a claim cites `propagator_beats_classical`, it could mark the arithmetic comparison as `kernel-verified` while requiring the prose to include $K>N$.

This is where Sherlock becomes a build tool. The minimal Sherlock need not understand all of philosophy. It can start as a static analyser for research claims. Input: Markdown, Lean declarations, YAML registries, simulation manifests. Output: unresolved theorem names, claims whose labels are too strong, missing sources, unlinked simulations, unembedded proof obligations, and suggested Moriarty questions. Such a tool would be valuable even before it had natural-language sophistication. It would make the repository harder to accidentally exaggerate `open-hypothesis`.

The sixth pattern is benchmark stratification. A USF-inspired ML benchmark should not be one number. It should have at least four layers. Layer one is formal: theorem or invariant checks. Layer two is synthetic: toy state spaces where the expected behaviour is known. Layer three is task-level: realistic ML or multi-agent tasks with baselines. Layer four is human or physical validation, only where ethically and experimentally appropriate. Most current results live in layers one and two. That is respectable if labelled; it is misleading if written as layer four.

For the four-model Hopfield/FM-HN benchmark, stratification would separate the executable Lean or mirror code from the conceptual claim. The current run demonstrates that, in a stylised landscape, a gate can move the state where classical relaxations do not. A stronger benchmark would include random seeds, parameter sweeps, stronger modern Hopfield baselines, learned transition models, noise sensitivity, and wall-clock timings with hardware details. It would report failures. It would not call a stylised basin-crossing task a general theory of affective intelligence.

For the swarm propagator, benchmark stratification would separate arithmetic cost from coordination quality. A dense $G$ may compute in one step, but the resulting state still has to be good. Quality metrics might include consensus error, formation error, energy, safety constraint violation, latency, energy consumption, and recovery after perturbation. Baselines should include local gossip, graph neural message passing, model-predictive central planning, learned attention, and sparse approximations. Only then can the conditional theorem be connected to engineering regimes.

The seventh pattern is provenance-preserving visualisation. The Operator already points towards this. A visual object should know whether it is formal, sourced, interpretive, or placeholder. It should know which scale and projection it represents. It should know whether a human-clinical vocabulary is allowed. It should know which source file owns its equation. It should show coverage gaps. This is not decoration. In science communication, rendering is an argument. A renderer that does not carry provenance can silently convert speculation into apparent fact.

The eighth pattern is retyping at boundaries. Many software failures occur at boundaries: API boundaries, trust boundaries, network boundaries, domain-shift boundaries. Cross-scale theory has the same problem. A variable named `memory` at human scale is not automatically the same type of object as geological memory or institutional memory. The Operator contract's insistence on retyping is therefore more than philosophical caution. It is good interface design. A morphism should say what is preserved, what is added, what is integrated out, and what changes type.

The ninth pattern is graceful degradation of ontology. A system built from USF ideas should still do something useful if a high-level interpretation is disabled. Turn off consciousness claims; the state-space model remains. Turn off clinical language; the Hopfield landscape remains. Turn off cosmological mappings; the proof ledger remains. Turn off the visual app; the YAML and Lean files remain. This is not a retreat. It is how robust systems are designed. Strong claims should be optional modules with explicit dependencies, not load-bearing globals.

The tenth pattern is adversarial documentation. Every chapter, app panel, and benchmark should include a short section that asks what would make the claim fail. For formal claims, failure may mean a theorem does not compile or depends on an unwanted axiom. For simulations, failure may mean the result disappears under parameter sweep. For empirical claims, failure may mean a pre-registered prediction fails. For interpretations, failure may mean the mapping does no explanatory work. This is Moriarty as documentation practice rather than theatrical persona.

These patterns make the programme more accessible to computer science because they translate ambition into tasks. Define interfaces. Generate ledgers. Add tests. Run baselines. Display provenance. Separate authority from renderers. Retype variables. Build static analyzers. The metaphysical interpretation can then be argued elsewhere. The code either improves or it does not.

A final implementation point concerns collaboration between proof and ML workflows. Proof assistants prefer small, exact statements. ML workflows prefer approximate, empirical performance. The USF repository needs both. The right bridge is not to force neural systems into complete theorem proving, nor to let empirical systems ignore formal constraints. The bridge is to use Lean for invariants and scope boundaries, use simulations for model behaviour, use benchmarks for comparative performance, and use empirical studies only for claims about the world. Each layer should feed the next without pretending to replace it.

For example, `correspondence_principle` can be a Lean invariant. A Python or Lean benchmark can test whether an implementation respects it numerically. An ML experiment can ask whether the modulated model performs better on a task. A human-subject protocol, if ever appropriate, can ask whether the model's variables correlate with measured experience. These are four different questions. Good architecture prevents the answer to one from being reported as the answer to all.

That separation also helps with reproducibility. A reader should be able to rebuild the proof layer, rerun the simulation layer, inspect the benchmark layer, and audit the presentation layer independently. If any layer is missing, the claim should degrade to the highest supported label, not borrow credibility from a neighbouring layer. This is the engineering meaning of evidence labels.

## Ledger

| Claim | Label | Source |
|---|---|---|
| USF-inspired software should distinguish observed, inferred, simulated, and interpretive state. | `interpretive` | This chapter |
| Propagator implementations should declare validity regime, cost, storage, and refresh policy. | `interpretive` | This chapter |
| Correspondence claims should become theorems or tests where possible. | `kernel-verified` / `derived-under-assumptions` | FM-HN example |
| Claim badges should be generated from authority files rather than written by hand. | `open-hypothesis` | Operator architecture proposal |
| Benchmarks should be stratified into formal, synthetic, task, and empirical layers. | `interpretive` | This chapter |

# Reading Single-Step Multi-Agent Coordination

The swarm propagator paper should be read as an algorithmic proposal with formal arithmetic support. Its central protocol is clear: distribute a Green matrix $G$, then update the swarm state by one matrix-vector product. The paper's value for computer science is that it makes coordination cost explicit and links that cost to a proof file. Readers should pay attention to the comparison regime: the propagator beats the simplified $O(NK)$ message-passing baseline only when $K>N$ and when the precomputed $G$ is valid for the task geometry `kernel-verified`.

Do not read the paper as a universal proof that every distributed system has an $O(N^2)$ lower bound. Its displayed formal result is narrower and more useful. It gives a clean crossover theorem, break-even condition, speedup ratio, and jam-resistance claim after matrix distribution. Its global minimum-energy assertion is currently axiomatic. The best way to extend the paper is to benchmark realistic systems and to formalise the PDE optimality obligation.

{{AddPaper ../../paper/soma/swarm-propagator/swarm-propagator.md}}
{{AddPage}}

# Reading Experimental Benchmarks for the USF Framework

The experimental-validation paper is a benchmark map rather than a final benchmark suite. It compares Hopfield 1982, a dense/polynomial Hopfield variant, Hopfield 2020 softmax attention, and FM-HN on stylised basin-crossing tasks; it also relates the four-model framework to MNIST-like corruption, Kuramoto synchronisation, GHZ analogies, God-Knob hysteresis, QUANT-EXP-1, and Sherlock-Moriarty audit. For this volume, the key deliverable is the existence of `Benchmark.lean` and `#eval runBenchmark` as a concrete place where model claims touch executable code `simulated`.

Read the benchmark claims with two filters. First, treat the small runs as demonstrations of model behaviour, not performance results for production ML. Some timing fields in the paper are placeholders or illustrative rather than stable benchmark numbers. Second, treat the QUANT-EXP-1 material as exact statevector simulation evidence, not quantum hardware. The simulations are important because they make reachability claims precise; they are not clinical evidence, consciousness evidence, or runtime advantage evidence.

{{AddPaper ../../paper/soma/experimental-validation/experimental-validation.md}}
{{AddPage}}

# Reading The Soma-Field Research Programme

The synthesis paper gives the programme's own account of why its pieces belong together. Computer scientists should read it as a requirements document with ambition: it defines the gap, explains mathematical co-identification, summarises the Hopfield and propagator model, reports QUANT-EXP-1, and situates lived case material and extensions. Its rhetorical style is stronger than the evidence labels used in this book, so readers should translate claims into the ledger vocabulary as they go.

The useful engineering idea is the "verification threshold": exploratory search ends when a formal statement is encoded, assumptions are named, and consequences are checked. The risky idea is to treat that threshold as if it settled substrate ontology. It does not. The synthesis is best used as an index of modules: Hopfield landscape, Green propagator, quantum reachability simulation, MCI method, instrument, and future validation tasks. Each module then needs its own proof, benchmark, or empirical protocol.

{{AddPaper ../../paper/soma/soma-field-synthesis/soma-field-synthesis.md}}
{{AddPage}}

# Reading Mathematical Co-identification

Mathematical co-identification is the method paper this volume most needs. It states a discipline that computer scientists can recognise: extract a type signature, search known structures, import only the theorems whose assumptions match, and state disconfirmation conditions. It is stronger than analogy and weaker than reduction. That is the right middle position for cross-domain computational modelling `interpretive`.

For ML researchers, MCI resembles representation alignment with proof obligations. A latent structure in one domain may share a signature with a known mathematical object, but transfer is licensed only by the matched structure, not by name similarity. The paper's failure modes--type coincidence, non-commuting functors, over-identification, metaphor traps--are exactly the failure modes of ambitious AI science. Its Aesop/typeverse loop is also the most direct precursor to a future Sherlock audit system.

{{AddPaper ../../paper/soma/mathematical-co-identification/mathematical-co-identification.md}}
{{AddPage}}

# Reading the Lean Proofs Appendix

The Lean proofs appendix is part of the reading stack, but this book does not embed it. Its role here is to orient the proof surface: what files exist, what kinds of statements they establish, and how a reader can rebuild or inspect the project. A computing reader should use it as a map, then check theorem names in the `.lean` files themselves. The authoritative status is always the source: theorem, axiom, imported result, placeholder, or `sorry`.

The most important habit is to read theorem names with their dependency shape. `propagator_beats_classical` is an arithmetic comparison. `correspondence_principle` is an algebraic reduction at zero limbic field. `consciousness_dichotomy` is a real-number dichotomy over a defined threshold. `greens_achieves_minimum_energy` is an axiom. Those statuses are not rhetorical details; they are the difference between proof, assumption, and research programme.

# Reading The Soma-Field Model

The Soma-Field paper is the broadest source in this volume. It introduces persistent emotional fields, thresholds, coupling matrices, energy landscapes, clinical language, ontology, instrument design, and field-theoretic correspondences. Computer scientists should not try to accept or reject it as one block. Instead, read it as a large specification draft containing several separable modules: state representation, energy dynamics, threshold predicates, ontology mapping, UI/instrument ideas, and validation requirements.

The paper's strongest computing material is the insistence that emotion representations should not be flat labels. Affective state is distributed, coupled, persistent, and thresholded. That is a plausible design lesson even for systems that make no claim about phenomenal experience. Its riskiest material is clinical and metaphysical; those claims require empirical protocols outside the scope of software proof. The paper therefore belongs in this volume as the domain model to be architected, not as the final verification of that model.

{{AddPaper ../../paper/soma/soma-field-paper/soma-field-paper.md}}
{{AddPage}}

# Operational Falsification and Research Roadmap

A computational research programme should be judged by how quickly it can make itself wrong. The Universal Somatic Field is broad enough that a vague version could survive anything. The computing version should not be vague. It should define a small number of operational claims, attach them to code, and publish failure conditions. The goal is not defensive certainty; it is faster contact with reality `interpretive`.

The first falsification track is formal. Every theorem advertised to readers should be rebuilt under the declared Lean toolchain. If the theorem depends on `FieldAxioms.lean`, the claim should be labelled assumption-dependent. If it depends on a `sorry`, it should not be counted as kernel-verified. If a proof is by `rfl` or simple arithmetic, prose should not make it sound like a deep analytic result. The formal track fails when theorem names do not resolve, when imports do not build, or when a claim's label is stronger than its dependency graph.

The second track is numerical. QUANT-EXP-1 and the benchmark files should be treated as reproducible simulations with manifests: code version, parameters, seeds, dimensions, schedules, and baselines. A simulation claim fails if the reported result cannot be reproduced, if it disappears under reasonable parameter sweeps, or if a stronger baseline closes the gap. Simulation failure is not philosophical catastrophe. It is a normal way of narrowing a model class `simulated`.

The third track is systems benchmarking. For the swarm propagator, the relevant question is not only whether $N^2<NK$ when $K>N$; it is whether real coordination tasks enter that regime after setup, storage, update, and robustness costs are included. This track should define benchmark families with static geometry, slowly changing geometry, rapidly changing geometry, partial observability, and adversarial disturbance. It should publish where the propagator wins, ties, and loses. A conditional result becomes more useful when its conditions are mapped.

The fourth track is human-facing calibration. Any claim about affective state in people needs operational measures, consent, privacy review, and independent replication. The computing volume can specify software requirements for such a track without pretending it has been completed: data schemas for signals and self-report, separation between raw measurements and inferred field variables, model cards for affect inference, and dashboards that refuse clinical language outside approved contexts. A human-facing track fails if the variables cannot be measured reliably or if the model has no predictive value beyond simpler baselines `open-hypothesis`.

The fifth track is interface audit. The Operator and future apps should undergo claim-surface testing. A tester should be able to choose any visible statement and ask: where did this come from, what is its label, what theorem or paper supports it, and what would make it false? If the UI cannot answer, the statement should be downgraded or removed. This is a practical way to prevent visual authority from exceeding source authority.

The sixth track is ontology and Sherlock. A minimal claim graph should include nodes for papers, theorem declarations, axioms, simulations, app panels, registry entries, and prose claims. Edges should represent citation, dependency, implementation, interpretation, and contradiction. Moriarty checks should be queries over this graph: find claims labelled `kernel-verified` that depend on axioms; find simulation claims written as empirical results; find app panels without source paths; find theorem names that no longer exist. This is enough to make Sherlock useful before it becomes intelligent.

The roadmap implied by these tracks is incremental. First, freeze canonical claim labels and theorem references. Second, generate app data from authority files. Third, produce reproducible manifests for simulations and benchmarks. Fourth, build the minimal claim graph. Fifth, add adversarial queries. Sixth, run external replication or independent reimplementation for the strongest computing claims. At every stage the result should be a smaller and sharper programme, not a larger cloud of prose.

This roadmap is intentionally unromantic. It does not ask the reader to accept the USF as a world-theory before building anything. It asks the reader to treat the repository as a set of typed artefacts that can be compiled, tested, rendered, and audited. That is the appropriate posture for computer science. If the field ontology is right, the tooling will help show where. If it is wrong, the tooling will help find the crack.

## Ledger

| Claim | Label | Source |
|---|---|---|
| The computing roadmap should prioritise falsification and reproducibility. | `interpretive` | This chapter |
| Formal claims fail if theorem references or dependency labels are wrong. | `kernel-verified` / `derived-under-assumptions` | Lean workflow |
| Numerical claims require manifests, seeds, parameters, and baselines. | `simulated` | Benchmark practice |
| Human-facing affect claims require calibration and approved data protocols. | `open-hypothesis` | This chapter |
| A minimal Sherlock can begin as a claim graph plus adversarial queries. | `open-hypothesis` | This chapter |

# Conclusion: Computing After the Field

The computing contribution of [T]-Theory is not that it has solved emotion, consciousness, alignment, or distributed coordination. It has not. The contribution is a set of architectural pressures that computer science can understand: make state explicit; make coupling explicit; make update kernels explicit; make costs explicit; make evidence status explicit; and put every formal claim where a kernel, compiler, benchmark, or auditor can touch it `interpretive`.

For formal-methods researchers, the repository is a case study in both the power and limits of proof assistants. Lean can enforce definitions, arithmetic, reductions, and dependencies. It can turn slogans into propositions or expose the fact that they cannot yet be propositions. It can show when a result follows from an axiom and thereby make the axiom visible. It cannot turn an ambitious scientific theory into measured truth. The virtue of the kernel is precisely that it refuses to do the extra work prose sometimes asks of it.

For ML researchers, the Hopfield/FM-HN line is the most technically adjacent component. Classical Hopfield networks give energy minima; modern Hopfield networks connect that grammar to attention; FM-HN adds an explicit modulating field. This is not yet a replacement for transformer architectures or reinforcement learning. It is a proposal for making valuation, arousal, threshold, and transition dynamics first-class architectural objects rather than hidden annotations. The next work is empirical: implement, ablate, compare, and falsify.

For distributed-systems researchers, the swarm propagator is the sharpest test. Its current formal theorem is intentionally simple: $N^2<NK$ when $K>N$. Its assumptions are equally important: precomputed or distributed $G$, linear field, one-step validity, and bounded comparison baseline. This does not settle multi-agent coordination. It gives a clean regime claim and a family of benchmarks. A mature version would include sparse kernels, learned kernels, dynamic geometries, adversarial disturbance, and realistic communication accounting.

For software architects, the Soma Field Operator may be the most exportable artefact. It shows how a speculative theory can avoid burying authority in UI code. It separates publication registry, theory contract, proof/prose sources, renderer coverage, controls, and claim badges. It is not finished, but the direction is correct: generate display data from validated authority, mark missing scenes, and keep interpretive visualisations from masquerading as formal facts. Many scientific web apps would be improved by this discipline.

For AI-safety researchers, the landscape framing is promising but immature. Alignment as compatibility between energy landscapes is a more geometric question than preference elicitation, and it may help specify attractors, barriers, and transition constraints. Yet the programme does not currently provide a validated method for deriving a human-compatible landscape or for proving that an AI system respects it. Treat this as a research language, not a solved alignment theory `open-hypothesis`.

Sherlock is the natural endpoint of the computing volume, but not its centre. A future Sherlock would connect papers, theorem files, ontology, simulations, app displays, and adversarial review. It would ask whether a claim is proved, assumed, simulated, measured, interpreted, or open. It would ask Moriarty for the failure mode. It would generate a ledger instead of a verdict. That is a realistic and valuable AI-for-science tool. The philosophy volume can ask what such an auditor means for knowledge; this volume asks how to build the data interfaces.

The programme's self-discipline should now become stricter. The next revision of any computing-facing material should replace global verification language with theorem-specific statements. It should replace benchmark slogans with reproducible commands and result files. It should replace hard-coded app theory tables with generated data. It should replace Sherlock persona language with a minimal claim-graph implementation. It should replace "same equation everywhere" with typed morphisms that say what is preserved and what is retyped.

If those steps are taken, the Universal Somatic Field will be useful to computing even if some of its broader claims fail. It will have produced a demanding example of how to write speculative science as software: interfaces first, evidence labels everywhere, proofs where possible, simulations where useful, and falsifiers where necessary. That is not a small thing. Computer science has often advanced by making vague operations precise enough to compile. This volume asks whether affective and collective dynamics can be made precise enough to audit.

The most conservative legacy would be a tooling stack. A generator reads registries and proof files. A linter flags mismatched labels. A benchmark harness records parameters. A UI displays badges and links. An adversarial agent searches for theorem-to-world slippage. None of those tools requires accepting the full USF ontology. All of them would improve the reliability of interdisciplinary computational research. That is why this computing volume ends not with metaphysics but with build tasks.

The hardest remaining engineering problem is calibration. A state-space architecture is only as good as its observables. For human-scale affect, the programme will need operational measures, consent-aware data collection, prospective protocols, and clear falsifiers. For swarm coordination, it will need realistic geometries and adversaries. For Lean, it will need fewer axioms and fewer sorries. For the Operator, it will need generated data and coverage. For Sherlock, it will need a minimal implemented claim graph. These are tractable tasks, but they are tasks, not declarations.

One final engineering constraint is maintainability. A programme spread across papers, proof files, app modules, and registries will decay unless names are stable and changes are propagated by tools. The computing volume therefore recommends versioned theorem aliases, generated paper IDs, schema validation for YAML contracts, and CI checks that fail when a visible claim loses its source. This is not bureaucracy. It is the difference between a research repository and an archive of persuasive fragments.

A maintainable version should also distinguish public API from experimental scratch space. The public API consists of theorem names cited by books, data schemas consumed by the Operator, paper IDs consumed by distribution tooling, and command lines used for benchmarks. Experimental files may change freely, but public objects need deprecation policy. If `propagator_beats_classical` is renamed, the book and app should not silently rot. If a paper moves from pending to published, the registry should update the display without hand-editing JavaScript.

The same discipline will help external readers. A computer scientist encountering the programme should be able to clone the repository, rebuild the proof layer, run the small benchmarks, inspect the app data path, and see which claims are not yet supported. That path is more persuasive than a stronger conclusion. In computing, trust is earned less by saying that a system is rigorous than by letting others run, break, and instrument it.

The resulting engineering ethic is modest but demanding: do not ask readers to admire breadth until they can inspect dependency. In ordinary software, a build that passes today can fail tomorrow because an interface changed. In this programme, a claim can fail in the same way because an axiom moved, a theorem was renamed, a simulation parameter changed, or a visual panel copied stale data. Treating those events as build failures rather than embarrassments would make the research healthier.

That is the standard computer science can contribute: not reverence for a field theory, but reliable machinery for locating precisely where its claims compile, run, fail, or remain carefully, explicitly undecided under named project assumptions.


## Ledger

| Claim | Label | Source |
|---|---|---|
| The computing contribution is architectural discipline, not a solved theory of emotion. | `interpretive` | This conclusion |
| Lean is valuable because it exposes definitions, dependencies, axioms, and gaps. | `kernel-verified` | Lean proof surface |
| FM-HN is an implementable research architecture needing ablation and validation. | `open-hypothesis` | This conclusion |
| Swarm propagator claims need realistic distributed-systems benchmarks. | `open-hypothesis` | Swarm chapter |
| Sherlock should become a claim-graph auditor before stronger claims are made. | `open-hypothesis` | Sherlock discussion |

# Evidence Ledger

| Claim | Label | Source |
|---|---|---|
| Affective State Propagator is this volume's G-ID. | `derived-under-assumptions` | Opening G-ID statement |
| USF can be represented computationally as state, source, propagator, and response. | `interpretive` | This book's architecture reading |
| Hopfield energy is the finite attractor-landscape basis for the affect model. | `derived-under-assumptions` | Soma-Field paper |
| Modern Hopfield attention is structurally relevant to propagator-style updates. | `interpretive` | Ramsauer comparison |
| FM-HN temperature and weight modulation are encoded in `LimbicHopfield.lean`. | `kernel-verified` | `calm_temp_is_baseline`; `correspondence_principle` |
| Stress raises formal temperature under positive parameters in the encoded model. | `kernel-verified` | `LimbicHopfield.stress_raises_temp` |
| FM-HN biological adequacy is not established by those theorems. | `open-hypothesis` | FM-HN model boundary |
| The four-model benchmark is a simulation/demonstration. | `simulated` | `Benchmark.lean`; experimental-validation paper |
| QUANT-EXP-1 is exact statevector simulation, not hardware. | `simulated` | QUANT-EXP-1 simulation notes |
| `propagator_beats_classical` proves $N^2<NK$ for $K>N$. | `kernel-verified` | `SwarmPropagator.lean` |
| Propagator break-even is at $K=N$. | `kernel-verified` | `SwarmPropagator.breakeven_at_N` |
| Classical one-round cost is lower than dense propagator cost for $N>1$. | `kernel-verified` | `SwarmPropagator.classical_wins_single_round` |
| Jam resistance holds for one local evaluation after $G$ is distributed. | `derived-under-assumptions` | `SwarmPropagator.jam_resistant` |
| Green-function global energy optimality remains axiomatic in the file. | `derived-under-assumptions` | `greens_achieves_minimum_energy` |
| `consciousness_dichotomy` proves only a formal real-number split. | `kernel-verified` | `UniversalSomaticField.lean` |
| Consciousness as biological threshold crossing remains unvalidated. | `open-hypothesis` | `UniversalSomaticField.lean`; empirical validation still required |
| `FieldAxioms.lean` is an axiom registry with twenty axiom declarations. | `derived-under-assumptions` | `FieldAxioms.lean` |
| Seven real `sorry`s remain across the proof surface. | `empirical-result` | Lean source inspection |
| Operator runtime fields are visual controls, not measurements. | `derived-under-assumptions` | Operator README and runtime contract |
| Operator source authority should live outside browser renderers. | `derived-under-assumptions` | Operator README |
| Cross-scale affect display requires substrate retyping. | `derived-under-assumptions` | `operator-theory.yaml` |
| Sherlock is currently a proposed audit architecture with partial substrates. | `interpretive` | `EmotionOntology.lean`; `FieldProofs.lean`; ontology scripts |
| AI-assisted discovery accelerates search but does not change justification. | `interpretive` | Mathematical co-identification paper |
| Alignment as landscape compatibility is a research framing. | `open-hypothesis` | This book |
| A generated claim graph is the natural next computing deliverable. | `open-hypothesis` | This book |

# [T]-Theory Cheatsheet

The cheatsheet is a compact navigation aid for the computing volume. Read it as an index of equations, scales, operators, and evidence boundaries, not as a replacement for theorem files, simulations, or the evidence ledger above.

{{AddBooklet ../bld/booklet-computer-science.pdf recto}}





