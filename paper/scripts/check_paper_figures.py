#!/usr/bin/env python3
"""Reject missing or placeholder PNG figures referenced by one paper source."""

from __future__ import annotations

import argparse
import re
import struct
import subprocess
import tempfile
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def png_dimensions(path: Path) -> tuple[int, int]:
    with path.open("rb") as image:
        header = image.read(24)
    if header[:8] != PNG_SIGNATURE or header[12:16] != b"IHDR":
        fail(f"not a valid PNG: {path}")
    return struct.unpack(">II", header[16:24])


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paper", help="paper source slug")
    parser.add_argument("--pdf", type=Path, help="rendered PDF to inspect")
    args = parser.parse_args()

    source = PAPER_DIR / "soma" / args.paper / f"{args.paper}.md"
    if not source.is_file():
        fail(f"missing source: {source}")

    references = re.findall(r"\]\((figures/[^)\s]+)", source.read_text(encoding="utf-8"))
    if not references:
        fail(f"no figure references in source: {source.name}")

    for reference in references:
        asset = PAPER_DIR / reference
        if not asset.is_file():
            fail(f"missing figure asset: {reference}")
        width, height = png_dimensions(asset)
        if width < 100 or height < 100:
            fail(f"placeholder-sized figure asset: {reference} ({width}x{height})")
        print(f"PASS  {reference} ({width}x{height})")

    if args.pdf:
        pdf = args.pdf if args.pdf.is_absolute() else PAPER_DIR / args.pdf
        with tempfile.TemporaryDirectory() as temporary_directory:
            result = subprocess.run(
                ["pdfimages", "-list", str(pdf), str(Path(temporary_directory) / "figure")],
                check=True,
                capture_output=True,
                text=True,
            )
        embedded_pages = {
            int(page)
            for page, width, height in re.findall(
                r"page=(\d+)\s+width=(\d+)\s+height=(\d+)", result.stdout
            )
            if int(width) >= 100 and int(height) >= 100
        }
        if len(embedded_pages) < len(references):
            fail(
                f"only {len(embedded_pages)} rendered pages have full-size images; "
                f"expected at least {len(references)}"
            )
        print(f"PASS  {len(embedded_pages)} rendered PDF pages contain full-size figures")

    print(f"PASS  {len(references)} referenced figures are renderable PNG assets")


if __name__ == "__main__":
    main()
