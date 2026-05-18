#!/usr/bin/env python3
"""
plot_field.py — Visualise the 8-dimensional BRECVEMA Soma-Field

Figures
────────
  --trajectory <pattern> [--steps N]   Activation trajectories over time
  --wmatrix                            W8 coupling-constant heatmap
  --energy                             2D energy surface (EM×VI, BS×RE, etc.)
  --patterns                           Bar chart of all four stored attractors
  --all                                All four figures (for paper figures)

Output
───────
  --output <file>                      Save to PDF/PNG/SVG (default: show)
  --output-dir <dir>                   For --all: saves to dir/trajectory.pdf etc.
  --interactive                        Open Plotly browser version instead

Usage
──────
  python scripts/plot_field.py --trajectory nostalgia
  python scripts/plot_field.py --wmatrix --output paper/figures/fig_wmatrix.pdf
  python scripts/plot_field.py --energy --axes em,vi
  python scripts/plot_field.py --patterns
  python scripts/plot_field.py --all --output-dir paper/figures
  python scripts/plot_field.py --trajectory startle --interactive
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path
from typing import Optional

import numpy as np

# ── Field dynamics (same as soma_midi.py — self-contained copy) ──────────────

N8       = 8
DIM_NAMES = ["BS", "RE", "EC", "CO", "VI", "EM", "ME", "AJ"]
DIM_FULL  = [
    "BrainStem", "RhythmicEntrainment", "EvaluativeConditioning", "Contagion",
    "VisualImagery", "EpisodicMemory", "MusicalExpectancy", "AestheticJudgement",
]
DIM_COLORS = [
    "#e6194b",  # BS  — red
    "#3cb44b",  # RE  — green
    "#4363d8",  # EC  — blue
    "#f58231",  # CO  — orange
    "#911eb4",  # VI  — purple
    "#42d4f4",  # EM  — cyan
    "#f032e6",  # ME  — magenta
    "#bfef45",  # AJ  — lime
]

_COUPLINGS = {
    (0, 2):  0.3, (0, 3):  0.4, (1, 3):  0.5, (2, 3):  0.4,
    (4, 5):  0.6, (6, 7):  0.7, (0, 7): -0.4, (2, 4): -0.3,
}

def W8(i: int, j: int) -> float:
    if i == j: return 1.2
    return _COUPLINGS.get((min(i, j), max(i, j)), 0.0)

W_MAT = np.array([[W8(i, j) for j in range(N8)] for i in range(N8)])

def energy(e: np.ndarray) -> float:
    return float(-0.5 * e @ W_MAT @ e)

def step(e: np.ndarray, dt: float = 0.05) -> np.ndarray:
    return e + dt * (W_MAT @ e)

def run(e0: np.ndarray, dt: float, n: int) -> np.ndarray:
    """Return (n+1, 8) array of field states."""
    states = np.zeros((n + 1, N8))
    states[0] = e0
    for i in range(n):
        states[i + 1] = step(states[i], dt)
    return states

def _pat(*pairs) -> np.ndarray:
    e = np.zeros(N8)
    for i, v in pairs:
        e[i] = v
    return e

PATTERNS = {
    "nostalgia":   _pat((5, 1.0), (4, 0.6), (6, -0.4), (7, -0.4)),
    "startle":     _pat((0, 1.0), (2, 0.4), (3, 0.3),  (7, -0.6)),
    "musicalAwe":  _pat((6, 1.0), (7, 0.8), (3, 0.4),  (0, -0.5)),
    "entrainment": _pat((1, 1.0), (3, 0.5), (0, -0.3)),
}

# ── Matplotlib helpers ────────────────────────────────────────────────────────

def _mpl():
    try:
        import matplotlib
        import matplotlib.pyplot as plt
        return matplotlib, plt
    except ImportError:
        print("matplotlib not found.  Run:  pip install matplotlib numpy",
              file=sys.stderr)
        sys.exit(1)

def _plotly():
    try:
        import plotly.graph_objects as go
        import plotly.subplots as sp
        return go, sp
    except ImportError:
        print("plotly not found.  Run:  pip install plotly", file=sys.stderr)
        sys.exit(1)

def _save_or_show(plt, path: Optional[str], label: str):
    if path:
        plt.savefig(path, bbox_inches="tight", dpi=150)
        print(f"[plot_field] saved → {path}")
    else:
        plt.show()

# ── Figure 1: W-matrix heatmap ───────────────────────────────────────────────

def plot_wmatrix(output: Optional[str] = None, interactive: bool = False):
    if interactive:
        go, _ = _plotly()
        fig = go.Figure(data=go.Heatmap(
            z=W_MAT, x=DIM_NAMES, y=DIM_NAMES,
            colorscale="RdBu", zmid=0,
            text=np.round(W_MAT, 2).tolist(), texttemplate="%{text}",
            colorbar=dict(title="W_ij"),
        ))
        fig.update_layout(
            title="W8 Coupling Matrix — BRECVEMA Hopfield Field",
            xaxis_title="Mechanism j",
            yaxis_title="Mechanism i",
        )
        fig.show()
        return

    matplotlib, plt = _mpl()
    fig, ax = plt.subplots(figsize=(7, 6))
    im = ax.imshow(W_MAT, cmap="RdBu_r", vmin=-1, vmax=1)
    plt.colorbar(im, ax=ax, label="Coupling constant $W_{ij}$")

    ax.set_xticks(range(N8)); ax.set_xticklabels(DIM_NAMES, fontsize=9)
    ax.set_yticks(range(N8)); ax.set_yticklabels(DIM_NAMES, fontsize=9)
    ax.set_title("$W_8$ Coupling Matrix — BRECVEMA Soma-Field", fontsize=11)
    ax.set_xlabel("Mechanism $j$"); ax.set_ylabel("Mechanism $i$")

    # Annotate each cell
    for i in range(N8):
        for j in range(N8):
            v = W_MAT[i, j]
            if v != 0:
                ax.text(j, i, f"{v:.1f}", ha="center", va="center",
                        fontsize=7,
                        color="white" if abs(v) > 0.6 else "black")

    # Box the non-zero off-diagonal coupling pairs
    for (a, b), w in _COUPLINGS.items():
        color = "#c00" if w < 0 else "#006"
        for (r, c) in [(a, b), (b, a)]:
            rect = matplotlib.patches.Rectangle(
                (c - 0.5, r - 0.5), 1, 1,
                linewidth=1.5, edgecolor=color, facecolor="none")
            ax.add_patch(rect)

    plt.tight_layout()
    _save_or_show(plt, output, "wmatrix")

# ── Figure 2: Trajectory plot ─────────────────────────────────────────────────

def plot_trajectory(pat_name: str = "nostalgia", steps: int = 60, dt: float = 0.05,
                    output: Optional[str] = None, interactive: bool = False):
    if pat_name not in PATTERNS:
        print(f"Unknown pattern {pat_name!r}.  Choices: {list(PATTERNS)}", file=sys.stderr)
        sys.exit(1)

    e0     = PATTERNS[pat_name]
    states = run(e0, dt, steps)                          # (steps+1, 8)
    ts     = np.arange(steps + 1) * dt
    energies = np.array([energy(states[i]) for i in range(steps + 1)])

    if interactive:
        go, sp_mod = _plotly()
        fig = sp_mod.make_subplots(
            rows=2, cols=1, shared_xaxes=True,
            subplot_titles=("Activations", "Energy H(e)"),
            row_heights=[0.7, 0.3])
        for d in range(N8):
            fig.add_trace(go.Scatter(
                x=ts, y=states[:, d], name=DIM_NAMES[d],
                line=dict(color=DIM_COLORS[d])), row=1, col=1)
        fig.add_trace(go.Scatter(
            x=ts, y=energies, name="H(e)",
            line=dict(color="black", dash="dot")), row=2, col=1)
        fig.update_layout(
            title=f"Soma-Field trajectory — {pat_name}",
            xaxis2_title="Time (t·dt)")
        fig.show()
        return

    matplotlib, plt = _mpl()
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(9, 6), sharex=True,
                                    gridspec_kw={"height_ratios": [3, 1]})

    # Activation traces
    for d in range(N8):
        ax1.plot(ts, states[:, d], label=DIM_NAMES[d],
                 color=DIM_COLORS[d], linewidth=1.8)
    ax1.axhline(0, color="gray", linewidth=0.5, linestyle="--")
    ax1.set_ylabel("Activation")
    ax1.set_title(f"Soma-Field trajectory — {pat_name}  "
                  f"(dt={dt}, steps={steps})", fontsize=11)
    ax1.legend(ncol=4, fontsize=8, loc="upper right")
    ax1.grid(True, alpha=0.3)

    # Energy trace
    ax2.plot(ts, energies, color="black", linewidth=1.5, linestyle="--")
    ax2.set_xlabel("Time  $t \\cdot dt$")
    ax2.set_ylabel("$H(e)$")
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    _save_or_show(plt, output, f"trajectory_{pat_name}")

# ── Figure 3: 2D energy surface ───────────────────────────────────────────────

_AXES_PRESETS = {
    "em,vi": (5, 4),  "vi,em": (4, 5),
    "bs,re": (0, 1),  "re,bs": (1, 0),
    "me,aj": (6, 7),  "aj,me": (7, 6),
    "bs,em": (0, 5),  "ec,co": (2, 3),
}

def plot_energy(axes: str = "em,vi", resolution: int = 50,
                output: Optional[str] = None, interactive: bool = False):
    key = axes.lower().replace(" ", "")
    if key not in _AXES_PRESETS:
        print(f"Unknown axes {axes!r}.  Choices: {list(_AXES_PRESETS)}", file=sys.stderr)
        sys.exit(1)
    dim_x, dim_y = _AXES_PRESETS[key]
    nx, ny = DIM_NAMES[dim_x], DIM_NAMES[dim_y]

    xs = np.linspace(-2, 2, resolution)
    ys = np.linspace(-2, 2, resolution)
    XX, YY = np.meshgrid(xs, ys)
    HH = np.zeros_like(XX)
    for i in range(resolution):
        for j in range(resolution):
            e = np.zeros(N8)
            e[dim_x] = XX[i, j]
            e[dim_y] = YY[i, j]
            HH[i, j] = energy(e)

    if interactive:
        go, _ = _plotly()
        fig = go.Figure(data=go.Contour(
            x=xs, y=ys, z=HH,
            colorscale="RdBu_r", contours=dict(showlabels=True),
            colorbar=dict(title="H(e)"),
        ))
        fig.update_layout(
            title=f"Energy surface — {nx} × {ny} axes",
            xaxis_title=nx, yaxis_title=ny)
        fig.show()
        return

    matplotlib, plt = _mpl()
    fig, ax = plt.subplots(figsize=(7, 6))
    ct = ax.contourf(XX, YY, HH, levels=30, cmap="RdBu_r")
    plt.colorbar(ct, ax=ax, label="$H(e)$")
    ax.contour(XX, YY, HH, levels=12, colors="black", alpha=0.3, linewidths=0.5)

    # Mark stored-pattern projections
    for name, pat in PATTERNS.items():
        ax.plot(pat[dim_x], pat[dim_y], "o", markersize=8, label=name,
                markeredgecolor="black", markeredgewidth=0.8)

    ax.set_xlabel(f"${nx}$ activation")
    ax.set_ylabel(f"${ny}$ activation")
    ax.set_title(f"Energy surface — ${nx} \\times {ny}$ plane", fontsize=11)
    ax.legend(fontsize=9)
    ax.grid(True, alpha=0.2)

    plt.tight_layout()
    _save_or_show(plt, output, f"energy_{nx}_{ny}")

# ── Figure 4: Attractor bar chart ─────────────────────────────────────────────

def plot_patterns(output: Optional[str] = None, interactive: bool = False):
    names = list(PATTERNS.keys())
    data  = np.array([PATTERNS[n] for n in names])   # (4, 8)

    if interactive:
        go, sp_mod = _plotly()
        fig = sp_mod.make_subplots(
            rows=2, cols=2,
            subplot_titles=[f"{n}  H={energy(PATTERNS[n]):.3f}" for n in names])
        positions = [(1, 1), (1, 2), (2, 1), (2, 2)]
        for idx, name in enumerate(names):
            r, c = positions[idx]
            fig.add_trace(go.Bar(
                x=DIM_NAMES, y=data[idx], name=name,
                marker_color=[DIM_COLORS[d] for d in range(N8)],
                showlegend=False), row=r, col=c)
        fig.update_layout(title="Stored Attractor Patterns")
        fig.show()
        return

    matplotlib, plt = _mpl()
    fig, axes = plt.subplots(2, 2, figsize=(10, 7), sharey=True)
    for ax, name in zip(axes.flat, names):
        vals = PATTERNS[name]
        colors = [DIM_COLORS[d] for d in range(N8)]
        ax.bar(DIM_NAMES, vals, color=colors, edgecolor="black", linewidth=0.5)
        ax.axhline(0, color="gray", linewidth=0.5)
        ax.set_title(f"{name}  [$H={energy(PATTERNS[name]):.3f}$]", fontsize=10)
        ax.set_ylim(-1.2, 1.2)
        ax.grid(True, alpha=0.3, axis="y")
    axes[1, 0].set_xlabel("Mechanism"); axes[1, 1].set_xlabel("Mechanism")
    axes[0, 0].set_ylabel("Activation"); axes[1, 0].set_ylabel("Activation")
    fig.suptitle("Stored Attractor Patterns — BRECVEMA Soma-Field", fontsize=12)
    plt.tight_layout()
    _save_or_show(plt, output, "patterns")

# ── --all: generate all figures ───────────────────────────────────────────────

def plot_all(out_dir: str = "paper/figures"):
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    print(f"[plot_field] Generating all figures → {out_dir}/")
    plot_wmatrix(output=f"{out_dir}/fig_wmatrix.pdf")
    for pat in PATTERNS:
        plot_trajectory(pat, output=f"{out_dir}/fig_trajectory_{pat}.pdf")
    plot_energy("em,vi", output=f"{out_dir}/fig_energy_EM_VI.pdf")
    plot_energy("bs,re", output=f"{out_dir}/fig_energy_BS_RE.pdf")
    plot_patterns(output=f"{out_dir}/fig_patterns.pdf")

# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description="Soma-Field visualisation")
    ap.add_argument("--trajectory",  metavar="PATTERN",
                    help=f"Activation trajectory.  Choices: {list(PATTERNS)}")
    ap.add_argument("--wmatrix",     action="store_true",
                    help="W8 coupling-constant heatmap")
    ap.add_argument("--energy",      action="store_true",
                    help="2D energy surface projection")
    ap.add_argument("--patterns",    action="store_true",
                    help="Bar chart of stored attractor patterns")
    ap.add_argument("--all",         action="store_true",
                    help="Generate all figures for the paper")
    ap.add_argument("--steps",  type=int,   default=60,
                    help="Steps for --trajectory (default 60)")
    ap.add_argument("--dt",     type=float, default=0.05,
                    help="Langevin dt (default 0.05)")
    ap.add_argument("--axes",   default="em,vi",
                    help=f"Axes for --energy.  Choices: {list(_AXES_PRESETS)}")
    ap.add_argument("--output", metavar="FILE",
                    help="Save to PDF/PNG/SVG instead of showing")
    ap.add_argument("--output-dir", metavar="DIR", default="paper/figures",
                    help="Output directory for --all (default: paper/figures)")
    ap.add_argument("--interactive", action="store_true",
                    help="Open Plotly browser version")
    args = ap.parse_args()

    if args.all:
        plot_all(args.output_dir)
    elif args.trajectory:
        plot_trajectory(args.trajectory, args.steps, args.dt,
                        args.output, args.interactive)
    elif args.wmatrix:
        plot_wmatrix(args.output, args.interactive)
    elif args.energy:
        plot_energy(args.axes, output=args.output, interactive=args.interactive)
    elif args.patterns:
        plot_patterns(args.output, args.interactive)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
