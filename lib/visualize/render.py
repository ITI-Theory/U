#!/usr/bin/env python3
"""Draw {{Visualize}} figures from the manifest written by lib/format/visualize.lua.

Usage: render.py MANIFEST [--force]

Each spec names a primitive (one draw_* function below), a concept (palette)
and parameters. Expressions are evaluated from the text of the book (numpy
functions only, no attribute access, no builtins), so a figure is drawn from
the same equation the reader sees. Parameters named expect_* are numeric
checks: the renderer computes the value and fails the build if it differs.
See docs/VISUALIZE.md.
"""
from __future__ import annotations

import ast
import json
import math
import re
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402

plt.rcParams.update({"font.size": 10, "axes.spines.top": False, "axes.spines.right": False,
                     "savefig.dpi": 200, "figure.dpi": 100})

BLUE, TEAL, GOLD, GREEN, PURPLE, RED = "#104a73", "#007c8c", "#946400", "#2e6f40", "#604691", "#b03a2e"
PALETTES = {
    "generic": ([BLUE, TEAL, GOLD, GREEN, PURPLE, RED], "viridis"),
    "wave": (["#0b4f6c", "#01a2d6", "#20a050", "#757575", BLUE, TEAL], "PuBu"),
    "quantum": (["#5b2a86", "#9a48d0", "#e36588", "#1f7a8c", "#ffa62b", BLUE], "magma"),
    "neural": (["#2e6f40", "#5aa469", "#d35d6e", "#c98a5e", BLUE, PURPLE], "YlGn"),
    "soma": (["#b03a2e", "#e67e22", "#7d3c98", "#1f618d", GOLD, GREEN], "inferno"),
    "earth": (["#7b4f2c", "#a0522d", "#2e6f40", "#5d6d7e", GOLD, BLUE], "YlOrBr"),
    "cosmic": (["#1b2a49", "#465881", "#c2a83e", "#b03a2e", "#00909e", PURPLE], "cividis"),
}

SAFE = {name: getattr(np, name) for name in (
    "sin", "cos", "tan", "arcsin", "arccos", "arctan", "arctan2", "sinh", "cosh", "tanh",
    "exp", "log", "log10", "log2", "sqrt", "abs", "sign", "floor", "ceil", "where",
    "maximum", "minimum", "heaviside", "real", "imag", "conj", "angle", "hypot")}
SAFE.update(pi=np.pi, e=np.e, j=1j, inf=np.inf)
# error function and the standard normal CDF (Black-Scholes, Gaussian probabilities)
_erf = np.vectorize(math.erf, otypes=[float])
SAFE.update(erf=_erf, erfc=lambda x: 1.0 - _erf(x), normcdf=lambda x: 0.5 * (1.0 + _erf(np.asarray(x) / math.sqrt(2.0))))
COMMON = {"aspect", "xlabel", "ylabel", "zlabel", "expect_tol"}
GREEK = {"alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "kappa", "lambda",
         "mu", "nu", "xi", "pi", "rho", "sigma", "tau", "phi", "chi", "psi", "omega", "Omega", "Delta",
         "Gamma", "Theta", "Lambda", "Sigma", "Phi", "Psi"}


class SpecError(Exception):
    pass


def compile_expr(text: str, allowed: set[str]):
    src = text.replace("^", "**")
    try:
        tree = ast.parse(src, mode="eval")
    except SyntaxError as exc:
        raise SpecError(f"cannot parse expression {text!r}: {exc.msg}") from None
    for node in ast.walk(tree):
        if isinstance(node, (ast.Attribute, ast.Subscript, ast.Lambda, ast.Starred, ast.NamedExpr)):
            raise SpecError(f"expression {text!r}: {type(node).__name__} not allowed")
        if isinstance(node, ast.Name) and node.id not in SAFE and node.id not in allowed:
            raise SpecError(f"expression {text!r}: unknown name {node.id!r}")
    code = compile(tree, "<visualize>", "eval")

    def run(env):
        # silence numpy floating-point warnings: the warnings machinery needs
        # builtins, which the sandboxed evaluation deliberately lacks
        with np.errstate(all="ignore"):
            return eval(code, {"__builtins__": {}}, {**SAFE, **env})  # noqa: S307
    return run


def number(text: str) -> float:
    return float(compile_expr(str(text), set())({}))


def split_top(text: str, sep: str = ",") -> list[str]:
    parts, depth, buf = [], 0, []
    for ch in text:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == sep and depth == 0:
            parts.append("".join(buf).strip())
            buf = []
        else:
            buf.append(ch)
    if "".join(buf).strip():
        parts.append("".join(buf).strip())
    return parts


def numbers(text: str) -> list[float]:
    text = str(text).strip()
    if text.startswith("[") and text.endswith("]"):
        text = text[1:-1]
    return [number(part) for part in split_top(text)] if text else []


def flag(p: dict, key: str) -> bool:
    return str(p.get(key, "false")).lower() in ("true", "yes", "1", "on")


def tex_name(name: str) -> str:
    base, _, sub = name.partition("_")
    head = "\\" + base if base in GREEK else base
    for g in sorted(GREEK, key=len, reverse=True):
        if base.startswith(g) and base != g and base[len(g):].isdigit():
            head = "\\" + g + "_{" + base[len(g):] + "}"
            break
    return head + ("_{" + sub + "}" if sub else "")


def fmt(v: float) -> str:
    if v == 0:
        return "0"
    from fractions import Fraction
    frac = Fraction(v / math.pi).limit_denominator(12)
    if frac != 0 and abs(float(frac) * math.pi - v) < 1e-9:
        num, den = frac.numerator, frac.denominator
        top = {1: "", -1: "-"}.get(num, str(num))
        return f"{top}\\pi" if den == 1 else f"{top}\\pi/{den}"
    if abs(v) >= 1e4 or abs(v) < 1e-3:
        m, ex = f"{v:.2e}".split("e")
        return f"{float(m):g}\\times10^{{{int(ex)}}}"
    return f"{v:g}"


