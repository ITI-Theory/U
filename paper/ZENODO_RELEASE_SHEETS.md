# Zenodo Release Sheets — ARCHIVED

> **Superseded.** This file covered the original P1–P9 release (May 2026) and is kept as a historical record.
> Current runbook: [`Dist/zenodo/README.md`](https://github.com/ITI-Theory/Dist/tree/main/zenodo/README.md)
> Master paper registry: [`Dist/PAPERS.yaml`](https://github.com/ITI-Theory/Dist/blob/main/PAPERS.yaml)

**Author:** Alistair Johnson | ORCID: 0009-0007-2194-0850
**Last updated:** May 2026 (archived Aug 2026)
**License for all records:** CC BY 4.0

---

## Linking Strategy Overview

Three tiers of Zenodo records:

| Tier | Record type | Count | Notes |
|---|---|---|---|
| **Artifact records** | software, dataset | 2 | Lean proofs + QUANT-EXP dataset. Create these first — their DOIs feed into all paper records. |
| **Paper records** | preprint | 9 | One per paper. 3 already published; 6 to create. |
| **Collection record** | book | 1 | Omnibus. Create last — needs all paper DOIs. |

**Zenodo relation types used:**
- `IsSupplementedBy` — the paper is supplemented by an artifact (point from paper → artifact)
- `IsSupplementTo` — the artifact supplements the paper (point from artifact → paper)
- `IsPartOf` — this paper is part of the omnibus (point from paper → omnibus)
- `HasPart` — the omnibus contains this paper (point from omnibus → paper)
- `IsCitedBy` — another paper cites this one
- `Cites` — this paper cites another (use for cross-paper links within the series)
- `IsRelatedTo` — general relation (use for GitHub repo link)

---

## STEP 1: Create Artifact Records First

---

### A1 — Lean 4 Formal Proofs

**Create this before any paper records.**

**Record type:** Software
**Title:** Lean 4 Formal Proofs: The Soma-Field Model
**Description:**
> Lean 4 formalisation of the core mathematical claims of the Soma-Field research programme.
> Covers: the Hopfield energy function and its symmetry properties (Hopfield.lean),
> the soma-field Hamiltonian and gradient-descent dynamics (SomaField.lean),
> interoceptive field proofs (FieldProofs.lean), and the BRECVEMA emotion-ontology
> structure (EmotionOntology.lean). Companion to the paper series listed in related identifiers.

**Files to upload:**
```
src/SomaField.lean
src/Hopfield.lean
src/FieldProofs.lean
src/EmotionOntology.lean
src/Movie.lean
```
Plus a brief `README.md` in the upload: "Lean 4 (≥ v4.9). Build: `lake build`."

**Metadata:**
- Keywords: `Lean 4`, `formal verification`, `Hopfield network`, `soma-field`, `emotional dynamics`, `type theory`
- Programming language: Lean 4
- License: CC BY 4.0

**Related identifiers (fill in DOIs after creating paper records):**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| IsSupplementTo | 10.5281/zenodo.20287981 | DOI | mathematical-co-identification |
| IsSupplementTo | *(soma-field-synthesis DOI)* | DOI | soma-field-synthesis |
| IsRelatedTo | https://github.com/Alistair-Johnson/U | URL | Source repository |

**→ Record this DOI as:** `LEAN_PROOFS_DOI = 10.5281/zenodo.XXXXXXX`

---

### A2 — QUANT-EXP-1 Dataset

**Create this before quantum-soma-penrose update.**

**Record type:** Dataset
**Title:** QUANT-EXP-1: Quantum Annealing Reachability Experiment on an 8-Mode Soma-Field Hamiltonian
**Description:**
> Raw data and figures from QUANT-EXP-1: a simulation study comparing quantum annealing
> (exact Schrödinger evolution) against classical Langevin dynamics (cold T=0.02, hot T=1.5)
> on an 8-mode soma-field Hamiltonian with Awe-basin barrier strengths W[Fear,Awe] ∈ {−8,−10,−12}.
> Key result: classical cold sampling reached Awe-dominant occupancy in 0/48 trajectories;
> quantum annealing succeeded in all 3 barrier cases (peak ~0.41).
> Includes barrier sweep, bootstrap confidence intervals, negative controls, noise-equivalence
> curve, schedule comparison, spectral gap proxy, and phase diagram.

**Files to upload:**
```
instrument/quantum_sweep_results.csv
instrument/quantum_sweep_summary.png
instrument/quantum_bootstrap_sweep.csv
instrument/quantum_bootstrap_sweep.png
instrument/quantum_negative_controls.csv
instrument/quantum_negative_controls.png
instrument/quantum_noise_equivalence.csv
instrument/quantum_noise_equivalence.png
instrument/quantum_phase_diagram.csv
instrument/quantum_phase_diagram.png
instrument/quantum_schedule_comparison.csv
instrument/quantum_schedule_comparison.png
instrument/quantum_spectral_gap.csv
instrument/quantum_spectral_gap.png
instrument/quantum_fixed_seed_table.csv
instrument/quantum_combined_figure.png
instrument/quantum_experiment_3d.png
instrument/quantum_experiment_result.png
paper/QUANT-EXP-SWEEP-2026-05-20.md    (experiment log)
```

**Metadata:**
- Keywords: `quantum annealing`, `soma-field`, `Hopfield network`, `emotional dynamics`, `quantum advantage`, `reachability`, `Awe basin`, `QUANT-EXP-1`
- License: CC BY 4.0

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementTo | 10.5281/zenodo.20351230 | DOI | quantum-soma-penrose |
| IsRelatedTo | https://github.com/Alistair-Johnson/U | URL | Source repository |
| IsRelatedTo | *(soma-field-synthesis DOI)* | DOI | synthesis paper cites this dataset |

**→ Record this DOI as:** `QUANT_DATASET_DOI = 10.5281/zenodo.XXXXXXX`

---

## STEP 2: Update Already-Published Paper Records

Add related identifiers to the three existing records via the Zenodo "New version" or "Edit" workflow.

---

### P1 — The Soma-Field Paper
**Status:** PUBLISHED — v3 uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20350515
**v3 DOI:** https://doi.org/10.5281/zenodo.20459538

**Add these related identifiers (edit existing record):**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 formal proofs |
| IsSupplementedBy | `QUANT_DATASET_DOI` | DOI | QUANT-EXP-1 dataset (supporting evidence) |
| IsRelatedTo | 10.5281/zenodo.20287981 | DOI | mathematical-co-identification (companion) |
| IsRelatedTo | 10.5281/zenodo.20351230 | DOI | quantum-soma-penrose (empirical companion) |
| IsRelatedTo | *(soma-field-synthesis DOI)* | DOI | synthesis / overview paper |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P2 — Quantum Topology and Trauma
**Status:** PUBLISHED — v3 uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20351230
**v3 DOI:** https://doi.org/10.5281/zenodo.20459711

**Add these related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementedBy | `QUANT_DATASET_DOI` | DOI | QUANT-EXP-1 dataset |
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs (Hopfield.lean relevant) |
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper (theoretical basis) |
| IsRelatedTo | 10.5281/zenodo.20287981 | DOI | mathematical-co-identification |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P3 — Mathematical Co-identification
**Status:** PUBLISHED — v3 uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20287981
**v3 DOI:** https://doi.org/10.5281/zenodo.20459780

**Add these related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs (FieldProofs.lean, SomaField.lean) |
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| IsRelatedTo | 10.5281/zenodo.20351230 | DOI | quantum-soma-penrose |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

## STEP 2b: Create D1 (SFT Demo Case)

---

### D1 — SFT Applied: A Worked Example
**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20459825
**v1 DOI:** https://doi.org/10.5281/zenodo.20459826
**Record type:** Other
**Title:** SFT Applied: A Worked Example — Before/After LLM Analysis of a Real Clinical History
**File uploaded:** `paper/SFT-DEMO-CASE.md`

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| Is supplement to | 10.5281/zenodo.20350515 | DOI | soma-field-paper (P1) |

---

### D2 — Lean 4 Formal Proofs Appendix
**Status:** PUBLISHED
**Concept DOI:** https://doi.org/10.5281/zenodo.20437858
**Record type:** Software / Dataset
**Title:** Lean 4 Formal Proofs: The Soma-Field Model
**File:** `lean-proofs-appendix.pdf`

---

## STEP 3: Create New Paper Records

---

### P4 — The Soma-Field Research Programme (Synthesis)

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460118
**v1 DOI:** https://doi.org/10.5281/zenodo.20460119
**Record type:** Preprint
**Title:** The Soma-Field Research Programme: Method, Model, and Empirical Confirmation
**Subtitle:** A Synthesis of Six Papers on Emotional Field Dynamics
**File to upload:** `bld/soma-field-synthesis.pdf`
**Source file:** `paper/soma-field-synthesis.md`

**Keywords:** `soma-field`, `emotional dynamics`, `Hopfield network`, `quantum field theory`,
`somatic psychotherapy`, `research synthesis`, `mathematical psychology`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs |
| IsSupplementedBy | `QUANT_DATASET_DOI` | DOI | QUANT-EXP-1 dataset |
| Cites | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| Cites | 10.5281/zenodo.20351230 | DOI | quantum-soma-penrose |
| Cites | 10.5281/zenodo.20287981 | DOI | mathematical-co-identification |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

**→ Record this DOI as:** `SYNTHESIS_DOI`

---

### P5 — The Physical Substrate of the Soma-Field

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460357
**v1 DOI:** https://doi.org/10.5281/zenodo.20460358
**Record type:** Preprint
**Title:** The Physical Substrate of the Soma-Field
**Subtitle:** Biotensegrity, Fascial Interoception, and Bioelectric Correlates of Emotional Field Dynamics
**File to upload:** `bld/soma-physical-substrate.pdf`
**Source file:** `paper/soma-physical-substrate.md`

**Keywords:** `soma-field`, `biotensegrity`, `fascial interoception`, `bioelectric`,
`emotional dynamics`, `somatic substrate`, `piezoelectric`, `interoception`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper (theoretical basis) |
| IsRelatedTo | `SYNTHESIS_DOI` | DOI | synthesis paper |
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P6 — A Voyage into Trauma (The Book)

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460455
**v1 DOI:** https://doi.org/10.5281/zenodo.20460456
**Record type:** Book (use "Other" or "Book" type on Zenodo)
**Title:** A Voyage into Trauma
**Subtitle:** The Soma-Field Theory of Emotional Life
**Files to upload:**
```
bld/soma-field-book.pdf          (primary — A4 academic layout)
```
*Optionally include the Royal-format PDF if you want the print-ready version publicly available.*

**Description:**
> A comprehensive lay-reader and professional-facing account of the Soma-Field Model,
> covering emotional field dynamics, energy landscapes, attractor theory, neurotype
> differences (C-PTSD, ADHD, ASD), the ABCD therapeutic instrument, and forward
> transformation. Includes 8 original figures. Part of the Soma-Field collected works.

**Keywords:** `trauma`, `soma-field`, `emotional dynamics`, `somatic psychotherapy`,
`Hopfield network`, `energy landscape`, `C-PTSD`, `ADHD`, `interoception`, `popular science`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper (formal basis) |
| IsRelatedTo | `SYNTHESIS_DOI` | DOI | synthesis paper |
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P7 — Field Notes from the Inside (Patient POV)

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460523
**v1 DOI:** https://doi.org/10.5281/zenodo.20460524
**Record type:** Preprint
**Title:** Field Notes from the Inside: A Patient-Constructed Model of Emotional Dynamics
**Subtitle:** Or: The Author Could Not Wait
**File to upload:** `bld/soma-field-patient-pov.pdf`
**Source file:** `paper/soma-field-patient-pov.md`

**Keywords:** `soma-field`, `lived experience`, `patient perspective`, `trauma`,
`interoception`, `self-research`, `somatic psychotherapy`, `first-person science`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| IsRelatedTo | `SYNTHESIS_DOI` | DOI | synthesis paper |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P8 — The Tensor

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460613
**v1 DOI:** https://doi.org/10.5281/zenodo.20460614
**Record type:** Other (creative/technical document)
**Title:** The Tensor: An Abstract Film Definition
**File to upload:** `bld/the-tensor.pdf`
**Source file:** `paper/the-tensor.md`

**Description:**
> A formal specification of *The Tensor* — a film whose visual and sonic structure is
> determined by a real-time soma-field computation. Bridges the mathematical formalism
> of the Soma-Field Model with an artistic practice of field sonification and film.

**Keywords:** `soma-field`, `tensor`, `film`, `sonification`, `emotional field`,
`abstract film`, `Phase Plant`, `BRECVEMA`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| IsRelatedTo | 10.5281/zenodo.20460771 | DOI | collected works omnibus |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

### P9 — Music-Induced Affect Dynamics

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460685
**v1 DOI:** https://doi.org/10.5281/zenodo.20460686
**Record type:** Preprint
**Title:** A Dynamical Field Model of Music-Induced Affect: Beyond the Valence–Arousal Circumplex
**File to upload:** `bld/music-affect-dynamics.pdf`
**Source file:** `paper/music-affect-dynamics.md`

**Keywords:** `music and emotion`, `affect dynamics`, `soma-field`, `BRECVEMA`,
`valence-arousal`, `dynamical systems`, `music psychology`, `Hopfield network`

**Related identifiers:**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| IsRelatedTo | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| IsRelatedTo | `SYNTHESIS_DOI` | DOI | synthesis paper |
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs (EmotionOntology.lean) |
| IsPartOf | 10.5281/zenodo.20460771 | DOI | collected works omnibus |

---

## STEP 4: Create the Omnibus Record (Last)

---

### C1 — The Soma-Field: Collected Works (Omnibus)

**Status:** PUBLISHED — uploaded 2026-05-30
**Concept DOI:** https://doi.org/10.5281/zenodo.20460771
**v1 DOI:** https://doi.org/10.5281/zenodo.20460772
**Record type:** Book
**Title:** The Soma-Field: Collected Works
**Subtitle:** A Complete Edition in Two Formats
**Files to upload:**
```
bld/omnibus-royal.pdf    (156×234 mm Royal — print-on-demand edition)
bld/omnibus-a4.pdf       (A4 duplex — personal/binder edition)
```

**Description:**
> The complete Soma-Field research programme in a single volume: nine papers spanning
> the formal model, empirical quantum experiment, mathematical method, physical substrate,
> neurotype dynamics, musical affect, patient perspective, film definition, and research
> synthesis. Two PDF formats included: Royal (156×234 mm, sewn-binding margins) for
> print-on-demand production, and A4 (duplex, 28 mm inner margin) for home printing
> and ring binding.

**Keywords:** `soma-field`, `collected works`, `emotional dynamics`, `Hopfield network`,
`quantum field theory`, `somatic psychotherapy`, `trauma`, `ADHD`, `music and emotion`,
`biotensegrity`, `formal verification`, `Lean 4`

**Related identifiers — HasPart (all component papers):**

| Relation | Identifier | Scheme | Note |
|---|---|---|---|
| HasPart | 10.5281/zenodo.20350515 | DOI | soma-field-paper |
| HasPart | 10.5281/zenodo.20351230 | DOI | quantum-soma-penrose |
| HasPart | 10.5281/zenodo.20287981 | DOI | mathematical-co-identification |
| HasPart | `SYNTHESIS_DOI` | DOI | soma-field-synthesis |
| HasPart | *(soma-physical-substrate DOI)* | DOI | soma-physical-substrate |
| HasPart | *(soma-field-book DOI)* | DOI | soma-field-book |
| HasPart | *(soma-field-patient-pov DOI)* | DOI | soma-field-patient-pov |
| HasPart | *(the-tensor DOI)* | DOI | the-tensor |
| HasPart | *(music-affect-dynamics DOI)* | DOI | music-affect-dynamics |
| IsSupplementedBy | `LEAN_PROOFS_DOI` | DOI | Lean 4 proofs |
| IsSupplementedBy | `QUANT_DATASET_DOI` | DOI | QUANT-EXP-1 dataset |
| IsRelatedTo | https://github.com/Alistair-Johnson/U | URL | Source repository |

**→ Record this DOI as:** `OMNIBUS_DOI`

---

## Quick-Reference: DOI Registry

Fill these in as records are created:

```
LEAN_PROOFS_DOI         = 10.5281/zenodo.20437858
QUANT_DATASET_DOI       = 10.5281/zenodo.20438007
SYNTHESIS_DOI           = 10.5281/zenodo.XXXXXXX
SOMA_PHYSICAL_DOI       = 10.5281/zenodo.XXXXXXX
SOMA_BOOK_DOI           = 10.5281/zenodo.XXXXXXX
PATIENT_POV_DOI         = 10.5281/zenodo.XXXXXXX
TENSOR_DOI              = 10.5281/zenodo.XXXXXXX
MUSIC_AFFECT_DOI        = 10.5281/zenodo.XXXXXXX
OMNIBUS_DOI             = 10.5281/zenodo.XXXXXXX

# Already published:
SOMA_FIELD_PAPER_DOI    = 10.5281/zenodo.20350515
QUANTUM_PAPER_DOI       = 10.5281/zenodo.20351230
MATH_CO_ID_DOI          = 10.5281/zenodo.20287981
```

---

## Recommended Submission Order

1. **A1** — Lean 4 proofs (software record)
2. **A2** — QUANT-EXP-1 dataset (dataset record)
3. **P1–P3** — Edit existing published records to add artifact links
4. **P4** — soma-field-synthesis (needs P1–P3 DOIs; references them)
5. **P5–P9** — remaining papers (any order; reference A1, A2, P4)
6. **C1** — Omnibus (last; needs all paper DOIs for HasPart links)

## Translations

Once `make translate` is verified, translation PDFs (`bld/*.de.pdf`, `bld/*.fr.pdf`, `bld/*.it.pdf`) can be uploaded as additional files on the same Zenodo record as their English parent, or as separate language-specific records linked with `IsTranslationOf` / `IsTranslatedBy`. Recommend: upload as additional files on the same record to keep DOIs unified.

## P21 — Cosmological Constant Derivation (new, 2026-08-11)

**Title:** The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic Field: Λ ≡ ⟨tr Φ⟩₀ from USF Compactification

**Type:** Publication → Preprint
**Keywords:** cosmological constant, Universal Somatic Field, vacuum energy, compactification, M-theory, Planck scale, dark energy, de Sitter
**Description:** Derives the cosmological constant as the vacuum expectation value of the somatic tensor trace. The required field amplitude Φ₀ ≈ 0.4 M_Pl is a natural Planck-scale compactification value, giving Λ_USF ≈ H₀²/c² within a factor of 2 of Λ_obs. The discrepancy factor 3Ω_Λ ≈ 2.05 is attributed to Calabi-Yau moduli geometry. Avoids the standard fine-tuning problem by treating Λ as a classical background amplitude rather than a zero-point energy sum.
**Related:** `Is part of` → C1v2 omnibus DOI (concept: https://doi.org/10.5281/zenodo.20460771)

**Status:** Not yet uploaded — draft paper created 2026-08-11.
