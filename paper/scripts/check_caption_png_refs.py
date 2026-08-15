#!/usr/bin/env python3
"""Lint: fail if any markdown source figure caption embeds a PNG filename as literal text.

A line of the form  *(Generated: `foo.png`)*](figures/foo.png)  inside a pandoc
image alt-text will render as visible text in the PDF caption.  Exit 1 if found.
"""
import re
import sys
from pathlib import Path

# Matches the erroneous "generated" note that leaks into captions.
PATTERN = re.compile(r'\*\(Generated:\s*`[^`]+\.png`\)\*')
EXCLUDE = {"bld"}

ROOTS = [Path("paper"), Path("Part2")]


def main() -> None:
    found = False
    for root in ROOTS:
        if not root.exists():
            continue
        for md in sorted(root.rglob("*.md")):
            if any(part in EXCLUDE for part in md.parts):
                continue
            for lineno, line in enumerate(
                md.read_text(encoding="utf-8", errors="replace").splitlines(), 1
            ):
                if PATTERN.search(line):
                    print(f"{md}:{lineno}: {line.rstrip()[:120]}")
                    found = True
    if found:
        print(
            "\nERROR: PNG filenames embedded in figure captions will appear as"
            " literal text in the PDF.\n"
            "Fix: py paper/scripts/fix_caption_png_refs.py"
        )
        sys.exit(1)
    print("OK: no embedded PNG refs in figure captions.")


if __name__ == "__main__":
    main()
