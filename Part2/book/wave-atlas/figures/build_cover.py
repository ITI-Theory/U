"""Generate the cover figure F0.1 for The Wave That Is Always There.

A stylised 'Mandelbulb-as-G2-compactification' cartoon — fractal
self-similar lobes around a central seven-fold structure. Pure
matplotlib (no shader).
"""

from __future__ import annotations
from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
from matplotlib.collections import LineCollection

OUT = Path(__file__).parent

plt.rcParams.update({
    "font.family": "serif",
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
    "savefig.facecolor": "#0a0a14",
})


def lobe(ax, cx, cy, r, n_recurse, color, alpha=1.0, rotate=0.0):
    if n_recurse <= 0 or r < 0.005:
        return
    # main lobe — a circle
    circle = plt.Circle((cx, cy), r, color=color, alpha=alpha * 0.18,
                        linewidth=0)
    ax.add_patch(circle)
    # ring outline
    theta = np.linspace(0, 2 * np.pi, 200)
    ax.plot(cx + r * np.cos(theta), cy + r * np.sin(theta),
            color=color, lw=0.4 + n_recurse * 0.15, alpha=alpha * 0.85)
    # seven daughter lobes around it (G2 / seven-fold)
    for k in range(7):
        a = rotate + 2 * np.pi * k / 7
        ncx = cx + r * 1.05 * np.cos(a)
        ncy = cy + r * 1.05 * np.sin(a)
        lobe(ax, ncx, ncy, r * 0.38, n_recurse - 1, color,
             alpha=alpha * 0.78, rotate=rotate + 0.4)


def starfield(ax, n=500, seed=3):
    rng = np.random.default_rng(seed)
    x = rng.uniform(-1.4, 1.4, n)
    y = rng.uniform(-1.4, 1.4, n)
    s = rng.uniform(0.1, 1.6, n) ** 2
    a = rng.uniform(0.15, 0.7, n)
    ax.scatter(x, y, s=s, c="white", alpha=a, linewidths=0)


def build():
    fig, ax = plt.subplots(figsize=(6.14, 9.21))  # 156x234 mm ratio
    ax.set_xlim(-1.0, 1.0)
    ax.set_ylim(-1.5, 1.5)
    ax.set_aspect("equal")
    ax.set_facecolor("#0a0a14")
    ax.axis("off")

    starfield(ax)

    # central recursive lobe structure
    lobe(ax, 0, -0.05, 0.5, 4, color="#7ab8ff", alpha=1.0)
    # echo behind in warm tone
    lobe(ax, 0, -0.05, 0.62, 2, color="#b04a2a", alpha=0.35,
         rotate=np.pi / 7)

    # title block
    ax.text(0, 1.18, "The Wave",
            ha="center", va="center", color="white",
            fontsize=28, fontweight="bold", family="serif")
    ax.text(0, 1.02, "That Is Always There",
            ha="center", va="center", color="white",
            fontsize=18, family="serif", fontstyle="italic")

    # subtitle band
    ax.text(0, -1.18,
            "A Fractal Atlas from the Universe to the Soma",
            ha="center", va="center", color="#bcd",
            fontsize=12, family="serif", fontstyle="italic")
    ax.text(0, -1.32, "A L I S T A I R   J O H N S O N",
            ha="center", va="center", color="white",
            fontsize=11, family="serif", fontweight="bold")
    ax.text(0, -1.42, "[ T ] - T H E O R Y",
            ha="center", va="center", color="#7ab8ff",
            fontsize=8, family="serif")

    out = OUT / "F0_1_cover.png"
    fig.savefig(out, dpi=300, facecolor="#0a0a14")
    plt.close(fig)
    print(f"wrote {out.name}")


if __name__ == "__main__":
    build()