class Spec:
    def __init__(self, raw: dict):
        self.id = raw["id"]
        self.context = raw["context"]
        self.primitive = raw["primitive"]
        self.p = {k: str(v) for k, v in (raw.get("params") or {}).items()}
        self.colors, self.cmap = PALETTES[raw["concept"]]
        self.used: set[str] = set()
        self.checks: list[str] = []

    def get(self, key, default=None):
        self.used.add(key)
        return self.p.get(key, default)

    def names(self, *extra: str) -> set[str]:
        """Names an expression may use: every parameter, the varied one, extras."""
        out = set(self.p) | set(extra)
        if self.p.get("vary"):
            out.add(self.p["vary"].partition(":")[0].strip())
        return out

    def need(self, key):
        if key not in self.p:
            raise SpecError(f"missing parameter {key!r}")
        return self.get(key)

    def scalars(self) -> dict[str, float]:
        """Numeric parameters that expressions may use (e.g. tau=2)."""
        out = {}
        for k, v in self.p.items():
            if k.startswith("expect_"):
                continue
            try:
                out[k] = number(v)
            except (SpecError, TypeError, ValueError, ZeroDivisionError, NameError):
                pass
        return out

    def family(self) -> list[tuple[str, dict]]:
        """vary=name:v1,v2,... gives one environment per value."""
        base = self.scalars()
        vary = self.get("vary")
        if not vary:
            return [("", base)]
        name, _, values = vary.partition(":")
        name = name.strip()
        return [(f"${tex_name(name)} = {fmt(v)}$", {**base, name: v}) for v in numbers(values)]

    def check(self, what: str, actual: float, want: float, rel: float = 2e-3):
        tol = float(self.p.get("expect_tol", rel))
        ok = abs(actual - want) <= tol * max(1.0, abs(want))
        self.checks.append(f"{what}={actual:.6g} (text {want:.6g}) {'OK' if ok else 'FAIL'}")
        if not ok:
            raise SpecError(f"{what}: computed {actual:.6g}, text says {want:.6g}")

    def expect(self, key: str, actual: float):
        want = self.get(key)
        if want is not None:
            self.check(key, actual, number(want))

    def axes(self, aspect_default: float = 1.6):
        aspect = float(self.get("aspect", aspect_default))
        fig, ax = plt.subplots(figsize=(6.4, 6.4 / aspect))
        return fig, ax

    def labels(self, ax, x="", y=""):
        ax.set_xlabel(self.get("xlabel", x))
        ax.set_ylabel(self.get("ylabel", y))

    def range(self, key: str = "x", n: int = 1200):
        lo, hi = numbers(self.need(key))
        if flag(self.p, "logx"):
            self.used.add("logx")
            return np.logspace(np.log10(lo), np.log10(hi), n)
        return np.linspace(lo, hi, n)


def as_array(value, like):
    return np.real(value) * np.ones_like(like)


def curve_keys(spec: Spec) -> list[str]:
    keys = sorted(k for k in spec.p if k == "f" or (k.startswith("f") and k[1:].isdigit()))
    if not keys:
        raise SpecError("missing parameter 'f' (the formula to draw)")
    return keys


# ----------------------------------------------------------------- primitives

def place_legend(spec: Spec, ax):
    """legend=best (default), below (under the axes, for busy plots) or none."""
    where = spec.get("legend", "best")
    if where == "none" or not ax.get_legend_handles_labels()[0]:
        return
    if where == "below":
        ax.legend(frameon=False, loc="upper center", bbox_to_anchor=(0.5, -0.18), ncol=3)
    else:
        ax.legend(frameon=False)


def reference_lines(spec: Spec, ax):
    """Dotted guide lines: hline="0.5, 1" and vline="2"."""
    for key in ("hline", "vline"):
        for v in numbers(spec.get(key, "")):
            (ax.axhline if key == "hline" else ax.axvline)(v, color="0.5", lw=0.8, ls=":")


def draw_function_plot(spec: Spec):
    var = spec.get("var", "x")
    xs = spec.range("x")
    allowed = spec.names(var)
    fig, ax = spec.axes()
    color = iter(spec.colors * 4)
    first = None
    varied = spec.get("vary", "").partition(":")[0].strip()
    for key in curve_keys(spec):
        fn = compile_expr(spec.get(key), allowed)
        name = spec.get("name" + key[1:])
        family = spec.family()
        if varied and not re.search(rf"\b{re.escape(varied)}\b", spec.get(key)):
            family = [("", family[0][1])]  # the curve does not depend on the varied name: draw it once
        for label, env in family:
            ys = as_array(fn({**env, var: xs}), xs)
            if first is None:
                first = (fn, env)
            parts = [s for s in (name, label) if s]
            ax.plot(xs, ys, color=next(color), lw=2, label=", ".join(parts) or None)
    if spec.get("value_at"):
        # mark f(x0) on the first curve and check it against the text
        x0 = number(spec.get("value_at"))
        fn, env = first
        y0 = float(np.real(fn({**env, var: x0})))
        ax.plot([x0], [y0], "o", color=RED, ms=7, zorder=6)
        ax.annotate(f"{y0:.3g}", (x0, y0), textcoords="offset points", xytext=(8, -12), color=RED, fontsize=9)
        spec.expect("expect_value", y0)
    if spec.get("expect_peak_x"):
        # position of the maximum of the first curve (e.g. Wien's law)
        fn, env = first
        ys0 = as_array(fn({**env, var: xs}), xs)
        spec.expect("expect_peak_x", float(xs[int(np.nanargmax(ys0))]))
    if spec.get("sample_every"):
        # dots where the first curve is sampled every dt (aliasing, digitising)
        dt = number(spec.get("sample_every"))
        fn, env = first
        st = np.arange(xs[0], xs[-1] + 1e-12, dt)
        ax.plot(st, as_array(fn({**env, var: st}), st), "o", color=RED, ms=6, zorder=5,
                label=f"samples every {dt:g}")
    if spec.get("tangent_at"):
        x0 = number(spec.get("tangent_at"))
        fn, env = first
        h = 1e-6 * max(1.0, abs(x0))
        y0 = float(np.real(fn({**env, var: x0})))
        slope = float(np.real(fn({**env, var: x0 + h}) - fn({**env, var: x0 - h})) / (2 * h))
        span = (xs[-1] - xs[0]) * 0.18
        tx = np.array([x0 - span, x0 + span])
        ax.plot(tx, y0 + slope * (tx - x0), color=RED, lw=1.6, ls="--", label=f"tangent, slope {slope:.3g}")
        ax.plot([x0], [y0], "o", color=RED)
        spec.expect("expect_slope", slope)
    reference_lines(spec, ax)
    if spec.get("y"):
        ax.set_ylim(*numbers(spec.get("y")))
    if flag(spec.p, "logy"):
        spec.used.add("logy")
        ax.set_yscale("log")
    else:
        ax.axhline(0, color="0.75", lw=0.6)
    if flag(spec.p, "logx"):
        ax.set_xscale("log")
    spec.labels(ax, f"${var}$", "")
    place_legend(spec, ax)
    return fig


