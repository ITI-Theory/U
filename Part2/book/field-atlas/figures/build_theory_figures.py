#!/usr/bin/env python3
from __future__ import annotations

import math
import re
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import yaml
from matplotlib.patches import Circle, FancyArrowPatch, FancyBboxPatch, PathPatch, Rectangle, Wedge
from matplotlib.path import Path as MplPath

HERE = Path(__file__).resolve().parent
ATLAS = HERE.parent
REPO = ATLAS.parents[2]
OUT = HERE / "theory"
OUT.mkdir(parents=True, exist_ok=True)

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 8.5,
    "axes.titlesize": 9.5,
    "axes.labelsize": 8,
    "xtick.labelsize": 7,
    "ytick.labelsize": 7,
    "legend.fontsize": 7,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
    "axes.linewidth": 0.7,
})

INK = "#151923"
BLUE = "#2467a6"
CYAN = "#2a9db0"
WARM = "#b65835"
GOLD = "#c99732"
GREEN = "#4e8c4a"
PURPLE = "#6b5aa6"
GREY = "#7d8590"
LIGHT = "#edf3f7"
PALE = "#f7f4ec"


def save(fig, name: str) -> None:
    fig.savefig(OUT / f"{name}.png", facecolor="white", dpi=300)
    plt.close(fig)
    print(f"wrote {name}.png")


def clean(ax) -> None:
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)


def arrow(ax, a, b, text=None, color=GREY, rad=0.0, size=9):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle="->", mutation_scale=size, color=color,
                                 connectionstyle=f"arc3,rad={rad}", lw=1.0))
    if text:
        x = (a[0] + b[0]) / 2
        y = (a[1] + b[1]) / 2
        ax.text(x, y, text, ha="center", va="center", fontsize=6.5, color=color,
                bbox=dict(boxstyle="round,pad=0.15", fc="white", ec="none", alpha=0.88))


def box(ax, xy, wh, text, fc=LIGHT, ec=BLUE, fontsize=7.5, color=INK):
    x, y = xy
    w, h = wh
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.06", fc=fc, ec=ec, lw=0.9))
    ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fontsize, color=color, wrap=True)


# T1

def fig_T1_1():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    x = np.linspace(-4, 4, 600)
    for t, c, a in [(-1.0, BLUE, 0.35), (0.2, CYAN, 0.55), (1.4, WARM, 0.85)]:
        y = np.exp(-(x - t) ** 2 / 0.55) * np.sin(5 * (x - t))
        ax.plot(x, y + a, color=c, lw=1.5)
        ax.arrow(t - 0.7, a + 0.55, 0.55, 0, head_width=0.06, head_length=0.12, color=c, length_includes_head=True)
    ax.axhline(0, color="#bbbbbb", lw=0.6)
    ax.set_title("wave packet: pattern moves")
    ax.set_xlabel("position")
    ax.set_yticks([])
    clean(ax); save(fig, "T1_1_wave_packet")


def fig_T1_2():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    x = np.linspace(-4, 4, 600)
    a = np.exp(-(x + 1.2) ** 2 / 0.8)
    b = -0.75 * np.exp(-(x - 0.8) ** 2 / 0.5)
    ax.plot(x, a, color=BLUE, label="pulse A")
    ax.plot(x, b, color=WARM, label="pulse B")
    ax.plot(x, a + b, color=INK, lw=2, label="A+B")
    ax.axhline(0, color="#bbbbbb", lw=0.6)
    ax.legend(frameon=False, loc="upper right")
    ax.set_title("linear superposition")
    ax.set_xlabel("position")
    clean(ax); save(fig, "T1_2_superposition")


def fig_T1_3():
    fig, ax = plt.subplots(figsize=(3.5, 2.7))
    x = np.linspace(0, 1, 500)
    for n in range(1, 5):
        ax.plot(x, 0.32 * np.sin(n * np.pi * x) + n, color=[BLUE, CYAN, GOLD, WARM][n - 1], lw=1.6)
        ax.text(1.03, n, f"n={n}", va="center", fontsize=7)
    ax.scatter([0, 1], [0.7, 0.7], marker="|", color=INK)
    ax.set_xlim(-0.02, 1.16)
    ax.set_ylim(0.45, 4.45)
    ax.set_yticks([])
    ax.set_title("fixed string modes")
    ax.set_xlabel("x/L")
    clean(ax); save(fig, "T1_3_string_modes")


def fig_T1_4():
    fig, axs = plt.subplots(1, 3, figsize=(5.2, 1.9))
    x = np.linspace(0, 1, 80)
    y = np.linspace(0, 1, 80)
    X, Y = np.meshgrid(x, y)
    modes = [(1, 1), (2, 1), (2, 2)]
    for ax, (m, n) in zip(axs, modes):
        Z = np.sin(m * np.pi * X) * np.sin(n * np.pi * Y)
        ax.imshow(Z, origin="lower", extent=(0, 1, 0, 1), cmap="RdBu_r", vmin=-1, vmax=1)
        ax.set_title(f"({m},{n})")
        ax.set_xticks([]); ax.set_yticks([])
    fig.suptitle("rectangular membrane modes", y=1.03)
    save(fig, "T1_4_membrane_modes")


