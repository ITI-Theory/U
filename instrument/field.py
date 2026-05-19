"""
field.py — Soma-Field core computation

State vector:  e ∈ ℝ^16  (8 emotional modes × somatic + cognitive)
Energy:        H(e) = ½ eᵀ W e − bᵀ e
Gradient:      ∇H(e) = W e − b
Dynamics:      γ ė(t) = −∇H(e(t)) + √(2D) ξ(t)   [Langevin]

All units normalised to [0, 1] from MIDI input.
"""

import numpy as np


N_MODES = 8          # emotional modes
N_DIM   = 16         # state vector dimension (2 per mode: somatic + cognitive)

# Default coupling matrix W — symmetric, negative definite around calm attractor
# Diagonal: self-damping (negative = restoring force)
# Off-diagonal: inter-mode coupling (positive = excitatory, negative = inhibitory)
_DEFAULT_W = np.zeros((N_DIM, N_DIM))
np.fill_diagonal(_DEFAULT_W, -0.8)

# Named attractor states (normalised 0–1)
ATTRACTORS = {
    "regulated_calm":   np.array([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,   # somatic
                                   0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]), # cognitive
    "fight":            np.array([0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2,
                                   0.7, 0.7, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]),
    "flight":           np.array([0.6, 0.3, 0.8, 0.3, 0.2, 0.2, 0.2, 0.2,
                                   0.5, 0.3, 0.7, 0.3, 0.2, 0.2, 0.2, 0.2]),
    "freeze":           np.array([0.2, 0.2, 0.2, 0.2, 0.9, 0.9, 0.2, 0.2,
                                   0.1, 0.1, 0.1, 0.1, 0.8, 0.8, 0.1, 0.1]),
    "grief":            np.array([0.3, 0.2, 0.1, 0.7, 0.2, 0.2, 0.2, 0.2,
                                   0.2, 0.2, 0.1, 0.8, 0.2, 0.2, 0.2, 0.2]),
    "hypervigilance":   np.array([0.7, 0.6, 0.7, 0.2, 0.5, 0.2, 0.2, 0.2,
                                   0.8, 0.7, 0.7, 0.2, 0.4, 0.2, 0.2, 0.2]),
    "flow":             np.array([0.4, 0.3, 0.3, 0.2, 0.1, 0.1, 0.8, 0.7,
                                   0.3, 0.2, 0.2, 0.2, 0.1, 0.1, 0.8, 0.8]),
    "dissociation":     np.array([0.1, 0.1, 0.1, 0.1, 0.6, 0.2, 0.1, 0.1,
                                   0.05, 0.05, 0.05, 0.05, 0.7, 0.1, 0.05, 0.05]),
}


class SomaField:
    """Real-time soma-field state machine."""

    def __init__(self, W=None, b=None, gamma=1.0, D=0.01, theta=0.7, dt=0.02):
        self.W     = W if W is not None else _DEFAULT_W.copy()
        self.b     = b if b is not None else np.zeros(N_DIM)
        self.gamma = gamma        # damping coefficient
        self.D     = D            # noise temperature (diffusion)
        self.theta = theta        # perception threshold
        self.dt    = dt           # integration timestep (seconds)

        self.e     = np.zeros(N_DIM)   # current state vector
        self.rng   = np.random.default_rng()

    # ------------------------------------------------------------------
    # Core physics
    # ------------------------------------------------------------------

    def H(self, e=None):
        """Energy function H(e) = ½ eᵀ W e − bᵀ e."""
        e = self.e if e is None else e
        return 0.5 * e @ self.W @ e - self.b @ e

    def grad_H(self, e=None):
        """Gradient ∇H(e) = W e − b."""
        e = self.e if e is None else e
        return self.W @ e - self.b

    def step(self):
        """Euler–Maruyama integration of the Langevin equation."""
        noise      = np.sqrt(2 * self.D / self.dt) * self.rng.standard_normal(N_DIM)
        de         = (-self.grad_H() + noise) * (self.dt / self.gamma)
        self.e     = np.clip(self.e + de, 0.0, 1.0)

    def threshold_crossings(self):
        """Return list of mode indices whose amplitude exceeds theta."""
        # Somatic amplitude for each mode: max(somatic_i, cognitive_i)
        amplitudes = np.maximum(self.e[:N_MODES], self.e[N_MODES:])
        return [i for i, a in enumerate(amplitudes) if a > self.theta]

    def nearest_attractor(self):
        """Return name of the attractor state closest to current e."""
        best, dist = "unknown", float("inf")
        for name, state in ATTRACTORS.items():
            d = float(np.linalg.norm(self.e - state))
            if d < dist:
                best, dist = name, d
        return best, dist

    # ------------------------------------------------------------------
    # State injection (from MIDI input)
    # ------------------------------------------------------------------

    def set_somatic(self, mode_idx: int, value: float):
        """Set somatic component of mode (0-indexed), value in [0, 1]."""
        self.e[mode_idx] = float(np.clip(value, 0.0, 1.0))

    def set_cognitive(self, mode_idx: int, value: float):
        """Set cognitive component of mode (0-indexed), value in [0, 1]."""
        self.e[N_MODES + mode_idx] = float(np.clip(value, 0.0, 1.0))

    def load_preset(self, name: str):
        """Snap state to a named attractor."""
        if name in ATTRACTORS:
            self.e = ATTRACTORS[name].copy()

    # ------------------------------------------------------------------
    # Summary for OSC / logging
    # ------------------------------------------------------------------

    def state_dict(self):
        return {
            "e":                self.e.tolist(),
            "H":                float(self.H()),
            "grad_H":           self.grad_H().tolist(),
            "T_eff":            float(self.D / self.gamma),
            "threshold_cross":  self.threshold_crossings(),
            "nearest_attractor": self.nearest_attractor()[0],
        }