def draw_area_under(spec: Spec):
    xs = spec.range("x")
    fn = compile_expr(spec.need("f"), spec.names("x"))
    env = spec.scalars()
    a, b = number(spec.need("from")), number(spec.need("to"))
    n = int(number(spec.get("n", "0")))
    rule = spec.get("rule", "mid")
    fig, ax = spec.axes()
    ax.plot(xs, as_array(fn({**env, "x": xs}), xs), color=spec.colors[0], lw=2)
    fine = np.linspace(a, b, 200001)
    fy = as_array(fn({**env, "x": fine}), fine)
    exact = float(np.trapezoid(fy, fine))
    ys_all = as_array(fn({**env, "x": xs}), xs)
    # label in the emptier upper corner: left if the curve ends higher than it starts
    corner = (0.03, 0.95, "left") if ys_all[-1] > ys_all[0] else (0.97, 0.95, "right")
    ax.fill_between(fine[::200], fy[::200], color=spec.colors[1], alpha=0.25 if n else 0.35, lw=0)
    if n:
        w = (b - a) / n
        lefts = a + w * np.arange(n)
        at = {"left": lefts, "right": lefts + w, "mid": lefts + w / 2}[rule]
        heights = as_array(fn({**env, "x": at}), at)
        ax.bar(lefts, heights, width=w, align="edge", color=spec.colors[2], alpha=0.35,
               edgecolor=spec.colors[2], lw=1)
        total = float(np.sum(heights) * w)
        if flag({"note": spec.get("note", "true")}, "note"):
            ax.text(corner[0], corner[1], f"{n} strips ({rule} points): {total:.4g}\nexact area: {exact:.4g}",
                    transform=ax.transAxes, ha=corner[2], va="top")
        spec.expect("expect_sum", total)
    else:
        if flag({"note": spec.get("note", "true")}, "note"):
            ax.text(corner[0], corner[1], f"area: {exact:.4g}", transform=ax.transAxes, ha=corner[2], va="top")
    spec.expect("expect_area", exact)
    reference_lines(spec, ax)
    ax.axhline(0, color="0.6", lw=0.6)
    spec.labels(ax, "$x$", "")
    return fig


def draw_log_scale(spec: Spec):
    items = []
    for part in split_top(spec.need("items")):
        name, _, value = part.rpartition("=")
        if not name:
            raise SpecError(f"log-scale item {part!r} must be name=value")
        items.append((name.strip(), number(value)))
    logs = [math.log10(v) for _, v in items]
    lo, hi = numbers(spec.get("range", f"[{math.floor(min(logs)) - 1},{math.ceil(max(logs)) + 1}]"))
    fig, ax = spec.axes(4.0)
    ax.set_xlim(lo - 0.5, hi + 0.5)
    ax.set_ylim(-1.0, 1.9)
    ax.plot([lo, hi], [0, 0], color="0.2", lw=1.2)
    step = max(1, math.ceil((hi - lo) / 10))
    for k in range(int(math.ceil(lo)), int(math.floor(hi)) + 1):
        major = k % step == 0
        ax.plot([k, k], [-0.08 if major else -0.04, 0.08 if major else 0.04], color="0.2", lw=0.8)
        if major:
            ax.text(k, -0.2, f"$10^{{{k}}}$", ha="center", va="top", fontsize=8)
    for i, (name, value) in enumerate(sorted(items, key=lambda t: t[1])):
        x = math.log10(value)
        h = 0.35 + 0.45 * (i % 3)
        c = spec.colors[i % len(spec.colors)]
        ax.plot([x, x], [0, h], color=c, lw=1)
        ax.plot([x], [0], "o", color=c)
        ax.text(x, h + 0.05, name, ha="center", va="bottom", fontsize=8.5, color=c)
    ax.text(hi + 0.5, -0.75, spec.get("unit", ""), ha="right", fontsize=9, color="0.3")
    ax.axis("off")
    return fig


def draw_complex_plane(spec: Spec):
    fig, ax = spec.axes(1.0)
    allowed = spec.names()
    names = [s.strip() for s in split_top(spec.get("names", ""))]
    exprs = split_top(spec.need("points"))
    spec.used.update({"conjugate", "arrows", "poles", "unit_circle"})
    color = iter(spec.colors * 6)
    pts_all = []
    family = spec.family()
    for label, env in family:
        c = next(color)
        for i, text in enumerate(exprs):
            if len(family) == 1 and len(exprs) > 1:
                c = spec.colors[i % len(spec.colors)]  # one colour per point when nothing varies
            z = complex(compile_expr(text, allowed)(env))
            zs = [z, z.conjugate()] if flag(spec.p, "conjugate") and abs(z.imag) > 1e-12 else [z]
            for zz in zs:
                pts_all.append(zz)
                if flag(spec.p, "arrows"):
                    ax.annotate("", xy=(zz.real, zz.imag), xytext=(0, 0),
                                arrowprops=dict(arrowstyle="->", color=c, lw=1.6))
                if flag(spec.p, "poles"):
                    ax.plot([zz.real], [zz.imag], "x", color=c, ms=9, mew=2)
                else:
                    ax.plot([zz.real], [zz.imag], "o", color=c, ms=6)
            nm = names[i] if i < len(names) else ""
            tag = ", ".join(s for s in (nm, label) if s)
            if tag:
                left = z.real < -1e-9
                ax.annotate(tag, (z.real, z.imag), textcoords="offset points", xytext=(-8 if left else 8, 6),
                            ha="right" if left else "left", color=c, fontsize=10)
    if flag(spec.p, "unit_circle"):
        th = np.linspace(0, 2 * np.pi, 400)
        ax.plot(np.cos(th), np.sin(th), color="0.6", lw=1, ls="--")
    r = number(spec.get("radius", str(max(1.2, 1.15 * max(abs(z) for z in pts_all)))))
    ax.set_xlim(-r, r)
    ax.set_ylim(-r, r)
    ax.set_aspect("equal")
    ax.axhline(0, color="0.5", lw=0.8)
    ax.axvline(0, color="0.5", lw=0.8)
    spec.labels(ax, "real part", "imaginary part")
    return fig


def mesh(spec: Spec, n: int):
    xr, yr = numbers(spec.need("x")), numbers(spec.need("y"))
    return np.meshgrid(np.linspace(*xr, n), np.linspace(*yr, n))


def draw_vector_field(spec: Spec):
    allowed = spec.names("x", "y")
    u, v = compile_expr(spec.need("u"), allowed), compile_expr(spec.need("v"), allowed)
    env = spec.scalars()
    fig, ax = spec.axes(1.0)
    if spec.get("potential"):
        X, Y = mesh(spec, 200)
        P = as_array(compile_expr(spec.get("potential"), allowed)({**env, "x": X, "y": Y}), X)
        ax.contourf(X, Y, P, levels=24, cmap=spec.cmap, alpha=0.55)
    X, Y = mesh(spec, int(number(spec.get("n", "17"))))
    U, V = as_array(u({**env, "x": X, "y": Y}), X), as_array(v({**env, "x": X, "y": Y}), X)
    # display only: clip the longest arrows so a singular source does not dwarf the rest
    mag = np.hypot(U, V)
    cap = np.percentile(mag, 85) if mag.size else 1.0
    if mag.max() <= 4 * cap:  # no singularity: keep true lengths
        cap = mag.max()
    scale = np.where(mag > cap, cap / np.maximum(mag, 1e-300), 1.0)
    ax.quiver(X, Y, U * scale, V * scale, color=spec.colors[0], angles="xy", pivot="mid")
    if spec.get("circle"):
        r = number(spec.get("circle"))
        th = np.linspace(0, 2 * np.pi, 20001)
        cx, cy = r * np.cos(th), r * np.sin(th)
        Uc, Vc = as_array(u({**env, "x": cx, "y": cy}), cx), as_array(v({**env, "x": cx, "y": cy}), cx)
        ds = r * (th[1] - th[0])
        flux = float(np.sum((Uc * np.cos(th) + Vc * np.sin(th))[:-1]) * ds)
        circ = float(np.sum((-Uc * np.sin(th) + Vc * np.cos(th))[:-1]) * ds)
        ax.plot(cx, cy, color=RED if spec.colors[0] != RED else BLUE, lw=2)
        def tidy(v: float) -> str:
            return "0" if abs(v) < 1e-9 else f"{v:.4g}"
        ax.text(0.02, 0.98, f"flux out: {tidy(flux)}\ncirculation: {tidy(circ)}", transform=ax.transAxes,
                va="top", fontsize=10, bbox=dict(fc="white", ec="none", alpha=0.85))
        spec.expect("expect_flux", flux)
        spec.expect("expect_circulation", circ)
    ax.set_aspect("equal")
    spec.labels(ax, "$x$", "$y$")
    return fig