def fig_T1_5():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    x = np.linspace(0, 1, 500)
    curves = [
        (np.sin(np.pi * x), "fixed-fixed", BLUE),
        (np.sin(0.5 * np.pi * x), "fixed-free", CYAN),
        (np.cos(np.pi * (x - 0.5)), "free-free", GOLD),
        (np.exp(-2.5 * x) * np.sin(3 * np.pi * x), "absorbing", WARM),
    ]
    for y, label, color in curves:
        ax.plot(x, y, label=label, color=color, lw=1.35)
    ax.legend(frameon=False, ncol=2, loc="upper center", bbox_to_anchor=(0.5, 1.18))
    ax.set_title("boundary choices change modes")
    ax.set_xlabel("domain coordinate")
    ax.set_yticks([])
    clean(ax); save(fig, "T1_5_boundary_conditions")


def fig_T1_6():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    k = np.linspace(0.05, 5, 400)
    ax.plot(k, k, color=BLUE, label=r"non-dispersive $\omega=ck$")
    ax.plot(k, np.sqrt(k), color=WARM, label=r"water-wave $\omega\propto\sqrt{k}$")
    ax.plot(k, np.sqrt(k * k + 1.2), color=GREEN, label="massive field")
    ax.set_xlabel("wavenumber k")
    ax.set_ylabel("frequency ω")
    ax.legend(frameon=False)
    ax.set_title("dispersion relations")
    clean(ax); save(fig, "T1_6_dispersion")


# T2

def fig_T2_1():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    t = np.linspace(-1.5, 10, 800)
    y = np.where(t >= 0, np.exp(-0.28 * t) * np.sin(2.4 * t) / 2.4, 0)
    ax.plot(t, y, color=BLUE, lw=1.8)
    ax.axvline(0, color=WARM, ls="--", lw=1)
    ax.text(0.15, max(y) * 0.9, "impulse", color=WARM, fontsize=7)
    ax.set_title("damped oscillator Green function")
    ax.set_xlabel("time")
    clean(ax); save(fig, "T2_1_sho_impulse")


def fig_T2_2():
    fig, ax = plt.subplots(figsize=(3.5, 2.6))
    ax.set_aspect("equal")
    ax.scatter([0], [0], color=WARM, s=35, zorder=4)
    ax.text(0.1, -0.18, "source", color=WARM, fontsize=7)
    ax.plot([-2, 2], [2, 2], alpha=0)
    ax.fill_between([-2, 2], [2, 2], [0, 0], color=LIGHT)
    ax.plot([0, -2], [0, 2], color=BLUE, lw=1.5)
    ax.plot([0, 2], [0, 2], color=BLUE, lw=1.5)
    ax.text(0, 1.4, "retarded support", ha="center", fontsize=8)
    ax.set_xlim(-2.2, 2.2); ax.set_ylim(-0.6, 2.2)
    ax.set_xlabel("space")
    ax.set_ylabel("time")
    ax.set_title("future response only")
    clean(ax); save(fig, "T2_2_retarded_green")


def fig_T2_3():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    w = np.linspace(0.05, 2.4, 600)
    for gamma, color in [(0.08, BLUE), (0.18, CYAN), (0.45, WARM)]:
        amp = 1 / np.sqrt((1 - w * w) ** 2 + (2 * gamma * w) ** 2)
        ax.plot(w, amp / amp.max(), color=color, label=f"Q={1/(2*gamma):.1f}")
    ax.set_xlabel("drive frequency / natural frequency")
    ax.set_ylabel("normalised amplitude")
    ax.legend(frameon=False)
    ax.set_title("resonance narrows as Q rises")
    clean(ax); save(fig, "T2_3_resonance_q")


def fig_T2_4():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    ax.axhline(0, color="#bbbbbb", lw=0.7)
    ax.axvline(0, color="#bbbbbb", lw=0.7)
    gammas = [0.12, 0.35, 0.75]
    for gamma, color in zip(gammas, [BLUE, CYAN, WARM]):
        real = math.sqrt(max(0, 1 - gamma * gamma))
        ax.scatter([real, -real], [-gamma, -gamma], marker="x", s=70, color=color, label=f"γ={gamma}")
    ax.add_patch(Rectangle((-1.45, 0), 2.9, 0.55, fc="#ffe8e0", ec="none", zorder=-1))
    ax.text(0, 0.28, "unstable half-plane", ha="center", fontsize=7, color=WARM)
    ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.0, 0.55)
    ax.set_xlabel("Re ω")
    ax.set_ylabel("Im ω")
    ax.legend(frameon=False, loc="lower right")
    ax.set_title("damped poles")
    clean(ax); save(fig, "T2_4_poles_damping")


