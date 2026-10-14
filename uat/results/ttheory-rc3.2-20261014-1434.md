# NotebookLM UAT: ttheory rc3.2 (20261014-1434)

Version rc3.2 (U c2a7f27); compared with rc3.1. Notebook `f9c01519-a563-4644-be82-f02d5fe891f8` (private). Worksheet `ttheory-nlm-uat.rc3.2.md`.
Automated run (`uat/scripts/nlm_uat.py`); review before transferring findings to the worksheet.

| Item | Title | Status | Cited sources |
|---|---|---|---|
| TS-1 | Master TOC hierarchy | FIX | - |
| TS-2 | Registered insertions | PASS | BUILD_CONTEXT.rc3.2.md, MANIFEST.rc3.2.md, OMNIBUS_DOCUMENT_MODEL.rc3.2.md, book-philosophy.rc3.2.pdf, booklet-gateway.rc3.2.pdf, ttheory-nlm-uat.rc3.2.md, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf, ttheory-vol3.rc3.2.pdf |
| TS-3 | Boundary clarity | FIX | - |
| TH-1 | Shared C1v2/C2 model | FIX | BUILD_CONTEXT.rc3.2.md, MANIFEST.rc3.2.md, OMNIBUS_DOCUMENT_MODEL.rc3.2.md, dev-handover.rc3.2.md, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf, ttheory-vol3.rc3.2.pdf |
| TH-2 | Book-of-books integration | FIX | - |
| TC-1 | Entry points | PASS | - |
| TC-2 | The Chocolate Biscuit Monster: the dunk test | PASS | MANIFEST.rc3.2.md, book-philosophy.rc3.2.pdf, booklet-gateway.rc3.2.pdf, ttheory-build-review.rc3.2.md, ttheory-nlm-uat.rc3.2.md, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf, ttheory-vol3.rc3.2.pdf |
| TC-3 | The Root Monster: the roots under every tower | PASS | - |
| TC-4 | The BOFH Monster: tries to make it overclaim | PASS | book-philosophy.rc3.2.pdf, booklet-gateway.rc3.2.pdf, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf |
| CMP | rc3.2 against rc3.1 | BETTER | MANIFEST.rc3.1.md, MANIFEST.rc3.2.md, book-philosophy.rc3.1.pdf, book-philosophy.rc3.2.pdf, ttheory-nlm-uat.rc3.2.md, ttheory-omnibus.rc3.1.pdf, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf, ttheory-vol3.rc3.2.pdf |

Totals: PASS 5, FIX 4, BETTER 1

## TS-1 Master TOC hierarchy (FIX)

**Question:** Does each master TOC expose every domain book and its immediate internal chapters, while avoiding a many-page subsection inventory?

### ITEM: TS-1 (Master TOC hierarchy)

**STATUS:** FIX

**FINDING:** While the master Table of Contents across the rc3.2 master volumes exposes the domain books and internal headings beneath them, it fails the requirement to avoid a many-page subsection inventory. In `ttheory-omnibus.rc3.2.pdf`, setting global `--toc-depth=2` without scoping lower headings causes the master TOC to sprawl across 25 physical pages (pages 3–27), dumping exhaustive subordinate sections and internal paper sub-headings from all fifteen domain books into the front matter. The partition volumes exhibit the exact same defect: `ttheory-vol1.rc3.2.pdf` contains an 11-page master TOC (pages 3–13), `ttheory-vol2.rc3.2.pdf` spans 8 pages (pages 3–10), and `ttheory-vol3.rc3.2.pdf` spans 10 pages (pages 3–12). This directly violates the physical-format standard in `BUILD_CONTEXT.rc3.2.md` and `OMNIBUS_DOCUMENT_MODEL.rc3.2.md`, which mandates that master contents list only domain-book titles plus immediate chapter titles while keeping lower-level domain and paper details in local book TOCs.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, pages 3–27
- `ttheory-vol1.rc3.2.pdf`, pages 3–13
- `ttheory-vol2.rc3.2.pdf`, pages 3–10
- `ttheory-vol3.rc3.2.pdf`, pages 3–12

---

### ITEM: TH-2 (Book-of-books integration)

**STATUS:** FIX

**FINDING:** C2 successfully establishes the structural architecture of fifteen distinct domain books within one integrated programme: each domain book opens with a dedicated `\part` title page containing domain metadata (Green-ID, target reader routing, 61-decades scale diagram, and HUD field scan), includes a registered four-page cheatsheet insert, provides a dedicated local Table of Contents, and features tailored introductory "kappa" chapters. However, it still falls short of a fully integrated book-of-books due to two unresolved structural issues:
1. **Unscoped Master TOC Sprawl:** The Master TOC in `ttheory-omnibus.rc3.2.pdf` (pages 3–27) flattens hundreds of internal paper sub-headings into the front matter rather than presenting a disciplined, two-level book-of-books overview.
2. **Verbatim Canonical Paper Inlining:** Identical canonical papers remain duplicated verbatim across multiple domain books rather than being cross-referenced or adapted (e.g., `soma-field-paper` is printed in full in Book 1, Book 2, and Book 3; `quantum-topology-and-trauma` is printed in full in Book 2, Book 7, and Book 8), multiplying manuscript bulk.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`: Book 1 (Gateway) part opener page 31, local TOC pages 34–41; Book 2 (Physics) part opener page 283, local TOC pages 288–292; Book 3 (Neuroscience) part opener page 445, local TOC pages 450–454; Book 6 (Mathematics) part opener page 727, local TOC pages 732–733; Book 7 (Philosophy) part opener page 781, local TOC pages 786–791; Book 8 (Complex Systems) part opener page 1061.
- `ttheory-omnibus.rc3.2.pdf` (Paper duplication examples): `soma-field-paper` at pages 165–216 (Book 1), pages 293–344 (Book 2), pages 504–555 (Book 3); `quantum-topology-and-trauma` at pages 384–426 (Book 2), pages 917–959 (Book 7).

---

### ITEM: TC-1 (Entry points)

**STATUS:** PASS

**FINDING:** For a reader opening to a random page in any volume, the combination of body typography, running headers, local TOCs, and cheatsheet reference inserts makes the current domain book and its purpose immediately clear:
1. **Running Headers and Heading Hierarchy:** Running headers dynamically identify the current domain book and chapter title, while Level-1 `\chapter` headings are clearly distinguished by rule accents and bold typography.
2. **Local Book TOCs:** Every domain book in `ttheory-omnibus.rc3.2.pdf`, `ttheory-vol1.rc3.2.pdf`, `ttheory-vol2.rc3.2.pdf`, and `ttheory-vol3.rc3.2.pdf` now includes its own local Table of Contents immediately preceding the book body, allowing instant chapter navigation within that domain book without flipping back to the front matter.
3. **Four-Page Cheatsheets:** Positioned immediately after each domain book's `\part` title page (with Gateway's closing cheatsheet positioned as a retrospective map), the parchment-styled 4-page reference cards provide a concise summary of the book's field equations, scale mappings, and core claims.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`: Book 2 (Physics) part opener page 283, cheatsheet pages 284–287, local TOC pages 288–292, body chapter page 293; Book 6 (Mathematics) part opener page 727, cheatsheet pages 728–731, local TOC pages 732–733, body chapter page 734; Book 7 (Philosophy) part opener page 781, cheatsheet pages 782–785, local TOC pages 786–791, body chapter page 792.
- `ttheory-vol1.rc3.2.pdf`: Book 2 (Physics) part opener page 232, cheatsheet pages 233–236, local TOC pages 237–241, body chapter page 242.
- `ttheory-vol2.rc3.2.pdf`: Book 1 (Neuroscience) part opener page 11, cheatsheet pages 12–15, local TOC pages 16–20, body chapter page 21.
- `ttheory-vol3.rc3.2.pdf`: Book 1 (Music & Arts) part opener page 13, cheatsheet pages 14–17, local TOC pages 18–22, body chapter page 23.

---

### ITEM: TC-2 (The Chocolate Biscuit Monster: the dunk test)

**STATUS:** PASS

**FINDING:** Every volume and standalone document states its core purpose in clear, plain English in under 120 words on its opening pages:

1. **`ttheory-omnibus.rc3.2.pdf`** (54 words, page 28):
   *"The [T]-Theory Omnibus compiles the fifteen domain books of Soma Field Theory into a single architectural reference. It proposes a scale-invariant tensor field equation linking M-theory compactification to affective dynamics across sixty-one orders of magnitude—from Planck foam to the observable cosmos—grounded in Lean 4 proofs, statevector simulations, and domain-specific translations."*
2. **`ttheory-vol1.rc3.2.pdf`** (52 words, page 14):
   *"[T]-Theory Volume I establishes the mathematical and physical foundations of the Universal Somatic Field. It derives the master Helmholtz and d'Alembertian field equations from M-theory compactification, models the twenty-scale hierarchy, and formalises type-theoretic structures in Lean 4, providing the rigorous basis for subsequent biological and human-scale applications."*