def draw_contour_map(spec: Spec):
    allowed = spec.names("x", "y")
    f = compile_expr(spec.need("f"), allowed)
    env = spec.scalars()
    fig, ax = spec.axes(1.15)
    X, Y = mesh(spec, 300)
    Z = as_array(f({**env, "x": X, "y": Y}), X)
    cs = ax.contourf(X, Y, Z, levels=int(number(spec.get("levels", "20"))), cmap=spec.cmap)
    ax.contour(X, Y, Z, levels=cs.levels[::2], colors="k", linewidths=0.4, alpha=0.5)
    fig.colorbar(cs, ax=ax, shrink=0.85, label=spec.get("zlabel", ""))
    reference_lines(spec, ax)
    spec.used.update({"gradient", "downhill"})
    if flag(spec.p, "gradient") or flag(spec.p, "downhill"):
        Xs, Ys = mesh(spec, 15)
        Zs = as_array(f({**env, "x": Xs, "y": Ys}), Xs)
        gy, gx = np.gradient(Zs, Ys[:, 0], Xs[0, :])
        sgn = -1 if flag(spec.p, "downhill") else 1
        ax.quiver(Xs, Ys, sgn * gx, sgn * gy, color="white", angles="xy", pivot="mid", alpha=0.9)
    ax.set_aspect("equal")
    spec.labels(ax, "$x$", "$y$")
    return fig


def draw_energy_landscape(spec: Spec):
    xs = spec.range("x", 4001)
    fn = compile_expr(spec.need("U"), spec.names("x"))
    fig, ax = spec.axes()
    minima: list[float] = []
    color = iter(spec.colors * 4)
    spec.used.add("barrier")
    for label, env in spec.family():
        ys = as_array(fn({**env, "x": xs}), xs)
        c = next(color)
        ax.plot(xs, ys, color=c, lw=2.2, label=label or None)
        idx = [i for i in range(1, len(xs) - 1) if ys[i] < ys[i - 1] and ys[i] <= ys[i + 1]]
        if not minima:
            minima = [float(xs[i]) for i in idx]
            tops = [i for i in range(1, len(xs) - 1) if ys[i] > ys[i - 1] and ys[i] >= ys[i + 1]]
            for i in idx:
                ax.plot([xs[i]], [ys[i]], "v", color=c, ms=7)
            if idx and tops and flag(spec.p, "barrier"):
                i_min, i_top = idx[0], tops[0]
                ax.annotate("", xy=(xs[i_min], ys[i_top]), xytext=(xs[i_min], ys[i_min]),
                            arrowprops=dict(arrowstyle="<->", color=RED))
                ax.plot([xs[i_min], xs[i_top]], [ys[i_top]] * 2, color=RED, lw=0.8, ls=":")
                ax.text(xs[i_min] + 0.06 * (xs[-1] - xs[0]), (ys[i_min] + ys[i_top]) / 2, "barrier",
                        color=RED, va="center")
                spec.expect("expect_barrier", float(ys[i_top] - ys[i_min]))
        if spec.get("ball"):
            b = number(spec.get("ball"))
            yb = float(np.real(fn({**env, "x": b})))
            span = float(ys.max() - ys.min())
            ax.plot([b], [yb + 0.04 * span], "o", ms=13, color="#1f77b4", mec="white", zorder=5)
    for k, want in enumerate(numbers(spec.get("expect_minima", ""))):
        if k >= len(minima):
            raise SpecError(f"expect_minima: only {len(minima)} minima found")
        spec.check(f"minimum {k + 1}", minima[k], want)
    if spec.get("y"):
        ax.set_ylim(*numbers(spec.get("y")))
    spec.labels(ax, "state $x$", "energy $U(x)$")
    if ax.get_legend_handles_labels()[0]:
        ax.legend(frameon=False)
    return fig


def draw_eigen_transform(spec: Spec):
    text = spec.need("matrix").strip()
    rows = [numbers(r) for r in split_top(text[1:-1])]
    A = np.array(rows, dtype=float)
    if A.shape != (2, 2):
        raise SpecError("eigen-transform needs a 2x2 matrix like [[2,1],[1,2]]")
    vals, vecs = np.linalg.eig(A)
    fig, ax = spec.axes(1.0)
    th = np.linspace(0, 2 * np.pi, 400)
    circle = np.vstack([np.cos(th), np.sin(th)])
    image = A @ circle
    ax.plot(*circle, color="0.6", lw=1.2, ls="--", label="unit circle")
    ax.plot(*image, color=spec.colors[0], lw=2, label="after the matrix")
    for k in range(8):
        a = k * np.pi / 4 + 0.2
        v = np.array([np.cos(a), np.sin(a)])
        ax.annotate("", xy=A @ v, xytext=v, arrowprops=dict(arrowstyle="->", color="0.65", lw=0.8))
    if np.all(np.abs(np.imag(vals)) < 1e-12):
        for i in range(2):
            v = np.real(vecs[:, i])
            lam = float(np.real(vals[i]))
            c = spec.colors[1 + i]
            ax.annotate("", xy=lam * v, xytext=(0, 0), arrowprops=dict(arrowstyle="->", color=c, lw=2.4))
            ax.annotate(f"eigenvector, $\\lambda = {lam:.3g}$", lam * v, textcoords="offset points",
                        xytext=(6, -12), color=c)
        got = sorted(float(np.real(x)) for x in vals)
        for k, want in enumerate(numbers(spec.get("expect_eigen", ""))):
            spec.check(f"eigenvalue {k + 1}", got[k], want)
    r = 1.15 * max(1.2, float(np.abs(image).max()))
    ax.set_xlim(-r, r)
    ax.set_ylim(-r, r)
    ax.set_aspect("equal")
    ax.axhline(0, color="0.8", lw=0.6)
    ax.axvline(0, color="0.8", lw=0.6)
    ax.legend(frameon=False, loc="lower right")
    return fig


