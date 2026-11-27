import Method

/-!
# The method's acceptance test (USC; ISS-126)

The model must hold the paper's own worked example: P3 §10.6, `COID-BS-HEAT-1`, Black-Scholes to
the heat equation, as the paper registers it (Steps A to E). Then the loop: the row changes only as
the evidence does.
-/

open Method

/-- P3 §10.6, as registered there. Step C's last assumption is "assumed in standard derivation". -/
def bsHeat : Row where
  id := "COID-BS-HEAT-1"
  source := "solution class of the one-dimensional heat equation"
  target := "option value V(S,t) in quantitative finance"
  signature := [(.operatorForm, "Black-Scholes PDE, after log-price and time reversal: u_τ = u_xx")]
  imported := "existence, uniqueness and smoothing of heat-equation solutions"
  assumptions := [
    ⟨"Diffusion operator is parabolic", .cited "P3 §10.6 Step A: the transformed PDE"⟩,
    ⟨"Volatility parameter treated as constant in base model", .cited "baseline Black-Scholes (1973)"⟩,
    ⟨"Boundary/terminal condition specified", .cited "option payoff at expiry"⟩,
    ⟨"Sufficient regularity for classical solution methods", .assumed "in the standard derivation"⟩]
  prediction := "the option value surface inherits parabolic smoothing; heat-class numerical schemes apply"
  disconfirmation := "transformed dynamics not parabolic under the declared assumptions, or boundary regularity fails"
  negativeControl := ⟨"P3 §10.5: a bounded scalar score of the same units defines no Green's operator",
    .cited "P3 §10.5"⟩

-- The paper's row is well formed, at S1, with one loose end: the assumed regularity.
#guard bsHeat.wellFormed
#guard bsHeat.scope == .S1 && bsHeat.status == .exploratory
#guard (bsHeat.openAssumptions.map (·.text)) == ["Sufficient regularity for classical solution methods"]

-- The loop. A passed test does not lift it to S2 while the regularity is only assumed ...
#guard (bsHeat.test "finite-difference heat scheme converges on the option surface" true).scope == .S1
-- ... but once the assumption has a witness, the same pass does, and the row stays well formed.
def bsHeat' : Row :=
  (bsHeat.witness "Sufficient regularity for classical solution methods"
    (.cited "a regularity theorem for the transformed problem (to find)")).test
    "finite-difference heat scheme converges on the option surface" true
#guard bsHeat'.scope == .S2 && bsHeat'.status == .partiallyValidated && bsHeat'.wellFormed
-- A failed test falsifies it under rule 3, and the labels stay consistent.
#guard (bsHeat.test "surface not smooth" false).status == .falsified
#guard (bsHeat.test "surface not smooth" false).wellFormed
-- Rejections: no negative control, or a label above the evidence, is not well formed.
#guard !({ bsHeat with negativeControl := ⟨"", .open_ ""⟩ } : Row).wellFormed
#guard !({ bsHeat with scope := .S2 } : Row).wellFormed
#guard !({ bsHeat with status := .falsified } : Row).wellFormed
-- The bait: the paper's row leaves one assumption open; its witnessed successor none.
#guard bait [bsHeat, bsHeat'] == [("COID-BS-HEAT-1", "Sufficient regularity for classical solution methods")]
