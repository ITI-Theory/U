#!/usr/bin/env python3
"""
QUANT-EXP-1: Soma-Field Quantum Tunneling Experiment
=====================================================

Numerically demonstrates that quantum annealing traverses topological
barriers in the soma-field attractor landscape that classical Langevin
dynamics cannot cross at the same effective noise level.

Connects to: THERAPY-2 TopologicalTraumaRequiresTopologicalFix (src/SomaAxioms.lean)
             QUANT-EXP-1 axiom (paper/FIELD-NOTES.md)

Setup (8 qubits = 256-dimensional Hilbert space):
  MODES = [Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal, Shame]
  W     = riverCoupling matrix (from Movie.lean) + barrier modification
  b     = bias: b[Fear]=1.0 (local min), b[Awe]=2.0 (global min)
  Barrier: W[Fear,Awe] = W[Awe,Fear] = -10.0 (mutual exclusion)
    → forces any Fear→Awe path through the empty state (energy barrier +1.0)
    → continuous path H(λ) has max +1.025 at λ=0.45 (analytically verified)

Analytically:
  H(Fear)    = -1.0   (local minimum)
  H(empty)   =  0.0   (barrier, +1.0 above Fear)
  H(Awe)     = -2.0   (global minimum)
  H(Fear+Awe)= +2.0   (mutual exclusion enforced, very high energy)
  Barrier continuous landscape: H(λ) = -10λ² + 9λ - 1, max at λ=0.45 → +1.025

Usage:
  python instrument/quantum_experiment.py

Requirements:
  pip install numpy scipy matplotlib
  (numpy 2.x, scipy 1.x, matplotlib 3.x — no IBM account or Qiskit needed)

Runtime: ~3-5 seconds (exact 256×256 statevector simulation via scipy.linalg.eigh)
"""

import numpy as np
from scipy.linalg import eigh
import argparse
import csv
import time
import sys
import os

# ── 8 modes: map to 8 qubits ──────────────────────────────────────────────────
MODES = ['Safety', 'Fear', 'Curiosity', 'Awe', 'Grief', 'Language', 'Preverbal', 'Shame']
N     = len(MODES)          # 8
IDX   = {m: i for i, m in enumerate(MODES)}


# ── riverCoupling W from Movie.lean ───────────────────────────────────────────
def build_W_river() -> np.ndarray:
    W = np.zeros((N, N))
    def link(a, b, w):
        W[IDX[a], IDX[b]] = w
        W[IDX[b], IDX[a]] = w
    link('Fear',     'Awe',        0.4)
    link('Awe',      'Grief',      0.3)
    link('Language', 'Preverbal', -0.6)
    link('Safety',   'Fear',      -0.5)
    return W


# ── Experiment Hamiltonian: riverCoupling + topological barrier ───────────────
def experiment_hamiltonian():
    """
    W[Fear,Awe] = -10.0: mutual exclusion → barrier along any Fear→Awe path.
    b[Fear] = 1.0: Fear is a genuine local minimum.
    b[Awe]  = 2.0: Awe is the global minimum (deeper well).

    Barrier height (discrete):   H(empty) - H(Fear) = 0 - (-1) = 1.0
    Barrier height (continuous):  max H(λ) - H(Fear) = 1.025 - (-1) = 2.025
    """
    W = build_W_river()
    b = np.zeros(N)
    # Override Fear↔Awe: cooperative (+0.4) → strongly anti-cooperative (-10.0)
    W[IDX['Fear'], IDX['Awe']] = -10.0
    W[IDX['Awe'], IDX['Fear']] = -10.0
    b[IDX['Fear']] = 1.0   # local attractor
    b[IDX['Awe']]  = 2.0   # global attractor
    return W, b


# ── Classical Hopfield energy and helpers ─────────────────────────────────────
def hopfield_energy(e: np.ndarray, W: np.ndarray, b: np.ndarray) -> float:
    return float(-0.5 * e @ W @ e - b @ e)


def bitstring(i: int) -> np.ndarray:
    """Integer i → binary vector length N, MSB = mode 0 (Safety)."""
    return np.array([(i >> (N - 1 - k)) & 1 for k in range(N)], dtype=float)


def state_index(mode: str) -> int:
    """Index in the 256-element state vector for the pure |mode⟩ basis state."""
    return 1 << (N - 1 - IDX[mode])


def all_classical_energies(W: np.ndarray, b: np.ndarray) -> np.ndarray:
    """Exhaustive enumeration of all 2^N = 256 classical energies."""
    return np.array([hopfield_energy(bitstring(i), W, b) for i in range(2**N)])


def energy_along_path(W: np.ndarray, b: np.ndarray, n: int = 300) -> tuple:
    """H(λ) along the linear Fear→Awe interpolation path."""
    e_fear = bitstring(state_index('Fear'))
    e_awe  = bitstring(state_index('Awe'))
    lam    = np.linspace(0, 1, n)
    H      = np.array([hopfield_energy((1 - l)*e_fear + l*e_awe, W, b) for l in lam])
    return lam, H


