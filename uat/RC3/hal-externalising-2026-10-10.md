---
title: "H-AL on the externalising machine and the emotion research (ISS-053)"
date: 2026-10-10
---

Asked 10 Oct 2026, 17:30, in the HAL-UAT notebook (conversation c580f4db).
H-AL confirms the research as Cowen and Keltner (PNAS): at least 13 dimensions
of experience evoked by music and 27 categories evoked by short videos.
Citations [n] refer to the notebook's sources.

**Answer:**

### 1. Cowen & Keltner's Emotion Dimensions vs. The Tensor, BRECVEMA, and Knobs
 * **The Empirical Findings**: The research (Alan Cowen and Dacher Keltner, UC 
Berkeley/PNAS) demonstrated that music evokes at least **13 distinct, universal dimensions** of subjective experience (amusement, joy, eroticism/desire, beauty, relaxation/calm, sadness, dreaminess, triumph/heroic, anxiety/tension, scariness/fear, annoyance, defiance/indignation, feeling pumped up) [1-3], while short videos evoke **27 distinct categorical dimensions**. * **Attractor States vs. Forcing Mechanisms**: In the programme's ontology, 
Cowen & Keltner's 13 and 27 categories represent **attractor basins**—energy minima or "poles in the propagator" [4-7]. By contrast, Patrik Juslin’s **8 
BRECVEMA mechanisms** (Brainstem reflex, Rhythmic entrainment, Evaluative conditioning, Emotional contagion, Visual imagery, Episodic memory, Musical expectancy, Aesthetic judgement) are not emotion states; they are the **dynamical forcing inputs** (the stimulus-to-field pathways, or rows of the coupling matrix \\(W\\)) that drive the system [6-11]. * **Mapping to The Tensor’s Modes**: *The Tensor* compresses the high-dimensional affective landscape into **7 primary dynamical axes** (Safety,
Fear, Curiosity, Awe, Grief, Language, Pre-verbal, plus Shame in the Lean `MovieMode` specification) [12-14]. Cowen & Keltner's categories map as coordinates or blends across these axes: for instance, *Awe* is a threshold blend (\\(\text{Fear} \sqcap \text{Surprise}\\)) [15, 16], *Triumph* is high approach coupled with somatic motor release [17], and *Anxiety* is uncoupled tension in the fear/brainstem axis [18, 19]. * **Mapping to the Knobs**:
  * On a 16-knob controller (e.g. one MIDI Fighter Twister), the 13 music emotions can map to 13 phase-angle knobs with 3 master system controls (Field 
Intensity, Tunneling constant \\(\alpha\\), and Global Reset Flux) [20, 21].
  * In the dual-layer architecture, 16 knobs map to **8 modes \\(\times\\) 2** (one somatic intensity knob and one cognitive intensity knob per dimension) [22-24].
  * Across the full 32-knob console, these feed into the **4 Master Knobs** governing global physics: **Scale (\\(\sigma\\))**, **Time (\\(t/\tau\\))**, **Threshold (\\(T\\))**, and **Volition (\\(J_{\text{user}}\\))** [73–75, 82, 
318].

---

### 2. What "Composing with the Score" Gives the Interview Protocol

In *The Tensor* (§3.5 / Part IV), composing an emotional score \\(\mathbf{e}^*(t)\\) is not about writing dialogue or camera directions; it is about establishing an invariant affective trajectory across story-time \\(t \in [25]\\) [26-29]. An interviewer (AI or therapist) reviewing the author’s 10 handwritten A5 pages can formulate their questions around **The Tensor's five core compositional decisions** [29]:

1. **Primary Axes**: *"Which emotional modes form the dominant coordinate axes of this piece?"* (e.g. is the story fundamentally an arc of Safety, Fear, and 
Awe, or Grief and Pre-verbal dissolution?) [13, 29].
2. **Trajectory Arc**: *"What is the shape of each mode over story-time?"* (Where does activation rise, peak, and decay between opening \\(t=0\\) and closing \\(t=1\\)?) [29, 30].
3. **Threshold Events (Instantons)**: *"Where are the critical breaking points or phase transitions?"* (e.g. in *The River Film*, Threshold 1 at \\(t \approx 
0.52\\) where Safety drops below 2 and Fear exceeds 7 to tip into Awe; 
Threshold 2 at \\(t \approx 0.74\\) where Language drops to near-zero and 
Pre-verbal reaches maximum) [13, 29, 31].
4. **Attractor Depth**: *"How deep does the descent go?"* (Setting the depth parameter \\(\kappa_d\\): does the story stay in shallow, manageable distress, or plunge fully into the pre-verbal trauma well?) [29, 32, 33].
5. **Return Topology**: *"Does the field return to where it started, or is the return basin different from departure?"* (A round trip returning to familiar baseline vs. a reorganized basin marked by permanent transformation, higher coherence, or altered fear-shame coupling) [29, 34].
 *The Tensor* also establishes **container independence**: whether the handwritten story is set on a tropical river, in a hospital room, or in deep space, those are merely narrative surfaces ("containers") [35-37]. The interview extracts the invariant mathematical trajectory underneath [31, 35].

---

### 3. Preserving Author Provenance, Overrides, and Cautions
 * **The Human Is the Sensor / Pilot, Not Passenger**: The core maxim of the entire programme is that the human is the sensor, not an external device or automated algorithm [38-41]. The person's handwritten pages and spoken answers are the primary ground truth. The AI does not diagnose or "decide" what the user is feeling; it merely acts as a compiler translating self-reported experience into candidate YAML score keyframes (`ScorePoint`) [31, 42, 43]. * **Tactile Override & Provenance**: 
  * The resulting score file must explicitly record human authorship and timestamped provenance in its front-matter [31].
  * The user retains real-time veto power through the **Volitional Source Term (\\(J_{\text{user}}\\))** and the \\(\kappa\\) control parameters: they can turn down the **Depth dial (\\(\kappa_d\\))**, slow down **Velocity (\\(\kappa_v\\))**, adjust **Texture (\\(\kappa_t\\))**, or engage the **Mode 
Mask (\\(\kappa_m\\))** to completely mute specific channels (such as Shame) from rendering [32, 33, 44-46]. * **Critical Cautions**:
  * **Anti-Coercive Ethics**: *The Tensor* explicitly cautions that a score \\(\mathbf{e}^*(t)\\) is only what the artwork *proposes*, never what the human actually experiences (\\(\mathbf{e}_V(t)\\)) [27, 30, 47, 48]. The interviewer must never presume to know or dictate the client's internal state [47].
  * **Strict Non-Medical Boundary**: The Soma Machine and Tensor score engines are non-medical educational, artistic, and research instruments—never clinical diagnostic or therapeutic devices [41, 49-51].
  * **Risk of Somatic Overwhelm**: Plunging directly into the deepest pre-verbal attractor (\\(e_{PV} = 9\\), \\(e_L = 0\\)) strips cognitive language defenses [13, 52, 53]. The interview must ensure sufficient somatic grounding and safety (\\(e_S\\)) are established before guiding a user toward high-intensity threshold events [54].

---

🧭 Would you like to draft a concise, 10-question interview template structured directly around *The Tensor's* five compositional decisions to turn handwritten notes into a YAML score?
