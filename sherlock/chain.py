"""Sherlock's chain finder: the OpenCyc path between two constants, as Lean.

Aesop finds single facts but does not guess the middle collection of a long
`genls` chain, so affidavits spell chains out. This finds them:

    python sherlock/chain.py genls Perceiving TemporalThing   # A genls* B
    python sherlock/chain.py isa ArabicLanguage InformationStore
    python sherlock/chain.py disjoint Perceiving MathematicalObject

and prints the Lean term (with the `link` macro of the affidavits: one
`genls` fact found by Aesop) or, for `disjoint`, the disjointness that makes
two collections incompatible with both chains. Facts are read from NextKB's
UniversalVocabularyMt (MT=... to choose another microtheory), cached in
bld/sherlock/index-<mt>.json.
"""
from __future__ import annotations

import json
import os
import re
import sys
import zipfile
from collections import defaultdict, deque
from pathlib import Path

U = Path(__file__).resolve().parents[1]
ZIP = U / "bld" / "sherlock" / "raw" / "nextkb_files_20190107.zip"
FACT = re.compile(r"\((isa|genls|disjointWith) ([\w-]+) ([\w-]+)\)")


def index(mt: str) -> dict[str, dict[str, list[str]]]:
    cache = U / "bld" / "sherlock" / f"index-{mt}.json"
    if cache.exists():
        return json.loads(cache.read_text(encoding="utf-8"))
    idx: dict[str, dict[str, list[str]]] = {"isa": defaultdict(list), "genls": defaultdict(list),
                                            "disjointWith": defaultdict(list)}
    with zipfile.ZipFile(ZIP) as z:
        for n in z.namelist():
            if n.endswith(f"/{mt}.krf") or n == f"{mt}.krf" or re.search(rf"/{re.escape(mt)}\.krf$", n):
                for p, a, b in FACT.findall(z.read(n).decode("utf-8", "replace")):
                    idx[p][a].append(b)
                    if p == "disjointWith":
                        idx[p][b].append(a)
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(idx), encoding="utf-8")
    return idx


def up(idx, start: str) -> dict[str, str | None]:
    """Shortest genls paths from start: node -> predecessor."""
    prev: dict[str, str | None] = {start: None}
    q = deque([start])
    while q:
        x = q.popleft()
        for b in idx["genls"].get(x, []):
            if b not in prev:
                prev[b] = x
                q.append(b)
    return prev


def path(prev, node: str) -> list[str]:
    out = [node]
    while prev[out[-1]] is not None:
        out.append(prev[out[-1]])
    return out[::-1]


def lean_chain(p: list[str]) -> str:
    """genls p[0] p[-1] as nested genls_trans over one-fact links."""
    if len(p) == 2:
        return "link"
    return "\n  ".join(f'genls_trans (b := .c "{m}") link <|' for m in p[1:-2]) + \
        ("\n  " if len(p) > 3 else "") + f'genls_trans (b := .c "{p[-2]}") link link'


def main() -> int:
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    cmd, a, b = sys.argv[1:]
    mt = os.environ.get("MT", "UniversalVocabularyMt")
    idx = index(mt)
    if cmd == "genls":
        prev = up(idx, a)
        if b not in prev:
            print(f"no genls path from {a} to {b} in {mt}")
            return 1
        p = path(prev, b)
        print(f"-- {' -> '.join(p)}  ({mt})")
        print(lean_chain(p))
    elif cmd == "isa":
        for c in idx["isa"].get(a, []):
            prev = up(idx, c)
            if b in prev:
                p = path(prev, b)
                print(f"-- {a} isa {' -> '.join(p)}  ({mt})")
                print(f'isa_genls (c := .c "{c}") (by aesop (rule_sets := [Cyc]))' +
                      ("" if len(p) == 1 else f"\n  ({lean_chain(p)})"))
                return 0
        print(f"no isa path from {a} to {b} in {mt}")
        return 1
    elif cmd == "disjoint":
        pa, pb = up(idx, a), up(idx, b)
        for x in pa:
            for y in idx["disjointWith"].get(x, []):
                if y in pb:
                    print(f"-- disjointWith {x} {y}  ({mt})")
                    print(f"-- {' -> '.join(path(pa, x))}")
                    print(f"-- {' -> '.join(path(pb, y))}")
                    print(f'disjoint (c := .c "{x}") (d := .c "{y}")')
                    return 0
        print(f"no disjointness between {a} and {b} in {mt}")
        return 1
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
