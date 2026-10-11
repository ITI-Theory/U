"""Sherlock's claims registry (registry/affidavits/<doc>.yaml): check and report.

    python sherlock/registry.py check    # schema, frozen source, quotes, lines
    python sherlock/registry.py report   # bld/sherlock/affidavits.md, values.md, palace.json

Each affidavit file names a frozen source (file, commit, SHA-256) and lists
claims: id, quote, lines, kind, finding, verdict, label, lean (the theorem
that proves the finding, or null for "not provable"), and optionally reading
(microtheory), mapping (words to OpenCyc constants), formal (CycL-shaped
sentence), values (quoted quantities), ledger, disposition, levels (registry/levels ids), concepts (registry/concepts\nids). `check` also
writes bld/sherlock/names.json, which sherlock/Tools/Names.lean checks against
the compiled affidavits (Python extracts, Lean decides). `report` writes palace.json (every claim by scale level and concept, for
the Soma Machine: the mind palace) and groups the quoted values by quantity across all documents and flags disagreements.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from collections import defaultdict
from fractions import Fraction
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
REG = U / "registry" / "affidavits"
OUT = U / "bld" / "sherlock"
KINDS = {"internal-count", "internal-arithmetic", "internal-duplicate-mismatch", "internal-unit",
         "cross-paper", "opencyc-typing", "opencyc-slip", "ledger"}
VERDICTS = {"contradicted", "confirmed", "consistent", "not-provable", "unclear"}
LABELS = {"kernel-verified", "derived-under-assumptions", "interpretive", "sourced"}
REQUIRED = ("id", "quote", "lines", "kind", "finding", "verdict", "label", "lean")
TEMPLATES = {"eq", "ne", "lt", "sum", "diff", "rel-between", "monotone", "not-monotone"}


def frozen_text(src: dict) -> str:
    blob = subprocess.run(["git", "show", f"{src['commit']}:{src['file']}"], cwd=U,
                          capture_output=True, check=True).stdout
    digest = hashlib.sha256(blob).hexdigest()
    if digest != src["sha256"]:
        raise ValueError(f"{src['file']}@{src['commit']}: SHA-256 {digest} != {src['sha256']}")
    return blob.decode("utf-8")


def squash(s: str) -> str:
    return " ".join(s.split())


def load() -> list[tuple[Path, dict]]:
    return [(p, yaml.safe_load(p.read_text(encoding="utf-8"))) for p in sorted(REG.glob("*.yaml"))]


def check() -> int:
    errs, names, checks = [], [], []
    for path, aff in load():
        where = path.relative_to(U).as_posix()
        text = frozen_text(aff["source"]) if aff.get("source") else None
        lines = text.splitlines() if text else []
        flat = squash(text) if text else ""
        ids = set()
        for c in aff.get("claims") or []:
            cid = c.get("id", "?")
            missing = [k for k in REQUIRED if k not in c]
            if missing:
                errs.append(f"{where} {cid}: missing {missing}")
                continue
            if cid in ids:
                errs.append(f"{where} {cid}: duplicate id")
            ids.add(cid)
            for k, allowed in (("kind", KINDS), ("verdict", VERDICTS), ("label", LABELS)):
                if c[k] not in allowed:
                    errs.append(f"{where} {cid}: {k} {c[k]!r} not in {sorted(allowed)}")
            if text is not None:
                if squash(c["quote"]) not in flat:
                    errs.append(f"{where} {cid}: quote not found in the frozen source")
                bad = [n for n in c["lines"] if not 1 <= n <= len(lines)]
                if bad:
                    errs.append(f"{where} {cid}: lines out of range {bad}")
            checks_c = c.get("check") or []
            for k, chk in enumerate(checks_c if isinstance(checks_c, list) else [checks_c]):
                if chk.get("template") not in TEMPLATES:
                    errs.append(f"{where} {cid}: unknown template {chk.get('template')!r}")
                    continue
                args = [Fraction(str(a)) for a in chk.get("args") or []]
                checks.append({"doc": aff["id"], "claim": cid, "k": k, "template": chk["template"],
                               "args": [[a.numerator, a.denominator] for a in args]})
            if c["lean"]:
                names.append({"doc": aff["id"], "claim": cid, "name": c["lean"]})
            elif not checks_c and c["verdict"] != "not-provable":
                errs.append(f"{where} {cid}: no Lean theorem for a {c['verdict']} finding")
            for field, folder in (("levels", "levels"), ("concepts", "concepts")):
                unknown = [x for x in c.get(field) or [] if not (U / "registry" / folder / f"{x}.yaml").exists()]
                if unknown:
                    errs.append(f"{where} {cid}: unknown {field} {unknown} (registry/{folder})")
            if "formal" in c and c["formal"].count("(") != c["formal"].count(")"):
                errs.append(f"{where} {cid}: unbalanced formal form")
        for eq in aff.get("equations") or []:
            if text is not None and squash(eq.get("quote", "")) not in flat:
                errs.append(f"{where} equation {eq.get('id')}: quote not found in the frozen source")
            if "twin" not in eq:
                errs.append(f"{where} equation {eq.get('id')}: no twin")
        for f in aff.get("lean") or []:
            if not (U / f).exists():
                errs.append(f"{where}: lean file missing {f}")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "names.json").write_text(json.dumps(names, indent=1), encoding="utf-8", newline="\n")
    (OUT / "checks.json").write_text(json.dumps(checks, indent=1), encoding="utf-8", newline="\n")
    print("\n".join(errs) or f"registry OK: {len(load())} affidavits, {len(names)} Lean theorems and "
          f"{len(checks)} template checks to check")
    return 1 if errs else 0


def number(v) -> Fraction:
    return Fraction(str(v)) if not isinstance(v, str) or "/" in v else Fraction(str(float(v)))


def report() -> int:
    out = ["# Sherlock affidavits (registry)", ""]
    values = defaultdict(list)
    palace: dict[str, dict[str, list[dict]]] = {"levels": defaultdict(list), "concepts": defaultdict(list)}
    for _, aff in load():
        src = aff.get("source") or {}
        out += [f"## {aff['title']}" + (f" ({aff['document']})" if aff.get("document") else ""), "",
                f"Frozen: `{src.get('file', '-')}` at `{src.get('commit', '-')}`." if src else "Example, no source.", ""]
        for c in aff["claims"]:
            out.append(f"- **{c['id']}** {c['verdict']} ({c['label']}), lines {c['lines']}: {c['finding']}."
                       f" `{c['lean'] or 'not provable'}`; disposition: {c.get('disposition', 'open')}.")
            for v in c.get("values") or []:
                values[v["quantity"]].append((aff["id"], c["id"], v["value"]))
            entry = {"doc": aff["id"], "document": aff.get("document"), "claim": c["id"],
                     "verdict": c["verdict"], "label": c["label"], "finding": c["finding"]}
            for field in ("levels", "concepts"):
                for x in c.get(field) or []:
                    palace[field][x].append(entry)
        out.append("")
    vals = ["# Quoted values across documents", "",
            "Each quantity with every value quoted for it; DIFFER marks disagreement.", ""]
    for q in sorted(values):
        distinct = {number(v) for _, _, v in values[q]}
        mark = "DIFFER" if len(distinct) > 1 else "agree"
        vals.append(f"- `{q}` {mark}: " + "; ".join(f"{v} ({d} {c})" for d, c, v in values[q]))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "affidavits.md").write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    (OUT / "values.md").write_text("\n".join(vals) + "\n", encoding="utf-8", newline="\n")
    # the mind palace index: every claim where it lives (scale level, concept), for the Soma Machine
    (OUT / "palace.json").write_text(json.dumps(palace, indent=1, ensure_ascii=False), encoding="utf-8", newline="\n")
    differ = sum(1 for l in vals if " DIFFER:" in l)
    print(f"bld/sherlock/affidavits.md, bld/sherlock/values.md: {len(values)} quantities, {differ} differ")
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    sys.exit({"check": check, "report": report}[cmd]())
