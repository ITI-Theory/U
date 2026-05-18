"""
Figure 5 — Operator Modifications: Neurotype Comparison
Side-by-side energy landscapes for: Typical, ADHD, ASD, C-PTSD.
Produces fig5_neurotype_landscapes.pdf and fig5_neurotype_landscapes.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 800)

def V(x, params):
    """params: list of (centre, depth, width) tuples + (bowl_k,)"""
    *wells, bowl_k = params
    v = bowl_k * x**2
    for cx, depth, width in wells:
        v += -depth * np.exp(-(x - cx)**2 / (2 * width**2))
    return v

# (centre, depth, width)  then bowl_k
typical    = ([( 0.0, 3.5, 1.6), (-3.0, 2.5, 0.5), ( 3.0, 1.6, 0.9)], 0.09)
adhd       = ([( 0.0, 2.0, 2.5), (-3.0, 1.8, 1.0), ( 3.0, 1.8, 1.5)], 0.04)  # flat, wide, low barriers
asd        = ([( 0.0, 3.5, 0.6), (-3.0, 3.2, 0.4), ( 3.0, 3.0, 0.4)], 0.14)  # narrow steep wells
cptsd      = ([( 0.0, 1.5, 1.4), (-3.0, 4.5, 0.4), ( 3.0, 1.4, 0.9)], 0.09)  # freeze dominates

configs = [
    (typical, "Typical",  "#2C6FAC"),
    (adhd,    "ADHD",     "#E67E22"),
    (asd,     "ASD",      "#27AE60"),
    (cptsd,   "C-PTSD",   "#C0392B"),
]

fig, axes = plt.subplots(1, 4, figsize=(13, 3.8), sharey=False)
fig.suptitle("Energy Landscape Under Operator Modifications ($W$, $T$, $\\lambda$)",
             fontsize=11, y=1.01)

for ax, (params, label, col) in zip(axes, configs):
    wells, bowl_k = params
    y = V(x, [*wells, bowl_k])
    ax.plot(x, y, color=col, lw=2.0)
    ax.axhline(0, color="#aaa", lw=0.5, ls=":")
    ax.set_title(label, fontsize=10.5, color=col, weight="bold")
    ax.set_xlim(-5, 5)
    ax.tick_params(labelbottom=False, labelleft=False)
    ax.set_xlabel(r"$e_1$", fontsize=9)
    if ax is axes[0]:
        ax.set_ylabel(r"$H(e)$", fontsize=10)

    # Mark well labels
    for cx, depth, width in wells:
        txt = {0.0: "Calm", -3.0: "Freeze", 3.0: "Fight"}.get(cx, "")
        if txt:
            ymin = V(np.array([cx]), [*wells, bowl_k])[0]
            ax.text(cx, ymin - 0.1, txt, ha="center", fontsize=7.5,
                    color=col, style="italic")

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"fig5_neurotype_landscapes.{ext}", dpi=180, bbox_inches="tight")
print("fig5 saved")
