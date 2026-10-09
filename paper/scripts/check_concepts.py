#!/usr/bin/env python3
"""Sherlock concept registry: check registry/concepts/*.yaml and show the gaps (ISS-046).

Usage: check_concepts.py [--strict]

Each concept names its ontology class (OpenCyc or OWL), its Lean declaration, the
papers and Soma Machine levels it belongs to, and the evidence label the text
gives it. This script looks the Lean name up in the sources (paper/proofs/,
paper/) and derives its status from the source itself: kernel-verified (a
theorem without `sorry`), sorry (a theorem that still contains one), axiom, or
definition (def, structure, inductive, class field or constructor). It fails on
broken references (unknown Lean name, paper or level); it reports gaps (no
ontology class, no Lean declaration) and mismatches (a concept labelled
kernel-verified whose theorem has a `sorry` or is an axiom). With --strict, gaps
fail too. OpenCyc classes are checked against the OpenCyc OWL file (239,119
constants) cached in ~/.cache/ttheory/ (download once with --fetch-cyc; without
the cache this check is skipped and said so): a class that is not an OpenCyc
constant fails. `lean_cycref` records the string the Lean CycRef interpreter uses,
when that differs from the real constant.
"""
from __future__ import annotations

import argparse
import gzip
import os
import re
import urllib.request
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[2]
CONCEPTS = U / "registry" / "concepts"
LEAN_DIRS = [U / "paper" / "proofs", U / "paper"]
PAPERS = U.parent / "Dist" / "PAPERS.yaml"
LEVELS = U / "registry" / "levels"
LABELS = {"kernel-verified", "derived-under-assumptions", "simulated", "empirical-result", "interpretive", "open-hypothesis"}
OPENCYC_URL = "https://github.com/asanchez75/opencyc/raw/master/opencyc-latest.owl.gz"
OPENCYC = Path(os.environ.get("OPENCYC_OWL", Path.home() / ".cache" / "ttheory" / "opencyc-latest.owl.gz"))
DECL = re.compile(r"^(?:@\[[^\]]*\]\s*)?(?:noncomputable\s+|private\s+|protected\s+)*(theorem|lemma|def|abbrev|axiom|structure|inductive|class|instance)\s+([^\s(:{\[]+)", re.M)


def paper_ids() -> set[str]:
    found: set[str] = set()

    def walk(node):
        if isinstance(node, dict):
            if "id" in node and ("doi" in node or "file" in node or "slug" in node):
                found.add(str(node["id"]))
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for value in node:
                walk(value)

    walk(yaml.safe_load(PAPERS.read_text(encoding="utf-8")))
    return found


def opencyc_constants(fetch: bool) -> set[str] | None:
    """Every constant name (cycAnnot:label) in OpenCyc, or None when it is not cached."""
    if not OPENCYC.exists():
        if not fetch:
            return None
        OPENCYC.parent.mkdir(parents=True, exist_ok=True)
        print(f"downloading OpenCyc (26 MB) to {OPENCYC}")
        urllib.request.urlretrieve(OPENCYC_URL, OPENCYC)
    with gzip.open(OPENCYC, "rt", encoding="utf-8", errors="replace") as handle:
        return set(re.findall(r'<cycAnnot:label xml:lang="en">([^<]+)</cycAnnot:label>', handle.read()))


