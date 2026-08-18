#!/usr/bin/env python3
"""Verify the physical title-page/abstract contract for an individual paper."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(pdf: Path, start: int, end: int | None = None) -> str:
    end = start if end is None else end
    command = ["pdftotext", "-f", str(start), "-l", str(end), "-layout", str(pdf), "-"]
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def first_heading(pdf: Path) -> str:
    source = PAPER_DIR / "soma" / pdf.stem / f"{pdf.stem}.md"
    text = source.read_text(encoding="utf-8")
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
    match = re.search(r"^# ([^\n]+)", text, re.MULTILINE)
    if not match:
        fail(f"no level-one heading found in source: {source}")
    return match.group(1).strip()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="PDF path, relative to paper/ or absolute")
    args = parser.parse_args()

    pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
    if not pdf.is_file():
        fail(f"missing PDF: {pdf}")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    page_1 = page_text(pdf, 1)
    page_2 = page_text(pdf, 2)
    page_3 = page_text(pdf, 3)
    page_4 = page_text(pdf, 4)
    page_5 = page_text(pdf, 5)
    if not page_1.strip():
        fail("physical page 1 has no title-page content")
    if page_2.strip():
        fail("physical page 2 is not a blank inside cover")
    if "Abstract" not in page_3:
        fail("physical page 3 does not begin the abstract")
    if "Contents" in page_3:
        fail("physical page 3 mixes abstract with contents")
    if page_4.strip():
        fail("physical page 4 is not a blank abstract verso")
    if "Contents" not in page_5:
        fail("physical page 5 does not begin the contents")
    heading = first_heading(pdf)
    all_pages = page_text(pdf, 1, 10000).split("\f")
    section_page = next((index + 1 for index, page in enumerate(all_pages) if heading in page), None)
    if section_page is None:
        fail(f"first section heading not found in PDF: {heading}")
    if section_page % 2 == 0:
        fail(f"first numbered section is not recto: page {section_page}")

    print("PASS  title, blank verso, abstract-only recto, blank verso, and contents")
    print("PASS  first numbered section begins recto")


if __name__ == "__main__":
    main()