def fig_T2_5():
    fig, ax = plt.subplots(figsize=(3.6, 2.5))
    x = np.linspace(-4, 4, 180)
    t = np.linspace(0.05, 5, 140)
    X, T = np.meshgrid(x, t)
    D = 0.45
    G = (4 * np.pi * D * T) ** -0.5 * np.exp(-X * X / (4 * D * T))
    im = ax.imshow(G, origin="lower", extent=(x.min(), x.max(), t.min(), t.max()), aspect="auto", cmap="YlGnBu")
    ax.set_xlabel("position")
    ax.set_ylabel("time")
    ax.set_title("position-space kernel")
    fig.colorbar(im, ax=ax, fraction=0.046)
    save(fig, "T2_5_space_time_propagator")


def fig_T2_6():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    k = np.linspace(-4, 4, 600)
    for m, color in [(0.4, BLUE), (1.0, CYAN), (2.0, WARM)]:
        ax.plot(k, 1 / (k * k + m * m), color=color, label=f"m={m}")
    ax.set_ylim(0, 6.5)
    ax.set_xlabel("k")
    ax.set_ylabel(r"$1/(k^2+m^2)$")
    ax.legend(frameon=False)
    ax.set_title("momentum-space propagator")
    clean(ax); save(fig, "T2_6_k_space_propagator")


def fig_T2_7():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    r = np.linspace(0.08, 8, 600)
    ax.semilogy(r, 1 / r, color=BLUE, label="Coulomb 1/r")
    for m, c in [(0.4, CYAN), (0.9, WARM)]:
        ax.semilogy(r, np.exp(-m * r) / r, color=c, label=f"Yukawa m={m}")
    ax.set_xlabel("distance r")
    ax.set_ylabel("relative potential")
    ax.legend(frameon=False)
    ax.set_title("screening by mass")
    clean(ax); save(fig, "T2_7_yukawa_coulomb")


def fig_T2_8():
    fig, ax = plt.subplots(figsize=(5.2, 2.2)); ax.axis("off")
    items = [(0.05, "source\nJ"), (1.35, "kernel\nG"), (2.65, "boundary\nB"), (3.95, "projection\nO"), (5.25, "data\ny")]
    for x, label in items:
        box(ax, (x, 0.65), (0.85, 0.62), label, fc=LIGHT, ec=BLUE)
    for (x, _), (x2, _) in zip(items, items[1:]):
        arrow(ax, (x + 0.86, 0.96), (x2 - 0.06, 0.96), color=WARM)
    ax.text(2.9, 0.28, r"$y=O[G_B * J]+\epsilon$", ha="center", fontsize=10, color=INK)
    ax.set_xlim(-0.05, 6.25); ax.set_ylim(0.1, 1.55)
    ax.set_title("response by convolution")
    save(fig, "T2_8_convolution")


# T3

def load_levels():
    atlas = yaml.safe_load((ATLAS / "atlas.yaml").read_text(encoding="utf-8"))
    order = [level for sector in atlas["sectors"] for level in sector["levels"]]
    rows = []
    for lid in order:
        data = yaml.safe_load((REPO / "registry" / "levels" / f"{lid}.yaml").read_text(encoding="utf-8"))
        scale_text = str(data.get("length_scale", ""))
        nums = [float(n) for n in re.findall(r"10\^(-?\d+)", scale_text)]
        scale = sum(nums) / len(nums) if nums else float("nan")
        rt_text = str(data.get("response_time", ""))
        rt_nums = [float(n) for n in re.findall(r"10\^(-?\d+)", rt_text)]
        rt = sum(rt_nums) / len(rt_nums) if rt_nums else float("nan")
        rows.append((lid, data.get("label", lid), scale, rt))
    return rows


def fig_T3_1():
    rows = load_levels()
    fig, ax = plt.subplots(figsize=(4.7, 6.2))
    y = np.arange(len(rows))
    scales = [r[2] for r in rows]
    ax.scatter(scales, y, c=y, cmap="viridis", s=24)
    ax.set_yticks(y)
    ax.set_yticklabels([r[1] for r in rows], fontsize=5.8)
    ax.invert_yaxis()
    ax.set_xlabel("log10 length scale (m)")
    ax.set_title("31-level zoom ladder")
    clean(ax); save(fig, "T3_1_zoom_ladder")


def fig_T3_2():
    rows = load_levels()
    fig, ax = plt.subplots(figsize=(4.7, 6.2))
    y = np.arange(len(rows))
    times = [r[3] for r in rows]
    ax.scatter(times, y, c=y, cmap="plasma", s=24)
    ax.set_yticks(y)
    ax.set_yticklabels([r[1] for r in rows], fontsize=5.8)
    ax.invert_yaxis()
    ax.set_xlabel("log10 response time (s)")
    ax.set_title("response-time ladder")
    clean(ax); save(fig, "T3_2_response_times")


