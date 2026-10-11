"""Sherlock's equation twins: units and values of a document's equations (epic D10).

    python sherlock/equations.py zoomable-somatic-field
    python sherlock/equations.py                                      # every affidavit with equations
    python sherlock/equations.py --expr "exp(-1j*E/hbar)" --units "E=J,hbar=J*s"   # try one

An affidavit may declare `symbols` (each symbol's unit: m, s, kg, J, eV, Hz,
1 for dimensionless, products and quotients such as m/s or J*s) and
`equations`: a quote of the LaTeX (found in the frozen text), lines, and a
formal twin in the Visualize expression syntax (`exp(-8*sqrt(2*W)/3)`, or
`lhs = rhs`). Sherlock checks that every symbol of the twin is declared,
that both sides of an equation have the same dimensions, that what goes into
exp, log, sin, cos, tanh (and the like) is dimensionless, and, given `where`
values and `expect`, that the equation gives the document's number. Arbitrary
LaTeX is not parsed: the twin is the formal statement, the quote ties it to
the text. Writes bld/sherlock/equations-<id>.md.
"""
from __future__ import annotations

import argparse
import ast
import cmath
import math
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
BASE = ("kg", "m", "s", "A", "K")
UNITS = {  # unit -> (dimension exponents over BASE, factor to SI)
    "1": ((0, 0, 0, 0, 0), 1.0), "kg": ((1, 0, 0, 0, 0), 1.0), "m": ((0, 1, 0, 0, 0), 1.0),
    "s": ((0, 0, 1, 0, 0), 1.0), "A": ((0, 0, 0, 1, 0), 1.0), "K": ((0, 0, 0, 0, 1), 1.0),
    "Hz": ((0, 0, -1, 0, 0), 1.0), "N": ((1, 1, -2, 0, 0), 1.0), "J": ((1, 2, -2, 0, 0), 1.0),
    "eV": ((1, 2, -2, 0, 0), 1.602176634e-19), "W": ((1, 2, -3, 0, 0), 1.0),
    "C": ((0, 0, 1, 1, 0), 1.0), "V": ((1, 2, -3, -1, 0), 1.0), "km": ((0, 1, 0, 0, 0), 1e3),
    "mm": ((0, 1, 0, 0, 0), 1e-3), "ms": ((0, 0, 1, 0, 0), 1e-3),
}
DIMLESS_FUNCS = {"exp", "log", "ln", "sin", "cos", "tan", "tanh", "sinh", "cosh", "arctan", "atan", "erf"}
CONSTS = {"pi": math.pi, "e": math.e}
Dim = tuple


def parse_unit(u: str) -> tuple[Dim, float]:
    """'m/s', 'J*s', '1/m', 'm^2', 'kg*m**2/s'."""
    u = u.replace("^", "**").replace(" ", "")
    dim, fac = [0] * len(BASE), 1.0
    sign = 1
    for tok in __import__("re").split(r"(?<!\*)([*/])(?!\*)", u):
        if tok in ("*", "/"):
            sign = 1 if tok == "*" else -1
            continue
        if not tok:
            continue
        name, _, power = tok.partition("**")
        p = float(power) if power else 1.0
        d, f = UNITS[name] if name in UNITS else (UNITS["1"] if name.replace(".", "").isdigit() else None)
        if d is None:
            raise ValueError(f"unknown unit {name!r}")
        if name.replace(".", "").isdigit():
            f = float(name)
        dim = [a + sign * p * b for a, b in zip(dim, d)]
        fac *= f ** (sign * p)
    return tuple(dim), fac


def show_dim(d: Dim) -> str:
    parts = [f"{b}^{int(x) if x == int(x) else x}" if x != 1 else b for b, x in zip(BASE, d) if x]
    return "·".join(parts) or "dimensionless"


class DimError(Exception):
    pass


