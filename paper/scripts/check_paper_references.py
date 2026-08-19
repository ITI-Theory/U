#!/usr/bin/env python3
"""Enforce registry-owned citation and bibliography requirements for one paper."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path

import yaml

PAPER_DIR = Path(__file__).resolve().parent.parent
U_ROOT = PAPER_DIR.parent
REGISTRY = U_ROOT.parent / "Dist" / "PAPERS.yaml"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def registry_entry(slug: str) -> dict[str, object]:
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    for section in registry.values():
        if isinstance(section, list):
            for entry in section:
                if entry.get("slug") == slug:
                    return entry
    fail(f"paper is not registered: {slug}")


def pdf_text(pdf: Path) -> str:
    return subprocess.run(
        ["pdftotext", "-layout", str(pdf), "-"], check=True, capture_output=True, text=True
    ).stdout


def cited_keys(source_text: str) -> set[str]:
    keys: set[str] = set()
    for citation in re.findall(r"\[(-?@[^\]]+)\]", source_text):
        for key in re.findall(r"-?@([A-Za-z0-9:_-]+)", citation):
            keys.add(key)
    return keys


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paper", help="registered paper slug")
    parser.add_argument("--pdf", type=Path, required=True)
    args = parser.parse_args()

    entry = registry_entry(args.paper)
    if entry.get("references") == "none":
        print(f"PASS  registry explicitly exempts {args.paper} from references")
        return
    minimum = int(entry.get("references_minimum", 5))

    pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
    if not pdf.is_file():
        fail(f"missing PDF: {pdf}")

    text = pdf_text(pdf)
    match = re.search(r"(?im)^\s*(?:\d+(?:\.\d+)*\s+)?References\s*$([\s\S]*)", text)
    if not match:
        fail(f"rendered PDF has no References heading: {pdf.relative_to(U_ROOT)}")
    entries = [line.strip() for line in match.group(1).splitlines() if line.strip()]
    entries = [line for line in entries if not re.fullmatch(r"\d+|REFERENCES", line)]
    if len(entries) < minimum:
        fail(
            f"rendered References section has {len(entries)} content line(s); "
            f"registry requires at least {minimum}: {pdf.relative_to(U_ROOT)}"
        )

    print(f"PASS  {args.paper} has {len(entries)} rendered reference content line(s) (minimum {minimum})")


if __name__ == "__main__":
    main()