def fig_T3_3():
    fig, ax = plt.subplots(figsize=(5.2, 2.45)); ax.axis("off")
    box(ax, (0.05, 0.75), (1.0, 0.55), "micro\nvariables", fc=PALE, ec=GOLD)
    box(ax, (1.55, 0.75), (1.0, 0.55), "block\naverage", fc=LIGHT, ec=BLUE)
    box(ax, (3.05, 1.12), (1.05, 0.45), "preserve\ninvariants", fc="#e9f6ea", ec=GREEN)
    box(ax, (3.05, 0.48), (1.05, 0.45), "retype\nobservables", fc="#eef2fb", ec=PURPLE)
    box(ax, (4.6, 0.75), (1.0, 0.55), "effective\nlevel", fc=LIGHT, ec=BLUE)
    arrow(ax, (1.06, 1.02), (1.49, 1.02), color=WARM)
    arrow(ax, (2.56, 1.02), (3.0, 1.33), color=WARM)
    arrow(ax, (2.56, 1.02), (3.0, 0.70), color=WARM)
    arrow(ax, (4.12, 1.33), (4.55, 1.02), color=WARM)
    arrow(ax, (4.12, 0.70), (4.55, 1.02), color=WARM)
    ax.set_xlim(0, 5.75); ax.set_ylim(0.2, 1.8)
    ax.set_title("coarse-graining is selective")
    save(fig, "T3_3_coarse_graining")


def fig_T3_4():
    fig, ax = plt.subplots(figsize=(5.2, 2.5)); ax.axis("off")
    nodes = [(0.3, 1.25, "molecular"), (1.8, 1.25, "cell"), (3.3, 1.25, "circuit"), (4.8, 1.25, "brain")]
    for x, y, label in nodes:
        box(ax, (x, y), (0.9, 0.45), label, fc=LIGHT, ec=BLUE, fontsize=7)
    labels = ["substrate\nchange", "aggregation", "projection"]
    for i in range(3):
        arrow(ax, (nodes[i][0] + 0.92, 1.48), (nodes[i+1][0] - 0.06, 1.48), labels[i], WARM)
    box(ax, (1.0, 0.35), (1.05, 0.45), "edge file", fc=PALE, ec=GOLD)
    box(ax, (2.6, 0.35), (1.05, 0.45), "kernel\nbadge", fc=PALE, ec=GOLD)
    arrow(ax, (1.52, 0.82), (2.15, 1.2), color=GREY)
    arrow(ax, (3.12, 0.82), (3.65, 1.2), color=GREY)
    ax.set_xlim(0, 6.0); ax.set_ylim(0.1, 2.05)
    ax.set_title("path edges specify operations")
    save(fig, "T3_4_path_edges")


def fig_T3_5():
    fig, ax = plt.subplots(figsize=(4.4, 2.6)); ax.axis("off")
    labels = [("preserved", GREEN), ("retyped", BLUE), ("discarded", WARM)]
    for i, (label, color) in enumerate(labels):
        ax.add_patch(Wedge((1.15, 1.15), 1.0, i * 120, (i + 1) * 120, fc=color, alpha=0.75, ec="white"))
        angle = math.radians(i * 120 + 60)
        ax.text(1.15 + 0.58 * math.cos(angle), 1.15 + 0.58 * math.sin(angle), label,
                ha="center", va="center", color="white", fontsize=8, weight="bold")
    box(ax, (2.7, 1.45), (1.25, 0.45), "claim label\nrecomputed", fc=LIGHT, ec=PURPLE)
    box(ax, (2.7, 0.6), (1.25, 0.45), "new\nobservable", fc=LIGHT, ec=BLUE)
    arrow(ax, (2.1, 1.15), (2.65, 1.65), color=GREY)
    arrow(ax, (2.1, 1.15), (2.65, 0.82), color=GREY)
    ax.set_xlim(0, 4.25); ax.set_ylim(0, 2.35)
    ax.set_title("zoom separates categories")
    save(fig, "T3_5_preserve_retype")


# T4

def fig_T4_1():
    fig, ax = plt.subplots(figsize=(5.2, 1.9)); ax.axis("off")
    parts = [("M4\nspacetime", 4, BLUE), ("P3\nspatial", 3, CYAN), ("L1\nline", 1, GOLD), ("C3\ncompact", 3, WARM)]
    x = 0
    for label, n, color in parts:
        ax.add_patch(Rectangle((x, 0.45), n, 0.62, fc=color, ec="white"))
        ax.text(x + n / 2, 0.76, label, ha="center", va="center", color="white", fontsize=8)
        x += n
    ax.text(5.5, 0.18, "4 + 3 + 1 + 3 = 11", ha="center", fontsize=9)
    ax.set_xlim(0, 11); ax.set_ylim(0, 1.35)
    ax.set_title("dimensional bookkeeping")
    save(fig, "T4_1_dimension_blocks")


