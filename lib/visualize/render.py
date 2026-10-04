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
COMMON = {"aspect", "xlabel", "ylabel", "zlabel", "expect_tol"}
GREEK = {"alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "kappa", "lambda",
         "mu", "nu", "xi", "pi", "rho", "sigma", "tau", "phi", "chi", "psi", "omega", "Omega", "Delta"}


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
    return lambda env: eval(code, {"__builtins__": {}}, {**SAFE, **env})  # noqa: S307


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
    for key in curve_keys(spec):
        fn = compile_expr(spec.get(key), allowed)
        name = spec.get("name" + key[1:])
        for label, env in spec.family():
            ys = as_array(fn({**env, var: xs}), xs)
            if first is None:
                first = (fn, env)
            parts = [s for s in (name, label) if s]
            ax.plot(xs, ys, color=next(color), lw=2, label=", ".join(parts) or None)
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
    if ax.get_legend_handles_labels()[0]:
        ax.legend(frameon=False)
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
        ax.text(corner[0], corner[1], f"{n} strips ({rule} points): {total:.4g}\nexact area: {exact:.4g}",
                transform=ax.transAxes, ha=corner[2], va="top")
        spec.expect("expect_sum", total)
    else:
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
    for label, env in spec.family():
        c = next(color)
        for i, text in enumerate(exprs):
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
                ax.annotate(tag, (z.real, z.imag), textcoords="offset points", xytext=(6, 6), color=c, fontsize=9)
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
        ax.plot(cx, cy, color=RED, lw=2)
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
                ax.text(xs[i_min], (ys[i_min] + ys[i_top]) / 2, "  barrier", color=RED, va="center")
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
    if ax.get_legend_handles_labels()[0]:
        ax.legend(frameon=False)
    return fig


DRAW = {
    "function-plot": draw_function_plot, "area-under": draw_area_under,
    "log-scale": draw_log_scale, "complex-plane": draw_complex_plane,
    "vector-field": draw_vector_field, "contour-map": draw_contour_map,
    "energy-landscape": draw_energy_landscape, "eigen-transform": draw_eigen_transform,
    "distribution": draw_distribution,
}


def referenced_names(spec: Spec) -> set[str]:
    names: set[str] = set()
    for v in spec.p.values():
        names.update(re.findall(r"[A-Za-z_][A-Za-z0-9_]*", v))
    return names


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__)
        return 2
    manifest = Path(argv[0])
    force = "--force" in argv
    specs = json.loads(manifest.read_text(encoding="utf-8")) if manifest.exists() else []
    out_dir = manifest.parent
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
