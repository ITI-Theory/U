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

# Chapter 3, Section 3.4: confinement cost against Coulomb gain, and the 1s radial probability.
A0 = 0.0529177
r = np.linspace(0.012, 0.25, 500)
kin = 197.327**2 / (2 * 510999 * r**2)
pot = -1.43996 / r
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 3.4))
ax1.plot(r, kin, color="#c0504d", label="confinement cost  $\\hbar^2/2mr^2$")
ax1.plot(r, pot, color="#4f81bd", label="Coulomb gain  $-ke^2/r$")
ax1.plot(r, kin + pot, color="black", lw=2, label="total")
ax1.axvline(A0, color="#7f8c99", ls="--", lw=1)
ax1.text(A0 + 0.004, 25, "$a_0$ = 0.0529 nm", fontsize=9)
ax1.axhline(0, color="#7f8c99", lw=0.8)
ax1.set_ylim(-60, 60)
ax1.set_xlabel("radius r (nm)")
ax1.set_ylabel("energy (eV)")
ax1.set_title("the balance sets the size: minimum -13.6 eV at $a_0$", fontsize=10)
ax1.legend(fontsize=8, loc="lower right")
r2 = np.linspace(0, 0.25, 500)
P = (r2 / A0)**2 * np.exp(-2 * r2 / A0)
ax2.plot(r2, P / P.max(), color="#1f6f8b", lw=2)
ax2.axvline(A0, color="#7f8c99", ls="--", lw=1)
ax2.set_xlabel("radius r (nm)")
ax2.set_ylabel("relative probability per unit radius")
ax2.set_title("1s ground state: most likely radius is $a_0$", fontsize=10)
save("ch03-hydrogen.png")

# Chapter 4, Section 4.3: impulse response of the passive cable, tau dV/dt = lambda^2 V'' - V.
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 3.4))
X = np.linspace(-4, 4, 600)
for T, col in [(0.1, "#1f6f8b"), (0.5, "#4f81bd"), (1.0, "#c0504d"), (2.0, "#7f8c99")]:
    G = np.exp(-X**2 / (4 * T)) * np.exp(-T) / np.sqrt(4 * np.pi * T)
    ax1.plot(X, G, color=col, label=f"t = {T:g} $\\tau$")
ax1.set_xlabel("distance from the kick, $x/\\lambda$")
ax1.set_ylabel("voltage (relative)")
ax1.set_title("one kick: the voltage spreads and leaks away", fontsize=10)
ax1.legend(fontsize=8)
Xs = np.linspace(0, 4, 400)
ax2.plot(Xs, np.exp(-Xs), color="black", lw=2)
ax2.axvline(1, color="#7f8c99", ls="--", lw=1)
ax2.axhline(np.exp(-1), color="#7f8c99", ls="--", lw=1)
ax2.text(1.05, 0.42, "$x = \\lambda$: 37 % remains", fontsize=9)
ax2.set_xlabel("distance from a steady injection, $x/\\lambda$")
ax2.set_ylabel("voltage (relative)")
ax2.set_title("steady input: $V = V_0\\,e^{-x/\\lambda}$", fontsize=10)
save("ch04-cable.png")


# Chapter 4 opener: Hodgkin-Huxley responses to 1 ms kicks of increasing size.
def hh_trace(amp: float, dur: float = 1.0, t_end: float = 25.0, dt: float = 0.005):
    gna, gk, gl, ena, ek, el = 120.0, 36.0, 0.3, 50.0, -77.0, -54.387
    v = -65.0

    def rates(v):
        am = 0.1 * (v + 40) / (1 - math.exp(-(v + 40) / 10))
        bm = 4 * math.exp(-(v + 65) / 18)
        ah = 0.07 * math.exp(-(v + 65) / 20)
        bh = 1 / (1 + math.exp(-(v + 35) / 10))
        an = 0.01 * (v + 55) / (1 - math.exp(-(v + 55) / 10))
        bn = 0.125 * math.exp(-(v + 65) / 80)
        return am, bm, ah, bh, an, bn

    am, bm, ah, bh, an, bn = rates(v)
    m, h, n = am / (am + bm), ah / (ah + bh), an / (an + bn)
    ts = np.arange(0, t_end, dt)
    vs = np.empty_like(ts)
    for i, t in enumerate(ts):
        current = amp if 1.0 <= t < 1.0 + dur else 0.0
        dv = current - gna * m**3 * h * (v - ena) - gk * n**4 * (v - ek) - gl * (v - el)
        v += dt * dv
        am, bm, ah, bh, an, bn = rates(v)
        m += dt * (am * (1 - m) - bm * m)
        h += dt * (ah * (1 - h) - bh * h)
        n += dt * (an * (1 - n) - bn * n)
        vs[i] = v
    return ts, vs