def fig_T4_2():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    n = np.arange(0, 7)
    Rvals = [1.0, 1.8]
    for R, color in zip(Rvals, [BLUE, WARM]):
        ax.scatter(n, n / R, color=color, label=f"R={R}")
        ax.plot(n, n / R, color=color, alpha=0.6)
    ax.set_xlabel("circle momentum number |n|")
    ax.set_ylabel("mass n/R")
    ax.legend(frameon=False)
    ax.set_title("Kaluza-Klein mass tower")
    clean(ax); save(fig, "T4_2_kk_tower")


def fig_T4_3():
    fig, ax = plt.subplots(figsize=(5.2, 2.1)); ax.axis("off")
    theta = np.linspace(0, 2 * np.pi, 300)
    ax.plot(0.8 + 0.45 * np.cos(theta), 1.0 + 0.45 * np.sin(theta), color=BLUE, lw=1.7)
    ax.text(0.8, 0.25, "circle S¹", ha="center", fontsize=8)
    # torus as projected donut
    ax.add_patch(Circle((2.55, 1.0), 0.62, fc="#dbeaf2", ec=BLUE, lw=1.2))
    ax.add_patch(Circle((2.55, 1.0), 0.28, fc="white", ec=BLUE, lw=1.0))
    ax.add_patch(FancyArrowPatch((2.1, 1.0), (3.0, 1.0), arrowstyle="<->", color=WARM, mutation_scale=8))
    ax.add_patch(FancyArrowPatch((2.55, 0.38), (2.55, 1.62), arrowstyle="<->", color=GREEN, mutation_scale=8))
    ax.text(2.55, 0.25, "2-torus cycles", ha="center", fontsize=8)
    verts = [(4.1, 1.0), (4.25, 1.65), (4.85, 1.45), (5.05, 0.9), (4.7, 0.4), (4.0, 0.5), (4.1, 1.0)]
    codes = [MplPath.MOVETO] + [MplPath.CURVE3] * (len(verts) - 2) + [MplPath.CLOSEPOLY]
    ax.add_patch(PathPatch(MplPath(verts, codes), fc=PALE, ec=PURPLE, lw=1.3))
    ax.text(4.55, 0.98, "CY / G₂\nschematic", ha="center", va="center", fontsize=8)
    ax.set_xlim(0, 5.45); ax.set_ylim(0.05, 1.9)
    ax.set_title("compact spaces (not to scale)")
    save(fig, "T4_3_circle_torus")


def fig_T4_4():
    fig, ax = plt.subplots(figsize=(5.4, 3.4)); ax.axis("off"); ax.set_aspect("equal")
    pos = {
        "M-theory": (0, 0), "IIA": (-1.75, 0.75), "IIB": (1.75, 0.75),
        "Type I": (1.65, -0.85), "HO": (0.1, -1.55), "HE": (-1.65, -0.85), "11D SUGRA": (0, 1.7)
    }
    for name, p in pos.items():
        fc = GOLD if name == "M-theory" else LIGHT
        ec = WARM if name == "M-theory" else BLUE
        box(ax, (p[0] - 0.45, p[1] - 0.2), (0.9, 0.4), name, fc=fc, ec=ec, fontsize=7.2)
    arrow(ax, (-1.3, 0.75), (1.3, 0.75), "T", BLUE, rad=0.12, size=8)
    arrow(ax, (1.75, 0.55), (1.65, -0.63), "orientifold", GREY, size=8)
    arrow(ax, (1.2, -0.85), (0.55, -1.42), "S", WARM, size=8)
    arrow(ax, (-1.2, -0.85), (-0.35, -1.42), "S", WARM, size=8)
    arrow(ax, (-1.3, -0.7), (-1.4, 0.55), "circle", GREY, size=8)
    arrow(ax, (-0.3, 0.0), (-1.3, 0.62), "strong\nIIA", PURPLE, size=8)
    arrow(ax, (-0.22, 0.0), (-1.28, -0.7), "interval", PURPLE, size=8)
    arrow(ax, (0, 0.22), (0, 1.48), "low energy", GREEN, size=8)
    ax.set_xlim(-2.35, 2.35); ax.set_ylim(-1.95, 2.05)
    ax.set_title("M-theory duality web")
    save(fig, "T4_4_duality_web")


def fig_T4_5():
    fig, ax = plt.subplots(figsize=(3.6, 2.8)); ax.axis("off"); ax.set_aspect("equal")
    theta = np.linspace(0, 2*np.pi, 300)
    ax.plot(np.cos(theta), 0.55*np.sin(theta), color=BLUE, lw=1.5)
    pts = [(1,0), (0,0.55), (-1,0), (0,-0.55), (1,0)]
    for a, b in zip(pts, pts[1:]):
        arrow(ax, a, b, color=WARM, size=8)
    for p, ang in [((1,0), 15), ((0,0.55), 45), ((-1,0), 95), ((0,-0.55), 145)]:
        ax.plot([p[0], p[0] + 0.35*np.cos(np.deg2rad(ang))], [p[1], p[1] + 0.35*np.sin(np.deg2rad(ang))], color=INK, lw=1.4)
    ax.text(0, 0, "loop\ntransport", ha="center", va="center", fontsize=8)
    ax.text(0, -1.0, "special holonomy restricts returned rotations", ha="center", fontsize=7.5)
    ax.set_xlim(-1.45, 1.45); ax.set_ylim(-1.25, 1.05)
    ax.set_title("holonomy by parallel transport")
    save(fig, "T4_5_holonomy_transport")