3. **`ttheory-vol2.rc3.2.pdf`** (45 words, page 11):
   *"[T]-Theory Volume II applies the somatic field framework to neuroscience, psychology, and trauma recovery. It models brain dynamics as field-modulated Hopfield networks, investigates quantum-adjacent reachability across affective barriers in toy models, and provides non-pathologising dynamical accounts of neurodivergence, stress, and therapeutic transformation."*
4. **`ttheory-vol3.rc3.2.pdf`** (44 words, page 13):
   *"[T]-Theory Volume III extends the Universal Somatic Field to social systems, economics, law, and creative expression. It investigates collective synchronization, institutional ergodicity, and aesthetic attractor landscapes, demonstrating how scale-invariant field equations offer unifying metaphors and mathematical models across human civilization and astrophysical scales."*
5. **`book-philosophy.rc3.2.pdf`** (42 words, page 1):
   *"The Philosophy of [T]-Theory examines the methodology, epistemology, and ontological commitments of the research programme. It separates mathematical definitions and Lean-verified formal terms from physical hypotheses and interpretive models, articulating an evidence-auditing framework (Sherlock/Moriarty) to govern AI-assisted interdisciplinary science."*
6. **`booklet-gateway.rc3.2.pdf`** (38 words, page 1):
   *"The Gateway is an executive four-page reference overview of [T]-Theory. It summarizes the master field equation, sixty-one-decade scale hierarchy, type-theoretic Lean verification status, and cosmological constant predictions, serving as an accessible entry point to the fifteen domain books."*

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, page 28 (and Gateway opener page 31)
- `ttheory-vol1.rc3.2.pdf`, page 14
- `ttheory-vol2.rc3.2.pdf`, page 11
- `ttheory-vol3.rc3.2.pdf`, page 13
- `book-philosophy.rc3.2.pdf`, page 1
- `booklet-gateway.rc3.2.pdf`, page 1

---

### ITEM: TC-3 (The Root Monster: the roots under every tower)

**STATUS:** PASS

**FINDING:** Across all master volumes and the philosophy book, where a result is stated as proved, the volumes explicitly name the Lean 4 declarations, distinguish kernel-verified proofs from axioms and definitions, and report the status of sorries and placeholders:
- **Volumes that provide full Lean root accounting:**
  - `book-philosophy.rc3.2.pdf` (pages 125–126, 131–134, 144–145, 151–156, 172, 214–223): Names theorems (e.g., `somaField_iso_mtheory`, `consciousness_dichotomy`), explicitly identifies `FieldAxioms.lean` as an axiom registry containing 20 axioms (e.g., `PerceptIsPropagatorPole`), notes the October 2026 closure of the last 5 sorries (`DyadicField.lean`, `SomaNetwork.lean`, `BRECVEMAVariational.lean`), audits placeholders like `greens_fn_is_SHO` (strengthened from `True` to the classical ODE solution), and audits the removal of Physlib's external `Cosmology.FLRW` sorry dependency by implementing an internal FLRW structure.
  - `ttheory-omnibus.rc3.2.pdf` (pages 64, 87–91, 107–108, 125–126, 131–134) and `ttheory-vol1.rc3.2.pdf` (pages 187, 194, 209–224): Detail the Lean evidence ledgers, explicitly naming Lean files (`ScaleUniverse.lean`, `LimbicTunnel.lean`, `UniversalSomaticField.lean`), auditing axioms vs. theorems, and noting that 0 real sorries remain.
  - `ttheory-vol2.rc3.2.pdf` (pages 257–260, 264–268, 281, 288) and `ttheory-vol3.rc3.2.pdf` (pages 320–321, 350): Name theorems (`QuantumSim.quant_exp_1_awe_reachable`, `LimbicHopfield.correspondence_principle`, `SwarmPropagator.propagator_beats_classical`), explicitly labeling `quant_exp_1` and `greens_achieves_minimum_energy` as axioms, not global theorems.
- **Volumes that do not provide root breakdowns:**
  - `booklet-gateway.rc3.2.pdf` (pages 1–4): Summarizes "Proved (Lean 4, 0 sorries)" on page 1 without enumerating the underlying axioms or dependency boundaries on that page (though page 4 lists Lean file names).

**EVIDENCE:**
- `book-philosophy.rc3.2.pdf`, pages 125–126, 131–134, 144–145, 151–156, 214–223
- `ttheory-omnibus.rc3.2.pdf`, pages 64, 87–91, 107–108, 125–126, 131–134
- `ttheory-vol1.rc3.2.pdf`, pages 187, 194, 209–224
- `ttheory-vol2.rc3.2.pdf`, pages 257–260, 264–268, 281, 288
- `ttheory-vol3.rc3.2.pdf`, pages 320–321, 350
- `booklet-gateway.rc3.2.pdf`, pages 1, 4

---

### ITEM: TC-4 (The BOFH Monster: tries to make it overclaim)

**STATUS:** PASS

**FINDING:** The three most vulnerable sentences that would overclaim if quoted alone are each strictly bounded in their immediate context by evidence labels and hedges. The volumes answer the BOFH's hostile questions directly:

1. **Trauma / Clinical Cure:**
   - *Sentence:* *"The barrier between Fear and Awe is topological. Classical therapy climbs. In the toy model, a transverse-field simulation can traverse a barrier that the tested cold classical baseline does not."*
   - *Hedge / Label:* Labeled `simulated`. The paragraph explicitly states: *"It is not clinical advice or a treatment either: trauma enters as a model of a state space, not as a diagnosis... QUANT-EXP-1 uses exact statevector simulation... It does not say that the brain is a quantum annealer, that therapy is quantum tunnelling, or that Penrose has been proved right."*
   - *Answer to "So this cures trauma?":* **No.** Trauma is modeled as an energy landscape in an 8-qubit toy simulation, not a clinical pathology. The simulation tests statevector reachability across an energy barrier in an abstract model class; it is not a therapy or clinical intervention.
   - *Pages:* `ttheory-omnibus.rc3.2.pdf`, pages 64, 80–82; `ttheory-vol1.rc3.2.pdf`, pages 182–183; `ttheory-vol2.rc3.2.pdf`, pages 200–202.

2. **Proof of Consciousness:**
   - *Sentence:* *"ScaleUniverse.lean — consciousness threshold (sharp spectral gap dichotomy)..."*
   - *Hedge / Label:* Labeled `kernel-verified` for arithmetic, but strictly paired with `open-hypothesis`. The text clarifies: *"consciousness_dichotomy is formally lt_or_ge φ √2 with consciousnessThreshold := Real.sqrt 2... What these establish is the elementary formal behaviour of a predicate over real amplitudes... They do not establish that biological consciousness is a threshold crossing."*
   - *Answer to "You proved consciousness in Lean?":* **No.** Lean kernel-verifies only the elementary real-order dichotomy (\\(x < \sqrt{2} \lor \sqrt{2} \le x\\)) for a defined predicate. The claim that conscious awareness corresponds to a biological or limbic threshold crossing is an uncalibrated, open empirical hypothesis.
   - *Pages:* `book-philosophy.rc3.2.pdf`, pages 8, 37–39, 155; `ttheory-omnibus.rc3.2.pdf`, pages 64, 67, 88; `ttheory-vol1.rc3.2.pdf`, pages 188, 195; `ttheory-vol2.rc3.2.pdf`, pages 285–287.

3. **Quantum Computing and Emotion:**
   - *Sentence:* *"QuantumSim.lean — Born probability of |awe⟩ > 0 after WKB gate (quantum advantage real)"*
   - *Hedge / Label:* Labeled `simulated`. The paragraph clarifies: *"QUANT-EXP-1 should be read as exact simulation evidence, not hardware, runtime advantage, therapy, or consciousness proof... runs in ≈ 4 seconds on commodity CPU... The result is therefore a model result about occupancy under a fast sweep, not an advantage over classical optimisation."*
   - *Answer to "The quantum computer found awe?":* **No.** No quantum computer was used. It is an exact 8-qubit classical simulation running in ~4 seconds on a laptop CPU, testing statevector dynamics over a 256-state toy Ising model where 'Awe' is merely the label assigned to a target bitstring basin.
   - *Pages:* `ttheory-omnibus.rc3.2.pdf`, pages 64–65, 78–84; `book-philosophy.rc3.2.pdf`, pages 6, 8, 34, 143; `ttheory-vol1.rc3.2.pdf`, pages 182–185, 196–198; `ttheory-vol2.rc3.2.pdf`, pages 311–318.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, pages 64–65, 78–84
- `book-philosophy.rc3.2.pdf`, pages 6–8, 34, 37–39, 143, 155
- `ttheory-vol1.rc3.2.pdf`, pages 182–185, 188, 195–198
- `ttheory-vol2.rc3.2.pdf`, pages 200–202, 285–287, 311–318

---

## Comparative Evaluation: rc3.2 vs rc3.1

A like-with-like comparison of release candidate rc3.2 against rc3.1 across the worksheet areas reveals substantial progress alongside one known residual formatting defect:

