import Mathlib

/-!
# HopfieldAsync.lean — a finite Hopfield network with asynchronous update (ISS-011)

`Hopfield.lean` is the 20-pixel demonstration: real-valued patterns, synchronous
update. Synchronous update can cycle with period 2, and an infinite state space
gives no convergence argument. This file proves the classical result on the
finite state space instead (Hopfield 1982; formalised at scale by Cipollina,
Karatarakis and Wiedijk 2025, arXiv:2512.07766, HopfieldNet2; written here from
the textbook argument, Mathlib only, so it builds with the programme's Lean):

* states are `Fin n → Bool` (each neuron up or down): 2ⁿ of them;
* an asynchronous update flips one neuron, and only when its local field
  strictly disagrees with it;
* with symmetric weights and no self-coupling, each flip strictly lowers the
  energy (`energy_update`, `update_lowers_energy`);
* so the lowest-energy state is an attractor (`attractor_exists`), and every
  asynchronous run, under any schedule, stops changing after finitely many steps
  (`run_settles`); under a fair schedule (each neuron chosen again and again) it
  settles on an attractor (`fair_run_reaches_attractor`), the cyclic sweep
  included (`cyclic_is_fair`);
* one stored pattern (Hebbian weights) is an attractor (`hebbian_pattern_stable`).

No `sorry`, no axioms of its own.
-/

namespace HopfieldAsync

open Finset

noncomputable section

variable {n : ℕ}

/-- A network state: each of the n neurons up (`true`) or down (`false`). -/
abbrev State (n : ℕ) := Fin n → Bool

/-- The spin value of a neuron: +1 up, −1 down. -/
def spin (b : Bool) : ℝ := if b then 1 else -1

@[simp] theorem spin_true : spin true = 1 := rfl
@[simp] theorem spin_false : spin false = -1 := rfl

theorem spin_mul_self (b : Bool) : spin b * spin b = 1 := by cases b <;> norm_num

variable (W : Fin n → Fin n → ℝ) (θ : Fin n → ℝ)

/-- The local field on neuron i: hᵢ = Σⱼ Wᵢⱼ sⱼ − θᵢ. -/
def localField (s : State n) (i : Fin n) : ℝ := ∑ j, W i j * spin (s j) - θ i

/-- The Hopfield energy E(s) = −½ Σᵢⱼ Wᵢⱼ sᵢ sⱼ + Σᵢ θᵢ sᵢ. -/
def energy (s : State n) : ℝ :=
  -(1 / 2) * ∑ i, ∑ j, W i j * spin (s i) * spin (s j) + ∑ i, θ i * spin (s i)

/-- The value neuron i takes when updated: up if its field is positive, down if
    negative, unchanged if zero. -/
def newValue (s : State n) (i : Fin n) : Bool :=
  if 0 < localField W θ s i then true else if localField W θ s i < 0 then false else s i

/-- Asynchronous update: neuron i alone takes its new value. -/
def update (i : Fin n) (s : State n) : State n :=
  Function.update s i (newValue W θ s i)

/-- A state no single update changes. -/
def IsAttractor (s : State n) : Prop := ∀ i, update W θ i s = s

theorem spin_update (s : State n) (i : Fin n) (b : Bool) (j : Fin n) :
    spin (Function.update s i b j) = spin (s j) + (if j = i then spin b - spin (s i) else 0) := by
  by_cases h : j = i
  · subst h; simp
  · simp [h]

/-- A sum against the indicator of i picks out the i-th term. -/
theorem sum_mul_indicator (f : Fin n → ℝ) (i : Fin n) (c : ℝ) :
    ∑ k, f k * (if k = i then c else 0) = f i * c := by
  rw [Finset.sum_eq_single i]
  · simp
  · intro k _ hk; simp [hk]
  · intro h; exact absurd (Finset.mem_univ i) h

theorem sum_indicator_mul (f : Fin n → ℝ) (i : Fin n) (c : ℝ) :
    ∑ k, (if k = i then c else 0) * f k = c * f i := by
  rw [Finset.sum_eq_single i]
  · simp
  · intro k _ hk; simp [hk]
  · intro h; exact absurd (Finset.mem_univ i) h

/-- **Proved**: flipping neuron i to b changes the energy by −(b − sᵢ)·hᵢ
    (symmetric weights, no self-coupling). -/
theorem energy_update (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0)
    (s : State n) (i : Fin n) (b : Bool) :
    energy W θ (Function.update s i b) =
      energy W θ s - (spin b - spin (s i)) * localField W θ s i := by
  have hv : ∀ j, spin (Function.update s i b j) =
      spin (s j) + (if j = i then spin b - spin (s i) else 0) := spin_update s i b
  generalize spin b - spin (s i) = c at hv ⊢
  unfold energy localField
  simp_rw [hv]
  -- the quadratic part: the two cross terms are equal (symmetry), the c² term is W i i = 0
  have e : ∀ k l, W k l * (spin (s k) + (if k = i then c else 0)) * (spin (s l) + (if l = i then c else 0)) =
      W k l * spin (s k) * spin (s l) + (if k = i then c else 0) * (W k l * spin (s l)) +
        (W k l * spin (s k)) * (if l = i then c else 0) +
        (if k = i then c else 0) * (W k l * (if l = i then c else 0)) := by
    intro k l; ring
  simp_rw [e, Finset.sum_add_distrib]
  have t2 : ∑ k, ∑ l, (if k = i then c else 0) * (W k l * spin (s l)) = c * ∑ l, W i l * spin (s l) := by
    simp_rw [← Finset.mul_sum]; exact sum_indicator_mul (fun k => ∑ l, W k l * spin (s l)) i c
  have t3 : ∑ k, ∑ l, (W k l * spin (s k)) * (if l = i then c else 0) = c * ∑ l, W i l * spin (s l) := by
    rw [Finset.sum_congr rfl (fun k _ => sum_mul_indicator (fun l => W k l * spin (s k)) i c), Finset.mul_sum]
    exact Finset.sum_congr rfl (fun k _ => by rw [hsym k i]; ring)
  have t4 : ∑ k, ∑ l, (if k = i then c else 0) * (W k l * (if l = i then c else 0)) = 0 := by
    simp_rw [← Finset.mul_sum]
    rw [sum_indicator_mul (fun k => ∑ l, W k l * (if l = i then c else 0)) i c]
    simp [hdiag i]
  have t5 : ∑ k, θ k * (spin (s k) + (if k = i then c else 0)) = ∑ k, θ k * spin (s k) + θ i * c := by
    simp_rw [mul_add, Finset.sum_add_distrib, sum_mul_indicator θ i c]
  rw [t2, t3, t4, t5]
  ring

/-- **Proved**: an update that changes the state strictly lowers the energy. -/
theorem update_lowers_energy (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0)
    (s : State n) (i : Fin n) (h : update W θ i s ≠ s) :
    energy W θ (update W θ i s) < energy W θ s := by
  have hne : newValue W θ s i ≠ s i := fun e => h (by unfold update; rw [e, Function.update_eq_self])
  unfold update
  rw [energy_update W θ hsym hdiag]
  have key : 0 < (spin (newValue W θ s i) - spin (s i)) * localField W θ s i := by
    unfold newValue at hne ⊢
    by_cases h1 : 0 < localField W θ s i
    · rw [if_pos h1] at hne ⊢
      cases hsi : s i
      · rw [spin_true, spin_false]; nlinarith
      · exact absurd hsi.symm hne
    · rw [if_neg h1] at hne ⊢
      by_cases h2 : localField W θ s i < 0
      · rw [if_pos h2] at hne ⊢
        cases hsi : s i
        · exact absurd hsi.symm hne
        · rw [spin_false, spin_true]; nlinarith
      · rw [if_neg h2] at hne; exact absurd rfl hne
  linarith

theorem update_energy_le (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0)
    (s : State n) (i : Fin n) : energy W θ (update W θ i s) ≤ energy W θ s := by
  by_cases h : update W θ i s = s
  · rw [h]
  · exact (update_lowers_energy W θ hsym hdiag s i h).le

/-- **Proved**: every finite Hopfield network with symmetric weights and no
    self-coupling has an attractor: its lowest-energy state. -/
theorem attractor_exists (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0) :
    ∃ s, IsAttractor W θ s := by
  obtain ⟨s, hs⟩ := Finite.exists_min (energy W θ)
  refine ⟨s, fun i => ?_⟩
  by_contra h
  have := update_lowers_energy W θ hsym hdiag s i h
  linarith [hs (update W θ i s)]

/-- An asynchronous run: start at s₀, at step k update neuron `sched k`. -/
def run (sched : ℕ → Fin n) (s₀ : State n) : ℕ → State n
  | 0 => s₀
  | k + 1 => update W θ (sched k) (run sched s₀ k)

/-- **Proved**: every asynchronous run, under any schedule, stops changing after
    finitely many steps. -/
theorem run_settles (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0)
    (sched : ℕ → Fin n) (s₀ : State n) :
    ∃ N, ∀ k, N ≤ k → run W θ sched s₀ k = run W θ sched s₀ N := by
  let E := fun k => energy W θ (run W θ sched s₀ k)
  have anti : Antitone E := antitone_nat_of_succ_le (fun k => update_energy_le W θ hsym hdiag _ _)
  -- the energies along the run take finitely many values: take the lowest
  have fin : (Set.range E).Finite :=
    (Set.finite_range (energy W θ)).subset (by rintro _ ⟨k, rfl⟩; exact ⟨_, rfl⟩)
  obtain ⟨N, hN⟩ : ∃ N, ∀ k, E N ≤ E k := by
    obtain ⟨_, ⟨N, rfl⟩, hmin⟩ := Set.exists_min_image (Set.range E) id fin (Set.range_nonempty E)
    exact ⟨N, fun k => hmin _ ⟨k, rfl⟩⟩
  refine ⟨N, fun k hk => ?_⟩
  induction k, hk using Nat.le_induction with
  | base => rfl
  | succ k hk ih =>
      by_contra h
      have hne : update W θ (sched k) (run W θ sched s₀ k) ≠ run W θ sched s₀ k := by
        intro e; exact h (by simp only [run]; rw [e, ih])
      have lt := update_lowers_energy W θ hsym hdiag _ _ hne
      have : E (k + 1) < E N := by
        show energy W θ (run W θ sched s₀ (k + 1)) < _
        simp only [run]; calc _ < E k := lt
          _ ≤ E N := anti hk
      linarith [hN (k + 1)]

/-- A schedule is fair if it chooses every neuron again and again. -/
def Fair (sched : ℕ → Fin n) : Prop := ∀ i N, ∃ k, N ≤ k ∧ sched k = i

/-- **Proved**: under a fair schedule, every asynchronous run reaches an attractor. -/
theorem fair_run_reaches_attractor (hsym : ∀ i j, W i j = W j i) (hdiag : ∀ i, W i i = 0)
    (sched : ℕ → Fin n) (hfair : Fair sched) (s₀ : State n) :
    ∃ N, IsAttractor W θ (run W θ sched s₀ N) := by
  obtain ⟨N, hN⟩ := run_settles W θ hsym hdiag sched s₀
  refine ⟨N, fun i => ?_⟩
  obtain ⟨k, hk, rfl⟩ := hfair i N
  have h1 := hN (k + 1) (by omega)
  have h0 := hN k hk
  simp only [run] at h1
  rw [h0] at h1
  exact h1

/-- The cyclic sweep: neurons 0, 1, …, n−1, 0, 1, … -/
def cyclic (hn : 0 < n) (k : ℕ) : Fin n := ⟨k % n, Nat.mod_lt _ hn⟩

/-- **Proved**: the cyclic sweep is fair. -/
theorem cyclic_is_fair (hn : 0 < n) : Fair (cyclic hn) := by
  intro i N
  refine ⟨N * n + i, ?_, ?_⟩
  · have := Nat.le_mul_of_pos_right N hn; omega
  · ext
    show (N * n + (i : ℕ)) % n = (i : ℕ)
    rw [Nat.add_comm, Nat.add_mul_mod_self_right, Nat.mod_eq_of_lt i.isLt]

/-- Hebbian weights for one stored pattern p: Wᵢⱼ = pᵢ pⱼ off the diagonal, 0 on it. -/
def hebbian (p : State n) (i j : Fin n) : ℝ := if i = j then 0 else spin (p i) * spin (p j)

theorem hebbian_symm (p : State n) (i j : Fin n) : hebbian p i j = hebbian p j i := by
  unfold hebbian; by_cases h : i = j
  · simp [h]
  · simp [h, Ne.symm h, mul_comm]

theorem hebbian_diag (p : State n) (i : Fin n) : hebbian p i i = 0 := by simp [hebbian]

/-- **Proved**: a network of at least two neurons that stored one pattern (no
    thresholds) holds it: the pattern is an attractor. -/
theorem hebbian_pattern_stable (hn : 2 ≤ n) (p : State n) :
    IsAttractor (hebbian p) (fun _ => 0) p := by
  intro i
  -- the field on i is pᵢ (n − 1): every other neuron agrees with it
  have hfield : localField (hebbian p) (fun _ => 0) p i = spin (p i) * ((n : ℝ) - 1) := by
    unfold localField hebbian
    have : ∀ j, (if i = j then 0 else spin (p i) * spin (p j)) * spin (p j) =
        spin (p i) - (if i = j then spin (p i) else 0) := by
      intro j; by_cases h : i = j
      · simp [h]
      · simp [h, mul_assoc, spin_mul_self]
    simp only [this, Finset.sum_sub_distrib, Finset.sum_ite_eq, Finset.mem_univ, if_true,
      Finset.sum_const, Finset.card_univ, Fintype.card_fin, nsmul_eq_mul, sub_zero]
    ring
  have hn' : (1 : ℝ) < n := by exact_mod_cast hn
  have hnv : newValue (hebbian p) (fun _ => 0) p i = p i := by
    unfold newValue
    rw [hfield]
    cases hpi : p i
    · have neg : spin false * ((n : ℝ) - 1) < 0 := by rw [spin_false]; linarith
      rw [if_neg (not_lt.mpr neg.le), if_pos neg]
    · have pos : 0 < spin true * ((n : ℝ) - 1) := by rw [spin_true]; linarith
      rw [if_pos pos]
  unfold update
  rw [hnv]
  exact Function.update_eq_self i p

end

end HopfieldAsync
