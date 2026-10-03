#!/usr/bin/env python3
"""Generate textbook-only PNG figures. This script writes images only."""
from __future__ import annotations

from pathlib import Path
import math

import matplotlib.pyplot as plt
import numpy as np

OUT = Path(__file__).resolve().parent / "generated"
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({"figure.dpi": 150, "savefig.dpi": 180, "font.size": 10})


def save(name: str) -> None:
    plt.tight_layout()
    plt.savefig(OUT / name, bbox_inches="tight")
    plt.close()


x = np.linspace(-2, 2, 400)
plt.figure(figsize=(7, 3.4))
for scale, label in [(1.0, "level n"), (0.45, "zoomed response"), (1.8, "coarse view")]:
    plt.plot(x, np.exp(-x*x/(scale*scale))*np.cos(8*x/scale), label=label)
plt.axhline(0, color="0.6", lw=.8)
plt.xlabel("coordinate")
plt.ylabel("field amplitude")
plt.title("Zoom changes resolution while preserving response questions")
plt.legend()
save("ch01-zoom-response.png")

omega = np.linspace(0.1, 8, 400)
for zeta in [0.1, 0.25, 0.7]:
    amp = 1 / np.sqrt((16 - omega**2)**2 + (2*zeta*4*omega)**2)
    plt.plot(omega, amp / amp.max(), label=f"zeta={zeta}")
plt.xlabel("drive angular frequency (rad/s)")
plt.ylabel("relative amplitude")
plt.title("Damping widens and lowers resonance")
plt.legend()
save("ch02-resonance.png")

r = np.linspace(0.02, 1.5, 400)
psi = np.exp(-r/0.529)
plt.figure(figsize=(6, 3.4))
plt.plot(r, psi/psi.max(), label="1s radial envelope")
plt.plot(r, r*r*psi*psi/np.max(r*r*psi*psi), label="radial probability")
plt.xlabel("radius (Angstrom)")
plt.ylabel("scaled value")
plt.title("Hydrogen gives a calculable atomic scale")
plt.legend()
save("ch03-hydrogen.png")

x = np.linspace(0, 5, 400)
for t in [0, 5, 10, 20]:
    v = np.exp(-x/1.581) * np.exp(-t/10)
    plt.plot(x, v, label=f"t={t} ms")
plt.xlabel("distance along membrane (mm)")
plt.ylabel("scaled voltage")
plt.title("Passive cable attenuation")
plt.legend()
save("ch04-cable.png")

e = np.linspace(-2.2, 2.2, 500)
H = (e*e - 1)**2 + 0.15*e
plt.figure(figsize=(6, 3.4))
plt.plot(e, H)
plt.xlabel("affect coordinate e")
plt.ylabel("energy H(e)")
plt.title("A double-well model has basins and a barrier")
save("ch05-double-well.png")

t = np.linspace(0, 30, 500)
for K in [0.2, 0.7, 1.2]:
    dphi = 2*np.arctan(np.exp(-K*t/8))
    plt.plot(t, dphi, label=f"K={K}")
plt.xlabel("time")
plt.ylabel("phase difference")
plt.title("Coupling reduces dyadic phase difference")
plt.legend()
save("ch06-kuramoto.png")

np.random.seed(4)
pts = np.random.rand(200, 2)*50
ang = np.arctan2(25-pts[:,1], 25-pts[:,0]) + np.random.normal(0, .35, 200)
plt.figure(figsize=(5, 5))
plt.quiver(pts[:,0], pts[:,1], np.cos(ang), np.sin(ang), angles="xy", scale_units="xy", scale=0.45, width=.003)
plt.xlim(0, 50); plt.ylim(0, 50)
plt.xlabel("m"); plt.ylabel("m")
plt.title("Vicsek-style local alignment field")
save("ch07-vicsek.png")

ages = [4.54, 4.0, 2.5, 0.541, 0.066, 0]
labels = ["Earth", "Archean", "Oxygen", "Cambrian", "K-Pg", "now"]
plt.figure(figsize=(7, 2.6))
plt.hlines(1, 0, 4.54, color="0.3")
plt.scatter(ages, [1]*len(ages), s=70)
for a,l in zip(ages,labels):
    plt.text(a, 1.05, l, rotation=35, ha="right")
plt.gca().invert_xaxis(); plt.yticks([])
plt.xlabel("billions of years before present")
plt.title("Deep time compresses human history into the final pixel")
save("ch08-deep-time.png")

mass = np.linspace(.1, 30, 300)
lum = mass**3.5
plt.figure(figsize=(6, 3.4))
plt.loglog(mass, lum)
plt.scatter([1], [1], color="orange", label="Sun")
plt.xlabel("mass / solar mass")
plt.ylabel("luminosity / solar luminosity")
plt.title("Main-sequence scaling is steep")
plt.legend()
save("ch09-stars.png")

