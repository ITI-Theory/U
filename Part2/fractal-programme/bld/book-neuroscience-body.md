---
title: "The Electromagnetic Nervous System: A Field-Theoretic Account of Neural Dynamics"
subtitle: "[T]-Theory Volume: Neuroscience"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
---


# Introduction: The Field Your Instruments Cannot Yet Measure

Neuroscience has a measurement problem that is rarely stated plainly. The techniques available to the working neuroscientist — fMRI, EEG, MEG, patch-clamp electrophysiology, calcium imaging, optogenetics — measure correlates of neural activity. They tell you, with extraordinary spatial and temporal resolution, which cells fired, which regions were activated, which synaptic weights changed. What they do not tell you is what was *experienced*. The gap between a measured neural correlate and the corresponding phenomenal state is not a gap that more resolution will close. It is a structural gap, arising from the fact that current instruments measure electrochemical events and infer experience; they do not measure experience directly.

This book introduces a framework that addresses the structural gap directly by proposing that felt experience is a physical field — and that this field is, in principle, measurable. The framework is the **Universal Somatic Field (USF)**, and it changes what neuroscience is looking for.

## The CEMI Field Connection

The electromagnetic theory of consciousness, developed by Johnjoe McFadden over the past two decades, proposes that consciousness is associated with the brain's endogenous electromagnetic (EM) field rather than with the spiking activity of individual neurons. The EM field integrates information across spatially separated neural populations in real time; it is influenced by neural activity and in turn influences neural activity through effects on ion channel gating. McFadden's CEMI theory accounts for a range of phenomena that neuron-only accounts struggle with: the binding problem, the temporal integration of experience, the unity of consciousness.

The USF framework subsumes and extends CEMI. The somatic tensor field $\Phi_{\mu\nu}$ reduces to the neural electromagnetic field in the appropriate limit: when the higher-order coupling terms are suppressed and the field is evaluated on the neural manifold, the field equation becomes the macroscopic Maxwell equations sourced by the brain's current distribution. McFadden is therefore not wrong; his framework is the classical limit of a richer tensor field theory. The USF provides CEMI with the missing theoretical foundation — the derivation from first principles rather than the postulation of a special status for EM fields.

## The FM-HN Architecture

The central structural result of the USF framework for neuroscience is the identification of what we call the **FM-HN architecture**: the brain operates as a Frequency-Modulated, Hopfield-Network-based field processor. The EM field is the carrier; the Hopfield energy functional defines the attractor landscape; and the coupling between the two is what generates stable experiential states from noisy neural dynamics.

In the Hopfield network formulation, the brain's emotional state space is a high-dimensional energy landscape. Stable emotional states — the basin attractors — correspond to local minima. The neural dynamics are dissipative: the system rolls downhill toward the nearest minimum. Transitions between attractors (emotional transitions) correspond to either thermal fluctuations crossing saddle points or, for larger transitions, WKB tunnelling through energy barriers. The FM aspect adds the crucial ingredient that standard Hopfield networks lack: the carrier frequency modulation allows the attractor landscape to be dynamically reconfigured by the somatic field itself, enabling the kind of moment-to-moment emotional flexibility that characterises healthy neural function.

This is not a metaphor. The FM-HN equations are derived in the papers that follow, and the parameters can be estimated from EEG spectral data.

## Arnold Tongue Width as Attentional Bandwidth

One specific and testable prediction of the framework concerns the Arnold tongue — a concept from nonlinear dynamics describing the regime of parameter space within which two coupled oscillators frequency-lock. In the USF framework, the width of the Arnold tongue for the coupling between the somatic field and an external stimulus is the neural analogue of attentional bandwidth: it quantifies how broadly or narrowly the nervous system responds to frequency perturbations.

Healthy attentional function corresponds to an Arnold tongue of intermediate width — broad enough to pick up diverse environmental signals, narrow enough to filter noise. Pathological states — anxiety, hyper-vigilance, autism spectrum conditions — correspond to either pathologically narrowed or pathologically broadened tongues. The framework predicts specific EEG signatures for each condition, and these predictions are derived from the field equations, not fitted to data post-hoc.

## The Missing Limbic Layer

Among the papers assembled here is one addressing what we call the **missing limbic layer**: the observation that standard accounts of the brain's affective processing tend to jump from subcortical structures (amygdala, hypothalamus, basal ganglia) directly to cortical computation, with the somatic field dynamics that mediate between them treated as a nuisance variable rather than as the primary computational substrate. The USF framework inverts this: the somatic field *is* the computation; the neural firing patterns are the read-out.

The missing limbic layer paper documents the specific field modes that are suppressed in common clinical conditions — depression, trauma, anxiety disorders — and proposes a field-theoretic taxonomy of affective pathology that cuts across the current symptom-based nosologies.

## The Pre-Verbal Manifold

A particularly striking application of the framework is to pre-verbal and early developmental experience. The USF framework predicts that the somatic field is present and structured from before birth — indeed, from before the cortex is mature enough to support language or explicit memory. This has implications for the encoding of early trauma, for the phenomenology of infancy, and for the theoretical basis of somatic psychotherapy traditions that have long operated empirically but without a formal framework.

The pre-verbal manifold paper formalises this: the early somatic field is a low-dimensional submanifold of the full adult field, with a restricted attractor structure corresponding to the limited but intense phenomenal range of neonatal experience.

## What This Book Offers the Neuroscientist

The papers in this volume present the USF framework from a neuroscience-centred perspective: the CEMI connection, the FM-HN architecture, the Arnold tongue width as a measurable clinical parameter, and the field-theoretic accounts of developmental and affective neuroscience. The intended reader is comfortable with systems neuroscience, has some familiarity with nonlinear dynamics, and need not have read the physics volume.

The next chapter presents the physical substrate paper, establishing the biophysical basis of the somatic field in neural tissue. Subsequent chapters develop the FM-HN architecture, the missing limbic layer, and the pre-verbal manifold. The final chapter draws out the implications for experimental design: what experiments would confirm or falsify the framework's key predictions.

The field is real. The question is how to measure it.



\newpage

---

# The Missing Layer

The Soma-Field model [@johnson2026b] establishes that the limbic system and its
somatic coupling are governed by the same formal apparatus as a quantum field on a
manifold: tensor-valued dynamics, Hopfield energy functionals, topological barriers
between attractor states. The identification is not an analogy; it is a
co-identification in the technical sense [@johnson2026a] — the governing equations
are the same equations, and every theorem of the source domain imports into the target.

That mathematical work is complete. What it leaves open is a question that sits one
level below the mathematics: *what is the body made of, such that it could host a
field like this?*

The Hopfield attractor landscape is an abstract object. For it to describe a physical
organism, there must be a physical substrate — tissue, architecture, medium — that
implements the attractor dynamics, propagates the somatic wave, and generates the
coherent state that the mathematics describes. The model says there is a somatic wave
$\mathbf{E}_\text{body}(x, t)$. The question is: what physical thing is that wave
a description of?

Three independent bodies of experimental and theoretical research converge on this
substrate. They were developed largely in parallel, each with its own language, none
formulated with the soma-field model in mind. This paper argues they are describing
the same system at three different scales of resolution:

1. **Architecture** (§2): Biotensegrity theory establishes the mechanical network
   structure through which somatic signals propagate globally. This is the physical
   basis for the spatial extent of $\mathbf{E}_\text{body}(x, t)$.

2. **Substrate** (§3): Fascial-interstitial continuity research identifies the specific
   tissue — fascia — that constitutes the body-wide signalling medium, and documents
   the interoceptive pathway from peripheral tissue to cortical representation. The
   quantitative correspondence between fascial stiffness and attractor depth is
   developed here.

3. **Field correlate** (§4): Biofield physiology documents coherent electromagnetic
   and biophotonic emissions from living tissue that are the most plausible physical
   candidates for the field itself — not the network that hosts it, but the coherent
   state that the network generates.

Section §5 states the three explicit bridges to the formal model. Section §6 lists
the testable predictions that follow.

---

# Biotensegrity: The Architecture of the Somatic Wave

## The Lever Model is Wrong

Standard physiological and biomechanical models treat the body as a rigid-lever
system: bones as struts, muscles as cables pulling across pin-joint connections,
forces transmitted locally from joint to joint. This model works tolerably well for
gross locomotion analysis but fails to account for whole-body responses to local
perturbation, and fails completely at the cellular scale.

Ingber's tensegrity model [@ingber1997; @ingber2003] replaces this with a different
architecture. In a tensegrity structure, rigid compression elements (in the body:
bone, cartilage) float within a continuous network of tension elements (fascia,
tendon, ligament, muscle), and mechanical prestress is distributed throughout the
network simultaneously. There are no isolated pin-joints: the whole system is
pre-loaded, so perturbation anywhere propagates everywhere.

Levin extended this framework to the full organism [@levin2002], arguing that
biotensegrity is not merely a useful approximation but the correct architectural
description at every scale: from the cytoskeleton of individual cells through the
deep fascial planes to gross musculoskeletal anatomy. Each scale implements the same
tensegrity geometry. Each is mechanically continuous with the others. The
architecture is fractal.

## Global Propagation

The clinical consequence of this architecture is direct: mechanical information
does not travel locally through joint-to-joint lever chains. It propagates through
the prestressed fascial network to the whole organism simultaneously, with the
spatial distribution governed by the topology and stiffness of the network rather
than anatomical lever arms.

This is experimentally documented. Langevin's group showed that needle insertion
at acupuncture points produces tissue displacement patterns propagating along
fascial planes far from the insertion point, following biotensegrity-predicted
paths rather than nerve or muscle routes [@langevin2009]. The body responds as a
continuous tensioned whole, not as a collection of local structures.

The speed of this propagation is also relevant. Neural conduction (axonal) operates
in milliseconds. Mechanical wave propagation through a prestressed medium operates
in microseconds. For fast somatic responses — the startle reflex, the breath-hold,
the full-body freeze — the biotensegrity medium is faster than the nervous system
and spatially global in a way that the nervous system, with its point-to-point
wiring, is not.

## Correspondence to the Somatic Wave

The Soma-Field model posits a somatic wave $\mathbf{E}_\text{body}(x, t)$ — a
field defined over the body, propagating continuously, carrying emotional-somatic
information. The question "how can a perturbation in one body region give rise to
a global somatic state?" has typically been answered by appeal to the nervous
system: proprioception, interoception, vagal signalling. These are real and
important, but they are axonal (slow, discrete) and do not account for the observed
speed and spatial coherence of whole-body somatic responses.

Biotensegrity provides the continuous mechanical medium the model requires. The
formal correspondence is:

> The body's biotensegrity network is the **physical implementation** of
> $\mathbf{E}_\text{body}(x, t)$. The tensor field over the body in the
> mathematical model corresponds to the mechanical stress tensor distributed
> across the fascial network in the physical organism.

Both are spatially extended. Both propagate continuously. Both couple to the neural
wave at every point: every mechanoreceptor in the fascia is a coupling node between
$\mathbf{E}_\text{body}$ and $\mathbf{E}_\text{neural}$.

The somatic wave is not *like* a wave in a continuous medium. In the fascial network,
it *is* a wave in a continuous medium. The co-identification [@johnson2026a] is
architectural.

---

# Fascial-Interstitial Continuity: The Pathway and the Armoring

## Fascia as Active Signalling Tissue

The classical anatomical view of fascia — as inert white packaging, the sheaths
that dissectors clear away to reach the "real" anatomy — was overturned by
experimental work beginning in the 1990s.

Schleip's review [@schleip2003] documented that fascia contains all four classes of
mechanosensory nerve endings: Ruffini corpuscles (respond to lateral stretch),
Golgi tendon organs (respond to compression), Pacinian corpuscles (vibration and
rapid changes), and type IV free nerve endings (polymodal: mechanical deformation,
temperature, chemical changes). The type IV endings are especially significant:
they project primarily to the insular cortex via lamina I of the spinal cord —
the Craig interoceptive pathway [@craig2003] — and constitute the neurological
substrate of body-felt emotional experience, not merely visceral sensation.

Langevin's work established that fascia actively participates in signalling:
mechanical deformation produces fibroblast shape changes, cytoskeletal
reorganisation, and gene expression changes on timescales from seconds to minutes
[@langevin2009]. The tissue is a transducer, not a cable.

Oschman's "living matrix" model [@oschman2016] extends this further: the entire
connective tissue system — fascia, interstitium, extracellular matrix — constitutes
a continuous liquid-crystalline semiconductor network. Piezoelectric effects in
collagen generate electrical potentials under mechanical stress. DC currents flow
through the network continuously. The fascial system is simultaneously mechanical,
chemical, and electrical.

## The Interoceptive Pathway

Interoception — the body's sensing of its own internal state — is the somatic input
channel of the Soma-Field model. It is the mechanism by which the body schema is
updated and by which the energy functional of the attractor landscape is computed.

The fascial pathway of interoception is now well characterised [@schleip2003;
@craig2003; @garfinkel2016]: type IV free nerve endings in deep fascia, visceral
fascia, and interstitial tissue → lamina I neurons of the dorsal horn → thalamus →
anterior insular cortex. This is the Craig pathway, increasingly recognised as the
neurological substrate of emotional experience proper, distinct from and
complementary to the classical somatosensory pathway.

The clinical implication is direct: interoceptive dysfunction (well documented in
ASC, CPTSD, and related conditions) [@garfinkel2016] is dysfunction of the
fascial-to-insular projection. It is not merely a processing deficit in higher
cortical areas; it originates in the tissue. Restoring interoceptive accuracy
therefore requires working at the fascial level — which is precisely what somatic
therapies (Somatic Experiencing, Sensorimotor Psychotherapy, EMDR somatic protocols,
myofascial release) do, whether or not they are theorised in those terms.

## Fascial Armoring as Attractor Depth

This section develops the most important connection in this paper.

Wilhelm Reich introduced "character armoring" — the clinical observation that chronic
emotional states (fear, shame, traumatic holding) produce corresponding patterns of
chronic muscular and somatic tension. The observation was clinically compelling but
had no formal model. It was a phenomenology without a mechanism.

Schleip and subsequent workers (Stecco, Bordoni, Bhatt) documented the fascial
component: chronic trauma produces not merely chronic muscular contraction but
*measurable changes in fascial stiffness*, quantifiable by ultrasound elastography
[@schleip2003]. High-trauma individuals show significantly elevated fascial stiffness
in characteristic body regions, with the spatial pattern reflecting the specific
trauma history. The psoas, diaphragm, and posterior cervical chain are typically
implicated in chronic fear responses; the pericardium and thoracic fascia in grief
and heartbreak; the pelvic floor in sexual trauma. These are not metaphors. They
are measured tissue properties.

In the Hopfield model, the attractor landscape is characterised by energy barriers
$W_{ij}$ between attractor states. The Fear basin has a high energy barrier. The
computational experiment QUANT-EXP-1 [@johnson2026c] shows that cold classical
dynamics cannot cross a barrier of $W = -8$ to $W = -14$.

The bridge:

$$\text{fascial stiffness at region } r \;\leftrightarrow\; |W_{ij}| \text{ for state transition involving } r$$

High fascial stiffness = high energy barrier. The organism is mechanically locked
into the Fear attractor not only neurologically but anatomically — the tissue itself
has been remodelled to implement the barrier. This is why van der Kolk's title
[@vdkolk2014] is accurate in a way he could not have fully formalised: the body
does not merely *express* the trauma; it *encodes* the attractor depth in its
mechanical structure.

The quantitative claim is: the QUANT-EXP-1 barriers $W = -8, -10, -12, -14$ have
physical correlates in fascial stiffness values measurable in kPa (shear wave
elastography units). The mapping is not known yet — establishing it is part of the
empirical programme in §6 — but the existence of the correspondence is now
claimed by this paper.

## Myofascial Release as Barrier Lowering

QUANT-EXP-1 demonstrates that quantum annealing can cross barriers that classical
cold dynamics cannot. This was framed computationally. The fascial literature
provides a physical translation that clarifies an important distinction.

**Classical barrier crossing** (hot classical or quantum):
The system transitions from one attractor to another while the barrier remains intact.
This corresponds to either high-arousal state transitions (classical thermal, i.e.
highly activated emotional states) or the quantum mechanism identified in QUANT-EXP-1.

**Myofascial release** (barrier reduction):
Manual intervention directly reduces fascial stiffness — measured pre/post by
elastography. This does not push the system over the barrier. It *lowers* the
barrier so that transitions become accessible by classical means.

This distinction — barrier lowering versus barrier crossing — may explain the
phenomenology of different therapeutic modalities and why they are experienced
differently:

- Somatic bodywork (Rolfing, myofascial release, craniosacral) *reshapes the landscape*.
  The client often reports gradual deepening ease, reduction of chronic holding, and
  access to emotional material that was previously unavailable without drama.
- High-intensity interventions (EMDR reprocessing, breathwork, certain trauma
  protocols) may be *crossing a barrier that remains intact*: sudden, non-linear
  transitions, sometimes dramatic releases, the characteristic "before and after"
  quality of a topological transition.

Both produce movement in the attractor landscape. The mechanism is different. The
soma-field model, grounded in the fascial correspondence, now predicts this
difference and makes it testable (§6).

---

# Biofield Physiology: The Field Correlate

## Living Systems Emit Coherent Fields

The soma-field is a mathematical field — an abstract object defined by its equations.
For it to be physically real rather than merely useful, it must have a physical
correlate: some measurable property of the organism that corresponds to the field's
state. Three lines of evidence point toward coherent electromagnetic and biophotonic
emissions as candidates.

**Biophoton emission** [@popp2003]:
All living cells emit ultra-weak light in the visible to near-UV range. This is not
blackbody radiation (which would require far higher temperatures) but coherent
emission with photon statistics more consistent with laser emission than thermal
sources. Popp argues that this biophotonic field constitutes a real-time
communication channel, carrying coherent information across tissue faster than any
biochemical signal. The field is state-sensitive: stress, illness, and emotional
perturbation all produce measurable changes in biophotonic emission patterns.

