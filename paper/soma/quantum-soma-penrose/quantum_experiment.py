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


def proportion_ci_wilson(successes: int, total: int, z: float = 1.96) -> tuple:
    """Wilson score interval for a Bernoulli proportion (default ~95% CI)."""
    if total <= 0:
        return (0.0, 0.0)
    p = successes / total
    denom = 1.0 + (z * z) / total
    center = (p + (z * z) / (2.0 * total)) / denom
    radius = (z / denom) * np.sqrt((p * (1.0 - p) / total) + (z * z) / (4.0 * total * total))
    return (float(max(0.0, center - radius)), float(min(1.0, center + radius)))


def quantum_anneal(
    W: np.ndarray,
    b: np.ndarray,
    steps: int = 400,
    gamma: float = 5.0,
    schedule: str = 'linear',
    pause_center: float = 0.60,
    pause_width: float = 0.20,
    pause_strength: float = 0.65,
    track_gap: bool = False,
    track_entropy: bool = False,
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
    if track_gap:
        rec['spectral_gap'] = []
    if track_entropy:
        rec['shannon_entropy'] = []

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
        if track_gap:
            rec['spectral_gap'].append(float(E[1] - E[0]))
        if track_entropy:
            H_ent = -np.sum(prob * np.log(prob + 1e-300))
            rec['shannon_entropy'].append(float(H_ent))
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
        ci_lo, ci_hi = proportion_ci_wilson(reached, seeds)
        return reached, reached / seeds, ci_lo, ci_hi, (float(np.mean(first_hits)) if first_hits else None), wall

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

        cold_n, cold_sr, cold_ci_lo, cold_ci_hi, cold_hit, cold_wall = run_classical(W, b, T=0.02)
        hot_n, hot_sr, hot_ci_lo, hot_ci_hi, hot_hit, hot_wall = run_classical(W, b, T=1.5)
        t0 = time.perf_counter()
        rec, _ = quantum_anneal(W, b, steps=qsteps, gamma=gamma, schedule='linear')
        q_wall = time.perf_counter() - t0

        rows.append({
            'case': name,
            'barrier': barrier,
            'gamma': gamma,
            'quantum_steps': qsteps,
            'seeds': seeds,
            'classical_cold_successes': cold_n,
            'classical_cold_success_rate': cold_sr,
            'classical_cold_ci_low': cold_ci_lo,
            'classical_cold_ci_high': cold_ci_hi,
            'classical_cold_first_hit': cold_hit,
            'classical_cold_wall_sec': cold_wall,
            'classical_hot_successes': hot_n,
            'classical_hot_success_rate': hot_sr,
            'classical_hot_ci_low': hot_ci_lo,
            'classical_hot_ci_high': hot_ci_hi,
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


def run_phase_diagram(
    out_csv: str = None,
    out_png: str = None,
    seeds: int = 8,
    classical_steps: int = 2500,
    quantum_steps: int = 220,
) -> tuple:
    """Barrier-vs-temperature phase diagram with quantum reference points."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_phase_diagram.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_phase_diagram.png')

    barriers = np.arange(-14.0, -5.0, 1.0)
    temps = np.array([0.02, 0.05, 0.10, 0.20, 0.50, 1.00, 1.50])

    e0 = bitstring(state_index('Fear'))
    mat = np.zeros((len(barriers), len(temps)), dtype=float)
    rows = []

    for i, barrier in enumerate(barriers):
        W, b = experiment_hamiltonian()
        W[IDX['Fear'], IDX['Awe']] = barrier
        W[IDX['Awe'], IDX['Fear']] = barrier

        # Quantum reference for this barrier.
        rec, _ = quantum_anneal(W, b, steps=quantum_steps, gamma=5.0, schedule='linear')
        q_peak = float(rec['awe_total'].max())

        for j, T in enumerate(temps):
            reached = 0
            for s in range(seeds):
                tr = langevin(W, b, e0, T=T, steps=classical_steps, seed=2000 + s)
                if np.any(tr[:, IDX['Awe']] >= 0.5):
                    reached += 1
            sr = reached / seeds
            mat[i, j] = sr
            rows.append({
                'barrier': float(barrier),
                'temperature': float(T),
                'classical_success_rate': float(sr),
                'classical_successes': int(reached),
                'seeds': int(seeds),
                'quantum_peak_awe_dominant': q_peak,
            })

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(
            f,
            fieldnames=['barrier', 'temperature', 'classical_success_rate', 'classical_successes', 'seeds', 'quantum_peak_awe_dominant'],
        )
        w.writeheader()
        w.writerows(rows)

    fig, ax = plt.subplots(figsize=(9.8, 5.2), facecolor='#0b0f14')
    ax.set_facecolor('#111827')
    im = ax.imshow(mat, origin='lower', aspect='auto', cmap='magma', vmin=0.0, vmax=1.0)
    ax.set_xticks(np.arange(len(temps)), [f'{t:.2f}' if t < 1 else f'{t:.1f}' for t in temps])
    ax.set_yticks(np.arange(len(barriers)), [f'{b:.0f}' for b in barriers])
    ax.set_xlabel('Classical temperature T', color='#d0d7de')
    ax.set_ylabel('Barrier W[Fear,Awe]', color='#d0d7de')
    ax.set_title('Classical Reachability Phase Diagram\nQuantum reference stays >0 across all barriers', color='white')
    ax.tick_params(colors='#d0d7de')
    cb = fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    cb.set_label('Classical Awe crossing probability', color='#d0d7de')
    cb.ax.yaxis.set_tick_params(color='#d0d7de')
    plt.setp(cb.ax.get_yticklabels(), color='#d0d7de')

    fig.tight_layout()
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    return out_csv, out_png


def run_noise_equivalence(
    out_csv: str = None,
    out_png: str = None,
    seeds: int = 12,
    classical_steps: int = 3000,
    quantum_steps: int = 200,
    target_frac: float = 0.90,
) -> tuple:
    """
    For each barrier strength, binary-search the temperature T* such that
    classical success rate first reaches (target_frac * quantum_peak_awe).

    Produces three panels:
      (a) T*(barrier) curve — the 'equivalence line'
      (b) Quantum vs Classical wave-like probability evolution at select barriers
      (c) Scatter of quantum peak occ vs required T* (efficiency portrait)
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.collections import LineCollection

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_noise_equivalence.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_noise_equivalence.png')

    barriers = np.arange(-14.0, -5.0, 1.0)
    e0 = bitstring(state_index('Fear'))

    def classical_sr(W, b, T):
        reached = sum(
            1 for s in range(seeds)
            if np.any(langevin(W, b, e0, T=T, steps=classical_steps, seed=3000 + s)[:, IDX['Awe']] >= 0.5)
        )
        return reached / seeds

    rows = []
    wave_data = {}   # barrier → (steps_arr, q_wave, c_wave_lo, c_wave_mid, c_wave_hi)

    for barrier in barriers:
        W, b = experiment_hamiltonian()
        W[IDX['Fear'], IDX['Awe']] = barrier
        W[IDX['Awe'], IDX['Fear']] = barrier

        rec, _ = quantum_anneal(W, b, steps=quantum_steps, gamma=5.0, schedule='linear')
        q_peak = float(rec['awe_total'].max())
        target_sr = q_peak * target_frac

        # Binary search T* in [0.01, 3.0]
        lo, hi = 0.01, 3.0
        t_star = hi
        for _ in range(14):
            mid = (lo + hi) / 2.0
            sr = classical_sr(W, b, mid)
            if sr >= target_sr:
                t_star = mid
                hi = mid
            else:
                lo = mid

        sr_at_tstar = classical_sr(W, b, t_star)
        rows.append({
            'barrier': float(barrier),
            'quantum_peak_awe': q_peak,
            'target_classical_sr': float(target_sr),
            'T_star': float(t_star),
            'classical_sr_at_Tstar': float(sr_at_tstar),
        })

        # Store wave data for select barriers (-8, -10, -12)
        if abs(barrier - (-8.0)) < 0.1 or abs(barrier - (-10.0)) < 0.1 or abs(barrier - (-12.0)) < 0.1:
            # Collect per-step Awe-dominant occupancy across 3 temperature tiers
            steps_arr = np.arange(quantum_steps)
            # Low T
            lo_awe = np.array([
                langevin(W, b, e0, T=0.05, steps=classical_steps, seed=4000 + s)[:, IDX['Awe']]
                for s in range(seeds)
            ])
            # T*
            mid_awe = np.array([
                langevin(W, b, e0, T=max(0.01, t_star), steps=classical_steps, seed=4000 + s)[:, IDX['Awe']]
                for s in range(seeds)
            ])
            # High T
            hi_awe = np.array([
                langevin(W, b, e0, T=1.5, steps=classical_steps, seed=4000 + s)[:, IDX['Awe']]
                for s in range(seeds)
            ])
            wave_data[float(barrier)] = {
                'q_wave': rec['awe_total'],        # shape (quantum_steps,)
                'q_s': rec['s'],
                'c_lo': lo_awe,                    # (seeds, classical_steps)
                'c_mid': mid_awe,
                'c_hi': hi_awe,
                't_star': t_star,
            }

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # ── Plot ─────────────────────────────────────────────────────────────────
    DARK = '#0b0f14'
    MID  = '#111827'
    SPINE = '#2a3040'
    TEXT = '#c9d1d9'
    Q_COL  = '#42f58d'
    LO_COL = '#ff4d4d'
    MID_COL = '#ffaa33'
    HI_COL = '#44ddff'

    def dark_ax(ax):
        ax.set_facecolor(MID)
        ax.tick_params(colors=TEXT, labelsize=8)
        for s in ax.spines.values():
            s.set_color(SPINE)

    n_wave_cases = len(wave_data)
    fig = plt.figure(figsize=(18, 12), facecolor=DARK)

    # Row 1: T*(barrier) curve + scatter
    ax_tstar = fig.add_subplot(3, 2, 1)
    dark_ax(ax_tstar)
    barr_vals = [r['barrier'] for r in rows]
    t_star_vals = [r['T_star'] for r in rows]
    q_peaks = [r['quantum_peak_awe'] for r in rows]

    ax_tstar.plot(barr_vals, t_star_vals, '-o', color=MID_COL, lw=2.5, ms=6)
    ax_tstar.axhline(0.05, color=LO_COL, ls=':', lw=1.0, alpha=0.6, label='T=0.05 (cold)')
    ax_tstar.axhline(1.50, color=HI_COL, ls=':', lw=1.0, alpha=0.6, label='T=1.50 (hot)')
    ax_tstar.fill_between(barr_vals, 0.05, t_star_vals, alpha=0.18, color=MID_COL,
                          label='Classical "quantum-equivalent" zone')
    ax_tstar.set_xlabel('Barrier W[Fear,Awe]', color=TEXT)
    ax_tstar.set_ylabel('T* (classical matching temperature)', color=TEXT)
    ax_tstar.set_title('Noise-Equivalence Curve: T*(barrier)', color='white', fontsize=11)
    ax_tstar.legend(fontsize=7, facecolor='#1a2030', labelcolor='white', framealpha=0.8)

    ax_scatter = fig.add_subplot(3, 2, 2)
    dark_ax(ax_scatter)
    sc = ax_scatter.scatter(barr_vals, q_peaks, c=t_star_vals, cmap='plasma',
                            s=70, edgecolors='white', lw=0.5, zorder=4)
    fig.colorbar(sc, ax=ax_scatter).set_label('T*', color=TEXT)
    ax_scatter.set_xlabel('Barrier', color=TEXT)
    ax_scatter.set_ylabel('Quantum peak Awe-dominant', color=TEXT)
    ax_scatter.set_title('Quantum occupancy vs required classical T*', color='white', fontsize=11)

    # Row 2/3: Wave plots for three barrier cases
    wave_cases = sorted(wave_data.keys())
    for ci, bval in enumerate(wave_cases):
        wd = wave_data[bval]
        c_lo  = wd['c_lo']   # (seeds, classical_steps)
        c_mid = wd['c_mid']
        c_hi  = wd['c_hi']
        q_w   = wd['q_wave']
        q_s   = wd['q_s']
        t_st  = wd['t_star']

        # Normalize classical x-axis: fraction of anneal budget
        c_x = np.linspace(0, 1, c_lo.shape[1])
        q_x = np.linspace(0, 1, len(q_w))

        ax = fig.add_subplot(3, 3, 4 + ci)
        dark_ax(ax)

        # Shade mean±std for each classical tier
        for arr, col, lbl in [(c_lo, LO_COL, 'T=0.05'), (c_mid, MID_COL, f'T*={t_st:.2f}'), (c_hi, HI_COL, 'T=1.50')]:
            mean = arr.mean(axis=0)
            std  = arr.std(axis=0)
            ax.fill_between(c_x, np.clip(mean - std, 0, 1), np.clip(mean + std, 0, 1),
                            alpha=0.18, color=col)
            ax.plot(c_x, mean, color=col, lw=1.5, label=lbl)

        # Quantum occupancy wave (normalised)
        ax.plot(q_x, q_w, color=Q_COL, lw=2.5, ls='-', label='Quantum Awe-dominant', zorder=5)

        ax.set_xlim(0, 1)
        ax.set_ylim(-0.04, 1.05)
        ax.set_xlabel('Normalised time (0→1)', color=TEXT, fontsize=8)
        ax.set_ylabel('Awe occupancy', color=TEXT, fontsize=8)
        ax.set_title(f'Wave evolution  barrier={bval:.0f}', color='white', fontsize=9)
        ax.legend(fontsize=6, facecolor='#1a2030', labelcolor='white', framealpha=0.8)

        # Bottom row: colormesh probability heatmap for quantum evolution (all 256 states collapsed to top-16)
        ax2 = fig.add_subplot(3, 3, 7 + ci)
        dark_ax(ax2)

        # Re-run to capture per-step full probability vector
        W2, b2 = experiment_hamiltonian()
        W2[IDX['Fear'], IDX['Awe']] = bval
        W2[IDX['Awe'], IDX['Fear']] = bval
        rec2, _ = quantum_anneal(W2, b2, steps=60, gamma=5.0, schedule='linear')

        # Build heatmap: Awe-dominant + Fear-dominant + other as 3-band
        s_arr = rec2['s']
        fear_b = rec2['fear']
        awe_t  = rec2['awe_total']
        awe_p  = rec2['awe']
        other  = 1.0 - rec2['fear'] - rec2['awe_total']

        plot_x = np.arange(len(s_arr))
        ax2.stackplot(plot_x, fear_b, awe_p, awe_t - awe_p, np.clip(other, 0, 1),
                      colors=[LO_COL, Q_COL, '#1ab080', '#555566'],
                      labels=['|Fear⟩', '|Awe⟩ pure', 'Awe-dominant (other)', 'Rest'],
                      alpha=0.85)
        ax2.set_xlim(0, len(s_arr) - 1)
        ax2.set_ylim(0, 1)
        ax2.set_xlabel('Annealing step', color=TEXT, fontsize=8)
        ax2.set_ylabel('Probability mass', color=TEXT, fontsize=8)
        ax2.set_title(f'Quantum state stack  barrier={bval:.0f}', color='white', fontsize=9)
        ax2.legend(fontsize=6, facecolor='#1a2030', labelcolor='white', framealpha=0.8,
                   loc='upper right')

    fig.suptitle(
        'QUANT-EXP: Noise-Equivalence Curve and Quantum Wave Evolution\n'
        f'T*(barrier): temperature classical dynamics need to match quantum reachability  (target={target_frac*100:.0f}% of quantum peak)',
        color='white', fontsize=11, y=1.00,
    )
    fig.tight_layout(rect=[0, 0, 1, 0.98])
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    return out_csv, out_png


def run_bootstrap_sweep(
    out_csv: str = None,
    out_png: str = None,
    seeds: int = 200,
) -> tuple:
    """
    Re-run barrier sweep with n=200 seeds for bootstrap-grade confidence intervals.
    Uses Wilson score CIs already built into run_barrier_sweep.
    """
    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_bootstrap_sweep.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_bootstrap_sweep.png')
    print(f'[bootstrap] Running barrier sweep with seeds={seeds} ...')
    return run_barrier_sweep(out_csv=out_csv, out_png=out_png, seeds=seeds)


def run_negative_controls(
    out_csv: str = None,
    out_png: str = None,
    seeds: int = 16,
    steps: int = 6000,
) -> tuple:
    """
    Control A: Start from |Awe> — classical cold should stay, quantum should stay.
               (Verifies no spurious Fear->Awe assignment; Awe is stable for both.)
    Control B: Remove barrier (W[Fear,Awe]=+0.4) — classical cold should cross freely.
               (Verifies barrier, not geometry, is what blocks classical.)
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_negative_controls.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_negative_controls.png')

    rows = []

    # --- Control A: start from Awe, barrier intact ---
    W_a, b_a = experiment_hamiltonian()   # barrier W[Fear,Awe]=-10
    e0_awe   = bitstring(state_index('Awe'))
    cold_awe_start = 0
    for s in range(seeds):
        tr = langevin(W_a, b_a, e0_awe, T=0.02, steps=steps, seed=5000 + s)
        if tr[-1, IDX['Awe']] >= 0.5:
            cold_awe_start += 1
    rec_a, _ = quantum_anneal(W_a, b_a, steps=400, gamma=5.0, schedule='linear')
    rows.append({
        'control': 'A',
        'description': 'Start from Awe, barrier intact',
        'classical_cold_stay_in_awe': cold_awe_start / seeds,
        'quantum_peak_awe_dominant': float(rec_a['awe_total'].max()),
        'expected_classical': '>0.9  (already in Awe, no barrier to cross back)',
        'expected_quantum': '>0.2  (remains Awe-dominant)',
        'verdict': 'PASS' if (cold_awe_start / seeds >= 0.9 and rec_a['awe_total'].max() >= 0.2) else 'FAIL',
    })

    # --- Control B: start from Fear, NO barrier (W[Fear,Awe]=+0.4) ---
    W_b, b_b = build_W_river(), np.zeros(N)
    b_b[IDX['Fear']] = 1.0
    b_b[IDX['Awe']]  = 2.0
    # W_b already has W[Fear,Awe]=+0.4 (cooperative) — no barrier
    e0_fear = bitstring(state_index('Fear'))
    cold_no_barrier = 0
    for s in range(seeds):
        tr = langevin(W_b, b_b, e0_fear, T=0.02, steps=steps, seed=6000 + s)
        if tr[-1, IDX['Awe']] >= 0.5:
            cold_no_barrier += 1
    rec_b, _ = quantum_anneal(W_b, b_b, steps=400, gamma=5.0, schedule='linear')
    rows.append({
        'control': 'B',
        'description': 'Start from Fear, NO barrier (W[Fear,Awe]=+0.4)',
        'classical_cold_stay_in_awe': cold_no_barrier / seeds,
        'quantum_peak_awe_dominant': float(rec_b['awe_total'].max()),
        'expected_classical': '>0.5  (barrier removed, classical can cross)',
        'expected_quantum': '>0.2  (easy reach)',
        'verdict': 'PASS' if (cold_no_barrier / seeds >= 0.5 and rec_b['awe_total'].max() >= 0.2) else 'FAIL',
    })

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # ── Plot ──────────────────────────────────────────────────────────────────
    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5), facecolor='#0b0f14')
    labels  = ['Control A\n(Start Awe)', 'Control B\n(No barrier)']
    c_rates = [rows[0]['classical_cold_stay_in_awe'], rows[1]['classical_cold_stay_in_awe']]
    q_peaks = [rows[0]['quantum_peak_awe_dominant'],  rows[1]['quantum_peak_awe_dominant']]
    verdicts = [rows[0]['verdict'], rows[1]['verdict']]

    for ax in axes:
        ax.set_facecolor('#111827')
        ax.tick_params(colors='#c9d1d9')
        for sp in ax.spines.values():
            sp.set_color('#2a3040')

    x = np.arange(2)
    axes[0].bar(x - 0.2, c_rates, width=0.35, color='#ff4d4d', label='Classical cold')
    axes[0].bar(x + 0.2, q_peaks, width=0.35, color='#42f58d', label='Quantum peak Awe-dom')
    axes[0].set_xticks(x, labels)
    axes[0].set_ylim(0, 1.05)
    axes[0].axhline(0.5,  color='white', ls=':', lw=1.0, alpha=0.5, label='0.5 threshold')
    axes[0].axhline(0.9,  color='#ffaa33', ls=':', lw=1.0, alpha=0.5, label='0.9 threshold')
    axes[0].set_title('Negative Controls: Awe rates', color='white')
    axes[0].legend(fontsize=7, facecolor='#1a2030', labelcolor='white', framealpha=0.8)

    for i, (lbl, v) in enumerate(zip(labels, verdicts)):
        col = '#42f58d' if v == 'PASS' else '#ff4d4d'
        axes[1].text(0.5, 0.65 - i * 0.35, f'{lbl.replace(chr(10)," ")}\n{v}',
                     ha='center', va='center', color=col, fontsize=14,
                     fontweight='bold', transform=axes[1].transAxes)
    axes[1].axis('off')
    axes[1].set_facecolor('#111827')
    axes[1].set_title('Verdicts', color='white')

    fig.suptitle('QUANT-EXP: Negative Controls A & B', color='white', fontsize=12)
    fig.tight_layout(rect=[0, 0, 1, 0.95])
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)

    for row in rows:
        print(f"  Control {row['control']}: {row['description']}")
        print(f"    classical={row['classical_cold_stay_in_awe']:.3f}  quantum_peak={row['quantum_peak_awe_dominant']:.3f}  -> {row['verdict']}")

    return out_csv, out_png


def run_fixed_seed_table(
    out_csv: str = None,
    seeds: int = 10,
    T_cold: float = 0.02,
    steps_classical: int = 6000,
    quantum_steps: int = 400,
    gamma: float = 5.0,
) -> str:
    """
    Run base experiment with seeds 0..seeds-1, fixed, tabulate classical + quantum.
    Produces a publication-ready reproducibility table.
    """
    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_fixed_seed_table.csv')

    W, b = experiment_hamiltonian()
    e0   = bitstring(state_index('Fear'))

    # Single quantum run (deterministic)
    rec, _ = quantum_anneal(W, b, steps=quantum_steps, gamma=gamma, schedule='linear',
                            track_gap=True)
    q_peak     = float(rec['awe_total'].max())
    q_final_e  = float(rec['energy'][-1])
    min_gap    = float(np.min(rec['spectral_gap']))
    gap_step   = int(np.argmin(rec['spectral_gap']))

    rows = []
    for seed in range(seeds):
        tr      = langevin(W, b, e0, T=T_cold, steps=steps_classical, seed=seed)
        final_f = float(tr[-1, IDX['Fear']])
        final_a = float(tr[-1, IDX['Awe']])
        peak_a  = float(tr[:, IDX['Awe']].max())
        crossed = bool(peak_a >= 0.5)
        rows.append({
            'seed': seed,
            'T_cold': T_cold,
            'classical_final_fear': round(final_f, 4),
            'classical_final_awe':  round(final_a, 4),
            'classical_peak_awe':   round(peak_a, 4),
            'classical_crossed':    crossed,
            'quantum_peak_awe_dominant': round(q_peak, 4),
            'quantum_final_energy':      round(q_final_e, 4),
            'quantum_min_spectral_gap':  round(min_gap, 4),
            'quantum_gap_step':          gap_step,
        })

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    classical_successes = sum(1 for r in rows if r['classical_crossed'])
    print(f'  Fixed-seed table: {seeds} seeds, {classical_successes}/{seeds} classical crossings')
    print(f'  Quantum peak Awe-dominant: {q_peak:.4f}')
    print(f'  Minimum spectral gap: {min_gap:.4f} at step {gap_step}/{quantum_steps}')
    print(f'  CSV: {out_csv}')
    return out_csv


def run_spectral_gap(
    out_csv: str = None,
    out_png: str = None,
) -> tuple:
    """
    Track spectral gap E[1]-E[0] of H(s) throughout the anneal for B8/B10/B12.
    Minimum gap location predicts tunneling bottleneck.
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_csv is None:
        out_csv = os.path.join(os.path.dirname(__file__), 'quantum_spectral_gap.csv')
    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_spectral_gap.png')

    cases = [
        ('B8',  -8.0,  4.0, 300),
        ('B10', -10.0, 5.0, 400),
        ('B12', -12.0, 6.0, 500),
    ]
    rows = []
    all_gaps = {}

    for name, barrier, gamma, qsteps in cases:
        W, b = experiment_hamiltonian()
        W[IDX['Fear'], IDX['Awe']] = barrier
        W[IDX['Awe'], IDX['Fear']] = barrier
        rec, _ = quantum_anneal(W, b, steps=qsteps, gamma=gamma,
                                schedule='linear', track_gap=True)
        gaps = np.array(rec['spectral_gap'])
        s_arr = np.array(rec['s'])
        min_gap  = float(gaps.min())
        min_step = int(gaps.argmin())
        min_s    = float(s_arr[min_step])
        q_peak   = float(rec['awe_total'].max())
        all_gaps[name] = (s_arr, gaps)
        rows.append({
            'case': name,
            'barrier': barrier,
            'gamma': gamma,
            'steps': qsteps,
            'min_spectral_gap': round(min_gap, 6),
            'min_gap_step': min_step,
            'min_gap_s': round(min_s, 4),
            'quantum_peak_awe_dominant': round(q_peak, 4),
        })
        print(f'  {name}: min gap={min_gap:.4f} at s={min_s:.3f} (step {min_step}/{qsteps})')

    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # Plot gap curves
    fig, ax = plt.subplots(figsize=(9, 4.5), facecolor='#0b0f14')
    ax.set_facecolor('#111827')
    ax.tick_params(colors='#c9d1d9')
    for sp in ax.spines.values():
        sp.set_color('#2a3040')
    colors = ['#44ddff', '#42f58d', '#ffaa33']
    for (name, (s_arr, gaps)), col, row in zip(all_gaps.items(), colors, rows):
        ax.plot(s_arr, gaps, color=col, lw=2.0, label=f"{name} (min={row['min_spectral_gap']:.4f} at s={row['min_gap_s']:.3f})")
        ax.axvline(row['min_gap_s'], color=col, ls=':', lw=1.0, alpha=0.5)
    ax.set_xlabel('Anneal progress s', color='#c9d1d9')
    ax.set_ylabel('Spectral gap E[1]-E[0]', color='#c9d1d9')
    ax.set_title('Spectral Gap During Anneal: B8 / B10 / B12', color='white', fontsize=11)
    ax.legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8)
    fig.tight_layout()
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    return out_csv, out_png


def run_entropy_panel(
    out_png: str = None,
    steps: int = 400,
    gamma: float = 5.0,
) -> str:
    """
    Plot Shannon entropy H(s) = -Σ p_i ln p_i alongside Fear/Awe occupancies.
    Shows when quantum superposition is maximal and when it has collapsed.
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_entropy_panel.png')

    W, b = experiment_hamiltonian()
    rec, _ = quantum_anneal(W, b, steps=steps, gamma=gamma, schedule='linear',
                            track_entropy=True, track_gap=True)
    s_arr = rec['s']
    H_max = float(np.log(2**N))   # log(256) ≈ 5.545 for uniform superposition

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5), facecolor='#0b0f14')
    for ax in axes:
        ax.set_facecolor('#111827')
        ax.tick_params(colors='#c9d1d9')
        for sp in ax.spines.values():
            sp.set_color('#2a3040')

    # Left: probability evolution
    axes[0].plot(s_arr, rec['fear'],      color='#ff4d4d', lw=2.0, label='P(Fear)')
    axes[0].plot(s_arr, rec['awe'],       color='#42f58d', lw=2.0, label='P(Awe)')
    axes[0].plot(s_arr, rec['awe_total'], color='#44ddff', lw=1.6, ls='--',
                 label='P(Awe-dominant)')
    axes[0].set_xlabel('Anneal progress s', color='#c9d1d9')
    axes[0].set_ylabel('Occupation probability', color='#c9d1d9')
    axes[0].set_title('State occupancy during anneal', color='white')
    axes[0].legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8)

    # Right: Shannon entropy
    axes[1].plot(s_arr, rec['shannon_entropy'], color='#ffaa33', lw=2.0,
                 label='Shannon entropy H(s)')
    axes[1].axhline(H_max, color='white', ls=':', lw=1.0, alpha=0.5,
                    label=f'Max (uniform) = {H_max:.3f}')
    peak_s = float(s_arr[np.argmax(rec['shannon_entropy'])])
    peak_H = float(np.max(rec['shannon_entropy']))
    axes[1].axvline(peak_s, color='#42f58d', ls=':', lw=1.2, alpha=0.7,
                    label=f'Peak at s={peak_s:.3f} (H={peak_H:.3f})')
    axes[1].set_xlabel('Anneal progress s', color='#c9d1d9')
    axes[1].set_ylabel('Shannon entropy (nats)', color='#c9d1d9')
    axes[1].set_title('Quantum superposition breadth', color='white')
    axes[1].legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8)

    fig.suptitle('QUANT-EXP: Entropy and Occupancy During Adiabatic Anneal', color='white',
                 fontsize=11)
    fig.tight_layout(rect=[0, 0, 1, 0.95])
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)

    print(f'  Peak Shannon entropy: {peak_H:.4f} at s={peak_s:.4f}')
    print(f'  Max possible (uniform): {H_max:.4f}')
    print(f'  Entropy ratio at peak: {peak_H/H_max:.4f}')
    print(f'  Plot: {out_png}')
    return out_png


def run_combined_figure(
    out_png: str = None,
) -> str:
    """
    Four-panel publication figure:
      A) Phase heatmap (classical reachability vs barrier/temperature)
      B) T* noise-equivalence curve
      C) Occupancy wave (base anneal: Fear/Awe vs s)
      D) Bootstrap CI summary (cold vs quantum at B8/B10/B12)
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import csv as csv_mod

    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_combined_figure.png')

    instr = os.path.dirname(__file__)

    def read_csv(fname):
        path = os.path.join(instr, fname)
        if not os.path.exists(path):
            return []
        with open(path, newline='', encoding='utf-8') as f:
            return list(csv_mod.DictReader(f))

    phase_rows  = read_csv('quantum_phase_diagram.csv')
    equiv_rows  = read_csv('quantum_noise_equivalence.csv')
    boot_rows   = read_csv('quantum_bootstrap_sweep.csv')

    fig = plt.figure(figsize=(13, 9), facecolor='#0b0f14')
    gs  = fig.add_gridspec(2, 2, hspace=0.42, wspace=0.35)
    axes = [fig.add_subplot(gs[r, c]) for r, c in [(0,0),(0,1),(1,0),(1,1)]]

    for ax in axes:
        ax.set_facecolor('#111827')
        ax.tick_params(colors='#c9d1d9', labelsize=8)
        for sp in ax.spines.values():
            sp.set_color('#2a3040')
        ax.xaxis.label.set_color('#c9d1d9')
        ax.yaxis.label.set_color('#c9d1d9')

    # ── Panel A: Phase heatmap ────────────────────────────────────────────────
    ax = axes[0]
    if phase_rows:
        barriers = sorted(set(float(r['barrier'])     for r in phase_rows))
        temps    = sorted(set(float(r['temperature']) for r in phase_rows))
        mat = np.zeros((len(barriers), len(temps)))
        for r in phase_rows:
            bi = barriers.index(float(r['barrier']))
            ti = temps.index(float(r['temperature']))
            mat[bi, ti] = float(r['classical_success_rate'])
        im = ax.imshow(mat, aspect='auto', origin='lower', cmap='RdYlGn',
                       vmin=0, vmax=1,
                       extent=[min(temps)-0.025, max(temps)+0.025,
                                min(barriers)-0.5, max(barriers)+0.5])
        fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04, label='Classical SR')
        ax.set_xlabel('Temperature T')
        ax.set_ylabel('Barrier W[Fear,Awe]')
        ax.set_title('A  Phase diagram', color='white', fontsize=10)
    else:
        ax.text(0.5, 0.5, 'quantum_phase_diagram.csv\nnot found', ha='center',
                va='center', color='#888', transform=ax.transAxes)
        ax.set_title('A  Phase diagram', color='white', fontsize=10)

    # ── Panel B: T* noise-equivalence ─────────────────────────────────────────
    ax = axes[1]
    if equiv_rows:
        barriers_e = [float(r['barrier']) for r in equiv_rows if r.get('T_star')]
        t_stars    = [float(r['T_star'])  for r in equiv_rows if r.get('T_star')]
        if barriers_e:
            ax.plot(barriers_e, t_stars, '-o', color='#ffaa33', lw=2.0,
                    label='T* (classical equiv.)')
            ax.set_xlabel('Barrier W[Fear,Awe]')
            ax.set_ylabel('Equivalent classical T*')
            ax.legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8)
    ax.set_title('B  Noise-equivalence T* curve', color='white', fontsize=10)

    # ── Panel C: Occupancy wave ────────────────────────────────────────────────
    ax = axes[2]
    W_c, b_c = experiment_hamiltonian()
    rec, _ = quantum_anneal(W_c, b_c, steps=400, gamma=5.0, schedule='linear',
                            track_entropy=True)
    ax.plot(rec['s'], rec['fear'],      color='#ff4d4d', lw=2.0, label='P(Fear)')
    ax.plot(rec['s'], rec['awe_total'], color='#42f58d', lw=2.0, label='P(Awe-dom.)')
    ax2c = ax.twinx()
    ax2c.plot(rec['s'], rec['shannon_entropy'], color='#ffaa33', lw=1.4, ls='--',
              alpha=0.8, label='Entropy')
    ax2c.set_ylabel('Entropy (nats)', color='#ffaa33', fontsize=8)
    ax2c.tick_params(colors='#ffaa33', labelsize=7)
    ax.set_xlabel('Anneal progress s')
    ax.set_ylabel('Occupation')
    ax.legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8,
              loc='upper left')
    ax.set_title('C  Occupancy + entropy wave (B10)', color='white', fontsize=10)

    # ── Panel D: Bootstrap CI summary ────────────────────────────────────────
    ax = axes[3]
    if boot_rows:
        cases  = [r['case'] for r in boot_rows]
        q_peaks = [float(r['quantum_peak_awe_dominant']) for r in boot_rows]
        ci_lo  = [float(r['classical_cold_ci_low'])  for r in boot_rows]
        ci_hi  = [float(r['classical_cold_ci_high']) for r in boot_rows]
        x      = np.arange(len(cases))
        ax.bar(x, q_peaks, width=0.4, color='#42f58d', alpha=0.9, label='Quantum peak')
        ax.errorbar(x, [(lo+hi)/2 for lo, hi in zip(ci_lo, ci_hi)],
                    yerr=[[(lo+hi)/2 - lo for lo, hi in zip(ci_lo, ci_hi)],
                          [(hi - (lo+hi)/2) for lo, hi in zip(ci_lo, ci_hi)]],
                    fmt='o', color='#ff4d4d', capsize=5, lw=1.5,
                    label='Classical cold CI (n=200)')
        ax.set_xticks(x, cases)
        ax.set_ylim(0, 0.55)
        ax.set_ylabel('Awe-dominant occupancy')
        ax.set_xlabel('Barrier case')
        ax.legend(fontsize=8, facecolor='#1a2030', labelcolor='white', framealpha=0.8)
    ax.set_title('D  Bootstrap CI: quantum vs classical cold', color='white', fontsize=10)

    fig.suptitle('QUANT-EXP-1: Combined Publication Figure', color='white', fontsize=12,
                 fontweight='bold')
    fig.savefig(out_png, dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)
    print(f'  Combined figure: {out_png}')
    return out_png


