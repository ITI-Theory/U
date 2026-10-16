"""THE MODEL at a high level (ISS-108): do its pointers resolve, and does the app show each claim?

    python sherlock/model.py          # writes bld/sherlock/model.md; exit 1 on a broken pointer

Reads registry/model.yaml. For each claim: every concept, visual-grammar term, level and paper it
names must exist in its registry; every stop it is shown at must be an explorer stop; its label
must be one of THEORY-STATUS's; and it may not claim more than its weakest concept (a claim
labelled kernel-verified must rest only on kernel-verified concepts). Points, never copies.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "model.md"
LABELS = ["kernel-verified", "derived-under-assumptions", "simulated", "empirical-result", "interpretive", "open-hypothesis"]
STRENGTH = {"kernel-verified": 5, "empirical-result": 4, "simulated": 3, "derived-under-assumptions": 3, "interpretive": 1, "open-hypothesis": 1}


def main() -> int:
    model = yaml.safe_load((U / "registry" / "model.yaml").read_text(encoding="utf-8"))["claims"]
    concepts = {}
    for p in (U / "registry" / "concepts").glob("*.yaml"):
        d = yaml.safe_load(p.read_text(encoding="utf-8"))
        concepts[d["id"]] = d
    terms = {t["id"] for t in yaml.safe_load((U / "registry" / "visual-grammar.yaml").read_text(encoding="utf-8"))["terms"]}
    levels = {p.stem for p in (U / "registry" / "levels").glob("*.yaml")}
    papers_text = (U / "registry" / "papers.yaml").read_text(encoding="utf-8")
    papers = set(re.findall(r"\bP\d+\b", papers_text))
    explorer = (U / "apps/instrument/visuals/soma-field-operator/explorer.js").read_text(encoding="utf-8")
    stops = set(re.findall(r"'([a-z]+)'", re.search(r"export const STOPS = \[([^\]]+)\]", explorer).group(1)))
    fails, notes, rows = [], [], []
    for cid, c in model.items():
        bad = []
        if c.get("label") not in LABELS:
            bad.append(f"label {c.get('label')!r} not one of THEORY-STATUS's")
        for k, have, what in [("concepts", concepts, "concept"), ("terms", terms, "visual-grammar term"), ("levels", levels, "level"), ("papers", papers, "paper"), ("shown_at", stops, "explorer stop")]:
            for x in c.get(k, []):
                if x not in have:
                    bad.append(f"{what} {x!r} not found")
        # no claim stronger than its weakest concept (unlabelled concepts count as unlabelled, noted)
        cl = [concepts[x].get("label") for x in c.get("concepts", []) if x in concepts]
        if c.get("label") == "kernel-verified" and any(l != "kernel-verified" for l in cl):
            weak = [x for x in c.get("concepts", []) if x in concepts and concepts[x].get("label") != "kernel-verified"]
            notes.append(f"{cid}: labelled kernel-verified but rests on {', '.join(weak)} (their own label: {', '.join(str(concepts[w].get('label')) for w in weak)})")
        if not c.get("shown_at"):
            notes.append(f"{cid}: not shown anywhere in the app")
        fails += [f"{cid}: {b}" for b in bad]
        rows.append(f"| {cid} | {c.get('label')} | {', '.join(c.get('concepts', [])) or '-'} | {', '.join(c.get('papers', []))} | {', '.join(c.get('shown_at', []))} |")
    out = ["# The model at a high level (ISS-108)", "",
           "| claim | label | concepts | papers | shown at |", "|---|---|---|---|---|", *rows, "",
           f"## Broken pointers ({len(fails)})", "", *([f"- {x}" for x in fails] or ["- none"]), "",
           f"## Notes ({len(notes)})", "", *([f"- {x}" for x in notes] or ["- none"]), ""]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(out), encoding="utf-8")
    print(f"bld/sherlock/model.md: {len(model)} claims, {len(fails)} broken pointers, {len(notes)} notes")
    for x in fails + notes:
        print(f"  {x}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
