import Cyc.Core

/-!
# The programme's shared vocabulary microtheory

Every affidavit about a [T]-Theory document puts the document's claims in a
microtheory of its own (`<Doc>Mt`) that inherits `TTheoryVocabularyMt`, which
inherits OpenCyc's `UniversalVocabularyMt`. Concepts used by several
documents (the Soma-Field, scale levels, an emotional score) are defined here
once, so that structure mapping and cross-document checks compare the same
constants (design decisions D2, D3 in the Sherlock epic, ISS-055). A
contradiction between documents shows up in a microtheory that inherits
both.
-/

namespace Cyc.TTheory

open Sentence

abbrev UV : Mt := .c "UniversalVocabularyMt"
abbrev TT : Mt := .c "TTheoryVocabularyMt"

axiom tt_uv : GenlMt TT UV

/-- What OpenCyc holds holds in the programme's vocabulary. -/
theorem liftTT {φ : Sentence} (h : Holds UV φ) : Holds TT φ := inherit tt_uv h

/-- A document microtheory inheriting the programme's vocabulary sees OpenCyc. -/
theorem liftDoc {m : Mt} {φ : Sentence} (hm : GenlMt m TT) (h : Holds UV φ) : Holds m φ :=
  inherit hm (liftTT h)

end Cyc.TTheory
