#!/usr/bin/env python3
"""Report untyped fenced Markdown blocks containing Unicode box-drawing art."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

PAPER = Path(__file__).resolve().parent.parent
SOMA = PAPER / "soma"
BOX_DRAWING = re.compile(r"[\u2500-\u257f]")
FENCE = re.compile(r"^```(?P<language>[\w-]*)\s*$")


def pending_blocks(source: Path) -> list[int]:
    findings: list[int] = []
    language: str | None = None
    opening_line = 0
    content: list[str] = []
    for line_number, line in enumerate(source.read_text(encoding="utf-8").splitlines(), start=1):
        match = FENCE.match(line)
        if match:
            if language is None:
                language = match.group("language")
                opening_line = line_number
                content = []
            else:
                if not language and BOX_DRAWING.search("\n".join(content)):
                    findings.append(opening_line)
                language = None
            continue
        if language is not None:
            content.append(line)
    return findings


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true", help="fail when pending diagram blocks remain")
    args = parser.parse_args()
    findings = [(source, line) for source in SOMA.rglob("*.md") for line in pending_blocks(source)]
    for source, line in findings:
        print(f"PENDING  {source.relative_to(PAPER)}:{line}")
    print(f"Found {len(findings)} pending reader-facing Unicode diagram block(s).")
    if args.strict and findings:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