def fig_T4_6():
    fig, ax = plt.subplots(figsize=(3.5, 3.0)); ax.axis("off"); ax.set_aspect("equal")
    angles = np.deg2rad([90, 210, 330])
    outer = [(np.cos(a), np.sin(a)) for a in angles]
    inner = [(0, 0.5), (-0.43, -0.25), (0.43, -0.25)]
    pts = outer + inner + [(0, 0)]
    labels = ["e1", "e2", "e3", "e4", "e5", "e6", "e7"]
    # Fano lines
    lines = [(0,1,2), (0,3,6), (1,4,6), (2,5,6), (0,4,5), (1,3,5), (2,3,4)]
    for line in lines[:6]:
        xs = [pts[i][0] for i in line] + [pts[line[0]][0]]
        ys = [pts[i][1] for i in line] + [pts[line[0]][1]]
        ax.plot(xs, ys, color=GREY, lw=0.9, alpha=0.75)
    ax.add_patch(Circle((0,0), 0.5, fill=False, ec=GREY, lw=0.9))
    for p, lab in zip(pts, labels):
        ax.add_patch(Circle(p, 0.09, fc=LIGHT, ec=BLUE))
        ax.text(p[0], p[1], lab, ha="center", va="center", fontsize=7)
    ax.set_xlim(-1.25, 1.25); ax.set_ylim(-1.1, 1.25)
    ax.set_title("octonion Fano plane")
    save(fig, "T4_6_fano_plane")


def fig_T4_7():
    fig, ax = plt.subplots(figsize=(5.4, 2.5)); ax.axis("off")
    texts = ["physical compactification\ngeometry → spectrum", "sector budget\n7/11 and 3/11", "gauge fold\n8 modes → contrasts"]
    colors = [BLUE, CYAN, WARM]
    for i, (txt, color) in enumerate(zip(texts, colors)):
        box(ax, (0.2 + i*1.75, 0.8), (1.25, 0.68), txt, fc=color, ec=color, color="white", fontsize=7)
    arrow(ax, (1.47, 1.14), (1.92, 1.14), "analogy", GREY, size=8)
    arrow(ax, (3.22, 1.14), (3.67, 1.14), "analogy", GREY, size=8)
    ax.text(2.72, 0.35, "kept separate unless a dictionary is supplied", ha="center", fontsize=8)
    ax.set_xlim(0, 5.6); ax.set_ylim(0.15, 1.75)
    ax.set_title("three readings of compactification language")
    save(fig, "T4_7_compactification_three_readings")


def fig_T4_8():
    fig, ax = plt.subplots(figsize=(5.2, 2.65)); ax.axis("off")
    box(ax, (0.1, 1.02), (1.0, 0.55), "W8ℝ\n8×8", fc=LIGHT, ec=BLUE)
    box(ax, (1.8, 1.32), (1.2, 0.45), "(6/5) I8\nisotropic", fc=PALE, ec=GOLD)
    box(ax, (1.8, 0.65), (1.2, 0.45), "δW\ntraceless", fc="#eef2fb", ec=PURPLE)
    arrow(ax, (1.12, 1.3), (1.75, 1.55), color=WARM)
    arrow(ax, (1.12, 1.3), (1.75, 0.88), color=WARM)
    xs = np.linspace(3.55, 4.85, 7)
    for i, x in enumerate(xs, start=1):
        ax.add_patch(Circle((x, 0.9 + 0.22*np.sin(i)), 0.065, fc=CYAN, ec=BLUE))
    ax.text(4.2, 1.45, "seven contrast\ndirections", ha="center", fontsize=8)
    ax.text(3.6, 0.35, r"$\|\delta W\|_F / \|W_8\|_F = 0.484$", fontsize=9)
    arrow(ax, (3.05, 0.88), (3.5, 0.92), color=GREY)
    ax.set_xlim(0, 5.1); ax.set_ylim(0.15, 1.95)
    ax.set_title("P24 matrix fold")
    save(fig, "T4_8_gauge_fold")


# T5

