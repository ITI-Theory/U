---
title: "H-AL on the mind-body explorer in 3D and 3D SBS (ISS-027, ISS-052)"
date: 2026-10-10
---

Asked 10 Oct 2026, 01:20, in the HAL-UAT notebook (conversation c580f4db), when
the author asked for the whole explorer in 3D and 3D SBS for the 100-inch
projector (Dangbei Atom, DLP-Link glasses). Applied the same night: the body at
the screen plane, background behind, the field in front; captions and evidence
labels flat at the screen plane; depth moderate and adjustable. Citations [n]
and "Chats Vol n" refer to the notebook's sources.

**Answer:**

### 1. Stereoscopic & Projected Display in the Sources and Chats
 * **Implementation & Hardware Track**: Under epic **ISS-014** (and tracked in **ISS-046**), the Three.js visualizer (`soma-field-operator`) integrates stereoscopic Side-by-Side (SBS) output via Three.js's official `StereoEffect` (`three/addons/effects/StereoEffect.js`) to drive the **Dangbei Atom** (1080p 
ALPD laser projector with DLP-Link active shutter glasses) (*Chats Vol 4 [232–238]*; *Chats Vol 7 [1]*). A dedicated **`3D SBS`** toggle button was committed to the app interface alongside `3D`, `2D`, and the `4D|T` comparison view (*Chats Vol 7 [362–364, 386]*). * **The "Cockpit" & Immersion**: The display architecture is structured as an 
"astronaut cockpit" or *SpaceEngine*-style flight deck (*Chats Vol 4 [2, 3]*; *Chats Vol 7 [365–366]*). The viewer sits behind an invariant command dashboard while the Zoom Operator (\\(\Lambda\\)) travels through starfields and fractal depth without jarring snaps (*Chats Vol 4 [195–196]*; *Fractal Thesis [4]*). * **The "Observatory" Walk-Through**: Formalized in the *Soma Machine 
Observatory Guide* and *Chats Vol 6/7* (*[373–377, 537–539]*), observatory mode turns the projector into a planetarium tour where H-AL narrates stops, triggers causal perturbations ("pokes"), and visualizes the universe as an unbroken "3D blue rubber ball" where particles are excited knots in the field (*Chats Vol 6 [374–375]*). * **Alpine Holographic Projection**: Earlier field experiments ("Station 
Infinity-Zero" at Klöntalersee) conceptualized projecting active stereoscopic feeds onto 2×3m silver-infused **HoloGauze** mesh screens, creating a transparent, volumetric "Pepper's ghost" illusion floating against the dark alpine night (*Chats Vol 1 [22–26]*; *Chats Vol 2 [31, 35–39]*; *Chats Vol 5 [239, 290–293]*).

---

### 2. Stops Gaining Most from 3D Depth & Stereoscopic Parallax Layering

#### Stops That Gain the Most
1. **The Landscape of States (City of Code, Country, Mountains)**: True volumetric depth turns the Hopfield Hamiltonian \\(H(\mathbf{e})\\) into palpable topography: deep trauma valleys, steep barrier walls, and transverse quantum tunneling trajectories that cannot be conveyed on a flat plot (*Chats 
Vol 6 [283–285, 444]*; *Field Atlas [458–461]*).
2. **The Limbic Hinge (\\(D_8\\) Hořava–Witten Orbifold)**: Represents a dimensional constriction where the 7D somatic substrate (\\(D_{1\text{--}7}\\)) condenses down to a 1D line segment before blossoming into the 3D cortical network (\\(D_{9\text{--}11}\\)) (*Chats Vol 7 [5]*; *Field Atlas [6]*).
3. **The Dyad (Scale \\(10^1\text{ m}\\))**: Two distinct bodies facing each other across space, showing interpersonal distance, delayed coupling kernels \\(G_{AB}(t-\tau)\\), and Arnold tongue frequency-locking waves meeting at the intersubjective contact boundary (*Chats Vol 6 [7, 8]*; *Field Atlas [9]*).
4. **The Jellyfish Human & Body-to-Field**: Solves the UI "occlusion problem" (*Chats Vol 6 [354–358]*) by volumetrically separating the physical skeleton from the surrounding CEMI field and peripheral nerve tract (*Chats Vol 4 [147–153, 161–163]*).
5. **Thought & Neuron/Memory Network**: Visualizes 3D synaptic volumes and dendritic arbors where noise-driven threshold crossings (\\(\phi \ge T_c\\)) condense into conscious poles or Mandelbulb geometry (*Chats Vol 6 [10]*; *Chats Vol 7 [362–364]*; *Fractal Thesis [11]*).

#### Parallax Staging (Where Things Should Sit) * **Screen Plane (Zero Parallax / \\(Z = 0\\))**: The physical anatomical substrate—the grey 4D humanoid wireframe, bone/organ boundaries, and the baseline coordinate floor (*Field Atlas [6, 12]*; *Chats Vol 4 [158–160]*). 
Anchoring the physical body at the screen plane anchors the viewer's convergence and avoids frame-edge clipping. * **Behind the Screen Plane (Positive Parallax / Deep Space / \\(Z < 0\\))**: 
The internal anatomy (spinal cord, deep limbic structures like the amygdala), the deep valleys of trauma attractor basins, the distant background country/mountains, and the cosmic starfield (*Chats Vol 4 [194, 283–284]*; *Field Atlas [6, 13]*). * **In Front of the Screen Plane (Negative Parallax / Pop-Out into Room / \\(Z 
> 0\\))**: The active 8D CEMI/propagator envelope (\\(P_3\\) cyan/green field),
"thought sparks" crossing \\(T_c\\), transient impulse shockwaves radiating outward from an interactive "poke" \\(J(t)\\), and the shared interference ripples meeting at the dyadic boundary (*Chats Vol 4 [14, 15]*; *Chats Vol 7 [16, 17]*; *Fractal Thesis [11]*).

---

### 3. Cautions
 * **Comfort & Motion Sickness (Vestibular Vulnerability & VAC)**:
  * In autistic and neurodivergent individuals, rapid vestibular and visual shifts can induce acute sensory overload, nausea, and disorientation (*Willey in Attwood, The Complete Guide to Asperger's Syndrome [546–547]*).
  * Rapidly traversing 61 orders of magnitude in stereoscopic 3D on a 100-inch screen risks severe simulator sickness. The app's **Display Smoothing Slider (\\(\tau_{\text{zoom}}\\) / LERP)** must be engaged to smoothly ease camera and vertex transitions rather than snapping between scales (*Chats Vol 6 [318–320, 
410, 422, 846]*). Use the `FIELD DEPTH` dimmer to prevent intense background shader glare (*Chats Vol 4 [193–194]*). * **Clinical Setting & Client Safety**:
  * The *Field Atlas*, *Operator Spec*, and *Fractal Thesis* explicitly mandate that the Soma Machine is a **non-medical, educational and research instrument**, not a diagnostic or therapeutic medical device (*Field Atlas [18]*; *Fractal Thesis [19, 20]*; *Chats Vol 6 [21, 22]*).
  * Aggressive, looming 3D stimuli (such as "spikey" high-tension shaders driven by large Hamiltonian gradients \\(|\nabla H|\\)) can trigger sympathetic hyperarousal, freeze states, or flashback intrusion in clients with C-PTSD (*Chats Vol 1 [23]*; *Chats Vol 6 [24-26]*). Grounding must remain rooted in the client's own felt interoceptive sense ("the human is the sensor"), not an overwhelming digital spectacle (*Ruella Frank, Body of Awareness [27]*; *Chats 
Vol 2 [593–594]*). * **Evidence Labels in 3D Space**:
  * Floating 3D text (such as KaTeX equations and claim badges) creates severe binocular rivalry and depth clipping if placed at inconsistent parallax planes (*Chats Vol 4 [131–132, 142–143, 150]*).
  * The sources mandate keeping the telemetry ledger, KaTeX formulas, and claim badges (`[FORMAL]`, `[SOURCED]`, `[INTERPRETIVE]`, `[OPEN-HYPOTHESIS]`) pinned to a **flat, transparent, 2D Heads-Up Display (HUD)** plane anchored to the screen bezels in clean Space Mono/Syne typography (*Chats Vol 4 [142–143, 150, 
406]*; *Fractal Thesis [4, 28, 29]*), completely decoupled from stereoscopic eye separation.

---

🧭 Would you like to map out the exact Three.js camera convergence and interaxial separation parameters needed in `StereoEffect.js` for a 100-inch projection throw?
