"""Memory-kernel comparison: resolved versus persistently elevated activation."""
import numpy as np
import matplotlib.pyplot as plt

time = np.linspace(0, 12, 800)
regulated = sum(np.exp(-((time - center) / 0.35) ** 2) for center in (2, 6, 10))
trauma = sum(np.exp(-((time - center) / 0.55) ** 2) for center in (2, 5, 8, 11))
memory = 0.18 + 0.19 * (1 - np.exp(-time / 4))

figure, axes = plt.subplots(2, 1, figsize=(8.2, 4.6), sharex=True, constrained_layout=True)
for axis in axes:
    axis.set_xlim(0, 12)
    axis.set_ylim(0, 1.25)
    axis.spines[['top', 'right']].set_visible(False)
    axis.set_ylabel('Field activation')

axes[0].plot(time, regulated, color='#1a3f6e', lw=2.2)
axes[0].axhline(0, color='#59636d', lw=0.8)
axes[0].set_title('Regulated: activation resolves to baseline', loc='left', fontweight='bold')
axes[0].annotate('recovery gap', xy=(4, 0.02), xytext=(4, 0.55), ha='center', arrowprops={'arrowstyle': '-|>', 'color': '#59636d'})

axes[1].fill_between(time, memory, trauma + memory, color='#bd6a45', alpha=0.18)
axes[1].plot(time, trauma + memory, color='#8d3f25', lw=2.2)
axes[1].plot(time, memory, color='#59636d', lw=1.4, ls='--', label='elevated baseline')
axes[1].set_title('C-PTSD-modified: traces persist and elevate the baseline', loc='left', fontweight='bold')
axes[1].set_xlabel('Time')
axes[1].legend(frameon=False, loc='upper right')
figure.savefig('fig_memory_kernel.pdf')