def fig_T5_1():
    fig, ax = plt.subplots(figsize=(4.1, 2.6))
    cats = ["Λ", "cold DM", "baryon"]
    planck = np.array([0.6847, 0.2645, 0.0493])
    err = np.array([0.0073, 0.0040, 0.0006])
    model = np.array([7/11, 3/11, 1 - 7/11 - 3/11])
    x = np.arange(len(cats))
    ax.bar(x - 0.18, planck, 0.36, yerr=err, color=WARM, label="Planck 2018", capsize=2)
    ax.bar(x + 0.18, model, 0.36, color=BLUE, label="programme fractions")
    ax.set_xticks(x); ax.set_xticklabels(cats)
    ax.set_ylim(0, 0.78)
    ax.set_ylabel("density fraction")
    ax.legend(frameon=False)
    ax.set_title("dark-sector budget")
    clean(ax); save(fig, "T5_1_friedmann_budget")


def fig_T5_2():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    vals = [7/11, 0.6847]
    ax.bar([0, 1], vals, color=[BLUE, WARM])
    ax.errorbar([1], [0.6847], yerr=[0.0073], color=INK, capsize=3, fmt="none")
    ax.set_xticks([0, 1]); ax.set_xticklabels(["7/11", "Planck Λ"])
    ax.set_ylim(0.58, 0.71)
    ax.text(0.5, 0.603, "7.1% low", ha="center", fontsize=8)
    ax.set_ylabel("ΩΛ")
    ax.set_title("Λ comparison")
    clean(ax); save(fig, "T5_2_lambda_comparison")


def fig_T5_3():
    fig, ax = plt.subplots(figsize=(3.5, 2.35))
    vals = [3/11, 0.2645]
    ax.bar([0, 1], vals, color=[BLUE, WARM])
    ax.errorbar([1], [0.2645], yerr=[0.0040], color=INK, capsize=3, fmt="none")
    ax.set_xticks([0, 1]); ax.set_xticklabels(["3/11", "Planck DM"])
    ax.set_ylim(0.245, 0.285)
    ax.text(0.5, 0.248, "3.1% high", ha="center", fontsize=8)
    ax.set_ylabel("ΩDM")
    ax.set_title("dark-matter comparison")
    clean(ax); save(fig, "T5_3_dark_matter_comparison")


def fig_T5_4():
    fig, ax = plt.subplots(figsize=(5.2, 2.35)); ax.axis("off")
    box(ax, (0.1, 0.82), (1.2, 0.55), "standard\nlocal GR", fc=LIGHT, ec=BLUE)
    box(ax, (1.85, 0.82), (1.2, 0.55), "LocalGR\ngate", fc=PALE, ec=GOLD)
    box(ax, (3.6, 1.18), (1.2, 0.45), "Λ = 7/11\nsector", fc="#eef2fb", ec=PURPLE)
    box(ax, (3.6, 0.45), (1.2, 0.45), "DM = 3/11\nsector", fc="#eef2fb", ec=PURPLE)
    arrow(ax, (1.32, 1.1), (1.8, 1.1), color=WARM)
    arrow(ax, (3.07, 1.1), (3.55, 1.4), color=WARM)
    arrow(ax, (3.07, 1.1), (3.55, 0.68), color=WARM)
    ax.text(2.45, 0.25, "local tests preserved; global interpretation changes", ha="center", fontsize=8)
    ax.set_xlim(0, 5.0); ax.set_ylim(0.12, 1.85)
    ax.set_title("LocalGR gate")
    save(fig, "T5_4_local_gr_gate")


def fig_T5_5():
    fig, ax = plt.subplots(figsize=(5.3, 2.75)); ax.axis("off")
    nodes = [(0.1, 1.25, "fraction\narithmetic"), (1.45, 1.25, "H(z)\nfit"), (2.8, 1.25, "growth +\nlensing"), (4.15, 1.25, "particle\nsearch")]
    for x, y, txt in nodes:
        box(ax, (x, y), (0.95, 0.55), txt, fc=LIGHT, ec=BLUE, fontsize=7)
    for i in range(len(nodes)-1):
        arrow(ax, (nodes[i][0]+0.97, 1.52), (nodes[i+1][0]-0.05, 1.52), color=WARM)
    box(ax, (1.75, 0.35), (1.7, 0.48), "any failed gate\nweakens or refutes claim", fc="#ffe8e0", ec=WARM, fontsize=8)
    for x, _, _ in nodes:
        arrow(ax, (x+0.47, 1.22), (2.6, 0.85), color=GREY, size=7)
    ax.set_xlim(0, 5.3); ax.set_ylim(0.15, 2.05)
    ax.set_title("dark-sector falsification paths")
    save(fig, "T5_5_falsification_flow")


# T6

def fig_T6_1():
    fig, ax = plt.subplots(figsize=(5.4, 2.35)); ax.axis("off")
    items = [(0.1, "source\nJ"), (1.2, "operator\nL"), (2.3, "boundary\nB"), (3.4, "kernel\nG_B"), (4.5, "projection\nO"), (5.6, "data\ny")]
    for x, label in items:
        box(ax, (x, 0.9), (0.72, 0.52), label, fc=LIGHT, ec=BLUE, fontsize=7)
    for (x, _), (x2, _) in zip(items, items[1:]):
        arrow(ax, (x+0.74, 1.16), (x2-0.05, 1.16), color=WARM, size=8)
    ax.text(2.95, 0.35, r"$y=O\left[\int G_B(x,x')J(x')dx'\right]+\epsilon$", ha="center", fontsize=10)
    ax.set_xlim(0, 6.45); ax.set_ylim(0.15, 1.65)
    ax.set_title("response grammar")
    save(fig, "T6_1_response_grammar")