**Liquid crystalline living matrix** [@ho1998]:
Ho's model proposes that the connective tissue system — specifically the liquid
crystalline ordering of collagen, water, and proteoglycans — constitutes a quantum
coherent medium. Proton conduction and electronic charge delocalisation through this
medium produce a macroscopic coherent quantum state distributed across the organism.
This is not the Penrose-Hameroff proposal (which is neuron-centred and operates via
microtubules); Ho's coherent organism is body-centred, connective tissue-centred,
and is precisely the medium in which the Soma-Field would propagate as a physical
entity.

**Heart-brain coherence** [@mccratychildre2010]:
The heart generates a toroidal electromagnetic field measurable at distances from
the body, with spectral content reflecting the organism's emotional state.
Heart rate variability (HRV) in the low-frequency band (approximately 0.1 Hz)
indexes the balance between sympathetic and parasympathetic regulation — the
physiological correlate of transitions between Fear-dominant and Awe-dominant states
in the soma-field model. McCraty's group demonstrates that this field entrains
between proximate individuals: measurable cardiac coherence synchronisation occurs
between therapist and client, between individuals in rapport, and between individuals
and coherent social environments. This entrainment is not inferred; it is measured
by simultaneous ECG recording.

## The Rubik Synthesis

Rubik, Muehsam, Hammerschlag, and Jain [@rubik2015] published a systematic review
of the biofield hypothesis in 2015, collating evidence from biophoton research,
bioelectromagnetics, traditional medicine, and clinical trials. Their conclusion is
deliberately conservative: the biofield hypothesis — that living organisms generate
and respond to coherent electromagnetic and biophotonic fields beyond what is
explained by classical biochemistry — is supported by a substantial and growing body
of evidence, but mechanism and theoretical framework remain contested.

From the Soma-Field perspective, the contest is tractable: the theoretical framework
is the quantum field on a Hopfield attractor landscape, and the biofield is the
physical manifestation of that field. The soma-field model does not prove the biofield;
it provides the theoretical frame within which the biofield evidence becomes
interpretable rather than anomalous.

What the soma-field predicts is that the biofield — whatever its physical implementation
— will show attractor-like behaviour: it will tend to occupy characteristic states,
resist perturbation away from those states, and show non-classical transitions
between states when the barrier is sufficiently large. HRV coherence, biophotonic
emission, and DC skin conductance are all candidate observables. Which observable
best couples to which component of the tensor field is an empirical question that
this model now makes precise enough to ask.

## Scope and Epistemic Status

The biofield section of this argument carries more epistemic weight than §§2–3, and
this should be stated explicitly. Biotensegrity and fascial signalling are
well-supported by peer-reviewed experimental evidence in mainstream biomechanics,
cell biology, and clinical science. The biofield claims are supported by evidence in
a more contested terrain, and the proposed identification between the soma-field's
formal structure and the organism's EM/biophotonic emissions is a hypothesis, not
an established result.

What this paper claims in §4 is modest: these are the best current physical candidates
for the field correlate; they are consistent with the formal model; they generate
testable predictions (§6). The stronger claim — that the soma-field *is* the biofield,
formally — requires empirical work that does not yet exist.

---

# Three Bridges to the Formal Model

This section states the three principal connections between the physical substrate
literature and the formal soma-field model, in a form that makes their testability
explicit.

## Bridge 1: Fascial Armoring = Attractor Depth

**Physical claim** [@schleip2003]: Chronic trauma produces chronically elevated
fascial stiffness, measurable by ultrasound shear-wave elastography, with
characteristic spatial patterns reflecting trauma type and history.

**Formal correspondence**: Fascial stiffness at region $r$ maps to $|W_{ij}|$, the
energy barrier between attractor states $i$ and $j$ in the Hopfield network, where
$r$ is the somatic representation zone of the relevant emotional state pair.
High stiffness = high barrier = deep attractor basin.

**Testable prediction (P1)**: Populations with documented high-barrier emotional
states (CPTSD, complex trauma, chronic anxiety disorder) should show systematically
elevated fascial stiffness in regions corresponding to the somatic representation
of those states (diaphragm, psoas, posterior cervical chain), compared with matched
controls. This is measurable by ultrasound elastography independently of any
subjective report, and the effect should be graded by trauma severity.

## Bridge 2: Myofascial Release = Barrier Lowering

**Physical claim** [@schleip2003]: Manual and movement-based interventions that
target the fascial network produce measurable reductions in fascial stiffness and
corresponding changes in interoceptive sensitivity and emotional availability.

**Formal correspondence**: These interventions reduce $|W_{ij}|$. They do not
necessarily produce a state transition; they reshape the energy landscape to make
transitions more accessible. If initial barrier is $W = -12$ and intervention reduces
it to $W = -6$, QUANT-EXP-1 results [@johnson2026c] suggest that classical thermal
dynamics can now cross what previously required quantum assistance.

**Testable prediction (P2)**: The probability of emotional state transition following
myofascial release should increase monotonically with the degree of reduction in
fascial stiffness. This is testable by measuring both pre/post fascial stiffness
(elastography) and pre/post emotional state (validated affect measures + HRV) in a
within-subjects design across a series of somatic therapy sessions.

**Testable prediction (P3)**: The phenomenological *character* of the transition
should differ predictably: sessions that lower the barrier significantly should
produce gradual, integrative shifts; sessions that trigger a crossing of a high
barrier (large, rapid state transition) should produce different qualitative reports.
The model predicts this without any additional assumptions.

## Bridge 3: Therapist-Client Entrainment = Co-Identification

**Physical claim** [@mccratychildre2010]: In effective therapeutic contact,
measurable physiological entrainment occurs between therapist and client — cardiac
coherence synchronisation, mutual modulation of HRV spectra, and (in contact work)
fascial tension synchronisation. This is not inferred; it is measured by simultaneous
ECG and, in some studies, by direct force measurement.

**Formal correspondence**: This is the physical mechanism of **co-identification**
[@johnson2026a] — the process by which the observer's soma-field is modified by
contact with another's soma-field. The mathematical treatment describes this as a
tensor product coupling; the physical implementation is fascial and
electromagnetic entrainment. The therapist does not merely witness the client's
state; the therapist's attractor landscape is temporarily modified by coupling to
the client's, and this modification is the mechanism of therapeutic resonance.

**Testable prediction (P4)**: The degree of measurable physiological entrainment
(HRV coherence synchronisation) between therapist and client should predict
therapeutic outcome — reduction in client fascial stiffness and shift in validated
affect measures — independently of the specific technique used. Sessions with high
physiological coherence should outperform sessions with low coherence, across
modality.

---

# Testable Predictions

The bridges in §5 generate six primary empirical predictions, ordered from most to
least accessible with current instrumentation:

| # | Prediction | Method | Population |
|---|---|---|---|
| P1 | CPTSD/complex-trauma populations show elevated fascial stiffness in diaphragm, psoas, posterior cervical chain vs matched controls | Shear-wave ultrasound elastography | CPTSD vs. controls (n $\geq$ 40 per group) |
| P2 | Somatic intervention reduces fascial stiffness; degree of reduction predicts probability of self-reported emotional state shift | Elastography pre/post + validated affect measures | Somatic therapy clients (within-subjects) |
| P3 | Barrier-lowering sessions (gradual stiffness reduction) produce qualitatively different transition phenomenology from barrier-crossing sessions (acute large shifts) | Mixed methods: elastography + structured interview | Rolfing or myofascial release series |
| P4 | Therapist-client HRV coherence predicts session outcome independently of technique | Simultaneous ECG coherence + validated outcomes | Therapist-client dyads, multiple modalities |
| P5 | Biophotonic emission from CPTSD populations differs from controls at characteristic emission bands (500–800 nm) | Ultra-weak photon measurement (photomultiplier) | CPTSD vs. controls |
| P6 | Transitions from Fear-dominant to Awe-dominant states (as defined by QUANT-EXP-1 attractor labels) correlate with measurable HRV spectral shift from LF-dominant to HF-dominant | HRV spectral analysis + soma-field state labelling instrument | Clinical transition cases |

Predictions P1–P4 are testable with instrumentation available in clinical research
centres now. P5 requires specialised biophoton detection (available in approximately
a dozen research centres worldwide). P6 requires the prior development of a validated
soma-field state classification instrument — a prerequisite for large-scale empirical
work that is not yet available and is noted as the primary methodological gap in this
programme.

---

# Conclusion

The Soma-Field model describes a field of emotional dynamics that is formally
equivalent to a quantum field on an attractor manifold. This paper has argued that
the physical substrate of that field consists of three interlocking systems:

1. The **biotensegrity network** (fascia, connective tissue, interstitium under
   prestress) that provides the continuous mechanical medium through which the somatic
   wave $\mathbf{E}_\text{body}$ propagates globally and rapidly [@ingber1997;
   @ingber2003; @levin2002].

2. The **fascial interoceptive pathway** (type IV free nerve endings → lamina I →
   thalamus → insula) that constitutes the body-to-brain projection of somatic state
   [@schleip2003; @craig2003], and whose chronic remodelling under trauma — fascial
   armoring — is the physical implementation of the deep attractor basin.

3. The **bioelectric and biophotonic field** generated by the liquid crystalline
   living matrix and the cardiac electromagnetic environment [@ho1998; @popp2003;
   @mccratychildre2010], which constitutes the best current physical candidate for
   the soma-field correlate itself.

The most clinically significant result of this identification is Bridge 1: the
quantitative correspondence between fascial stiffness and attractor depth. This makes
concrete a claim that somatic therapists have held for decades — that trauma is held
in the body, not only in the mind — and extends it: the depth at which trauma is
held is measurable by elastography, and the degree to which physical intervention
changes that depth is also measurable. The soma-field model predicts that large
barriers require quantum-assist crossing; the fascial model predicts that those same
barriers are associated with measurable tissue-level changes. The two predictions
are about the same phenomenon at two levels of description.

Bridge 3 — therapist-client entrainment as co-identification — connects this to
the broader programme [@johnson2026a]. The therapist's role is not neutral
observation but active field coupling. The mathematics of co-identification
[@johnson2026a] now has a proposed physical mechanism: fascial and electromagnetic
entrainment, measurable, manipulable, and predictive of outcome.

This paper opens a research programme. The six predictions in §6 define the empirical
agenda. The formal soma-field model provides the theoretical frame. The three bodies
of literature reviewed here provide the biological grounding. Together they constitute
a foundation for a genuinely interdisciplinary field — one that does not require the
reader to choose between the body and the mathematics, because the mathematics is
about the body.

---



\newpage

# Introduction

The history of neural network theory contains a conspicuous gap. Hopfield (1982)
established that a symmetric weight matrix defines an energy function whose minima
are stored patterns, and that synchronous updates descend that energy monotonically.
Ramsauer et al. (2020) demonstrated that replacing the quadratic energy function
with an exponential (log-sum-exp) formulation yields exponentially higher storage
capacity and, crucially, one-step convergence. Both results are mathematically
correct.

Neither, however, accounts for the body.

In biological neural systems, the cortical network is not an isolated processor.
It is continuously bathed in a whole-body electromagnetic field generated by
synchronized neural oscillations — the Conscious Electromagnetic Information (CEMI)
field identified by McFadden (2002a, 2002b). This field is not a passive byproduct.
It modulates neuronal firing thresholds, alters synaptic gain, and has been argued
to constitute the physical substrate of conscious awareness.

The **missing limbic layer** is the mathematical machinery that connects this
body-wide somatic field to the cortical Hopfield dynamics. Without it, the
classical and modern Hopfield models describe an isolated neocortex — a frozen
cognitive substrate with no access to the organism's survival state. The result
is a well-studied failure mode: permanent entrapment in locally stable but
globally suboptimal attractors. In computational terms, this is a stuck
optimisation. In clinical terms, it is trauma.

This paper provides the missing layer. We define two runtime coupling equations
that bind the CEMI field to Hopfield dynamics, prove their correspondence limit,
and characterise the distinct dynamical regimes they produce.

---

# Background

## Hopfield Networks 1982 (Classical)

The 1982 Hopfield Network stores $N$ binary patterns $\{\xi^\mu\}_{\mu=1}^N$,
$\xi^\mu \in \{-1, +1\}^D$, via Hebbian learning:

$$W_{ij} = \frac{1}{N} \sum_{\mu=1}^{N} \xi^\mu_i \xi^\mu_j, \quad W_{ii} = 0$$

The energy function is the Ising Hamiltonian:

$$E_{82}(s) = -\frac{1}{2} s^T W s$$

and the synchronous update rule:

$$s_i \leftarrow \text{sign}\left(\sum_j W_{ij} s_j\right)$$

descends $E_{82}$ monotonically. Stored patterns are local energy minima.
The network is guaranteed to converge to a fixed point in finite steps.
Storage capacity is approximately $0.14 \cdot D$ patterns before
interference degrades recall [@hopfield1982].
The weight matrix requires $\mathcal{O}(D^2)$ storage and each update step
costs $\mathcal{O}(D^2)$ operations.

The fundamental limitation: once in a local minimum, the network cannot escape.
There is no internal mechanism to overcome a topological barrier. Resets require
an external stochastic perturbation.

## Modern Hopfield Networks 2020 (Exponential)

Ramsauer et al. (2020) generalise to continuous states $\xi \in \mathbb{R}^D$
and replace the quadratic energy with the log-sum-exp function:

$$E_{20}(\xi) = -\frac{1}{\beta}\log \sum_{\mu=1}^{N} \exp\!\left(\beta\, \xi^{\mu T} \xi\right)
  + \frac{1}{2}\|\xi\|^2 + C$$

where $\beta > 0$ is the inverse temperature and $X \in \mathbb{R}^{N \times D}$
stores patterns as rows. The update rule:

$$\xi \leftarrow X^T \cdot \text{softmax}(\beta \cdot X \xi)$$

converges in a **single step** for well-separated patterns — an $\mathcal{O}(1)$
retrieval, down from $\mathcal{O}(D)$ iterations in the 1982 model.
Exponential storage capacity ($e^{D/2}$ patterns) replaces the linear $0.14D$ bound.
Each update costs $\mathcal{O}(N \cdot D)$ where $N$ is the number of stored patterns.

The key parameter is $\beta$. Its role is inherited from statistical mechanics:
high $\beta$ (low temperature) means sharp, deterministic updates; low $\beta$
(high temperature) means diffuse, uncertain updates. In the 2020 model, $\beta$
is a fixed hyperparameter, set at training time and frozen thereafter.

This is the second missing element: $\beta$ does not vary with the organism's
state.

---

# The Missing Limbic Layer

## The CEMI Field as a Runtime Parameter

McFadden's CEMI field theory (2002a, 2002b) proposes that the brain's
endogenous electromagnetic field — generated by synchronised dendritic oscillations
across the cortex — constitutes the physical substrate of somatic awareness.
Crucially, this field feeds back onto neuronal firing thresholds. A stronger
CEMI field lowers firing thresholds globally, increasing the effective network
temperature. A weaker field raises thresholds, freezing the network into its
current attractor.

In the Soma-Field model [@johnson2026b], the limbic system occupies the 1D
segment $D_8$ connecting the somatic body-field ($D_{1-7}$) to the cortical
mind-field ($D_{9-11}$). The amplitude of the CEMI field at any moment is a
scalar function of the system's position along $D_8$:

$$\Phi_\text{limbic}(t) \in [0, 1]$$

where $\Phi = 0$ denotes homeostatic calm and $\Phi = 1$ denotes maximum
threat activation (fight/flight/freeze).

## The Two Coupling Equations

We introduce two runtime modulation equations binding $\Phi_\text{limbic}$
to Hopfield dynamics.

**Equation 1 — Temperature Modulation:**

$$T(t) = T_0 + \sigma \cdot \Phi_\text{limbic}(t)$$

$$\beta(t) = \frac{1}{T(t)} = \frac{1}{T_0 + \sigma \cdot \Phi_\text{limbic}(t)}$$

where $T_0 > 0$ is the baseline temperature and $\sigma > 0$ is the limbic
coupling strength. As $\Phi \uparrow$, temperature rises, $\beta$ drops,
and the softmax distribution flattens — energy barriers become traversable.

**Equation 2 — Weight Modulation (Ephaptic Gain):**

$$W(t) = W_0 + \gamma \cdot \Phi_\text{limbic}(t) \cdot J$$

where $J \in \mathbb{R}^{D \times D}$ is the limbic coupling matrix encoding
which attractor connections are subject to somatic override, and $\gamma > 0$
is the ephaptic gain coefficient. The CEMI field physically alters synaptic
thresholds (ephaptic coupling), changing the effective weight landscape in
real time.

## The FM-HN Update Rule

Substituting both coupling equations into the 2020 update rule:

$$\xi(t+1) = X^T \cdot \text{softmax}\!\left(\beta(t) \cdot (W_0 + \gamma\Phi(t) J) \,\xi(t)\right)$$

This is the Field-Modulated Hopfield Network (FM-HN). The Lean 4 types for
all quantities are defined in `LimbicHopfield.lean` (namespace `LimbicHopfield`).

---

# The Correspondence Principle

The FM-HN must not discard established science — it must encapsulate it.
Bohr's Correspondence Principle demands that any new theory reproduce the
predictions of the theory it extends in the appropriate limit.

**Theorem (Correspondence Principle, Lean-verified):**
Under zero somatic stress $\Phi_\text{limbic} = 0$:

$$T(t) = T_0, \quad W(t) = W_0$$

*Proof.* Substituting $\Phi = 0$ into Equations 1 and 2:

- $T = T_0 + \sigma \cdot 0 = T_0$ (direct substitution)
- $W = W_0 + \gamma \cdot 0 \cdot J = W_0$ (direct substitution)

Both coupling terms vanish. $\square$

This is `LimbicHopfield.correspondence_principle` — proved in Lean 4 by `simp`
from the definitions. No `sorry`. No `admit`. Just Prove It.

**Corollary (Classical Limit):** As $\beta \to \infty$ (cold, calm, $T \to 0$),
the 2020 update converges pointwise to the 1982 `sign` update:

$$\lim_{\beta \to \infty} \text{softmax}(\beta \cdot z)_i = \mathbf{1}[i = \arg\max z]$$