def lean_status(module: str, name: str) -> tuple[str | None, str]:
    """(status, where) for Module + a declaration name, a class field or a constructor."""
    files = [d / f"{module}.lean" for d in LEAN_DIRS if (d / f"{module}.lean").exists()]
    if not files:
        return None, f"no file {module}.lean"
    text = files[0].read_text(encoding="utf-8")
    where = files[0].relative_to(U).as_posix()
    last = name.split(".")[-1]
    owner = name.split(".")[-2] if "." in name else None
    decls = list(DECL.finditer(text))
    for index, match in enumerate(decls):
        if match.group(2).split(".")[-1] != last:
            continue
        kind = match.group(1)
        body = text[match.end(): decls[index + 1].start() if index + 1 < len(decls) else len(text)]
        line = text.count("\n", 0, match.start()) + 1
        if kind in ("theorem", "lemma"):
            return ("sorry" if re.search(r"\bsorry\b", body) else "kernel-verified"), f"{where}:{line}"
        return ("axiom" if kind == "axiom" else "definition"), f"{where}:{line}"
    if owner:
        # A class field (`joy : r`) or a constructor (`| BrainStem`) inside `owner`.
        for match in decls:
            if match.group(2).split(".")[-1] == owner and match.group(1) in ("class", "structure", "inductive"):
                start = match.end()
                following = [m.start() for m in decls if m.start() > start]
                body = text[start: following[0] if following else len(text)]
                if re.search(rf"(^|\n)\s*(\|\s*)?{re.escape(last)}\b", body):
                    line = text.count("\n", 0, start) + 1
                    return "definition", f"{where}:{line}"
    return None, f"{name} not found in {where}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--strict", action="store_true")
    parser.add_argument("--fetch-cyc", action="store_true", help="download OpenCyc to the cache if missing")
    args = parser.parse_args()
    cyc = opencyc_constants(args.fetch_cyc)
    papers = paper_ids()
    levels = {p.stem for p in LEVELS.glob("*.yaml")}
    errors, gaps, rows = [], [], []
    for path in sorted(CONCEPTS.glob("*.yaml")):
        concept = yaml.safe_load(path.read_text(encoding="utf-8"))
        cid = concept.get("id")
        if cid != path.stem:
            errors.append(f"{path.name}: id {cid!r} must match the file name")
        label = concept.get("label")
        if label is not None and label not in LABELS:
            errors.append(f"{cid}: label {label!r} is not an evidence label")
        for paper in concept.get("papers") or []:
            if paper not in papers:
                errors.append(f"{cid}: unknown paper {paper}")
        for level in concept.get("levels") or []:
            if level not in levels:
                errors.append(f"{cid}: unknown level {level}")
        onto = concept.get("ontology") or {}
        if not onto.get("class"):
            gaps.append(f"{cid}: no ontology class")
        elif onto.get("system") == "OpenCyc" and cyc is not None and onto["class"].removeprefix("#$") not in cyc:
            errors.append(f"{cid}: {onto['class']} is not an OpenCyc constant")
        lean = concept.get("lean") or {}
        status, where = (None, "")
        if lean.get("module") and lean.get("name"):
            status, where = lean_status(lean["module"], lean["name"])
            if status is None:
                errors.append(f"{cid}: Lean {lean['module']}.{lean['name']}: {where}")
            elif label == "kernel-verified" and status != "kernel-verified":
                errors.append(f"{cid}: labelled kernel-verified but the Lean declaration is {status} ({where})")
        else:
            gaps.append(f"{cid}: no Lean declaration")
        rows.append((cid, onto.get("class") or "-", f"{lean.get('module', '-')}.{lean.get('name', '-')}" if lean else "-", status or "-", label or "-"))
    width = max((len(r[0]) for r in rows), default=10)
    print(f"{'concept':{width}}  {'ontology':28}  {'lean':58}  {'status':16}  label")
    for cid, onto, lean, status, label in rows:
        print(f"{cid:{width}}  {onto[:28]:28}  {lean[:58]:58}  {status:16}  {label}")
    counts = {s: sum(1 for r in rows if r[3] == s) for s in ("kernel-verified", "sorry", "axiom", "definition", "-")}
    print(f"\n{len(rows)} concepts: " + ", ".join(f"{v} {k if k != '-' else 'without Lean'}" for k, v in counts.items()))
    if cyc is None:
        print("NOTE  OpenCyc not cached: ontology classes not verified (make concepts FETCH=1)")
    else:
        print(f"OpenCyc: {len(cyc)} constants; every OpenCyc class in the registry checked")
    for gap in gaps:
        print(f"GAP   {gap}")
    for error in errors:
        print(f"FAIL  {error}")
    return 1 if errors or (args.strict and gaps) else 0


if __name__ == "__main__":
    sys.exit(main())
