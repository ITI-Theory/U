# FIELD-NOTES

*Running theoretical log for [T]-Theory / The Tensor project.*
*Started: 17 May 2026. Updated: 18 May 2026.*

---

These notes record the theoretical brainstorms, design decisions, and conceptual
connections that emerged in session — the working process behind the three Tensor
documents. They are not polished. They are the silvery thread before it goes into
the Pensieve.

---

## Session: 18 May 2026 (continued)

### The Limbic Gap

*Origin:* Discussion of Hopfield's reported regret about not adding 'maternal instincts'
to the energy function, and a re-reading of what his network actually models.

*The insight:* Hopfield's network is a formal model of the *neocortex*, not the whole
brain. It stores patterns and retrieves them by error minimisation. That is what the
neocortex does. Every artificial neural network since McCulloch and Pitts (1943) —
perceptrons, backpropagation networks, LSTMs, transformers — is a neocortical model.
They have very effective cortex. None of them has a limbic system.

The limbic system is not a better error function for the cortex. It is a different
computational substrate, running in parallel, on different time constants, doing a
different job: assigning valuation, detecting threat, modulating arousal, registering
attachment, feeding the body back into the field.

**The consequence for the Soma-Field Model:**
The project is not an extension of Hopfield. It is the first formal architecture for
the layer that was never built.

| Layer | Biological substrate | Formal component |
|---|---|---|
| Neocortex | Pattern recognition, language, planning | Hopfield, transformers, LLMs |
| Limbic system | Valuation, threat, attachment, arousal | W, K(τ), C_HRV, Ḣ(t) |
| Brainstem / ANS | Interoception, cardiac, autonomic | σ₀/C_HRV, Ḣ(t), cardiac loop |

The cortex was formally modelled in 1943.
The limbic system starts here.

**Hopfield's regret reinterpreted:**
His wish for 'maternal instincts' was not a wish for a better minimiser. It was an
intuition pointing directly at the absent system — the layer that knows which minimum
matters, not just which minimum is stable.

**The AI alignment parallel:**
The alignment problem may be partly a limbic problem. RLHF (reinforcement learning from
human feedback) is a workaround: human valuation injected from outside, because the
model has no internal capacity to care whether something matters. The soma-field is the
formal first-principles derivation of what that internal capacity would look like if it
were actually built.

*Became:* §2.4 replacement paragraph (cortex/limbic gap) + §3.4 Layer 2 sentence
in soma-field-paper.md; §7.2 new paragraphs in soma-field-book.md.

---

### The Four Intelligence Quotients

*Origin:* Mapping the IQ/EQ/AQ/SQ framework onto the Soma-Field Model components.

*The insight:* The standard four-intelligence framework (IQ, EQ, AQ, SQ) maps exactly
onto the formal components of the model:

| Quotient | What it measures | Biological substrate | Soma-Field status |
|---|---|---|---|
| IQ — cognitive | Pattern recognition, reasoning | Neocortex | Built (1943–): Hopfield → transformers → LLMs |
| EQ — emotional | Valuation, arousal, affect regulation | Limbic system | **Built here**: W, K(τ), H(e), C_HRV, Ḣ |
| AQ — adversity | Structural resilience under threat | PFC–limbic axis | **Built here**: S_inst, W-plasticity, C_HRV_recovery |
| SQ — social | Attunement, theory of mind, relational nav | Mirror system, TPJ | *Next paper*: κ_r, multi-field coupling |

**AQ formally:** AQ ∝ 1/S_inst + ∂‖W‖/∂t|_adversity + C_HRV^recovery
- 1/S_inst: how accessible regulated attractors remain under pressure
- ∂‖W‖/∂t: how much the coupling matrix can adapt after a threshold crossing
- C_HRV^recovery: how quickly the regulatory floor recovers

**C-PTSD as the formal lower bound of AQ.** All three terms are simultaneously
low in C-PTSD:
- High instanton barrier to regulated states → low 1/S_inst
- W dominated by threat configurations, resistant to update → low plasticity
- Impaired HRV recovery → low C_HRV^recovery

