import Mathlib
import Method
import LimbicTunnel
import Fishing.Kramers

/-!
# Fishing, thirteenth catch: the clinical operators read with Kramers (USC; ISS-126)

The cheatsheet (VII): "Co-occurrence (ASC ∩ CPTSD): high β ⇒ deeper trauma wells on adverse input";
"ADHD operator: high field temperature T, flat landscape (all barriers ~ D), rapid transitions"; "the same
high T that causes dysregulation also enables escape from trauma wells (Anti-Freeze mechanism)". With the
noise D = 1/β (the Kramers catch, COID-KRAMERS-1) and the programme's well V = W(x² - 1)²:

1. The well's depth is W whatever β is (`SomaField.LimbicTunnel.barrier_height`): β does not deepen it.
2. `dwell_grows_with_beta`: a higher β lengthens the escape from the same well exponentially,
   e^{β₁W} < e^{β₂W}. So the claim should read "high β ⇒ the same wells hold longer", not "deeper wells".
3. `no_trap_when_flat`: when every barrier is at most D (the ADHD operator's flat landscape), the Kramers
   factor e^{W/D} is at most e: no exponential trapping, so transitions are rapid, and Kramers' formula is
   outside its regime there (it needs W ≫ D).
4. `anti_freeze`: raising T (D) shortens the dwell in a given well, so the Anti-Freeze reading is the
   Arrhenius law (`Fishing.Kramers.arrhenius`), consistent.

Evidence labels: 1-4 `kernel-verified` statements about the model; the clinical readings are `interpretive`.
-/

open Real

namespace Fishing.Clinical

/-- 2. Higher β, same depth W > 0: a longer dwell, exponentially. -/
theorem dwell_grows_with_beta {W β₁ β₂ : ℝ} (hW : 0 < W) (h : β₁ < β₂) :
    Real.exp (β₁ * W) < Real.exp (β₂ * W) :=
  Real.exp_lt_exp.mpr (mul_lt_mul_of_pos_right h hW)

/-- 3. A flat landscape, every barrier at most the noise: the Kramers factor is at most e. -/
theorem no_trap_when_flat {W D : ℝ} (hD : 0 < D) (hW : W ≤ D) : Real.exp (W / D) ≤ Real.exp 1 :=
  Real.exp_le_exp.mpr ((div_le_one hD).mpr hW)

/-- 4. Raising the noise shortens the dwell in a well of depth W > 0. -/
theorem anti_freeze {W D₁ D₂ : ℝ} (hW : 0 < W) (h1 : 0 < D₁) (h : D₁ < D₂) :
    Real.exp (W / D₂) < Real.exp (W / D₁) :=
  Real.exp_lt_exp.mpr (div_lt_div_of_pos_left hW h1 h)

def row : Method.Row where
  id := "COID-CLIN-1"
  source := "Kramers and Arrhenius with D = 1/β: the dwell in a well of depth W grows as e^{βW}"
  target := "the clinical operators (cheatsheet VII): ASC ∩ CPTSD 'high β ⇒ deeper wells', ADHD's flat landscape, Anti-Freeze"
  signature := [(.units, "β an inverse noise, W an energy: βW dimensionless")]
  imported := "high β lengthens the dwell exponentially; flat landscapes trap nothing; more noise frees"
  assumptions := [
    ⟨"the well's depth is W, independent of β", .lean ``SomaField.LimbicTunnel.barrier_height⟩,
    ⟨"high β lengthens the dwell", .lean ``Fishing.Clinical.dwell_grows_with_beta⟩,
    ⟨"flat landscapes do not trap", .lean ``Fishing.Clinical.no_trap_when_flat⟩,
    ⟨"more noise frees (Anti-Freeze)", .lean ``Fishing.Clinical.anti_freeze⟩,
    ⟨"ASC is high β, ADHD high T", .open_ "interpretive (the operators of VII, P18)"⟩,
    ⟨"'deeper wells' in VII", .open_ "should read 'the same wells hold longer': β changes the escape, not the depth (AUTHOR)"⟩]
  prediction := "in the model, dwell times in a well rise exponentially with β and fall with T; at W ≤ D no state holds"
  disconfirmation := "the programme's simulations showing dwell times not exponential in β at W ≫ D (rule 3)"
  negativeControl := ⟨"β does not enter the well's depth: the barrier is W", .lean ``SomaField.LimbicTunnel.barrier_height⟩

#guard row.wellFormed

#print axioms dwell_grows_with_beta
#print axioms no_trap_when_flat
#print axioms anti_freeze

end Fishing.Clinical
