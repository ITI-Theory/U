#!/usr/bin/env python3
"""Headings that pandoc prints as text (UAT rc3.2): an ATX heading (# Title) directly after a
paragraph line, with no blank line before it, is not a heading to pandoc (blank_before_header):
the chapter title appears as a sentence starting with "#" and is missing from every contents.

    python paper/scripts/check_headings.py      # the books, papers and Part2 sources; exit 1 if any
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

U = Path(__file__).resolve().parents[2]
ROOTS = ["books/T-Theory", "paper/soma", "Part2/book"]


def glued(path: Path) -> list[int]:
    lines = path.read_text(encoding="utf-8").replace("\r\n", "\n").split("\n")
    out, fence = [], False
    for i, line in enumerate(lines):
        if line.lstrip().startswith("```"):
            fence = not fence
        if fence or i == 0:
            continue
        if re.match(r"^#{1,6} \S", line) and lines[i - 1].strip() and not lines[i - 1].startswith(("#", "---", ":::")):
            out.append(i + 1)
    return out


def main() -> int:
    bad = 0
    for root in ROOTS:
        for p in sorted((U / root).rglob("*.md")):
            for n in glued(p):
                bad += 1
                print(f"{p.relative_to(U).as_posix()}:{n}: error: heading with no blank line before it (printed as text)")
    print(f"check_headings: {bad} heading(s) printed as text" if bad else "check_headings: PASS")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
