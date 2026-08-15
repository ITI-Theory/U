#!/usr/bin/env python3
"""Remove *(Generated: `foo.png`)* lines from markdown figure captions.

These notes were useful during authoring but must not appear in published PDFs.
The note always occupies its own line immediately before ](figures/foo.png),
so removing it joins the preceding caption sentence cleanly to the image link.

Run from U/ root:  py paper/scripts/fix_caption_png_refs.py
"""
import re
import sys
from pathlib import Path

# The note is always on its own line: strip the leading newline too so the
# preceding caption text merges directly with the ](image.png) close.
PATTERN = re.compile(r"\n\*\(Generated: `[^`]+\.png`\)\*")

EXCLUDE = {"bld"}
ROOTS = [Path("paper"), Path("Part2")]


def fix_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    new_text, n = PATTERN.subn("", text)
    if n:
        path.write_text(new_text, encoding="utf-8")
    return n


def main() -> None:
    total = 0
    for root in ROOTS:
        if not root.exists():
            continue
        for md in sorted(root.rglob("*.md")):
            if any(part in EXCLUDE for part in md.parts):
                continue
            n = fix_file(md)
            if n:
                print(f"  fixed {n:2d}  {md}")
                total += n
    print(f"\nTotal: {total} occurrences removed.")
    sys.exit(0 if total >= 0 else 1)


if __name__ == "__main__":
    main()