def draw_distribution(spec: Spec):
    fig, ax = spec.axes()
    if spec.get("levels"):
        levels = np.array(numbers(spec.get("levels")))
        w = compile_expr(spec.need("weight"), spec.names("E"))
        fam = spec.family()
        width = 0.8 / len(fam)
        for i, (label, env) in enumerate(fam):
            p = as_array(w({**env, "E": levels}), levels)
            p = p / p.sum()
            ax.bar(np.arange(len(levels)) + (i - (len(fam) - 1) / 2) * width, p, width=width,
                   color=spec.colors[i % len(spec.colors)], label=label or None)
            if i == 0:
                spec.expect("expect_p0", float(p[0]))
        ax.set_xticks(np.arange(len(levels)), [f"{v:g}" for v in levels])
        spec.labels(ax, "energy level", "probability")
    else:
        xs = spec.range("x", 4001)
        fn = compile_expr(spec.need("pdf"), spec.names("x"))
        p = as_array(fn({**spec.scalars(), "x": xs}), xs)
        p = p / float(np.trapezoid(p, xs))
        if spec.get("samples"):
            n = int(number(spec.get("samples")))
            rng = np.random.default_rng(int(number(spec.get("seed", "1"))))
            cdf = np.concatenate([[0.0], np.cumsum((p[1:] + p[:-1]) / 2 * np.diff(xs))])
            draws = np.interp(rng.random(n), cdf / cdf[-1], xs)
            ax.hist(draws, bins=int(number(spec.get("bins", "40"))), density=True,
                    color=spec.colors[1], alpha=0.45, label=f"{n} random draws")
            spec.checks.append(f"sample mean {draws.mean():.4g}")
        ax.plot(xs, p, color=spec.colors[0], lw=2.2, label="probability density")
        mean = float(np.trapezoid(xs * p, xs))
        sd = math.sqrt(float(np.trapezoid((xs - mean) ** 2 * p, xs)))
        spec.expect("expect_mean", mean)
        spec.expect("expect_sd", sd)
        if spec.get("shade"):
            a, b = numbers(spec.get("shade"))
            m = (xs >= a) & (xs <= b)
            prob = float(np.trapezoid(p[m], xs[m]))
            ax.fill_between(xs[m], p[m], color=spec.colors[2], alpha=0.4, label=f"P = {prob:.3f}")
            spec.expect("expect_prob", prob)
        spec.labels(ax, "$x$", "probability density")
    reference_lines(spec, ax)
    if ax.get_legend_handles_labels()[0]:
        ax.legend(frameon=False)
    return fig


def draw_spectrum(spec: Spec):
    """A signal over time (top) and its amplitude spectrum (bottom), by FFT."""
    var = spec.get("var", "t")
    lo, hi = numbers(spec.need("x"))
    n = int(number(spec.get("n", "16384")))
    ts = np.linspace(lo, hi, n, endpoint=False)
    sig = as_array(compile_expr(spec.need("f"), spec.names(var))({**spec.scalars(), var: ts}), ts)
    window = np.hanning(n)
    amp = np.abs(np.fft.rfft(sig * window)) * 2 / window.sum()
    freqs = np.fft.rfftfreq(n, d=(hi - lo) / n)
    fmax = number(spec.get("fmax", str(freqs[-1])))
    keep = freqs <= fmax
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(6.4, 6.4 / float(spec.get("aspect", "1.15"))),
                                   gridspec_kw={"height_ratios": [1, 1.25]})
    show = spec.get("show", str(hi - lo))
    if "," in show:  # show=[t0,t1]: a window
        s0, s1 = numbers(show)
        m = (ts >= s0) & (ts <= s1)
    else:            # show=d: the first d time units
        m = ts <= lo + number(show)
    ax1.plot(ts[m], sig[m], color=spec.colors[0], lw=1.4)
    ax1.set_xlabel(spec.get("xlabel", f"time ${var}$"))
    ax1.set_ylabel("signal")
    ax2.plot(freqs[keep], amp[keep], color=spec.colors[1], lw=1.6)
    ax2.fill_between(freqs[keep], amp[keep], color=spec.colors[1], alpha=0.2)
    ax2.set_xlabel(spec.get("flabel", "frequency"))
    ax2.set_ylabel("amplitude")
    peak = float(freqs[keep][np.argmax(amp[keep])])
    k = int(number(spec.get("peaks", "1")))
    # label the k largest local maxima
    a = amp[keep]
    idx = [i for i in range(1, len(a) - 1) if a[i] >= a[i - 1] and a[i] > a[i + 1]]
    for i in sorted(idx, key=lambda i: -a[i])[:k]:
        ax2.annotate(f"{freqs[keep][i]:.4g}", (freqs[keep][i], a[i]), textcoords="offset points",
                     xytext=(0, 4), ha="center", fontsize=9, color=spec.colors[0])
    spec.expect("expect_peak", peak)
    fig.tight_layout()
    return fig


def draw_convolution(spec: Spec):
    """Input u(t), kernel G(t) (zero before t = 0) and output (G * u)(t), stacked."""
    var = spec.get("var", "t")
    lo, hi = numbers(spec.need("x"))
    n = int(number(spec.get("n", "8000")))
    ts = np.linspace(lo, hi, n)
    dt = ts[1] - ts[0]
    env = spec.scalars()
    u = as_array(compile_expr(spec.need("input"), spec.names(var))({**env, var: ts}), ts)
    tk = np.arange(n) * dt
    G = as_array(compile_expr(spec.need("kernel"), spec.names(var))({**env, var: tk}), tk)
    y = np.convolve(u, G)[:n] * dt
    fig, axes = plt.subplots(3, 1, figsize=(6.4, 6.4 / float(spec.get("aspect", "1.0"))), sharex=False)
    for ax, data, xs, label, c in ((axes[0], u, ts, spec.get("input_label", "input (kicks)"), spec.colors[2]),
                                   (axes[1], G, lo + tk, spec.get("kernel_label", "response to one kick, $G$"), spec.colors[1]),
                                   (axes[2], y, ts, spec.get("output_label", "output $= G * $ input"), spec.colors[0])):
        ax.plot(xs, data, color=c, lw=1.6)
        ax.fill_between(xs, data, color=c, alpha=0.15)
        ax.set_ylabel(label, fontsize=9)
        ax.set_xlim(lo, hi)
        ax.axhline(0, color="0.75", lw=0.6)
    axes[2].set_xlabel(spec.get("xlabel", f"time ${var}$"))
    reference_lines(spec, axes[2])
    spec.expect("expect_max", float(y.max()))
    spec.expect("expect_area", float(np.sum(y) * dt))
    fig.tight_layout()
    return fig


def vicsek(eta: float, n: int, box: float, radius: float, v0: float, steps: int, seed: int):
    """Vicsek model: each agent takes the mean heading of agents within `radius`, plus
    uniform noise of width `eta`; periodic box. Returns positions, headings, polarisation."""
    rng = np.random.default_rng(seed)
    pos = rng.random((n, 2)) * box
    th = rng.uniform(-np.pi, np.pi, n)
    pol = np.empty(steps)
    for k in range(steps):
        d = pos[:, None, :] - pos[None, :, :]
        d -= box * np.round(d / box)
        near = (d ** 2).sum(-1) < radius ** 2
        th = np.arctan2(near @ np.sin(th), near @ np.cos(th)) + eta * (rng.random(n) - 0.5)
        pos = (pos + v0 * np.c_[np.cos(th), np.sin(th)]) % box
        pol[k] = abs(np.mean(np.exp(1j * th)))
    return pos, th, pol


