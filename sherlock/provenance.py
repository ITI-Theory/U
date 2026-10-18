"""provenance.py: whose emotions a score carries (ISS-115, the first of Sherlock's tests for a piece
that externalises the author's emotions).

Every score (registry/scores/*.yaml) says whose they are (`author`), who made the numbers
(`made_by`: the author, or an estimate by someone else), where they come from (`from`), and
whether the author has attested them (`attested: {by, on}`). Fails on a score without these
fields; reports, without failing, a score made by someone else or not yet attested: until the
author attests it, a score is a proposal, not his.

    python sherlock/provenance.py      # -> bld/sherlock/provenance.md
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "provenance.md"


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    problems, rows, waiting = [], [], 0
    for f in sorted((U / "registry" / "scores").glob("*.yaml")):
        s = yaml.safe_load(f.read_text(encoding="utf-8")) or {}
        p = s.get("provenance") or {}
        missing = [k for k in ("author", "made_by", "from") if not p.get(k)] + ([] if "attested" in p else ["attested"])
        if missing:
            problems.append(f"{f.name}: provenance lacks {', '.join(missing)}")
            continue
        att = p.get("attested")
        # YAML 1.1 reads an unquoted `on:` key as True; accept both spellings
        ok_att = isinstance(att, dict) and att.get("by") and (att.get("on") or att.get(True))
        if not ok_att:
            waiting += 1
        own = p["made_by"] in ("the author", p["author"])
        state = ("the author's, attested" if ok_att and own else "attested" if ok_att
                 else "the author's, attestation awaited" if own else f"not the author's yet: {p['made_by']}")
        rows.append(f"| {s.get('id', f.stem)} | {p['author']} | {p['made_by']} | {p['from']} | {state} |")
    lines = ["# Whose emotions a score carries (ISS-115)", "", "| score | whose | numbers made by | from | state |", "|---|---|---|---|---|", *rows]
    if problems:
        lines += ["", "Problems:", "", *[f"- {x}" for x in problems]]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"provenance: {len(rows)} scores, {waiting} awaiting the author's attestation, {len(problems)} problems")
    for r in rows:
        print("  " + r.strip("| ").replace(" | ", "; "))
    for x in problems:
        print(f"  PROBLEM {x}")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
