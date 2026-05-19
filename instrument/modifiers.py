"""
modifiers.py — Neurotype parameter transforms

Each modifier returns (gamma, D) scaled versions for the Langevin equation.
Reference: Hertz, Krogh & Palmer (1991) §2.4 — stochastic units and
effective temperature T_eff = D / gamma.
"""

from dataclasses import dataclass


@dataclass
class FieldParams:
    gamma: float = 1.0    # damping coefficient
    D:     float = 0.01   # diffusion / noise temperature
    theta: float = 0.70   # perception threshold


# Baseline (neurotypical) parameters
BASELINE = FieldParams(gamma=1.0, D=0.01, theta=0.70)


def apply_adhd(base: FieldParams, strength: float = 1.0) -> FieldParams:
    """
    ADHD: high T_eff — elevated noise, reduced damping.
    Strength in [0, 1]; 1.0 = full ADHD profile.

    Effect: T_eff = D/gamma rises, shallow basins become unstable.
    This is the same parameter that, in the Hopfield context, allows
    escape from spurious local minima (HKP §2.4).
    """
    s = float(strength)
    return FieldParams(
        gamma = base.gamma * (1.0 - 0.6 * s),   # reduced damping
        D     = base.D     * (1.0 + 8.0 * s),   # elevated diffusion
        theta = base.theta * (1.0 - 0.1 * s),   # slightly lower threshold
    )


def apply_cptsd(base: FieldParams, strength: float = 1.0) -> FieldParams:
    """
    C-PTSD: deep freeze attractor, hypervigilance basin deepened.
    Low noise (hypo-arousal default) with sudden high-noise spikes
    possible (handled in server via event injection).
    """
    s = float(strength)
    return FieldParams(
        gamma = base.gamma * (1.0 + 1.5 * s),   # overdamped — hard to leave states
        D     = base.D     * (1.0 - 0.5 * s),   # reduced baseline noise
        theta = base.theta * (1.0 - 0.2 * s),   # lower threshold (hypervigilance)
    )


def apply_asc(base: FieldParams, strength: float = 1.0) -> FieldParams:
    """
    Autism Spectrum Condition: sparse inter-mode coupling, deep
    interest basins, narrow but very stable attractors.
    Primarily affects W (coupling matrix) — handled in field.py setup.
    Parameter-level effect: slightly higher damping, low noise.
    """
    s = float(strength)
    return FieldParams(
        gamma = base.gamma * (1.0 + 0.4 * s),
        D     = base.D     * (1.0 - 0.3 * s),
        theta = base.theta,
    )


MODIFIER_MAP = {
    "adhd":  apply_adhd,
    "cptsd": apply_cptsd,
    "asc":   apply_asc,
}


def build_params(modifiers: dict) -> FieldParams:
    """
    Apply a dict of {modifier_name: strength} on top of BASELINE.
    Modifiers compose sequentially.
    """
    params = FieldParams(
        gamma = BASELINE.gamma,
        D     = BASELINE.D,
        theta = BASELINE.theta,
    )
    for name, strength in modifiers.items():
        fn = MODIFIER_MAP.get(name)
        if fn:
            params = fn(params, strength)
    return params