fig, (tr, pk) = plt.subplots(1, 2, figsize=(16, 4.4), gridspec_kw={"width_ratios": [2.2, 1]})
for amp, col in [(3, "#9fb3c8"), (6.5, "#4f81bd"), (7, "#c0504d"), (20, "#7a1f1f")]:
    ts, vs = hh_trace(amp)
    tr.plot(ts, vs, color=col, lw=1.8, label=f"kick {amp:g} $\\mu$A cm$^{{-2}}$ for 1 ms")
tr.set_xlabel("time (ms)")
tr.set_ylabel("membrane voltage (mV)")
tr.set_title("below threshold the kick dies away; above it the cell fires a full spike", fontsize=11)
tr.legend(fontsize=9, loc="upper right")
amps = np.linspace(1, 30, 59)
peaks = [hh_trace(a, t_end=12.0, dt=0.01)[1].max() for a in amps]
pk.plot(amps, peaks, "o-", color="#104a73", ms=3)
pk.set_xlabel("kick size ($\\mu$A cm$^{-2}$, 1 ms)")
pk.set_ylabel("peak voltage (mV)")
pk.set_title("all or none: the peak jumps at 6.9", fontsize=11)
for ax in (tr, pk):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
save("ch04-banner.png")

# Chapter 5 opener: an overdamped ball in a double well, U = (x^2 - 1)^2, at two noise levels.
def langevin(D: float, t_end: float = 400.0, dt: float = 0.01, seed: int = 3):
    rng = np.random.default_rng(seed)
    n = int(t_end / dt)
    xs = np.empty(n)
    x = -1.0
    kick = np.sqrt(2 * D * dt) * rng.standard_normal(n)
    for i in range(n):
        x += -4 * x * (x * x - 1) * dt + kick[i]
        xs[i] = x
    return np.arange(n) * dt, xs


fig, (wl, tr) = plt.subplots(1, 2, figsize=(16, 4.4), gridspec_kw={"width_ratios": [1, 2.4]})
xw = np.linspace(-1.8, 1.8, 400)
wl.plot(xw, (xw**2 - 1)**2, color="#104a73", lw=2)
wl.plot([-1], [0.05], "o", color="#c0504d", ms=12)
wl.annotate("", xy=(-0.1, 0.95), xytext=(-0.85, 0.2),
            arrowprops=dict(arrowstyle="->", color="#7f8c99", lw=1.5, connectionstyle="arc3,rad=-0.3"))
wl.text(0, 1.08, "barrier $\\Delta U$", ha="center", fontsize=10)
wl.text(-1, -0.25, "state A", ha="center", fontsize=10)
wl.text(1, -0.25, "state B", ha="center", fontsize=10)
wl.set_ylim(-0.4, 1.6)
wl.set_xlabel("state x")
wl.set_ylabel("landscape U(x)")
wl.set_title("two valleys and a ridge", fontsize=11)
for D, col, lab in [(0.25, "#c0504d", "noise D = 0.25: hops every 80 time units or so"),
                    (0.10, "#104a73", "noise D = 0.10: stays put")]:
    ts, xs = langevin(D)
    tr.plot(ts, xs, color=col, lw=0.6, label=lab)
tr.axhline(1, color="#7f8c99", ls=":", lw=1)
tr.axhline(-1, color="#7f8c99", ls=":", lw=1)
tr.set_xlabel("time")
tr.set_ylabel("state x")
tr.set_title("the same landscape at two noise levels: escape is exponentially sensitive to $\\Delta U/D$", fontsize=11)
tr.legend(fontsize=9, loc="upper left")
for ax in (wl, tr):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
save("ch05-banner.png")

# Chapter 5, Section 5.5: critical slowing down as the valley flattens.
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 3.4))
xs = np.linspace(-1.2, 1.2, 300)
tt = np.linspace(0, 6, 300)
for k, col in [(4.0, "#104a73"), (2.0, "#4f81bd"), (1.0, "#c0504d"), (0.5, "#7a1f1f")]:
    ax1.plot(xs, 0.5 * k * xs**2, color=col, label=f"curvature {k:g}")
    ax2.plot(tt, np.exp(-k * tt), color=col, label=f"recovery time {1 / k:g}")