The three ICD-11 DSO disturbances map directly:
1. Affect dysregulation → high σ_eff (low C_HRV)
2. Negative self-concept → W coupling from identity modes to shame/fear attractors
3. Relationship disturbances → SQ layer damage (κ_r pathology)

**The AI consequence:** AI systems have maximal IQ; zero EQ, AQ, SQ. They are
formally emotionally unintelligent. The alignment problem may be, in part, an EQ
deficit: no internal valuation means valuation must be injected from outside (RLHF),
which is brittle.

**Key phrases:**
- "AQ is the capacity to update W after adversity without the adversity becoming W"
- "C-PTSD is the formal lower bound of AQ"
- "SQ: bold — the equation has not been written down yet"

*Became:* Table 3 in §2.4 of soma-field-paper.md; AQ formal definition in §3.4;
GOING DEEPER box "Four Kinds of Intelligence" in §7.2 of soma-field-book.md.

---

### Pain and the Represented Body

*Origin:* Starting from phantom limb pain as the clearest case of somatic experience
being a brain-generated prediction rather than a direct body readout.

*The insight:* The soma-field is not a model of the body. It is the nervous system's
model of the body. The distinction is not peripheral — it is the load-bearing claim.

**Key chain of reasoning:**

1. Phantom limb pain: the foot is gone; the pain is real. The neural model of the
   foot persists. What hurts is the model.

2. This is not an anomaly — it is the normal case. Interoception is a prediction
   (Seth, 2021). The brain maintains a continuous predictive model of the soma and
   generates felt experience from that model. The felt body is the predicted body.

3. Ramachandran's mirror box = W → W'. The visual input provides new evidence that
   disconfirms the prediction error. The neural model updates. The pain reduces.
   This is structural rewriting of the field — therapy as W-modification.

4. The formal consequence: e(t) must include somatic modes (pain, tension, visceral
   sensation, proprioception) alongside emotional modes. They are modes of the same
   field with the same W structure.

5. W_ij between fear-modes and somatic-pain-modes = why fear amplifies pain, why
   safety reduces it, and why chronic pain and C-PTSD are comorbid. They are the same
   attractor architecture across mode types.

6. Somatic therapies (EMDR, somatic experiencing, body scan, mirror box) all do
   the same thing: provide interoceptive evidence that updates the prediction.
   They change W. They do not fix tissue. They fix the model of tissue.

**The hyphen is load-bearing.** "Emotional-somatic" is not a compound of two things
that correlate. The hyphen marks an ontological claim: they are two aspects of the
same field. W is the hyphen, made formal.

**Key phrases:**
- "Pain is not in the foot. It is in the brain's model of the foot."
- "The felt body is the predicted body."
- "Therapy does not fix the body. It updates the model."
- "The hyphen in 'emotional-somatic' is load-bearing."
- "Phantom limb pain: attractor persistence after tissue removal"
- "Ramachandran's mirror box = W → W'"

*Became:* §2.6 "The Body Schema, Interoception, and Pain" in soma-field-paper.md;
GOING DEEPER box "The Foot That Isn't There" in §2.2 of soma-field-book.md.

---

### OpenStax Biology Resources

*URLs checked:*
- https://openstax.org/books/biology-2e/pages/35-3-the-central-nervous-system
- https://openstax.org/books/introduction-behavioral-neuroscience/pages/1-4-the-brain-structure-and-function

*Licence:* © Rice University. **CC BY 4.0** for text and Biology 2e figures.
LSDB 3D brain figures (Figs 1.31–1.35 in Behavioural Neuroscience): **CC BY-SA 2.1 Japan**
(ShareAlike — requires same licence on containing document; fine for preprints/open docs).

*Figures usable in our PDFs (CC BY 4.0, attribution required):*
- Fig 35.24 — limbic system diagram: hippocampus, amygdala, cingulate gyrus, thalamus,
  hypothalamus, pituitary. Direct visual of what the Soma-Field Model formally describes.
- Fig 35.20/35.21 — coronal/sagittal brain sections with lobes labelled
- Fig 35.23 — cortical folding evolution across species (rat → cat → chimp → human)

