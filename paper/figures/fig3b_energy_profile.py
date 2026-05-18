"""
Figure 3b — Energy Landscape Cross-section (1D profile)
Slice through the landscape showing well depth and barrier height.
Regulated (therapeutic W) vs dysregulated (traumatised W) comparison.
Produces fig3b_energy_profile.pdf and fig3b_energy_profile.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 1000)

def landscape(x, freeze_depth=2.5, calm_depth=3.5, barrier=0.8):
    """1D multi-well potential."""
    calm  = -calm_depth  * np.exp(-(x - 0.0)**2 / (2 * 1.6**2))
    freeze= -freeze_depth* np.exp(-(x + 3.2)**2 / (2 * 0.5**2))
    fight = -1.6         * np.exp(-(x - 3.0)**2 / (2 * 0.9**2))
    bowl  =  0.09 * x**2
    return calm + freeze + fight + bowl

V_baseline    = landscape(x, freeze_depth=2.5, calm_depth=3.5)  # regulated
V_traumatised = landscape(x, freeze_depth=3.8, calm_depth=2.2)  # freeze deepened, calm shallowed

fig, ax = plt.subplots(figsize=(9, 4))

ax.plot(x, V_baseline,    color="#2C6FAC", lw=2.0, label="regulated W")
ax.plot(x, V_traumatised, color="#C0392B", lw=2.0, ls="--", label="traumatised W (deep freeze)")

# Label wells
for xpos, txt, col in [
    ( 0.0, "Calm",   "#2C6FAC"),
    (-3.2, "Freeze", "#6C3483"),
    ( 3.0, "Fight",  "#7B241C"),
]:
    ax.annotate(txt, xy=(xpos, landscape(np.array([xpos]))[0] - 0.15),
                ha="center", fontsize=9, color=col, style="italic")

ax.axhline(0, color="#aaa", lw=0.6, ls=":")
ax.set_xlabel(r"field coordinate $e_1$", fontsize=10)
ax.set_ylabel(r"energy $H(e)$", fontsize=10)
ax.set_title(r"Energy Profile: Regulated vs Traumatised $W$", fontsize=10.5, pad=8)
ax.legend(fontsize=9, framealpha=0.85)
ax.set_xlim(-5, 5)
ax.tick_params(labelbottom=False, labelleft=False)

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"fig3b_energy_profile.{ext}", dpi=180, bbox_inches="tight")
print("fig3b saved")
