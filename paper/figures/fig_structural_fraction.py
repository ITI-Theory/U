"""Structural fraction f(tau_d) = tanh(tau_d/tau_c)."""
import numpy as np
import matplotlib.pyplot as plt

age = np.linspace(0, 120, 500)
critical = 36
fraction = np.tanh(age / critical)
figure, axis = plt.subplots(figsize=(8.2, 4.4), constrained_layout=True)
axis.plot(age, fraction, color='#1a3f6e', lw=2.5)
axis.axvline(critical, color='#b66b16', ls='--', lw=1.4)
axis.axhline(np.tanh(1), color='#b66b16', ls=':', lw=1.2)
axis.scatter([critical], [np.tanh(1)], color='#b66b16', zorder=3)
axis.annotate(r'$f(\tau_c)=\tanh(1)\approx0.76$', (critical, np.tanh(1)), xytext=(48, .58), arrowprops={'arrowstyle': '->', 'color': '#59636d'})
axis.text(9, .15, r'mostly $W_{\mathrm{trauma}}$', color='#8d3f25')
axis.text(72, .9, r'mostly $W_0$', color='#1a3f6e')
axis.set(xlim=(0, 120), ylim=(0, 1.05), xlabel=r'Developmental age at trauma $\tau_d$ (months)', ylabel=r'Structural fraction $f(\tau_d)$')
axis.spines[['top', 'right']].set_visible(False)
figure.savefig('fig_structural_fraction.pdf')
