# OpenStax survey for the course book (ISS-041)

Status: 2026-10-04. Books are kept outside the repo in
`C:\Users\alist\OneDrive\tmp\books\openstax\` (maths and physics) and the
existing book folders listed in `BASELINE-SOURCES.md`.

## Licences (checked 2026-10-04 on each downloaded copy's copyright page)

The licence travels with the copy. A Creative Commons licence cannot be
withdrawn from a copy already released, so what matters is the licence printed
on the copyright page of the PDF actually used.

| Book | Copy | Licence | Use in the course book |
|:--|:--|:--|:--|
| Precalculus (1st edition, retired, 2017) | `openstax/Precalculus-1e-retired.pdf` | CC BY 4.0 | adapt text and figures, with credit |
| Algebra and Trigonometry (1st edition, retired) | `openstax/Algebra-and-Trigonometry-1e-retired.pdf` | CC BY 4.0 | adapt, with credit |
| Introductory Statistics (1st edition, retired) | `openstax/Introductory-Statistics-1e-retired.pdf` | CC BY 4.0 | adapt, with credit |
| College Physics (1st edition, retired) | `openstax/College-Physics-1e-retired.pdf` | CC BY 4.0 | adapt, with credit |
| Physics (high school, live) | `openstax/Physics.pdf` | CC BY 4.0 | adapt, with credit |
| Statistics (high school, live) | `openstax/Statistics.pdf` | CC BY 4.0 | adapt, with credit |
| Calculus Volumes 1-3 | `openstax/Calculus-Volume-*.pdf` | CC BY-NC-SA 4.0 | survey and reference only; write our own |
| University Physics Volumes 1-3 | `openstax/University-Physics-Volume-*.pdf` | CC BY-NC-SA 4.0 | survey and reference only; write our own |
| Biology 2e (2018 copy) | Calibre | CC BY 4.0 (printed in this copy) | adapt from this copy only |
| Psychology 2e (2020 copy) | `Psychology2e_WEB.pdf` | CC BY 4.0 (printed in this copy) | adapt from this copy only |
| Astronomy 2e (2022 copy) | `Astronomy_2e-WEB.pdf` | CC BY 4.0 (printed in this copy) | adapt from this copy only |

The current online editions of Biology 2e, Astronomy 2e, Psychology 2e,
Chemistry 2e and Introduction to Philosophy are now listed by OpenStax as
CC BY-NC-SA 4.0. Do not download newer copies of these as reuse sources.
"OpenStax" and its logo are trademarks: the course book may follow the style,
not the name.

Credit line for adapted material: "Adapted from *Title* (OpenStax, Rice
University), CC BY 4.0, https://openstax.org/...". Changes must be indicated.

## NotebookLM survey

Purpose: a coverage map, not text. For each concept the course needs, find the
best OpenStax treatment, its figures and its prerequisites, with citations. The
exact work (licences, text, figure code) is then done in the repo.

**Notebook:** a new private notebook, `openstax-maths`. Upload all twelve PDFs
from `openstax/`; every file is under NotebookLM's 200 MB per-source limit.
College Physics was 251 MB as published, so its images were reduced to
150 dpi with Ghostscript (`-dPDFSETTINGS=/ebook`, now 55 MB, all 1,568 pages
and the licence page intact). Use the original download, not this copy, if
figures are ever adapted for print.

Ask each question separately. Ask for page citations every time.

1. **Prerequisite chain.** "List the chain of prerequisites, in teaching order,
   needed to understand a damped driven harmonic oscillator and its solution.
   For each step give the book, section number and page."
2. **Functions, exponentials and logarithms.** "Which sections best teach
   exponential growth and decay, half-life, and logarithmic scales (including
   orders of magnitude)? Which figures show them? Cite book, section, page."
3. **Derivatives as rates.** "Which sections introduce the derivative as a rate
   of change and as a slope, with physical examples? Which figures?"
4. **Integrals as area and accumulation.** "Which sections teach the definite
   integral as an area between limits and as accumulation, with shaded-area
   figures? List the figures."
5. **Flux and the divergence idea.** "Where is flux through a closed surface
   (Gauss's law) introduced most simply? Which figures show field lines
   crossing a surface?"
6. **Oscillators and resonance.** "Which sections cover simple harmonic motion,
   damping, driven oscillations and resonance (including quality factor or
   width of resonance)? Which figures?"
7. **Waves and superposition.** "Which sections cover travelling waves,
   standing waves on a string, superposition and interference? Which figures
   show standing-wave modes and interference patterns?"
8. **Complex numbers.** "Where are complex numbers introduced, including the
   complex plane and Euler's formula, if anywhere? If not covered, say so."
9. **Vectors and fields.** "Which sections introduce vectors and vector fields
   (electric field lines, gravitational field) with the clearest figures?"
10. **Linear algebra.** "Do any of these books cover matrices, eigenvalues or
    eigenvectors? If so, where; if not, say so."
11. **Probability and the Boltzmann factor.** "Which sections cover probability
    distributions, the normal distribution, and the Boltzmann factor or
    thermal energy kT? Cite figures."
12. **Modern physics.** "Which sections cover photons, the hydrogen spectrum,
    de Broglie waves and the uncertainty principle at the simplest level?"
13. **Gravity, relativity, cosmology.** "Which sections cover gravitational time
    dilation, Hubble's law, the cosmic microwave background and dark matter?"
14. **Visualisation inventory.** "For each of these concepts - Green's function
    or impulse response, convolution, resonance curve, potential well, energy
    landscape with two minima - is there a figure in these books? Give book,
    figure number and page, or say none."
15. **Gaps.** "Which of these topics are not covered anywhere in these books:
    Green's functions, convolution, Fourier transforms, eigenvalues, Langevin
    equation, Kuramoto synchronisation?"

Record the answers (with citations) in this file under "Survey results", one
heading per question. The chapter plan for ISS-041 is drafted from them.

## Survey results

Run 2026-10-05 (`ask_batch.py`, 12 PDFs; Statistics.pdf would not upload). Page
numbers are NotebookLM's and should be checked against the PDF before quoting.
Prefer the CC BY books (table above) when a topic appears in both kinds.

**Headline:** OpenStax covers the elementary toolkit well (functions,
exponentials and logarithms, derivatives, integrals, oscillators and resonance,
waves, vectors, probability). It does **not** cover Green's functions,
convolution, Fourier transforms, eigenvalues, the Langevin equation or Kuramoto
synchronisation (question 15): the course book must write those itself, and
they are the core of the programme's grammar.
Asked 15 questions of `openstax-maths` (12 PDF sources) by `apps/instrument/mother/ask_batch.py`.

### 1. Prerequisite chain

Here is the chain of prerequisites, structured in pedagogical order, needed to build a complete mathematical and physical understanding of a **damped driven harmonic oscillator** and its solution:

---

### **1. Physical Modeling Base: Hooke's Law & Restoring Forces**
* **Book:** *College Physics* / *University Physics Volume 1* [1-3]
* **Section:** Section 16.1 ("Hooke’s Law: Stress and Strain Revisited") / Section 15.1 ("Simple Harmonic Motion") [4, 5]
* **Pages:** Page 667 (*College Physics*) / Page 729 (*University Physics Volume 1*) [1, 3]
* **Core Concept:** Understanding that restoring forces are directly proportional to displacement and act in the opposite direction (\\(F = -kx\\)), providing the fundamental physical mechanism for harmonic oscillations [1-3].

---

### **2. Classical Oscillations: Simple Harmonic Motion (Undamped, Unforced)**
* **Book:** *Calculus Volume 3* / *University Physics Volume 1* [5-7]
* **Section:** Section 7.3 ("Applications") / Section 15.1 ("Simple Harmonic Motion") [5-7]
* **Pages:** Pages 767–768 (*Calculus Volume 3*) / Pages 728–734 (*University Physics Volume 1*) [5-7]
* **Core Concept:** Applying Newton's second law (\\(m a = -kx\\)) to derive the ideal second-order differential equation \\(m x'' + kx = 0\\) (or \\(x'' + \omega_0^2 x = 0\\)) and its basic sinusoidal solutions \\(x(t) = A \cos(\omega_0 t + \phi)\\) [8-10].

---

### **3. Mathematical Foundation: Second-Order Linear Homogeneous Differential Equations**
* **Book:** *Calculus Volume 3* [7]
* **Section:** Section 7.1 ("Second-Order Linear Equations") [7]
* **Pages:** Pages 744–755 [7]
* **Core Concept:** Learning to solve homogeneous linear second-order equations with constant coefficients (\\(a y'' + b y' + c y = 0\\)) using characteristic equations (\\(a r^2 + b r + c = 0\\)) and Euler's formula to handle real, repeated, or complex conjugate roots [11-13].

---

### **4. Physical & Mathematical Synthesis: Damped Harmonic Motion (Unforced)**
* **Book:** *Calculus Volume 3* / *University Physics Volume 1* [6, 7, 14]
* **Section:** Section 7.3 ("Applications") / Section 15.5 ("Damped Oscillations") [6, 7, 14]
* **Pages:** Pages 769–772 (*Calculus Volume 3*) / Pages 751–754 (*University Physics Volume 1*) [7, 14, 15]
* **Core Concept:** Adding a velocity-dependent drag force (\\(F_d = -b v\\)) to form \\(m x'' + b x' + kx = 0\\) [15, 16]. Applying the characteristic equation categorizes the resulting motion into **overdamped**, **critically damped**, and **underdamped** regimes [17-19].

---

### **5. Mathematical Foundation: Nonhomogeneous Linear Differential Equations**
* **Book:** *Calculus Volume 3* [7]
* **Section:** Section 7.2 ("Nonhomogeneous Linear Equations") [7]
* **Pages:** Pages 756–766 [7]
* **Core Concept:** Solving nonhomogeneous equations (\\(a y'' + b y' + c y = f(x)\\)) by constructing the general solution as \\(y(t) = y_c(t) + y_p(t)\\), combining the complementary solution \\(y_c(t)\\) with a particular solution \\(y_p(t)\\) via the method of undetermined coefficients or variation of parameters [20-23].

---

### **6. Final Synthesis: Damped Driven Harmonic Oscillator & Its Solution**
* **Book:** *Calculus Volume 3* / *University Physics Volume 1* [7, 24, 25]
* **Section:** Section 7.3 ("Applications") / Section 15.6 ("Forced Oscillations") [7, 24, 26]
* **Pages:** Pages 772–775 (*Calculus Volume 3*) / Pages 754–758 (*University Physics Volume 1*) [7, 24, 25]
* **Core Concept:** Solving \\(m x'' + b x' + kx = F_0 \cos(\omega t)\\) [24, 25]. The full solution consists of a **transient solution** \\(x_c(t)\\) (which decays over time due to damping) and a **steady-state solution** \\(x_p(t)\\) driven by the external force, allowing analysis of amplitude responses and **resonance** [24, 25, 27, 28].

---

🎯 Would you like to walk through a concrete numerical example of solving a damped driven harmonic oscillator step-by-step using these techniques?

Sources cited: College-Physics-1e-retired.pdf, Physics.pdf, University-Physics-Volume-1.pdf, Calculus-Volume-3.pdf.

### 2. Functions, exponentials and logarithms

Here are the sections and figures across the uploaded textbooks that best cover **exponential growth and decay**, **half-life**, and **logarithmic scales (including orders of magnitude)**:

---

### **1. Exponential Growth and Decay**

* **Algebra and Trigonometry 1e**
  * **Section 6.1 ("Exponential Functions")**, Pages 464, 468, 471 [1-3]:
    * Defines constant rate multiplicative increase/decrease [4].
    * **Figure 1** (Page 468): Graph of the parent exponential function \\(f(x) = 2^x\\) [2].
    * **Figure 2** (Page 468): Compares exponential growth (\\(B(x) = 100(1.5)^x\\)) against linear growth (\\(A(x) = 100 + 50x\\)) over time [2, 5].
    * **Figure 4** (Page 471): Graph of exponential decay \\(f(x) = 2.4492(0.6389)^x\\) [3].
  * **Section 6.7 ("Exponential and Logarithmic Models")**, Pages 537–539 [6-8]:
    * Details continuous models \\(y = A_0 e^{kt}\\) [9, 10].
    * **Figure 2** (Page 538): Graph of exponential growth \\(y = 2e^{3x}\\) [7, 8].
    * **Figure 3** (Page 538): Graph of exponential decay \\(y = 3e^{-2x}\\) [7, 8].
    * **Figure 4** (Page 539): General model showing growth (\\(k > 0\\)) vs. decay (\\(k < 0\\)) [11].
    * **Figure 5** (Page 539): Bacterial population growth curve \\(y = 10e^{(\ln 2)t}\\) [12].

* **Precalculus 1e**
  * **Section 4.1 ("Exponential Functions")**, Pages 328, 344 [13-15]:
    * **Figure 2** (Page 328) & **Figure 4** (Page 344): Growth comparison graphs and decay modeling [14, 16].
  * **Section 4.7 ("Exponential and Logarithmic Models")**, Pages 401–403 [17-19]:
    * **Figures 2 & 3** (Page 402): Graphs of \\(y = 2e^{3x}\\) (growth) and \\(y = 3e^{-2x}\\) (decay) [18, 19].
    * **Figure 4** (Page 403): Characteristics of \\(y = A_0 e^{kt}\\) for \\(k > 0\\) and \\(k < 0\\) [20].
    * **Figure 5** (Page 403): Population growth graph \\(y = 10e^{(\ln 2)t}\\) [21].

* **Calculus Volume 1 & Calculus Volume 2**
  * **Section 6.8 (Vol 1)** / **Section 2.8 (Vol 2) ("Exponential Growth and Decay")**, Pages 338+ (Vol 1) [22, 23]:
    * Derives \\(y' = ky\\) and formulates growth/decay differential equations [24, 25].
    * **Figure 6.79 / Figure 2.79**: Bacterial exponential growth curve [26-28].
    * **Figure 6.80 / Figure 2.80**: Representative exponential decay curve [25, 29].

* **Physics**
  * **Section 1.4 ("Using Logarithmic Scales in Graphing")** [30, 31]:
    * **Figure 1.28(d)**: Graph illustrating an exponential relationship [30, 31].

---

### **2. Half-Life**

* **Algebra and Trigonometry 1e**
  * **Section 6.7 ("Exponential and Logarithmic Models")**, Pages 534, 539–540 [32-34]:
    * Covers radioactive decay modeling using \\(A(t) = A_0 e^{kt}\\) where \\(k = \frac{\ln(0.5)}{T}\\) [33, 35, 36].
    * **Table 1** (Page 534): Lists half-lives of common radioactive isotopes (Carbon-14, Uranium-235, etc.) [32].

* **Precalculus 1e**
  * **Section 4.7 ("Exponential and Logarithmic Models")**, Pages 398, 403–404 [37-39]:
    * **Table 1** (Page 398): Half-lives for radioactive isotopes [37, 40].

* **Physics**
  * **Section 22.3 ("Half Life and Radiometric Dating")**, Pages 773–779 [41, 42]:
    * Formulates radioactive half-life \\(t_{1/2}\\) and decay activity \\(R\\) [42, 43].
    * **Figure 22.24**: Exponential decay graph showing sample reduction across successive half-lives (\\(t_{1/2}, 2t_{1/2}, 3t_{1/2}, \dots\\)) [42, 44].

* **University Physics Volume 3**
  * **Section 10.3 ("Radioactive Decay")**, Pages 122–124 [45, 46]:
    * **Figure 10.9**: Plot of the radioactive decay law \\(N = N_0 e^{-\lambda t}\\) marking half-life \\(T_{1/2}\\) and \\(2T_{1/2}\\) [45, 46].

* **Calculus Volume 1 & Calculus Volume 2**
  * **Section 6.8 (Vol 1) / Section 2.8 (Vol 2)**:
    * Defines constant half-life for decaying systems as \\(T_{\text{half}} = \frac{\ln 2}{k}\\) [47-51].

---

### **3. Logarithmic Scales and Orders of Magnitude**

* **University Physics Volume 1**
  * **Section 1.3 ("Order of Magnitude")**, Pages 118–121 [52, 53]:
    * Details taking base-10 logarithms to round scale values and using \\(\sqrt{10} \approx 3.16\\) as a rounding cutoff in scientific notation [52-54].

* **Physics**
  * **Section 1.2 ("Order of Magnitude")** & **Section 1.4 ("Using Logarithmic Scales in Graphing")** [31, 55, 56]:
    * Defines order of magnitude as powers of 10 and explains base-10 log scales, semi-log plots, and log-log plots [31, 55, 56].
    * **Figure 1.29(a)**: Semi-log plot of the Richter scale (microns of ground motion vs. linear intensity level 1–10) [56, 57].
    * **Figure 1.29(b)**: Log-log plot showing the inverse relationship between frequency and wavelength [56, 57].

* **College Physics**
  * **Section 1.2 ("Order of Magnitude")**, Page 61 [58]:
    * Defines orders of magnitude in metric power scales [58].
  * **Section 13.3 ("Thermal Expansion")**, Page 63 [59]:
    * **Figure 13.8**: Vertical logarithmic scale showing natural temperatures spanning powers of 10 from \\(10^{-10}\text{ K}\\) to \\(10^{12}\text{ K}\\) [59].

* **Algebra and Trigonometry 1e**
  * **Section 6.2 ("Logarithmic Functions")**, Pages 492, 496 [60, 61]:
    * **Figure 2** (Page 492): Graph of \\(y = 10^x\\) used to compute magnitude differences on the Richter scale [60, 62].
  * **Section 6.7 ("Exponential and Logarithmic Models")**, Pages 538, 551 [8, 63]:
    * Defines orders of magnitude in scientific notation [8, 64].
    * **Exercises 47–48** (Page 551): Diagrams of logarithmic scale number lines [63].

* **Precalculus 1e**
  * **Section 4.2 ("Logarithmic Functions")**, Pages 356, 360 [65, 66]:
    * **Figure 2** (Page 356): Graph of \\(y = 10^x\\) for calculating earthquake magnitude differences [65, 67].
  * **Section 4.7 ("Exponential and Logarithmic Models")**, Pages 402, 416 [19, 68]:
    * **Exercises 46–47** (Page 416): Logarithmic scale line figures [68, 69].

---

📈 Would you like to create a study guide or practice problem set combining these exponential and logarithmic concepts?

Sources cited: Algebra-and-Trigonometry-1e-retired.pdf, Precalculus-1e-retired.pdf, Calculus-Volume-1.pdf, Calculus-Volume-2.pdf, Physics.pdf, University-Physics-Volume-3.pdf, University-Physics-Volume-1.pdf, College-Physics-1e-retired.pdf.

### 3. Derivatives as rates

The textbooks in your uploaded collection introduce the derivative as both a rate of change and a geometric slope through the following sections, physical examples, and figures:

---

### **1. Calculus Volume 1**

* **Section 2.1 ("A Preview of Calculus")**, Pages 106–108:
  * **Concepts & Physical Examples:** Introduces the "tangent problem" by showing how secant line slopes approximate the slope of a tangent line (rate of change) [1, 2]. Connects this concept to physics through average and instantaneous velocity (e.g., position/speed of a dropped object) [3, 4].
  * **Figures:**
    * **Figure 2.5** (Page 106/107): Shows secant lines approaching the tangent line at \\(a\\) as \\(x \to a\\) [2].
    * **Figure 2.6** (Page 107): Illustrates solving the tangent problem as secant lines approach the tangent line [2, 5].
    * **Figure 2.7** (Page 108): Shows secant lines to \\(f(x) = x^2\\) providing closer approximations to the tangent line at \\(x=1\\) [6].

* **Section 3.1 ("Defining the Derivative")**, Pages 188–198:
  * **Concepts & Physical Examples:** Defines the derivative formally as the limit of a difference quotient, representing both the slope of the tangent line and the instantaneous rate of change [7, 8]. Physical examples include a rock dropped from a height (\\(s(t) = -16t^2 + 64\\)) [9], an oscillating weight on a spring (\\(s(t) = \sin t\\)) [8], and the acceleration/rate of change of velocity of the Hennessey Venom GT super car [8].
  * **Figures:**
    * **Figure 3.3** (Page 190): Demonstrates two methods for calculating the slope of a secant line [10].
    * **Figure 3.8** (Page 196/197): Contrasts average velocity (green secant line slope) with instantaneous velocity (red tangent line slope) [11].
    * **Figure 3.10** (Page 198): Graph/photo of the Hennessey Venom GT illustrating rate of change of velocity [8].

* **Section 3.2 ("The Derivative as a Function")**, Pages 203–206:
  * **Concepts:** Connects the derivative function \\(f'(x)\\) to the slope of tangent lines across a domain, explaining Leibniz notation (\\(\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x}\\)) as an instantaneous rate of change [12, 13].
  * **Figures:**
    * **Figure 3.11** (Page 206): Illustrates \\(\Delta x\\) and \\(\Delta y\\) on a secant line approaching the tangent line to define \\(\frac{dy}{dx}\\) [13].

* **Section 3.4 ("Derivatives as Rates of Change")**, Pages 230–232:
  * **Concepts & Physical Examples:** Dedicated application section interpreting the derivative as an instantaneous rate of change, focusing on 1D motion (velocity \\(v(t) = s'(t)\\) as rate of change of position, acceleration \\(a(t) = v'(t)\\) as rate of change of velocity) [14, 15].
  * **Figures:**
    * **Figure 3.22** (Page 231): Shows function estimation using initial value plus rate of change times change in interval [14, 15].
    * **Figure 3.23** (Page 232): Graph of position curve \\(s(t) = -16t^2 + 64\\) for a dropped object [15].

---

### **2. University Physics Volume 1**

* **Section 3.2 ("Instantaneous Velocity and Speed")**, Pages 115–118:
  * **Concepts & Physical Examples:** Introduces instantaneous velocity as the time derivative of position (\\(v(t) = \frac{dx}{dt}\\)), defining it as the slope of the tangent line on a position-versus-time graph \\(x(t)\\) [16-18].
  * **Figures:**
    * **FIGURE 3.6** (Page 115): Position vs. time graph demonstrating average velocity secant lines approaching the tangent line slope (instantaneous velocity) [16, 17].
    * **FIGURE 3.7 & FIGURE 3.8** (Pages 116–117): Position vs. time graph and corresponding velocity vs. time graph showing positive, zero, and negative slopes [17, 19].
    * **FIGURE 3.9** (Page 118): Compares position \\(x(t)\\), velocity \\(v(t)\\), and speed graphs, highlighting that the slope of the position curve at any point equals the velocity [20, 21].

* **Section 3.3 ("Average and Instantaneous Acceleration")**, Pages 123–124:
  * **Concepts & Physical Examples:** Defines instantaneous acceleration as the derivative of velocity (\\(a(t) = \frac{dv}{dt}\\)), which equals the slope of the tangent line on a velocity-versus-time graph [21, 22].
  * **Figures:**
    * **FIGURE 3.14** (Page 123): Velocity vs. time graph showing average acceleration approaching the tangent line slope (instantaneous acceleration) as \\(\Delta t \to 0\\) [21].
    * **FIGURE 3.15** (Page 124): Linear velocity graph with negative constant slope representing constant negative acceleration [23].

---

### **3. College Physics**

* **Section 2.3 ("Position vs. Time Graphs")**, Pages 78–80:
  * **Concepts & Physical Examples:** Explains that the slope at any point on a position-versus-time graph represents the instantaneous velocity, found by taking the slope of a straight line tangent to the curve at that point [24, 25]. Uses the physical example of a jet-powered car speeding down a track [24, 25].
  * **Figures:**
    * **Figure 2.48** (Page 78): Position vs. time curve for a jet car showing tangent lines drawn at points P and Q to find instantaneous velocity [24, 26].
    * **Figure 2.50** (Page 80): Demonstrates finding the slope of the tangent line at point Q to calculate instantaneous velocity (\\(140\text{ m/s}\\)) [25, 27].

---

### **4. Physics**

* **Section 2.3 ("Position vs. Time Graphs") & Section 2.4 ("Velocity vs. Time Graphs")**, Pages 62–64:
  * **Concepts & Physical Examples:** Establishes that the slope of a position vs. time graph gives instantaneous velocity, while the slope of a velocity vs. time graph gives acceleration [28, 29]. Features a jet-powered car accelerating on the Bonneville Salt Flats [30, 31].
  * **Figures:**
    * **FIGURE 2.13 / FIGURE 2.17** (Pages 62, 64): Position vs. time graph of a jet car with tangent lines drawn at two points, illustrating instantaneous velocity as tangent slope [29, 32].
    * **FIGURE 2.18** (Page 64): Velocity vs. time graph showing a constant positive slope, which represents acceleration (rate of change of velocity) [28].

Sources cited: Calculus-Volume-1.pdf, University-Physics-Volume-1.pdf, College-Physics-1e-retired.pdf, Physics.pdf.

### 4. Integrals as area and accumulation

The textbooks in your uploaded collection introduce the **definite integral** as both an **area bounded between limits** and an **accumulation of change**, supported by shaded-area diagrams:

---

### **1. Calculus Volume 1**

#### **A. Definite Integral as Area Between Limits**
* **Section 5.1 ("Approximating Areas")**, Pages 438–455 [1, 2]:
  * **Core Concept:** Introduces calculating the exact area bounded under a continuous curve \\(f(x)\\), above the \\(x\\)-axis, and between limits \\(x = a\\) and \\(x = b\\) using limits of Riemann sums [2-4].
  * **Shaded-Area Figures:**
    * **Figure 5.2** (Page 439/440) [4]: Shows the shaded region \\(A\\) bounded by \\(f(x)\\) at the top, the \\(x\\)-axis at the bottom, \\(x = a\\) to the left, and \\(x = b\\) to the right [4].
    * **Figure 2.8 & Figure 2.9** (Pages 109–110) [3]: Illustrates a shaded region under a curve approximated by thin rectangular strips [3].
* **Section 5.2 ("The Definite Integral")**, Pages 456–471 [1, 5]:
  * **Core Concept:** Formally defines the definite integral \\(\int_a^b f(x)\,dx\\) as the **net signed area** between limits \\(a\\) and \\(b\\) (subtracting shaded areas below the \\(x\\)-axis from shaded areas above) [6-8].
  * **Shaded-Area Figures:**
    * **Figure 5.17** (Page 461/462) [6, 7]: Shows rectangular approximations for a curve with shaded regions above and below the \\(x\\)-axis [6, 7].
    * **Figure 5.18** (Page 462) [7]: Demonstrates that in the limit, the definite integral equals shaded area \\(A_1\\) (above the axis) minus shaded area \\(A_2\\) (below the axis) [7].
    * **Figure 5.21** (Page 464) [9]: Shows equal shaded areas above and below the \\(x\\)-axis resulting in a net signed area of zero [9].
    * **Figure 5.22** (Page 465) [10]: Displays shaded triangular regions \\(A_1\\) and \\(A_2\\) for \\(f(x) = x - 2\\), illustrating net signed area versus total area [10].
* **Section 6.1 ("Areas between Curves")**, Pages 540–550 [11, 12]:
  * **Core Concept:** Extends the definite integral to calculate the total shaded area enclosed between two functions \\(f(x)\\) and \\(g(x)\\) over limits \\([a, b]\\) via \\(\int_a^b [f(x) - g(x)]\,dx\\) [13, 14].
  * **Shaded-Area Figures:**
    * **Figure 6.2** (Page 540) [13]: Shows the shaded region bounded between two function graphs \\(f(x)\\) and \\(g(x)\\) over \\([a, b]\\) [13].
    * **Figure 6.3** (Page 541) [15]: Displays rectangular Riemann sum approximations across a shaded region between two curves [15].
    * **Figure 6.4** (Page 542) [16]: Displays a shaded region between \\(f(x) = 9 - (x/2)^2\\) and \\(g(x) = 6 - x\\) [16].
    * **Figure 6.5** (Page 543) [17]: Shows the shaded region bounded between two intersecting curves [17].
    * **Figure 6.10** (Page 547) [18]: Shows a shaded area between curves integrated with respect to \\(y\\) [18].

#### **B. Definite Integral as Accumulation**
* **Section 5.3 ("The Fundamental Theorem of Calculus")**, Pages 472–487 [1, 19]:
  * **Core Concept:** Introduces the **accumulation function** \\(g(x) = \int_a^x f(t)\,dt\\), which represents the accumulated area/quantity under \\(f(t)\\) from a fixed lower limit \\(a\\) to a variable limit \\(x\\) [20].
  * **Shaded-Area Figures:**
    * **Figure 5.27** (Page 474) [21]: Displays the shaded area under \\(f(x) = x^2\\) over \\([6]\\), illustrating the Mean Value Theorem for Integrals [21].
    * **Figure 5.28** (Page 478) [22]: Shows a shaded region below the \\(x\\)-axis for \\(f(t) = t^2 - 4\\) over \\([-2, 2]\\) [22].
* **Section 5.4 ("Integration Formulas and the Net Change Theorem")**, Pages 488–505 [1, 23]:
  * **Core Concept:** Establishes the **Net Change Theorem** (\\(\int_a^b F'(x)\,dx = F(b) - F(a)\\)), demonstrating that integrating a rate of change accumulates the net total change in a quantity between limits \\(a\\) and \\(b\\) [23, 24].

---

### **2. Calculus Volume 2**

#### **A. Definite Integral as Area Between Limits**
* **Section 1.1 ("Approximating Areas")**, Pages 6–23 [25, 26]:
  * **Core Concept:** Approximating area under a curve between limits \\(a\\) and \\(b\\) using thin rectangles [26, 27].
  * **Shaded-Area Figure:**
    * **Figure 1.2** (Page 7) [27]: Bounded shaded region \\(A\\) under curve \\(f(x)\\) between \\(x = a\\) and \\(x = b\\) [27].
* **Section 1.2 ("The Definite Integral")**, Pages 24–39 [25, 28]:
  * **Core Concept:** Defines \\(\int_a^b f(x)\,dx\\) as net signed area between limits [28, 29].
  * **Shaded-Area Figures:**
    * **Figure 1.16** (Page 31) [30]: Displays the shaded area under the semicircle \\(f(x) = \sqrt{9 - (x-3)^2}\\) over interval \\([6, 31]\\) [30].
    * **Figure 1.17 & Figure 1.18** (Page 32) [29]: Shows shaded areas \\(A_1\\) (above \\(x\\)-axis) and \\(A_2\\) (below \\(x\\)-axis) illustrating net signed area [29].
    * **Figure 1.19** (Page 33) [32]: Shows equal shaded regions above and below the axis cancelling to zero net area [32].
    * **Figure 1.21** (Page 34) [33]: Shows shaded triangular regions illustrating net signed area versus total area [33, 34].
    * **Figure 1.28** (Page 44/45) [35]: Displays a shaded region below the \\(x\\)-axis yielding a negative definite integral value [35].
* **Section 2.1 ("Areas between Curves")**, Pages 108–118 [36, 37]:
  * **Core Concept:** Definite integrals evaluating shaded regions bounded between two limits and two function curves [38, 39].
  * **Shaded-Area Figures:**
    * **Figure 2.2** (Page 108) [38]: Shows the shaded area between graphs of \\(f(x)\\) and \\(g(g)\\) over \\([a, b]\\) [38].
    * **Figure 2.3** (Page 109) [40]: Shows rectangular Riemann sum approximations of a shaded region between two curves [40].
    * **Figure 2.5** (Page 111) [41]: Displays a shaded region bounded above by \\(f(x)\\) and below by \\(g(x)\\) [41].
    * **Figure 2.7** (Page 113) [42]: Shows a complex shaded region requiring multiple integration limits [42].
    * **Figure 2.10** (Page 115) [43]: Shows a shaded region integrated along the \\(y\\)-axis [43].

#### **B. Definite Integral as Accumulation**
* **Section 1.3 ("The Fundamental Theorem of Calculus")**, Pages 40–55 [25, 44]:
  * **Core Concept:** Teaches accumulation functions \\(g(x) = \int_a^x f(t)\,dt\\) and Part 2 (Fundamental Theorem of Calculus) for calculating accumulated area between limits [45, 46].
* **Section 1.4 ("Integration Formulas and the Net Change Theorem")**, Pages 56–73 [25, 47]:
  * **Core Concept:** Connects definite integrals to accumulating the net change of a quantity from its rate of change over an interval \\([a, b]\\) [47].

---

### **3. University Physics Volume 1**

* **Section 7.2 ("Work Done by a Variable Force")**, Pages 280–285 [48]:
  * **Core Concept:** Defines physical work as the definite integral of a position-dependent force \\(W = \int_{x_1}^{x_2} F(x)\,dx\\), physically representing the accumulation of work as the area under the force-versus-position curve between limits \\(x_1\\) and \\(x_2\\) [48].
  * **Shaded-Area Figures:**
    * **FIGURE 7.8** (Page 282/283) [48]: Curve of \\(F(x)\\) versus \\(x\\) showing the shaded area of an infinitesimal strip \\(F(x)dx\\) and the sum of such areas representing total accumulated work from \\(x_1\\) to \\(x_2\\) [48].
    * **FIGURE 7.9** (Page 283) [48]: Graph of force \\(F(x) = -kx\\) with shaded positive and negative triangular areas representing work done [48].

---

💡 Would you like to create a study guide or flashcards focused on evaluating definite integrals and finding areas between curves?

Sources cited: Calculus-Volume-1.pdf, Calculus-Volume-2.pdf, University-Physics-Volume-1.pdf.

### 5. Flux and the divergence idea

Flux through a closed surface and **Gauss's law** are introduced most simply in **University Physics Volume 2**, with additional mathematical treatment in **Calculus Volume 3**:

---

### **1. Primary / Conceptual Introduction**
* **Book:** *University Physics Volume 2*
* **Section 6.1 ("Electric Flux")**:
  * Introduces electric flux through both open and closed surfaces as a physical measure of the number of electric field lines crossing a given area [1-3].
  * Establishes that the net electric flux through a closed surface is zero if no enclosed charges are present inside [4].
* **Section 6.2 ("Explaining Gauss’s Law")**:
  * Formally states Gauss’s law: the net electric flux \\(\Phi_{\text{Closed Surface}}\\) through any closed surface (Gaussian surface) equals the enclosed charge \\(q_{\text{enc}}\\) divided by the permittivity of free space \\(\varepsilon_0\\) [5-7].

---

### **2. Mathematical Treatment via Vector Calculus**
* **Book:** *Calculus Volume 3*
* **Section 6.8 ("The Divergence Theorem")**:
  * Derives Gauss's law mathematically as an application of the divergence theorem, showing that for an electrostatic field \\(\mathbf{E}\\) generated by a charge, the flux across any piecewise smooth closed surface \\(S\\) equals the total enclosed charge divided by \\(\varepsilon_0\\) [8-10].

---

### **3. Figures Showing Field Lines Crossing a Surface**
* **University Physics Volume 2**:
  * **Figure 5.30** (Section 5.5): Shows electric field lines passing through imaginary surface areas \\(S\\) and \\(S'\\) to illustrate field line density [11].
  * **Figure 6.3** (Section 6.1): Shows electric field lines crossing a shaded surface area [12].
  * **Figure 6.4(a) & (b)** (Section 6.1): Shows \\(N\\) electric field lines crossing perpendicular surface \\(S_1\\) and inclined surface \\(S_2\\) [13].
  * **Figure 6.7** (Section 6.1): Depicts electric field lines crossing the top and bottom faces of a closed cube placed between oppositely charged parallel plates [14].
  * **Figure 6.14** (Section 6.2): Shows electric field lines piercing two concentric spherical surfaces enclosing a point charge \\(q\\) [15].
  * **Figure 6.15(a)–(c)** (Section 6.2): Illustrates field lines entering and leaving closed surfaces of various shapes to explain zero vs. non-zero net flux [6, 16].
  * **Figure 6.16(a) & (b)** (Section 6.2): Shows electric field lines crossing closed Gaussian surfaces outward for a positive charge and inward for a negative charge [17].

---

⚡ Would you like to work through an example of applying Gauss's law to calculate the electric field of a symmetrical charge distribution, such as a sphere or line of charge?

Sources cited: University-Physics-Volume-2.pdf, Calculus-Volume-3.pdf.

### 6. Oscillators and resonance

Here are the sections across the uploaded textbooks that cover **simple harmonic motion (SHM)**, **damping**, **driven/forced oscillations**, and **resonance** (including the **quality factor \\(Q\\)** and **resonance width**), along with their corresponding figures:

---

### **1. University Physics Volume 1**

* **Section 15.1 ("Simple Harmonic Motion")**, Pages 728–734 [1, 2]:
  * **Topics:** Restoring force, amplitude \\(A\\), period \\(T\\), frequency \\(f\\), and natural angular frequency \\(\omega_0 = \sqrt{\frac{k}{m}}\\).
* **Section 15.5 ("Damped Oscillations")**, Pages 751–754 [1, 3-5]:
  * **Topics:** Non-conservative drag force \\(F_d = -bv\\), differential equation \\(m a = -bv - kx\\), angular frequency \\(\omega = \sqrt{\omega_0^2 - \left(\frac{b}{2m}\right)^2}\\), and classification into **underdamped**, **critically damped**, and **overdamped** regimes.
  * **Figures:**
    * **FIGURE 15.25** (Page 751): Apparatus of a mass on a spring in a viscous fluid and its damped oscillation graph [1].
    * **FIGURE 15.26** (Page 752): Position vs. time curve displaying a cosine function bounded inside an exponential decay envelope [3].
    * **FIGURE 15.27** (Page 753/754): Graph comparing underdamped (curve a: \\(b^2 < 4mk\\)), critically damped (curve b: \\(b^2 = 4mk\\)), and overdamped (curve c: \\(b^2 > 4mk\\)) motion [4, 6].
* **Section 15.6 ("Forced Oscillations")**, Pages 754–758 [5, 7-11]:
  * **Topics:** Driving periodic force \\(F(t) = F_0 \cos(\omega t)\\), transient vs. steady-state solutions, amplitude equation \\(A = \frac{F_0}{\sqrt{m^2(\omega^2 - \omega_0^2)^2 + b^2\omega^2}}\\), resonance peak at \\(\omega \approx \omega_0\\), and the **quality factor \\(Q\\)** defined as the natural frequency divided by the spread in frequency at half maximum amplitude:
    \\[
    Q = \frac{\omega_0}{\Delta \omega} \approx \frac{m \omega_0}{b}
    \\]
  * **Figures:**
    * **FIGURE 15.29** (Page 755): Paddle ball on an elastic band driven at low frequency, natural frequency \\(f_0\\) (resonance), and high frequency [8, 12].
    * **FIGURE 15.30** (Page 755): Apparatus showing forced, damped harmonic motion using a motor-driven disk [8, 9].
    * **FIGURE 15.31** (Page 756/757): Amplitude vs. driving frequency curves for small, medium, and heavy damping showing taller and narrower resonance peaks as damping decreases [10, 11, 13].
    * **FIGURE 15.32** (Page 757): Graph defining the quality \\(Q\\) via frequency width \\(\Delta \omega\\) at half maximum amplitude \\(\frac{1}{2}A\\) [11, 14].

---

### **2. University Physics Volume 2**

* **Section 15.6 ("Resonance in an AC Circuit")**, Pages 720–725 [15-17]:
  * **Topics:** Establishes the electrical analog of the driven damped harmonic oscillator using a driven series RLC circuit (\\(L \frac{d^2q}{dt^2} + R \frac{dq}{dt} + \frac{1}{C}q = V_0 \cos(\omega t)\\)) [16]. Defines **resonant frequency** \\(\omega_0 = \frac{1}{\sqrt{LC}}\\), **bandwidth** \\(\Delta \omega\\) at half-maximum power, and **quality factor**:
    \\[
    Q = \frac{\omega_0}{\Delta \omega} = \frac{\omega_0 L}{R}
    \\]
  * **Figures:**
    * **FIGURE 15.17** (Page 721): Plot of current amplitude \\(I_0\\) versus angular frequency \\(\omega\\) peaking at resonant frequency \\(\omega_0\\) [15].
    * **FIGURE 15.18** (Page 722): Plot of average power \\(\bar{P}\\) versus \\(\omega\\) illustrating the resonance bandwidth \\(\Delta \omega\\) at half-maximum power \\(\frac{V_{\text{rms}}^2}{2R}\\) [17].

---

### **3. College Physics**

* **Section 16.3 ("Simple Harmonic Motion: A Special Periodic Motion")**, Pages 669–675 [18]:
  * **Topics:** Hooke's law, restoring forces, and ideal simple harmonic oscillators [18].
  * **Figure:** **Figure 16.9** (Page 670) shows an undamped simple harmonic oscillator on a spring [18].
* **Section 16.7 ("Damped Harmonic Motion")**, Pages 690–693 [19-21]:
  * **Topics:** Energy dissipation by damping forces, period/frequency behavior, underdamping, critical damping, and overdamping [19-21].
  * **Figures:**
    * **Figure 16.22** (Page 691): Displacement vs. time plot for a lightly damped oscillator [19, 20].
    * **Figure 16.23** (Page 692): Displacement vs. time curves comparing critical damping (Curve A) and overdamping (Curve B) [20, 21].
* **Section 16.8 ("Forced Oscillations and Resonance")**, Pages 693–697 [22-25]:
  * **Topics:** Periodic driving forces, natural frequency, resonance condition, and resonance curve width dependence on damping (less damping yields narrower response) [22, 23, 25].
  * **Figures:**
    * **Figure 16.26** (Page 694): Paddle ball toy driven by a finger at low frequency, resonant frequency \\(f_0\\), and high frequency [23, 24].
    * **Figure 16.27** (Page 695): Amplitude vs. driving frequency curves for small, medium, and heavy damping showing peak height and resonance width [24-26].

---

### **4. Calculus Volume 3**

* **Section 7.3 ("Applications")**, Pages 767–775 [27-29]:
  * **Topics:** Differential equations for simple harmonic motion (\\(m x'' + kx = 0\\)), damped motion (\\(m x'' + b x' + kx = 0\\)), and forced/driven motion (\\(m x'' + b x' + kx = F_0 \cos(\omega t)\\)) [27-29]. Analyzes transient solutions, steady-state solutions, natural frequency, and resonance [28, 29].

---

### **5. Precalculus 1e**

* **Chapter 7 (Trigonometric Models / "Damped Harmonic Motion")**, Pages 624–628 [30-33]:
  * **Topics:** Trigonometric models \\(d = a \cos(\omega t)\\) for SHM and exponential envelope models \\(f(t) = a e^{-ct} \cos(\omega t)\\) for damped harmonic motion [30, 32].
  * **Figures:**
    * **Figure 13 & Figure 14** (Page 625): Graphs of SHM curves (\\(y = 6\cos(\pi t)\\) and \\(y = 5\cos(\frac{\pi}{2}t)\\)) [30].
    * **Figure 15 & Figure 16** (Pages 626–627): Graphs modeling damped harmonic motion comparing damping factors \\(c = 0.5\\) (Figure 15) and \\(c = 0.1\\) (Figure 16) [32, 33].

---

### **6. Physics**

* **Section 14.4 ("Sound Interference and Resonance")**, Pages 512–516 [34-36]:
  * **Topics:** Natural frequency, damping, forced oscillations, and acoustic/mechanical resonance [35, 36].
  * **Figures:** **FIGURE 14.18** shows paddle ball response under varying driving frequencies [36].

---

⚡ Would you like to compare the differential equations and solutions of mechanical harmonic oscillators side-by-side with their electrical RLC circuit equivalents?

Sources cited: University-Physics-Volume-1.pdf, University-Physics-Volume-2.pdf, College-Physics-1e-retired.pdf, Calculus-Volume-3.pdf, Precalculus-1e-retired.pdf, Physics.pdf.

### 7. Waves and superposition

Here are the sections and figures across the uploaded textbooks covering **travelling waves**, **standing waves on a string**, **superposition**, and **interference**:

---

### **1. University Physics Volume 1**

* **Travelling Waves:**
  * **Section 16.1 ("Traveling Waves")**, Pages 765–775: Introduces mechanical wave motion, transverse vs. longitudinal waves, wavelength \\(\lambda\\), period \\(T\\), frequency \\(f\\), and wave speed \\(v = \lambda f\\) [1-3].
* **Superposition & Interference:**
  * **Section 16.5 ("Interference of Waves")**, Pages 790–796: Details the principle of superposition, constructive and destructive interference, and phase shifts [4-6].
  * **Section 17.5 ("Interference of Sound Waves")**, Pages 830+: Applies wave interference to sound waves from two sources [7, 8].
* **Standing Waves on a String:**
  * **Section 16.6 ("Standing Waves and Resonance")**, Pages 796–805: Teaches standing wave formation by opposite-traveling waves, nodes, antinodes, normal modes, fundamental frequency, and overtones/harmonics on a fixed string [9-14].
* **Figures Showing Standing-Wave Modes:**
  * **FIGURE 16.27** (Page 798): Snapshots of a standing wave on a string identifying fixed nodes (red dots) and oscillating antinodes (blue dots) [15].
  * **FIGURE 16.28** (Page 799): Physical laboratory setup for creating standing waves on a string under tension [10].
  * **FIGURE 16.29** (Page 800): Normal modes (fundamental \\(n=1\\), second \\(n=2\\), third \\(n=3\\), fourth \\(n=4\\)) on a string of length \\(L\\) fixed at both ends [12, 13].
  * **FIGURE 16.31** (Page 802): Illustrates valid standing wave modes satisfying symmetric node boundary conditions [16, 17].
* **Figures Showing Interference Patterns:**
  * **FIGURE 16.19** (Page 790): Two pulses moving toward each other and overlapping during interference [4, 5].
  * **FIGURE 16.20 & FIGURE 16.21** (Pages 791–792): Pure constructive interference (doubled amplitude) and pure destructive interference (complete cancellation) [18, 19].
  * **FIGURE 16.22 & FIGURE 16.23** (Pages 792–793): Point-by-point superposition of linear and nonidentical waves [19, 20].
  * **FIGURE 16.24** (Page 795): Superposition of identical sinusoidal waves differing by phase shift \\(\Delta \phi\\) [21, 22].
  * **FIGURE 17.17** (Page 830): Two-speaker 2D interference pattern showing points of constructive interference (red/blue dots) and destructive interference (black dots) [7].
  * **FIGURE 17.38** (Page 850): Structured bow wake generated by constructive wave interference [23].

---

### **2. College Physics**

* **Travelling Waves:**
  * **Section 16.9 ("Waves")**, Pages 698–703: Defines transverse and longitudinal wave propagation, wave velocity, wavelength, and frequency [24-26].
* **Superposition & Interference:**
  * **Section 16.10 ("Superposition and Interference")**, Pages 703–707: Explains the algebraic addition of wave disturbances leading to constructive and destructive interference [27-29].
* **Standing Waves on a String:**
  * **Section 16.10 ("Superposition and Interference")**, Pages 705–707 (under *"Standing Waves"*): Teaches standing waves on instrument strings, nodes, antinodes, fundamental frequency, and overtones [30-33].
* **Figures Showing Standing-Wave Modes:**
  * **Figure 16.40** (Page 706): String oscillating at its fundamental frequency (\\(n=1\\)) [34].
  * **Figure 16.41** (Page 706): First overtone (\\(n=2\\)) and second overtone (\\(n=3\\)) standing wave modes on a string [34].
* **Figures Showing Interference Patterns:**
  * **Figure 16.36** (Page 704): Pure constructive interference of identical in-phase waves [28, 35].
  * **Figure 16.37** (Page 704): Pure destructive interference of out-of-phase waves [28, 35].
  * **Figure 16.38** (Page 705): Superposition of non-identical waves [30].
  * **Figure 16.45** (Page 708): Sound interference pattern produced across a room by two stereo speakers [36, 37].

---

### **3. Physics**

* **Travelling Waves:**
  * **Section 13.1 ("Types of Waves") & Section 13.2 ("Wave Properties")**: Introduces transverse, longitudinal, and periodic wave propagation along with amplitude, wavelength, and wave speed [38, 39].
* **Superposition & Interference:**
  * **Section 13.3 ("Wave Interaction: Superposition and Interference")**: Covers constructive/destructive interference and standing wave formation [40-42].
  * **Section 17.1 ("Understanding Diffraction and Interference")**: Examines wave interference patterns in light and water [43-45].
* **Standing Waves on a String:**
  * **Section 13.3 ("Wave Interaction: Superposition and Interference")**: Details standing waves created on strings by boundary reflections [46-48].
* **Figures Showing Standing-Wave Modes:**
  * **FIGURE 13.14**: Time-evolution of a standing wave formed by opposing identical waves [46, 49].
  * **FIGURE 13.15**: String oscillating in a standing wave with a single antinode loop [48].
  * **FIGURE 13.16**: String oscillating in higher standing wave modes with multiple nodes [48].
* **Figures Showing Interference Patterns:**
  * **FIGURE 13.11 & FIGURE 13.12**: Graphs of pure constructive and destructive interference [41, 46, 48].
  * **FIGURE 13.13**: Superposition of nonidentical waves [50].
  * **FIGURE 17.2(b)**: Interference pattern produced by a laser beam passing through a grid of slits [43].
  * **FIGURE 17.3**: Water wave interference pattern formed as waves pass through rock gaps [43, 51].
  * **FIGURE 17.7 & FIGURE 17.8**: Young's double-slit experiment diagrams showing light and water wave interference patterns (alternating bright and dark regions/lines) [44, 52].

---

### **4. University Physics Volume 3**

* **Superposition & Interference (Wave Optics & Quantum Waves):**
  * **Section 3.1 ("Double-Slit Interference") & Section 3.2 ("Mathematics of Interference")**, Pages 115+: Details double-slit interference, path length differences, and fringe patterns [53-56].
  * **Section 7.2 ("Two-Slit Interference of Matter Waves")**: Extends double-slit interference patterns to quantum matter waves [57, 58].
* **Figures Showing Interference Patterns:**
  * **FIGURE 3.2**: Photograph of circular water wave interference patterns in a ripple tank [53].
  * **FIGURE 3.5**: Double-slit interference pattern showing alternating bright lines (maxima) and dark regions (minima) [55].
  * **FIGURE 7.2**: Two-slit interference pattern of light and matter waves building up bright and dark fringes on a screen [57, 58].

---

🌊 Would you like to create a study guide or flashcards covering the mathematical relationships for wave speed, normal modes, and double-slit interference?

Sources cited: University-Physics-Volume-1.pdf, College-Physics-1e-retired.pdf, Physics.pdf, University-Physics-Volume-3.pdf.

### 8. Complex numbers

### **1. Complex Numbers (Introduction & Operations)**

* **Algebra and Trigonometry 1e**
  * **Section 2.4 ("Complex Numbers")**, Pages 111–118 [1-3]:
    * Introduces the imaginary unit \\(i = \sqrt{-1}\\), complex numbers in standard form \\(a + bi\\) (where \\(a\\) is the real part and \\(b\\) is the imaginary part), operations (addition, subtraction, multiplication, and division via the complex conjugate), and powers of \\(i\\) [4-8].
* **Precalculus 1e**
  * **Section 3.1 ("Complex Numbers")**, Pages 198–206 [9-11]:
    * Covers square roots of negative numbers, defining \\(a + bi\\), performing arithmetic operations, and working with complex conjugates and powers of \\(i\\) [12-16].

---

### **2. The Complex Plane & Polar Form**

* **Algebra and Trigonometry 1e**
  * **Section 2.4 ("Complex Numbers")**, Pages 112–113 [1, 17, 18]:
    * Introduces the **complex plane** as a coordinate system where the horizontal axis represents the real component and the vertical axis represents the imaginary component [17, 19]. Demonstrates plotting complex numbers as ordered pairs \\((a, b)\\) (e.g., Figures 2, 3, and 4) [17, 18].
  * **Section 10.5 ("Polar Form of Complex Numbers")**, Pages 815–825 [20-22]:
    * Connects rectangular complex numbers to the complex plane and polar coordinates \\(z = r(\cos\theta + i\sin\theta)\\) (or \\(r\text{cis}\theta\\)), defining the modulus \\(|z| = \sqrt{a^2 + b^2}\\) and argument \\(\theta\\) [23-25]. Teaches De Moivre's Theorem for powers and \\(n\text{th}\\) roots of complex numbers [26-28].

* **Precalculus 1e**
  * **Section 3.1 ("Complex Numbers")**, Pages 199–200 [13, 29]:
    * Introduces graphical representation on the **complex plane** with real and imaginary axes (Figures 1, 2, and 3) [29, 30].
  * **Section 8.5 ("Polar Form of Complex Numbers")**, Pages 697–707 [31-33]:
    * Covers plotting points in the complex plane, absolute value/modulus, polar form conversions, multiplication/division in polar form, and De Moivre's Theorem [34-39].

---

### **3. Euler's Formula**

* **Calculus Volume 3**
  * **Section 7.1 ("Second-Order Linear Equations")**, Pages 748–750 (specifically Page 749) [40, 41]:
    * Formally applies **Euler's formula**:
      \\[e^{i\theta} = \cos\theta + i\sin\theta\\]
    * Uses Euler's formula to express complex exponential solutions \\(e^{(\alpha \pm i\beta)x}\\) of second-order linear differential equations with complex conjugate characteristic roots in terms of real-valued sine and cosine functions (\\(\cos(\beta x)\\) and \\(\sin(\beta x)\\)) [40, 41].

---

💡 Would you like to see a step-by-step example of converting a complex number between rectangular and polar forms or deriving real-valued solutions using Euler's formula?

Sources cited: Algebra-and-Trigonometry-1e-retired.pdf, Precalculus-1e-retired.pdf, Calculus-Volume-3.pdf.

### 9. Vectors and fields

Here are the sections across the uploaded textbooks that introduce **vectors** and **vector fields** (including gravitational fields and electric field lines) with the clearest visual figures:

---

### **1. Introduction to Basic Vectors (Components, Addition & Operations)**

* **University Physics Volume 1**
  * **Section 2.1 ("Scalars and Vectors")**, Pages 61–68:
    * **Core Concept:** Introduces vector vs. scalar quantities, magnitude and direction, and graphical addition methods (tail-to-head and parallelogram rules).
    * **Figures:**
      * **FIGURE 2.1** (Page 61): Signpost illustrating displacement vectors (distance + direction).
      * **FIGURE 2.10** (Page 66): Parallelogram rule for vector addition and vector differences.
      * **FIGURE 2.15** (Page 68): Tail-to-head method for combining multiple displacement vectors.

* **Calculus Volume 3**
  * **Section 2.1 ("Vectors in the Plane") & Section 2.2 ("Vectors in Three Dimensions")**, Pages 118+:
    * **Core Concept:** Algebraic and geometric representation of 2D/3D vectors, vector addition, scalar multiplication, and component form.
    * **Figures:**
      * **Figure 2.9** (Page 121): Sketching scalar multiples and vector differences (e.g., \\(2\mathbf{v} - \mathbf{w}\\)).

* **Algebra and Trigonometry 1e** / **Precalculus 1e**
  * **Section 10.8 (Algebra & Trig, Pages 851–857) / Section 8.8 (Precalculus, Pages 733–739):**
    * **Core Concept:** Position vectors, magnitude, unit vectors (\\(\mathbf{i}, \mathbf{j}\\)), and component form in the Cartesian coordinate plane.
    * **Figures:**
      * **Figure 2 & Figure 7** (Pages 851 / 733): Plotting position vectors in standard position from the origin.
      * **Figure 12 & Figure 16** (Pages 856 / 738): Breaking a vector into perpendicular horizontal (\\(\mathbf{ai}\\)) and vertical (\\(\mathbf{bj}\\)) components.

* **College Physics** & **Physics**
  * **Section 3.1–3.3 (*College Physics*, Pages 98–110) / Section 5.1–5.2 (*Physics*):**
    * **Figures:**
      * **Figure 3.11 & Figure 3.31** (*College Physics*, Pages 101, 111): Head-to-tail graphical vector addition and analytical component resolution.
      * **FIGURE 5.17 & FIGURE 5.23** (*Physics*): Graphical resolution of vectors into right-triangle \\(x\\)- and \\(y\\)-components.

---

### **2. General Mathematical Introduction to Vector Fields**

* **Calculus Volume 3**
  * **Section 6.1 ("Vector Fields")**, Pages 614–625:
    * **Core Concept:** Formally defines 2D and 3D vector fields (\\(\mathbf{F}(x,y)\\) and \\(\mathbf{F}(x,y,z)\\)), contrasting **radial fields** (pointing toward/away from the origin) with **rotational fields** (fluid vortices) and **gradient fields**.
    * **Figures:**
      * **Figure 6.2(a)** (Page 615): Gravitational field exerted by two astronomical bodies on a unit mass.
      * **Figure 6.2(b)** (Page 615): Velocity vector field of water flowing around an obstacle in a river.
      * **Figure 6.5** (Page 617): Rotational vector field \\(\mathbf{F}(x,y) = \langle -y, x \rangle\\) with concentric circular streamlines.
      * **Figure 6.8** (Page 619): 3D radial gravitational vector field pointing inward toward a large mass at the origin.
      * **Figure 6.10** (Page 620): Gradient field \\(\nabla f\\) plotted together with level curves of potential function \\(f\\).

---

### **3. Physical Vector Fields: Gravitational & Electric Fields**

* **Gravitational Vector Fields**
  * **University Physics Volume 1 — Section 13.2 / 13.3 ("The Gravitational Field")**, Pages 648–650:
    * **Core Concept:** Defines the gravitational field \\(\mathbf{g} = -\frac{G M_E}{r^2} \hat{\mathbf{r}}\\) surrounding Earth.
    * **Figures:**
      * **FIGURE 13.8** (Page 649): Field line representation of Earth's radial gravitational field, showing that line density represents field strength (\\(1/r^2\\)).

* **Electric Field Lines**
  * **University Physics Volume 2 — Section 5.6 ("Electric Field Lines")**, Pages 234–240:
    * **Core Concept:** Introduces electric field lines as vector field diagrams, where field vectors are tangent to field lines and line density indicates magnitude.
    * **Figures:**
      * **FIGURE 5.29** (Page 235): Field line diagrams comparing a single positive point charge and an electric dipole.
      * **FIGURE 5.30** (Page 236): Field lines crossing imaginary surface areas \\(S\\) and \\(S'\\), demonstrating areal line density.
      * **FIGURE 5.31** (Page 237): Electric field diagrams for a dipole, two identical charges, and opposite charges of unequal magnitude.

  * **College Physics — Section 18.4 & 18.5 ("Electric Field Lines: Multiple Charges")**, Pages 774–779:
    * **Figures:**
      * **Figure 18.22** (Page 775): Compares individual force vector arrows (a) against continuous field line representations (b).
      * **Figure 18.23** (Page 776): Field line patterns for positive, negative, and higher-magnitude charges.

  * **Physics — Section 18.4**:
    * **Figures:**
      * **FIGURE 18.22**: Side-by-side visual analogy showing a charge accelerating in a uniform electric field vs. a mass accelerating in a uniform gravitational field.

---

🌌 Would you like to derive line integrals over vector fields or solve work/flux problems using these field concepts?

Sources cited: none returned as links; the answer cites book, section and page inline.

### 10. Linear algebra

### **1. Matrices**

Matrices and matrix operations are covered in both **Algebra and Trigonometry 1e** and **Precalculus 1e**:

* **Algebra and Trigonometry 1e**
  * **Section 11.6 ("Solving Systems with Gaussian Elimination")**, Pages 934–940: Introduces matrix theory, augmented matrices, row operations, and row-echelon form for solving systems of linear equations [1-4].
  * **Section 11.7 ("Matrices and Matrix Operations")**, Pages 948–958: Defines a matrix as a rectangular array of numbers and covers identity matrices, addition, subtraction, scalar multiplication, matrix multiplication, and matrix inverses [5, 6].
  * **Section 11.8 ("Solving Systems with Cramer's Rule")**, Pages 961–968: Teaches evaluating \\(2 \times 2\\) and \\(3 \times 3\\) determinants, properties of determinants, and applying Cramer's Rule to solve linear systems [7-11].

* **Precalculus 1e**
  * **Section 9.6 ("Solving Systems with Gaussian Elimination")**, Pages 816–821: Covers augmented matrices, matrix entry notation, row operations, and Gaussian elimination [12, 13].
  * **Section 9.7 ("Matrices and Matrix Operations")**, Pages 830–840: Details matrix dimensions, basic matrix algebra, matrix multiplication, and finding matrix inverses [14, 15].
  * **Section 9.8 ("Solving Systems with Cramer's Rule")**, Pages 844–850: Teaches calculating \\(2 \times 2\\) and \\(3 \times 3\\) determinants, determinant properties, and solving systems using Cramer's Rule [16-20].

---

### **2. Eigenvalues and Eigenvectors**

* **Not Covered:** None of the uploaded textbooks cover **eigenvalues** or **eigenvectors**. 

*(Note: While **Calculus Volume 3** Section 7.1 uses the term "characteristic equation" when solving second-order linear differential equations, it does so strictly in the context of scalar polynomial equations without introducing linear transformations, matrices, eigenvalues, or eigenvectors [21, 22]).*

---

💡 Would you like to create a study guide or practice problem set on matrix operations, Gaussian elimination, or determinants?

Sources cited: Algebra-and-Trigonometry-1e-retired.pdf, Precalculus-1e-retired.pdf, Calculus-Volume-3.pdf.

### 11. Probability and the Boltzmann factor

Here are the sections and figures across the uploaded textbooks covering **probability distributions**, the **normal distribution**, and the **Boltzmann factor / thermal energy \\(kT\\)**:

---

### **1. Probability Distributions (Discrete & Continuous)**

* **Introductory Statistics 1e**
  * **Section 4.1 ("Probability Distribution Function (PDF) for a Discrete Random Variable")**, Pages 211–218:
    * Defines discrete probability distribution functions \\(P(X = x)\\), expected values/means (\\(\mu = \sum x P(x)\\)), and discrete distributions (binomial, geometric, hypergeometric, and Poisson).
  * **Section 5.1 ("Continuous Probability Functions")**, Pages 263–271:
    * Introduces continuous random variables, probability density functions (\\(f(x)\\)), and cumulative distribution functions (CDF), establishing that for continuous distributions, \\(\text{Probability} = \text{Area under the curve}\\).
  * **Section 5.2 ("The Uniform Distribution")** & **Section 5.3 ("The Exponential Distribution")**, Pages 271–282:
    * Teaches flat/rectangular probability density functions and memoryless exponential decay probability functions (\\(f(x) = m e^{-mx}\\)).
  * **Figures:**
    * **Figure 5.1** (Page 263): Radish plant growth illustrating continuous random variables.
    * **Figure 5.4** (Page 265): Standard normal curve showing shaded area between \\(x = 1\\) and \\(x = 2\\) representing probability.
    * **Figure 5.8** (Page 266): Continuous cumulative distribution function graph illustrating \\(P(X \le x)\\) as area to the left.
    * **Figure 5.35 & Figure 5.36** (Page 280): Graphs of the uniform rectangular probability density function.
    * **Figures 5.37–5.44** (Pages 284–287): Diagrams illustrating various continuous probability density functions (uniform, normal, exponential).

---

### **2. The Normal Distribution**

* **Introductory Statistics 1e**
  * **Section 6.1 ("The Standard Normal Distribution")**, Pages 321–328:
    * Defines the standard normal distribution \\(Z \sim N(0, 1)\\), \\(z\\)-scores (\\(z = \frac{x - \mu}{\sigma}\\)), bell curve symmetry, and the Empirical Rule (68-95-99.7 rule).
  * **Section 6.2 ("Using the Normal Distribution")**, Pages 329–340:
    * Applies \\(X \sim N(\mu, \sigma)\\) to real-world calculations, cumulative probabilities, and percentiles.
  * **Figures:**
    * **Figure 5.39** (Page 285): Bell-shaped curve illustrating the symmetric normal distribution.
    * **Figure 6.3** (Page 323): Standard normal distribution graph marking standard deviation intervals (\\(-3\sigma, -2\sigma, -1\sigma, \mu, 1\sigma, 2\sigma, 3\sigma\\)) for the Empirical Rule.
    * **Figure 6.18** (Page 340): Normal distribution curve with shaded left-tail area representing \\(P(X < x)\\).
    * **Figure 8.2 & Figure 8.4** (Pages 420, 422): Symmetric normal distribution curves highlighting central confidence interval areas (e.g., \\(90\%\\) and \\(95\%\\)) and tail cutoffs.

---

### **3. The Boltzmann Factor & Thermal Energy \\(kT\\)**

* **University Physics Volume 2**
  * **Section 2.2 ("Pressure, Temperature, and RMS Speed")**, Pages 63–70:
    * Connects macroscopic temperature to average molecular translational kinetic energy, defining **thermal energy** as \\(\overline{K} = \frac{3}{2} k_B T\\) via Boltzmann's constant \\(k_B = 1.38 \times 10^{-23}\text{ J/K}\\).
  * **Section 2.3 ("Heat Capacity and Equipartition of Energy")**, Pages 71–76:
    * Formulates the **Equipartition Theorem**, establishing that each thermodynamic degree of freedom contributes \\(\frac{1}{2} k_B T\\) of thermal energy per molecule.
  * **Section 2.4 ("Distribution of Molecular Speeds")**, Pages 77–83:
    * Derives the **Maxwell-Boltzmann distribution**:
      \\[f(v) = 4\pi \left(\frac{m}{2\pi k_B T}\right)^{3/2} v^2 e^{-\frac{m v^2}{2 k_B T}}\\]
    * Explicitly introduces the **Boltzmann factor** \\(e^{-\frac{E}{k_B T}}\\), which dictates the probability weighting for a state with energy \\(E\\) at temperature \\(T\\).
  * **Figures:**
    * **FIGURE 2.13** (Page 74): Graph of the molar heat capacity \\(C_V\\) of hydrogen versus temperature (logarithmic scale) showing steps as rotational (\\(\frac{5}{2}R\\)) and vibrational (\\(\frac{7}{2}R\\)) degrees of freedom activate with increasing \\(k_B T\\).
    * **FIGURE 2.15** (Page 77): Plot of the Maxwell-Boltzmann speed distribution curve identifying \\(v_{\text{p}}\\), \\(\bar{v}\\), and \\(v_{\text{rms}}\\).
    * **FIGURE 2.16** (Page 79): Maxwell-Boltzmann speed distribution curves at temperatures \\(T_1\\) and \\(T_2\\) (\\(T_2 > T_1\\)), illustrating how higher thermal energy \\(k_B T\\) shifts the distribution peak to higher speeds and broadens the curve.

* **College Physics**
  * **Section 13.4 ("Kinetic Theory: Atomic and Molecular Explanation of Pressure and Temperature")**, Pages 460–467:
    * Defines thermal energy as average kinetic energy \\(\overline{KE} = \frac{3}{2} kT\\) and introduces the Maxwell-Boltzmann speed distribution.
  * **Figures:**
    * **Figure 13.24** (Page 466): Maxwell-Boltzmann probability distribution graph comparing low temperature \\(T_1\\) and high temperature \\(T_2\\).

* **University Physics Volume 3**
  * **Section 6.1 ("Blackbody Radiation")**, Pages 250–254:
    * Uses the Boltzmann factor in Planck's radiation law formula \\(I(\lambda, T) = \frac{2\pi h c^2}{\lambda^5 \left(e^{hc / (\lambda k_B T)} - 1\right)}\\).
    * **Figure 6.7**: Plot of blackbody radiation intensity versus wavelength at varying temperatures.

---

📊 Would you like to create a study guide or practice problem set combining thermal statistics and continuous probability distributions?

Sources cited: none returned as links; the answer cites book, section and page inline.

### 12. Modern physics

Here are the sections across the uploaded textbooks that cover **photons**, the **hydrogen spectrum**, **de Broglie waves**, and the **Heisenberg uncertainty principle** at the simplest, introductory level:

---

### **1. Photons**

* **College Physics**
  * **Section 29.2 ("The Photoelectric Effect")**, Page 1253 [1].
  * **Section 29.3 ("Photon Energies and the Electromagnetic Spectrum")**, Page 1257 [1].
  * **Section 29.4 ("Photon Momentum")**, Page 1264 [1].
* **Physics**
  * **Section 21.1 ("Planck and Quantum Nature of Light")** [2].
  * **Section 21.2 ("Einstein and the Photoelectric Effect")** [2, 3].
* **University Physics Volume 3**
  * **Section 6.2 ("Photoelectric Effect")**, Pages 240–246 [4-6].

---

### **2. The Hydrogen Spectrum**

* **College Physics**
  * **Section 30.3 ("Bohr’s Theory of the Hydrogen Atom")**, Pages 1300–1307 [7].
* **Physics**
  * **Section 22.1 ("The Structure of the Atom")**, specifically under the subsections *Absorption and Emission Spectra* and *Bohr’s Explanation of the Hydrogen Spectrum* [8-10].
* **University Physics Volume 3**
  * **Section 6.4 ("Bohr’s Model of the Hydrogen Atom")**, Pages 250–259 [4, 11].

---

### **3. de Broglie Waves**

* **College Physics**
  * **Section 29.6 ("The Wave Nature of Matter")**, Pages 1269–1273 [1].
  * **Section 30.6 ("The Wave Nature of Matter Causes Quantization")**, Pages 1322–1325 [7].
* **Physics**
  * **Section 21.3 ("The Dual Nature of Light")** [12].
  * **Section 22.1 ("The Structure of the Atom")**, under the subsection *DeBroglie's Waves* [13].
* **University Physics Volume 3**
  * **Section 6.5 ("De Broglie’s Matter Waves")**, Pages 259–266 [4, 14].

---

### **4. The Heisenberg Uncertainty Principle**

* **College Physics**
  * **Section 29.7 ("Probability: The Heisenberg Uncertainty Principle")**, Pages 1273–1278 [1].
* **Physics**
  * **Section 22.1 ("The Structure of the Atom")**, under the subsection *Heisenberg Uncertainty* [15, 16].
* **University Physics Volume 3**
  * **Section 6.6 ("Wave-Particle Duality")**, Pages 266–271 [4, 17].
  * **Section 7.2 ("The Heisenberg Uncertainty Principle")**, Pages 297–301 [4, 18].

---

🔬 Would you like to create a study guide or flashcards summarizing these introductory quantum physics concepts?

Sources cited: College-Physics-1e-retired.pdf, Physics.pdf, University-Physics-Volume-3.pdf.

### 13. Gravity, relativity, cosmology

Here are the sections across the uploaded textbooks that cover **gravitational time dilation**, **Hubble's law**, the **cosmic microwave background**, and **dark matter**:

---

### **1. Gravitational Time Dilation**

* **Physics**
  * **Section 1.1 ("Physics: Definitions and Applications")**, Page 8 [1, 2].
  * **Section 7.2 ("Newton's Law of Universal Gravitation and Einstein's Theory of General Relativity")**, Pages 243–251 [3, 4].
  * **Coverage:** Explains how strong gravitational fields distort the space-time continuum, slowing down time near massive bodies like planets and black holes [1, 2].

* **University Physics Volume 1**
  * **Section 13.7 ("Einstein's Theory of Gravity")**, Page 650 [5].
  * **Coverage:** Discusses how near a large mass, space is stretched out and time is dilated or "slowed" [5].

* **College Physics**
  * **Section 34.2 ("General Relativity and Quantum Gravity")**, Page 1482 [6].
  * **Coverage:** Details general relativity and gravitational effects on space and time [6].

---

### **2. Hubble's Law**

* **University Physics Volume 3**
  * **Section 11.6 ("The Big Bang")**, Pages 511–513 [7, 8].
  * **Coverage:** Formulates Hubble's law (\\(v = H_0 d\\)), demonstrating that galactic recession speeds are directly proportional to their distances from Earth [7, 8].

* **Physics**
  * **Section 23.3 ("The Unification of Forces")**, Page 818 [9].
  * **Coverage:** Introduces Edwin Hubble's 1929 discovery of galactic redshift proportional to distance [9].

* **College Physics**
  * **Section 34.1 ("Cosmology and Particle Physics")**, Page 1478 [10, 11].
  * **Coverage:** Covers universal expansion, galaxy recession, and Hubble's constant [10, 11].

---

### **3. Cosmic Microwave Background (CMB)**

* **University Physics Volume 3**
  * **Section 11.7 ("Evolution of the Early Universe")**, Pages 518–520 [12, 13].
  * **Coverage:** Details Penzias and Wilson's discovery of 2.73 K blackbody cosmic background radiation as leftover evidence of the Big Bang [12, 13].

* **College Physics**
  * **Section 34.1 ("Cosmology and Particle Physics")**, Page 1479 [6].
  * **Coverage:** Describes cosmic background radiation as a key observational pillar supporting the Big Bang model [6].

---

### **4. Dark Matter**

* **University Physics Volume 3**
  * **Section 11.7 ("Evolution of the Early Universe")**, Pages 521–522 [14-16].
  * **Coverage:** Discusses Vera Rubin's galaxy rotation problem, gravitational lensing, and potential candidates like WIMPs [14-16].

* **University Physics Volume 1**
  * **Section 13.7 ("Einstein's Theory of Gravity")**, Page 652 [17, 18].
  * **Coverage:** Features galaxy rotation curves showing discrepancy between expected visible mass and actual orbital speeds [18].

* **College Physics**
  * **Section 34.4 ("Dark Matter and Closure")**, Pages 1488–1491 [6].
  * **Coverage:** Examines dark matter evidence across galactic halos and its role in the ultimate expansion fate of the universe [6].

---

🌌 Would you like to build a unified summary or study guide comparing these key astrophysical and cosmological concepts across your textbooks?

Sources cited: Physics.pdf, University-Physics-Volume-1.pdf, College-Physics-1e-retired.pdf, University-Physics-Volume-3.pdf.

### 14. Visualisation inventory

Here is the availability of figures for each of these concepts across the uploaded textbooks:

---

### **1. Green's Function or Impulse Response**
* **Result:** **None**
* *Note:* While *Calculus Volume 3* covers **Green's Theorem** (Section 6.4) and physics texts cover physical force-time impulse curves (e.g., *College Physics* Figure 8.2), **Green's functions** and **impulse response functions** are not covered in these books.

---

### **2. Convolution**
* **Result:** **None**
* *Note:* The mathematical operation of convolution is not covered in these textbooks.

---

### **3. Resonance Curve**
* **University Physics Volume 1**
  * **Figure:** **FIGURE 15.31** & **FIGURE 15.32**
  * **Section:** Section 15.6 ("Forced Oscillations")
  * **Pages:** Pages 756–757
  * *Description:* Plots oscillator amplitude versus driving frequency across varying amounts of damping, defining resonance peak and width \\(\Delta\omega\\).
* **College Physics**
  * **Figure:** **Figure 16.27**
  * **Section:** Section 16.8 ("Forced Oscillations and Resonance")
  * **Page:** Page 695
  * *Description:* Displays amplitude versus driving frequency curves for small, medium, and heavy damping.
* **University Physics Volume 2**
  * **Figure:** **FIGURE 15.17** & **FIGURE 15.18**
  * **Section:** Section 15.6 ("Resonance in an AC Circuit")
  * **Pages:** Pages 721–722
  * *Description:* Shows electrical resonance curves (current \\(I_0\\) and power \\(\bar{P}\\) versus angular frequency \\(\omega\\)) highlighting bandwidth \\(\Delta\omega\\).

---

### **4. Potential Well**
* **University Physics Volume 1**
  * **Figure:** **FIGURE 8.12**
  * **Section:** Section 8.4 ("Potential Energy Diagrams and Stability")
  * **Page:** Page 310
  * *Description:* Shows potential energy \\(U(x)\\) curves creating potential wells with turning points and equilibrium positions. (See also **FIGURE 15.16**, Page 741 for the Lennard-Jones potential well).
* **University Physics Volume 3**
  * **Figure:** **FIGURE 7.16**
  * **Section:** Section 7.6 ("Quantum Tunneling of Particles through Potential Barriers")
  * **Page:** Page 316
  * *Description:* Shows potential energy wells and barrier regions for quantum tunneling. (See also **FIGURE 9.10**, Page 389 for the NaCl potential energy well).

---

### **5. Energy Landscape with Two Minima**
* **University Physics Volume 1**
  * **Figure:** **FIGURE 8.12**
  * **Section:** Section 8.4 ("Potential Energy Diagrams and Stability")
  * **Page:** Page 310
  * *Description:* Explicitly depicts a quartic/quadratic "double potential well" curve \\(U(x) = 2(x^4 - x^2)\\), showing two stable local minima flanked around a central unstable local maximum at \\(x=0\\).

---

📈 Would you like to dive deeper into any of these potential energy diagrams or forced oscillation equations?

Sources cited: none returned as links; the answer cites book, section and page inline.

### 15. Gaps

**All six of these topics are not covered anywhere in the uploaded textbooks:**

1. **Green's functions** — **Not covered.** 
   * *Note:* *Calculus Volume 3* introduces **Green's Theorem** (Section 6.4, Pages 638–650), but Green's functions for differential equations/impulse responses are not included.
2. **Convolution** — **Not covered.**
3. **Fourier transforms** — **Not covered.** 
   * *Note:* *Calculus Volume 2* (Section 3.1, Page 280) and *Calculus Volume 3* (Section 7.1, Page 750) briefly mention **Fourier series**, but Fourier transforms are not covered.
4. **Eigenvalues** — **Not covered.** 
   * *Note:* While matrices, Gaussian elimination, and determinants are covered in *Algebra and Trigonometry 1e* (Sections 11.6–11.8) and *Precalculus 1e* (Sections 9.6–9.8), eigenvalues and eigenvectors are omitted.
5. **Langevin equation** — **Not covered.**
6. **Kuramoto synchronisation** — **Not covered.**

---

🎯 Would you like to check if any other related mathematical or physical topics (such as Laplace transforms, series expansions, or matrix determinants) are included in your textbooks?

Sources cited: none returned as links; the answer cites book, section and page inline.
