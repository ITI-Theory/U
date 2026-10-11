"""Sherlock's MAC/FAC: where else does this structure occur? (ISS-063)

    python sherlock/macfac.py check     # validate registry/cases (vocabulary, arity, frozen sources, lines)
    python sherlock/macfac.py report    # retrieval for every case, the tests, the shared core -> bld/sherlock/macfac.md

MAC/FAC after Forbus, Gentner & Law (1995). MAC ("many are called"): each case's
content vector counts its predicates (nested ones too); the dot product of two
vectors is a cheap estimate of how much structure they could share; the best
few go on. FAC ("few are chosen"): the Structure-Mapping Engine (sme.py) maps
the probe onto each, and the best mappings are the retrieval.

A case (registry/cases/<id>.yaml) is a relational description of one thing a
document models (one scale of P11's catalogue, one paper's model), in the shared
vocabulary (registry/cases/vocabulary.yaml), each fact with its line in the
frozen source. A document's own sameness claims are never facts: they are the
tests (registry/cases/tests.yaml), and the report says how much structure the
claimed partners share (similarity: the mapping's score over the probe's score
against itself; the mean of both directions) and whether MAC/FAC, given the
probe, retrieves the claimed partner at all. The numbers measure the structure
as written in the cases; the extraction is interpretive, so each fact cites its line.
"""
from __future__ import annotations

import hashlib
import subprocess
import sys
from collections import Counter
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sme import parse, score, show, sme, subexpressions  # noqa: E402

U = Path(__file__).resolve().parents[1]
CASES = U / "registry" / "cases"
OUT = U / "bld" / "sherlock"
MAC_KEEP = 4  # candidates MAC passes to FAC


def load():
    vocab = yaml.safe_load((CASES / "vocabulary.yaml").read_text(encoding="utf-8"))["predicates"]
    cases = {}
    for f in sorted(CASES.glob("*.yaml")):
        if f.name in ("vocabulary.yaml", "tests.yaml"):
            continue
        c = yaml.safe_load(f.read_text(encoding="utf-8"))
        c["_file"] = f
        c["_facts"] = [parse(x["s"]) for x in c.get("facts") or []]
        cases[c["id"]] = c
    tests = (yaml.safe_load((CASES / "tests.yaml").read_text(encoding="utf-8")) or {}).get("tests", []) \
        if (CASES / "tests.yaml").exists() else []
    return vocab, cases, tests


def frozen(src: dict) -> str | None:
    r = subprocess.run(["git", "show", f"{src['commit']}:{src['file']}"], cwd=U, capture_output=True)
    if r.returncode:
        return None
    if hashlib.sha256(r.stdout).hexdigest() != src["sha256"]:
        return None
    return r.stdout.decode("utf-8")


def check() -> int:
    vocab, cases, tests = load()
    problems, warnings = [], []
    texts = {}
    for cid, c in cases.items():
        where = c["_file"].name
        if c["_file"].stem != cid:
            problems.append(f"{where}: id {cid} is not the file name")
        src = c.get("source") or {}
        key = (src.get("file"), src.get("commit"))
        if key not in texts:
            texts[key] = frozen(src) if all(src.get(k) for k in ("file", "commit", "sha256")) else None
        text = texts[key]
        if text is None:
            problems.append(f"{where}: source not found at its commit, or the SHA-256 differs")
        nlines = len(text.splitlines()) if text else 0
        proposed = c.get("proposed") or {}
        for x, e in zip(c.get("facts") or [], c["_facts"]):
            for sub in subexpressions(e):
                p = sub[0]
                spec = vocab.get(p) or proposed.get(p)
                if spec is None:
                    problems.append(f"{where}: unknown predicate {p} in {x['s']}")
                elif len(sub) - 1 != spec["arity"]:
                    problems.append(f"{where}: {p} takes {spec['arity']} arguments: {x['s']}")
                elif p in proposed and p not in vocab:
                    warnings.append(f"{where}: proposed predicate {p} ({proposed[p].get('gloss', '')})")
            line = x.get("line")
            if not isinstance(line, int) or not (text and 1 <= line <= nlines):
                problems.append(f"{where}: line {line} not in the frozen source: {x['s']}")
    for t in tests:
        for cid in [c for pair in t.get("pairs", []) for c in pair] + t.get("cases", []):
            if cid not in cases:
                problems.append(f"tests.yaml {t['id']}: unknown case {cid}")
    for w in sorted(set(warnings)):
        print("WARN", w)
    for p in problems:
        print("FAIL", p)
    print(f"cases: {len(cases)} cases, {sum(len(c['_facts']) for c in cases.values())} facts, "
          f"{len(tests)} tests, {len(problems)} problems")
    return 1 if problems else 0


def content(facts) -> Counter:
    return Counter(sub[0] for e in facts for sub in subexpressions(e))


def self_score(facts) -> float:
    return sum(score(e, e, {}) for e in facts) or 1.0


def similarity(a, b) -> tuple[float, float, list]:
    """SME score of a onto b over a's self-score, both directions; the chosen pairs of a -> b."""
    _, chosen_ab, total_ab, _ = sme(a, b)
    _, _, total_ba, _ = sme(b, a)
    return total_ab / self_score(a), total_ba / self_score(b), chosen_ab


