"""features.py: every Soma Machine feature, tagged science or show (ISS-095).

Reads registry/features.yaml: each feature's anchor must still be in its file, its tag one of
science, show or both (both names its split), and lists those the author has not yet approved.
Fails on a broken anchor or tag; the approvals are reported, not failed.

    python sherlock/features.py      # -> bld/sherlock/features.md
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "features.md"


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    feats = (yaml.safe_load((U / "registry" / "features.yaml").read_text(encoding="utf-8")) or {}).get("features") or []
    problems, rows, waiting = [], [], 0
    for f in feats:
        path = U / f.get("file", "")
        if not path.is_file():
            problems.append(f"{f['id']}: file {f.get('file')} missing")
        elif f.get("anchor", "\0") not in path.read_text(encoding="utf-8"):
            problems.append(f"{f['id']}: anchor {f.get('anchor')!r} not in {f['file']}")
        if f.get("tag") not in ("science", "show", "both"):
            problems.append(f"{f['id']}: tag must be science, show or both")
        if f.get("tag") == "both" and not f.get("split"):
            problems.append(f"{f['id']}: tagged both without its split")
        waiting += not f.get("approved")
        rows.append(f"| {f['id']} | {f['tag']} | {'yes' if f.get('approved') else '**awaiting**'} | {f['what']}{' (' + f['split'] + ')' if f.get('split') else ''} |")
    counts = {t: sum(f.get("tag") == t for f in feats) for t in ("science", "show", "both")}
    head = f"{len(feats)} features: {counts['science']} science, {counts['show']} show, {counts['both']} both; {waiting} awaiting the author; {len(problems)} problems"
    lines = ["# The Soma Machine's features, science or show (ISS-095)", "", head, "", "| feature | tag | approved | what |", "|---|---|---|---|", *rows]
    if problems:
        lines += ["", "Problems:", "", *[f"- {p}" for p in problems]]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(head)
    for p in problems:
        print(f"  PROBLEM {p}")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
