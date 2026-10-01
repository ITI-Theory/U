# Appendix B — Clinical Replication Protocol

\begin{quote}\itshape
For a clinician, neuroscientist, or research psychologist who wants
to test the predictions of the soma-field model in a clinical
population. This appendix is preregistered-study-ready.
\end{quote}

\vspace{1em}

## B.1  Hypothesis

The soma-field model predicts that emotional state transitions in
human subjects follow the catastrophe-type structure given in
Appendix A.3, specifically:

(H1) Transitions between calm and active states obey *cusp*
hysteresis: the threshold for activation is higher than the threshold
for de-activation, with the gap proportional to baseline
hypervigilance score.

(H2) Trauma-affected subjects show a *deepened* trauma basin in
moduli-space, operationalised as: when placed under a soma-field
perturbation protocol, they return to baseline more slowly than
control subjects by a factor of at least 2.

(H3) A subset of trauma-affected subjects, under appropriate
conditions, show *tunnelling-like* transitions — discontinuous
jumps to a high-affect state (typically *awe* or *joy*) without
passing through intermediate states. These transitions are
predicted to be rare under classical control but more frequent
under quantum-substrate-favouring conditions (subject relaxed,
microtubule-stabilising compounds present at therapeutic doses).

## B.2  Sample

- **N** $\geq$ 120 (40 per arm, 3 arms).
- **Arms**: (1) trauma-affected, treatment as usual; (2) trauma-
  affected, treatment as usual + soma-field-aware protocol; (3)
  non-trauma-affected controls.
- **Inclusion criteria**: age 18–65, capacity to consent, no current
  acute psychotic episode, no current substance use disorder
  requiring acute detoxification.
- **Exclusion criteria**: pregnancy, severe cardiac arrhythmia,
  conditions contraindicating prolonged biosensor wear.

## B.3  Instrumentation

For each subject across each session:

- **ECG** at $\geq$ 1 kHz sampling, derived HRV (RMSSD, SDNN,
  LF/HF ratio).
- **Continuous EEG** at $\geq$ 256 Hz, 32-channel minimum.
- **Continuous respiration** via chest band.
- **Continuous skin conductance**.
- **fMRI** *(optional, expensive)* during a structured perturbation
  protocol.
- **Self-report** via 8-mode visual-analogue scale, every 5 min.

## B.4  Perturbation protocol

Across a 90-minute session, subjects are exposed in randomised order
to:

- 10 min baseline rest.
- 10 min music known to evoke awe (suggested: Górecki Symphony 3,
  Adagio).
- 10 min mild stressor (Stroop / mental arithmetic).
- 10 min recovery silence.
- 10 min breathwork (4-7-8 pattern).
- 10 min recovery silence.
- 10 min subject-chosen joy-inducing music.
- 10 min final rest.
- 10 min structured interview about subjective experience.

## B.5  Analysis

For (H1), fit cusp catastrophe to the time-series of self-report
activation, with stressor intensity as $a$ and baseline hypervigilance
as $b$. Test the cusp manifold's bifurcation set against the
empirically observed hysteresis loop.

For (H2), fit exponential return-to-baseline curve to HRV time-series
after the stressor block, compare time constants across arms with a
mixed-effects model.

For (H3), apply change-point detection to the self-report time-series
during the awe-music block, classify each change as smooth or
discontinuous using a likelihood-ratio test against a smooth
alternative. Count discontinuous changes per arm.

## B.6  Preregistration

The protocol is intended to be preregistered on OSF before any
subject enrolment. The preregistration document is at
`paper/preregistration/protocol-B.md` (forthcoming).

## B.7  Power calculation

For (H1), at $\alpha = 0.05$, detecting a cusp hysteresis gap of
$\Delta = 0.5\sigma$ between activation and de-activation thresholds
requires $n \approx 32$ per arm under standard assumptions. The
proposed $n = 40$ is conservative.

For (H2), detecting a 2$\times$ return-time difference at
$\alpha = 0.05$, power $0.80$, requires $n \approx 25$ per arm
under a log-normal model. The proposed $n = 40$ is conservative.

For (H3), the relevant power calculation depends on the *rate* of
tunnelling-like events, which is the quantity to be estimated. The
study is descriptive on this hypothesis.

## B.8  Stopping rules

Stop early if:

- Severity-of-adverse-event-rate exceeds 5\% in any arm.
- An interim analysis (at $n = 60$) shows the primary endpoint with
  $p < 0.001$.
- The independent data and safety monitoring board recommends
  stopping for any reason.

## B.9  Funding

This protocol has not been funded as of the date of publication. The
author is an independent researcher and welcomes collaboration from
appropriately credentialled clinical investigators.

\newpage