ax1.set_ylim(0, 1.5)
ax1.set_xlabel("distance from the valley floor")
ax1.set_ylabel("landscape U")
ax1.set_title("the valley flattens near a tipping point", fontsize=10)
ax1.legend(fontsize=8)
ax2.set_xlabel("time after the same small kick")
ax2.set_ylabel("displacement (relative)")
ax2.set_title("so the same kick takes longer to die away", fontsize=10)
ax2.legend(fontsize=8)
save("ch05-slowing.png")

# Chapter 6 opener: two coupled oscillators (Adler equation) and a Kuramoto crowd.
def adler(ratio: float, dw: float = 1.0, t_end: float = 40.0, dt: float = 0.01):
    kap2 = ratio * dw
    phi = 0.0
    ts = np.arange(0, t_end, dt)
    out = np.empty_like(ts)
    for i in range(len(ts)):
        phi += dt * (dw - kap2 * math.sin(phi))
        out[i] = phi
    return ts, out


def kuramoto(K: float, n: int = 2000, g: float = 0.5, t_end: float = 60.0, dt: float = 0.02, seed: int = 2):
    rng = np.random.default_rng(seed)
    w = np.clip(g * np.tan(np.pi * (rng.random(n) - 0.5)), -50, 50)
    th = rng.random(n) * 2 * np.pi
    steps = int(t_end / dt)
    rs = np.empty(steps)
    for i in range(steps):
        z = np.mean(np.exp(1j * th))
        rs[i] = abs(z)
        th += dt * (w + K * abs(z) * np.sin(np.angle(z) - th))
    return np.arange(steps) * dt, rs


fig, (ad, ku) = plt.subplots(1, 2, figsize=(16, 4.4))
for ratio, col, lab in [(0.8, "#c0504d", "coupling 0.8 of the threshold: slips"),
                        (1.25, "#104a73", "coupling 1.25 of the threshold: locks")]:
    ts, ph = adler(ratio)
    ad.plot(ts, ph / (2 * np.pi), color=col, lw=2, label=lab)
ad.set_xlabel("time (units of $1/\\Delta\\omega$)")
ad.set_ylabel("phase difference (cycles)")
ad.set_title("two oscillators: below threshold the gap keeps slipping; above it, it holds", fontsize=11)
ad.legend(fontsize=9)
for K, col in [(0.5, "#9fb3c8"), (1.5, "#4f81bd"), (3.0, "#104a73")]:
    ts, rs = kuramoto(K)
    ku.plot(ts, rs, color=col, lw=1.5, label=f"K = {K:g} (critical 1.0)")
ku.set_ylim(0, 1)
ku.set_xlabel("time")
ku.set_ylabel("order parameter r")
ku.set_title("2000 oscillators: below critical coupling no rhythm emerges; above it one does", fontsize=11)
ku.legend(fontsize=9)
for ax in (ad, ku):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
save("ch06-banner.png")

# Chapter 6, Section 6.3: Kuramoto order parameter against coupling, simulation and theory.
Ks = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]
r_sim = [kuramoto(K)[1][-500:].mean() for K in Ks]
Kt = np.linspace(0.2, 5, 400)
r_th = np.sqrt(np.clip(1 - 1 / Kt, 0, None))
plt.figure(figsize=(6, 3.4))
plt.plot(Kt, r_th, color="#104a73", lw=2, label="theory $r = \\sqrt{1 - K_c/K}$")
plt.plot(Ks, r_sim, "o", color="#c0504d", label="simulation, 2000 oscillators")
plt.axvline(1, color="#7f8c99", ls="--", lw=1)
plt.xlabel("coupling K (critical $K_c$ = 1)")
plt.ylabel("order parameter r")
plt.title("The onset of collective rhythm")
plt.legend(fontsize=8)
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

