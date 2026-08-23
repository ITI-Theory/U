# Reader-Facing Diagram Audit

## Rule

Reader-facing diagrams must be semantic figures, tables, or callouts. Unicode
box-drawing in an untyped fenced Markdown block is a pending conversion, not a
print asset. Typed fenced blocks such as `lean`, `python`, `bash`, and `latex`
remain code and are not diagram findings.

`make check-unicode-diagrams` reports every pending block. Add `STRICT=1` to
make outstanding findings fail a release gate after the migration is complete.

## Completed

| Source | Former block | Replacement | Reuse |
|---|---|---|---|
| `soma-field-book` | Polyvagal Ladder | `figures/fig_polyvagal_ladder.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-book` | Interoceptive Body Map | `figures/fig_interoceptive_body_map.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-book` | Memory-kernel comparison | `figures/fig_memory_kernel.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-book` | Structural-fraction curve | `figures/fig_structural_fraction.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-book` | Parabolic valley cross-section | `figures/fig_parabolic_valley.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-book` | Wick rotation comparison | `figures/fig_wick_rotation.pdf` | C1v2, Vol I/II, Fractal books that embed P6 |
| `soma-field-paper` | Field-mode threshold sketch | `figures/fig0_field_mode.pdf` | C1v2, Vol I/II, Fractal books that embed P1 |
| `soma-field-paper` | Energy-landscape sketch | `figures/fig3b_energy_profile.pdf` | C1v2, Vol I/II, Fractal books that embed P1 |
| `soma-field-patient-pov` | Coupled somatic/neural waves | `figures/fig_coupled_waves.pdf` | Vol II and Fractal clinical books |
| `soma-field-patient-pov` | MIDI controller schematic | `figures/fig_midi_controller.pdf` | Vol II and Fractal clinical books |

## Pending Source Families

| Source | Current blocks | Intended treatment |
|---|---|---|
| `soma-field-book` | Memory-kernel comparison, decay curve, state tables, time plots, framed explanatory blocks | TikZ figures for plotted dynamics; semantic tables for state comparisons; callouts for explanatory panels |
| `soma-field-paper` | Field-mode plot, energy landscape, instrument/data-flow diagrams, ontology/scale diagrams | Existing vector figures where available; new TikZ architecture figures otherwise |
| `soma-field-patient-pov` | Coupled somatic/neural-wave architecture and related model diagrams | Reuse or extend the shared architecture figure |
| `lean-proofs-appendix` | Lean server and renderer architecture diagrams | TikZ system diagrams; retain actual Lean code as code |
| `experimental-validation` | Unicode analytical displays detected by audit | Classify individually as result figure, data table, or code output |

## Acceptance Criteria

- Figure assets are vector PDF or print-resolution bitmap assets with a source file.
- Tables can wrap and remain intact across page boundaries.
- A caption states what the reader should learn from the asset.
- Rendered Vol I/II at 10pt contain no clipped reader-facing diagram content.
- `make check-unicode-diagrams STRICT=1` passes before print promotion.
