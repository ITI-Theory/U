import TTheory.Core
import SomaField
import Mathlib.Analysis.Calculus.Deriv.Add
import Mathlib.Analysis.Calculus.Deriv.Mul
import Mathlib.Analysis.Calculus.Deriv.Pi

/-!
# P1 · The Soma-Field: A Wave-Based Model of Emotional Dynamics

[T]-Theory's first paper, as Lean. Read it top to bottom as you would the paper: each section says in a
few lines what the paper says, then the paper's own objects follow as Lean. Not every word: the
equations, the claims and how far each one is established.

Source: `paper/soma/soma-field-paper/soma-field-paper.md`; the paper's id, title and DOI are in
`Dist/PAPERS.yaml` (P1). Equation numbers below are the order of the paper's display equations.

How far a statement is established is said by its form (`docs/agent/THEORY-STATUS.md`):
* a `theorem` with a proof is **kernel-verified** inside this model;
* a `theorem` ending in `sorry` is the **frontier**: stated exactly, not yet proved;
* a `def` is the paper's modelling choice, an assumption, not a claim about the world.
-/

namespace TTheory.P1

open BigOperators

/-! ## Background: the formal correspondences

The paper's starting point: the energy of a Hopfield network, the Hamiltonian of an Ising magnet and the
energy of the soma-field are one expression. The correspondence is structure, not metaphor; here it is an
identity that the kernel checks. -/

section Correspondences

variable {n : ℕ}

/-- Eq. (1), the Hopfield energy: `H(s) = -½ Σᵢⱼ Wᵢⱼ sᵢ sⱼ - Σᵢ θᵢ sᵢ`. -/
noncomputable def hopfieldEnergy (W : Fin n → Fin n → ℝ) (θ s : Fin n → ℝ) : ℝ :=
  -(1 / 2) * ∑ i, ∑ j, W i j * s i * s j - ∑ i, θ i * s i

/-- Eq. (2), the Ising Hamiltonian: couplings `J`, external field `h`, spins `σ`. -/
noncomputable def isingEnergy (J : Fin n → Fin n → ℝ) (h σ : Fin n → ℝ) : ℝ :=
  -(1 / 2) * ∑ i, ∑ j, J i j * σ i * σ j - ∑ i, h i * σ i

/-- Eq. (3), the soma energy: couplings `W`, biases `b`, the emotional state `e`. -/
noncomputable def somaEnergy (W : Fin n → Fin n → ℝ) (b e : Fin n → ℝ) : ℝ :=
  -(1 / 2) * ∑ i, ∑ j, W i j * e i * e j - ∑ i, b i * e i

/-- The Ising magnet is the Hopfield network (kernel-verified). -/
theorem ising_is_hopfield : @isingEnergy n = @hopfieldEnergy n := rfl

/-- The soma-field's energy is the Hopfield network's (kernel-verified). -/
theorem soma_is_hopfield : @somaEnergy n = @hopfieldEnergy n := rfl

end Correspondences

/-! ## The companion model: eight BRECVEMA mechanisms

The paper's worked model is `paper/proofs/SomaField.lean`: eight dimensions, one per BRECVEMA mechanism,
and the coupling matrix `W8`. Its energy has no bias term: it is eq. (3) with `b = 0`. -/

/-- The companion's energy is eq. (3) with the couplings `W8` and no bias (kernel-verified). -/
theorem companion_energy (e : Field8) : energy8 e = somaEnergy W8 0 e := by
  simp only [energy8, somaEnergy, Pi.zero_apply, zero_mul, Finset.sum_const_zero, sub_zero]
  congr 1
  refine Finset.sum_congr rfl fun i _ => Finset.sum_congr rfl fun j _ => ?_
  ring

/-! ## The Soma-Field model: the perception threshold

An emotion is consciously perceived when its component exceeds a threshold; below it, the field is active
and causally effective but not named (eq. 12). -/