# Chapter 2 opener: a kick, the ringing it leaves, and the resonance it implies.
fig, axes = plt.subplots(1, 3, figsize=(16, 3.6), gridspec_kw={"width_ratios": [1, 2.2, 1.6]})
t = np.linspace(-0.1, 1.6, 1200)
w0, g = 20.0, 2.0
wd = math.sqrt(w0**2 - g**2)
axes[0].plot([-0.1, 0, 0, 0.0, 0.3], [0, 0, 1, 0, 0], color="#c0392b", lw=2)
axes[0].set_title("1. a short kick $J\\,\\delta(t)$", fontsize=11)
axes[0].set_xlabel("time (s)")
resp = np.where(t >= 0, np.exp(-g * t) * np.sin(wd * t), 0.0)
axes[1].plot(t, resp, color="#104a73", lw=1.6)
axes[1].plot(t, np.where(t >= 0, np.exp(-g * t), np.nan), color="#7f8c99", ls="--", lw=1)
axes[1].plot(t, np.where(t >= 0, -np.exp(-g * t), np.nan), color="#7f8c99", ls="--", lw=1)
axes[1].axvline(0, color="#c0392b", lw=0.8)
axes[1].set_title("2. the response $G(t)$: ringing inside a decaying envelope", fontsize=11)
axes[1].set_xlabel("time (s)")
w = np.linspace(1, 40, 800)
for q, col in ((5, "#104a73"), (2, "#007c8c"), (1, "#946400")):
    gam = w0 / (2 * q)
    amp = 1 / np.sqrt((w0**2 - w**2) ** 2 + (2 * gam * w) ** 2)
    axes[2].plot(w, amp * w0**2, color=col, label=f"Q = {q}")
axes[2].set_title("3. driven steadily: resonance", fontsize=11)
axes[2].set_xlabel("drive frequency $\\omega$ (rad/s)")
axes[2].legend(fontsize=8)
for ax in axes:
    ax.set_yticks([])
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
save("ch02-banner.png")

# Chapter 3 opener: hydrogen energy levels and the visible Balmer lines.
def wl_rgb(nm: float) -> tuple[float, float, float]:
    if nm < 440: r, g, b = (440 - nm) / 60, 0.0, 1.0
    elif nm < 490: r, g, b = 0.0, (nm - 440) / 50, 1.0
    elif nm < 510: r, g, b = 0.0, 1.0, (510 - nm) / 20
    elif nm < 580: r, g, b = (nm - 510) / 70, 1.0, 0.0
    elif nm < 645: r, g, b = 1.0, (645 - nm) / 65, 0.0
    else: r, g, b = 1.0, 0.0, 0.0
    return (max(0, min(1, r)), max(0, min(1, g)), max(0, min(1, b)))


RYD = 13.6057
HC = 1239.84
fig, (lev, spec) = plt.subplots(1, 2, figsize=(16, 4.4), gridspec_kw={"width_ratios": [1, 2.3]})
for n in range(1, 7):
    e = -RYD / n**2
    lev.hlines(e, 0, 1, color="#104a73", lw=1.4)
    lev.text(1.03, e, f"n = {n}   {e:.2f} eV", va="center", fontsize=9)
lev.hlines(0, 0, 1, color="#7f8c99", lw=1, ls="--")
lev.text(1.03, 0.2, "ionised, 0 eV", va="bottom", fontsize=9, color="#7f8c99")
for i, n in enumerate(range(3, 7)):
    lam = HC / (RYD / 4 - RYD / n**2)
    x = 0.18 + 0.15 * i
    lev.annotate("", xy=(x, -RYD / 4), xytext=(x, -RYD / n**2),
                 arrowprops=dict(arrowstyle="->", color=wl_rgb(lam), lw=2))
lev.set_xlim(0, 1.7)
lev.set_ylim(-14.5, 1.2)
lev.set_xticks([])
lev.set_ylabel("energy (eV)")
lev.set_title("hydrogen levels; Balmer jumps end on n = 2", fontsize=11)
for s in ("top", "right", "bottom"):
    lev.spines[s].set_visible(False)
xs = np.linspace(380, 700, 700)
spec.imshow([[wl_rgb(x) for x in xs]], extent=(380, 700, 0, 1), aspect="auto", alpha=0.25)
for n in range(3, 7):
    lam = HC / (RYD / 4 - RYD / n**2)
    spec.axvline(lam, color=wl_rgb(lam), lw=4)
    spec.text(lam, 1.04, f"{lam:.0f} nm", ha="center", fontsize=9)
spec.set_xlim(380, 700)
spec.set_ylim(0, 1.15)
spec.set_yticks([])
spec.set_xlabel("wavelength (nm)")
spec.set_title("the visible lines of hydrogen: one formula, four colours", fontsize=11)
save("ch03-banner.png")