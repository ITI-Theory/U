#!/usr/bin/env python3
"""Validate registry-designated Lulu artifacts against their page limits."""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

import yaml

U_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_BLD = U_ROOT / "paper" / "bld"
FRACTAL_BLD = U_ROOT / "Part2" / "fractal-programme" / "bld"
REGISTRY = U_ROOT.parent / "Dist" / "PAPERS.yaml"


def page_count(pdf: Path) -> int:
    output = subprocess.run(["pdfinfo", str(pdf)], check=True, capture_output=True, text=True).stdout
    match = re.search(r"^Pages:\s+(\d+)$", output, re.MULTILINE)
    if not match:
        raise RuntimeError(f"could not read page count: {pdf}")
    return int(match.group(1))


def source_pdf(entry: dict[str, object]) -> Path:
    if entry.get("build") == "fractal":
        slug = str(entry["slug"])
        filename = str(entry.get("bld_file") or f"book-{slug.removeprefix('ttheory-book-')}.pdf")
        return FRACTAL_BLD / filename
    return PAPER_BLD / str(entry.get("bld_file") or f"{entry['slug']}.pdf")


def main() -> None:
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    failures = 0
    for section in registry.values():
        if not isinstance(section, list):
            continue
        for entry in section:
            if not entry.get("lulu"):
                continue
            limit = int(entry.get("lulu_page_limit", 800))
            pdf = source_pdf(entry)
            if not pdf.is_file():
                print(f"FAIL  {entry['id']} missing print source: {pdf.relative_to(U_ROOT)}")
                failures += 1
                continue
            pages = page_count(pdf)
            if pages > limit:
                print(f"FAIL  {entry['id']} {pages} pages exceeds Lulu limit {limit}: {pdf.relative_to(U_ROOT)}")
                failures += 1
            else:
                print(f"PASS  {entry['id']} {pages}/{limit} Lulu pages")
    raise SystemExit(1 if failures else 0)


if __name__ == "__main__":
    main()
