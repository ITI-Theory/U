# Sherlock concept registry

One YAML file per concept: the concept, its ontology class (OpenCyc or OWL), its
Lean declaration, the papers and Soma Machine levels it belongs to, and the
evidence label the text gives it. `make concepts` (paper/scripts/check_concepts.py)
looks each Lean name up, derives its real status from the source (kernel-verified,
sorry, axiom, definition), checks papers and levels, and lists the gaps: concepts
with no ontology class or no Lean declaration, and labels the proofs do not support.
The Soma Machine shows them per level in the SHERLOCK panel (the same status code via
apps/.../scripts/generate.py). Seeded 9 Oct 2026 from EmotionOntology.lean (its CycRef interpreter) and seven
central theorems. Design: ISS-046 (Sherlock), author note 8 of 7 Oct (map OWL classes
to Lean types).

```yaml
id: emotion-joy                  # = file name
concept: Joy
kind: emotion                    # emotion | mechanism | programme | ...
ontology: {system: OpenCyc, class: "#$Joy-Emotion"}   # class: null is a gap
lean: {module: EmotionOntology, name: EmotionLang.joy}  # module = file stem
papers: [P1, P9]                 # ids from Dist/PAPERS.yaml
levels: [human-vertebrate]       # ids from registry/levels
label: kernel-verified           # optional evidence label of the claim
notes: ...
```