For binary patterns with $z \in \{-1, +1\}$, $\arg\max z = \text{sign}(z)$.
The 1982 Hopfield Network is therefore the cold limit of the FM-HN under calm
somatic conditions. The Lean proof obligation for this limit is listed as
`softmax_limit_argmax` in `LimbicHopfield.lean` (requiring real analysis scaffolding).

---

# Falsifiability: The Reachability Trap Protocol

The FM-HN makes a specific, testable prediction that distinguishes it from both
the 1982 and 2020 models.

**Setup.** Construct a Hopfield network with two patterns $\xi^+$ (healthy
attractor) and $\xi^-$ (trauma attractor) separated by a barrier of height $W$.

1. **Initialise** the network state at $\xi^- + \varepsilon$ (near the trauma well).
2. **Classical condition**: set $\Phi = 0$ throughout. Record whether the network
   reaches $\xi^+$ in $T_\text{max}$ steps.
3. **FM-HN condition**: apply a $\Phi(t)$ ramp from 0 to $\Phi_\text{max}$
   over $T_\text{ramp}$ steps, then return to 0. Record whether the network
   reaches $\xi^+$.

**Prediction.** Classical dynamics cannot escape $\xi^-$ for any barrier
height $W > 0$ (classical trapping, `LimbicTunnel.classical_trapped`).
FM-HN dynamics escape $\xi^-$ with probability bounded below by
$\Theta(W) = \exp(-8\sqrt{2W}/3)$ (`LimbicTunnel.wkbAmplitude_pos`).

The empirical confirmation of this prediction for $W \in \{8, 10, 12\}$ is
documented in QUANT-EXP-1 [@johnson2026c]: quantum annealing achieved 3/3
escapes; classical dynamics achieved 0/48.

---

# Neurodivergent Operator Modifications

The FM-HN framework naturally accounts for three neurodivergent conditions
as distinct $(\beta, J, W)$ configurations.

## ADHD Operator

High baseline temperature: $T_\text{ADHD} \approx 1.8 \cdot T_0$.
Low $\beta$ at baseline means the network never fully freezes into any
attractor. Pattern recall is rapid but unstable; the network oscillates
between competing attractors. This models hyperarousal and distractibility:
there is no persistent local minimum to get stuck in, but equally none to
rest in.

Formally: `LimbicHopfield.adhdOperator` sets $T = 1.8 \cdot T_\text{base}$.

## Autism Spectrum Condition Operator

Low baseline temperature: $T_\text{ASC} \approx 0.4 \cdot T_0$.
High $\beta$ creates very deep, narrow attractor basins. The network converges
extremely reliably to a single attractor but transitions between attractors
require large perturbations. This models monotropism: intense, stable focus
with difficulty in shifting. Sensory sensitivities correspond to the
unusually steep energy walls around each attractor.

Formally: `LimbicHopfield.autismOperator` sets $T = 0.4 \cdot T_\text{base}$.

## Complex PTSD Operator

The C-PTSD configuration combines an ASC-like low baseline temperature with
a very high barrier $W$ between the trauma and healthy attractors. The network
is cold (difficult to perturb) AND the barrier is tall. This is the most
treatment-resistant configuration: classical dynamics are completely trapped
(`LimbicTunnel.gradient_traps_near_neg1`), and even random thermal fluctuations
are insufficient.

The FM-HN prediction is specific: limbic modulation must raise $\Phi$ to the
point where $\beta(\Phi)$ drops below the WKB threshold for the given $W$.
For $W = 12$ (QUANT-EXP-1 maximum barrier), this requires
$\Phi_\text{min} \approx \sigma^{-1}(T_\text{WKB} - T_0)$.

Formal barrier height: `LimbicHopfield.cptsdBarrierW = 12.0`.
WKB amplitude: `LimbicTunnel.wkbAmplitudeF 12 ≈ 2.1e-6`.

The three operators satisfy: `LimbicHopfield.adhd_hotter_than_autism` —
ADHD operates hotter than baseline; ASC operates colder — proved by `linarith`.

---

# Discussion

## Why the 1982 and 2020 Networks Are Both Right

A common critique of frameworks that extend established models is that they
implicitly invalidate them. The FM-HN explicitly does not.

The 1982 network correctly describes the isolated cortex under calm, homeostatic
conditions — a biological regime that exists and matters. Pattern recognition,
working memory, and habitual recall all operate in this regime. The network
is not wrong; it is incomplete.

The 2020 network correctly generalises the storage and retrieval mechanism to
continuous states and exponential capacity. It remains incomplete in the same
way: $\beta$ is fixed.

The FM-HN is the completion. Under $\Phi = 0$ and $\beta \to \infty$, it is
provably identical to the 1982 network. Under $\Phi = 0$ with finite $\beta$,
it is the 2020 network. The FM-HN adds one thing only: $\Phi$ varies, and
$\beta$ and $W$ vary with it.

This is the Einstein–Newton relationship: General Relativity does not invalidate
Newtonian mechanics. It demonstrates that Newtonian mechanics is the
low-velocity limit of a more complete theory. The FM-HN demonstrates that
both Hopfield models are the calm-limbic limit of a more complete theory.

## Relation to QUANT-EXP-1

The QUANT-EXP-1 quantum annealing experiment [@johnson2026c] provides the
empirical validation for the tunnelling component of the FM-HN. Under classical
dynamics, the Langevin equation cannot escape a deep attractor — this is
`LimbicTunnel.classical_trapped`. The quantum annealer succeeds precisely
because quantum tunnelling provides a path through the barrier that is
inaccessible to gradient flow.

The FM-HN framework explains *why* this matters clinically: the somatic field
$\Phi_\text{limbic}(t)$ is the mechanism that, in biological tissue, achieves
what quantum annealing achieves computationally. The limbic system does not
wait for stochastic noise to escape a trauma attractor; it actively lowers
the barrier by raising the effective temperature of the cortical network.

## Lean 4 Verification

The core algebraic results in this paper are type-checked in Lean 4 (v4.28.0)
using Mathlib. The companion file `LimbicHopfield.lean` contains:

- `correspondence_principle` — proved by `simp`
- `stress_raises_temp` — proved by `linarith`
- `modulation_monotone` — proved by `linarith`
- `adhd_hotter_than_autism` — proved by `linarith`
- `softmax_nonneg`, `softmax_sum_one` — proved
- `lse_ge_max` — proved

Proof obligations pending real-analysis scaffolding:
`softmax_limit_argmax`, `energy_descent_modern`, `correspondence_limit`.

---

# Conclusion

The Field-Modulated Hopfield Network resolves the isolation problem at the
heart of classical and modern associative memory models. By binding the somatic
electromagnetic field to the network's temperature and weight parameters via
two coupling equations, the FM-HN provides a biologically grounded mechanism
for runtime escape from local minima.

The framework satisfies the Correspondence Principle by construction: under
zero somatic stress, both coupling equations vanish and the FM-HN reduces
exactly to the standard 2020 Hopfield update. Under high somatic stress, the
barriers melt, and the network dynamics enter the quantum tunnelling regime
characterised by QUANT-EXP-1.

The three neurodivergent operator modifications (ADHD, ASC, C-PTSD) are not
ad hoc additions but emergent properties of the same $(\beta, J, W)$
parameter space. They are computationally distinct regimes, not clinical
labels applied post hoc.

The formal apparatus — field decomposition, correspondence proof, operator
characterisation — is type-checked in Lean 4. The empirical apparatus —
3/3 quantum escape vs 0/48 classical — is documented in QUANT-EXP-1.

The limbic layer was not missing from the organism. It was missing from the model.

---



\newpage

---

> *"Once a researcher has lived through the thing he is trying to explain,
> the question of whether his explanation will be taken seriously by
> researchers who have not is, in the end, a sociological question, not
> a scientific one. The scientific question is whether the explanation is
> correct."*

---

# 1. Introduction

The standard developmental-psychiatric apparatus assumes that the first
observable symptoms of a neurodevelopmental condition occur in a
language-capable child. Autism, in DSM-5 and ICD-11, is defined operationally
through behavioural criteria — social communication, restricted interests,
sensory differences — that are scored on children old enough to be observed
in linguistic interaction. ADHD requires observable inattention or
hyperactivity in structured settings. Attachment disorders are coded against
attachment-figure behaviour rated by adults. C-PTSD requires a referent
trauma and a self-reportable symptom set.

This apparatus works tolerably well for cases in which the relevant
developmental events occur within its observational window. It fails — quietly,
and with the failure absorbed into "comorbidity" — for cases in which the
critical events occur *before* it begins to observe.

This paper presents one such case. The author was hospitalised in infancy
with septic arthritis of the hip at approximately 15 months of age, spent
three months in hospital and three months immobilised in plaster, retained
a permanent 1.3 cm leg-length discrepancy, and did not speak until age 3.5.
He was diagnosed with Autism Spectrum Condition, ADHD, and Complex PTSD
fifty-four years later, in 2020. The diagnostic narrative offered at that
time — that the autism was congenital and the C-PTSD was acquired — does
not survive close inspection of the developmental record. The two were not
sequentially layered. They co-developed, in a pre-verbal window, around a
specific physical insult, against a substrate of probable familial loading
and demonstrably low maternal attunement.

The paper proceeds as follows. §2 fixes terminology and introduces the
*pre-verbal manifold*. §3 presents the case in five strata: substrate,
acute insult, attachment environment, institutional environment, adult
trajectory. §4 reviews the five established literatures the case sits
inside. §5 develops the Soma-Field reading. §6 discusses the *twice-exceptional*
cognitive profile (Mottron et al., 2006; Foley-Nicpon et al., 2011) that the
manifold produced. §7 reads the 2017–2024 adult collapse arc as a sequence of
basin transitions under perturbation. §8 presents Exhibit A: a public
secondary-school SEN-support policy that exemplifies the policy-level
amplification mechanism. §9 returns to the formal model and offers
ten testable predictions. §10 is the replication ledger and limitations
section. §11 closes with the policy implications.

A note on method. This is N = 1. The paper does not claim to establish
epidemiological generalities; it claims to construct a *formal object* — the
pre-verbal manifold — and to demonstrate that a single fully-documented case
already exhibits properties the object predicts and that standard onset-based
categories miss. Whether the formal object extends to a population is an
empirical question. §10 specifies the design that would settle it.

---

# 2. Terminology and the Pre-Verbal Manifold

The *Soma-Field* (Johnson, 2026a, 2026d) is the tensor-valued amplitude
field whose local exceedances over a sensory threshold constitute felt
experience, and whose energy landscape — borrowed in form from Hopfield
network theory (Hopfield, 1982, 1984) — supplies the basin structure of
affect, attention and self-regulation. The field is coupled to the body
and nervous system through an operator *K* (Johnson, 2026e). Pathology
in the framework is not located in *the field* or *the body* in isolation
but in the *coupling*.

The *pre-verbal manifold* is the substructure of the Soma-Field that is
laid down during the sensitive-period window from gestation through
approximately age 3, after which language acquisition (Tomasello, 2003)
provides additional structure that re-parametrises the manifold but does
not erase its lower layers. This is the period during which right-hemisphere
implicit-relational structures (Schore, 2001), basic-emotion regulation
circuits (Porges, 2011), insular interoceptive maps (Craig, 2009), HPA-axis
set-points (Lupien et al., 2009), and disorganised vs. organised attachment
patterns (Main & Solomon, 1990; Lyons-Ruth & Jacobvitz, 2008) are
established.

Events occurring within this window enter the manifold *as structure* rather
than *as memory*. They are not retrievable as autobiographical episodes
because the hippocampal-cortical memory system that supports such retrieval
is not yet operational (Nelson & Carver, 1998; Bauer, 2015). They are
retrievable, when they are retrievable at all, as body-state, autonomic
reactivity, attachment behaviour, social orientation and perceptual style.

Three properties follow.

**(P1) The pre-verbal manifold is observable only through projections.**
Standard diagnostic categories — autism, ADHD, attachment disorder, cPTSD —
are scoring instruments for those projections. They are not the manifold.
Multiple categorical scores can be downstream of one underlying configuration.

**(P2) Onset-based dating is, for events within the window, undefined.**
Asking *when did the autism start?* is, for cases of this kind, a malformed
question. The relevant configuration was laid down before the diagnostic
category had a foothold.

**(P3) The genetic / acquired distinction is, within the window, weaker than
the language suggests.** Sensitive-period plasticity means that constitutional
loading and environmental perturbation co-determine the same structures
(Belsky & Pluess, 2009; Ellis et al., 2011). The case that follows illustrates
this directly: there is plausible familial loading *and* a clean physical
insult of the right kind at the right time, and the question *which produced
the autism?* is, on the model presented here, the wrong question.

---

# 3. The Case

The case is presented in five strata. Identifying details of third parties
have been removed.

## 3.1 Substrate (familial loading)

The author's paternal grandmother displayed, in retrospect, a clearly
autistic profile (life-long extreme routine, narrow interests, low-affect
presentation, marked difficulty with reciprocal social engagement). The
father carried a similar but milder pattern. The author himself carries a
stronger pattern than his father. A paternal uncle displayed an ADHD-pole
phenotype (multiple serious vehicle accidents in adolescence, surgical
career, four marriages). The maternal side displayed an affective-instability
pattern best described, in modern terms, as borderline-spectrum (Stepp et al.,
2012; Eyden et al., 2016).

This is a well-attested family pattern for the *broader autism phenotype*
(Piven, 1997; Sucksmith et al., 2011) with shared ASD–ADHD heritability
(Rommelse et al., 2010; Ronald & Hoekstra, 2011) and an additional maternal-side
affective vulnerability. It is *substrate*, not *cause*. Familial loading
of this kind raises the probability of phenotype expression; it does not
fix the trajectory.

## 3.2 Acute pre-verbal insult