*Attribution line (CC BY 4.0):*
> OpenStax, *Biology 2e* (2019), Rice University. Licensed CC BY 4.0.
> https://openstax.org/details/books/biology-2e

*Added to bibliography.bib:* `openstax2019biology`, `openstax2024neuroscience`

---

## Session: 17–18 May 2026

### The Fantastic Voyage Connection

*Origin:* Asked whether the title *A Voyage into Trauma* had been connected to
*Fantastic Voyage* (Fleischer, 1966).

*The connection:* Both are voyages into an interior. The Proteus crew is injected
into a body and must navigate its interior geography to reach the site of damage.
Therapeutic attention is directed inward and must navigate the soma-field to reach
the deep attractors. The immune cells that attack the Proteus are the field's
resistance to being observed — the body's homeostatic mechanisms against awareness
(avoidance, dissociation, intellectualisation). The heart chamber is the deepest
attractor.

**Key phrase:** *"It was always the same film."*

**Key phrase:** *"The Proteus enters the body via injection. Therapeutic attention
enters the soma-field via interoception."*

*Became:* Opening of Chapter 11 in soma-field-book.md.

---

### The Feynman Diagram Formalism

*Origin:* Discussion of whether the soma-field has a perturbative expansion.

*The formalism:* Martin-Siggia-Rose (MSR) path integral over the Langevin dynamics.
The quadratic part gives the propagator (Green's function of a free mode). Off-diagonal
$W_{ij}$ couplings give the interaction vertices. The memory kernel $K(\tau)$ gives
non-local temporal vertices. Closed loops are feedback cycles; their loop integrals
give renormalisation corrections to effective coupling strength — the Feynman diagram
account of sensitisation.

*The non-perturbative sector:* Threshold crossings are invisible to any finite sum
of diagrams. They are instantons: saddle-point solutions of the Wick-rotated action.
The instanton action $S_{\text{inst}}$ determines the transition rate:
$\Gamma \propto e^{-S_{\text{inst}}}$. Deep attractors have large instanton actions.

*The therapeutic implication:* The perturbative sector (Feynman diagrams) describes
what standard desensitisation-style approaches can reach. The non-perturbative sector
(instantons) requires conditions for a full threshold crossing — cannot be reached
by accumulating small perturbative steps. This is the formal reason why some
approaches plateau.

*Became:* Appendix D of soma-field-paper.md; §11.2 of soma-field-book.md.

---

### Fractal Basin Boundaries

*Origin:* Discussion of Mandelbrot sets and attractor geometry.

*The connection:* For asymmetric $W$ matrices, the boundary between attractor basins
is not smooth. It is fractal — a Julia set of the dynamics. The Hausdorff dimension
of the boundary depends on the asymmetry of $W$ and the steepness of the threshold
nonlinearity. In a severely traumatised field, the boundary dimension approaches 2:
space-filling. The Mandelbulb visualisations are not aesthetic — they are mathematically
the correct structure for the basin boundaries of a complex nonlinear field.

*The clinical implication:* Near a fractal boundary, small perturbations have
disproportionate effects. Sessions conducted near a threshold are qualitatively
different from sessions conducted deep in a basin. The fractal structure concentrates
sensitivity at the boundary.

*Became:* §11.1 GOING DEEPER box in soma-field-book.md.

---

### The Holographic Principle (Clinical)

*Origin:* Discussion of AdS/CFT in the context of the M-theory hierarchy.

*The soma-field version:* The observable boundary of the soma-field (behaviour,
symptoms, threshold patterns, response latencies, co-activation statistics) encodes
the full interior (coupling matrix $W$, memory kernel $K(\tau)$, attractor topology).
This is a measurement theorem: with sufficiently rich boundary data, the bulk fields
are recoverable. Clinical assessment is holographic reconstruction.

**Key phrase:** *"The body tells you everything."* Not a therapeutic truism — a
measurement theorem.

*Became:* §11.4 of soma-field-book.md; §A.4 of soma-field-paper.md.

---

### The Emotional Score

*Origin:* Discussion of how a film can be defined independently of its narrative
container.

*The idea:* A film has an emotional score $\mathbf{e}^*(t)$ — a trajectory through
the emotional field space parameterised by story-time $t \in [0,1]$. The narrative
container (river, war, bloodstream, therapy session) is one realisation of the score.
The score is the invariant; the container is the variable.

**Formal statement:** $\text{Realisation} = (\mathbf{e}^*(t), \text{Container})$

*The viewer coupling:* The viewer has their own field $\mathbf{e}_V(t)$ coupled to
the screen signal: $\dot{\mathbf{e}}_V = -\nabla H_V + \lambda S(t) + \eta_V$.
The director controls $S(t)$; the viewer's response depends on $H_V$. Same film,
different voyages — because the Hamiltonians differ.

*The Conrad example:* Heart of Darkness / Apocalypse Now share a score. Upstream
= decreasing $\tau_d$ = approach to pre-verbal modes. Kurtz = deepest attractor.
The return is asymmetric: the same river, a different basin.

*Became:* §11.3 of soma-field-book.md; Parts I–IV of the-tensor.md.

---

### Serialisation / The Pensieve

*Origin:* User asked about the Harry Potter Pensieve as a metaphor for what the
soma-field score system is doing.

*The precise statement:* What Dumbledore does is **serialise** a running mental
process to persistent storage. What the soma-field score does is the same, but
for emotional dynamics rather than memory content.

| | Pensieve | Soma-field score |
|---|---|---|
| What is serialised | Memory content (events, images) | Emotional dynamics ($W$, $K$, $\mathbf{e}^*(t)$) |
| Replay | Fixed, same for every viewer | Personalised via viewer's own $H_V$ |
| Viewer's role | Passive observer | Active field participant |
| Storage unit | A specific thought | The emotional shape — valid across containers |

*The poetic version:* **Crystallise** — to fix something fluid into a reproducible
form without destroying its essential structure.

**Key phrase:** *"We are not recording emotions. We are crystallising their mathematics."*

*Became:* The Pensieve section of the-tensor.md.

---

### The Manifesto

*Origin:* Request for a 15-line manifesto for [T]-Theory.

```
The body is not a container for feelings.
It is a field.

The field has shape. It has depth. It has basins.
You fall into them. You must cross a threshold to leave.

Fear does not arrive from nowhere. It propagates.
It couples with shame. It loops. The loop consolidates.

This is not metaphor. This is physics.

We do not store memories. We store emotional mathematics:
the attractor topology, the coupling strengths,
the echo timescales of what was too much to process then.

Stories are containers. The emotional score is what they carry.
River, war, session, bloodstream — the same score, different surfaces.
The voyage in is never the same as the voyage out.

We are not recording emotions. We are crystallising their mathematics.

Different nervous systems. Same score. Different music.
```

*Line 7 is the pivot. Line 14 is the declaration. Line 15 is the coda.*

*Became:* .github-private/profile/README.md (front cover of the repo).

---

### Cardiac Acceleration as Gravity

*Origin:* Unit analysis connecting M-theory gravity to heartbeat. The observation
that BPM (beats/s) and its derivative (beats/s²) stand in the same relationship as
position and acceleration — and that gravity is an acceleration, not a position.

*The insight:*

| Quantity | Units | Tells you |
|---|---|---|
| Heart rate $H(t)$ | beats/s | Where you ARE (cardiac state) |
| $\dot{H}(t)$ | beats/s² | Where you're GOING (cardiac acceleration) |
| Gravity $g$ | m/s² | Force on a test mass |

Both $\dot{H}$ and $g$ are accelerations. The gravity analogy is not metaphorical
at the level of dimensional analysis — it is the same type.

*The dynamical consequence:* $C_{\text{HRV}}$ (current HRV coherence) modulates
the **noise floor**. $\dot{H}(t)$ (cardiac acceleration) **tilts the energy
landscape**:

$$H(\mathbf{e}, t) = H_0(\mathbf{e}) - \alpha\,\dot{H}(t)\,\boldsymbol{\beta}\cdot\mathbf{e}$$

Full extended equation:

$$\dot{\mathbf{e}}(t) = -\nabla H_0(\mathbf{e}) + \alpha\,\dot{H}(t)\,\boldsymbol{\beta}
  + R_{\text{PFC}}(\mathbf{e}, t)
  + \frac{\sigma_0}{C_{\text{HRV}}}\,\xi(t)$$

Two distinct cardiac roles: $C_{\text{HRV}}$ = state (noise); $\dot{H}$ = trajectory
(landscape tilt).

*The N+1 point:* Acceleration is predictive — it tells you the next state, not the
current one. Two patients at BPM = 90 with $\dot{H} = \pm 4$ beats/s² are at
identical snapshots but opposite trajectories. Cardiac acceleration is an early
warning signal that precedes threshold crossing at the emotional level.

*The somatic equivalence principle:* From inside the field, cardiac-driven activation
is indistinguishable from event-driven activation. The tilt of the landscape looks
the same regardless of whether it came from a threat, a memory, or a spontaneous
cardiac acceleration. The field cannot determine the origin of the tilt. Some anxiety
is cardiac in origin, misattributed to emotional cause — same signal, different source.

*Clinical precedent:* Bauer et al. (2006) — acceleration capacity (AC) and
deceleration capacity (DC) of heart rate as independent mortality predictors in
cardiology. We arrived at the same quantity from a different direction.

*For the rendering system (the-tensor.md):* $\dot{H}$ is the primary predictive
biofeedback signal. Positive $\dot{H}$ → hold at pre-threshold; soften texture;
increase resonance. Negative $\dot{H}$ → may advance score velocity.

*Became:* §3.4 extension in soma-field-paper.md; GOING DEEPER box in
soma-field-book.md Ch 3; biofeedback section update in the-tensor.md.

---

## Formal Verification — What Needs Proving

*These are the tests / negations that currently do not exist.*
*The film running = the proof compiling = all of these closed.*

| # | Claim | Where referenced |
|---|---|---|
| 1 | `energy W (step W s) ≤ energy W s` — energy descent under recall | Hopfield.lean TODO 1 |
| 2 | `step W s = s ↔` all activations consistent — fixed-point characterisation | Hopfield.lean TODO 2 |
| 3 | At least one fixed point exists for any W | Hopfield.lean TODO 3 |
| 4 | `step^[n] s` eventually stabilises — convergence | Hopfield.lean TODO 4 |
| 5 | Capacity bound: beyond ≈ 0.14·D patterns, interference dominates (negation) | Hopfield.lean TODO 5 |
| 6 | Propagator derivation: MSR action → correct Green's function | §A.2 of paper |
| 7 | Memory kernel $K(\tau)$ is bounded and square-integrable | §3.3 of paper |
| 8 | Threshold crossing rate formula $\Gamma \propto e^{-S_{\text{inst}}}$ | Appendix D.6 |
| 9 | Somatic equivalence principle (formal statement): cardiac-driven and event-driven tilts are indistinguishable from inside the field | §3.4 of paper |
| 10 | $\sigma_{\text{eff}} = \sigma_0 / C_{\text{HRV}}$ — noise floor is controlled by HRV | §3.4 of paper |

**The film as proof:** `src/SomaField.lean` (to be created) will implement the
soma-field update equation. When it type-checks and computes a recognisable attractor
trajectory for a stored emotional score, that *is* the compiled test. The film
runs = proof passes.

---

## Open Threads

*(Ideas discussed but not yet written into any document.)*

- **String diagrams as compositional therapy calculus** — Appendix C expansion.
  String diagrams as the notation for multi-agent therapeutic processes; tensor
  product = simultaneous; sequential composition = temporal sequence of interventions.

- **Patient-POV paper** (soma-field-patient-pov.md) — not updated this session.
  Parallel updates needed to reflect §2.4, §3.4, and the three-layer architecture.

- **Mode-specific cardiac coupling vector** $\boldsymbol{\beta}$ — currently set
  to $\mathbf{1}$ (uniform tilt). Clinical data may support differentiated coupling:
  e.g., fear and shame respond more strongly to cardiac acceleration than curiosity or
  safety. Requires empirical validation before adding to the main equation.

- **Jerk** — the third derivative of heart rate (beats/s³): change in acceleration.
  Used in control systems (smooth motion planning). Possible clinical correlate of
  the *rate of change of stress response*. Noted; too speculative to include yet.

- **Phase Plant macro mapping** — the-tensor.md specifies emotional modes → synthesis
  parameters conceptually. A working Phase Plant patch with macros wired to the seven
  primary modes would be the first concrete audio renderer. Engineering task.

- **EmotionML integration** — the-tensor.md and soma-field-book.md §11.5 establish
  EmotionML as the taxonomy layer beneath the soma-field dynamics layer. A formal
  mapping from EmotionML emotion categories to soma-field mode activations would be
  a useful engineering bridge document.

---

## Document Versions

| File | Current | Notes |
|---|---|---|
| soma-field-paper.md | V5 (live) | V3, V4, V5 + .V20260517 frozen |
| soma-field-book.md | V5 (live) | V3, V4, V5 frozen |
| the-tensor.md | V5 (live) | V4, V5 frozen |
| FIELD-NOTES.md | this file | started 18 May 2026 |
| .github-private/profile/README.md | manifesto | original backed up as README.original.md |

---

## Session: 18 May 2026 (post-bioRxiv)

### The String as Green's Function — and What That Changes

*Origin:* Question about the impulse response framing and its implications for string
theory and for the scope of the paper.

*The observation:* Standard string theory defines the string as THE fundamental
object. Its vibrational modes are particles. The string is ontologically primary.

The Soma-Field Model inverts this: the 1D conscious percept is the **impulse
response** (Green's function) of the 11D emotional manifold. The string is not the
thing — it is what the thing does when probed. Formally:

$$G(x, x') = \langle x | L^{-1} | x' \rangle$$

where $L$ is the differential operator governing the 11D dynamics. The string IS
the Green's function of the manifold.

**The wave implication (user-identified):**
"If what's important to the existence of something is the other thing, that means
it's a wave by definition."

Formally correct. Green's functions always satisfy $L \cdot G = \delta$ where $L$
is a wave-type operator. So if X is *defined as* the impulse response of Y, then X
satisfies a wave equation structurally — not because it oscillates but because the
ontological definition is equivalent to a wave equation solution. The wave character
is built into the category.

**Other models of what a string is — and where this model fits:**

| Model | What the string *is* | Primary object |
|---|---|---|
| Nambu-Goto / Polyakov | 1D geometric object | The string itself |
| D-branes (Polchinski) | Open string modes on higher-dim branes | The brane |
| BFSS matrix model | Off-diagonal elements of D0-brane matrices | The matrix |
| AdS/CFT (Maldacena) | String = large-N limit of boundary gauge theory | The boundary CFT |
| Ambitwistor strings (Mason & Skinner 2014) | String living in the space of null geodesics — propagation geometry, not spacetime | Propagation geometry |
| **Soma-Field Model** | String = impulse response = Green's function of 11D manifold | **The manifold's response function** |

Closest to our construction: **ambitwistor strings** — the string lives in
propagation space, not configuration space. We go one step further: the string
IS propagation.

**The historical irony:**
String theory was not discovered as a theory of strings. Veneziano (1968) wrote
down a scattering amplitude — an S-matrix entry, a response function — and
Nambu/Nielsen/Susskind later identified the string as whatever produces that
amplitude. The response came first. The string was reverse-engineered from the
response function.

Our model recapitulates this order deliberately: we keep the response function
and do not reify the string.

**The relational ontology consequence:**
If X = impulse response of Y, then:
1. X is relational — exists only in relation to Y
2. X is structurally a wave (Green's function argument above)
3. If Y is also defined by its response to X, there is no primary object — only
   the relation exists

This is Rovelli's relational QM and ontic structural realism, derived from
first principles in the Soma-Field framework.

**The clinical consequence:**
An emotion is not a thing you have. It is the field's response pattern to being
probed in a particular configuration of W and stimulus. You cannot hold an emotion
outside its context any more than you can hold an impulse response outside its
system. This is the structural reason why decontextualised emotional regulation
("just calm down") fails: it requests the Green's function of a different system
than the one running.

**The implication that makes the paper bigger:**

The model was previously framed as "using physics as a conceptual tool for
understanding emotion." The Green's function identification upgrades this.
The claim is now:

> Emotional experience and fundamental particles are the same mathematical object:
> the impulse response (Green's function) of a higher-dimensional coupling manifold.
> They differ only in the manifold's dimension and the nature of the probe.

This changes the paper from "a formal model of emotion inspired by physics" to
"a demonstration that emotional experience and physical particles share a common
mathematical structure." The analogy is not illustrative — it is the claim.

**Specific changes to make:**
1. Abstract: add sentence — "The conscious percept is identified as the
   one-dimensional impulse response (Green's function) of this manifold,
   placing emotional experience and fundamental particles in the same
   mathematical category."
2. §2.3: upgrade "QFT as conceptual tool" → "the mathematical object is
   formally the same type as objects in M-theory, not merely analogous."
3. Opening of §3: establish the primary/secondary inversion — the field
   is primary; the felt emotion is the probe response.
4. Possibly: title change. "The Soma-Field: Emotional Experience as the
   Green's Function of an 11-Dimensional Coupling Manifold."

*Status:* Not yet applied to paper. Discuss before applying.


---

## bioRxiv v2 Revision Note (draft)
*Date: May 2026 — for submission as v2 of BIORXIV/2026/725970*

**Summary of changes from v1:**

Version 2 makes a stronger central claim than Version 1.

Version 1 presented the structural correspondence with quantum field theory as a *formal
analogy* — precise in mathematical form but not claimed to be a literal identity.
Version 2 identifies the correspondence as an *exact mathematical equivalence*: the
conscious emotional percept is the one-dimensional impulse response (Green's function)
of the soma-field coupling manifold. This places emotional experience and fundamental
particles in the same mathematical category — both are poles in the propagator of their
respective underlying field. The original paper stated "not metaphor"; Version 2 states
"the same mathematics."

**Specific additions in v2:**

1. **Table 3 (§2.4): The Four Intelligence Quotients** — IQ (McCulloch & Pitts, 1943),
   EQ (Goleman, 1995), AQ (this paper), SQ (future work). Situates the soma-field
   model in the history of formal theories of intelligence.

2. **The hierarchy problem (§2.3)**: The perception threshold $T_i$ is identified with
   brane thickness in the Randall-Sundrum extra-dimension model. Alexithymia and
   hypervigilance are the two extremes of a single physical parameter.

3. **The Veneziano historical note (§2.4)**: Veneziano's 1968 identification of string
   theory by recognising the Euler beta function in scattering data is the precedent
   for the Green's function identification method used here.

4. **The WOW propagator (§2.5)**: The QFT Feynman propagator and the soma-field
   propagator displayed side by side as poles in their respective fields.
   "This is not analogy."

5. **G₂ geometry (§4.3)**: $W$ is identified as the structure tensor of a G₂ manifold.
   Trauma deforms the manifold rather than adjusting a parameter. "The practitioner is
   a geometer."

6. **BRECVEMA eigenmode identification (§2.7)**: The BRECVEMA mechanisms of musical
   emotion are identified as the rows of $W$; the eigenmodes of $W$ are the natural
   resonant responses of the system.

7. **Abstract and keywords**: Abstract upgraded with the Green's function identification
   sentence. Keywords updated to reflect the formal equivalence claim.

8. **Affiliation and bibliography**: Author affiliation added to metadata. Veneziano
   (1968) reference added to bibliography.

9. **Figures**: Six rendered matplotlib figures (Figs 0, 2, 3a, 3b, 5, B1) and three
   TikZ diagrams (Figs 1, 4, A2) added to paper/figures/.

---
