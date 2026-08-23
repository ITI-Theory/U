# Introduction: A Green's Function for Everything

In 1828, George Green published an essay introducing what we now call the Green's function — a device for solving differential equations by encoding the response of a physical system to an idealised point source. The extraordinary utility of Green's functions is that once you know how a system responds to a delta function, you know how it responds to anything: any extended source is just a superposition of point sources, and the full response is a superposition of Green's functions. The technique swept through physics. It underpins quantum field theory, classical electrodynamics, elasticity, and fluid mechanics. Every branch of physics has its own Green's functions; they are the atomic units of propagation.

This book presents evidence that the universe has a *master* Green's function — one that produces the electromagnetic propagator, the gravitational propagator, and the quantum field propagators as limiting cases, and that also governs a class of phenomena that physics has not previously had equations for: the dynamics of felt experience in nervous systems.

## The Identification

The Universal Somatic Field is defined by a tensor-valued field equation whose free-space propagator takes the form

$$G_{\mu\nu}(x, x') = \langle \Phi_\mu(x)\, \Phi_\nu(x') \rangle_0$$

where $\Phi_{\mu\nu}$ is the somatic tensor and the expectation value is taken in the vacuum of the field. The claim — demonstrated in the papers that follow — is that this propagator reduces to the standard electromagnetic Green's function in the appropriate limits, to the linearised gravitational Green's function in the weak-field, low-frequency limit, and to a Hopfield-network energy functional in the neural-coupling limit.

This is not a claim that electromagnetism, gravity, and neural dynamics are the same thing. It is the weaker and more defensible claim that they are all *instances* of a single parameterised propagator family, distinguished by the values of the coupling constants and the symmetry-breaking pattern of the background field. The mathematical analogy is to how the Weinberg-Salam electroweak theory unifies electromagnetism and the weak force not by identifying them but by embedding them in a larger gauge group. The USF does something similar, but in a different sector of the theory.

## M-Theory Compactification

The derivation proceeds from M-theory compactified on a Calabi-Yau threefold times a circle, following the standard G₂ holonomy reduction. The novel step is identifying which moduli field in the compactification spectrum corresponds to the somatic tensor. The argument is that the somatic modes are the lowest-lying fields in the Kaluza-Klein tower that couple to macroscopic current distributions in conducting media — which is what nervous systems are. The compactification geometry sets the mass scales; the neural coupling constants emerge from the overlap integrals of the KK wavefunctions with the biological current distribution.

The resulting effective field theory in four dimensions has the structure of a nonlinear sigma model with a Hopfield potential. The attractor states of the potential are the stable configurations of the somatic field — the *emotional basins* of the phenomenological description. The Hopfield potential is not postulated: it is derived as the leading-order term in a saddle-point expansion of the full string-theoretic path integral around a background nervous system.

## Cosmological Limit

One immediate test of the framework is the cosmological limit. In the limit where the current distribution is zero (empty space, no nervous systems) and the field amplitude is small, the field equation should reduce to General Relativity in the appropriate approximation. This is demonstrated explicitly in the companion paper on the universal field: the somatic tensor $\Phi_{\mu\nu}$ contracts to the linearised metric perturbation $h_{\mu\nu}$ when the neural coupling constant $\kappa_\text{bio}$ is taken to zero. The resulting field equation is the linearised Einstein equation. The cosmological constant emerges as the vacuum expectation value of the trace of the somatic tensor — a result with obvious implications for the cosmological constant problem.

This is the claim that will raise the most eyebrows among physicists. Two dedicated papers now
provide the full derivation. **P21** (Johnson, 2026) derives the cosmological constant as the
vacuum amplitude of the USF tensor trace: $\Lambda_\text{USF} = (21/11)H_0^2/c^2$, within
7\% of the observed value. **P22** (Johnson, 2026) identifies dark matter as the vacuum energy
of the three non-compact spatial dimensions: $\Omega_\text{DM} = 3/11 \approx 0.273$, within
2.9\% of the Planck 2018 value. Together, these two results account for 95\% of the universe's
total energy budget from pure M-theory dimensional counting — no free parameters.

## The Simple Harmonic Oscillator Is Not Postulated

One subtlety worth highlighting for the technically-trained reader: in most formulations of string theory, the worldsheet action is postulated to contain a kinetic term for the string coordinates that leads to harmonic oscillators on quantisation. The USF framework derives this rather than postulating it. The SHO structure emerges from the lowest-order term in the Taylor expansion of the Calabi-Yau moduli metric around a background somatic field configuration. This is a calculational result, not an assumption, and it constrains the moduli geometry to a restricted class — which may be testable against other moduli-space calculations.

## What This Book Offers the Physicist

The papers assembled here develop the mathematical machinery from first principles, with complete derivations. Chapter by chapter, you will find: the compactification derivation; the identification of the somatic propagator with the electromagnetic propagator in the appropriate limit; the cosmological limit; the Lean 4 machine-checked proofs of the key formal identities; and the experimental predictions. The final chapters present the quantum annealing experiment — a direct test of the WKB tunnelling prediction for the somatic field, using a D-Wave quantum annealer as the physical implementation.

The intended reader is a physicist comfortable with QFT, GR, and some familiarity with Calabi-Yau compactification. The framework does not require expertise in neuroscience; the neural aspects are treated as boundary conditions on the field, not as primary objects.

The claim is large. The derivations are provided in full. Examine them critically.