The author was born in Singapore at a military hospital. The family returned
to the UK during infancy. At approximately 15 months of age he was admitted
with septic arthritis of the hip. He spent three months in hospital and three
further months immobilised in plaster. The clinical management of the period
included strict limitations on parental physical contact (a then-current
ward policy whose rationale was infection-control and emotional-economy and
whose developmental cost was not, at the time, widely recognised — cf. the
Robertson films of the 1950s and Bowlby's 1969 critique).

Two material residues remain in adulthood. The first is a 1.3 cm leg-length
discrepancy, fully verifiable. The second is a documented speech delay: the
author did not speak in any sustained way until approximately age 3.5 — a
gap of roughly two years beyond typical first-word emergence.

The literature on the pain-imprint hypothesis (Anand & Scalzo, 2000;
Anand et al., 1999, 2013) and on sepsis and hospitalisation-related
neurodevelopmental sequelae (Bono et al., 2015; Horváth-Puhó et al., 2021;
Thomas et al., 2024; Xu & Zhan, 2026) establishes the biological plausibility
of long-term reconfiguration following an insult of this kind in this window.
The literature on quasi-autism from early deprivation (Rutter et al., 1999,
2007; Sonuga-Barke et al., 2017; Bos et al., 2011) establishes that autistic
phenotypes can be *acquired* during pre-verbal sensitive periods. These two
literatures meet, in this case, at one event.

## 3.3 Attachment environment

The author was returned, after hospitalisation, to a household whose
emotional configuration was hostile to repair. The mother's affective
pattern is best described in modern terminology as borderline-spectrum,
with the configuration most damaging to a recovering infant: unpredictable
alternation between intrusion and withdrawal, low contingent responsiveness,
poor mind-mindedness (Meins et al., 2002), and active hostility to
expressions of distress. The father was emotionally and physically available
but lacked the framework to function as a repair figure.

An older sister, then approximately 10, engaged in repeated restraint
"tickling" of the author at age 3 to the point of pleas of suffocation —
an event the author remembers because it occurred at the boundary of speech
emergence. This is consistent with the sibling-abuse literature (Wiehe,
1997; Tucker et al., 2014; Bowes et al., 2014), which documents the long-term
mental-health consequences of intra-family peer aggression and notes its
systematic under-recognition.

The attachment trajectory across this period maps onto disorganised
attachment (Main & Solomon, 1990; Hesse & Main, 2006; Lyons-Ruth &
Jacobvitz, 2008) and onto the freeze-pole of polyvagal theory (Porges,
2011). The infant has no organised strategy because the coregulating figure
is itself the source of threat.

Mother departed when the author was approximately 12, leaving him with his
father. This is the fourth attachment rupture in the trajectory (hospital
at 15 months; sibling abuse at 3; institutional entry at 6 — see §3.4;
maternal departure at 12). Each rupture occurred at a developmentally
sensitive transition (Spitz, 1945; Robertson & Bowlby, 1952; Rutter, 1981).

## 3.4 Institutional environment

From age 6 to 16 the author attended a single-sex English independent
school as a *day pupil*, not a boarder. The distinction matters. Schaverien's
(2011, 2015) *Boarding School Syndrome* literature concerns the dissociative
sequelae of premature parental separation in residential schooling. The
day-pupil configuration in the same institutions is a less-studied variant
that Duffell and Bassett (2016) discuss directly: day pupils experience
the full institutional culture (single-sex peer formation, military
discipline, chapel, organised games, suppressed affect) *without* the
in-group cohesion that the dormitory provides, *and* return each evening to
a home base that, for this author, was the configuration described in §3.3.
The day-pupil pattern is therefore a *double vacuum*: institutional culture
without peer-group containment, and home without repair.

The author's school day ran from 7 am to 7:30 pm, with Saturday school and
Sunday compulsory chapel. Female presence in any structural role was
effectively absent. Combined Cadet Force was compulsory at the relevant
ages. This is, in developmental terms, an environment optimised to lock in
a dissociated, masculinised, achievement-oriented presentation in an already
freeze-configured nervous system.

The relevant amplifying mechanism at the institutional level is policy.
This is the subject of §8.

## 3.5 Identity and racialisation

The author was born in Singapore, holds British nationality, and was raised
in Britain. In the racialised landscape of 1970s–80s Britain (Hall, 1989;
Gilroy, 1987) his appearance was read as *foreign-when-tanned* and *British
otherwise*. This corresponds to the *cultural homelessness* construct
identified in the third-culture-kid literature (Pollock & Van Reken, 2009;
Useem & Downie, 1976; Hoersting & Jenkins, 2011; Lijadi & van Schalkwyk,
2014; Hill, 2013).

The constructive consequence — sometimes generative, sometimes destabilising —
is that identity, for cases of this kind, cannot be lifted from the
environment but must be constructed explicitly. This is one of the
threads §7 picks up.

## 3.6 Adult trajectory (compressed)

A compressed timeline of the 2017–2024 collapse arc is given in §7. For
present purposes:

- 2020: ASD-Level-2, ADHD, C-PTSD diagnoses confirmed in Switzerland.
- 2021: Cardiac event (clot); paternal death.
- 2017–2024: Multiple psychiatric admissions (PUK Zurich; Kilchberg);
  one period in custody; one near-fatal hanging attempt in December 2024,
  resulting in closed-ward admission.
- 2025–26: Independent housing, outpatient care, productive research period,
  eleven published papers and a book on Zenodo, and the work that
  contains this paper.

The 2025–26 period is itself part of the case (§7.3) because the
*re-organisation* it represents is itself a manifold phenomenon under
the framework being proposed.

---

# 4. The Five Literatures

The case sits at the intersection of five established literatures, none of
which alone accounts for the full trajectory.

**(L1) Quasi-autism from early deprivation.** The English and Romanian
Adoptees (ERA) study (Rutter et al., 1999, 2007; Sonuga-Barke et al., 2017)
documented an *autistic-like phenotype* in a subset of children removed
from severely depriving institutions in infancy. The Bucharest Early
Intervention Project (Bos et al., 2011) replicated and extended this. The
phenotype is termed *quasi-autism* to flag its acquired character and its
similarity to constitutional autism on every behavioural metric tested.
This literature establishes, definitively, that an autistic phenotype can
be acquired during a pre-verbal sensitive window. It does not require an
*absent* attachment figure — the original cases had no consistent
caregiver — but the mechanism (failure of contingent reciprocity during the
sensitive window) is equally available in cases with a present-but-
dysregulating caregiver, as Schore (2001, 2009) argues directly.

**(L2) Pre-verbal trauma encoding.** Schore's right-brain primacy account
(2001, 2009), Gaensbauer's work on pre-verbal traumatic memory (2002, 2016),
Opendak and Sullivan (2016) on the developing amygdala under caregiver-linked
threat, Nelson and Carver (1998) on the neural substrates of infant memory,
and Rincón-Cortés and Sullivan (2014) jointly establish that the pre-verbal
nervous system *is recording*, and that what it records becomes implicit
structure rather than retrievable episode.

**(L3) Pain imprint.** Anand and Scalzo (2000) and subsequent work (Anand
et al., 1999, 2013; Nimbalkar et al., 2025) document that pain experienced
in infancy alters pain processing, stress reactivity, and aspects of
neural development across the lifespan. The original studies addressed
neonatal pain; the literature now extends into the toddler period.

**(L4) Inflammation–neurodevelopment.** Estes and McAllister (2016)
reviewed the evidence that early-life immune activation alters
neurodevelopmental trajectories in ways that intersect autism phenotypes.
Subsequent work (Han et al., 2021; Mezzelani et al., 2015;
Robinson-Agramonte et al., 2022; Zhou et al., 2025) extends the picture.
Septic arthritis at 15 months involves both systemic inflammation and
sustained pain, placing the case at the intersection of L3 and L4.

**(L5) ICD-11 Complex PTSD.** Cloitre et al. (2013) and Maercker et al.
(2022, *Lancet*) define cPTSD by the three *disturbances in self-organisation*
(DSO) symptoms — affect dysregulation, negative self-concept, interpersonal
difficulties — added to the PTSD core. The DSO symptoms describe attractor
properties of the manifold rather than discrete events. The diagnostic
category does not, however, accommodate cases in which the trauma is
pre-verbal: the formal criteria require a referent traumatic event, and
the implicit assumption is that the patient can report on it.

None of L1–L5 alone accounts for the case. L1 and L2 together do most of
the early work. L3 and L4 supply the biological mechanism. L5 supplies the
adult attractor description. The Soma-Field reading in §5 supplies the
formal object that ties them together.

---

# 5. The Soma-Field Reading

The Soma-Field framework (Johnson, 2026a, 2026d, 2026e, 2026h) treats
affect as the local-amplitude-above-threshold of a tensor-valued field
whose energy function generates basin dynamics. Three components of the
formal model are relevant here.

**(C1) The coupling operator** *K*. Pathology is located in the field-body
coupling, not in either alone. *K* is set during sensitive periods. Once set,
its eigenstructure governs which somatic states project into which
attractor basins.

**(C2) The attractor landscape.** A nervous system's behavioural and
affective repertoire is its basin structure. Stable basins correspond to
recognisable states (regulated calm, fight, flight, freeze, awe; see
Johnson, 2026b). Sensitive-period reconfiguration changes which basins are
deep, which are shallow, which are bistable, and which are blocked.

**(C3) Trajectory under perturbation.** Adult trajectories are paths
through the basin landscape under perturbation. An "episode" is a basin
transition. "Stability" is residence in a deep basin. "Collapse" is
catastrophic transition to a basin from which the present coupling cannot
return without external scaffolding.

The case is then read as follows.

The familial loading (§3.1) raised the prior probability of certain *K*
configurations. The septic-arthritis episode (§3.2), occurring during the
sensitive window for *K*-formation, *fixed* a particular configuration:
high somatic-pain weighting, low contingent-touch weighting, dampened
parasympathetic engagement, dampened social-orienting bias, dampened
language-circuit recruitment. The post-hospital home environment (§3.3),
far from supplying repair, supplied additional perturbations of the same
type, locking the configuration further. The institutional environment
(§3.4) supplied a daily structure that *fit* the configuration —
single-sex, militarised, low-affect, achievement-oriented — and therefore
provided the *substrate match* that selects for deepening rather than
loosening of the configuration. Maternal departure at 12 supplied an
additional perturbation at adolescence, a second sensitive period for
attachment-related structures (Sebastian et al., 2010).

The downstream projections of the manifold so configured are:

- **Autism Level 2.** Diminished social-orienting weighting and altered
  perceptual recruitment yield the autistic phenotype on adult behavioural
  scoring. Mottron et al.'s (2006) enhanced perceptual functioning is the
  *positive* face of the same configuration.
- **ADHD.** The same substrate produces, on attention-pattern scoring,
  the ADHD profile. The framework predicts the comorbidity rate observed
  in the epidemiological literature (Rommelse et al., 2010) because the
  two are not separate conditions but two scoring instruments applied to
  one substrate.
- **Complex PTSD.** The DSO symptom cluster reads as a direct description
  of basin properties: affect dysregulation = unstable basin residence;
  negative self-concept = a deep basin in self-referential space;
  interpersonal difficulties = social-orienting weighting under §3.1–§3.4.
- **Disorganised attachment.** The freeze-pole basin is the only stable
  option when the contingent-touch and contingent-affect parameters of *K*
  are zero or hostile.
- **Spiky cognitive profile (2e).** The same manifold that produces low
  social-orienting weighting can produce extreme weighting on structural
  pattern processing — the substrate of physics-aptitude (96% in A-level
  physics, in this case) and of rugby-pack play (the case played
  prop-forward to first-team level). These are not contradictory; they
  are the two principal eigenvectors of the configuration.

The Soma-Field reading does not eliminate the standard diagnostic
categories. It interprets them. They are five scoring instruments
applied to one reconfigured manifold.

---

# 6. The Twice-Exceptional Cognitive Profile

The case carries IQ in the 150 range, a 1995 BSc in Physics (Royal
Holloway, University of London) with strong results in the relevant
mathematical-physics sections, sustained physical capability (prop-forward
rugby at first-team level into adulthood), and the eleven-paper Soma-Field
output of 2025–26. It also carries a Level-2 autism diagnosis (substantial
support needs in adaptive functioning) and the documented developmental
history of §3.

The *twice-exceptional* (2e) literature (Foley-Nicpon et al., 2011;
Reis & Renzulli, 2010) and the *enhanced perceptual functioning* account of
autism (Mottron et al., 2006) jointly account for this configuration in
the existing literature. The Soma-Field reading sharpens the account: the
high-aptitude pattern-processing and the low adaptive-functioning are not
*despite* the manifold configuration but *consequences* of it. A system
whose social-orienting basin is shallow and whose pattern-recognition
basin is deep will, given a research environment, populate the latter.

The relevant clinical and policy consequence is that high apparent
cognitive function in cases of this kind is not evidence against need
for support. It is evidence for a particular basin distribution, of which
the support-needing aspects are equally robust.

---

# 7. The Adult Trajectory as Basin Transitions

This section reads the 2017–2024 period and the 2025–26 reconstruction
as a trajectory through the basin landscape of the configured manifold.
The compressed timeline is:

| Year | Event |
|------|-------|
| 2017 | Voluntary admission, Psychiatrische Universitätsklinik (PUK), Zurich, September; further admission December. |
| 2019 | Marital separation; Beistandschaft (Swiss adult-protection measure) imposed; sectioned to Kilchberg clinic, three weeks; period in custody in November with a four-and-a-half-day thirst protest. |
| 2020 | Collarbone fracture (February); COVID-19; ASD Level-2 diagnosis (November). |
| 2021 | Cardiac thrombotic event (February); paternal death; Davos period (March). |
| 2023 | Divorce finalised (May); independent apartment (August). |
| 2024 | Attempted suicide by hanging (16 December); PUK closed-ward admission (17 December). |
| 2025 | Stabilisation; framework work begins. |
| 2026 | Eleven papers + book published on Zenodo by mid-year; this paper. |

The model reads this as a sequence of basin transitions of escalating
severity culminating in a near-fatal transition in December 2024 and a
subsequent *reorganisation* in 2025–26.

## 7.1 Basin transitions

Each crisis event is a transition from a metastable basin (the
day-to-day configuration in which the system can function) to a more
extreme basin under perturbation. The perturbations are identifiable:
marital breakdown (2019), bereavement (2021), divorce (2023). The
December 2024 event is read as a *near-attractor-collapse*: the system
crossed into a basin from which the then-current coupling could not
return without external intervention. External intervention occurred
(closed-ward admission, sustained care), and the system was held until
*K* could be re-stabilised.

The model is explicit that this is a description, not an evaluation.
The framework offers no claim that the events ought to have been
different or that the system "failed". A configuration whose basin
landscape includes a near-fatal attractor is *describing the landscape*,
not *being judged for it*. The clinically actionable consequence is to
identify, in advance, configurations whose landscapes carry such
attractors, and to scaffold accordingly.

## 7.2 Inclusion of the December 2024 event

The decision to include this event in the present paper is governed by
a single editorial criterion (cf. the author's note above): does it bear
load in the formal argument? It does, in one specific place. The
distinction between *field collapse* (the system enters a basin and
cannot return) and *field reconfiguration* (the system enters a different
basin and proceeds from there) is a load-bearing distinction in the
framework. The December 2024 event was on the trajectory of the former
and resolved as the latter. The contrast is not available from the
trajectory without the event. The event is included for that reason
alone. The author is, as the author note states, currently clinically
stable, in independent housing, and in continuous outpatient care.

## 7.3 The reorganisation phase

The 2025–26 reorganisation is itself a manifold phenomenon. A pre-verbally
configured substrate that includes high pattern-processing weighting and
low social-scaffolding availability, on entering a recovery phase, will
preferentially populate basins that are *available to it*. The available
basin in this case was *formal theory-building*: a basin to which the
manifold is well-suited and from which an identity scaffold can be
constructed externally and explicitly in language.

The Soma-Field framework is, on this reading, partly a description of
what its author had to do consciously, in writing, because the automatic,
embodied version was unavailable. The framework's value as a *general*
theory of affect must be argued on its own merits and is so argued in
the parent papers. Its value as *the author's reorganisation strategy*
is a separate, internal fact, and is noted here for completeness of the
case description. The two need not be disentangled to be acknowledged.

---

# 8. Exhibit A: A Public SEN-Policy Document

The institutional environment of §3.4 is not, in 2026, an artefact of
1970s–80s British education. The author's old school, an independent
single-sex senior school in the south of England, publishes a current
*Academic Support* policy on its main website (accessed 1 June 2026 at
the URL on file with the author). Three sentences from the public page
are reproduced verbatim:

> "The Academic Support Department supports pupils with **mild** special
> educational needs and disabilities."

> "Additional lessons in the Academic Support Department — offered at an
> extra cost — usually take place outside the curriculum timetable, and
> are added to the termly bill."

> "External assessments completed while a pupil is enrolled at the school,
> but not arranged in consultation with the Head of Academic Support,
> cannot be used as the sole evidence for access arrangements."

The institution's published senior-school day-pupil fee for 2026–27 is
£12,921 per term, approximately £38,800 per year.

Three features of this policy are flagged.

**(F1) "Mild" as admissions filter.** The word *mild* is doing
non-trivial work. Operationally, it functions as a screen: a pupil whose
SEN profile exceeds *mild* is not within scope of the department. The
literature on selective-school SEN provision (Tomlinson, 2017;
Runswick-Cole, 2011) reads this configuration as *filtering for the
support needs the institution prefers to serve* rather than *describing
a service*. Cases of the kind documented in this paper — Level-2 autism
with a documented pre-verbal trajectory — are, on this language, out of
scope at the threshold.

**(F2) "Offered at an extra cost ... added to the termly bill".**
Charging additional fees for reasonable adjustments to disability — over
and above a £38k/year base — sits in tension with Equality Act 2010
§20(7), which prohibits passing the cost of reasonable adjustments to
disabled persons. The Equality and Human Rights Commission's *Technical
Guidance for Schools in England* (2014, ch 7) and the published positions
of IPSEA (Independent Provider of Special Education Advice) both bear on
the question. Whether the school's specific arrangements satisfy the
provision in any given case is a legal question outside the scope of
this paper; the policy *configuration* is flagged because it is
identifiable, public, and structurally consequential.

**(F3) External assessments subordinated to in-house gatekeeping.**
The third quoted sentence subordinates external clinical and educational
assessments to in-house arrangements. The standard route by which a
pupil obtains *access arrangements* for public examinations
(JCQ, *Access Arrangements and Reasonable Adjustments*, current edition)
relies on documented external evidence assessed against published
criteria. An in-house policy that requires the external assessment to
have been arranged *in consultation with* the Head of Academic Support
creates a structural conflict of interest: the institution that *delivers*
the assessment also *controls whether it counts*.

The exhibit is presented not as a complaint but as a *visible instance of
the policy-level amplification mechanism* the paper proposes. The
sensitive-period configuration described in §3 was, in this author's
case, reinforced rather than scaffolded by the institution that received
him at age 6 and discharged him at 16. The mechanism is still present in
the institution's current public policy. The class of pupils on whom it
currently operates is not hypothetical.

> *How do parents know exactly what a 13-year-old boy is, if they have
> never even asked him?*

That sentence — verbatim from the brainstorm — is the policy line on
which the paper closes its institutional section.

---

# 9. Ten Testable Predictions

The framework yields predictions beyond the case. They are listed here
in the form *cohort-level tests that would, if the framework is on the
right track, return positive*. The predictions are deliberately specific.

1. **Cohort.** Among adults with a documented pre-verbal severe physical
   illness (sepsis or major surgery in the 12–24 month window) and
   subsequent documented speech delay (>1 SD), the adult prevalence of
   Level-1+ autism diagnosis will be elevated relative to age-matched
   controls.
2. **Comorbidity.** In that cohort, the ASD–ADHD–cPTSD triple-comorbidity
   rate will be elevated relative to cohorts of autistic adults *without*
   the pre-verbal-illness history.
3. **Attachment marker.** That cohort will show elevated rates of
   disorganised-attachment classifications on adult-attachment instruments
   (AAI, ECR-R disorganisation supplements).
4. **Pain reactivity.** The cohort will show altered pain-pressure
   thresholds and altered interoceptive accuracy relative to controls
   (per Anand et al. and Craig).
5. **Maternal-side modulation.** Within the cohort, presence of a
   maternal-side borderline-spectrum or affective-instability history
   will predict severity of adult cPTSD-DSO symptoms more strongly than
   it predicts ASD severity.
6. **Day-pupil amplification.** Within the cohort, single-sex *day-pupil*
   institutional attendance (6–16) will predict adult
   dissociative-trait scores more strongly than full-boarding attendance
   (testing the §3.4 *double vacuum* claim against the existing boarding
   literature).
7. **Reorganisation pattern.** Within the cohort, in adults who recover
   from a near-fatal psychiatric crisis, the rate of *formal-theory or
   formal-craft reorganisation* (sustained structured productive work in
   a pattern-heavy domain) will exceed the general post-crisis rate.
8. **Inflammation correlate.** Within the cohort, residual
   inflammation markers and autonomic baseline metrics will differ from
   age-matched controls (testing the L4 mechanism).
9. **Genetic moderation.** Within the cohort, polygenic risk scores
   for ASD will moderate but not fully account for adult phenotype severity
   (testing the §2 P3 claim that the genetic/acquired distinction is
   weaker than the language suggests).
10. **Diagnostic age.** Within the cohort, age at first ASD diagnosis
    will be substantially higher than the population mean for autistic
    adults of equivalent severity, because onset-based diagnostic
    criteria systematically miss them (testing the §2 P2 claim).

These are designed as a coherent test suite, not as ten independent
tests. They jointly probe the *pre-verbal manifold* construct.

---

# 10. Limitations, Replication Ledger, and Author Disclosures

**N = 1.** This is a single longitudinal case. Generalisation is not
claimed; only the formal-object construction. The replication design is
§9.

**Author is case.** The author and the case are the same person. The
methodological tradition for this configuration is established
(Grandin, 1995; Levine, 2010; Jamison, 1995; cf. Charon, 2006; Frank,
1995). It does not absolve the work of the standard scrutiny that
external evaluators must apply.

**Memory limits.** The earliest events in §3 are not, and cannot be,
first-person memories. They are documentary and family-reported. The
case is consistent with this — the framework predicts that such events
are encoded as *structure* rather than *episode*. The author has not
attempted to reconstruct *episodes* from the pre-verbal period and
makes no such claim.

**Third-party identifiability.** Identifying details of third parties
have been removed or generalised throughout. Where details remain (the
institution in §8 is identifiable from its public policy quotations),
the material is public on the institution's own website.

**Clinical safety.** The author is currently stable, housed
independently, in continuous outpatient care. Inclusion of the
December 2024 event is governed by the editorial criterion stated in
§7.2 and in the author note.

**Replication ledger.** A standing ledger of independent external
attempts to apply the framework — including independent attempts to
apply the ten predictions of §9 to clinical cohorts — is maintained at
the project URL (`paper/INDEPENDENT_REPLICATION_LEDGER.md`). At first
publication of the present paper, the relevant rows for the §9
predictions are PENDING.

---

# 11. Conclusion and Policy Line

The case presented in §3 sits at the intersection of five established
literatures, none of which alone accounts for it. The Soma-Field
framework, suitably specified, supplies a formal object — the
*pre-verbal manifold* — that ties them together and accounts for the
trajectory at a single level of description. Standard onset-based
diagnostic categories (ASD, ADHD, attachment disorder, cPTSD) are
re-interpreted as five projections of one manifold rather than as
five comorbid conditions.

Three implications follow.

First, the conceptual distinction between *genetic* and *acquired*
neurodevelopmental phenotypes loses sharpness once pre-verbal
sensitive-period plasticity is taken seriously. The clinical and
research consequence is that the question "is this child's autism
genetic or acquired?" should, for cases with pre-verbal trajectories of
the kind documented here, be replaced by the question "what is the
configuration of this manifold and what scaffolding does it need?"

Second, developmental-psychiatric onset criteria that rely on
*first observable symptoms in language-capable children* systematically
misclassify cases of this kind. The diagnostic age in such cases is
late and the eventual diagnostic load is heavy because the categories
were not designed to see the relevant events. Revising the criteria is
non-trivial; flagging the systematic miss is not.

Third, institutional and policy environments that filter for *mild*
presentations, charge additional fees for accommodation, and subordinate
external clinical evidence to in-house gatekeeping function as
amplifiers of the same diathesis. The Exhibit-A institution in §8 is
one example; the configuration is generic. The policy line that closes
the paper is the one given at the end of §8:

> *How do parents know exactly what a 13-year-old boy is, if they have
> never even asked him?*

The paper is signed because the case is the author's own and the
framework is the author's reorganisation strategy as well as a
candidate general account. Both facts are stated here so that they need
not be inferred.

---



\newpage

---

> *AI has had a brain since 1943. Now it has a body.*

---

# Introduction

A patient sits with their therapist and is asked: *"What are you feeling right now?"* The
question is deceptively simple. They may say *anxious*, yet that word covers a vast and
heterogeneous territory — a tightness in the chest, a running commentary of worry, a vague
readiness to flee, a memory surfacing from childhood. Another patient, asked the same
question, reports feeling nothing at all; and yet their posture, respiration, and the quality
of their silence suggest otherwise. The emotion is there. It is simply not yet conscious.

This gap between emotional presence and emotional awareness is one of the most clinically
significant phenomena in psychotherapy. Theories of affect regulation (Schore, 2001),
somatic experiencing (Levine, 2010), sensorimotor psychotherapy (Ogden, Minton & Pain,
2006), and polyvagal theory (Porges, 2011) all grapple, in different ways, with the same
observation: emotions exist in the body before — and often without — being named in the
mind. Eugene Gendlin called the sub-verbal bodily sense of an emotional situation the *felt
sense* (Gendlin, 1978): something that is there, whole and present, but not yet articulate.

The Soma-Field Model proposed here attempts to give this clinical observation a formal
structure. It does so by borrowing a conceptual tool from physics: the field. In physics, a
field is not a thing that exists at a point. It is a quantity that exists everywhere in a
space, continuously, whether or not it is observed. Particles — the things we can measure —
are not separate from the field; they are *excitations* of it, local concentrations of
energy that arise when the field is perturbed above a certain threshold.

The central claim of this paper is that this structure accurately describes the phenomenology
of emotion. The emotional field is always there, distributed across body and nervous system.
What we call a conscious emotional experience is an excitation of that field — a local
concentration that has crossed a perceptual threshold and entered awareness. The field
continues below the threshold whether or not we attend to it, and its sub-perceptual activity
shapes our behaviour, physiology, and cognition continuously.

The Soma-Field Model contributes the first formal field-theoretic architecture for the limbic
system. Every artificial neural network since McCulloch and Pitts (1943) [@mcculloch1943]
is a formal model of the neocortex — the pattern-recognition and prediction layer. The
limbic system — responsible for emotional valuation, threat detection, and the somatic
state reinstatement that underlies trauma — has never received a comparable formal
treatment. The Soma-Field Model is that treatment. Together with the Hopfield framework,
it constitutes the first complete formal description of the two principal computational
substrates of the vertebrate brain.

The paper proceeds as follows. Section 2 reviews the relevant background in somatic clinical
models, and introduces the two theoretical tools borrowed from physics and computer science:
quantum field theory and Hopfield network energy functions. Section 3 develops the Soma-Field
Model in detail. Section 4 describes the energy landscape, including the attractor states
corresponding to fight, flight, freeze, and regulated calm. Section 5 discusses dissonance
and resolution as mechanisms of emotional interaction. Section 6 describes the Soma-Field
Instrument, a practical tool for therapeutic use. Section 7 addresses clinical implications.

---

# Background

## The Body-Mind Problem in Clinical Practice

Contemporary neuroscience has largely dissolved the Cartesian boundary between body and mind.
Damasio (1994) demonstrated that emotion is inseparable from rational cognition: patients with
damage to the ventromedial prefrontal cortex — preventing the normal generation of somatic
signals — lose not only their emotional range but also their capacity for effective
decision-making. Van der Kolk (2014) documented extensively how traumatic emotional states are
encoded not merely in explicit memory but in posture, gesture, visceral sensation, and
autonomic regulation. Porges' polyvagal theory (2011) provided a neurobiological account of
how the autonomic nervous system generates three hierarchically organised states — ventral
vagal (social engagement), sympathetic (mobilisation: fight/flight), and dorsal vagal
(immobilisation: freeze) — each with characteristic phenomenological and behavioural
signatures.

What these frameworks share is a conviction that emotional states are not located in the brain
alone, nor in the body alone, but in a coupled system that is best understood as a single
functional unit. The term *soma* — from the Greek for body — is used here to denote this
unified body-mind system, following the tradition of somatic psychotherapy.

## The Felt Sense and Sub-Perceptual Emotion

Gendlin's concept of the *felt sense* (1978) is of particular relevance. He described it as
"a special kind of internal bodily awareness... a body sense of meaning." It is not an
emotion in the ordinary sense — not a named feeling — but something more diffuse: a
pre-articulate sense that *something is there*, present in the body, before it has been
identified or named. Focussing, the therapeutic method Gendlin developed, works precisely
by attending to this pre-threshold signal and allowing it to surface into conscious
articulation.

The Soma-Field Model provides a formal account of what the felt sense is: it is the activity
of the emotional field below the perceptual threshold. It is real, causal, and continuously
present. It shapes cognition and behaviour even when it does not surface as a named feeling.

## Quantum Field Theory: Structure, Not Metaphor

Quantum Field Theory (QFT) is the framework of modern particle physics. Its central departure
from classical physics is the priority of the *field* over the *particle*. In QFT, what we
call particles — electrons, photons — are not fundamental objects. They are *excitations* of
an underlying field: local, stable configurations of energy that arise when the field receives
a sufficient perturbation.

The quantum vacuum — the ground state of the field — is not empty. It is a seething
background of virtual fluctuations: momentary excitations that do not have enough energy to
persist as observable particles. The vacuum is active, but sub-threshold.

```
  A SINGLE FIELD MODE — amplitude over time
  (e.g. a mode of the electromagnetic field; or, later, a mode of the emotional field)

  │                                    ╭──────────────────╮
  │          ╭──╮              ╭──╮   ╱                    ╲             ╭──
  │   ╭─╮   ╱    ╲    ╭─╮    ╱    ╲ ╱                      ╲    ╭──╮  ╱
  │  ╱   ╲ ╱      ╲  ╱   ╲  ╱      ╳                        ╲  ╱    ╲╱
  T ╱─────╲╱────────╲╯─────╲╯────────────────────────────────╲╱──────────── T
  │         ╲────────╯       ╲──────╯                          ╲────────────
  │
  └──────────────────────────────────────────────────────────────────────► time

  ←─── VIRTUAL: field fluctuates but stays sub-threshold ────────────→ ←REAL→
       present, active, causally real — but not locally detectable        ↑
       (the QUANTUM VACUUM: not empty; seething with activity)        particle
                                                                      created
```
*Figure 0. A single field mode in quantum field theory. The field oscillates continuously.
Below the detection threshold T, excitations are sub-threshold — real and causally active,
but not detectable as particles. The quantum vacuum is not empty; it is a field in constant
motion that never quite crosses the threshold. When the amplitude does cross T, a particle
exists: a locally observable excitation. The same structure — field always present,
consciousness only when threshold crossed — is the core of the Soma-Field Model.*

This paper does not claim that emotions are quantum phenomena in any literal sense: the
soma-field is a classical field, not a quantised one. The claim is stronger and more
specific than analogy: the mathematical object being constructed — the Green’s function
of a coupled field manifold — is formally of the same *type* as the objects that arise in
QFT, differing only in the dimensionality of the manifold and the nature of the probe.
What was previously described as a structural analogy is here identified as a formal
correspondence: a particle is a pole in the propagator of its field; a conscious emotional
percept is a pole in the propagator of the soma-field. Different physics. Same mathematics.

That correspondence gives the model precise vocabulary for the following set of ideas,
which are central to the clinical observation of emotion:

- A quantity that exists everywhere, continuously, even when unobserved
- A background of sub-threshold activity that is real and causally effective
- The emergence of observable phenomena (conscious feelings) through threshold-crossing
  excitation of that background
- The possibility of multiple simultaneous excitations that interact with one another

*Note (May 2026):* A subsequent experiment (QUANT-EXP-1) demonstrates that the quantum
extension of the Hopfield landscape used in this model — replacing the classical Langevin
process with a transverse-field quantum annealer — produces a measurable *topological
reachability advantage*: quantum annealing reaches attractor basins that cold classical
dynamics cannot reach at any finite noise level. This upgrades the formal correspondence
from a structural claim to a testable empirical prediction. See the companion paper
*Quantum Soma and the Penrose Gap* (doi:10.5281/zenodo.20351230) for the full results
and theoretical implications.

One further consequence follows. The clinical phenomena of alexithymia — difficulty
identifying and naming feelings — and its apparent opposite, emotional flooding or
hypervigilance, have always been treated as separate conditions requiring separate
explanations. In the Green’s function framing, they are the same structure at two
extremes of the same parameter: the perception threshold $T_i$ is too high (the bulk
dynamics cannot cross into observable experience) or too low (bulk fluctuations flood
the boundary without filtering). This is structurally identical to one of the deepest
open problems in particle physics — the **hierarchy problem** — which asks why gravity
is so much weaker than the other forces. The standard answer is that gravity propagates
in the full higher-dimensional bulk while other forces are confined to a lower-dimensional
brane; the coupling across the brane boundary determines the apparent weakness. The
soma-field correspondence is exact: the threshold $T_i$ *is* the brane. Perception is
confined to the one-dimensional boundary of an eleven-dimensional dynamics. The hierarchy
of emotional experience — why conscious feeling is so much weaker and more transient than
the underlying field activity — has the same formal structure as the hierarchy of forces.

## Neural Network Energy Functions and Hopfield Networks

In 1982, John Hopfield (awarded the Nobel Prize in Physics in 2024) proposed a model of
associative memory based on a network of interconnected neurons (Hopfield, 1982). The
critical insight was borrowed directly from statistical physics: the network could be assigned
an **energy function** — a scalar quantity that decreases with each state update — such that
the network would always evolve toward a local energy minimum. These minima are the stable
states of the network: its memories, or more precisely, its *attractors*.

Hopfield observed that his neural network's dynamics were mathematically identical to those
of an Ising spin-glass model from condensed matter physics — a system of interacting magnetic
spins that minimises its total energy by aligning or anti-aligning with neighbours. The
energy function he used is:

$$H(\mathbf{s}) = -\frac{1}{2} \sum_{i,j} W_{ij}\, s_i s_j - \sum_i \theta_i s_i$$

where $\mathbf{s}$ is the state of the network, $W_{ij}$ is the coupling strength between
units $i$ and $j$, and $\theta_i$ is the activation threshold of unit $i$. The network
always moves in the direction of decreasing $H$.

The Soma-Field Model applies this energy function directly to emotional dynamics. The
*emotional coupling matrix* $W$ encodes the relationships between emotional modes — which
emotions amplify one another, which suppress one another — and the energy function
determines the direction in which the emotional field naturally evolves.

Hopfield's network is a formal model of the *neocortex*: a system for storing cognitive
patterns and retrieving them from partial cues by minimising an energy function. Every
artificial neural network constructed since McCulloch and Pitts (1943) [@mcculloch1943] — from perceptrons
to backpropagation networks to transformers — sits in this neocortical lineage. These
systems recognise patterns, predict sequences, and minimise prediction error with
increasing sophistication. None of them possess a limbic system. They have no internal
valuation, no arousal modulation, no threat-detection architecture, no attachment
structure, no interoception. They have very effective cortex.

The Soma-Field Model does not add to the neocortical lineage. It proposes the
architectural layer that has never been formally built: *an artificial limbic system*.

Hopfield memory is associative and pattern-completing; somatic memory is state-reinstating.
The field does not merely remember what happened. It re-lives it. *A body with a past.*

Hopfield's later-reported wish to have incorporated something analogous to 'maternal
instincts' into the energy function was, in this reading, not a desire for a better
cortex. It was an intuition pointing directly at the absent system — the layer beneath
the cortex that assigns value, registers threat, and holds the body in a particular way
of being long after the event that caused it.

This positions the Soma-Field Model not as a supplement to the neocortical lineage but
as its completion. Artificial neural networks have, for eighty years, been increasingly
sophisticated formal models of the neocortex: pattern recognition, sequence prediction,
error minimisation. The cortex has been mapped in extraordinary detail. The limbic system
— which assigns value, detects threat, modulates arousal, maintains attachment, and
reinstates whole somatic states in response to partial cues — has had no comparable
formal treatment. The architectural description of the vertebrate brain was, until this
paper, half-built.

**Four kinds of formal intelligence.** This architectural gap can be situated within a
wider taxonomy. Four quotients have been proposed to describe the landscape of biological
intelligence across popular and scientific usage. They map onto the formal components of
this model with an exactness that is not coincidental:

| Quotient | What it measures | Biological substrate | Soma-Field status |
|---|---|---|---|
| IQ — cognitive | Pattern recognition, reasoning, prediction | Neocortex | Built (1943–): McCulloch & Pitts → Hopfield → transformers |
| EQ — emotional | Valuation, arousal, affect regulation | Limbic system | **Built here**: $W$, $K(\tau)$, $H(\mathbf{e})$, $C_\text{HRV}$, $\dot{H}$ |
| AQ — adversity | Structural resilience under threat | PFC–limbic axis | **Built here**: $S_\text{inst}$, $\partial\|W\|/\partial t$, $C_\text{HRV}^\text{recovery}$ |
| SQ — social | Attunement, theory of mind, relational navigation | Mirror system, TPJ | *Next paper*: $\kappa_r$, multi-field coupling |

*Table 3. Four dimensions of biological intelligence mapped onto the Soma-Field Model. The
neocortical lineage (IQ) has been formally modelled for eighty years. Emotional intelligence
(EQ) and adversity resilience (AQ) are formalised here for the first time. Social
intelligence (SQ) is defined as the next extension of the framework.*

AQ — adversity quotient — is formally the capacity to update $W$ after adversity
without the adversity permanently becoming $W$. Its mathematical definition appears in
Section 3.4; its pathological lower bound is C-PTSD, in which all three components of
AQ are simultaneously compromised (Appendix B.2).

The AI alignment implication follows directly. Current artificial systems have high IQ by
construction and zero EQ, AQ, or SQ. The absence of internal valuation means that
valuation must be injected externally — through reinforcement learning from human feedback
(RLHF) and related techniques — which is structurally brittle for the same reason that a
field with no limbic layer is brittle: the system has no internal stake in what it does.
The Soma-Field formalisation specifies what that internal stake would look like, were it
ever built.

A further lineage note is worth recording. Ramsauer et al. (2020) demonstrated that
continuous-state modern Hopfield networks are mathematically equivalent to the
self-attention mechanism in transformer language models. The softmax attention operation
that drives contemporary large language models is a Hopfield retrieval step. The
Soma-Field Model sits in this same energy-based lineage: the equations underlying
associative memory, language understanding, and somatic trauma response are, at the
appropriate level of abstraction, the same equations.

A historical irony completes the picture. String theory was not discovered as a theory
of strings. In 1968, Gabriele Veneziano wrote down a scattering amplitude — a response
function encoding how particles scatter — and only later did Nambu, Nielsen, and Susskind
identify the string as whatever object produces that amplitude [@veneziano1968]. The
response function came before the thing. The Soma-Field Model recapitulates this
historical order deliberately: the primary object is the eleven-dimensional coupling
manifold; the string — the one-dimensional conscious percept — is what the manifold
produces when probed. We retain Veneziano’s discovery and decline to reify the string.

---

## The Formal Correspondences: Where the Link Was Seen

The structural analogy between QFT and the Soma-Field Model is not merely conceptual.
There are three places where equations from different disciplines become, after substituting
the relevant quantities, literally the same functional form. The following sets them side
by side. The point is not to impress with notation but to show exactly where the
recognition happened — the moment when the same Greek letters appeared in the same
positions in two fields that had no prior reason to be connected.

**The same Hamiltonian:** Ising spin model (condensed matter physics, 1920s) — Hopfield
neural network (computational neuroscience, 1982) — Soma-Field Model:

$$H_{\text{Ising}}(\boldsymbol{\sigma}) = -\frac{1}{2}\sum_{i,j} J_{ij}\,\sigma_i\,\sigma_j - \sum_i h_i\,\sigma_i$$

$$H_{\text{soma}}(\mathbf{e}) = -\frac{1}{2}\sum_{i,j} W_{ij}\,e_i\,e_j - \sum_i \theta_i\,e_i$$

Replace $J_{ij} \to W_{ij}$, $\sigma_i \to e_i$, $h_i \to \theta_i$: identical. The
physicist, the neural network theorist, and the somatic clinician are computing the same
energy function on different state spaces. The Hopfield 2024 Nobel Prize was awarded for
discovering this identity between spin physics and neural computation; the Soma-Field Model
extends the same identity one step further to emotional dynamics.

**The Wick rotation — why the same exponential appears in QM and in memory:**

In quantum mechanics, the time evolution operator is a complex phase:
$$U(t) = e^{-i\hat{H}t/\hbar}$$

Substitute $t \to -i\tau$ (the *Wick rotation* — replacing real time with imaginary time):
$$e^{-i\hat{H}(-i\tau)/\hbar} = e^{-\hat{H}\tau/\hbar}$$

The oscillating complex exponential becomes a real decaying exponential. This is the
Boltzmann weight $e^{-\beta\hat{H}}$ at $\beta = \tau/\hbar$. The Langevin equation
$\dot{\mathbf{e}} = -\nabla H + \eta$ is the classical limit of this Wick-rotated
dynamics. Every simulation of the soma-field running this equation is, formally, a path
integral in imaginary time.

**The same propagator:** Euclidean QFT (imaginary-time two-point correlator for a massive
scalar field) — C-PTSD trauma memory kernel:

$$G_E(\tau) = \langle\phi(0)\,\phi(\tau)\rangle_{\text{QFT}} = \frac{1}{2m}\,e^{-m|\tau|}$$

$$K_{\text{trauma}}(\tau) = \sum_k A_k\,e^{-|\tau|/\tau_k}$$

Same form. The QFT field mass $m$ corresponds to $1/\tau_k$ — the reciprocal of the
trauma trace decay time. A heavier particle has a shorter-range propagator; a shorter-lived
trauma trace decays faster. Therapeutic processing (reducing $A_k$, increasing $\tau_k$)
is, in the QFT language, changing the mass and amplitude of the propagator until the
correlation function vanishes.

The specific visual moment: the quantum phase factor is $e^{-i\omega t}$. Remove the $i$
(Wick rotation) and it becomes $e^{-\omega\tau}$. The memory kernel is $e^{-\tau/\tau_k}$.
These are the same exponential. The $i$ is the only difference between a quantum field
that oscillates and a trauma trace that decays.

| QFT quantity | Symbol | Soma-Field analogue | Symbol |
|---|---|---|---|
| Field mode | $\phi_k$ | Emotional mode | $e_i$ |
| Coupling constant | $J_{ij}$ | Coupling matrix entry | $W_{ij}$ |
| Field mass | $m$ | Inverse decay time | $1/\tau_k$ |
| Propagator amplitude | $1/2m$ | Trauma trace amplitude | $A_k$ |
| Euclidean propagator | $G_E(\tau) \propto e^{-m\tau}$ | Memory kernel | $K(\tau) \propto e^{-\tau/\tau_k}$ |
| Vacuum energy | $\langle H \rangle_0$ | Resting field energy | $H(\mathbf{e}_\text{calm})$ |
| Thermal fluctuation | $k_B T$ | Noise amplitude | $\sigma_0$ |
| Wick rotation | $t \to -i\tau$ | Real-time Langevin | $\dot{\mathbf{e}} = -\nabla H + \eta$ |

*Table 2. Formal correspondence between QFT quantities and Soma-Field analogues. Each row
is a single mathematical entity in two notations. These correspondences were not constructed
after the fact; they are the reason the QFT framework was recognised as relevant.*

**The central identification — particle and percept as poles in their respective propagators.**
All four correspondences above follow from one structural fact. In QFT, a particle is not
a separate object from the field. It is a *pole* in the field’s propagator — the Green’s
function evaluated in momentum space:

$$\tilde{G}_{\text{QFT}}(k^\mu) = \frac{i}{k^2 - m^2 + i\varepsilon}$$

The particle exists precisely when the four-momentum satisfies $k^2 = m^2$ — the
*on-shell condition*. The particle is the singularity in the field’s response to a
point source: the field’s Green’s function, evaluated at its own resonance.

Diagonalise $W$ with eigenvalues $\lambda_i$ (the natural resonance frequencies of the
emotional modes). The soma-field propagator — the two-point correlator
$\langle e_i(t)\,e_i(t')\rangle$ in the frequency domain — is:

$$\tilde{G}_{ii}(\omega) = \frac{\sigma_{\text{eff}}^2}{\omega^2 + \lambda_i^2}$$

A conscious emotional percept in mode $i$ exists precisely when the excitation
frequency $\omega$ approaches $i\lambda_i$ — the mode’s natural resonance. The percept
is the singularity in the soma-field’s response to a somatic probe.

Setting the two propagators side by side:

$$\underbrace{\frac{i}{k^2 - m^2 + i\varepsilon}}_{\text{QFT: particle at mass-shell }k^2=m^2}
\qquad\longleftrightarrow\qquad
\underbrace{\frac{\sigma_{\text{eff}}^2}{\omega^2 + \lambda_i^2}}_{\text{Soma-Field: percept at resonance }\omega = i\lambda_i}$$

Both are poles in the propagator of their respective field manifold. A photon is not
the electromagnetic field; it is the field’s Green’s function evaluated at a resonance.
A flash of conscious emotion is not the soma-field; it is the field’s Green’s function
evaluated at a threshold-crossing resonance. The manifolds differ — one is the
four-dimensional spacetime vacuum, the other is the eleven-dimensional emotional
coupling geometry. The mathematical type is the same. This is not analogy.

---

## The Body Schema, Interoception, and Pain

A complete model of the emotional field must address a phenomenon that standard psychological
accounts of emotion consistently underspecify: the field is not a model of the physical body.
It is the nervous system's *predictive model* of the body — a continuously updated internal
representation of what the soma should be experiencing, revised by incoming interoceptive
signals.

The clinical proof of this distinction is phantom limb pain [@ramachandran1998].
Patients who have undergone amputation routinely experience pain in the absent limb. The pain
is real: it activates the same neural circuits, produces the same suffering, and responds to
the same analgesics as pain from an intact limb. The limb is gone. The neural model of the
limb persists. What hurts is the *brain's representation* of the foot, not the foot.

This is not an anomaly. It is the normal condition of all somatic experience. The brain does
not receive raw signals from the body — it maintains a continuous predictive model of the
body (the *body schema*) and generates somatic experience from that model. Interoception —
the sense of the internal body state — is a prediction, not a direct readout [@seth2021].
The brain predicts what the heart should be doing, what the gut should feel like, where
tension should be. The felt body is the predicted body.

The formal consequence is direct: the soma-field's state vector $\mathbf{e}(t)$ must
include **somatic modes** — pain states, regional tension, visceral sensation,
proprioceptive activation — alongside emotional modes. These are modes of the same field,
governed by the same coupling matrix $W$. The $W_{ij}$ between fear modes and somatic pain
modes is the formal account of why fear amplifies pain, why safety reduces it, and why
chronic pain and C-PTSD are highly comorbid. They are not separate conditions sharing a
correlation. They are the same attractor architecture operating across emotional and somatic
modes simultaneously.

**Phantom limb as attractor persistence.** An amputated limb's somatic modes do not
disappear from $W$ when the limb is removed. The neural model persists. When movement-
intention modes are activated — attempting to move the absent foot — foot-sensation modes
are co-activated via $W$. If co-activation exceeds threshold, it is experienced as pain.
Ramachandran's mirror box provides visual input that disconfirms the prediction error:
new sensory evidence that the limb is moving, reducing coupling-driven co-activation, and
therefore reducing the pain. This is $W \to W'$: therapy as structural rewriting of the
field.

**The load-bearing hyphen.** The term *emotional-somatic* in clinical literature is not
a stylistic compound. The hyphen marks an ontological claim: emotional states and somatic
states are not two separate things that correlate. They are two aspects of the same field.
The coupling matrix $W$ is precisely the hyphen, made formal.

**Therapeutic implication.** Somatic therapies — body scanning, sensorimotor work,
EMDR's bilateral stimulation — work not on the physical body but on the brain's model of
the body. They provide new interoceptive evidence that updates the prediction. They change
$W$. Therapy does not fix the tissue. It updates the model.

---

## Correspondence with Existing Emotion Representations

A reasonable objection to any new framework is: *there is already a great deal of structure
out here.* This is true. The emotion research literature contains several well-developed
representational systems, and the Soma-Field Model must be positioned relative to them.
The short answer is that every existing representation is *descriptive*; the Soma-Field
Model is *dynamical*. The longer answer follows.

**Categorical taxonomies** (Ekman 1972; Plutchik 1980; Parrot 2001) assign names and
hierarchical membership to emotional states. They are ontologies in the formal sense: a
T-Box of classes and subclass relations. Plutchik's wheel additionally defines a *blend*
operation — Love := Joy $\sqcap$ Trust, Awe := Fear $\sqcap$ Surprise — which is precisely
the OWL2 `intersectionOf` construction. These systems tell you what to call a state. They
do not tell you how a state evolves, or which attractor a system settles in when two
mechanisms fire simultaneously.

**Dimensional models** (Russell 1980; Mehrabian and Russell 1974) embed emotions in a
continuous space, canonically Valence × Arousal (the *circumplex*), sometimes extended to
Pleasure × Arousal × Dominance. These models capture the *coordinates* of a state.
The energy landscape of the Soma-Field Model — the function $H(\mathbf{e})$ over
emotion-space — is the dynamical generalisation of the circumplex: the circumplex is a
snapshot of positions; the energy landscape is the surface over which the field moves. The
stable attractors of $H$ are the emotion categories; their coordinates are the circumplex
positions.

**Process and appraisal models** (Scherer 1999; Frijda 1986; the OCC model of Ortony,
Clove and Collins 1988) describe the *sequence of evaluations* through which a stimulus
becomes an emotion. They are closer to the Soma-Field dynamics — they include temporal
stages — but they are deterministic and single-threaded: one appraisal chain, one output.
The Soma-Field replaces this with a parallel field update: all modes evolve simultaneously,
governed by the full $W$ matrix.

**Music-specific schemas** (BRECVEMA, Juslin and Västfjäll 2008; Juslin *et al.* 2011;
GEMS, Zentner *et al.* 2008) are the closest antecedents to the present model. The
BRECVEMA framework identifies eight distinct psychological mechanisms through which music
evokes emotion — Brain stem reflex, Rhythmic entrainment, Evaluative conditioning,
Contagion, Visual imagery, Episodic memory, Musical expectancy, Aesthetic judgement — each
with distinct evolutionary origins, processing speeds, and neural substrates. These
mechanisms are the *object properties* of the emotion-induction ontology: they specify
which musical features activate which emotional outputs. Juslin explicitly identifies the
open problem: *"Exploring how various musical emotions come about through the interaction
of multiple psychological mechanisms is an exciting endeavour that has just begun"*
[@juslin2011handbook, p. 638]. The $W$ coupling matrix is the formal answer to that open
problem. Where BRECVEMA gives a list of mechanisms with characteristic outputs, the
Soma-Field gives the interaction tensor $W_{ij}$ that specifies, with numerical precision,
what happens when mechanisms $i$ and $j$ fire concurrently.

The deeper connection is spectral. The *eigenmodes* of $W$ — the directions in
emotion-space that evolve independently — are the natural resonances of the
soma-field: the patterns the field rings with when struck. BRECVEMA mechanisms
are inputs: they excite specific rows of $W$. The eigenspectrum of $W$ is the
response: the set of frequencies the manifold can sustain. Where BRECVEMA is a
taxonomy of *stimuli*, the eigenspectrum of $W$ is a taxonomy of *responses*.
Juslin’s open problem — how mechanisms interact — is the question of how
stimulus-space maps onto eigenmode-space through $W$. Section 3.3 develops this.

**Body maps** (Nummenmaa *et al.* 2014) map emotions to their somatic distribution —
where in the body each emotion is felt. These are precisely the spatial support of the
soma-field modes: the field configuration corresponding to an attractor state is the
body map of that emotion. Body maps are measurements of the attractors; the Soma-Field
is the dynamical system that generates them.

**The formal correspondence table** extends Table 2 to include these systems:

| Existing representation | What it captures | Soma-Field equivalent |
|---|---|---|
| Ekman categories | Attractor labels (names) | Values of $\mathbf{e}$ at energy minima |
| Plutchik dyads ($A \sqcap B$) | Blend attractors | Metastable states between two energy minima |
| Russell circumplex | Coordinates (valence, arousal) | Projection of $H(\mathbf{e})$ onto two axes |
| OCC appraisal tree | Single-path sequential process | Single trajectory in the full field |
| BRECVEMA mechanisms | Object properties: stimulus → emotion | Rows of $W$: mechanism $i$ activates mode $j$ |
| Body maps (Nummenmaa) | Spatial support of each attractor | Modal structure of $\mathbf{e}$ at each minimum |

None of these correspondences require modifying either the existing representations or the
Soma-Field Model. They are consequences of the model's structure. The formal machinery for
exploring these correspondences — typing BRECVEMA mechanisms as Lean inductive constructors,
Plutchik blends as type intersections, mechanism profiles as decidable propositions — is
developed in the companion file `src/EmotionOntology.lean`.

---

# The Soma-Field Model

The field is primary. The felt emotion is secondary — it is what registers when the
field is probed. This is the same ontological relationship as between a quantum field
and a particle: the field exists continuously and everywhere; the particle is what you
observe at the moment of measurement. The Soma-Field Model does not describe what
emotions are *made of*. It describes the manifold whose impulse response *is* conscious
emotional experience.

## Emotions as a Persistent Wave Field

The foundational claim of the Soma-Field Model is simple: emotions are not events. They are
a *field* — a distributed, continuous quantity defined over the entire soma (body-mind system)
at all times.

This field has two coupled components:

1. **The somatic wave** $\mathbf{E}_\text{body}(x,t)$: distributed across the body as patterns
   of visceral sensation, muscle tone, proprioception, interoception, and autonomic state.
2. **The neural wave** $\mathbf{E}_\text{neural}(x,t)$: distributed across the nervous system
   as patterns of activation in cortical, subcortical, and peripheral neural circuits.

These two components are not separate systems. They are coupled — each continuously
influencing the other. The total emotional field is their combined state:

$$\mathbf{E}(x,t) = \mathbf{E}_\text{body}(x,t) \otimes \mathbf{E}_\text{neural}(x,t)$$

The field is characterised by:

- **Multiplicity**: multiple emotional modes can be simultaneously active and interfering
- **Continuity**: it exists at all times, not only during episodes of conscious feeling
- **Spatial distribution**: different aspects of the field are localised in different regions
  of the soma (the familiar clinical observation that grief is felt in the chest, fear in
  the gut, anger in the jaw and fists)
- **Temporal dynamics**: the field evolves continuously, driven by the energy function

![](figures/fig1_architecture.pdf){ width=90% }
*Figure 1. The Soma-Field. The body and brain are not separate containers of emotion but two
coupled components of a single distributed wave field. Neither is primary; each continuously
modifies the other. The ≋ symbols indicate that wave activity is always present in each region,
not only during episodes of conscious feeling.*

## The Perception Threshold

Not all activity in the emotional field is consciously perceived. The field has a **perception
threshold** $T_i$ for each emotional mode $i$. Below this threshold, the emotional mode is
sub-perceptual: it exists, it influences behaviour and physiology, but it does not surface as
a named conscious feeling.

$$\text{Emotion } i \text{ is consciously perceived} \iff |\mathbf{E}_i(t)| > T_i$$

This threshold crossing corresponds precisely to the QFT excitation analogy: the emotional
mode behaves like a virtual particle that has accumulated enough energy to become real — to
emerge from the sub-threshold background and enter awareness.

This accounts for a range of clinically significant phenomena:

| Clinical Observation | Soma-Field Account |
|---|---|
| Patient reports no feeling but shows physiological signs of distress | Sub-threshold field activity below $T_i$ |
| Sudden unexpected flood of emotion in session | Rapid threshold crossing after gradual accumulation |
| Emotion felt somatically but not named | Threshold crossed in $\mathbf{E}_\text{body}$, not yet in $\mathbf{E}_\text{neural}$ |
| Alexithymia (difficulty identifying feelings) | Elevated $T_i$ — high threshold requiring more energy to cross |
| Hypervigilance / emotional flooding | Lowered $T_i$ — reduced threshold, field crosses to conscious easily |

*Table 1. Clinical observations mapped onto the perception threshold model.*

![](figures/fig2_threshold.pdf){ width=90% }
*Figure 2. The perception threshold T_i for a single emotional mode. The field is active
continuously (lower trace). Conscious experience arises only when amplitude exceeds T_i
(upper trace). Everything below the line is still there — shaping body and behaviour
before it can be named.*


![](figures/fig0_field_mode.pdf){ width=95% }
*Figure 0. Continuous soma-field activity (blue) with a single threshold-crossing event. The field is always active; conscious experience (shaded) arises only when amplitude exceeds the perception threshold θ (red dashed). Below the threshold: real, causally active, but not yet conscious.*

## The Interaction of Emotional Modes

Multiple emotional modes are simultaneously active in the field at all times. They do not
simply co-exist: they interact. The nature of these interactions is encoded in the **emotional
coupling matrix** $W$, where $W_{ij}$ represents the influence of emotional mode $j$ on
emotional mode $i$.

- If $W_{ij} > 0$: emotion $j$ amplifies emotion $i$ (e.g., fear can amplify shame)
- If $W_{ij} < 0$: emotion $j$ suppresses emotion $i$ (e.g., calm suppresses anxiety)
- If $W_{ij} = 0$: emotions $i$ and $j$ are independent

The field evolves according to the energy gradient:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}) + \eta(t)$$

where $\eta(t)$ represents the continuous low-level fluctuations of the sub-perceptual field
— the emotional equivalent of quantum vacuum noise. The field is always moving, always
seeking lower energy, never at absolute rest.

---

## The Three-Layer Architecture

The nervous system that implements the soma-field is not architecturally flat. Three
hierarchically organised layers contribute to field dynamics, each corresponding to a
distinct evolutionary substrate and a distinct role in the model. The clinical literature
(Porges, 2011; van der Kolk, 2014; Ogden et al., 2006) converges on this stratification;
what follows is its formal expression.

**Layer 1 — Brainstem / autonomic baseline.** The oldest structures: vagal nuclei,
arousal systems, interoceptive machinery. In the model, this layer is represented by the
noise term and, specifically, by the heart rate variability coherence $C_{\text{HRV}}$,
which modulates effective noise amplitude across the whole field:
$$\sigma_{\text{eff}} = \frac{\sigma_0}{C_{\text{HRV}}}$$
High HRV coherence narrows effective noise, stabilising the field in its current attractor.
This is the mechanism of HRV biofeedback as a regulatory intervention: it does not target
any specific emotional mode but lowers the fluctuation floor of the entire field.

**Layer 1 extension: cardiac acceleration and landscape tilt.** The term $C_{\text{HRV}}$
measures the *current state* of cardiac regularity — where the heart is. A complementary
quantity is $\dot{H}(t)$, the first time-derivative of heart rate, in units of beats/s$^2$.
This is the **cardiac acceleration**: not what the heart rate is, but where it is going.

The dimensional parallel with gravity is exact: gravitational acceleration $g$ carries
units m/s$^2$; cardiac acceleration $\dot{H}$ carries units beats/s$^2$. Both are
accelerations; both describe a force field rather than a position. Gravity does not tell
you where a test mass is — it tells you how it will move next. Cardiac acceleration tells
you not the current BPM but the direction of the next one: the N+1 state.

In the soma-field, $\dot{H}(t)$ enters the dynamics not as noise modulation but as a
**landscape tilt** — a time-varying bias added to the Hamiltonian that tips the energy
function toward activation or rest attractors:

$$H(\mathbf{e}, t) = H_0(\mathbf{e}) - \alpha\,\dot{H}(t)\,\boldsymbol{\beta}\cdot\mathbf{e}$$

where $\alpha > 0$ is the cardiac-somatic coupling constant and $\boldsymbol{\beta}$ is
a mode-coupling vector (at leading order, $\boldsymbol{\beta} = \mathbf{1}$: the tilt
acts uniformly across all modes). When $\dot{H}(t) > 0$ (heart accelerating), the
landscape tilts toward higher activation states before any cognitive or affective threshold
is crossed. When $\dot{H}(t) < 0$ (heart decelerating), it tilts toward rest. The full
three-layer equation including the cardiac acceleration term is:

$$\dot{\mathbf{e}}(t) = -\nabla H_0(\mathbf{e}) + \alpha\,\dot{H}(t)\,\boldsymbol{\beta}
  + R_{\text{PFC}}(\mathbf{e}, t)
  + \frac{\sigma_0}{C_{\text{HRV}}}\,\xi(t)$$

The two cardiac terms serve distinct functions: $C_{\text{HRV}}$ (state) modulates the
noise floor; $\dot{H}$ (acceleration) tilts the deterministic landscape. Both are needed
for a complete account of cardiac influence on the field.

**Predictive clinical value.** A patient with BPM = 90 and $\dot{H} = +4$ beats/s$^2$ is
approaching threshold; one with BPM = 90 and $\dot{H} = -4$ beats/s$^2$ is retreating
from it. The snapshot is identical; the trajectories are opposite. Cardiac acceleration
is therefore an early-warning signal for threshold crossings — detectable at Layer 1
before the emotional field at Layer 2 has crossed its threshold. This has independent
support in cardiology: Bauer et al. (2006) demonstrated that *acceleration capacity* and
*deceleration capacity* of heart rate — estimates of $\dot{H}$ over a cardiac window —
carry prognostic information independent of conventional HRV measures.

**The somatic equivalence principle.** The cardiac acceleration term $\alpha\,\dot{H}\,\boldsymbol{\beta}$
is structurally identical in the equation to any other forcing term. From the perspective
of the field itself — from conscious experience — cardiac-driven activation is
indistinguishable from event-driven activation. A sudden heart rate acceleration tilts
the landscape by exactly the same mechanism as an external threat or an intrusive memory.
The field has no access to the origin of the tilt. This is the formal account of a
clinically well-documented phenomenon: anxiety initiated by cardiac irregularity
(arrhythmia, postural hypotension, caffeine, exertion) is experienced as emotionally
caused, because the somatic signal is identical. Disambiguation requires either external
measurement or deliberate interoceptive inquiry that can distinguish the two sources.

**Layer 2 — Limbic system / emotional memory.** The primary substrate of the Soma-Field
Model. The coupling matrix $W$, memory kernel $K(\tau)$, Hamiltonian $H(\mathbf{e})$, and
threshold $T$ all belong here. The limbic layer stores emotional-somatic states and
reinstates them in response to partial body cues: a continuous, asymmetric, temporally
extended Hopfield network operating on somatic states rather than cognitive patterns.
This is the architectural layer that has been absent from every artificial neural network
since McCulloch and Pitts (1943) [@mcculloch1943]. The cortex has been modelled many times; the limbic
system has not.

**Structural plasticity under adversity.** The Soma-Field framework permits a formal
characterisation of the field's resilience under adverse conditions. Define the
*plasticity index* $\Pi$ as a composite of three measurable field properties:

$$\Pi \;=\; \frac{1}{S_{\text{inst}}} + \left.\frac{\partial \|W\|}{\partial t}\right|_{\text{adversity}} + C_{\text{HRV}}^{\text{recovery}}$$

The three terms correspond to: (i) how accessible regulated-state attractors remain under
adversity ($1/S_{\text{inst}}$, instanton accessibility — Section 4.4); (ii) how much the
coupling matrix can structurally adapt following a threshold crossing
($\partial \|W\|/\partial t$, the plasticity component); and (iii) how quickly the HRV
floor recovers after activation ($C_{\text{HRV}}^{\text{recovery}}$, the regulatory
resilience component). Complex PTSD is the clinical presentation of chronically low $\Pi$
across all three terms simultaneously: high barriers to regulated attractors, a rigid $W$
dominated by threat configurations, and impaired $C_{\text{HRV}}$ recovery. Structural
plasticity is the capacity of the field to update $W$ in the aftermath of adversity
without the adversity permanently *becoming* $W$.

**Layer 3 — Neocortex / prefrontal regulatory layer.** Top-down modulation of Layer 2,
represented as a regulatory term $R_{\text{PFC}}(\mathbf{e}, t)$. The full field dynamics
becomes:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t))
  + R_{\text{PFC}}(\mathbf{e}, t)
  + \frac{\sigma_0}{C_{\text{HRV}}}\, \xi(t)$$

