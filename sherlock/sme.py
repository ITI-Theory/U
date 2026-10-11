"""Sherlock's structure mapping: a small SME over relational descriptions (ISS-063).

    python sherlock/sme.py zsf-double-wells      # registry/analogies/<id>.yaml

Structure-Mapping Engine after Falkenhainer, Forbus & Gentner (1989):
match hypotheses pair base and target expressions with the same predicate
(identicality) whose arguments correspond; a mapping is one-to-one
(structural consistency); scores trickle down from higher-order relations to
their arguments (systematicity); a greedy merge of kernels gives the best
global mapping; candidate inferences are base facts whose arguments are
mapped but which have no target counterpart: what the analogy says the target
should also have. Writes bld/sherlock/sme-<id>.md.
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
TRICKLE = 0.8


def parse(s: str):
    tokens = s.replace("(", " ( ").replace(")", " ) ").split()

    def read(i):
        if tokens[i] == "(":
            out, i = [], i + 1
            while tokens[i] != ")":
                x, i = read(i)
                out.append(x)
            return tuple(out), i + 1
        return tokens[i], i + 1
    return read(0)[0]


def subexpressions(e):
    yield e
    for a in e[1:]:
        if isinstance(a, tuple):
            yield from subexpressions(a)


def match(b, t, mh):
    """Match hypothesis for expressions b, t: their entity map, or None."""
    if (b, t) in mh:
        return mh[(b, t)]
    result = None
    if b[0] == t[0] and len(b) == len(t):
        emap = {}
        ok = True
        for x, y in zip(b[1:], t[1:]):
            if isinstance(x, tuple) and isinstance(y, tuple):
                sub = match(x, y, mh)
                if sub is None:
                    ok = False
                    break
                pairs = sub.items()
            elif not isinstance(x, tuple) and not isinstance(y, tuple):
                pairs = [(x, y)]
            else:
                ok = False
                break
            for k, v in pairs:
                if emap.get(k, v) != v:
                    ok = False
                emap[k] = v
        if ok and len(set(emap.values())) == len(emap):
            result = emap
    mh[(b, t)] = result
    return result


def score(b, t, mh, weight=1.0):
    """Trickle-down systematicity: a match counts 1, its matched arguments get 0.8 of it."""
    total = weight
    for x, y in zip(b[1:], t[1:]):
        if isinstance(x, tuple):
            total += score(x, y, mh, weight * TRICKLE)
    return total


def consistent(m1, m2):
    inv1 = {v: k for k, v in m1.items()}
    return all(m1.get(k, v) == v and inv1.get(v, k) == k for k, v in m2.items())


def sme(base, target):
    mh = {}
    roots = []
    for b in base:
        for t in target:
            m = match(b, t, mh)
            if m is not None:
                roots.append((score(b, t, mh), b, t, m))
    roots.sort(key=lambda r: -r[0])
    # kernels whose expressions are not arguments of another matched pair come first
    inner = {(x, y) for _, b, t, _ in roots for x, y in zip(b[1:], t[1:]) if isinstance(x, tuple)}
    kernels = [r for r in roots if (r[1], r[2]) not in inner]
    emap, chosen, total = {}, [], 0.0
    for s, b, t, m in kernels:
        if consistent(emap, m) and all(b != c[1] and t != c[2] for c in chosen):
            emap.update(m)
            chosen.append((s, b, t))
            total += s
    matched = {b for _, b, _ in chosen} | {x for _, b, _ in chosen for x in subexpressions(b)}
    inferences = []
    for b in base:
        if b in matched:
            continue
        ents = [a for e in subexpressions(b) for a in e[1:] if not isinstance(a, tuple)]
        if any(a in emap for a in ents):
            inferences.append(project(b, emap))
    return emap, chosen, total, inferences


def project(e, emap):
    return "(" + " ".join(project(a, emap) if isinstance(a, tuple) else
                          (a if a == e[0] else emap.get(a, f"?{a}")) for a in e) + ")"


def show(e):
    return "(" + " ".join(show(a) if isinstance(a, tuple) else a for a in e) + ")"


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    an = yaml.safe_load((U / "registry" / "analogies" / f"{sys.argv[1]}.yaml").read_text(encoding="utf-8"))
    base = [parse(f["s"]) for f in an["base"]["facts"]]
    target = [parse(f["s"]) for f in an["target"]["facts"]]
    emap, chosen, total, inferences = sme(base, target)
    best = sum(score(b, b, {}) for b in base)
    out = [f"# Structure mapping: {an['base']['name']} -> {an['target']['name']}", "",
           f"Claim: {an['claim']}", "",
           f"Score {total:.2f} of {best:.2f} for a perfect match of the base "
           f"({total / best:.0%}); {len(chosen)} of {len(base)} base facts mapped.", "",
           "## Correspondences", ""]
    out += [f"- {k} -> {v}" for k, v in emap.items()]
    out += ["", "## Matched facts", ""] + [f"- {show(b)}  ~  {show(t)}  ({s:.2f})" for s, b, t in chosen]
    out += ["", "## Candidate inferences (the analogy says the target should also have these)", ""]
    out += [f"- {i}" for i in inferences] or ["- none"]
    matched_t = {x for _, _, t in chosen for x in subexpressions(t)}
    unmatched_t = [t for t in target if t not in matched_t]
    out += ["", "## Target facts with no base counterpart", ""] + [f"- {show(t)}" for t in unmatched_t]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"sme-{an['id']}.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print("\n".join(out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
