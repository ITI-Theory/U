#!/usr/bin/env python3
"""Visualize coverage: every display equation in the papers and books, and whether a
{{Visualize}} figure follows it (ISS-051).

Usage: visualize_report.py [--out FILE]

Scans the Markdown sources (paper/soma/*/, books/T-Theory/*/, the course book and
the Atlas textbook chapters) for display equations ($$ ... $$), notes their label
(`{#eq:...}`) and whether a {{Visualize}} macro appears before the next display
equation, and writes a per-document table plus totals (default
bld/visualize/coverage.md). The marking-up work starts from the documents with the
most uncovered equations.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

U = Path(__file__).resolve().parents[2]
SOURCES = [
    ("papers", sorted(p for p in (U / "paper" / "soma").glob("*/*.md") if p.stem == p.parent.name)),
    ("books", sorted((U / "books" / "T-Theory").glob("*/book-*.md"))),
    ("course", sorted((U / "Part2" / "book" / "field-atlas-textbook" / "chapters").glob("*.md"))),
]
DISPLAY = re.compile(r"\$\$(.+?)\$\$(\s*\{#(eq:[^}]+)\})?", re.S)


def scan(path: Path) -> list[dict]:
    text = re.sub(r"(?s)```.*?```", "", path.read_text(encoding="utf-8"))
    matches = list(DISPLAY.finditer(text))
    rows = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        rows.append({"label": match.group(3) or "", "covered": "{{Visualize" in text[match.end():end],
                     "tex": " ".join(match.group(1).split())[:70]})
    return rows


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--out", type=Path, default=U / "bld" / "visualize" / "coverage.md")
    args = parser.parse_args()
    lines = ["# Visualize coverage", "", "Display equations and whether a figure follows them (ISS-051).", ""]
    totals = {}
    for group, files in SOURCES:
        lines += [f"## {group}", "", "| document | equations | labelled | with a figure |", "|:--|--:|--:|--:|"]
        g_eq = g_cov = 0
        for path in files:
            rows = scan(path)
            if not rows:
                continue
            covered = sum(r["covered"] for r in rows)
            labelled = sum(bool(r["label"]) for r in rows)
            g_eq += len(rows)
            g_cov += covered
            lines.append(f"| {path.stem} | {len(rows)} | {labelled} | {covered} |")
        lines.append("")
        totals[group] = (g_eq, g_cov)
    summary = ", ".join(f"{group}: {cov} of {eq} equations have a figure" for group, (eq, cov) in totals.items())
    lines.insert(3, summary + ".\n")
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(summary)
    print(f"report: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