def dim_of(node, units: dict[str, Dim]) -> Dim:
    """Dimensions of an expression; raises DimError with the reason."""
    zero = (0,) * len(BASE)
    if isinstance(node, ast.Constant):
        return zero
    if isinstance(node, ast.Name):
        if node.id in CONSTS:
            return zero
        if node.id not in units:
            raise DimError(f"symbol {node.id!r} is not declared")
        return units[node.id]
    if isinstance(node, ast.UnaryOp):
        return dim_of(node.operand, units)
    if isinstance(node, ast.BinOp):
        a, b = dim_of(node.left, units), dim_of(node.right, units)
        if isinstance(node.op, (ast.Add, ast.Sub)):
            if a != b:
                raise DimError(f"adding {show_dim(a)} to {show_dim(b)} in {ast.unparse(node)}")
            return a
        if isinstance(node.op, ast.Mult):
            return tuple(x + y for x, y in zip(a, b))
        if isinstance(node.op, ast.Div):
            return tuple(x - y for x, y in zip(a, b))
        if isinstance(node.op, ast.Pow):
            if b != zero:
                raise DimError(f"exponent {ast.unparse(node.right)} is not dimensionless")
            try:
                p = float(ast.literal_eval(node.right))
            except ValueError:
                if a != zero:
                    raise DimError(f"{show_dim(a)} raised to a symbolic power in {ast.unparse(node)}")
                return zero
            return tuple(x * p for x in a)
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
        f = node.func.id
        args = [dim_of(a, units) for a in node.args]
        if f in DIMLESS_FUNCS:
            if any(a != zero for a in args):
                raise DimError(f"{f}({ast.unparse(node.args[0])}): the argument has dimension {show_dim(args[0])}")
            return zero
        if f == "sqrt":
            return tuple(x / 2 for x in args[0])
        if f == "abs":
            return args[0]
    raise DimError(f"cannot read {ast.unparse(node)}")


def value(node, env):
    names = {"sqrt": cmath.sqrt, "exp": cmath.exp, "log": cmath.log, "sin": cmath.sin, "cos": cmath.cos,
             "tanh": cmath.tanh, "abs": abs, **CONSTS, **env}
    v = eval(compile(ast.Expression(node), "<twin>", "eval"), {"__builtins__": {}}, names)
    return v.real if isinstance(v, complex) and abs(v.imag) < 1e-12 else v


def check_equation(eq: dict, units: dict[str, Dim], factors: dict[str, float]) -> list[str]:
    problems = []
    twin = eq["twin"]
    sides = [s.strip() for s in twin.split("=")] if "=" in twin.replace("==", "") else [twin]
    trees = [ast.parse(s, mode="eval").body for s in sides]
    dims = []
    for s, t in zip(sides, trees):
        try:
            dims.append(dim_of(t, units))
        except DimError as e:
            problems.append(str(e))
    if len(dims) == 2 and dims[0] != dims[1]:
        problems.append(f"the two sides differ: {show_dim(dims[0])} and {show_dim(dims[1])}")
    if "expect" in eq and not problems:
        env = {k: float(v) * factors.get(k, 1.0) for k, v in (eq.get("where") or {}).items()}
        got = value(trees[-1], env)
        want, tol = float(eq["expect"]), float(eq.get("tolerance", 0.05))
        target = trees[0] if len(trees) == 2 else None
        if abs(got - want) > tol * abs(want):
            problems.append(f"gives {got:.6g}, the document says {want:g} (tolerance {tol:.0%})")
        eq["_value"] = got
    return problems


def run(aff: dict) -> list[str]:
    symbols = aff.get("symbols") or {}
    units = {s: parse_unit(u)[0] for s, u in symbols.items()}
    factors = {s: parse_unit(u)[1] for s, u in symbols.items()}
    out = [f"# Equations: {aff['title']}", ""]
    bad = 0
    for eq in aff.get("equations") or []:
        problems = check_equation(eq, units, factors)
        bad += bool(problems)
        val = f"; value {eq['_value']:.6g}" if "_value" in eq else ""
        out.append(f"- **{eq['id']}** (lines {eq.get('lines')}) `{eq['twin']}`: "
                   + ("; ".join(problems) if problems else f"units consistent{val}"))
    out.insert(2, f"{len(aff.get('equations') or [])} equations, {bad} with problems.\n")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("id", nargs="?")
    ap.add_argument("--expr")
    ap.add_argument("--units", default="")
    args = ap.parse_args()
    if args.expr:
        syms = dict(kv.split("=") for kv in args.units.split(",") if kv)
        aff = {"title": "one expression", "symbols": syms, "equations": [{"id": "expr", "twin": args.expr}]}
        lines = run(aff)
        print("\n".join(lines[2:]))
        return 1 if "with problems" in lines[2] and not lines[2].startswith("1 equations, 0") else 0
    ids = [args.id] if args.id else sorted(p.stem for p in (U / "registry" / "affidavits").glob("*.yaml"))
    failed = 0
    OUT.mkdir(parents=True, exist_ok=True)
    for i in ids:
        aff = yaml.safe_load((U / "registry" / "affidavits" / f"{i}.yaml").read_text(encoding="utf-8"))
        if not aff.get("equations"):
            continue
        lines = run(aff)
        (OUT / f"equations-{i}.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
        print("\n".join(lines) if args.id else f"{i}: {lines[2].strip()}")
        failed += ", 0 with problems" not in lines[2]
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
