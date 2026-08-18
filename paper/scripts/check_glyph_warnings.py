#!/usr/bin/env python3
"""Build a Papers target and fail if XeLaTeX reports missing glyphs."""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", nargs="?", default="all", help="Make target to build (default: all)")
    args = parser.parse_args()

    result = subprocess.run(
        ["make", args.target], cwd=PAPER_DIR, capture_output=True, text=True, errors="replace"
    )
    sys.stdout.write(result.stdout)
    sys.stderr.write(result.stderr)
    if result.returncode:
        raise SystemExit(result.returncode)

    output_lines = (result.stdout + result.stderr).splitlines()
    glyph_warnings = [line for line in output_lines if "Missing character" in line]
    reference_warnings = [
        line
        for line in output_lines
        if any(marker in line.lower() for marker in ("undefined references", "undefined citation", "reference undefined"))
    ]
    if glyph_warnings:
        print(f"FAIL  {len(glyph_warnings)} missing-glyph warning(s)")
        for line in glyph_warnings[:20]:
            print(f"  {line}")
        raise SystemExit(1)
    if reference_warnings:
        print(f"FAIL  {len(reference_warnings)} unresolved-reference warning(s)")
        for line in reference_warnings[:20]:
            print(f"  {line}")
        raise SystemExit(1)
    print("PASS  no missing-glyph or unresolved-reference warnings")


if __name__ == "__main__":
    main()