/-- Eq. (12): emotion `i` is perceived iff `|Eᵢ(t)| > Tᵢ`. -/
def Perceived {n : ℕ} (T E : Fin n → ℝ) (i : Fin n) : Prop := T i < |E i|

/-- The companion's `perceptible` is eq. (12) with its thresholds `threshold8` (kernel-verified). -/
theorem companion_perceptible (e : Field8) (i : Fin N8) :
    perceptible e i ↔ Perceived threshold8 e i := by
  unfold perceptible Perceived
  rw [lt_abs, lt_neg]

/-! ## The interaction of emotional modes: the dynamics

The state flows down the energy landscape, driven by low-level noise: `ė(t) = -∇H(e) + η(t)` (eq. 13).
Here the noise is an input, one realisation `η` at a time; its law (eq. 24) comes with Appendix B. -/

section Dynamics

variable {n : ℕ}

/-- The slope of an energy `H` along mode `i` at the state `e`: `∂H/∂eᵢ`. -/
noncomputable def partialAt (H : (Fin n → ℝ) → ℝ) (e : Fin n → ℝ) (i : Fin n) : ℝ :=
  deriv (fun x => H (Function.update e i x)) (e i)

/-- Eq. (13), the field's velocity: `ė = -∇H(e) + η`. -/
noncomputable def velocity (H : (Fin n → ℝ) → ℝ) (e η : Fin n → ℝ) : Fin n → ℝ :=
  fun i => -partialAt H e i + η i

/-- Moving one mode `i` moves the state by `1` in that mode and `0` in the others. -/
theorem hasDerivAt_mode (e : Fin n → ℝ) (i k : Fin n) :
    HasDerivAt (fun x => Function.update e i x k) ((Pi.single i (1 : ℝ) : Fin n → ℝ) k) (e i) := by
  by_cases h : k = i
  · subst h
    simp only [Function.update_self, Pi.single_eq_same]
    exact hasDerivAt_id' (e k)
  · simp only [Function.update_of_ne h, Pi.single_apply, h, if_false]
    exact hasDerivAt_const (e i) (e k)