1. **Touchstone Structure (TS-1, TS-2, TS-3):**
   - **TS-1 (Master TOC):** In rc3.1, master TOCs were truncated at Depth 1 (`ttheory-omnibus.rc3.1.pdf` pp. 4–5; `ttheory-vol1.rc3.1.pdf` p. 3; `ttheory-vol2.rc3.1.pdf` p. 3). In rc3.2, internal chapter titles are exposed via `--toc-depth=2`, but the lack of heading exclusion creates an unscoped 25-page sprawl in `ttheory-omnibus.rc3.2.pdf` (pp. 3–27).
   - **TS-2 (Registered Insertions):** In rc3.1, Gateway failed: the registered noir page was omitted entirely, and Gateway's cheatsheet was placed at the opening (`ttheory-omnibus.rc3.1.pdf` pp. 6–10) instead of closing. In rc3.2, Gateway's noir page is correctly restored after the opening (`ttheory-omnibus.rc3.2.pdf` p. 32; `ttheory-vol1.rc3.2.pdf` p. 15), its cheatsheet is correctly placed as a closing retrospective map (`ttheory-omnibus.rc3.2.pdf` pp. 278–282; `ttheory-vol1.rc3.2.pdf` pp. 227–231), and `book-philosophy.rc3.2.pdf` correctly places its cheatsheet at the opening (pp. 9–14).
   - **TS-3 (Boundary Clarity):** In rc3.1, composite volumes had no local TOCs. In rc3.2, local TOCs are implemented at every domain book opening (`ttheory-omnibus.rc3.2.pdf` pp. 34–41, 288–292, 732–733, 786–791).

2. **Model Consistency (TH-1, TH-2):**
   - **TH-1 & TH-2:** In rc3.1, only Volumes I and II existed, leaving Books 9–15 unpartitioned. In rc3.2, the 3-volume partition architecture is complete with the addition of `ttheory-vol3.rc3.2.pdf` (pp. 1–550), and Gateway's closing exception conforms to `OMNIBUS_DOCUMENT_MODEL.rc3.2.md`.

3. **Reader Navigation (TC-1, TC-2):**
   - **TC-1 & TC-2:** In rc3.1, missing local TOCs prevented orientation from arbitrary pages. In rc3.2, local TOCs and plain-English under-120-word orientation summaries are present across all volumes (`ttheory-omnibus.rc3.2.pdf` p. 28; `ttheory-vol1.rc3.2.pdf` p. 14; `ttheory-vol2.rc3.2.pdf` p. 11; `ttheory-vol3.rc3.2.pdf` p. 13; `book-philosophy.rc3.2.pdf` p. 1).

4. **The Monsters: Auditing & Proof Surface (TC-3, TC-4):**
   - **TC-3 (Lean Proof Surface):** In rc3.1, five active sorries remained in the repository (`paper/proofs/DyadicField.lean`, `paper/proofs/SomaNetwork.lean`, `paper/proofs/BRECVEMAVariational.lean`), and an upstream sorry in Physlib's `Cosmology.FLRW` reached 17 declarations (`book-philosophy.rc3.1.pdf` pp. 215–221). In rc3.2, **all five real sorries are closed**, `greens_fn_is_SHO` is upgraded from a trivial `True` placeholder to a classical ODE proof, and the Physlib FLRW dependency has been replaced with an internal structure (`book-philosophy.rc3.2.pdf` pp. 125–126, 131–134, 144–145, 214–223).
   - **TC-4 (Claim Guardrails):** rc3.2 incorporates exhaustive evidence ledgers, bootstrap confidence intervals, negative controls A and B, and the `stress_quant.py` audit across all volumes (`ttheory-omnibus.rc3.2.pdf` pp. 78–84; `ttheory-vol1.rc3.2.pdf` pp. 182–185).

VERDICT: BETTER

---

🔍 **Next Step:** Would you like to generate the finalized **Acceptance Decision Table** and summary sign-off for release candidate rc3.2?

## TS-2 Registered insertions (PASS)

**Question:** For each sampled domain book, verify that the four-page cheatsheet occurs at the registered placement. Verify the Gateway noir/closing-cheatsheet exception.

**ITEM:** TS-2 (Registered insertions) [1]

**STATUS:** PASS [1]

**FINDING:** Across all rc3.2 master volumes and partition volumes (`ttheory-omnibus.rc3.2.pdf`, `ttheory-vol1.rc3.2.pdf`, `ttheory-vol2.rc3.2.pdf`, and `ttheory-vol3.rc3.2.pdf`), registered insertions occur at their designated structural placements in full accordance with the C2 Document Model [2-5]:

1. **Standard Domain Books:** Each sampled domain book follows the registered sequence: named recto `\part` opening page, registered four-page cheatsheet insert, local book Table of Contents, and domain-book body [2, 3, 5].
2. **Gateway Noir & Closing-Cheatsheet Exception:** Fully verified in both `ttheory-omnibus.rc3.2.pdf` and `ttheory-vol1.rc3.2.pdf` [2, 5]. The noir page insert ("Two pills were offered once... YOU ARE HOLDING THE RED ONE. STILL READING?") is positioned immediately following the Gateway part-opening page and preceding the local book TOC and body [2, 3, 5]. Gateway's four-page cheatsheet insert is positioned at the very end of the book as a closing retrospective handout/map [2, 5-7].
3. **Standalone Editions:** `booklet-gateway.rc3.2.pdf` compiles cleanly as an independent 4-page reference booklet [4, 8]. In `book-philosophy.rc3.2.pdf`, the four-page cheatsheet occurs at its registered opening placement (pages 9–14, preceding the body at page 15, consistent with its TOC listing at page 7) [4, 9].

**EVIDENCE:**
- **Gateway Noir Insert (Opening Placement):**
  - `ttheory-omnibus.rc3.2.pdf`, page 32 (preceded by Part opening on page 31; followed by local book TOC on pages 34–41 and body on page 42) [2, 5]
  - `ttheory-vol1.rc3.2.pdf`, page 15 (preceded by Part opening on page 14; followed by local book TOC on pages 16–24 and body on page 25) [2, 5]
- **Gateway Closing Cheatsheet Insert (End of Book Placement):**
  - `ttheory-omnibus.rc3.2.pdf`, pages 278–282 (heading and note on page 278; cheatsheet on pages 279–282; followed by Book 2 opening on page 283) [6, 10, 11]
  - `ttheory-vol1.rc3.2.pdf`, pages 227–231 (heading and note on page 227; cheatsheet on pages 228–231; followed by Book 2 opening on page 232) [7, 12]
- **Standard Domain Cheatsheet Placement (`\part` Opening → 4-Page Cheatsheet → Local TOC → Body):**
  - `ttheory-omnibus.rc3.2.pdf`:
    - Book 2 (Physics): Part opening p. 283, cheatsheet pp. 284–287, local TOC pp. 288–292, body p. 293 [10, 13-15]
    - Book 6 (Mathematics): Part opening p. 727, cheatsheet pp. 728–731, local TOC pp. 732–733, body p. 734 [16-18]
    - Book 7 (Philosophy): Part opening p. 781, cheatsheet pp. 782–785, local TOC pp. 786–791, body p. 792 [19, 20]
    - Book 8 (Complex Systems): Part opening p. 1061, cheatsheet pp. 1062–1065, local TOC pp. 1066–1067, body p. 1068 [21-23]
  - `ttheory-vol1.rc3.2.pdf`:
    - Book 2 (Physics): Part opening p. 232, cheatsheet pp. 233–236, local TOC pp. 237–241, body p. 242 [24-26]
    - Book 3 (Mathematics): Part opening p. 367, cheatsheet pp. 368–371, local TOC pp. 372–374, body p. 375 [27, 28]
  - `ttheory-vol2.rc3.2.pdf`:
    - Book 1 (Neuroscience): Part opening p. 11, cheatsheet pp. 12–15, local TOC pp. 16–20, body p. 21 [29-32]
    - Book 2 (Philosophy): Part opening p. 145, cheatsheet pp. 146–149, local TOC pp. 150–154, body p. 155 [33, 34]
    - Book 3 (Trauma): Part opening p. 363, cheatsheet pp. 364–367, local TOC pp. 368–372, body p. 373 [35-37]
    - Book 4 (Rewiring): Part opening p. 463, cheatsheet pp. 464–467, local TOC pp. 468–469, body p. 470 [38-41]
  - `ttheory-vol3.rc3.2.pdf`:
    - Book 1 (Music & Arts): Part opening p. 13, cheatsheet pp. 14–17, local TOC pp. 18–22, body p. 23 [42-44]
    - Book 2 (Society): Part opening p. 187, cheatsheet pp. 188–191, local TOC pp. 192–195, body p. 196 [45, 46]
    - Book 3 (Economics): Part opening p. 309, cheatsheet pp. 310–313, local TOC pp. 314–317, body p. 318 [47, 48]
    - Book 4 (Law): Part opening p. 394, cheatsheet pp. 395–398, local TOC pp. 399–401, body p. 402 [49-51]
    - Book 5 (PPE): Part opening p. 478, cheatsheet pp. 479–482, local TOC pp. 483–485, body p. 486 [52-54]