def draw_flock(spec: Spec):
    """Vicsek flock: snapshots at low and high noise, and the order (polarisation)
    against noise. Checks: expect_order_low, expect_order_high (mean of the last
    fifth of the run)."""
    n = int(number(spec.get("n", "400")))
    box = number(spec.get("box", "10"))
    radius = number(spec.get("radius", "1"))
    v0 = number(spec.get("v0", "0.03"))
    steps = int(number(spec.get("steps", "500")))
    seed = int(number(spec.get("seed", "4")))
    low, high = number(spec.get("low", "0.5")), number(spec.get("high", "4.0"))
    eta_lo, eta_hi = numbers(spec.get("eta", "[0.25,5.5]"))
    points = int(number(spec.get("points", "10")))
    curve_steps = int(number(spec.get("curve_steps", "300")))
    tail = max(1, steps // 5)
    fig, axes = plt.subplots(1, 3, figsize=(16, 4.6), gridspec_kw={"width_ratios": [1, 1, 1.4]})
    orders = {}
    for ax, eta, title, key in [(axes[0], low, "low noise: one direction", "expect_order_low"),
                                (axes[1], high, "high noise: no direction", "expect_order_high")]:
        pos, th, pol = vicsek(eta, n, box, radius, v0, steps, seed)
        orders[key] = float(pol[-tail:].mean())
        ax.quiver(pos[:, 0], pos[:, 1], np.cos(th), np.sin(th), color=spec.colors[0],
                  angles="xy", scale_units="xy", scale=2.2 * 10 / box, width=0.004)
        ax.set_xlim(0, box)
        ax.set_ylim(0, box)
        ax.set_aspect("equal")
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title(f"{title}  (order {orders[key]:.2f})", fontsize=11)
    etas = np.linspace(eta_lo, eta_hi, points)
    curve = [vicsek(e, n, box, radius, v0, curve_steps, seed)[2][-max(1, curve_steps // 3):].mean() for e in etas]
    axes[2].plot(etas, curve, "o-", color=spec.colors[1 % len(spec.colors)])
    axes[2].set_ylim(0, 1)
    axes[2].set_title(f"{n} agents, each copying its neighbours' heading", fontsize=11)
    for side in ("top", "right"):
        axes[2].spines[side].set_visible(False)
    spec.labels(axes[2], "noise $\\eta$ (radians)", "order (polarisation)")
    for key, value in orders.items():
        spec.expect(key, value)
    return fig


def _decomposition(text: str) -> list[tuple[str, float | None]]:
    """'$M_4$=4, $P_3$=3' -> [(name, dim)]; parts without '=' have no dimension."""
    parts = []
    pieces, buf, depth, maths = [], [], 0, False
    for ch in text:   # commas inside $...$, {...}, (...) or [...] do not split
        if ch == "$":
            maths = not maths
        elif ch in "{([":
            depth += 1
        elif ch in "})]":
            depth -= 1
        if ch == "," and depth == 0 and not maths:
            pieces.append("".join(buf).strip())
            buf = []
        else:
            buf.append(ch)
    if "".join(buf).strip():
        pieces.append("".join(buf).strip())
    for part in pieces:
        name, eq, value = part.rpartition("=")
        if not eq:
            parts.append((part.strip(), None))
        else:
            if not name.strip():
                raise SpecError(f"type-decomposition part {part!r} has no name")
            parts.append((name.strip(), number(value)))
    if not parts:
        raise SpecError("type-decomposition needs at least one part")
    dims = [d for _, d in parts]
    if any(d is None for d in dims) and not all(d is None for d in dims):
        raise SpecError("give every part a dimension (name=dim) or none of them")
    return parts


def draw_type_decomposition(spec: Spec):
    """A whole split into typed parts (a product or sum of spaces), widths by dimension;
    optionally a second decomposition of the same whole (iso=, drawn with a congruence)."""
    whole = spec.need("whole")
    ops = {"times": r"\times", "plus": "+", "oplus": r"\oplus", "sum": r"\oplus"}
    op_key = spec.get("op", "times")
    if op_key not in ops:
        raise SpecError(f"op={op_key!r} not one of {sorted(ops)}")
    op = ops[op_key]
    unit = spec.get("unit", "dim")
    rows = [(spec.get("row_label", ""), _decomposition(spec.need("parts")))]
    if spec.get("iso"):
        rows.append((spec.get("iso_label", ""), _decomposition(spec.get("iso"))))
    measured = rows[0][1][0][1] is not None
    total = sum(d for _, d in rows[0][1]) if measured else float(len(rows[0][1]))
    if measured:
        spec.expect("expect_total", total)
        spec.checks.append(f"total={total:g}")
    for label, parts in rows[1:]:
        if (parts[0][1] is not None) != measured:
            raise SpecError("parts and iso must both have dimensions, or neither")
        if measured:
            other = sum(d for _, d in parts)
            if abs(other - total) > 1e-9:
                raise SpecError(f"iso: the two decompositions differ in dimension ({total:g} and {other:g})")
            spec.checks.append(f"iso total={other:g} OK")
    fig, ax = spec.axes(2.8 if len(rows) == 1 else 2.0)
    height, gap = 0.55, 0.45
    tops = []
    labels = []  # (text, segment width): fitted to their segments once the axes are set
    for r, (label, parts) in enumerate(rows):
        y = -r * (height + gap)
        tops.append(y)
        widths = [d if measured else total / len(parts) for _, d in parts]
        x = 0.0
        for i, ((name, d), w) in enumerate(zip(parts, widths)):
            c = spec.colors[i % len(spec.colors)]
            ax.add_patch(plt.Rectangle((x, y), w, height, facecolor=c, alpha=0.22, edgecolor=c, lw=1.4))
            labels.append((ax.text(x + w / 2, y + height * (0.62 if measured else 0.5), name, ha="center", va="center", fontsize=11, color=c), w))
            if measured:
                ax.text(x + w / 2, y + height * 0.24, f"{d:g}", ha="center", va="center", fontsize=8.5, color="0.25")
            if i:
                ax.text(x, y + height + 0.06, f"${op}$", ha="center", va="bottom", fontsize=10, color="0.35")
            x += w
        if label:
            ax.text(-0.02 * total, y + height / 2, label, ha="right", va="center", fontsize=9, color="0.3")
    # the whole: a brace over the first row
    yb = height + 0.32
    ax.plot([0, 0, total, total], [yb - 0.08, yb, yb, yb - 0.08], color="0.2", lw=1)
    head = f"{whole}" + (f"   ({unit} {total:g})" if measured else "")
    ax.text(total / 2, yb + 0.06, head, ha="center", va="bottom", fontsize=12)
    if len(rows) > 1:
        ax.text(total / 2, (tops[0] + tops[1] + height) / 2, r"$\cong$", ha="center", va="center", fontsize=16, color="0.3")
    ax.set_xlim(-0.12 * total, 1.04 * total)
    ax.set_ylim(tops[-1] - 0.15, yb + 0.55)
    ax.axis("off")
    # a label wider than its segment: smaller type, then the words on a second line
    renderer = fig.canvas.get_renderer()
    for text, w in labels:
        limit = (ax.transData.transform((w, 0))[0] - ax.transData.transform((0, 0))[0]) * 0.92
        size = 11.0
        while text.get_window_extent(renderer).width > limit and size > 7.5:
            size -= 0.5
            text.set_fontsize(size)
        if text.get_window_extent(renderer).width > limit and " " in text.get_text():
            head, _, rest = text.get_text().partition(" ")
            if head.count("$") % 2 == 0:
                text.set_text(head + "\n" + rest)
                text.set_fontsize(min(size + 1, 10))
    return fig


def _matrix(spec: Spec, key: str) -> np.ndarray:
    """'[[a,b],[c,d]]' -> array; entries are expressions in the macro's parameters."""
    text = str(spec.need(key) if key == "matrix" else spec.get(key)).strip()
    if not (text.startswith("[") and text.endswith("]")):
        raise SpecError(f"{key} must look like [[1,0.5],[0.5,1]]")
    env = spec.scalars()
    rows = []
    for row in split_top(text[1:-1]):
        row = row.strip()
        if not (row.startswith("[") and row.endswith("]")):
            raise SpecError(f"{key}: each row must be a bracketed list, got {row!r}")
        rows.append([float(np.real(compile_expr(x, set(env))(env))) for x in split_top(row[1:-1])])
    if len({len(r) for r in rows}) != 1:
        raise SpecError(f"{key}: rows of different lengths")
    return np.array(rows, dtype=float)


def draw_matrix_heatmap(spec: Spec):
    """A matrix as a coloured grid (rows/cols named); optionally a second matrix on the
    same colour scale (matrix2, e.g. before and after) and their difference (diff=true)."""
    mats = [_matrix(spec, "matrix")]
    if spec.get("matrix2"):
        mats.append(_matrix(spec, "matrix2"))
        if mats[1].shape != mats[0].shape:
            raise SpecError("matrix and matrix2 must have the same shape")
    titles = [s.strip() for s in split_top(spec.get("titles", "")) if s.strip()]
    show_diff = flag(spec.p, "diff") and len(mats) == 2
    spec.used.add("diff")
    panels = mats + ([mats[1] - mats[0]] if show_diff else [])
    if show_diff:
        titles = (titles + ["", ""])[:2] + [spec.get("diff_title", "difference")]
    rows = [s.strip() for s in split_top(spec.get("rows", ""))]
    cols = [s.strip() for s in split_top(spec.get("cols", spec.p.get("rows", "")))]
    n, m = mats[0].shape
    if rows and len(rows) != n:
        raise SpecError(f"rows: {len(rows)} names for {n} rows")
    if cols and len(cols) != m:
        raise SpecError(f"cols: {len(cols)} names for {m} columns")
    A = mats[0]
    if spec.get("expect_eigen"):
        if n != m:
            raise SpecError("expect_eigen needs a square matrix")
        got = sorted(float(np.real(x)) for x in np.linalg.eigvals(A))
        for k, want in enumerate(numbers(spec.get("expect_eigen"))):
            spec.check(f"eigenvalue {k + 1}", got[k], want)
    spec.expect("expect_sum", float(A.sum()))
    if spec.get("expect_sum2") and len(mats) == 2:
        spec.expect("expect_sum2", float(mats[1].sum()))
    vmax = max(float(np.abs(M).max()) for M in mats) or 1.0
    diverging = any((M < 0).any() for M in panels) or show_diff
    cmap = "RdBu_r" if diverging else spec.cmap
    vmin = -vmax if diverging else min(0.0, float(min(M.min() for M in mats)))
    fig, axes = plt.subplots(1, len(panels), figsize=(3.2 * len(panels) + 0.6, 3.2), squeeze=False)
    values = str(spec.get("values", "true" if n * m <= 64 else "false")).lower() in ("true", "yes", "1", "on")
    for k, (ax, M) in enumerate(zip(axes[0], panels)):
        lim = (max(float(np.abs(M).max()), 1e-12) if (show_diff and k == 2) else vmax)
        im = ax.imshow(M, cmap=cmap, vmin=-lim if diverging else vmin, vmax=lim, aspect="equal")
        ax.set_xticks(range(m), cols if cols else [str(i + 1) for i in range(m)], fontsize=8)
        ax.set_yticks(range(n), rows if rows else [str(i + 1) for i in range(n)], fontsize=8)
        ax.tick_params(length=0)
        for s in ax.spines.values():
            s.set_visible(False)
        if values:
            for i in range(n):
                for jx in range(m):
                    v = M[i, jx]
                    ax.text(jx, i, f"{v:.2g}", ha="center", va="center", fontsize=7.5,
                            color="white" if abs(v) > 0.6 * lim else "0.15")
        if k < len(titles) and titles[k]:
            ax.set_title(titles[k], fontsize=10)
    fig.colorbar(im, ax=list(axes[0]), shrink=0.8, pad=0.03)
    return fig


def draw_process_diagram(spec: Spec):
    """Named steps with arrows: a cycle (layout=cycle, the default) or a line; optional
    labels on the arrows (edges=), an arrow back from the last step (loop=true on a line)."""
    steps = [s.strip() for s in split_top(spec.need("steps")) if s.strip()]
    if len(steps) < 2:
        raise SpecError("process-diagram needs at least two steps")
    edges = [s.strip() for s in split_top(spec.get("edges", ""))]
    layout = spec.get("layout", "cycle")
    if layout not in ("cycle", "line"):
        raise SpecError("layout must be cycle or line")
    loop = layout == "cycle" or flag(spec.p, "loop")
    spec.used.add("loop")
    k = len(steps)
    if layout == "cycle":
        fig, ax = spec.axes(1.25)
        angles = [math.pi / 2 - 2 * math.pi * i / k for i in range(k)]
        pos = [(math.cos(a), math.sin(a)) for a in angles]
        ax.set_xlim(-1.75, 1.75)
        ax.set_ylim(-1.45, 1.45)
    else:
        fig, ax = spec.axes(max(2.4, 1.25 * k))
        pos = [(i * 2.2, 0.0) for i in range(k)]
        ax.set_xlim(-1.2, (k - 1) * 2.2 + 1.2)
        ax.set_ylim(-1.15 if loop else -0.6, 0.6)
    boxes = []
    for i, (name, (x, y)) in enumerate(zip(steps, pos)):
        c = spec.colors[i % len(spec.colors)]
        boxes.append(ax.text(x, y, name, ha="center", va="center", fontsize=10 if layout == "cycle" else 9, color=c,
                             bbox=dict(boxstyle="round,pad=0.45", facecolor="white", edgecolor=c, lw=1.4)))
    pairs = [(i, i + 1) for i in range(k - 1)] + ([(k - 1, 0)] if loop else [])
    for e, (a, b) in enumerate(pairs):
        # arrows run between the boxes' edges (clipped by the box outlines)
        style = dict(arrowstyle="-|>", color="0.35", lw=1.2, shrinkA=4, shrinkB=4,
                     patchA=boxes[a].get_bbox_patch(), patchB=boxes[b].get_bbox_patch())
        if layout == "line" and (a, b) == (k - 1, 0):
            style["connectionstyle"] = "arc3,rad=-0.3"
        elif layout == "cycle":
            style["connectionstyle"] = "arc3,rad=-0.18"
        ax.annotate("", xy=pos[b], xytext=pos[a], arrowprops=style)
        if e < len(edges) and edges[e]:
            mx, my = (pos[a][0] + pos[b][0]) / 2, (pos[a][1] + pos[b][1]) / 2
            if layout == "cycle":
                r = math.hypot(mx, my) or 1.0
                mx, my = mx / r * (r + 0.32), my / r * (r + 0.32)
            elif (a, b) == (k - 1, 0):
                my = -0.95
            else:
                my += 0.18
            ax.text(mx, my, edges[e], ha="center", va="center", fontsize=8, color="0.3", style="italic")
    spec.expect("expect_steps", float(k))
    ax.axis("off")
    return fig


def draw_data_points(spec: Spec):
    """Tabulated data from the text as points: points="x:y, x:y" (optional yerr= in the same
    order, names= labels), optionally a least-squares fit (fit=linear|exp) or a model
    curve f(x) from the text to compare; logx/logy as for function plots."""
    pts = []
    for part in split_top(spec.need("points")):
        x, sep, y = part.partition(":")
        if not sep:
            raise SpecError(f"data-points: {part!r} must be x:y")
        pts.append((number(x), number(y)))
    if len(pts) < 2:
        raise SpecError("data-points needs at least two points")
    xs = np.array([p[0] for p in pts])
    ys = np.array([p[1] for p in pts])
    yerr = numbers(spec.get("yerr", ""))
    if yerr and len(yerr) != len(pts):
        raise SpecError(f"yerr: {len(yerr)} values for {len(pts)} points")
    names = [s.strip() for s in split_top(spec.get("names", ""))]
    fig, ax = spec.axes()
    logx, logy = flag(spec.p, "logx"), flag(spec.p, "logy")
    spec.used.update({"logx", "logy"})
    c0 = spec.colors[0]
    ax.errorbar(xs, ys, yerr=yerr or None, fmt="o", color=c0, ms=5, capsize=3, lw=1, label=spec.get("name", "data"))
    for i, n in enumerate(names):
        if i < len(pts) and n:
            ax.annotate(n, (xs[i], ys[i]), textcoords="offset points", xytext=(5, 5), fontsize=8, color="0.3")
    grid = np.logspace(np.log10(xs.min()), np.log10(xs.max()), 300) if logx else np.linspace(xs.min(), xs.max(), 300)
    fit = spec.get("fit", "none")
    if fit not in ("none", "linear", "exp"):
        raise SpecError("fit must be none, linear or exp")
    if fit == "linear":
        slope, icpt = np.polyfit(xs, ys, 1)
        ax.plot(grid, slope * grid + icpt, color=spec.colors[1], lw=1.4, label=f"fit: slope {slope:.3g}")
        spec.expect("expect_slope", float(slope))
        spec.expect("expect_intercept", float(icpt))
    elif fit == "exp":
        if (ys <= 0).any():
            raise SpecError("fit=exp needs positive y values")
        rate, lna = np.polyfit(xs, np.log(ys), 1)
        ax.plot(grid, np.exp(lna) * np.exp(rate * grid), color=spec.colors[1], lw=1.4, label=f"fit: $e^{{{rate:.3g}x}}$")
        spec.expect("expect_slope", float(rate))
    if spec.get("f"):
        model = compile_expr(spec.get("f"), spec.names("x"))
        ax.plot(grid, as_array(model({**spec.scalars(), "x": grid}), grid), color=spec.colors[2], lw=1.4, ls="--",
                label=spec.get("f_name", "model"))
    spec.expect("expect_n", float(len(pts)))
    if logx:
        ax.set_xscale("log")
    if logy:
        ax.set_yscale("log")
    reference_lines(spec, ax)
    spec.labels(ax, "$x$", "$y$")
    place_legend(spec, ax)
    return fig


DRAW = {
    "function-plot": draw_function_plot, "area-under": draw_area_under,
    "log-scale": draw_log_scale, "complex-plane": draw_complex_plane,
    "vector-field": draw_vector_field, "contour-map": draw_contour_map,
    "energy-landscape": draw_energy_landscape, "eigen-transform": draw_eigen_transform,
    "distribution": draw_distribution, "spectrum": draw_spectrum, "convolution": draw_convolution,
    "flock": draw_flock, "type-decomposition": draw_type_decomposition,
    "matrix-heatmap": draw_matrix_heatmap, "process-diagram": draw_process_diagram,
    "data-points": draw_data_points,
}


def referenced_names(spec: Spec) -> set[str]:
    names: set[str] = set()
    for v in spec.p.values():
        names.update(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", v))
    return names


def main(argv: list[str]) -> int:
    # section ids and captions may be Unicode (w₈); the Windows console codepage is not
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    if not argv:
        print(__doc__)
        return 2
    manifest = Path(argv[0])
    force = "--force" in argv
    specs = json.loads(manifest.read_text(encoding="utf-8")) if manifest.exists() else []
    # Per-document lists (visualize/docs/<document>.json) share the images of their folder.
    out_dir = manifest.parent.parent if manifest.parent.name == "docs" else manifest.parent
    errors = drawn = 0
    for raw in specs:
        spec = Spec(raw)
        target = out_dir / f"{spec.id}.png"
        checked = any(k.startswith("expect_") for k in spec.p)
        if target.exists() and not force and not checked:
            continue
        try:
            fig = DRAW[spec.primitive](spec)
            unused = set(spec.p) - spec.used - COMMON - referenced_names(spec)
            if unused:
                raise SpecError(f"unused parameters {sorted(unused)} (misspelt?)")
            fig.savefig(target, bbox_inches="tight")
            plt.close(fig)
            drawn += 1
            note = "; ".join(spec.checks)
            print(f"visualize {spec.id} {spec.primitive} [{spec.context}]" + (f": {note}" if note else ""))
        except Exception as exc:  # any failure is reported against its spec and fails the build
            plt.close("all")
            errors += 1
            kind = "" if isinstance(exc, SpecError) else f"{type(exc).__name__}: "
            print(f"visualize ERROR [{spec.context}] {spec.primitive}: {kind}{exc}", file=sys.stderr)
    print(f"visualize: {len(specs)} figures, {drawn} drawn, {errors} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
