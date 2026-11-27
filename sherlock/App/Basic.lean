/-!
# The Soma Machine, audited against what it should show (USC; ISS-127)

The author's design, AI Mode 26 Nov (thread visual-audit: "prove the app shows what the thesis says, from
screenshots and on-screen labels, neuro-symbolically"), in Bool form so that `decide` and `#eval` settle it.
The rules come from the app's code and the registry (`sherlock/appaudit.py`); the observations from the
screen: `seen` is what OCR read in the screenshot (the black box), `dom` what the page's visible text holds
(the white box). The neural part is only the reading; the checks are here.
-/

namespace App

/-- A label that must be on screen in a state: everywhere (no level), or on one level, between two dimensions. -/
structure Rule where
  label : String
  level : String := ""
  minDim : Nat := 4
  maxDim : Nat := 11
  layer : String
  deriving Repr

/-- A label that must not be on screen at a dimension (it belongs to a layer that is off). -/
structure Forbidden where
  label : String
  level : String
  dim : Nat
  layer : String
  deriving Repr

structure Observation where
  level : String
  dim : Nat
  rendered : Nat
  seen : List String
  dom : List String
  deriving Repr

/-- A deliberate omission, with its reason (26 Nov: "if I left something out deliberately that has to be tagged"). -/
structure Omission where
  label : String
  level : String
  dim : Nat
  reason : String
  deriving Repr

def Rule.applies (r : Rule) (o : Observation) : Bool :=
  (r.level.isEmpty || r.level == o.level) && r.minDim ≤ o.dim && o.dim ≤ r.maxDim

def omitted (om : List Omission) (o : Observation) (l : String) : Bool :=
  om.any fun x => x.label == l && x.level == o.level && x.dim == o.dim

/-- Completeness: what should show and is not seen (nor deliberately omitted). -/
def missing (rs : List Rule) (om : List Omission) (o : Observation) : List String :=
  (rs.filter fun r => r.applies o && !o.seen.contains r.label && !omitted om o r.label).map (·.label)

/-- Soundness: what must not show and is seen. -/
def leaks (fs : List Forbidden) (o : Observation) : List String :=
  (fs.filter fun f => f.level == o.level && f.dim == o.dim && o.seen.contains f.label).map (·.label)

/-- The two boxes disagree: in the page's text but not readable on screen (hidden, covered, too small)... -/
def unseen (o : Observation) : List String := o.dom.filter fun l => !o.seen.contains l

/-- ...or read on screen but not in the page's text (drawn into the 3D scene). -/
def canvasOnly (o : Observation) : List String := o.seen.filter fun l => !o.dom.contains l

def ScreenComplete (rs : List Rule) (om : List Omission) (o : Observation) : Bool := (missing rs om o).isEmpty
def ScreenSound (fs : List Forbidden) (o : Observation) : Bool := (leaks fs o).isEmpty

/-- The app rendered the dimension asked for (8D stands in for 11D below σ 7). -/
def rendersAsked (o : Observation) : Bool := o.rendered == o.dim || (o.dim == 11 && o.rendered == 8)

end App