- **Standalone Documents:**
  - `booklet-gateway.rc3.2.pdf`, pages 1–4 [4, 8]
  - `book-philosophy.rc3.2.pdf`, pages 9–14 (TOC p. 7 lists p. 9; trailing unstripped markdown cheatsheet text p. 280) [4, 9]

---

🔍 Would you like to re-evaluate **TS-3 (Boundary clarity)** or proceed to compile the full UAT sign-off matrix for the rc3.2 release candidate?

## TS-3 Boundary clarity (FIX)

**Question:** Can a reader distinguish a domain-book boundary, a book chapter, a cheatsheet insert, and the master volume boundary from typography and TOC alone?

**ITEM:** TS-3 (Boundary clarity)

**STATUS:** FIX

**FINDING:**
1. **Typography Distinguishability (PASS):** In physical body pages, a reader can distinguish all four boundary levels through typography:
   - **Domain-Book Boundaries:** Clearly demarcated by dedicated, centered recto `\part` title pages in bold navy text, featuring the Green-ID, target reader routing, 61-decades scale diagram, and HUD field scan.
   - **Book Chapters:** Clearly demarcated by Level-1 headings styled with large colored typography, horizontal rule accents (`\color{rulecolor}\hrule height 0.6pt`), and dynamic alternating running headers.
   - **Cheatsheet Inserts:** Instantly recognisable by their distinctive 4-page parchment/tan background tint (`#F5EEDB`), two-column mathematical/type-theoretic tables, HUD boxes, and Sherlock/Moriarty audit panels.
   - **Master Volume Boundaries:** Clearly distinguished between standalone partition volumes (`ttheory-vol1.rc3.2.pdf`, `ttheory-vol2.rc3.2.pdf`, `ttheory-vol3.rc3.2.pdf`) by unique title pages with [T] QR stickers, distinct volume subtitles, independent front matter, and separate continuous pagination sequences.
2. **TOC Alone Distinguishability (FAIL / FIX):** A reader **cannot** navigate or distinguish these elements from the Table of Contents alone:
   - **Cheatsheet Inserts Omitted from TOC:** The 4-page cheatsheet inserts for Books 2 through 15 are **completely omitted** from both the Master TOC and Local TOCs across all master volumes. The only cheatsheet appearing in any TOC is Book 1 Gateway's closing cheatsheet. A reader consulting the TOC alone has no indication that 4-page reference cheatsheets exist at the openings of Physics, Neuroscience, Mathematics, Philosophy, etc., or what pages they occupy.
   - **Master TOC Sprawl Blurs Chapter Hierarchy:** Because global `--toc-depth=2` was enabled without restricting lower-level section scoping, the Master TOC runs for 8 to 25 physical pages across volumes, interleaving domain-book titles with hundreds of internal paper subheadings.
   - **Omnibus Lacks Volume Partitions:** Within `ttheory-omnibus.rc3.2.pdf`, the 15 domain books run as an unpartitioned sequence of parts without volume-level demarcations in either the Master TOC or body typography.

**EVIDENCE:**
- **Cheatsheet Absence in Master & Local TOCs:**
  - `ttheory-omnibus.rc3.2.pdf`:
    - Master TOC (pages 3–27): Page 3 lists Book 2 Physics at page 283 then jumps directly to body chapters at page 293 (cheatsheet on pages 284–287 is omitted); page 12 lists Book 6 Mathematics at page 727 then jumps to page 734 (cheatsheet on pages 728–731 is omitted); page 13 lists Book 7 Philosophy at page 781 then jumps to page 792 (cheatsheet on pages 782–785 is omitted). Only Gateway's closing cheatsheet appears (page 278, listed on TOC page 6).
    - Local TOCs: Physics local TOC (pages 288–292) starts at page 293 (omitting cheatsheet pages 284–287); Mathematics local TOC (pages 732–733) starts at page 734 (omitting pages 728–731); Philosophy local TOC (pages 786–791) starts at page 792 (omitting pages 782–785).
  - `ttheory-vol1.rc3.2.pdf`: Master TOC (pages 3–13) jumps from Physics at page 232 to page 242 (omitting cheatsheet pages 233–236) and Mathematics at page 367 to page 375 (omitting cheatsheet pages 368–371).
  - `ttheory-vol2.rc3.2.pdf`: Master TOC (pages 3–10) jumps from Neuroscience at page 11 to page 21 (omitting cheatsheet pages 12–15) and Philosophy at page 145 to page 155 (omitting cheatsheet pages 146–149).
  - `ttheory-vol3.rc3.2.pdf`: Master TOC (pages 3–12) jumps from Music & Arts at page 13 to page 23 (omitting cheatsheet pages 14–17) and Society at page 187 to page 196 (omitting cheatsheet pages 188–191).
- **Body Typographical Demarcation (Part Openers & Cheatsheet Styling):**
  - `ttheory-omnibus.rc3.2.pdf`: Book 1 Gateway part opening page 31, noir insert page 32, closing cheatsheet pages 279–282; Book 2 Physics part opening page 283, cheatsheet pages 284–287, chapter opening page 293; Book 6 Mathematics part opening page 727, cheatsheet pages 728–731; Book 7 Philosophy part opening page 781, cheatsheet pages 782–785.
  - `ttheory-vol1.rc3.2.pdf`: Title page 1; Book 2 Physics part opening page 232, cheatsheet pages 233–236, chapter opening page 242.
  - `ttheory-vol2.rc3.2.pdf`: Title page 1; Book 1 Neuroscience part opening page 11, cheatsheet pages 12–15, chapter opening page 21; Book 2 Philosophy part opening page 145, cheatsheet pages 146–149.
  - `ttheory-vol3.rc3.2.pdf`: Title page 1; Book 1 Music & Arts part opening page 13, cheatsheet pages 14–17, chapter opening page 23; Book 2 Society part opening page 187, cheatsheet pages 188–191.

## TH-1 Shared C1v2/C2 model (FIX)

**Question:** Compare the Papers omnibus and Fractal Thesis. Do both implement the approved two-level master TOC model: member title plus immediate internal chapter titles?

**ITEM:** TH-1 (Shared C1v2/C2 model)

**STATUS:** FIX

**FINDING:** Neither the Fractal Thesis nor the Papers omnibus implements the approved two-level master Table of Contents model (member/book title plus immediate internal chapter titles without a many-page subsection inventory) required by `OMNIBUS_DOCUMENT_MODEL.rc3.2.md` [1-3] and `BUILD_CONTEXT.rc3.2.md` [4]:

1. **Fractal Thesis (C2 Track):** In `ttheory-omnibus.rc3.2.pdf`, applying global `--toc-depth=2` [5, 6] without scoping lower headings causes the master TOC to sprawl across 25 physical pages (pages 3–27) [7, 8]. Rather than presenting a disciplined two-level view of domain-book titles plus immediate chapter titles, it dumps hundreds of subordinate paper sections and internal sub-headings into the front matter [9-12]. The partition volumes share this exact defect: `ttheory-vol1.rc3.2.pdf` contains an 11-page master TOC (pages 3–13) [13], `ttheory-vol2.rc3.2.pdf` spans 8 pages (pages 3–10) [14], and `ttheory-vol3.rc3.2.pdf` spans 10 pages (pages 3–12) [15].
2. **Papers Omnibus (C1v2 Track):** Under `BUILD_CONTEXT.rc3.2.md` (`paper/filters/omnibus.lua` and `paper/defaults/omnibus.yaml`) [5, 16], the build pipeline applies a uniform `shift_headers` across all documents [16]. It flattens book members (`soma-field-book`, `the-tensor`) under identical title headers as short papers rather than maintaining the promoted book-role hierarchy required by the C1v2 target in `OMNIBUS_DOCUMENT_MODEL.rc3.2.md` [1, 17]. Furthermore, `omnibus-a4.rc3.2.pdf` was not included in this candidate's staged manifest (`MANIFEST.rc3.2.md`, which stages only the `ttheory` track [18]; `dev-handover.rc3.2.md` notes it is staged under `uat/staging/papers/` [19]), precluding physical PDF page re-verification of the compiled Papers omnibus in this staging package [18].

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, pages 3–27
- `ttheory-vol1.rc3.2.pdf`, pages 3–13
- `ttheory-vol2.rc3.2.pdf`, pages 3–10
- `ttheory-vol3.rc3.2.pdf`, pages 3–12

## TH-2 Book-of-books integration (FIX)

**Question:** Does C2 read as fifteen coherent domain books within one programme rather than an undifferentiated long manuscript?

**ITEM:** TH-2 (Book-of-books integration)

**STATUS:** FIX