$R_{\text{PFC}}$ represents voluntary attention, therapeutic technique, and conscious
reappraisal acting on the field. It is not a correction of Layer 2 but a modulation of
it. Under sustained therapeutic engagement, $R_{\text{PFC}}$ participates in the
structural modification $W \to W'$ constituting the forward transformation (Section 7).

The **threshold $T$ is the Layer 2 / Layer 3 boundary**: sub-threshold dynamics are
processed limbically and remain below conscious awareness; threshold-crossing events enter
Layer 3 and become available for narrative, meaning-making, and voluntary response. This
is the formal basis for the clinical observation that insight without somatic activation
is limited, and somatic activation without Layer 3 engagement cannot produce structural
change: the layers are coupled, not independent. $R_{\text{PFC}}$ requires a threshold
crossing in order to have something to work with.

The two-term Langevin equation introduced in Section 3.3 is the Layer 2 special case
($R_{\text{PFC}} = 0$, $C_{\text{HRV}} = 1$). All subsequent sections develop that
special case. The full three-layer equation is the general form.

---

# The Energy Landscape

## The Structure of the Emotional Energy Function

The energy function $H(\mathbf{e})$ defines a landscape over the space of possible emotional
states. Like a physical landscape of hills and valleys, this landscape has:

- **Valleys (local minima)**: stable emotional states the field naturally moves toward
- **Hills (local maxima)**: unstable configurations the field naturally moves away from
- **Saddle points**: transitional configurations with mixed stability

