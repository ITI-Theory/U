import Mathlib
import Method

/-!
# Fishing, ninth catch: Nash equilibrium ≡ Hopfield minimum (USC; ISS-126)

The cheatsheet (VI): "Nash(G) = argmin H(e); game theory = attractor dynamics". In general, no.

1. `pennies_no_nash`: matching pennies has no pure Nash equilibrium.
2. `no_energy`: so no energy H on its four states has argmin H = Nash(G), because any H on a
   finite set has a minimum (`Finite.exists_min`).
3. `potential_max_nash`: the identification holds for potential games (Monderer and Shapley 1996).
   If each player's gain from a unilateral change equals the change of a potential Φ, the maxima of
   Φ (the minima of H = -Φ) are Nash equilibria. For a Hopfield network the potential exists when the
   couplings are symmetric.

So "Nash ≡ Hopfield minimum" is a co-identification with one assumption, that the game has an exact
potential (symmetric couplings), and matching pennies is its negative control. Evidence labels:
1-3 `kernel-verified`.
-/

namespace Fishing.Games

/-- Matching pennies: player 1 wins (+1) on a match, player 2 (zero sum) on a mismatch. -/
def u1 (a b : Bool) : Int := if a = b then 1 else -1

/-- A pure Nash equilibrium: neither player gains by deviating alone. -/
def nash (s : Bool × Bool) : Bool :=
  [false, true].all (fun a' => decide (u1 a' s.2 ≤ u1 s.1 s.2)) &&
  [false, true].all (fun b' => decide (-u1 s.1 b' ≤ -u1 s.1 s.2))

/-- 1. No pure Nash equilibrium. -/
theorem pennies_no_nash : ∀ s, nash s = false := by decide

/-- 2. No energy whose minima are matching pennies' Nash equilibria. -/
theorem no_energy (H : Bool × Bool → ℝ) : ¬ ∀ s, (nash s = true ↔ ∀ t, H s ≤ H t) := by
  intro h
  obtain ⟨s, hs⟩ := Finite.exists_min H
  have := (h s).mpr hs
  rw [pennies_no_nash s] at this
  exact Bool.false_ne_true this

/-- 3. In an exact potential game, a maximum of the potential is a Nash equilibrium. -/
theorem potential_max_nash {S1 S2 : Type*} (u1 u2 Φ : S1 → S2 → ℝ)
    (h1 : ∀ a a' b, u1 a' b - u1 a b = Φ a' b - Φ a b)
    (h2 : ∀ a b b', u2 a b' - u2 a b = Φ a b' - Φ a b)
    (a : S1) (b : S2) (hmax : ∀ a' b', Φ a' b' ≤ Φ a b) :
    (∀ a', u1 a' b ≤ u1 a b) ∧ (∀ b', u2 a b' ≤ u2 a b) :=
  ⟨fun a' => by linarith [h1 a a' b, hmax a' b], fun b' => by linarith [h2 a b b', hmax a b']⟩

def row : Method.Row where
  id := "COID-NASH-1"
  source := "exact potential games: Nash equilibria at the potential's maxima (Monderer and Shapley 1996)"
  target := "Nash(G) = argmin H(e), game theory as attractor dynamics (cheatsheet VI)"
  signature := [(.variational, "equilibria as extrema of one function"),
    (.symmetry, "symmetric couplings W = Wᵀ give the Hopfield energy as a potential")]
  imported := "argmin H ⊆ Nash(G) when H = -Φ is an exact potential"
  assumptions := [
    ⟨"potential maxima are Nash equilibria", .lean ``Fishing.Games.potential_max_nash⟩,
    ⟨"the social game has an exact potential (symmetric couplings)",
      .open_ "not stated; zero-sum and cyclic games have none (pennies_no_nash)"⟩]
  prediction := "in symmetric-coupling settings, observed equilibria sit at energy minima; in cyclic ones, no attractor"
  disconfirmation := "a symmetric-coupling game whose equilibria are not the energy's minima (rule 1)"
  negativeControl := ⟨"matching pennies: no energy has its Nash equilibria as minima", .lean ``Fishing.Games.no_energy⟩

#guard row.wellFormed

#print axioms pennies_no_nash
#print axioms no_energy
#print axioms potential_max_nash

end Fishing.Games