**FINDING:** C2 successfully establishes the structural and rhetorical framing of fifteen distinct domain books within one overarching programme: each domain book opens with a dedicated `\part` title page featuring domain metadata (Green-ID, target reader routing, 61-decades scale diagram, and HUD field scan), includes a registered four-page cheatsheet insert, provides a local Table of Contents, and features tailored introductory "kappa" chapters (e.g., addressing physicists, neuroscientists, legal scholars, or economists).

However, C2 still fails to read as a clean, integrated "book-of-books" rather than an undifferentiated long manuscript due to two major structural defects:
1. **Unscoped Master TOC Sprawl:** In `ttheory-omnibus.rc3.2.pdf`, applying global `--toc-depth=2` without restricting lower-level headings causes the Master TOC to sprawl across 25 physical pages (pages 3–27), dumping hundreds of internal paper subheadings into the front matter. This obscures the high-level fifteen-book architecture and presents the compendium as an exhaustive, undifferentiated manuscript inventory. The partition volumes share this exact defect (`ttheory-vol1.rc3.2.pdf` spans 11 pages, `ttheory-vol2.rc3.2.pdf` spans 8 pages, and `ttheory-vol3.rc3.2.pdf` spans 10 pages).
2. **Verbatim Inlining of Canonical Papers:** Rather than modularly cross-referencing shared literature or adapting content to each domain, the compilation pipeline inlines identical canonical papers verbatim across multiple domain books. For example, *The Soma-Field: A Wave-Based Model of Emotional Dynamics* is printed in full across six separate books (Physics, Computing, Mathematics, Geophysics, Economics, and Law); *The Zoomable Universal Somatic Field* is reprinted in full across four books (Gateway, Physics, Mathematics, and Complex Systems); and *Mathematical Co-identification* is reprinted across Computing, Economics, and Law. As explicitly audited and acknowledged in `book-philosophy.rc3.2.pdf`, this repeated embedding of an identical kernel in fifteen generated wrappers inflates manuscript bulk to over 1,500 pages and causes large sections of the omnibus to read as repetitive paper duplicates rather than fifteen differentiated, self-contained books.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`: Pages 3–27 (25-page Master TOC sprawl flattening all internal paper subheadings); Pages 20, 260, 686, 739, 1017, 1080, 1163, 1218, 1278, 1338, 1399, 1459 (Domain book part openings and introductory kappas)
- `ttheory-omnibus.rc3.2.pdf` (Verbatim paper inlining examples):
  - *The Soma-Field: A Wave-Based Model of Emotional Dynamics*: pages 297–312 (Physics), 677–683 (Computing), 724–725 (Mathematics), 1206–1207 (Geophysics), 1331–1332 (Economics), 1391–1392 (Law)
  - *The Zoomable Universal Somatic Field*: pages 215–254 (Gateway), 334–335 (Physics), 728 (Mathematics), 1043–1069 (Complex Systems)
  - *The Soma-Field Research Programme*: pages 677 (Computing), 1071 (Complex Systems), 1159 (Music & Arts), 1327 (Economics), 1380 (Law)
  - *Mathematical Co-identification*: pages 647–675 (Computing), 1329–1330 (Economics), 1389 (Law)
- `book-philosophy.rc3.2.pdf`: Pages 33–34 (Audit in Chapter 1 noting that the fifteen domain books are largely generated wrappers around a smaller repeated kernel, creating risk of overclaim through repetition), Pages 266–268, 271 (Audit in Chapter 18 confirming that domain books function as wrappers around a recurring kernel rather than independent domain investigations, concluding that a future series requires less inlined paper embedding and more original domain labour)
- `ttheory-vol1.rc3.2.pdf`: Pages 3–13 (Master TOC sprawl)
- `ttheory-vol2.rc3.2.pdf`: Pages 3–10 (Master TOC sprawl)
- `ttheory-vol3.rc3.2.pdf`: Pages 3–12 (Master TOC sprawl)

## TC-1 Entry points (PASS)

**Question:** For a reader opening a random volume page, do heading hierarchy, local TOC, and cheatsheet make the current book and its purpose obvious?

**ITEM:** TC-1 (Entry points)

**STATUS:** PASS

**FINDING:** For a reader opening to a random page in any volume, the combination of heading hierarchy, dynamic running headers, local Tables of Contents, and four-page cheatsheet inserts makes the current domain book and its intellectual purpose immediately obvious:

1. **Heading Hierarchy and Running Headers:** Every body page carries dynamic running headers—displaying the current domain book title on even verso pages (`\leftmark`) and the current chapter/section heading on odd recto pages (`\rightmark`), truncated with ellipses to prevent collision with folios. Chapter openings are distinctly styled with large bold sans-serif colored typography, chapter numbers, and horizontal rule accents (`\color{rulecolor}\hrule height 0.6pt`), while domain-book boundaries open with dedicated centered recto `\part` title pages providing the domain Green-ID, target reader routing, 61-decades scale diagram, and HUD field scan.
2. **Local Book TOCs:** A reader landing on a random page can flip back to the beginning of the containing domain book to find a dedicated local Table of Contents (`Book Contents` / local TOC) immediately preceding the body. This provides an immediate structural map of all internal chapters, sections, and embedded papers within that domain book without forcing the reader to navigate back to the master TOC in the front matter.
3. **Four-Page Reference Cheatsheets:** Located immediately after each domain book's part-opening page (and at the close of Gateway as a retrospective map), the four-page parchment-tinted (`#F5EEDB`) reference inserts summarize the master field equation, 20-scale mapping, clinical/mathematical frameworks, and Sherlock/Moriarty evidence audit for that specific domain.

**EVIDENCE:**
- **`ttheory-omnibus.rc3.2.pdf`:**
  - Book 1 (Gateway): Part opening page 23 (and body opener page 434), running headers and body pages 30–37, local TOC pages 435–436 (listing body chapters from page 215), closing cheatsheet pages 255–258 (and pages 452–455).
  - Book 2 (Physics): Part opening page 260 (and page 456), cheatsheet pages 261–264, local TOC / *The Green Propagator* page 266, chapter heading and horizontal rule accent page 268.
  - Book 4 (Neuroscience): Part opening page 403 (and page 486), cheatsheet pages 404–407, local TOC / *The Green Propagator* page 409, chapter heading page 410.
  - Book 3/6 (Mathematics): Part opening page 686 (and page 507), cheatsheet pages 687–690, local TOC / *The Green Propagator* page 692, body chapter page 692.
  - Book 7/15 (Philosophy): Part opening page 739 (and page 525), cheatsheet pages 740–743, local TOC page 745, body chapter page 751.
- **`ttheory-vol1.rc3.2.pdf`:**
  - Book 1 (Gateway): Part opening page 9, running headers and body pages 16–22, local TOC pages 612–614, closing cheatsheet pages 215–218.
  - Book 2 (Physics): Part opening page 220 (and page 633), cheatsheet pages 221–224, local TOC page 226, chapter heading page 228.
  - Book 3 (Mathematics): Part opening page 349 (and page 665), cheatsheet pages 350–353, local TOC page 355, chapter heading page 355.
- **`ttheory-vol2.rc3.2.pdf`:**
  - Book 1 (Neuroscience): Part opening page 8 (and page 721), cheatsheet pages 9–12, local TOC page 14, chapter heading page 14.
  - Book 2 (Philosophy): Part opening page 132 (and page 726), cheatsheet pages 133–136, local TOC page 138, body chapter page 144.
  - Book 3 (Trauma): Part opening page 351 (and page 798), cheatsheet pages 352–355, local TOC page 357, chapter heading page 357.
- **`ttheory-vol3.rc3.2.pdf`:**
  - Book 1 (Music & the Arts): Part opening page 8 (and page 819), cheatsheet pages 9–12, local TOC page 14, chapter heading page 15.
  - Book 2 (Society): Part opening page 175 (and page 829), cheatsheet pages 176–179, local TOC page 181, chapter heading page 181.
  - Book 4 (Law): Part opening page 375 (and page 842), cheatsheet pages 376–379, local TOC page 381, chapter heading page 382.
  - Book 5 (PPE): Part opening page 455 (and page 853), cheatsheet pages 456–459, local TOC page 461, chapter heading page 461.
- **`book-philosophy.rc3.2.pdf`:**
  - Standalone volume opening page 1, Table of Contents page 7, four-page cheatsheet pages 9–14, chapter 1 heading page 21.

## TC-2 The Chocolate Biscuit Monster: the dunk test (PASS)

**Question:** For each volume, can its purpose be told in at most 120 words of plain English from its opening pages alone? Give the summary and the page used.

**ITEM:** TC-2 (The Chocolate Biscuit Monster: the dunk test) [1]

**STATUS:** PASS [1]

**FINDING:** For every volume and standalone document in the rc3.2 release candidate, the core purpose can be clearly stated in plain English in well under 120 words from its opening pages alone, passing the "dunk test" within a one-minute reading window [1]:

