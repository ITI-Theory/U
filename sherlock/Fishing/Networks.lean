import Mathlib
import Method

/-!
# Fishing, tenth catch: social intelligence as a spectral gap (USC; ISS-126)

The cheatsheet (V, VI): "Social Intelligence SQ ≡ λ₁(L̂ᵢⱼ); measures synchronisation rate".

1. `lowest_is_zero`: every graph Laplacian has the eigenvalue 0 (on the constant vector,
   Mathlib's `lapMatrix_mulVec_const_eq_zero`), and it is positive semidefinite, so the smallest
   eigenvalue is 0 for every network. Counting from λ₁, SQ ≡ λ₁ is 0 for every community and
   measures nothing.
2. The quantity meant is the algebraic connectivity, the second-smallest eigenvalue (Fiedler 1973),
   which sets the rate of consensus and diffusion, ẋ = -Lx. It is positive iff the network is
   connected: the number of zero eigenvalues is the number of components (Mathlib's
   `card_connectedComponent_eq_finrank_ker_toLin'_lapMatrix`).

Evidence labels: `kernel-verified` (Mathlib); the reading of SQ is `interpretive`.
-/

open Matrix

namespace Fishing.Networks

/-- 1. Every network's Laplacian has a nonzero vector with eigenvalue 0. -/
theorem lowest_is_zero {V : Type*} [Fintype V] [DecidableEq V] [Nonempty V] (G : SimpleGraph V) [DecidableRel G.Adj] :
    ∃ x : V → ℝ, x ≠ 0 ∧ (G.lapMatrix ℝ) *ᵥ x = 0 := by
  refine ⟨fun _ => 1, fun h => ?_, SimpleGraph.lapMatrix_mulVec_const_eq_zero G⟩
  have := congrFun h (Classical.arbitrary V)
  simp at this

def row : Method.Row where
  id := "COID-SQ-1"
  source := "algebraic connectivity: the Laplacian's second-smallest eigenvalue sets the consensus rate (Fiedler 1973)"
  target := "SQ ≡ λ₁(L̂ᵢⱼ), the synchronisation rate of a social network (cheatsheet V, VI)"
  signature := [(.operatorForm, "diffusion on a graph, ẋ = -Lx"), (.poles, "the Laplacian's spectrum, 0 first")]
  imported := "SQ = λ₂ (counting from λ₁ = 0): positive iff connected, the rate of synchronisation"
  assumptions := [
    ⟨"the lowest eigenvalue is 0 for every network", .lean ``Fishing.Networks.lowest_is_zero⟩,
    ⟨"zero eigenvalues count the components",
      .lean ``SimpleGraph.card_connectedComponent_eq_finrank_ker_toLin'_lapMatrix⟩,
    ⟨"SQ means λ₂ (or λ₁ counted from λ₀)", .open_ "the cheatsheet's index: AUTHOR"⟩,
    ⟨"a community's trust network is a graph with diffusive coupling", .open_ "interpretive"⟩]
  prediction := "SQ is 0 for a split community and grows with its weakest bridge (Cheeger's bound)"
  disconfirmation := "a connected community with SQ = 0, or synchronisation rates not ordered by λ₂ (rule 3)"
  negativeControl := ⟨"λ₁ = 0 for every network: the index as written measures nothing",
    .lean ``Fishing.Networks.lowest_is_zero⟩

#guard row.wellFormed

#print axioms lowest_is_zero

end Fishing.Networks