/-- The force behind eq. (13): for symmetric couplings, `-∂H/∂eᵢ = Σⱼ Wᵢⱼ eⱼ + bᵢ` (kernel-verified). -/
theorem soma_force (W : Fin n → Fin n → ℝ) (hW : ∀ i j, W i j = W j i) (b e : Fin n → ℝ) (i : Fin n) :
    HasDerivAt (fun x => somaEnergy W b (Function.update e i x)) (-(∑ j, W i j * e j + b i)) (e i) := by
  have h := ((HasDerivAt.fun_sum (u := Finset.univ) fun a _ => HasDerivAt.fun_sum (u := Finset.univ) fun c _ =>
      ((hasDerivAt_mode e i a).const_mul (W a c)).mul (hasDerivAt_mode e i c)).const_mul (-(1 / 2) : ℝ)).sub
      (HasDerivAt.fun_sum (u := Finset.univ) fun a _ => (hasDerivAt_mode e i a).const_mul (b a))
  refine (h.congr_of_eventuallyEq (Filter.Eventually.of_forall fun x => ?_)).congr_deriv ?_
  · simp only [somaEnergy, Pi.sub_apply, Pi.mul_apply]
  · simp only [Function.update_eq_self, Pi.single_apply, mul_ite, mul_one, mul_zero, ite_mul, zero_mul,
      Finset.sum_add_distrib, Finset.sum_ite_eq', Finset.mem_univ, if_true]
    have hs : ∑ a, W a i * e a = ∑ j, W i j * e j := Finset.sum_congr rfl fun a _ => by rw [hW a i]
    have hd : ∑ a, ∑ c, (if a = i then W a c * e c else 0) = ∑ j, W i j * e j := by
      rw [Finset.sum_comm]
      simp only [Finset.sum_ite_eq', Finset.mem_univ, if_true]
    rw [hs, hd]
    ring

/-- For the soma energy, eq. (13) reads `ė = We + b + η` (kernel-verified). -/
theorem soma_velocity (W : Fin n → Fin n → ℝ) (hW : ∀ i j, W i j = W j i) (b e η : Fin n → ℝ) :
    velocity (somaEnergy W b) e η = fun i => ∑ j, W i j * e j + b i + η i := by
  funext i
  simp only [velocity, partialAt, (soma_force W hW b e i).deriv, neg_neg]

end Dynamics

/-- The companion's `fieldForce8` is eq. (13)'s force for its energy (kernel-verified). -/
theorem companion_force (e : Field8) (i : Fin N8) :
    fieldForce8 e i = -partialAt (somaEnergy W8 0) e i := by
  rw [partialAt, (soma_force W8 W8_symm 0 e i).deriv]
  simp [fieldForce8]

/-! ## The three-layer architecture

The nervous system that carries the field has three layers. Layer 1, the brainstem: heart-rate-variability
coherence `C_HRV` sets the noise floor (eq. 14), and cardiac acceleration `Ḣ` tilts the landscape (eq. 15).
Layer 2, the limbic system: the couplings, the energy, the threshold. Layer 3, the prefrontal cortex: a
regulating term `R_PFC` (eq. 18). Eq. (16) puts them together. -/

section ThreeLayers

variable {n : ℕ}

/-- Eq. (14): `σ_eff = σ₀ / C_HRV`. -/
noncomputable def sigmaEff (σ₀ C : ℝ) : ℝ := σ₀ / C

/-- At coherence `1` the noise is the baseline `σ₀` (kernel-verified). -/
theorem sigmaEff_one (σ₀ : ℝ) : sigmaEff σ₀ 1 = σ₀ := div_one σ₀

/-- Higher HRV coherence, narrower noise: `σ_eff` falls as `C_HRV` rises (kernel-verified). -/
theorem sigmaEff_falls {σ₀ C C' : ℝ} (hσ : 0 < σ₀) (hC : 0 < C) (h : C < C') :
    sigmaEff σ₀ C' < sigmaEff σ₀ C := by
  unfold sigmaEff
  gcongr

/-- Eq. (15), the landscape tilt: `H(e, t) = H₀(e) - α Ḣ(t) β·e`. -/
noncomputable def tilted (H₀ : (Fin n → ℝ) → ℝ) (α Hdot : ℝ) (β e : Fin n → ℝ) : ℝ :=
  H₀ e - α * Hdot * ∑ j, β j * e j

/-- The tilt adds `α Ḣ βᵢ` to the downhill force on mode `i` (kernel-verified). -/
theorem tilt_force {H₀ : (Fin n → ℝ) → ℝ} {α Hdot : ℝ} {β e : Fin n → ℝ} {i : Fin n} {d : ℝ}
    (h : HasDerivAt (fun x => H₀ (Function.update e i x)) d (e i)) :
    HasDerivAt (fun x => tilted H₀ α Hdot β (Function.update e i x)) (d - α * Hdot * β i) (e i) := by
  have hl := (HasDerivAt.fun_sum (u := Finset.univ) fun a _ => (hasDerivAt_mode e i a).const_mul (β a)).const_mul (α * Hdot)
  refine ((h.sub hl).congr_of_eventuallyEq (Filter.Eventually.of_forall fun x => ?_)).congr_deriv ?_
  · simp only [tilted, Pi.sub_apply]
  · simp only [Pi.single_apply, mul_ite, mul_one, mul_zero, Finset.sum_ite_eq', Finset.mem_univ, if_true]

/-- Eq. (16), the full three-layer velocity: `ė = -∇H₀ + α Ḣ β + R_PFC + (σ₀ / C_HRV) ξ`. -/
noncomputable def velocity3 (H₀ : (Fin n → ℝ) → ℝ) (α Hdot : ℝ) (β R : Fin n → ℝ) (σ₀ C : ℝ)
    (ξ e : Fin n → ℝ) : Fin n → ℝ :=
  fun i => -partialAt H₀ e i + α * Hdot * β i + R i + sigmaEff σ₀ C * ξ i

/-- Eq. (16) is eq. (13) for the tilted energy (15), with the regulation and the HRV-scaled noise as
    its forcing: the paper's three-layer equation follows from its parts (kernel-verified). -/
theorem velocity3_is_tilted_flow {H₀ : (Fin n → ℝ) → ℝ} {α Hdot σ₀ C : ℝ} {β R ξ e : Fin n → ℝ}
    (h : ∀ i, HasDerivAt (fun x => H₀ (Function.update e i x)) (partialAt H₀ e i) (e i)) :
    velocity3 H₀ α Hdot β R σ₀ C ξ e = velocity (tilted H₀ α Hdot β) e (fun i => R i + sigmaEff σ₀ C * ξ i) := by
  funext i
  simp only [velocity3, velocity, partialAt, (tilt_force (h i)).deriv]
  ring

/-- The somatic equivalence principle: a cardiac tilt and any other forcing `J` of the same size give the
    same velocity; the field has no access to the origin of the tilt (kernel-verified). -/
theorem somatic_equivalence {H₀ : (Fin n → ℝ) → ℝ} {α Hdot σ₀ C : ℝ} {β R ξ e J : Fin n → ℝ}
    (hJ : ∀ i, J i = α * Hdot * β i) :
    velocity3 H₀ α Hdot β R σ₀ C ξ e = fun i => -partialAt H₀ e i + J i + R i + sigmaEff σ₀ C * ξ i := by
  funext i
  simp only [velocity3, hJ]

/-- Eq. (18), the regulated field: `ė = -∇H + R_PFC + (σ₀ / C_HRV) ξ`. -/
noncomputable def velocity18 (H : (Fin n → ℝ) → ℝ) (R : Fin n → ℝ) (σ₀ C : ℝ) (ξ e : Fin n → ℝ) :
    Fin n → ℝ :=
  fun i => -partialAt H e i + R i + sigmaEff σ₀ C * ξ i

/-- Without cardiac acceleration (`Ḣ = 0`), eq. (16) is eq. (18) (kernel-verified). -/
theorem velocity3_still_heart {H₀ : (Fin n → ℝ) → ℝ} {α σ₀ C : ℝ} {β R ξ e : Fin n → ℝ} :
    velocity3 H₀ α 0 β R σ₀ C ξ e = velocity18 H₀ R σ₀ C ξ e := by
  funext i
  simp only [velocity3, velocity18, mul_zero, zero_mul, add_zero]

/-- The paper: "the two-term Langevin equation ... is the Layer 2 special case (`R_PFC = 0`,
    `C_HRV = 1`)": eq. (18) then is eq. (13) with the noise `η = σ₀ ξ` (kernel-verified). -/
theorem layer2_special_case {H : (Fin n → ℝ) → ℝ} {σ₀ : ℝ} {ξ e : Fin n → ℝ} :
    velocity18 H 0 σ₀ 1 ξ e = velocity H e (fun i => σ₀ * ξ i) := by
  funext i
  simp only [velocity18, velocity, sigmaEff_one, Pi.zero_apply, add_zero]

/-- Eq. (17), the plasticity index: `Π = 1/S_inst + ∂‖W‖/∂t|adversity + C_HRV^recovery`. -/
noncomputable def plasticity (S_inst dW C_rec : ℝ) : ℝ := 1 / S_inst + dW + C_rec

/-- Complex PTSD as low `Π` "across all three terms": higher barriers, a more rigid `W` and slower
    recovery each lower `Π` (kernel-verified). -/
theorem plasticity_mono {S S' dW dW' C C' : ℝ} (hS : 0 < S') (hSS : S' ≤ S) (hW : dW ≤ dW')
    (hC : C ≤ C') : plasticity S dW C ≤ plasticity S' dW' C' := by
  unfold plasticity
  gcongr

end ThreeLayers

/-! ## The energy landscape: attractors

The landscape has valleys, hills and saddles; the field always moves downhill. The paper proposes that the
major valleys are the autonomic states of polyvagal theory (Table 2): regulated calm the global minimum,
fight a shallow high-energy minimum, flight a saddle or shallow minimum, freeze a deep but isolated one.
Escape from freeze requires first *gaining* energy: the clinical point that arousal must be titrated. -/

/-- Table 2's attractors. -/
inductive Attractor
  | regulatedCalm | fight | flight | freeze
  deriving DecidableEq, Repr

/-- The polyvagal states (Porges). -/
inductive Polyvagal
  | ventralVagal | sympathetic | dorsalVagal
  deriving DecidableEq, Repr

/-- Table 2: each attractor's polyvagal correlate (the paper's proposal). -/
def Attractor.polyvagal : Attractor → Polyvagal
  | .regulatedCalm => .ventralVagal
  | .fight => .sympathetic
  | .flight => .sympathetic
  | .freeze => .dorsalVagal

/-- Table 2: each attractor's place in the landscape (the paper's proposal). -/
inductive Basin
  | globalMinimum | shallowHighEnergy | saddleOrShallow | deepIsolated
  deriving DecidableEq, Repr

def Attractor.basin : Attractor → Basin
  | .regulatedCalm => .globalMinimum
  | .fight => .shallowHighEnergy
  | .flight => .saddleOrShallow
  | .freeze => .deepIsolated

/-! ## P1's claims and their witnesses

Each claim in the paper's words, its statement, and its witness where the model has one. A witness may be
built from other witnesses: the companion's claim below is derived from the force claim, so it stands or
falls with it. `#status` at the end computes each claim's state. -/

open TTheory

def cOneFunction : Claim where
  id := "P1.eq1-3"
  text := "The Hopfield, Ising and soma energies are one expression: structure, not metaphor."
  statement := ∀ n, @isingEnergy n = @hopfieldEnergy n ∧ @somaEnergy n = @hopfieldEnergy n

instance : Witness cOneFunction := .of fun _ => ⟨rfl, rfl⟩

def cForce : Claim where
  id := "P1.eq13"
  text := "The field flows down its energy: for symmetric couplings, ė = We + b + η."
  statement := ∀ n (W : Fin n → Fin n → ℝ), (∀ i j, W i j = W j i) → ∀ b e η : Fin n → ℝ,
    velocity (somaEnergy W b) e η = fun i => ∑ j, W i j * e j + b i + η i

instance : Witness cForce := .of fun _ W hW b e η => soma_velocity W hW b e η

def cCompanion : Claim where
  id := "P1.companion"
  text := "SomaField.lean is the paper's model: eight BRECVEMA modes, no bias; its threshold is eq. (12) and its force eq. (13)'s."
  statement := (∀ e, energy8 e = somaEnergy W8 0 e) ∧ (∀ e i, perceptible e i ↔ Perceived threshold8 e i) ∧
    (∀ e i, fieldForce8 e i = -partialAt (somaEnergy W8 0) e i)

/-- Derived from the force claim's witness: the companion's force is eq. (13)'s. -/
instance [h : Witness cForce] : Witness cCompanion := .of
  ⟨companion_energy, companion_perceptible, fun e i => by
    have hv := congrFun (h.proof N8 W8 W8_symm 0 e 0) i
    simp only [velocity, Pi.zero_apply, add_zero] at hv
    rw [hv]
    simp [fieldForce8]⟩

def cThreeLayers : Claim where
  id := "P1.eq16"
  text := "The three-layer equation (16) is the downhill flow of the tilted energy (15), with regulation and HRV-scaled noise."
  statement := ∀ n (H₀ : (Fin n → ℝ) → ℝ) (α Hdot σ₀ C : ℝ) (β R ξ e : Fin n → ℝ),
    (∀ i, HasDerivAt (fun x => H₀ (Function.update e i x)) (partialAt H₀ e i) (e i)) →
    velocity3 H₀ α Hdot β R σ₀ C ξ e = velocity (tilted H₀ α Hdot β) e (fun i => R i + sigmaEff σ₀ C * ξ i)

instance : Witness cThreeLayers := .of fun _ _ _ _ _ _ _ _ _ _ h => velocity3_is_tilted_flow h

def cEquivalence : Claim where
  id := "P1.equivalence"
  text := "The somatic equivalence principle: the field cannot tell a cardiac tilt from any other forcing of the same size."
  statement := ∀ n (H₀ : (Fin n → ℝ) → ℝ) (α Hdot σ₀ C : ℝ) (β R ξ e J : Fin n → ℝ),
    (∀ i, J i = α * Hdot * β i) →
    velocity3 H₀ α Hdot β R σ₀ C ξ e = fun i => -partialAt H₀ e i + J i + R i + sigmaEff σ₀ C * ξ i

instance : Witness cEquivalence := .of fun _ _ _ _ _ _ _ _ _ _ _ hJ => somatic_equivalence hJ

def cLayer2 : Claim where
  id := "P1.layer2"
  text := "The two-term Langevin equation is the Layer 2 special case (R_PFC = 0, C_HRV = 1)."
  statement := ∀ n (H : (Fin n → ℝ) → ℝ) (σ₀ : ℝ) (ξ e : Fin n → ℝ),
    velocity18 H 0 σ₀ 1 ξ e = velocity H e (fun i => σ₀ * ξ i)

instance : Witness cLayer2 := .of fun _ _ _ _ _ => layer2_special_case

def cHRV : Claim where
  id := "P1.eq14"
  text := "High HRV coherence narrows effective noise."
  statement := ∀ σ₀ C C' : ℝ, 0 < σ₀ → 0 < C → C < C' → sigmaEff σ₀ C' < sigmaEff σ₀ C

instance : Witness cHRV := .of fun _ _ _ => sigmaEff_falls

def cPlasticity : Claim where
  id := "P1.eq17"
  text := "Complex PTSD as chronically low Π across all three terms: lowering any term lowers Π."
  statement := ∀ S S' dW dW' C C' : ℝ, 0 < S' → S' ≤ S → dW ≤ dW' → C ≤ C' →
    plasticity S dW C ≤ plasticity S' dW' C'

instance : Witness cPlasticity := .of fun _ _ _ _ _ _ => plasticity_mono

def cDownhill : Claim where
  id := "P1.downhill"
  text := "The field always moves downhill: without noise, its energy never rises."
  statement := ∀ n (H : (Fin n → ℝ) → ℝ), Differentiable ℝ H → ∀ e : ℝ → Fin n → ℝ,
    (∀ t, HasDerivAt e (velocity H (e t) 0) t) → Antitone (fun t => H (e t))

def cEscape : Claim where
  id := "P1.escape"
  text := "Escape from freeze requires first increasing the field's energy."
  statement := ∀ n (H : (Fin n → ℝ) → ℝ) (x : Fin n → ℝ),
    (∀ᶠ y in nhdsWithin x {x}ᶜ, H x < H y) → ∀ γ : ℝ → Fin n → ℝ, Continuous γ → γ 0 = x → γ 1 ≠ x →
    ∃ t ∈ Set.Icc (0 : ℝ) 1, H x < H (γ t)

/-- P1's claims, in the paper's order. -/
def claims : List Claim :=
  [cOneFunction, cCompanion, cForce, cHRV, cThreeLayers, cEquivalence, cPlasticity, cLayer2, cDownhill, cEscape]

#status claims

end TTheory.P1