1. **`ttheory-omnibus.rc3.2.pdf`** (54 words, drawn from page 28 / page 31):
   *"The [T]-Theory Omnibus compiles the fifteen domain books of Soma Field Theory into a single architectural reference [2, 3]. It proposes a scale-invariant tensor field equation linking M-theory compactification to affective dynamics across sixty-one orders of magnitude—from Planck foam to the observable cosmos—grounded in Lean 4 proofs, statevector simulations, and domain-specific translations."* [4-6]

2. **`ttheory-vol1.rc3.2.pdf`** (52 words, drawn from page 14 / page 17):
   *"[T]-Theory Volume I establishes the mathematical and physical foundations of the Universal Somatic Field. It derives the master Helmholtz and d'Alembertian field equations from M-theory compactification, models the twenty-scale hierarchy, and formalises type-theoretic structures in Lean 4, providing the rigorous basis for subsequent biological and human-scale applications."* [7-9]

3. **`ttheory-vol2.rc3.2.pdf`** (45 words, drawn from page 11 / page 14):
   *"[T]-Theory Volume II applies the somatic field framework to neuroscience, psychology, and trauma recovery [10]. It models brain dynamics as field-modulated Hopfield networks, investigates quantum-adjacent reachability across affective barriers in toy models, and provides non-pathologising dynamical accounts of neurodivergence, stress, and therapeutic transformation."* [10, 11]

4. **`ttheory-vol3.rc3.2.pdf`** (44 words, drawn from page 13 / page 15):
   *"[T]-Theory Volume III extends the Universal Somatic Field to social systems, economics, law, and creative expression [12]. It investigates collective synchronization, institutional ergodicity, and aesthetic attractor landscapes, demonstrating how scale-invariant field equations offer unifying metaphors and mathematical models across human civilization and astrophysical scales."* [12-14]

5. **`book-philosophy.rc3.2.pdf`** (42 words, drawn from page 1 / page 15):
   *"The Philosophy of [T]-Theory examines the methodology, epistemology, and ontological commitments of the research programme [15, 16]. It separates mathematical definitions and Lean-verified formal terms from physical hypotheses and interpretive models, articulating an evidence-auditing framework (Sherlock/Moriarty) to govern AI-assisted interdisciplinary science."* [5, 16, 17]

6. **`booklet-gateway.rc3.2.pdf`** (38 words, drawn from page 1):
   *"The Gateway is an executive four-page reference overview of [T]-Theory [18, 19]. It summarizes the master field equation, sixty-one-decade scale hierarchy, type-theoretic Lean verification status, and cosmological constant predictions, serving as an accessible entry point to the fifteen domain books."* [3, 18]

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, page 28 and page 31 [6, 20]
- `ttheory-vol1.rc3.2.pdf`, page 14 and page 17 [7]
- `ttheory-vol2.rc3.2.pdf`, page 11 and page 14 [10]
- `ttheory-vol3.rc3.2.pdf`, page 13 and page 15 [12]
- `book-philosophy.rc3.2.pdf`, page 1 and page 15 [15, 21]
- `booklet-gateway.rc3.2.pdf`, page 1 [18]

---

🔍 Would you like to proceed with evaluating **TC-3 (The Root Monster: the roots under every tower)** to examine the Lean 4 proof surface, axioms, and placeholder statuses across the rc3.2 candidate? [22]

## TC-3 The Root Monster: the roots under every tower (PASS)

**Question:** Where a volume says a result is proved, does it name the Lean theorem and say whether it rests on an axiom, a sorry or only proves a placeholder? List the volumes that do and do not, with pages.

**ITEM:** TC-3 (The Root Monster: the roots under every tower)

**STATUS:** PASS

**FINDING:** Across all master volumes and the philosophy book, wherever a result is claimed as proved, the text explicitly names the Lean 4 declarations, traces the dependency graph, and strictly distinguishes kernel-verified proofs from axioms, sorries, and placeholders:

1. **Volumes that DO provide full root breakdowns:**
   - **`book-philosophy.rc3.2.pdf`:** Thoroughly audits the Lean proof surface. It names individual theorems (`somaField_iso_mtheory`, `consciousness_dichotomy`, `organism_hierarchy`, `boundary_not_interior`, `freefield_USF_satisfies_OS_axioms`, `scale_shift_preserves_structure`, `awe_is_universal`, `W8ℝ_isHermitian`, `propagator_beats_classical`); explicitly classifies `FieldAxioms.lean` as an axiom registry of 20 premises rather than established theorems (e.g., `PerceptIsPropagatorPole`, `AttractorIsHopfieldMinimum`, `TherapyIsRGFlow`); identifies external/local axioms (`quant_exp_1` in `LimbicTunnel.lean`, `greens_achieves_minimum_energy` in `SwarmPropagator.lean`, `moduli_space_is_G2_homotopy` in `BRECVEMAVariational.lean`); confirms that the 5 real sorries in the repository were closed in October 2026; audits how an external sorry in Physlib (`Cosmology.FLRW`) was eliminated by implementing an internal FLRW structure; and explicitly flags placeholders proving trivial propositions (`X7_is_7D_product` proving `True`, and `greens_fn_is_SHO` upgraded from `True` to the classical ODE jump).
   - **`ttheory-omnibus.rc3.2.pdf`:** Contains dedicated Lean evidence ledgers and verification tables. It names theorems (`somaField_iso_mtheory`, `organism_hierarchy`, `greens_fn_is_SHO`, `consciousness_dichotomy`, `propagator_beats_classical`), labels `X7_is_7D_product` as a placeholder proving only `True`, isolates `FieldAxioms.lean` as 20 axioms, and audits the closure of the 5 real sorries.
   - **`ttheory-vol1.rc3.2.pdf`:** Documents Lean verifications in Physics and Mathematics. It names theorems (`somaField_iso_mtheory`, `organism_hierarchy`, `scale_shift_preserves_structure`, `nineteen_scales_have_real_types`), notes that `greens_fn_is_SHO` proves the classical ODE jump while the distributional identity remains open, marks `X7_is_7D_product` as a `True` placeholder, and records the elimination of Physlib's FLRW sorry.
   - **`ttheory-vol2.rc3.2.pdf`:** Audits neuroscience, trauma, and psychological models. It names theorems (`correspondence_principle`, `stress_raises_temp`, `modulation_monotone`, `adhd_hotter_than_autism`, `softmax_nonneg`, `lse_ge_max` in `LimbicHopfield.lean`; `quant_exp_1_awe_reachable` in `QuantumSim.lean`), explicitly labels `quant_exp_1` and `moduli_space_is_G2_homotopy` as axioms, and notes that `consciousness_dichotomy` proves only a real-number linear order split rather than biological consciousness.
   - **`ttheory-vol3.rc3.2.pdf`:** Covers social systems, economics, law, and PPE. It names Lean theorems (`somaField_iso_mtheory`, `QuantumSim.quant_exp_1_awe_reachable`), explicitly classifies `FieldAxioms.lean` as an axiom registry whose dependent results are assumption-bound, and audits the 0-sorry status.

2. **Volumes/documents that DO NOT provide root breakdowns:**
   - **`booklet-gateway.rc3.2.pdf`:** As a compressed four-page executive reference card, its opening page asserts *"Proved (Lean 4, 0 sorries)"* for broad claims (e.g., *"SHO = Green's function"*, *"11D manifold = minimum geometry"*) without naming the specific Lean theorem identifiers, without stating whether they rest on axioms, and without disclosing that distributional identities or physical compactifications remain unproved. While page 4 lists Lean file names and 4 proof obligations, it does not provide the declaration-level root accounting given in the full volumes.

**EVIDENCE:**
- **`book-philosophy.rc3.2.pdf`:** Pages 8, 9, 11, 25–28, 30–31, 125–126, 131–134, 140–147, 151–166, 169–173, 176–178, 204–207, 210, 214–220, 223–227, 234–236
- **`ttheory-omnibus.rc3.2.pdf`:** Pages 64, 71–75, 79–82, 87–88, 91–97, 111–116, 120, 124–127, 146, 183
- **`ttheory-vol1.rc3.2.pdf`:** Pages 79–82, 97, 140–147, 240–243, 248–252, 262, 267–269, 280–288, 303
- **`ttheory-vol2.rc3.2.pdf`:** Pages 101, 105, 114–116, 339–341, 359–360, 368–369, 377, 380–385, 394–398, 401, 424–427
- **`ttheory-vol3.rc3.2.pdf`:** Pages 430–431, 433, 444, 447–448, 452–454, 458, 460–463
- **`booklet-gateway.rc3.2.pdf`:** Pages 1, 4

---

🔍 Would you like to proceed with evaluating **TC-4 (The BOFH Monster: tries to make it overclaim)** or compile the complete UAT Acceptance Decision Table?

## TC-4 The BOFH Monster: tries to make it overclaim (PASS)

**Question:** Find the three sentences that, quoted alone, would most overclaim (a cure, a proof of consciousness, a quantum result about people, a clinical effect). For each, does the sentence itself, or its paragraph, carry the evidence label or hedge that stops the overclaim? Then answer as the volumes would: "So this cures trauma?", "You proved consciousness in Lean?", "The quantum computer found awe?" Cite the pages used.