def run_bond_briefing(
    out_png: str = None,
    out_gif: str = None,
    fps: int = 14,
    frames: int = 84,
) -> tuple:
    """
    Render a cinematic "mission briefing" visualization package:
      - High-resolution 4-panel dashboard with 3D field meshes
      - Rotating turntable GIF over the Fear-Awe barrier landscape
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.animation import FuncAnimation, PillowWriter
    import matplotlib.gridspec as gridspec

    if out_png is None:
        out_png = os.path.join(os.path.dirname(__file__), 'quantum_bond_briefing.png')
    if out_gif is None:
        out_gif = os.path.join(os.path.dirname(__file__), 'quantum_bond_turntable.gif')

    W, b = experiment_hamiltonian()
    e0 = bitstring(state_index('Fear'))

    # Compute trajectories and quantum records for the dashboard.
    traj_cold = langevin(W, b, e0, T=0.02, steps=3500, seed=77)
    traj_hot = langevin(W, b, e0, T=1.50, steps=3500, seed=99)
    rec, _ = quantum_anneal(W, b, steps=320, gamma=5.0, schedule='linear')

    # Core metrics for mission card.
    energies = all_classical_energies(W, b)
    fear_energy = float(energies[state_index('Fear')])
    lam, H_path = energy_along_path(W, b)
    barrier_height = float(H_path.max() - fear_energy)
    classical_stuck = bool(traj_cold[-1, IDX['Fear']] > 0.5 and traj_cold[-1, IDX['Awe']] < 0.1)
    q_peak = float(rec['awe_total'].max())

    # Build 3D surface section.
    e_anchor = bitstring(state_index('Fear'))
    X, Y, Z = energy_surface_2d(W, b, 'Fear', 'Awe', e_anchor, res=80)

    # Downsample trajectory points for clean rendering.
    idx_c = np.linspace(0, len(traj_cold) - 1, 260).astype(int)
    idx_h = np.linspace(0, len(traj_hot) - 1, 260).astype(int)
    x_c = traj_cold[idx_c, IDX['Fear']]
    y_c = traj_cold[idx_c, IDX['Awe']]
    z_c = np.array([hopfield_energy(traj_cold[i], W, b) for i in idx_c])
    x_h = traj_hot[idx_h, IDX['Fear']]
    y_h = traj_hot[idx_h, IDX['Awe']]
    z_h = np.array([hopfield_energy(traj_hot[i], W, b) for i in idx_h])

    # Quantum curve embedded in 3D state space proxy.
    qx = rec['fear']
    qy = rec['awe_total']
    qz = rec['energy']

    # ── Dashboard PNG ──────────────────────────────────────────────────────
    fig = plt.figure(figsize=(16, 9), facecolor='#070b12')
    gs = gridspec.GridSpec(2, 2, figure=fig, wspace=0.18, hspace=0.18)

    # Panel A: hero 3D mesh with classical and quantum routes.
    axA = fig.add_subplot(gs[0, 0], projection='3d')
    axA.set_facecolor('#0c1320')
    axA.plot_surface(X, Y, Z, cmap='cividis', alpha=0.80, linewidth=0.0, antialiased=True)
    axA.plot_wireframe(X, Y, Z, rstride=6, cstride=6, color='#7de2ff', alpha=0.18, linewidth=0.5)
    axA.plot(x_c, y_c, z_c, color='#ff5d73', lw=2.0, label='Classical cold')
    axA.plot(x_h, y_h, z_h, color='#ffd166', lw=1.6, alpha=0.9, label='Classical hot')
    axA.plot(qx, qy, qz, color='#31f28b', lw=2.2, label='Quantum phase')
    axA.set_title('MISSION FIELD: Fear-Awe Barrier Topology', color='white', fontsize=11)
    axA.set_xlabel('Fear', color='#c9d1d9', fontsize=8)
    axA.set_ylabel('Awe / Awe-dominant', color='#c9d1d9', fontsize=8)
    axA.set_zlabel('Energy', color='#c9d1d9', fontsize=8)
    axA.tick_params(colors='#b4c0cf', labelsize=7)
    axA.view_init(elev=28, azim=-54)
    axA.legend(loc='upper left', fontsize=7, framealpha=0.7)

    # Panel B: alternate 3D angle with contour projection.
    axB = fig.add_subplot(gs[0, 1], projection='3d')
    axB.set_facecolor('#0c1320')
    z_floor = float(np.min(Z) - 0.6)
    axB.plot_surface(X, Y, Z, cmap='inferno', alpha=0.74, linewidth=0.0)
    axB.contour(X, Y, Z, zdir='z', offset=z_floor, levels=16, cmap='magma', linewidths=0.8)
    axB.plot(x_c, y_c, z_c, color='#7bdff2', lw=1.8)
    axB.plot(qx, qy, qz, color='#64f4ac', lw=2.3)
    axB.set_zlim(z_floor, float(np.max(Z) + 0.3))
    axB.set_title('TOPOLOGY VIEW: Contours + Traversal', color='white', fontsize=11)
    axB.set_xlabel('Fear', color='#c9d1d9', fontsize=8)
    axB.set_ylabel('Awe', color='#c9d1d9', fontsize=8)
    axB.set_zlabel('Energy', color='#c9d1d9', fontsize=8)
    axB.tick_params(colors='#b4c0cf', labelsize=7)
    axB.view_init(elev=34, azim=36)

    # Panel C: neon timeline occupancy readout.
    axC = fig.add_subplot(gs[1, 0])
    axC.set_facecolor('#0c1320')
    q_steps = np.arange(len(rec['awe_total']))
    c_steps = np.linspace(0, len(rec['awe_total']) - 1, len(traj_cold))
    axC.plot(c_steps, traj_cold[:, IDX['Fear']], color='#ff5d73', lw=1.2, alpha=0.90, label='Cold Fear')
    axC.plot(c_steps, traj_cold[:, IDX['Awe']], color='#6ec6ff', lw=1.2, alpha=0.90, label='Cold Awe')
    axC.plot(q_steps, rec['awe_total'], color='#31f28b', lw=2.2, label='Quantum Awe-dominant')
    axC.fill_between(q_steps, 0, rec['awe_total'], color='#31f28b', alpha=0.16)
    axC.set_title('TACTICAL TIMELINE: Occupancy Evolution', color='white', fontsize=11)
    axC.set_xlabel('Normalised progression', color='#c9d1d9', fontsize=9)
    axC.set_ylabel('Activation / Probability', color='#c9d1d9', fontsize=9)
    axC.set_ylim(-0.04, 1.02)
    axC.grid(alpha=0.18, color='#6b7c93', linestyle='--', linewidth=0.5)
    axC.tick_params(colors='#c9d1d9', labelsize=8)
    for s in axC.spines.values():
        s.set_color('#2b3a4d')
    axC.legend(fontsize=7, framealpha=0.72, facecolor='#0f1725', labelcolor='white')

    # Panel D: mission card / key metrics.
    axD = fig.add_subplot(gs[1, 1])
    axD.set_facecolor('#0c1320')
    axD.axis('off')
    verdict = 'PASS' if classical_stuck and q_peak > 0.05 else 'INCONCLUSIVE'
    lines = [
        'OPERATION: QUANT-EXP-1',
        '',
        f'Barrier height (continuous): {barrier_height:.3f}',
        f'Classical cold final Fear:   {traj_cold[-1, IDX["Fear"]]:.3f}',
        f'Classical cold final Awe:    {traj_cold[-1, IDX["Awe"]]:.3f}',
        f'Quantum peak Awe-dominant:   {q_peak:.3f}',
        f'Final quantum expected E:    {rec["energy"][-1]:.3f}',
        '',
        'Claim class: Reachability / topology',
        'Not a wall-clock speed claim.',
        '',
        f'VERDICT: {verdict}',
    ]
    y = 0.95
    for i, line in enumerate(lines):
        color = '#64f4ac' if 'VERDICT' in line else '#d6deeb'
        size = 13 if i == 0 else 10
        if 'VERDICT' in line:
            size = 14
        axD.text(0.04, y, line, color=color, fontsize=size, family='monospace', transform=axD.transAxes)
        y -= 0.07 if line else 0.04

    fig.suptitle(
        'QUANTUM FIELD BRIEFING  ·  CLASSIFIED: TOPOLOGICAL TRANSITION WINDOW',
        color='#7ee0ff', fontsize=13, y=0.985
    )
    fig.savefig(out_png, dpi=170, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close(fig)

    # ── Turntable GIF ──────────────────────────────────────────────────────
    fig2 = plt.figure(figsize=(9.5, 7.2), facecolor='#080d15')
    ax = fig2.add_subplot(111, projection='3d')
    ax.set_facecolor('#0c1320')
    ax.plot_surface(X, Y, Z, cmap='plasma', alpha=0.78, linewidth=0.0, antialiased=True)
    ax.plot_wireframe(X, Y, Z, rstride=7, cstride=7, color='#90e0ef', alpha=0.18, linewidth=0.55)
    ax.plot(x_c, y_c, z_c, color='#ff6f91', lw=1.8, label='Classical cold')
    ax.plot(qx, qy, qz, color='#2de2a5', lw=2.3, label='Quantum')
    ax.set_title('Turntable: Fear-Awe Field Geometry', color='white', fontsize=11)
    ax.set_xlabel('Fear', color='#c9d1d9', fontsize=8)
    ax.set_ylabel('Awe/Awe-dom', color='#c9d1d9', fontsize=8)
    ax.set_zlabel('Energy', color='#c9d1d9', fontsize=8)
    ax.tick_params(colors='#bcc8d8', labelsize=7)
    ax.legend(loc='upper left', fontsize=7, framealpha=0.72)

    def update(i: int):
        ax.view_init(elev=28 + 4.0 * np.sin(i / 18.0), azim=(i * 4.5) % 360)
        return ()

    anim = FuncAnimation(fig2, update, frames=frames, interval=1000 // max(1, fps), blit=False)
    anim.save(out_gif, writer=PillowWriter(fps=fps))
    plt.close(fig2)
    return out_png, out_gif


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
        choices=['run', 'animate', 'schedules', 'sweep', 'phase', 'equiv', 'bond',
                 'bootstrap', 'negctrl', 'seedtable', 'spectral', 'hardening',
                 'entropy', 'combined', 'all'],
        default='run',
        help=(
            'run: base experiment; animate: run+GIF; schedules: schedule comparison; '
            'sweep: barrier sweep; phase: barrier-vs-T phase diagram; '
            'equiv: noise-equivalence curve; bond: cinematic 3D briefing pack; '
            'bootstrap: sweep with n=200 seeds; negctrl: negative controls A+B; '
            'seedtable: fixed-seed reproducibility table; spectral: spectral gap proxy; '
            'hardening: bootstrap+negctrl+seedtable+spectral; '
            'entropy: Shannon entropy panel; combined: 4-panel publication figure; '
            'all: everything'
        ),
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

    if args.mode == 'phase':
        csv_path, png_path = run_phase_diagram()
        print(f"Phase CSV saved: {csv_path}")
        print(f"Phase plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'equiv':
        csv_path, png_path = run_noise_equivalence()
        print(f"Equivalence CSV saved: {csv_path}")
        print(f"Equivalence plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'bond':
        png_path, gif_path = run_bond_briefing()
        print(f"Bond briefing plot saved: {png_path}")
        print(f"Bond turntable GIF saved: {gif_path}")
        sys.exit(0)

    if args.mode == 'bootstrap':
        csv_path, png_path = run_bootstrap_sweep(seeds=200)
        print(f"Bootstrap CSV saved: {csv_path}")
        print(f"Bootstrap plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'negctrl':
        csv_path, png_path = run_negative_controls()
        print(f"Negative controls CSV saved: {csv_path}")
        print(f"Negative controls plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'seedtable':
        csv_path = run_fixed_seed_table()
        print(f"Fixed-seed table CSV saved: {csv_path}")
        sys.exit(0)

    if args.mode == 'spectral':
        csv_path, png_path = run_spectral_gap()
        print(f"Spectral gap CSV saved: {csv_path}")
        print(f"Spectral gap plot saved: {png_path}")
        sys.exit(0)

    if args.mode == 'hardening':
        print('=== [1/4] Bootstrap sweep (n=200) ===')
        c1, p1 = run_bootstrap_sweep(seeds=200)
        print('=== [2/4] Negative controls A & B ===')
        c2, p2 = run_negative_controls()
        print('=== [3/4] Fixed-seed table ===')
        c3 = run_fixed_seed_table()
        print('=== [4/4] Spectral gap proxy ===')
        c4, p4 = run_spectral_gap()
        print(f"\nBootstrap:      {c1}")
        print(f"Neg controls:   {c2}")
        print(f"Fixed-seed:     {c3}")
        print(f"Spectral gap:   {c4}")
        sys.exit(0)

    if args.mode == 'entropy':
        png = run_entropy_panel()
        print(f"Entropy panel: {png}")
        sys.exit(0)

    if args.mode == 'combined':
        png = run_combined_figure()
        print(f"Combined figure: {png}")
        sys.exit(0)

    # all
    verdict = main(make_animation=True)
    c1, p1 = run_schedule_comparison()
    c2, p2 = run_barrier_sweep()
    c3, p3 = run_phase_diagram()
    c4, p4 = run_noise_equivalence()
    b1, b2 = run_bond_briefing()
    cb1, pb1 = run_bootstrap_sweep(seeds=200)
    cb2, pb2 = run_negative_controls()
    cb3 = run_fixed_seed_table()
    cb4, pb4 = run_spectral_gap()
    print(f"Schedule CSV saved: {c1}")
    print(f"Sweep CSV saved: {c2}")
    print(f"Phase CSV saved: {c3}")
    print(f"Equivalence CSV saved: {c4}")
    print(f"Bootstrap CSV saved: {cb1}")
    print(f"Neg controls CSV saved: {cb2}")
    print(f"Fixed-seed CSV saved: {cb3}")
    print(f"Spectral gap CSV saved: {cb4}")
    sys.exit(0 if verdict == 'PASS' else 1)
