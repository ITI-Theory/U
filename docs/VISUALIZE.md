# The `{{Visualize}}` macro

A picture is worth a thousand words, more so when maths is involved. In the
course book, **figures are declared in the text and drawn by code from the
equation they illustrate**. Nobody draws a physics figure by hand, and no image
generator draws one: the figure and the formula the reader sees come from the
same expression, and a figure can check a number the text quotes.

Origin: the author's concept chat (`Me/chats/notebooks/openstax-concept/`),
built on 5 Oct 2026 (ISS-041).

## Syntax

A paragraph that starts with the macro becomes a figure; the text after `}}`
is its caption (Markdown, maths allowed).

```
{{Visualize | context | primitive:concept | key=value; key=value }} Caption text.
```

EBNF:

```
figure     ::= macro caption
macro      ::= "{{" "Visualize" "|" context "|" kind "|" params "}}"
context    ::= label | "lean:" Module "." theorem
label      ::= ("sec:" | "eq:" | "ex:" | "pr:" | "ch:" | ...) name
kind       ::= primitive [ ":" concept ]
params     ::= [ param { ";" param } ]
param      ::= key "=" value          (* value: number, [a,b], "quoted text" *)
caption    ::= inline text            (* required *)
```

Example:

```
$$N(t) = N_0\,e^{-t/\tau}$$ {#eq:decay}

{{Visualize | eq:decay | function-plot:generic | f="exp(-x/tau)"; vary=tau:1,2,4; x=[0,10]; xlabel="time"; label=fig:decay }} The same law at three time constants.
```

## Rules (enforced; a violation fails the build)

1. **Context comes first.** The context must label something *earlier* in the
   document: a section, box or equation (`sec:`, `ex:`, `eq:` ...), or a Lean
   theorem `lean:Module.theorem` that exists in `paper/proofs/`. A figure
   always visualises something the reader has already met.
2. **Every figure has a caption.**
3. **Expressions are maths only.** Numpy functions (`sin`, `exp`, `sqrt`,
   `log10`, `where`, ...), constants `pi`, `e`, `j` (the imaginary unit), the
   variables of the primitive (`x`, `y`, `E`), and parameters of the same
   macro. `^` means power. No attribute access, no builtins.
4. **No unknown parameters.** A misspelt key is an error, not a silent default.
5. **`expect_*` parameters are checks.** The renderer computes the quantity
   (an area, a slope, a flux, an eigenvalue, a probability) and fails if it
   differs from the number the text quotes (relative tolerance 0.2 %,
   `expect_tol=` to change).

## Layout parameters (all primitives)

| key | meaning |
|---|---|
| `label=fig:name` | numbered figure, referable as `@fig:name` |
| `width=70%` | width on the page |
| `height=40%` | height cap (percent of text height; default 32 % in the A4 book) |
| `aspect=1.6` | drawing width / height |
| `xlabel=`, `ylabel=`, `zlabel=` | axis labels |
| `legend=best\|below\|none` | legend placement (function plots) |
| `vary=name:v1,v2,...` | draw a family, one curve (or bar set, or point set) per value |

## Concepts (palettes)

`generic`, `wave`, `quantum`, `neural`, `soma`, `earth`, `cosmic`. The
concept styles the figure; it never changes what is drawn.

## Primitives

| primitive | draws | parameters | checks |
|---|---|---|---|
| `function-plot` | curves $y = f(x)$ | `f` (and `f2`, `f3`, ...; names `name`, `name2`), `x=[a,b]`, `var`, `y=[a,b]`, `logx`, `logy`, `tangent_at`, `value_at`, `sample_every`, `hline`, `vline` | `expect_slope` (at `tangent_at`), `expect_value` (at `value_at`), `expect_peak_x` (where the first curve peaks) |
| `area-under` | the area under $f$, optionally as strips | `f`, `x`, `from`, `to`, `n`, `rule=left\|mid\|right`, `hline`, `vline` | `expect_area`, `expect_sum` |
| `log-scale` | named quantities on a powers-of-ten line | `items="atom=1e-10, cell=1e-5"`, `range=[lo,hi]` (exponents), `unit` | |
| `complex-plane` | points or poles $z$ | `points` (comma list of expressions), `names`, `conjugate`, `poles`, `arrows`, `unit_circle`, `radius` | |
| `vector-field` | arrows $(u, v)$ | `u`, `v`, `x`, `y`, `n`, `potential` (shaded), `circle=r` | `expect_flux`, `expect_circulation` (through the circle) |
| `contour-map` | a scalar field $f(x, y)$ | `f`, `x`, `y`, `levels`, `gradient` or `downhill` (arrows), `hline`, `vline` | |
| `energy-landscape` | a potential $U(x)$ with its valleys | `U`, `x`, `ball`, `barrier`, `y` | `expect_minima="x1,x2"`, `expect_barrier` |
| `eigen-transform` | a 2 x 2 matrix acting on the unit circle | `matrix="[[a,b],[c,d]]"` | `expect_eigen="l1,l2"` (ascending) |
| `distribution` | a density (with random draws) or discrete levels | `pdf`, `x`, `samples`, `seed`, `bins`, `shade=[a,b]`, `hline`, `vline`; or `levels`, `weight` (in `E`) | `expect_mean`, `expect_sd`, `expect_prob`, `expect_p0` |
| `spectrum` | a signal over time and its amplitude spectrum (FFT, Hann window) | `f` (in `t`), `x=[t0,t1]`, `n`, `show` (time drawn: a length from the start, or a window `[t0,t1]`), `fmax`, `peaks` (how many to label), `flabel` | `expect_peak` (frequency of the largest peak) |
| `convolution` | input, kernel $G$ (from $t = 0$) and output $G * u$, stacked | `input`, `kernel`, `x`, `n`, `input_label`, `kernel_label`, `output_label`, `hline`, `vline` (on the output) | `expect_max`, `expect_area` (of the output) |

New primitives are added as one `draw_*` function in `lib/visualize/render.py`
and one entry in the `PRIMITIVES` table of `lib/format/visualize.lua`.

## How it is built

- `lib/format/visualize-reader.lua` (the Markdown reader: `from:` in the
  defaults file) wraps each macro as raw text before pandoc parses inlines,
  so quotes, `*` and `^` in parameters reach the filter unchanged. A macro
  read without it fails the build with a clear message.
- `lib/format/visualize.lua` (pandoc filter, before pandoc-crossref) parses
  the macro, enforces the rules above, replaces the paragraph with a figure
  `viz-<hash>.png` (the hash is of the drawing parameters, so editing a
  formula makes a new image) and writes every spec to a JSON manifest.
- `lib/visualize/render.py` reads the manifest and draws missing images (and
  re-runs every spec with checks). It is the only Python involved, and it
  only draws (BUILD.md rule 5).
- The project Makefile runs it between pandoc and LaTeX. Metadata:
  `visualize-manifest`, `visualize-src` (image path as the output sees it),
  `lean-root`.
- Images go to `bld/<project>/visualize/` and are never committed.