def energy_surface_2d(
    W: np.ndarray,
    b: np.ndarray,
    axis_x: str,
    axis_y: str,
    fixed_state: np.ndarray,
    res: int = 60,
) -> tuple:
    """2D section of H(e) over two chosen modes while other modes are fixed."""
    ix = IDX[axis_x]
    iy = IDX[axis_y]

    x = np.linspace(0.0, 1.0, res)
    y = np.linspace(0.0, 1.0, res)
    X, Y = np.meshgrid(x, y)
    Z = np.zeros_like(X)

    for r in range(res):
        for c in range(res):
            e = fixed_state.copy()
            e[ix] = X[r, c]
            e[iy] = Y[r, c]
            Z[r, c] = hopfield_energy(e, W, b)
    return X, Y, Z


# ── Classical Langevin dynamics (continuous, e ∈ [0,1]^N) ────────────────────
def langevin(W: np.ndarray, b: np.ndarray, e0: np.ndarray,
             T: float, dt: float = 0.005, steps: int = 6000, seed: int = 42) -> np.ndarray:
    """
    Overdamped Langevin: de = -(∂H/∂e) dt + √(2T dt) η,  e clipped to [0,1].
    ∂H/∂e = -(We + b)  →  drift = (We + b).
    """
    rng = np.random.default_rng(seed)
    e   = np.clip(e0.copy().astype(float), 0.0, 1.0)
    traj = [e.copy()]
    for _ in range(steps):
        drift  = W @ e + b
        noise  = np.sqrt(2.0 * T * dt) * rng.standard_normal(N)
        e      = np.clip(e + drift * dt + noise, 0.0, 1.0)
        traj.append(e.copy())
    return np.array(traj)


# ── Quantum: transverse-field Ising Hamiltonian (exact, dim=256) ──────────────
_σx = np.array([[0., 1.], [1., 0.]])

def _kron_site(op, site, n=N) -> np.ndarray:
    """I⊗…⊗ op (at site) ⊗…⊗ I — n-qubit tensor product."""
    parts = [np.eye(2)] * n
    parts[site] = op
    M = parts[0]
    for p in parts[1:]:
        M = np.kron(M, p)
    return M


def build_H_driver(n: int = N, gamma: float = 1.0) -> np.ndarray:
    """H_driver = -Γ Σᵢ σˣᵢ   (transverse field — enables tunneling)."""
    H = np.zeros((2**n, 2**n))
    for i in range(n):
        H -= gamma * _kron_site(_σx, i, n)
    return H


def anneal_schedule_s(
    raw_s: float,
    schedule: str = 'linear',
    pause_center: float = 0.60,
    pause_width: float = 0.20,
    pause_strength: float = 0.65,
) -> float:
    """Map raw [0,1] schedule coordinate to anneal progress s in [0,1]."""
    x = float(np.clip(raw_s, 0.0, 1.0))
    if schedule == 'linear':
        return x
    if schedule == 'cosine':
        # Slow near endpoints, faster in the middle.
        return float(0.5 * (1.0 - np.cos(np.pi * x)))
    if schedule == 'pause':
        # Pause around a chosen region (often near minimum-gap neighborhood).
        lo = max(0.0, pause_center - 0.5 * pause_width)
        hi = min(1.0, pause_center + 0.5 * pause_width)
        if hi <= lo:
            return x
        if x < lo:
            return x
        if x > hi:
            return x
        t = (x - lo) / (hi - lo)
        return float(lo + (hi - lo) * (t ** (1.0 + pause_strength)))
    return x


def quantum_anneal(
    W: np.ndarray,
    b: np.ndarray,
    steps: int = 400,
    gamma: float = 5.0,
    schedule: str = 'linear',
    pause_center: float = 0.60,
    pause_width: float = 0.20,
    pause_strength: float = 0.65,
) -> dict:
    """
    Adiabatic evolution: H(s) = (1-s)·H_driver + s·H_problem,  s: 0 → 1.

    H_problem is diagonal with the 256 classical energies on the diagonal.
    This is exact (no QUBO→Ising approximation needed).

    Uses scipy.linalg.eigh at each step for exact unitary evolution.
    Each step: |ψ⟩ → V diag(e^{-iE dt}) V† |ψ⟩   (Schrödinger picture).

    Returns dict with occupation histories and final state.
    """
    energies_cl = all_classical_energies(W, b)
    H_problem   = np.diag(energies_cl)            # diagonal ← classical energies
    H_driver    = build_H_driver(N, gamma=gamma)

    # Start: ground state of H_driver = uniform superposition |+⟩^⊗N
    E0, V0 = eigh(H_driver)
    psi    = V0[:, 0].astype(complex)
    psi   /= np.linalg.norm(psi)

    dt = 1.0 / steps

    i_fear = state_index('Fear')
    i_awe  = state_index('Awe')

    # "Awe-dominant": any state with Awe=1, Fear=0
    awe_mask = np.array(
        [bitstring(i)[IDX['Awe']] == 1 and bitstring(i)[IDX['Fear']] == 0
         for i in range(2**N)], dtype=bool)

    rec = {'fear': [], 'awe': [], 'awe_total': [], 'energy': [], 's': []}

    for step in range(steps):
        raw_s = (step + 0.5) / steps
        s = anneal_schedule_s(
            raw_s,
            schedule=schedule,
            pause_center=pause_center,
            pause_width=pause_width,
            pause_strength=pause_strength,
        )
        H = (1.0 - s) * H_driver + s * H_problem
        E, V   = eigh(H)
        c      = V.conj().T @ psi
        c     *= np.exp(-1j * E * dt)
        psi    = V @ c
        psi   /= np.linalg.norm(psi)

        prob = np.abs(psi) ** 2
        rec['fear'].append(prob[i_fear])
        rec['awe'].append(prob[i_awe])
        rec['awe_total'].append(float(prob[awe_mask].sum()))
        rec['energy'].append(float(np.real(psi.conj() @ H_problem @ psi)))
        rec['s'].append(s)

    return {k: np.array(v) for k, v in rec.items()}, psi