def ranked(probe: str, cases: dict, drop: frozenset = frozenset()) -> list[tuple[str, float]]:
    """Every other case by structural similarity to the probe (FAC over all: the library is small)."""
    def facts(c):
        return [e for e in cases[c]["_facts"] if e[0] not in drop]
    out = []
    for cid in cases:
        if cid != probe:
            ab, ba, _ = similarity(facts(probe), facts(cid))
            out.append((cid, (ab + ba) / 2))
    return sorted(out, key=lambda x: -x[1])


def macfac(probe: str, cases: dict) -> list[tuple[str, float, float]]:
    """MAC: the best few by content-vector dot product; FAC: SME on those. [(id, mac, sim)]"""
    pv = content(cases[probe]["_facts"])
    def dot(v):
        return sum(pv[k] * v[k] for k in pv) / ((sum(x * x for x in pv.values()) * sum(x * x for x in v.values())) ** 0.5 or 1)
    mac = sorted(((cid, dot(content(c["_facts"]))) for cid, c in cases.items() if cid != probe), key=lambda x: -x[1])
    out = []
    for cid, m in mac[:MAC_KEEP]:
        ab, ba, _ = similarity(cases[probe]["_facts"], cases[cid]["_facts"])
        out.append((cid, m, (ab + ba) / 2))
    return sorted(out, key=lambda x: -x[2])


def report() -> int:
    vocab, cases, tests = load()
    md = ["# Sherlock MAC/FAC: where else does this structure occur?", "",
          f"{len(cases)} cases, {sum(len(c['_facts']) for c in cases.values())} facts "
          f"(registry/cases; vocabulary of {len(vocab)} predicates). Similarity: the structure-mapping "
          "score over the probe's score against itself, mean of both directions (1 = the same structure "
          "as written; 0 = nothing maps).", ""]
    # the template: predicates in at least half of the cases of a document's general claim
    # (P11's catalogue states equation, propagator, substrate, wavenumber in every section);
    # "beyond the template" measures what the cases share once those are dropped
    general = [t for t in tests if t.get("cases")]
    template = frozenset()
    if general:
        ids = [c for c in general[0]["cases"] if c in cases]
        n = Counter(p for c in ids for p in set(content(cases[c]["_facts"])))
        template = frozenset(p for p, k in n.items() if 2 * k >= len(ids))
    md += [f"Template predicates (in at least half of the general claim's cases): "
           f"{', '.join(sorted(template)) or 'none'}.", ""]
    md += ["## The tests: the documents' own sameness claims", ""]
    for t in tests:
        md += [f"### {t['id']} ({t['document']}, line {t['line']})", "", f"> {t['quote']}", ""]
        for a, b in t.get("pairs", []):
            ab, ba, chosen = similarity(cases[a]["_facts"], cases[b]["_facts"])
            found = [cid for cid, _, _ in macfac(a, cases)]
            rank = found.index(b) + 1 if b in found else None
            order = [cid for cid, _ in ranked(a, cases)]
            beyond = ranked(a, cases, template)
            bsim = dict(beyond).get(b, 0.0)
            brank = [cid for cid, _ in beyond].index(b) + 1
            md.append(f"- **{a} ~ {b}**: similarity {(ab + ba) / 2:.2f} ({a} onto {b} {ab:.2f}, back {ba:.2f}), "
                      f"rank {order.index(b) + 1} of {len(order)} among all cases; beyond the template "
                      f"{bsim:.2f}, rank {brank}. "
                      + (f"MAC/FAC retrieves it (rank {rank} of {len(found)})." if rank else
                         f"MAC/FAC does not retrieve it (finds {', '.join(found[:3])})."))
            md += [f"  - shared: {show(x)} ~ {show(y)}" for _, x, y in chosen[:8]]
        if t.get("cases"):
            ids = [c for c in t["cases"] if c in cases]
            sims = {(a, b): sum(similarity(cases[a]["_facts"], cases[b]["_facts"])[:2]) / 2
                    for i, a in enumerate(ids) for b in ids[i + 1:]}
            vals = sorted(sims.values())
            if vals:
                md.append(f"- **all {len(ids)} cases pairwise**: similarity min {vals[0]:.2f}, median "
                          f"{vals[len(vals) // 2]:.2f}, max {vals[-1]:.2f}.")
                worst = sorted(sims.items(), key=lambda x: x[1])[:5]
                md += [f"  - least alike: {a} ~ {b} {s:.2f}" for (a, b), s in worst]
            core = Counter(p for c in ids for p in set(content(cases[c]["_facts"])))
            md.append("- predicates shared by every case: "
                      + (", ".join(sorted(p for p, n in core.items() if n == len(ids))) or "none"))
            md.append("- in at least half: " + ", ".join(sorted(p for p, n in core.items() if 2 * n >= len(ids))))
        md.append("")
    md += ["## Retrieval for every case (MAC/FAC, best three)", ""]
    for cid in cases:
        hits = macfac(cid, cases)[:3]
        md.append(f"- **{cid}** ({cases[cid].get('name', '')}): "
                  + "; ".join(f"{h} {s:.2f}" for h, _, s in hits))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "macfac.md").write_text("\n".join(md) + "\n", encoding="utf-8", newline="\n")
    print(f"bld/sherlock/macfac.md: {len(cases)} cases, {len(tests)} tests")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "check":
        sys.exit(check())
    if cmd == "report":
        sys.exit(report())
    print(__doc__)
    sys.exit(2)
