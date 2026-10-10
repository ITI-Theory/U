---
title: "H-AL on its name, its voice and speech/emotion markup (ISS-054)"
date: 2026-10-10
---

Asked 10 Oct 2026, 17:30, in the HAL-UAT notebook (conversation c580f4db).

**Corrections (Copilot, checked on the web the same day):**

- EmotionML *can* carry a trajectory: a `<dimension>` may hold a `<trace
  freq="…">` of samples over time (W3C EmotionML 1.0). So The Tensor's
  keyframes can be exported to EmotionML; what it cannot carry is the
  coupling W*, the thresholds and the κ knobs. Native YAML stays the master.
- Piper does not support full SSML yet (only pauses and substitutions are
  planned, rhasspy/piper issue 275); the tour engine's own `pause` does what
  `<break>` would. Fine-tuning Piper to a new speaker needs about one hour of
  clean, single-speaker audio with transcripts (from scratch about ten hours).

Citations [n] refer to the notebook's sources.

**Answer:**

### 1. The Name "H-AL" and Its Relation to HAL 9000
 * **The Etymology**: **"H-AL"** is short for **Hologram Alistair** (or **Hologram Al**), serving as the author's reflected digital avatar and conversational interlocutor [1-4]. * **The Four-Way Confluence**: Across the early design sessions, the sources explicitly trace the name to four converging influences [1, 5]:
  1. **The Author's Identity**: Alistair / Al acting as his own "digital mirror" [1].
  2. **Hardware Abstraction Layer (HAL)**: The classic low-level OS command router that abstracts physical hardware for higher software layers [1].
  3. **Arnold Rimmer (*Red Dwarf*)**: The iconic British sci-fi hologram who exists as a projected light form with a single **"H"** on his forehead—pedantic, rule-obsessed, and acting as a rigid linter [1, 3, 5].
  4. **HAL 9000 (*2001: A Space Odyssey*)**: The self-aware shipboard computer [1]. The sources emphasize: *"Not the menace — the voice. Calm. Measured. Even.
Neutral. A voice that doesn’t rush, doesn’t dramatise, doesn’t emote — it simply is"* [5]. * **The Standardization Rule**:
  * **"H-AL"** is the official name of the persona, the holographic avatar, and the private NotebookLM workspace (rendered in the terminal with red phosphor in homage to HAL 9000's red eye) [3, 6-8].
  * **`HAL`** (all caps, unhyphenated) is strictly reserved for executable files, command dispatchers, and shell verbs (`HAL copilot start`, `HAL copilot save`, `HAL0`, `HAL1`, `HAL.cmd`) [9-11].

---

### 2. The Voice: Piper Testing, the Author's Voice, and "Halifying" Rules
 * **Current vs. Future Audio Pipeline**:
  * Currently, H-AL runs a private local instance of **Piper TTS** using the `campwill/HAL-9000-Piper-TTS` model (`hal.onnx`), exposed via a Python `/speak` endpoint in the MOTHER bridge [12-14]. Because this model mimics the film actor, the sources explicitly note it is fine for private local testing but prohibited for public release [12, 14].
  * The long-term plan is for the author to record known scripts and dictation to train a custom Piper voice model, ensuring full copyright ownership and personal provenance [12, 14]. * **Rules for "Halifying" H-AL's Delivery and Vocabulary**:
  When drafting lines for H-AL (whether for observatory tours, video voiceovers, or chat responses), the sources specify concrete delivery and linguistic constraints:
  1. **Delivery and Prosody**: A calm, measured, even, and slightly slowed cadence [5]. The tone is completely detached from theatrical dramatization or hyperbole [5].
  2. **One Sentence Per Stop**: In the tour language, each spoken directive (`say: "..."`) must be **exactly one sentence in plain language** [15].
  3. **Plain Sensory Words Over Math**: Mathematics belongs in KaTeX telemetry cards, formal proofs, or technical answers—never in the primary spoken narration [15]. H-AL speaks only about what the viewer physically sees, hears, or feels [15].
  4. **Explicit Epistemic Labeling**: H-AL transparently names the evidential ground without defensiveness, calmly noting what is measured, derived, or open hypothesis [15].

---

### 3. Speech and Emotion Markup: SSML and EmotionML vs. The Tensor
 * **W3C EmotionML in the Sources**:
  * The W3C Emotion Markup Language (Schröder et al., 2014) is analyzed extensively in the *Papers Omnibus*, the *Fractal Thesis*, and the chats [16-18].
  * The sources state: **“EmotionML provides the taxonomy; the Soma-Field Model provides the dynamics”** [19].
  * EmotionML provides static classification tags (categories, valence, arousal) at a frozen instant \\(t\\) (like a chemical nomenclature) [16, 17]. 
In contrast, [T]-Theory provides the thermodynamic rate equations and energy landscapes [16, 17]. * **Could EmotionML Describe The Tensor's Score?**
  * **No, not on its own.** EmotionML lacks the mathematical expressive power to represent a continuous trajectory through moduli space [17, 18].
  * *The Tensor* defines a score as a vector trajectory \\(\mathbf{e}^*(t)\\), coupled by an interaction matrix \\(W^*\\), navigating non-perturbative instanton threshold events, evaluated through memory kernels \\(K(\tau)\\), and modulated by control parameters (depth \\(\kappa_d\\), velocity \\(\kappa_v\\), resonance \\(\kappa_r\\), texture \\(\kappa_t\\)) [393–397, 442–446, 455–459].
  * EmotionML could serve at most as a static export vocabulary for individual keyframe labels, but the score itself requires the project's native YAML specification or Lean 4 `EmotionScore` structure [20-22]. * **Speech Markup (SSML)**:
  * While W3C SSML (Speech Synthesis Markup Language) tags (such as `<prosody rate="slow">`, `<break time="500ms"/>`, and phonemic tuning) are not part of the theoretical papers, they map directly onto the tour engine’s runtime parameters (`pause`, `say`) [15] and provide the exact control mechanism needed by Piper TTS to enforce H-AL’s measured, unhurried cadence.

---

🧭 Would you like to draft a standardized SSML prompt wrapper for your tour generator to guarantee that every exported `say:` line renders in H-AL's calm, measured register?