labels = ["baryon", "dark matter", "dark energy"]
vals = [1/11, 3/11, 7/11]
plt.figure(figsize=(5.8, 3.4))
plt.bar(labels, vals, color=["#6baed6", "#756bb1", "#31a354"])
plt.ylabel("fraction")
plt.title("USF dark-sector ratios are model-derived")
save("ch10-dark-sectors.png")

# Chapter 1: response time against size for the 31 registry levels.
import re
import yaml

REGISTRY = Path(__file__).resolve().parents[4] / "registry" / "levels"
LADDER = ["quantum-foam", "string-boundary", "nuclear", "atomic", "molecular",
          "cellular-synaptic", "local-circuit", "whole-brain-cemi", "human-vertebrate",
          "dyad", "human-group", "animal-swarm", "bird", "flock", "colony-roost",
          "society-city", "regional-institutional", "civilisational-solar",
          "species-stellar", "geological", "planetary", "orbital-system", "stellar",
          "compact-object", "stellar-cluster", "galactic-disc", "galactic-halo",
          "galaxy-cluster", "cosmic-filaments", "observable-universe", "cosmic-web"]


def log10_of(text: str) -> float:
    """'10^-3 to 10^-1 m' -> -2.0 (geometric middle of a range)."""
    exps = [float(e) for e in re.findall(r"10\^(-?\d+(?:\.\d+)?)", str(text))]
    return sum(exps) / len(exps)


pts = []
for lid in LADDER:
    data = yaml.safe_load((REGISTRY / f"{lid}.yaml").read_text(encoding="utf-8"))
    pts.append((lid, log10_of(data["length_scale"]), log10_of(data["response_time"])))

fig, ax = plt.subplots(figsize=(7.2, 4.6))
xs = np.array([p[1] for p in pts])
ys = np.array([p[2] for p in pts])
ax.scatter(xs, ys, s=22, color="#104a73", zorder=3)
line = np.linspace(-36, 27, 2)
ax.plot(line, line - math.log10(2.998e8), color="#c0392b", lw=1.2,
        label="light-crossing time $L/c$")
for lid, x0, y0 in pts:
    if lid in {"quantum-foam", "atomic", "cellular-synaptic", "human-vertebrate",
               "society-city", "geological", "stellar", "compact-object",
               "galactic-disc", "observable-universe"}:
        ax.annotate(lid.replace("-", " "), (x0, y0), xytext=(4, 3),
                    textcoords="offset points", fontsize=7.5)
ax.set_xlabel("size, $\\log_{10}(L/\\mathrm{m})$")
ax.set_ylabel("response time, $\\log_{10}(\\tau/\\mathrm{s})$")
ax.set_title("Thirty-one levels: size against response time")
ax.grid(color="0.9")
ax.legend(loc="upper left")
save("ch01-scale-time.png")

# Chapter 1 opener: the 31 levels as a powers-of-ten strip (landscape banner).
BANDS = [("smaller than a cell", -36, -5, "#e8f1f8"), ("cell to city", -5, 4, "#eaf5ec"),
         ("city to planet", 4, 8, "#fbf3e0"), ("planet to star cluster", 8, 18, "#f3edf8"),
         ("galaxies and beyond", 18, 27, "#eceef6")]
fig, ax = plt.subplots(figsize=(16, 4.8))
for name, lo, hi, colour in BANDS:
    ax.axvspan(lo, hi, color=colour, zorder=0)
    ax.text((lo + hi) / 2, -2.75, name, ha="center", va="center", fontsize=11,
            color="#104a73", fontweight="bold")
ax.axhline(0, color="#104a73", lw=1.4, zorder=1)
order = sorted(pts, key=lambda p: p[1])


def spread(xs: list[float], gap: float) -> list[float]:
    """Push label positions apart (keeping order) so neighbours are >= gap."""
    out = list(xs)
    for _ in range(200):
        moved = False
        for j in range(1, len(out)):
            if out[j] - out[j - 1] < gap:
                shift = (gap - (out[j] - out[j - 1])) / 2
                out[j - 1] -= shift
                out[j] += shift
                moved = True
        if not moved:
            break
    return out


for side, sign in ((0, 1), (1, -1)):
    group = [p for i, p in enumerate(order) if i % 2 == side]
    label_x = spread([p[1] for p in group], 1.55)
    for (lid, x0, _), xl in zip(group, label_x):
        y_text = 0.95 * sign
        ax.plot([x0, x0, xl], [0, 0.45 * sign, y_text * 0.97], color="#7f8c99", lw=0.6, zorder=1)
        ax.scatter([x0], [0], s=28, color="#c0392b", zorder=3)
        ax.text(xl, y_text, lid.replace("-", " "), rotation=60 * sign,
                ha="left", va="bottom" if sign > 0 else "top", fontsize=7.5)
ax.set_xlim(-36, 27)
ax.set_ylim(-3.0, 2.6)
ax.set_yticks([])
ax.set_xticks(range(-35, 27, 5))
ax.set_xlabel("size, $\\log_{10}(L/\\mathrm{m})$  (each step is a factor of ten)")
for spine in ("left", "right", "top"):
    ax.spines[spine].set_visible(False)
save("ch01-banner.png")