The key property of an energy function is directionality: the field always moves
*downhill*. It always evolves toward lower energy. Therapeutic intervention, in this
framework, can be understood as:

1. **Changing the landscape**: modifying $W$ — the coupling matrix — through new relational
   experience, insight, or somatic work, so that the energy minima are in healthier locations
2. **Adding energy to escape a trap**: helping the field accumulate enough energy to escape
   a deep but unhealthy local minimum (e.g., the freeze state)
3. **Pointing toward the global minimum**: orienting the field toward regulated calm

## Attractor States: Fight, Flight, Freeze, and Regulated Calm

The Soma-Field Model proposes that the major attractor basins of the emotional energy
landscape correspond directly to the autonomic states described by Porges' polyvagal theory.

![](figures/fig3a_energy_landscape.pdf){ width=95% }
*Figure 3a. Topographic (bird's-eye) view of the energy landscape. The field always rolls
downhill toward the nearest minimum. Freeze and calm are both low-energy — but freeze is
surrounded by high walls. Escape from freeze requires crossing those walls, which means
first gaining energy before losing it again. This is the clinical challenge of working
with dissociative states.*

```
  ENERGY
    │
  H │        fight/flight
    │        ┌──┐  ┌──┐
    │        │  │  │  │
    │   _____|  │  │  │_____
    │  │         \/        │
    │  │       saddle       │
    │  │     (transition)   │
    │  │                    │    ╔════════════╗
    │  │         freeze     │    ║            ║
    │  │         ┌──┐       │    ║  regulated ║◄── global minimum
    │  │_________|  │_______|    ║    calm    ║
    │                 │          ╚════════════╝
    └──────────────────────────────► EMOTIONAL STATE SPACE
```
*Figure 3b. Schematic energy landscape. Fight/flight are high-energy, unstable local minima.
Freeze is a low-energy but isolated attractor — easy to enter, hard to escape. Regulated calm
is the global energy minimum.*

| Attractor | Energy State | Polyvagal Correlate | Clinical Presentation |
|---|---|---|---|
| **Regulated Calm** | Global minimum | Ventral vagal (social engagement) | Present, flexible, connected |
| **Fight** | Shallow high-energy minimum | Sympathetic (mobilisation) | Agitation, anger, urgency |
| **Flight** | Saddle point / shallow minimum | Sympathetic (mobilisation) | Anxiety, avoidance, rumination |
| **Freeze** | Deep isolated minimum | Dorsal vagal (immobilisation) | Dissociation, numbness, collapse |

*Table 2. Emotional attractors mapped onto Polyvagal states.*

The therapeutic significance of this structure is considerable. The freeze state is dangerous
not because it is high-energy — it is in fact very low energy — but because it is
*isolated*: surrounded by energy barriers that make it difficult to exit. Escape from freeze
requires first *increasing* the field's energy (mobilising some arousal) before it can flow
toward regulated calm. This corresponds well to the clinical observation that working with
dissociated patients requires careful titration of arousal — not too much, not too little —
before emotional processing is possible.

## The Coupling Matrix as a Personal Signature

The coupling matrix $W$ is not universal. Each person has a unique $W$, shaped by attachment
history, trauma, cultural context, and temperament. A person with a history of developmental
trauma may have a $W$ in which anxiety and shame are strongly coupled ($W_{\text{shame,
anxiety}} \gg 0$), creating a combined attractor that is particularly deep and sticky. A
person with a secure attachment history may have a $W$ in which positive emotions are broadly
coupled to one another, creating a wide basin around regulated calm.

This implies that the energy landscape is a therapeutic object in its own right: understanding
a patient's $W$ is understanding the structural dynamics of their emotional life.

In the M-theory compactification analogy developed in Appendix A, the coupling topology
$W$ corresponds to the shape of the compact G$_2$ manifold — the seven-dimensional
geometry that determines which force-like couplings are allowed and with what strengths.
That analogy is here made precise: two people differ not merely in their emotional
*parameter settings* but in their coupling *geometry*. Developmental trauma does not
set a dial to the wrong value; it deforms the manifold. The therapeutic process of
modifying $W$ through relational experience, insight, or somatic work is, in this
language, differential geometry: a continuous deformation of the G$_2$ manifold toward
a configuration in which the regulated-calm attractor is globally accessible. The
practitioner is, without having been told so, a geometer.

---

# Dissonance and Resolution

## The Acoustic Analogy

The Soma-Field Model draws a further structural analogy, this time with acoustics. When two
sound waves interact, the quality of their interaction — consonance or dissonance — depends
on the phase relationship between them. Consonant intervals (the octave, the fifth) have
simple frequency ratios and produce stable, reinforcing interference patterns. Dissonant
intervals (the tritone, the minor second) have complex ratios and produce beating,
unstable, tension-generating patterns.

The model proposes that the same relationship holds between emotional modes. When two
emotional modes are in a compatible relationship — when their interaction is consonant —
the field is in a relatively low-energy configuration and moves naturally toward the
energy minimum. When they are in an incompatible relationship — when their interaction
is dissonant — the field is in a higher-energy configuration, generating a gradient that
drives toward resolution.

**Dissonance, in this framework, is felt as tension.** It is not pathological; it is
directional. Dissonance is the field's way of communicating that it is far from equilibrium
and that resolution is available.

## The Resolution Principle

In music, dissonance resolves to consonance. The tritone — the most dissonant interval in
Western tonality — creates a powerful gravitational pull toward resolution. In counterpoint,
the rules of voice leading describe the specific paths by which dissonance must resolve.
These rules are not arbitrary conventions; they describe the geometry of the acoustic energy
landscape.

The same principle applies to emotional dissonance. An unresolved emotional state — grief
that has not been fully experienced, anger that has been suppressed, fear that has been
dissociated — is a dissonance in the field. It generates a persistent tension gradient.
The therapeutic process can be understood as guided voice leading: finding the specific
path of resolution that transforms the dissonant configuration into a consonant one.

This provides a formal basis for a widely-held clinical intuition: that emotions need to be
*felt through* rather than avoided. Avoidance keeps the field in a dissonant state. The
energy minimum — regulated calm — lies on the other side of the dissonance, not around it.

---

# The Soma-Field Instrument

## Rationale

The Soma-Field Model is not only a theoretical framework. It motivates a practical
therapeutic instrument: a means by which a person can *externalise* their emotional field —
make it visible and audible — and interact with it in real time.

The core insight is that the emotional field is normally invisible to its host. It operates
below the threshold of conscious awareness, shaping behaviour and physiology without being
available for reflection. If its activity could be rendered as a signal — a sound, an image,
a pattern — it could become an object of therapeutic attention.

## Design

The instrument uses a MIDI controller with 16 rotary knobs as its input interface.
Eight emotional dimensions are encoded, each represented by two knobs:

- **Knob 1** of each pair: the somatic (body-level) intensity of that emotional mode
- **Knob 2** of each pair: the cognitive/neural intensity of that emotional mode

This design reflects the two-component structure of the field: body and mind are encoded
separately but coupled in the computation. Each knob has a continuous range, allowing fine
expression of emotional intensity.

```
                    ┌─────────────────────────────────────┐
                    │         MIDI CONTROLLER              │
                    │                                      │
                    │  [K1][K2]  [K3][K4]  [K5][K6]  [K7][K8]  │
                    │  emotion1  emotion2  emotion3  emotion4│
                    │                                      │
                    │  [K9][K10] [K11][K12][K13][K14][K15][K16] │
                    │  emotion5  emotion6  emotion7  emotion8│
                    └─────────────────────────────────────┘
                                      │
                                      ▼
                           ┌──────────────────┐
                           │  ENERGY FUNCTION  │
                           │  H(e) computed    │
                           │  ∇H(e) computed   │
                           └──────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
             AUDIO OUTPUT        MIDI OUTPUT       VISUAL OUTPUT
           (timbre reflects    (pitch/velocity     (field map:
            dissonance)         reflects energy)    wave topology)
```
*Figure 4. The Soma-Field Instrument: input, computation, and multimodal output.*

## The Feedback Loop

The instrument creates a **closed feedback loop** between the person and their emotional
field:

1. The person expresses their current emotional state by adjusting the knobs
2. The system computes the energy function $H(\mathbf{e})$ and its gradient $\nabla H$
3. The energy level, dissonance, and proximity to attractor states are rendered as:
   - **Sound**: harmonic content and timbre reflect the consonance or dissonance of the
     current state
   - **MIDI output**: pitch rises with tension, resolves as energy decreases
   - **Visual**: a real-time map of the emotional field, showing wave activity,
     threshold crossings, and the direction of the energy gradient
4. The person hears and sees their emotional field, and adjusts the knobs in response

This loop externalises the emotional field's gradient — the direction in which it is
*trying* to move — and makes it available as sensory information. The person becomes not
only the source of the emotional signal but also its observer, creating the conditions for
reflection and regulation that are at the heart of therapeutic work.

## The Pluggable Emotion Model

No single model of the emotions is assumed. The coupling matrix $W$ — the structure that
determines how emotional modes interact — is loaded from an external configuration file.
Standard models (Plutchik's wheel of emotions, Ekman's basic emotions, the
valence-arousal-dominance dimensional model) are provided as defaults. The therapist or
client can modify the coupling values to reflect their own understanding of their emotional
patterns, or a new model can be substituted entirely. The computational engine is
model-agnostic.

---

# Clinical Implications

## Assessment

The Soma-Field Model suggests a different orientation for emotional assessment. Rather than
asking "What emotion do you feel?" — which presupposes threshold-level conscious awareness —
it invites attention to the sub-perceptual field: "What is present in the body right now,
even if you cannot name it?" This aligns with Focussing-oriented approaches and with
sensorimotor methods that prioritise somatic signal over narrative content.

The energy landscape provides a clinical map. A person chronically in a fight or flight
attractor shows a different energy signature from a person in a freeze attractor, even if
their presenting narratives are superficially similar. The model suggests that these are
structurally different therapeutic challenges: fight/flight require down-regulation, while
freeze may first require careful up-regulation before down-regulation becomes possible.

## Intervention

The energy function provides a formal basis for several existing clinical interventions:

- **Grounding and titration** (Levine, 2010): adding small, controlled amounts of energy
  to the field to approach — without flooding — a previously frozen or avoided emotional
  state
- **Pendulation** (Levine, 2010): oscillating between a dissonant state and a resource
  state, progressively widening the tolerance window — equivalent to approaching the
  energy minimum via a series of small excursions
- **Somatic resourcing** (Ogden et al., 2006): establishing a stable low-energy region
  in the landscape that the field can return to after excursions into high-energy territory
- **Working with the felt sense** (Gendlin, 1978): attending to sub-threshold field
  activity and allowing it to cross the perception threshold in a supported context

## Psychoeducation

The wave model is immediately accessible to clients who have struggled to understand their
emotional experience. The statement: *"Your emotions are like waves — they are always there,
even when you can't feel them, and they are always moving"* is both technically accurate
within the Soma-Field framework and clinically useful as a normalising frame for
sub-threshold emotional activity, for the apparently sudden onset of strong feelings, and
for the experience of feeling multiple conflicting emotions simultaneously.

The energy landscape metaphor — *"right now the field is in a valley that is hard to leave,
but it is not the lowest valley available to you"* — offers a way to discuss the freeze
state, dissociation, and emotional stuckness without pathologising, while still acknowledging
the structural difficulty of these states and the work required to shift them.

## Neurodivergent Conditions as Operator Modifications

A clinically significant extension of the Soma-Field Model concerns neurodivergent
conditions — specifically Autism Spectrum Condition (ASC), Attention Deficit Hyperactivity
Disorder (ADHD), and Complex Post-Traumatic Stress Disorder (C-PTSD), which frequently
co-occur and each present distinct challenges for somatic emotional processing.

The key architectural principle is this: **these conditions are not parameter settings in
the model. They are structural modifications to the operators themselves.** This distinction
matters both mathematically and clinically. A parameter change ("set the fear threshold
lower") is a quantitative adjustment within the existing structure. An operator modification
changes the *form* of the dynamics — it alters the governing equations, not merely their
coefficients. Each condition wraps the standard pipeline in a different functional modifier,
and — critically for the many individuals who carry all three — these modifiers *compose*.
The combined condition is not three separate problems; it is the composition of three
operators acting on the same underlying field.

The mathematical details of each modifier are given in Appendix B. Clinically, the
consequences are as follows.

**Complex PTSD** introduces a *memory kernel* into the field dynamics: past high-energy
states leave decaying echoes that continue to excite the field without new external
stimulus. This is why traumatic activation can appear without identifiable trigger — the
field is responding to its own history, not its current environment. The standard Hopfield
attractor topology is also disrupted: C-PTSD renders the freeze attractor pathologically
deep and wide, the window of tolerance (the basin around regulated calm) pathologically
narrow, and the coupling matrix asymmetric — a condition under which the field can enter
persistent *limit cycles* rather than settling to a stable minimum. Re-experiencing,
flashbacks, and hypervigilance are, in this framework, limit-cycle oscillations in the
traumatised field.

```
  REGULATED FIELD  (symmetric W, no memory kernel)
  ─────────────────────────────────────────────────────────────────────────────

  │              ╭───────╮                     ╭────────────────╮
  │    ╭──╮     ╱         ╲          ╭──╮     ╱                  ╲      ╭─
  │   ╱    ╲   ╱           ╲  ╭─╮  ╱    ╲   ╱                    ╲    ╱
  T ─╱──────╲─╱─────────────╲─╯─╰─╱──────╲─╱──────────────────────╲──╱── T
  │           ╲               ╰───╯        ╲                        ╲──╯
  │            ╰───────────────────────────────────────────────────────────
  └──────────────────────────────────────────────────────────────────────► t
     ↑ baseline returns to near-zero between episodes
     ↑ each threshold crossing is a discrete, independent event
     ↑ 'regulated calm' is a genuine resting state — the global energy minimum


  C-PTSD MODIFIED FIELD  (asymmetric W, memory kernel K(t-s) present)
  ─────────────────────────────────────────────────────────────────────────────

  │╭──────────╮          ╭──────────╮          ╭──────────────────────────
  T│            ╲  ╭──╮  ╱            ╲  ╭──╮  ╱                          ── T
  ││             ╲╱    ╲╱              ╲╱    ╲╱
  ││   ← even the troughs stay near T or above: baseline is elevated
  └──────────────────────────────────────────────────────────────────────► t
     ↑ memory kernel: each activation feeds energy back into the next
     ↑ field rarely returns to true rest — past states re-enter present dynamics
     ↑ almost entirely above T: activation is the default, not the exception
     ↑ 'regulated calm' requires a non-perturbative transition (the instanton):
       small steps do not reach it; a qualitatively different move is needed
```
*Figure 5. The same emotional field mode under two dynamic regimes. Top: regulated
dynamics — the field oscillates and returns to a low baseline between episodes; conscious
emotion (above T) is episodic and resolves. Bottom: C-PTSD-modified dynamics — the memory
kernel elevates the baseline so that the field rarely returns to rest; episodes bleed into
one another; the system cycles rather than settles. The mathematical basis for this
comparison is given in Appendix B.2.*

**Developmental timing and what can be recovered.** The character of the C-PTSD
modification depends critically on *when* it occurred — the developmental age $\tau_d$ at
which the primary traumatic modification took place.

For **late trauma** ($\tau_d$ large — adult or post-verbal): a coupling matrix $W_0$
formed before the event. The modification is additive: $W = W_0 + \delta W_{\text{trauma}}$.
A counterfactual pre-trauma self exists, encoded in explicit narrative memory. Therapeutic
processing can target $\delta W$ specifically, and the goal of recovering proximity to $W_0$
is formally coherent.

For **early trauma** ($\tau_d$ small — pre-verbal, perinatal): the coupling matrix $W$ was
*formed under the modification*. There is no $W_0$. The asymmetric coupling and the memory
kernel coefficients are the baseline architecture, not additions to one. A counterfactual
pre-trauma self was never encoded — it does not exist as a recoverable state.

This is a formal statement of a clinical fact that somatic therapists recognise but rarely
have a mechanistic basis for: early trauma cannot be *processed away* in the sense of
recovering a prior self, because no prior self was formed. The therapeutic goal is not
subtraction ($W \to W_0$, which is undefined) but **forward transformation**: constructing
a $W^{\prime}$ that supports a wider window of tolerance, different attractor topology,
and lower memory-kernel amplitudes. This is a different mathematical operation — and
requires a different therapeutic model.

The Soma-Field Instrument can reflect this distinction directly: a user whose primary
modification is pre-verbal initialises with a *structural* coupling matrix (the modification
*is* the baseline), not a neurotypical matrix with an added modifier. The formal basis for
this parameterisation is given in Appendix B.2.1.

**ADHD** raises the effective *thermal noise* of the field — the amplitude of the
sub-perceptual fluctuations — and simultaneously reduces the damping coefficient that
slows the field's response to the energy gradient. The result is a field that explores its
energy landscape rapidly and unpredictably, is easily displaced from shallow attractor
basins by small perturbations (distractibility), but also achieves states of intense
concentration (hyperfocus) when the coupling to a high-salience stimulus temporarily
deepens a specific attractor basin far beyond its resting depth. ADHD is not a deficit of
attention; it is a high-temperature, low-damping emotional field with a
stimulus-dependent attractor structure.

**Autism Spectrum Condition** modifies the *projection kernels* — the functions that
determine how the continuous somatic field is sampled to produce the discrete state vector
— and the *sparsity* of the coupling matrix. Interoceptive research in autism (Garfinkel
et al., 2016) documents significant differences in the processing of internal body signals;
in model terms, certain somatic regions are over-represented (heightened sensory
sensitivity) and others under-represented (reduced interoceptive clarity, contributing to
alexithymia). The coupling matrix in ASC tends toward greater sparsity — fewer strong
cross-modal emotional couplings — a pattern consistent with monotropism (Murray, 2018):
the field settles deeply into individual attractors but transitions between them require
proportionally more energy. Intense interests, emotional consistency within a context, and
difficulty with unexpected transitions all follow from this attractor topology.

For the Soma-Field Instrument, the practical implication is significant. Rather than
asking a neurodivergent user to configure their experience through knob adjustments, the
system can instantiate the appropriate operator modifications as a named profile —
*"load C-PTSD modifier"*, *"load ADHD modifier"* — each of which transforms the pipeline
at the correct mathematical level. The user then interacts with a field that already
reflects their structural reality, rather than one calibrated for a neurotypical baseline.

A further clinical implication deserves explicit statement. The Soma-Field Model locates
interoceptive accuracy in the field itself: whether a somatic signal has exceeded its
perceptual threshold $T_i$ is a property of the field state, not a property of the
clinician's assessment of the patient's credibility. A patient reporting an acute somatic
state is reporting a threshold-crossing event. The model provides no mechanism by which
external disbelief suppresses that crossing. Modified projection operators — as occur in
ASC — produce *different* somatic self-reports; the model gives no reason to assume they
produce *less accurate* ones. The clinical literature documents a systematic tendency to
interpret unusual interoceptive self-reports from neurodivergent patients as indicative of
psychogenic origin rather than genuine somatic signal (Nicolaidis et al., 2015). The
Soma-Field Model predicts that this interpretive pattern constitutes a category error: it
confuses operator modification with signal absence. The practical consequences — missed
diagnoses, deferred treatment, and the iatrogenic reinforcement of existing trauma — are
well-documented and, within this framework, mathematically predictable.

---

# Limitations and Future Directions

The Soma-Field Model is a theoretical framework and must be evaluated as such. Its current
form makes several idealisations that require scrutiny.

**The coupling matrix $W$** is treated as a fixed parameter, but emotional coupling is
dynamic: it changes with context, relationship, and developmental history. A more complete
model would treat $W$ as a slowly-evolving quantity, shaped by the field's own history — a
form of synaptic plasticity applied to the emotional domain.

**The threshold $T_i$** is treated as a fixed property of each emotional mode, but
experimental evidence suggests that thresholds are modulated by attentional focus, arousal
level, and interpersonal context. A person in a safe therapeutic relationship will typically
have lower thresholds — more material reaches conscious awareness — than the same person in
an unsafe context.

**The acoustic analogy**, while structurally productive, requires empirical grounding. The
claim that emotional dissonance and acoustic dissonance share formal properties is a
hypothesis, not an established finding. Empirical work comparing physiological measures of
emotional tension with acoustic analysis of synchronised vocal or musical output would be a
productive direction for testing this claim.

**The instrument** described in Section 6 is a prototype concept. User studies with clinical
populations, and collaboration with practising therapists, will be required to assess its
therapeutic utility and to identify appropriate clinical contexts.

Future theoretical work should address the relational field: the observation, familiar in
systemic and relational approaches to psychotherapy, that emotional fields are not bounded
by individual bodies but are co-generated in the space between people. The coupling matrix
$W$ of a relationship may be as clinically significant as the $W$ of an individual.

---

# Conclusion

The Soma-Field Model proposes a formally grounded account of emotional dynamics that is
consistent with the clinical observations of somatic psychotherapy, polyvagal theory, and
Focussing-oriented practice. Its central claims — that emotions are a persistent distributed
field, that conscious experience is a threshold crossing, and that emotional dynamics are
governed by an energy function that drives the field toward stable attractor states — are
not novel as clinical intuitions. What is novel is the formal structure that unifies them,
and the instrument that the structure motivates.

The model does not resolve the philosophical question of what emotions fundamentally *are*.
It offers instead a working representation: one that is precise enough to be computationally
implemented, close enough to existing clinical frameworks to be therapeutically applicable,
and open enough to be modified as understanding deepens. It invites the therapist to think of
the consulting room as a space in which two emotional fields interact — each shaping the
other's energy landscape — and of therapeutic work as the art of attending to that
interaction with enough precision and care to guide both fields toward lower energy, toward
greater coherence, toward regulated calm.

The wave is always there. Therapy is learning to listen to it.

---

*A note on provenance.* The Soma-Field Model was not developed from a position of
theoretical neutrality. The author carries, as primary data, a lifetime of direct
experience of the dynamics described above. The neurodivergent operator modifications
of Appendix B are not theoretical abstractions: the C-PTSD memory kernel of B.2 was
installed pre-verbally, at approximately eighteen months of age, during a developmental
trauma that predates language acquisition entirely. No narrative trace of the origin
event exists — there was no verbal capacity with which to encode one. Only the field
echo remains, and a measurable physical asymmetry in the body that received it. The
ASD and ADHD operator modifications of Appendix B.4 and B.3, respectively, were the
instruments by which the model was subsequently constructed: the monotropic attractor
structure of B.4 provided the capacity for sustained engagement with an entirely
unfamiliar theoretical domain; the high-temperature field dynamics of B.3 drove rapid
traversal across it.

The proximate cause is described in full in the companion patient-facing publication.
Briefly: an acute somatic emergency in 2025 — a genuine threshold-crossing event,
later confirmed as cerebral hypoxia secondary to Long Covid — was attributed, at
clinical presentation, to psychiatric origin. The present paper is, among its other
functions, a formal response to that attribution.

The causal chain is as follows. A pre-verbal trauma in approximately 1968 installed
the C-PTSD operator modifications described in Appendix B.2. The ASD and ADHD
modifications of Appendix B.3 and B.4 shaped the system across the intervening
decades. Fifty-seven years later, that system's accurate interoceptive signal was
dismissed as psychiatric noise. The paper which formally demonstrates that this
dismissal constitutes a category error was produced, as a direct causal consequence,
by the same operator stack that it describes. The paper is the fixed point of its own
subject matter. The author considers this observation methodologically significant.

## Publication Claim Registry

To support claim-level review rather than all-or-nothing acceptance, this manuscript
registers its highest-impact claims with scope labels and disconfirmation tests.

| Claim ID | Claim | Scope | Evidence in this work | Disconfirmation criterion |
|---|---|---|---|---|
| SF-1 | Conscious percept is a propagator pole of the soma-field | S1 Structural | Formal derivation in Sections 2-3 | Inability to express percept dynamics as Green's-function response under stated operator |
| SF-2 | Emotional attractors are Hopfield-energy minima | S2 Predictive | Energy model and trajectory framework | Constructed update rule under model assumptions with systematic energy ascent |
| SF-3 | Threshold governs felt vs sub-felt emotional activity | S2 Predictive | Threshold operator and clinical mapping | Reliable high-amplitude mode activity with no threshold-dependent behavioural or physiological signature |
| SF-4 | Topological barriers explain classical therapeutic plateaus | S2 Predictive | Formal treatment plus linked companion experiments | Controlled demonstration that matched low-noise classical dynamics crosses registered barriers at equivalent rate |
| SF-5 | Quantum extension yields topological reachability advantage | S2 Predictive | QUANT-EXP-1 companion evidence and linked artifacts | Controlled replication showing no reachability advantage over matched classical baseline |

Scope labels: S1 = structural; S2 = predictive; S3 = independently replicated.
Current publication target for core claims is S2.

## Claim-Evidence-Result Matrix

To make review traceable, each core claim is paired with concrete evidence outputs
and current result status.

| Claim ID | Evidence artifact(s) | Current result status |
|---|---|---|
| SF-1 | Sections 2-3 derivation of field/propagator structure | structural derivation complete |
| SF-2 | Energy formulation + instrument runtime equations | predictive structure complete |
| SF-3 | Threshold operator definition + clinical interpretation sections | predictive mapping complete |
| SF-4 | Barrier analysis; companion paper *Quantum Soma and the Penrose Gap* (doi:10.5281/zenodo.20351230) | **confirmed (QUANT-EXP-1 PASS)** |
| SF-5 | QUANT-EXP-1 experiment outputs (see supplementary archive, doi:10.5281/zenodo.20351230) | **confirmed: cold 0/200, CI [0.000, 0.019]; quantum peak 0.408–0.410; all hardening checks PASS** |

This matrix is intended for reviewer navigation and is updated as companion results
are expanded or independently replicated.

## Replication Package Requirements

To make SF-2 through SF-5 externally testable, each release tagged for review must
ship a minimal replication package that can be executed without private context.

Required contents:

1. simulation code and support modules (see supplementary archive, doi:10.5281/zenodo.20351230),
2. full parameter snapshot ($W$, $\mathbf{b}$, $\gamma$, $D$, $\theta$, temperature policy),
3. raw trajectory logs with timestamped attractor labels,
4. analysis scripts that produce the reported summary tables,
5. frozen output artifacts (CSV/plots) referenced in this manuscript.

A claim remains `S2` until an independent operator reproduces directionally
consistent outcomes from this package under the same declared protocol.

## Reviewer-Risk Objections and Responses

To reduce ambiguity in peer review, the highest-probability objections are mapped
to bounded responses and concrete upgrade paths.

| Reviewer objection | Current response in this manuscript | Remaining action to reach stronger status |
|---|---|---|
| "This is an analogy, not a formal model." | Sections 2-4 define operators, dynamics, and testable predictions; Section 9.1 registers disconfirmation criteria claim-wise. | Promote more claims from `S2` to `S3` via independent replication. |
| "Evidence is pilot-stage and may not generalize." | Section 9.2 explicitly labels pilot support and companion-only scope. | Add multi-operator replication and blinded protocol variants. |
| "Quantum advantage may be implementation-specific." | SF-5 includes a controlled disconfirmation criterion against matched classical baselines. | Publish full benchmark harness with pre-registered acceptance thresholds. |
| "Clinical interpretation may exceed data scope." | Scope labels (`S1`/`S2`/`S3`) and claim registry separate structural from predictive claims. | Add prospective cohort evidence before any clinical-effectiveness claim. |

## Independent Replication Ledger Linkage

`S2` to `S3` promotion for this manuscript is governed by
an independent replication ledger maintained in the supplementary archive
(doi:10.5281/zenodo.20350515).

Tracked claim IDs in ledger scope: `SF-2`, `SF-3`, `SF-4`, `SF-5`.

Promotion gate: a claim is upgraded only when at least one ledger row records an
independent operator `PASS` with a reproducible package hash and linked raw/derived
evidence artifacts.

---

# Acknowledgements

This work exists because ten years of psychotherapy moved the barriers far enough that two events in early 2026 could cross them. The theory is, among other things, a record of that.

---