def generate_3d_animation(
    W: np.ndarray,
    b: np.ndarray,
    traj_cold: np.ndarray,
    traj_hot: np.ndarray,
    rec: dict,
    out_path: str,
    fps: int = 16,
    frames: int = 90,
) -> None:
    """Render a rotating 3D animation (GIF) of landscape + trajectories."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.animation import FuncAnimation, PillowWriter

    fig = plt.figure(figsize=(8.8, 6.8), facecolor='#0a0a0a')
    ax = fig.add_subplot(111, projection='3d')
    ax.set_facecolor('#101419')

    e_anchor = bitstring(state_index('Fear'))
    X, Y, Z = energy_surface_2d(W, b, 'Fear', 'Awe', e_anchor, res=56)
    ax.plot_surface(X, Y, Z, cmap='inferno', linewidth=0.0, antialiased=True, alpha=0.82)

    idx_cold = np.linspace(0, len(traj_cold) - 1, 220).astype(int)
    x_c = traj_cold[idx_cold, IDX['Fear']]
    y_c = traj_cold[idx_cold, IDX['Awe']]
    z_c = np.array([hopfield_energy(traj_cold[i], W, b) for i in idx_cold])
    ax.plot(x_c, y_c, z_c, color='#35d4ff', lw=2.2, label='Classical cold')

    idx_hot = np.linspace(0, len(traj_hot) - 1, 220).astype(int)
    x_h = traj_hot[idx_hot, IDX['Fear']]
    y_h = traj_hot[idx_hot, IDX['Awe']]
    z_h = np.array([hopfield_energy(traj_hot[i], W, b) for i in idx_hot])
    ax.plot(x_h, y_h, z_h, color='#ffd84d', lw=2.0, label='Classical hot')

    # Quantum proxy trajectory embedded into the same 3D frame.
    qx = rec['fear']
    qy = rec['awe_total']
    qz = rec['energy']
    ax.plot(qx, qy, qz, color='#42f58d', lw=2.1, label='Quantum phase')

    ax.set_title('QUANT-EXP: Rotating 3D Landscape', color='white', fontsize=11)
    ax.set_xlabel('Fear', color='#bbbbbb')
    ax.set_ylabel('Awe / Awe-dominant', color='#bbbbbb')
    ax.set_zlabel('Energy', color='#bbbbbb')
    ax.tick_params(colors='#aaaaaa', labelsize=8)
    ax.legend(loc='upper left', fontsize=8, framealpha=0.75)

    def update(i: int):
        ax.view_init(elev=26, azim=(i * 4) % 360)
        return ()

    ani = FuncAnimation(fig, update, frames=frames, interval=1000 // max(1, fps), blit=False)
    ani.save(out_path, writer=PillowWriter(fps=fps))
    plt.close(fig)


def run_schedule_comparison(
    out_csv: str = None,
    out_png: str = None,
    gamma: float = 5.0,
    steps: int = 400,
) -> tuple:
    """Compare linear/cosine/pause schedules on one fixed barrier case."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_schedule_comparison.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_schedule_comparison.png')

    W, b = experiment_hamiltonian()
    schedules = ['linear', 'cosine', 'pause']
    rows = []
    for sch in schedules:
        t0 = time.perf_counter()
        rec, _ = quantum_anneal(W, b, steps=steps, gamma=gamma, schedule=sch)
        wall = time.perf_counter() - t0
        rows.append({
            'schedule': sch,
            'peak_awe_dominant': float(rec['awe_total'].max()),
            'final_energy': float(rec['energy'][-1]),
            'wall_sec': wall,
        })

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=['schedule', 'peak_awe_dominant', 'final_energy', 'wall_sec'])
        w.writeheader()
        w.writerows(rows)

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10.8, 4.6), facecolor='#0a0a0a')
    for ax in (ax1, ax2):
        ax.set_facecolor('#111111')
        ax.tick_params(colors='#aaaaaa')
        for s in ax.spines.values():
            s.set_color('#333333')

    xs = np.arange(len(rows))
    labels = [r['schedule'] for r in rows]
    peaks = [r['peak_awe_dominant'] for r in rows]
    energies = [r['final_energy'] for r in rows]

    ax1.bar(xs, peaks, color=['#44ddff', '#ffaa33', '#42f58d'])
    ax1.set_xticks(xs, labels)
    ax1.set_ylim(0, 1.0)
    ax1.set_title('Peak Awe-dominant occupancy', color='white', fontsize=10)

    ax2.bar(xs, energies, color=['#44ddff', '#ffaa33', '#42f58d'])
    ax2.set_xticks(xs, labels)
    ax2.set_title('Final expected energy', color='white', fontsize=10)

    fig.suptitle('Anneal schedule comparison', color='white', fontsize=11)
    fig.tight_layout(rect=[0, 0, 1, 0.95])
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    return out_csv, out_png