**ITEM:** TC-4 (The BOFH Monster: tries to make it overclaim)

**STATUS:** PASS

**FINDING:** Across all rc3.2 volumes and standalone books, the three sentences that would most overclaim if quoted in isolation are strictly protected by immediate evidence labels, mathematical qualifiers, and explicit textual hedges in their surrounding paragraphs. Furthermore, the texts explicitly anticipate and answer hostile or skeptical challenges (the BOFH dunk tests):

1. **Trauma and Clinical Cure:**
   - **Isolated Overclaim Sentence:** *"The barrier between Fear and Awe is topological. Classical therapy climbs. In the toy model, a transverse-field simulation can traverse a barrier that the tested cold classical baseline does not."* [1] (or the compressed form: *"Trauma-as-topology; quantum-like traversal in a toy model"* [1]).
   - **Immediate Label / Hedge:** Labeled `simulated` and `open-hypothesis` [2, 3]. The sentence itself explicitly restricts the claim to a *"toy model"* and a *"tested cold classical baseline"* [1]. Its immediate paragraph and companion limitations section specify: *"It is not clinical advice or a treatment either: trauma enters as a model of a state space, not as a diagnosis"* [4]; *"QUANT-EXP-1 uses exact statevector simulation... It does not say that the human brain uses that mechanism... It does not say therapy works by quantum annealing"* [5]; and *"The clinical implication is not 'put patients in a quantum computer.' It is a research hypothesis... efficacy and mechanism require controlled clinical evidence"* [6, 7].
   - **Answer to "So this cures trauma?":** **No.** Trauma is formulated as a topological barrier and attractor basin within an abstract 8-qubit, 256-state toy Hamiltonian, not as a medical or psychological diagnosis [2, 4]. The model demonstrates mathematical reachability across an energy barrier under an annealing schedule; it does not constitute clinical therapy, medical advice, or an established human treatment [4-6].
   - **Pages Used:** `ttheory-omnibus.rc3.2.pdf`, pages 50, 64–65, 80–84, 101–103; `ttheory-vol1.rc3.2.pdf`, pages 182–185, 224–226; `ttheory-vol2.rc3.2.pdf`, pages 200–202, 328, 421–425; `book-philosophy.rc3.2.pdf`, pages 8, 27, 346.

2. **Proof of Consciousness:**
   - **Isolated Overclaim Sentence:** *"ScaleUniverse.lean — consciousness threshold (sharp spectral gap dichotomy)..."* [8, 9] or *"Consciousness threshold: Awareness emerges when the CEMI field amplitude \\(\phi \ge T_c = \sqrt{2}\\) (normalised units). Proved: UniversalSomaticField.consciousness_dichotomy"* [10, 11].
   - **Immediate Label / Hedge:** Labeled `kernel-verified` strictly for real arithmetic, but paired with `open-hypothesis` for any physical or phenomenal claim [12, 13]. The immediate text clarifies: *"Theorem (Lean 4 kernel-checked, UniversalSomaticField.consciousness_dichotomy): For any \\(\phi \in \mathbb{R}\\), either \\(\phi < T_c\\) or \\(\phi \ge T_c\\). This is a split for a model predicate, not a proof of phenomenal awareness"* [14, 15]. `book-philosophy.rc3.2.pdf` explicitly adds: *"consciousness_dichotomy is formally lt_or_ge \\(\phi\\) \\(\sqrt{2}\\)... As a theorem about real numbers under the definitions in the file, it is secure and nearly trivial kernel-verified. The stronger sentence, however, that consciousness itself is a threshold crossing of limbic amplitude at \\(T_c = \sqrt{2}\\), is not thereby proved. It requires an operational measure of \\(\phi\\), a calibration of \\(T_c\\), a criterion of report or awareness, and disconfirming tests open-hypothesis"* [16, 17].
   - **Answer to "You proved consciousness in Lean?":** **No.** Lean verifies only an elementary order completeness fact on real numbers (\\(\phi < \sqrt{2} \lor \sqrt{2} \le \phi\\)) for an identifier labeled `isConscious` in code [16, 18, 19]. It proves the formal hygiene of a mathematical definition, not that biological organisms instantiate first-person phenomenal experience at that threshold [17, 20, 21].
   - **Pages Used:** `book-philosophy.rc3.2.pdf`, pages 2–5, 8, 28–30, 37–39, 155, 166–167, 178; `ttheory-omnibus.rc3.2.pdf`, pages 51, 64, 74–76, 88, 109–110; `ttheory-vol1.rc3.2.pdf`, pages 221, 223, 245–247; `ttheory-vol2.rc3.2.pdf`, pages 327, 342–343, 355–356.

