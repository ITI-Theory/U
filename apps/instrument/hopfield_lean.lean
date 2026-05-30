import data.real.basic
import data.fin.basic

structure HopfieldNetwork (n : ℕ) where
  weights : fin n → fin n → ℝ
  states : fin n → bool

def energy {n : ℕ} (H : HopfieldNetwork n) : ℝ :=
  -0.5 * ∑ i j, H.weights i j * (if H.states i then 1 else -1) * (if H.states j then 1 else -1)

def update_state {n : ℕ} (H : HopfieldNetwork n) (i : fin n) : HopfieldNetwork n :=
  let new_state := (∑ j, H.weights i j * (if H.states j then 1 else -1)) > 0
  { H with states := λ k, if k = i then new_state else H.states k }

def run_hopfield {n : ℕ} (H : HopfieldNetwork n) : HopfieldNetwork n :=
  let rec loop (current : HopfieldNetwork n) : HopfieldNetwork n :=
    let next := { current with states := λ i, (∑ j, current.weights i j * (if current.states j then 1 else -1)) > 0 }
    if next = current then next else loop next
  loop H