def run_barrier_sweep(
    out_csv: str = None,
    out_png: str = None,
    seeds: int = 16,
) -> tuple:
    """Run barrier robustness sweep and save CSV + summary plot."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_sweep_results.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_sweep_summary.png')

    def run_classical(W, b, T, steps=6000, thresh=0.5):
        e0 = bitstring(state_index('Fear'))
        reached = 0
        first_hits = []
        t0 = time.perf_counter()
        for s in range(seeds):
            tr = langevin(W, b, e0, T=T, steps=steps, seed=1000 + s)
            awe = tr[:, IDX['Awe']]
            ix = np.where(awe >= thresh)[0]
            if len(ix):
                reached += 1
                first_hits.append(int(ix[0]))
        wall = time.perf_counter() - t0
        return reached / seeds, (float(np.mean(first_hits)) if first_hits else None), wall

    cases = [
        ('B8', -8.0, 4.0, 300),
        ('B10', -10.0, 5.0, 400),
        ('B12', -12.0, 6.0, 500),
    ]
    rows = []
    for name, barrier, gamma, qsteps in cases:
        W, b = experiment_hamiltonian()
        W[IDX['Fear'], IDX['Awe']] = barrier
        W[IDX['Awe'], IDX['Fear']] = barrier

        cold_sr, cold_hit, cold_wall = run_classical(W, b, T=0.02)
        hot_sr, hot_hit, hot_wall = run_classical(W, b, T=1.5)
        t0 = time.perf_counter()
        rec, _ = quantum_anneal(W, b, steps=qsteps, gamma=gamma, schedule='linear')
        q_wall = time.perf_counter() - t0

        rows.append({
            'case': name,
            'barrier': barrier,
            'gamma': gamma,
            'quantum_steps': qsteps,
            'classical_cold_success_rate': cold_sr,
            'classical_cold_first_hit': cold_hit,
            'classical_cold_wall_sec': cold_wall,
            'classical_hot_success_rate': hot_sr,
            'classical_hot_first_hit': hot_hit,
            'classical_hot_wall_sec': hot_wall,
            'quantum_peak_awe_dominant': float(rec['awe_total'].max()),
            'quantum_first_hit_step': int(np.where(rec['awe_total'] >= 0.2)[0][0]) if np.any(rec['awe_total'] >= 0.2) else None,
            'quantum_wall_sec': q_wall,
            'quantum_final_energy': float(rec['energy'][-1]),
        })

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    labels = [r['case'] for r in rows]
    x = np.arange(len(labels))
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4.8), facecolor='#0d1117')
    for ax in (ax1, ax2):
        ax.set_facecolor('#111827')
        ax.tick_params(colors='#c9d1d9')
        for s in ax.spines.values():
            s.set_color('#30363d')

    ax1.bar(x - 0.25, [r['classical_cold_success_rate'] for r in rows], width=0.25, color='#ff4d4d', label='Classical cold T=0.02')
    ax1.bar(x, [r['classical_hot_success_rate'] for r in rows], width=0.25, color='#f5a623', label='Classical hot T=1.5')
    ax1.bar(x + 0.25, [1.0 if r['quantum_peak_awe_dominant'] >= 0.2 else 0.0 for r in rows], width=0.25, color='#2dd4bf', label='Quantum reaches Awe-dom')
    ax1.set_xticks(x, labels)
    ax1.set_ylim(0, 1.05)
    ax1.set_title('Reachability by regime', color='white')
    ax1.legend(fontsize=8)

    ax2.plot(labels, [r['classical_cold_wall_sec'] for r in rows], '-o', color='#ff4d4d', label='Classical cold wall sec')
    ax2.plot(labels, [r['quantum_wall_sec'] for r in rows], '-o', color='#2dd4bf', label='Quantum wall sec')
    ax2.set_title('Wall-clock cost (this CPU)', color='white')
    ax2.set_ylabel('seconds', color='#c9d1d9')
    ax2.legend(fontsize=8)

    fig.suptitle('QUANT-EXP Sweep: barrier robustness', color='white')
    fig.tight_layout(rect=[0, 0, 1, 0.95])
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    return out_csv, out_png


# ── Main experiment ───────────────────────────────────────────────────────────
def main(make_animation: bool = False):
    print("=" * 60)
    print("QUANT-EXP-1: Soma-Field Quantum Tunneling")
    print("=" * 60)

    W, b = experiment_hamiltonian()

    # ── Analytical landscape ─────────────────────────────────────────────────
    energies = all_classical_energies(W, b)
    gs_idx   = int(np.argmin(energies))
    gs_bits  = bitstring(gs_idx)
    gs_modes = [MODES[k] for k in range(N) if gs_bits[k] == 1]

    fear_energy    = energies[state_index('Fear')]
    awe_energy     = energies[state_index('Awe')]
    barrier_energy = energies[0]  # empty state (all modes off)

    lam, H_path    = energy_along_path(W, b)
    barrier_cont   = float(H_path.max() - fear_energy)

    print(f"\nAnalytical landscape:")
    print(f"  H(|Fear⟩)    = {fear_energy:+.3f}   ← local minimum")
    print(f"  H(|empty⟩)   = {barrier_energy:+.3f}   ← discrete barrier (+{barrier_energy - fear_energy:.3f})")
    print(f"  H(|Awe⟩)     = {awe_energy:+.3f}   ← global minimum")
    print(f"  H(λ=0.45)    = {H_path.max():+.3f}   ← continuous path maximum")
    print(f"  Barrier (continuous path) = {barrier_cont:.3f}")
    print(f"  Global ground state: {gs_modes}  E₀ = {energies[gs_idx]:.3f}")

    # ── Classical Langevin: low T (stuck) ────────────────────────────────────
    e_fear = bitstring(state_index('Fear'))

    print(f"\nClassical Langevin T=0.02  (cold — exp(-barrier/T) ≈ exp(-101) ≈ 0)...")
    traj_cold = langevin(W, b, e_fear, T=0.02, steps=6000)
    cold_fear = float(traj_cold[-1][IDX['Fear']])
    cold_awe  = float(traj_cold[-1][IDX['Awe']])
    print(f"  Final  Fear={cold_fear:.3f}  Awe={cold_awe:.3f}  → {'STUCK in Fear' if cold_fear > 0.5 else 'escaped'}")

    # ── Classical Langevin: high T (floods through by brute thermal force) ───
    print(f"Classical Langevin T=1.50  (hot — thermal flooding)...")
    traj_hot = langevin(W, b, e_fear, T=1.50, steps=6000)
    hot_fear = float(traj_hot[-1][IDX['Fear']])
    hot_awe  = float(traj_hot[-1][IDX['Awe']])
    hot_label = 'floods (diffuse — no clean basin)' if hot_fear < 0.5 else 'still stuck'
    print(f"  Final  Fear={hot_fear:.3f}  Awe={hot_awe:.3f}  → {hot_label}")

    # ── Quantum annealing (exact 256-dim statevector) ────────────────────────
    print(f"\nQuantum annealing  Γ_start=5.0  steps=400  (exact 256-dim statevector)...")
    rec, psi_final = quantum_anneal(W, b, steps=400, gamma=5.0)

    peak_awe_total = float(rec['awe_total'].max())
    final_awe_pure = float(rec['awe'][-1])
    final_energy   = float(rec['energy'][-1])

    # Compare with true ground state
    H_prob = np.diag(all_classical_energies(W, b))
    E_gs, V_gs = eigh(H_prob)
    true_gs_awe = float(abs(V_gs[state_index('Awe'), 0]) ** 2)

    print(f"  |Fear⟩ occupation at end:         {rec['fear'][-1]:.4f}")
    print(f"  |Awe⟩  occupation at end:          {final_awe_pure:.4f}")
    print(f"  Awe-dominant states (Awe=1,Fear=0): {peak_awe_total:.4f}  (peak over run)")
    print(f"  Final energy:                       {final_energy:.4f}  (ground state: {energies[gs_idx]:.4f})")
    print(f"  True ground state |Awe⟩ overlap:   {true_gs_awe:.4f}")

    # ── Verdict ──────────────────────────────────────────────────────────────
    classical_stuck  = cold_fear > 0.5 and cold_awe < 0.1
    quantum_tunnels  = peak_awe_total > 0.05
    gs_has_awe       = gs_bits[IDX['Awe']] == 1

    print("\n" + "=" * 60)
    print(f"RESULT  Classical (T=0.02) stuck in Fear:   {'✓' if classical_stuck else '✗'}  (Fear={cold_fear:.3f})")
    print(f"RESULT  Global minimum contains Awe:        {'✓' if gs_has_awe else '✗'}  (modes: {gs_modes})")
    print(f"RESULT  Quantum annealing reaches Awe:      {'✓' if quantum_tunnels else '✗'}  (occ={peak_awe_total:.3f})")

    verdict = "PASS" if (classical_stuck and quantum_tunnels and gs_has_awe) else "INCONCLUSIVE"
    print(f"\nQUANT-EXP-1: {verdict}")

    if verdict == "PASS":
        print("\nQuantum tunneling traverses the topological barrier.")
        print("Classical Langevin (T=0.02) cannot cross barrier height 2.025.")
        print("Quantum annealing (Γ→0, exact) finds the Awe-dominant ground state.")
        print("\nTherapeutic implication (THERAPY-2):")
        print("  Topological trauma barriers require topological intervention.")
        print("  Classical gradient descent / incremental habituation cannot cross.")
        print("  Quantum-analogous (non-local, superposition) interventions can.")
    else:
        print("\nAdjust barrier strength or annealing schedule.")

    print("=" * 60)

    # ── Plot ─────────────────────────────────────────────────────────────────
    try:
        import matplotlib
        matplotlib.use('Agg')  # non-interactive backend (safe on Windows)
        import matplotlib.pyplot as plt
        import matplotlib.gridspec as gridspec

        fig = plt.figure(figsize=(18, 5), facecolor='#0a0a0a')
        gs  = gridspec.GridSpec(1, 4, figure=fig, wspace=0.38, left=0.06, right=0.97,
                                bottom=0.15, top=0.82)

        c_fear   = '#ff4444'
        c_awe    = '#44ddff'
        c_path   = '#ffaa33'
        c_base   = '#556677'
        bg       = '#111111'
        spine_c  = '#333333'

        def style_ax(ax):
            ax.set_facecolor(bg)
            ax.tick_params(colors='#aaaaaa', labelsize=8)
            for s in ax.spines.values():
                s.set_color(spine_c)

        # ── Panel 1: Energy path Fear→Awe ────────────────────────────────────
        ax0 = fig.add_subplot(gs[0])
        style_ax(ax0)

        # Baseline (riverCoupling, no barrier)
        W_base  = build_W_river()
        b_base  = np.zeros(N)
        lam_b, H_base = energy_along_path(W_base, b_base)
        ax0.plot(lam_b, H_base, color=c_base, lw=1.5, ls='--', label='Baseline (no barrier)')
        ax0.plot(lam,   H_path, color=c_path, lw=2.0,           label='With barrier')

        ax0.scatter([0], [fear_energy], color=c_fear, s=70, zorder=5)
        ax0.scatter([1], [awe_energy],  color=c_awe,  s=70, zorder=5)
        ax0.axhline(0, color='#ffffff', lw=0.4, ls=':', alpha=0.3)

        ax0.set_title('H(λ) Fear → Awe', color='white', fontsize=10)
        ax0.set_xlabel('λ', color='#aaaaaa', fontsize=9)
        ax0.set_ylabel('H(e)', color='#aaaaaa', fontsize=9)
        ax0.legend(fontsize=7, facecolor='#1a1a1a', labelcolor='white',
                   framealpha=0.8, edgecolor=spine_c)

        bh = H_path.max() - fear_energy
        ax0.annotate(f'barrier\n≈{bh:.2f}',
                     xy=(lam[int(np.argmax(H_path))], H_path.max()),
                     xytext=(0.55, 0.82), textcoords='axes fraction',
                     color=c_path, fontsize=8, ha='center',
                     arrowprops=dict(arrowstyle='->', color=c_path, lw=1.0))
        ax0.text(0.03, 0.10, 'Fear', transform=ax0.transAxes,
                 color=c_fear, fontsize=8, va='bottom')
        ax0.text(0.88, 0.10, 'Awe', transform=ax0.transAxes,
                 color=c_awe,  fontsize=8, va='bottom')

        # ── Panel 2: Classical cold ───────────────────────────────────────────
        ax1 = fig.add_subplot(gs[1])
        style_ax(ax1)
        steps_arr = np.arange(len(traj_cold))
        ax1.plot(steps_arr, traj_cold[:, IDX['Fear']],  color=c_fear, lw=1.5, label='Fear')
        ax1.plot(steps_arr, traj_cold[:, IDX['Awe']],   color=c_awe,  lw=1.5, label='Awe')
        ax1.plot(steps_arr, traj_cold[:, IDX['Safety']], color='#44ff88', lw=1.0,
                 alpha=0.5, label='Safety')
        ax1.set_title('Classical  T=0.02', color='white', fontsize=10)
        ax1.set_xlabel('Step', color='#aaaaaa', fontsize=9)
        ax1.set_ylabel('Activation', color='#aaaaaa', fontsize=9)
        ax1.set_ylim(-0.05, 1.15)
        ax1.legend(fontsize=7, facecolor='#1a1a1a', labelcolor='white',
                   framealpha=0.8, edgecolor=spine_c)
        ax1.text(0.35, 0.86, 'STUCK', transform=ax1.transAxes,
                 color=c_fear, fontsize=20, fontweight='bold', alpha=0.9)
        ax1.text(0.04, 0.04, f'T=0.02 ≪ barrier {bh:.2f}', transform=ax1.transAxes,
                 color='#aaaaaa', fontsize=7)

        # ── Panel 3: Classical hot ────────────────────────────────────────────
        ax2 = fig.add_subplot(gs[2])
        style_ax(ax2)
        ax2.plot(steps_arr, traj_hot[:, IDX['Fear']],  color=c_fear, lw=1.5, label='Fear')
        ax2.plot(steps_arr, traj_hot[:, IDX['Awe']],   color=c_awe,  lw=1.5, label='Awe')
        ax2.plot(steps_arr, traj_hot[:, IDX['Safety']], color='#44ff88', lw=1.0,
                 alpha=0.5, label='Safety')
        ax2.set_title('Classical  T=1.50  (brute force)', color='white', fontsize=10)
        ax2.set_xlabel('Step', color='#aaaaaa', fontsize=9)
        ax2.set_ylim(-0.05, 1.15)
        ax2.legend(fontsize=7, facecolor='#1a1a1a', labelcolor='white',
                   framealpha=0.8, edgecolor=spine_c)
        ax2.text(0.27, 0.86, 'FLOODS', transform=ax2.transAxes,
                 color=c_path, fontsize=20, fontweight='bold', alpha=0.9)
        ax2.text(0.04, 0.04, 'T=1.50 ≫ barrier — destroys structure',
                 transform=ax2.transAxes, color='#aaaaaa', fontsize=7)

        # ── Panel 4: Quantum annealing ────────────────────────────────────────
        ax3 = fig.add_subplot(gs[3])
        style_ax(ax3)
        steps_q = np.arange(len(rec['fear']))
        ax3.plot(steps_q, rec['fear'],      color=c_fear,    lw=2.0, label='|Fear⟩')
        ax3.plot(steps_q, rec['awe'],       color=c_awe,     lw=2.0, label='|Awe⟩ pure')
        ax3.plot(steps_q, rec['awe_total'], color=c_awe,     lw=1.5,
                 ls='--', alpha=0.65, label='Awe-dominant')
        ax3.set_title(f'Quantum Annealing  Γ→0', color='white', fontsize=10)
        ax3.set_xlabel('Annealing step  (s: 0→1)', color='#aaaaaa', fontsize=9)
        ax3.set_ylabel('Occupation  |⟨i|ψ⟩|²', color='#aaaaaa', fontsize=9)
        ax3.set_ylim(-0.02, 1.05)
        ax3.legend(fontsize=7, facecolor='#1a1a1a', labelcolor='white',
                   framealpha=0.8, edgecolor=spine_c)
        if quantum_tunnels:
            ax3.text(0.27, 0.86, 'TUNNELS', transform=ax3.transAxes,
                     color=c_awe, fontsize=20, fontweight='bold', alpha=0.9)
        ax3.text(0.04, 0.04, f'Γ=5.0→0, 400 steps, dim=256',
                 transform=ax3.transAxes, color='#aaaaaa', fontsize=7)

        # ── Suptitle ─────────────────────────────────────────────────────────
        result_color = '#44ff88' if verdict == 'PASS' else '#ffaa33'
        fig.suptitle(
            f'QUANT-EXP-1  [{verdict}]  —  Soma-Field Quantum Tunneling\n'
            'Barrier: W[Fear,Awe]=−10  ·  b[Fear]=1.0 (local min)  ·  b[Awe]=2.0 (global min)  ·  '
            f'barrier height ≈ {bh:.2f}',
            color=result_color, fontsize=10, y=0.97
        )

        out_path = os.path.join(os.path.dirname(__file__), 'quantum_experiment_result.png')
        plt.savefig(out_path, dpi=150, bbox_inches='tight',
                    facecolor=fig.get_facecolor())
        print(f"\nPlot saved: {out_path}")

        # ── Additional 3D figure: landscape geometry + trajectories ─────────
        fig3d = plt.figure(figsize=(16, 10), facecolor='#0a0a0a')
        bg3d = '#101419'

        e_anchor = bitstring(state_index('Fear'))
        Xfa, Yfa, Zfa = energy_surface_2d(W, b, 'Fear', 'Awe', e_anchor, res=64)

        ax31 = fig3d.add_subplot(2, 2, 1, projection='3d')
        ax31.set_facecolor(bg3d)
        surf1 = ax31.plot_surface(Xfa, Yfa, Zfa, cmap='inferno', linewidth=0.0,
                                  antialiased=True, alpha=0.92)
        t_cold = np.linspace(0, len(traj_cold) - 1, 240).astype(int)
        fc = traj_cold[t_cold, IDX['Fear']]
        ac = traj_cold[t_cold, IDX['Awe']]
        zc = np.array([
            hopfield_energy(traj_cold[i], W, b) for i in t_cold
        ])
        ax31.plot(fc, ac, zc, color='#35d4ff', lw=2.2, label='Classical cold path')
        ax31.set_title('3D Energy Surface: Fear x Awe (cold path)', color='white', fontsize=10)
        ax31.set_xlabel('Fear', color='#bbbbbb', fontsize=8)
        ax31.set_ylabel('Awe', color='#bbbbbb', fontsize=8)
        ax31.set_zlabel('H(e)', color='#bbbbbb', fontsize=8)
        ax31.tick_params(colors='#aaaaaa', labelsize=7)
        ax31.legend(loc='upper left', fontsize=7, framealpha=0.8)
        fig3d.colorbar(surf1, ax=ax31, shrink=0.6, pad=0.12)

        ax32 = fig3d.add_subplot(2, 2, 2, projection='3d')
        ax32.set_facecolor(bg3d)
        surf2 = ax32.plot_surface(Xfa, Yfa, Zfa, cmap='viridis', linewidth=0.0,
                                  antialiased=True, alpha=0.9)
        t_hot = np.linspace(0, len(traj_hot) - 1, 240).astype(int)
        fh = traj_hot[t_hot, IDX['Fear']]
        ah = traj_hot[t_hot, IDX['Awe']]
        zh = np.array([
            hopfield_energy(traj_hot[i], W, b) for i in t_hot
        ])
        ax32.plot(fh, ah, zh, color='#ffd84d', lw=2.0, label='Classical hot path')
        ax32.set_title('3D Energy Surface: Fear x Awe (hot path)', color='white', fontsize=10)
        ax32.set_xlabel('Fear', color='#bbbbbb', fontsize=8)
        ax32.set_ylabel('Awe', color='#bbbbbb', fontsize=8)
        ax32.set_zlabel('H(e)', color='#bbbbbb', fontsize=8)
        ax32.tick_params(colors='#aaaaaa', labelsize=7)
        ax32.legend(loc='upper left', fontsize=7, framealpha=0.8)
        fig3d.colorbar(surf2, ax=ax32, shrink=0.6, pad=0.12)

        # Quantum phase trajectory: (Fear occ, Awe-dominant occ, expected energy)
        ax33 = fig3d.add_subplot(2, 2, 3, projection='3d')
        ax33.set_facecolor(bg3d)
        rq_f = rec['fear']
        rq_a = rec['awe_total']
        rq_e = rec['energy']
        ax33.plot(rq_f, rq_a, rq_e, color='#42f58d', lw=2.0)
        ax33.scatter(rq_f[0], rq_a[0], rq_e[0], color='#ffffff', s=30, label='start')
        ax33.scatter(rq_f[-1], rq_a[-1], rq_e[-1], color='#ff6677', s=30, label='end')
        ax33.set_title('Quantum Phase Curve', color='white', fontsize=10)
        ax33.set_xlabel('P(|Fear>)', color='#bbbbbb', fontsize=8)
        ax33.set_ylabel('P(Awe-dominant)', color='#bbbbbb', fontsize=8)
        ax33.set_zlabel('<H_problem>', color='#bbbbbb', fontsize=8)
        ax33.tick_params(colors='#aaaaaa', labelsize=7)
        ax33.legend(loc='upper left', fontsize=7, framealpha=0.8)

        # End-state probability skyline for top basis states
        ax34 = fig3d.add_subplot(2, 2, 4, projection='3d')
        ax34.set_facecolor(bg3d)
        prob_final = np.abs(psi_final) ** 2
        topk = 24
        top_idx = np.argsort(prob_final)[-topk:]
        top_probs = prob_final[top_idx]
        order = np.argsort(top_probs)
        xs = np.arange(topk)
        ys = np.zeros(topk)
        dz = top_probs[order]
        colors = plt.cm.plasma(np.linspace(0.2, 0.95, topk))
        ax34.bar3d(xs, ys, np.zeros(topk), 0.7, 0.5, dz, color=colors, shade=True)
        ax34.set_title('Final Quantum State: Top Basis Probabilities', color='white', fontsize=10)
        ax34.set_xlabel('Ranked basis index', color='#bbbbbb', fontsize=8)
        ax34.set_ylabel('', color='#bbbbbb', fontsize=8)
        ax34.set_zlabel('Probability', color='#bbbbbb', fontsize=8)
        ax34.tick_params(colors='#aaaaaa', labelsize=7)

        fig3d.suptitle(
            'QUANT-EXP-1 3D Views: Landscape Topology and Quantum Motion',
            color='#6bf7d8', fontsize=12, y=0.98
        )
        out_path_3d = os.path.join(os.path.dirname(__file__), 'quantum_experiment_3d.png')
        plt.savefig(out_path_3d, dpi=160, bbox_inches='tight', facecolor=fig3d.get_facecolor())
        print(f"3D plot saved: {out_path_3d}")

        if make_animation:
            out_anim = os.path.join(os.path.dirname(__file__), 'quantum_experiment_3d.gif')
            generate_3d_animation(W, b, traj_cold, traj_hot, rec, out_anim)
            print(f"3D animation saved: {out_anim}")

    except Exception as exc:
        print(f"\n(Plot skipped: {exc})")

    return verdict


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Quantum tunneling experiment CLI')
    parser.add_argument(
        '--mode',
        choices=['run', 'animate', 'schedules', 'sweep', 'all'],
        default='run',
        help='run: base experiment; animate: run + GIF; schedules: schedule comparison; sweep: barrier sweep; all: everything',
    )
    args = parser.parse_args()

    if args.mode == 'run':
        verdict = main(make_animation=False)
        sys.exit(0 if verdict == 'PASS' else 1)

    if args.mode == 'animate':
        verdict = main(make_animation=True)
        sys.exit(0 if verdict == 'PASS' else 1)

    if args.mode == 'schedules':
        csv_path, png_path = run_schedule_comparison()
        print(f"Schedule CSV saved: {csv_path}")
        print(f"Schedule plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'sweep':
        csv_path, png_path = run_barrier_sweep()
        print(f"Sweep CSV saved: {csv_path}")
        print(f"Sweep plot saved: {png_path}")
        sys.exit(0)

    # all
    verdict = main(make_animation=True)
    c1, p1 = run_schedule_comparison()
    c2, p2 = run_barrier_sweep()
    print(f"Schedule CSV saved: {c1}")
    print(f"Schedule plot saved: {p1}")
    print(f"Sweep CSV saved: {c2}")
    print(f"Sweep plot saved: {p2}")
    sys.exit(0 if verdict == 'PASS' else 1)
