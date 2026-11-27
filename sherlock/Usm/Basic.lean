/-!
# The Universal Soma Machine as a model: what it shows, and its options from 4D up (USC; ISS-127)

The author, 27 Nov: "start with a 4d world, as we have it now, and incrementally turn on features ...
so lets model usm so its visualizes everything it should do in books and papers". A level shows three
rows, as the registry has them (registry/levels): physical at 4D, field at 8D, mind at 11D (the
cheatsheet's M4, M4 + P3 + L1, + C3). The field and mind rows are T-Theory's and need its switch.
Options are a dimension and a set of switches; a row is visible when its dimension is reached and its
gate is on. Generated data: `UsmData` (sherlock/appaudit.py features); questions: `UsmQueries.lean`.
-/

namespace Usm

structure Row where
  level : String
  row : String
  dim : Nat
  /-- The switch the row needs ("" for none). -/
  gate : String
  claim : String
  papers : List String
  deriving Repr, Inhabited

structure Options where
  dim : Nat
  on : List String
  deriving Repr, Inhabited

def visible (o : Options) (r : Row) : Bool := r.dim ≤ o.dim && (r.gate.isEmpty || o.on.contains r.gate)

/-- One option set is at least another: as many dimensions, every switch of it on. -/
def Options.le (a b : Options) : Prop := a.dim ≤ b.dim ∧ ∀ g, a.on.contains g = true → b.on.contains g = true

/-- Turning features on never hides a row: what is visible stays visible. -/
theorem visible_mono {a b : Options} (h : a.le b) (r : Row) (hv : visible a r = true) : visible b r = true := by
  unfold visible at *
  simp only [Bool.and_eq_true, Bool.or_eq_true, decide_eq_true_eq] at *
  obtain ⟨hd, hg⟩ := hv
  refine ⟨Nat.le_trans hd h.1, ?_⟩
  rcases hg with hg | hg
  · exact Or.inl hg
  · exact Or.inr (h.2 _ hg)

/-- The start the author asks for: the 4D world, no switch on. -/
def start4D : Options := { dim := 4, on := [] }

/-- The steps up, one feature at a time: 4D, 4D with T-Theory, 8D, 11D. -/
def ladder : List Options :=
  [start4D, { dim := 4, on := ["t-theory"] }, { dim := 8, on := ["t-theory"] }, { dim := 11, on := ["t-theory"] }]

def shown (o : Options) (rs : List Row) : List Row := rs.filter (visible o)

/-- The papers a set of rows shows. -/
def papersShown (rs : List Row) : List String := (rs.flatMap (·.papers)).eraseDups

end Usm