def fig_T6_2():
    fig, ax = plt.subplots(figsize=(5.6, 2.85)); ax.axis("off")
    cols = ["level", "source", "kernel", "boundary", "projection"]
    rows = ["string", "neural", "flock", "cosmos"]
    data = [["pluck", "wave", "endpoints", "sound"], ["current", "network", "tissue", "spectrum"], ["cue", "alignment", "sensing", "velocity"], ["density", "GR", "metric", "CMB"]]
    x0, y0 = 0.05, 0.25
    cw = [0.8, 0.95, 0.95, 0.95, 0.95]
    for j, col in enumerate(cols):
        x = x0 + sum(cw[:j])
        ax.add_patch(Rectangle((x, y0+1.95), cw[j], 0.38, fc=BLUE, ec="white"))
        ax.text(x+cw[j]/2, y0+2.14, col, ha="center", va="center", color="white", fontsize=7)
    for i, row in enumerate(rows):
        y = y0 + 1.95 - (i+1)*0.38
        vals = [row] + data[i]
        for j, val in enumerate(vals):
            x = x0 + sum(cw[:j])
            ax.add_patch(Rectangle((x, y), cw[j], 0.38, fc=LIGHT if i % 2 == 0 else "white", ec="white"))
            ax.text(x+cw[j]/2, y+0.19, val, ha="center", va="center", fontsize=6.7)
    ax.set_xlim(0, 4.8); ax.set_ylim(0.1, 2.75)
    ax.set_title("same slots, different objects")
    save(fig, "T6_2_cross_level_table")


def fig_T6_3():
    fig, ax = plt.subplots(figsize=(4.5, 2.5))
    labels = ["identity", "derivation", "simulation", "interpretation", "analogy"]
    vals = [1.0, 0.82, 0.62, 0.38, 0.22]
    colors = [GREEN, BLUE, CYAN, GOLD, WARM]
    ax.barh(np.arange(len(labels)), vals, color=colors)
    ax.set_yticks(np.arange(len(labels))); ax.set_yticklabels(labels)
    ax.set_xlim(0, 1.05)
    ax.set_xlabel("strength of relation when evidence is supplied")
    ax.set_title("do not slide between relation types")
    clean(ax); save(fig, "T6_3_identity_vs_analogy")


def fig_T6_4():
    fig, ax = plt.subplots(figsize=(4.6, 3.3)); ax.axis("off"); ax.set_aspect("equal")
    center = (0, 0)
    ax.add_patch(Circle(center, 0.28, fc=GOLD, ec=WARM))
    ax.text(0, 0, "response\ngrammar", ha="center", va="center", fontsize=7)
    labs = ["waves", "Green", "zoom", "11D", "dark", "synthesis"]
    for j, lab in enumerate(labs):
        a = 2*np.pi*j/len(labs) + np.pi/7
        p = (1.45*np.cos(a), 1.05*np.sin(a))
        ax.add_patch(Circle(p, 0.24, fc=LIGHT, ec=BLUE))
        ax.text(p[0], p[1], lab, ha="center", va="center", fontsize=7)
        arrow(ax, (0.28*np.cos(a), 0.28*np.sin(a)), (p[0]-0.25*np.cos(a), p[1]-0.25*np.sin(a)), color=GREY, size=7)
    ax.set_xlim(-1.95, 1.95); ax.set_ylim(-1.55, 1.55)
    ax.set_title("Part I synthesis map")
    save(fig, "T6_4_synthesis_map")


FIGURES = [
    fig_T1_1, fig_T1_2, fig_T1_3, fig_T1_4, fig_T1_5, fig_T1_6,
    fig_T2_1, fig_T2_2, fig_T2_3, fig_T2_4, fig_T2_5, fig_T2_6, fig_T2_7, fig_T2_8,
    fig_T3_1, fig_T3_2, fig_T3_3, fig_T3_4, fig_T3_5,
    fig_T4_1, fig_T4_2, fig_T4_3, fig_T4_4, fig_T4_5, fig_T4_6, fig_T4_7, fig_T4_8,
    fig_T5_1, fig_T5_2, fig_T5_3, fig_T5_4, fig_T5_5,
    fig_T6_1, fig_T6_2, fig_T6_3, fig_T6_4,
]


def main() -> None:
    for old in OUT.glob("T*.png"):
        old.unlink()
    for fn in FIGURES:
        fn()
    print(f"generated {len(FIGURES)} theory figures in {OUT}")


if __name__ == "__main__":
    main()