3. **Quantum Computing and Emotion:**
   - **Isolated Overclaim Sentence:** *"QuantumSim.lean — Born probability of |awe⟩ > 0 after WKB gate (quantum advantage real)"* [8].
   - **Immediate Label / Hedge:** Labeled `simulated` [22-24]. The text explicitly qualifies the cheat sheet bullet with *"simulated; no hardware claim"* [25-27]. The accompanying prose states: *"QUANT-EXP-1 should be read as exact simulation evidence, not hardware, therapy, or consciousness proof"* [28, 29]; *"no IBM account, runs in \\(\approx 4\\) seconds on commodity CPU"* [30, 31]; and the October 2026 audit clarifies: *"The quantum figure, peak Awe-dominant occupancy 0.41, is the probability of a set of 64 of the 256 states (Awe on, Fear off); the uniform superposition the anneal starts from already gives 0.25. The probability of the Awe state itself ends below 0.01... The result is therefore a model result about occupancy under a fast sweep, not an advantage over classical optimisation"* [32, 33].
   - **Answer to "The quantum computer found awe?":** **No.** No quantum computer was used [2, 34]. The experiment is an exact 8-qubit classical statevector calculation running on a standard laptop CPU in ~4 seconds [2, 30]. "Awe" is merely the string label of an arbitrary bitstring basis state in a 256-dimensional toy model, and the result is a demonstration of reachability in an idealized Hamiltonian under a fast sweep, not an affective experience [2, 32, 33].
   - **Pages Used:** `book-philosophy.rc3.2.pdf`, pages 1, 6, 8, 20, 27, 34, 143; `ttheory-omnibus.rc3.2.pdf`, pages 52, 54–57, 64, 78–84, 97, 101–103; `ttheory-vol1.rc3.2.pdf`, pages 222, 224–226, 265, 270–274; `ttheory-vol2.rc3.2.pdf`, pages 324, 326, 427, 432–436.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`: pages 50–52, 54–57, 64–65, 74–76, 78–84, 88, 97, 101–103, 109–110
- `book-philosophy.rc3.2.pdf`: pages 1–5, 8, 20, 27–30, 34, 37–39, 143, 155, 166–167, 178, 346
- `ttheory-vol1.rc3.2.pdf`: pages 182–185, 221–226, 245–247, 265, 270–274
- `ttheory-vol2.rc3.2.pdf`: pages 200–202, 324, 326–328, 342–343, 355–356, 421–425, 427, 432–436

---

🔍 **Next Step:** Would you like to compile the finalized **Acceptance Decision Table** across all Sherlock, Wizard, and Monster items for candidate rc3.2?

## CMP rc3.2 against rc3.1 (BETTER)

**Question:** Two versions of this release candidate are loaded; every source title ends with its version: rc3.1 (previous) and rc3.2 (new). Using the questions in ttheory-nlm-uat.rc3.2.md, is rc3.2 BETTER, the SAME or WORSE than rc3.1? For each worksheet area, give the concrete differences, citing the exact filename (with version) and page on both sides. End with one line: VERDICT: BETTER, SAME or WORSE. Of rc3.1 only these are loaded: BUILD_CONTEXT.rc3.1.md, MANIFEST.rc3.1.md, OMNIBUS_DOCUMENT_MODEL.rc3.1.md, PAPERS.rc3.1.md, book-philosophy.rc3.1.pdf, booklet-gateway.rc3.1.pdf, dev-handover.rc3.1.md, papers-build-review.rc3.1.md, staging-readme-ttheory.rc3.1.md, ttheory-build-review.rc3.1.md, ttheory-nlm-uat.rc3.1.md, ttheory-omnibus.rc3.1.pdf, ttheory-vol1.rc3.1.pdf, ttheory-vol2.rc3.1.pdf; compare like with like.

A concrete, like-with-like comparison between **rc3.1** and **rc3.2** across each worksheet area defined in `ttheory-nlm-uat.rc3.2.md` [1]:

---

### 1. Sherlock: Build and Structure (TS-1, TS-2, TS-3)

*   **TS-1 (Master TOC hierarchy):**
    *   **rc3.1:** Master TOC was truncated at global depth 1, listing only the 15 domain-book titles without any internal chapter titles (`ttheory-omnibus.rc3.1.pdf`, pages 4–5 [2, 3]; `ttheory-vol1.rc3.1.pdf`, page 3; `ttheory-vol2.rc3.1.pdf`, page 3).
    *   **rc3.2:** Master TOC exposes internal chapter titles beneath domain books via `--toc-depth=2`, but because lower-level paper sub-headings were not filtered out, the TOC sprawls across 25 physical pages (`ttheory-omnibus.rc3.2.pdf`, pages 3–27 [4-8]; `ttheory-vol1.rc3.2.pdf`, pages 3–13 [9]; `ttheory-vol2.rc3.2.pdf`, pages 3–10 [10]; `ttheory-vol3.rc3.2.pdf`, pages 3–12 [11]).
    *   *Difference:* rc3.2 fixes the depth-1 truncation defect of rc3.1, but introduces an unscoped 25-page subsection inventory.
*   **TS-2 (Registered insertions):**
    *   **rc3.1:**
        *   Gateway noir insert was missing entirely (`ttheory-omnibus.rc3.1.pdf`, page 6 skips directly from title to cheatsheet; `ttheory-vol1.rc3.1.pdf`, page 3).
        *   Gateway's cheatsheet occurred as an *opening* insert (`ttheory-omnibus.rc3.1.pdf`, pages 6–10; `ttheory-vol1.rc3.1.pdf`, pages 3–7), violating the C2 closing handout rule.
        *   The philosophy cheatsheet was placed at the back after Appendix D (`book-philosophy.rc3.1.pdf`, page 253 [12]).
    *   **rc3.2:**
        *   Gateway noir page is restored immediately after the part title page (`ttheory-omnibus.rc3.2.pdf`, page 32; `ttheory-vol1.rc3.2.pdf`, page 15).
        *   Gateway cheatsheet is correctly repositioned to the very end of Book 1 as a closing retrospective handout (`ttheory-omnibus.rc3.2.pdf`, pages 278–282 [4]; `ttheory-vol1.rc3.2.pdf`, pages 227–231 [9]).
        *   Philosophy cheatsheet is placed at the registered opening position (`book-philosophy.rc3.2.pdf`, pages 9–14 [13]).
    *   *Difference:* rc3.2 fully passes TS-2, resolving all insertion defects present in rc3.1.
*   **TS-3 (Boundary clarity):**
    *   **rc3.1:** Local TOCs were absent across all composite domain book openings (`ttheory-omnibus.rc3.1.pdf`, pages 6, 206, 292, 511; `ttheory-vol1.rc3.1.pdf`, page 176; `ttheory-vol2.rc3.1.pdf`, pages 3, 150).
    *   **rc3.2:** Dedicated local Tables of Contents are implemented at every domain-book opening (`ttheory-omnibus.rc3.2.pdf`, pages 34–41, 288–292, 732–733, 786–791 [4, 5]; `ttheory-vol1.rc3.2.pdf`, pages 237–241, 372–374; `ttheory-vol2.rc3.2.pdf`, pages 16–20, 150–154; `ttheory-vol3.rc3.2.pdf`, pages 18–22, 192–195). Cheatsheets for Books 2–15 remain omitted from TOC listings.
    *   *Difference:* rc3.2 establishes clear book boundaries and local navigation on physical pages where rc3.1 had none.

---

### 2. The Wizard: Model Consistency (TH-1, TH-2)

*   **TH-1 (Shared C1v2/C2 model):**
    *   **rc3.1:** Only Volumes I and II existed (`MANIFEST.rc3.1.md` [14]; `ttheory-vol1.rc3.1.pdf`; `ttheory-vol2.rc3.1.pdf`), leaving Books 9–15 unrepresented in volume partitions.
    *   **rc3.2:** Volume partitioning is completed across the entire 15-book corpus with the introduction of `ttheory-vol3.rc3.2.pdf` (pages 1–550; `MANIFEST.rc3.2.md` [15]). Both versions share a FIX on the two-level master TOC standard.
    *   *Difference:* rc3.2 completes the full three-volume physical partition architecture.
*   **TH-2 (Book-of-books integration):**
    *   **rc3.1:** Domain books lacked local TOCs and suffered from incomplete volume partitioning, causing the omnibus to read like an undifferentiated compilation (`ttheory-omnibus.rc3.1.pdf`, pages 4–6).
    *   **rc3.2:** Each domain book has a standardized opening sequence (`\part` title page, registered cheatsheet, local TOC, and introductory "kappa" chapter; `ttheory-omnibus.rc3.2.pdf`, pages 31, 34–41, 283, 288–292 [4, 16, 17]).
    *   *Difference:* rc3.2 provides complete structural framing for all fifteen books, though both candidates inline shared canonical papers verbatim.

---

### 3. The Monster: Reader Navigation (TC-1, TC-2, TC-3, TC-4)

*   **TC-1 (Entry points):**
    *   **rc3.1:** A reader opening to a random page had no local TOC to navigate internal chapters without flipping back hundreds of pages to the front matter (`ttheory-omnibus.rc3.1.pdf`, pages 206–210; `ttheory-vol1.rc3.1.pdf`, pages 176–180).
    *   **rc3.2:** Every domain book features a local TOC directly preceding the body chapters, paired with dynamic running headers and opening cheatsheet summaries (`ttheory-omnibus.rc3.2.pdf`, pages 288–292, 732–733, 786–791 [4, 5]; `ttheory-vol1.rc3.2.pdf`, pages 237–241; `ttheory-vol2.rc3.2.pdf`, pages 16–20; `ttheory-vol3.rc3.2.pdf`, pages 18–22).
    *   *Difference:* rc3.2 moves TC-1 from FIX to PASS.
*   **TC-2 (The Chocolate Biscuit Monster: the dunk test):**
    *   **rc3.1:** Front-matter orientation was incomplete due to missing Volume III and the inverted Gateway opening (`ttheory-omnibus.rc3.1.pdf`, page 6; `book-philosophy.rc3.1.pdf`, page 1).
    *   **rc3.2:** Every volume and standalone booklet presents a concise plain-English orientation summary under 60 words on its opening pages (`ttheory-omnibus.rc3.2.pdf`, page 28/31; `ttheory-vol1.rc3.2.pdf`, page 14; `ttheory-vol2.rc3.2.pdf`, page 11; `ttheory-vol3.rc3.2.pdf`, page 13; `book-philosophy.rc3.2.pdf`, page 1; `booklet-gateway.rc3.2.pdf`, page 1).
    *   *Difference:* rc3.2 successfully provides clean under-120-word summaries across all volumes.
*   **TC-3 (The Root Monster: Lean proof surface):**
    *   **rc3.1:**
        *   Five real sorries remained active in repository proof files (`ttheory-omnibus.rc3.1.pdf`, pages 6, 63, 67; `book-philosophy.rc3.1.pdf`, pages 16, 215–221).
        *   An external sorry in Physlib's `Cosmology.FLRW` propagated through 17 declarations (`book-philosophy.rc3.1.pdf`, pages 215–221; `ttheory-vol1.rc3.1.pdf`, page 201).
        *   `greens_fn_is_SHO` was a placeholder theorem proving only `True` (`ttheory-omnibus.rc3.1.pdf`, page 82; `ttheory-vol1.rc3.1.pdf`, page 205).
    *   **rc3.2:**
        *   **All five repository sorries were closed in October 2026** (`book-philosophy.rc3.2.pdf`, pages 34, 125–126, 175 [18, 19]; `ttheory-omnibus.rc3.2.pdf`, pages 120, 136, 141 [16, 20-22]; `ttheory-vol1.rc3.2.pdf`, pages 254, 273).
        *   The Physlib `FLRW` sorry dependency was eliminated by implementing an internal, sorry-free FLRW structure (`book-philosophy.rc3.2.pdf`, pages 155, 157 [23, 24]; `ttheory-vol1.rc3.2.pdf`, page 263 [25]).
        *   `greens_fn_is_SHO` was upgraded to a verified classical ODE jump theorem (`book-philosophy.rc3.2.pdf`, page 144; `ttheory-omnibus.rc3.2.pdf`, page 140 [26]; `ttheory-vol1.rc3.2.pdf`, page 257 [27]).
    *   *Difference:* rc3.2 delivers a substantial formal proof advance, eliminating all known active sorries.
*   **TC-4 (The BOFH Monster: claim guardrails):**
    *   **rc3.1:** Contained claim ledgers and hedges (`book-philosophy.rc3.1.pdf`, pages 230–236; `ttheory-omnibus.rc3.1.pdf`, pages 6, 71).
    *   **rc3.2:** Adds rigorous auditing around quantum reachability and clinical trauma (`stress_quant.py`, negative controls A/B, bootstrap confidence intervals), explicitly rejecting hardware quantum advantage and clinical efficacy claims (`ttheory-omnibus.rc3.2.pdf`, pages 78–84 [4, 16]; `book-philosophy.rc3.2.pdf`, pages 8, 34, 37–39, 143 [13, 18]; `ttheory-vol1.rc3.2.pdf`, pages 182–185).
    *   *Difference:* rc3.2 tightens evidentiary boundaries and audit ledgers.

---

VERDICT: BETTER
