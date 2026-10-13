/-!
# Path-Sensitive Transition Dynamics (P25): the toy results it proposes

Source: U `paper/soma/path-sensitive-transitions/path-sensitive-transitions.md`, frozen at
commit `b01d50a`, SHA-256
`3aa697c075a13a65f065a7e72383e1a8372de9358fcf3195b2f9ec5a39f5662f`.

The paper claims no Lean theorem (line 192) and names three "simple results" a first formal
target could prove (lines 186-190). Here each is proved on a concrete toy: a route is the list
of potential values it passes, its barrier is the highest of them, its action the sum. Core
Lean only. These are the toy statements the paper describes, not a clinical mechanism.
-/

namespace Affidavit.PathSensitive.Toy

/-- The highest potential on a route: the barrier a single-barrier account sees. -/
def barrier (route : List Nat) : Nat := route.foldr max 0

/-- The cumulative cost of a route: a discrete action, the potential summed along it. -/
def action (route : List Nat) : Nat := route.sum

/-- "equivalence to a barrier model when only the maximum potential matters" (lines 187-188):
when the cost of a route is its barrier, two routes over the same saddle cost the same. -/
theorem barrier_model_equivalence :
    barrier [0, 3, 0] = barrier [0, 1, 3, 1, 0] := by decide

/-- "inequivalence when two paths have the same maximum height but different cumulative costs"
(lines 188-189): two routes over the same saddle, one crossing it quickly and one lingering on
the ridge, have the same barrier and different actions. -/
theorem same_barrier_different_action :
    barrier [0, 3, 0] = barrier [0, 3, 3, 3, 0] ∧ action [0, 3, 0] ≠ action [0, 3, 3, 3, 0] := by
  decide

/-- "hysteresis when forward and reverse admissible sets differ" (lines 189-190): with steps
admissible only one way (A to M to B), the forward route exists and its reverse does not. -/
def step : Fin 3 → Fin 3 → Bool
  | 0, 1 => true
  | 1, 2 => true
  | _, _ => false

theorem hysteresis_one_way :
    step 0 1 = true ∧ step 1 2 = true ∧ step 2 1 = false ∧ step 1 0 = false := by decide

end Affidavit.PathSensitive.Toy
