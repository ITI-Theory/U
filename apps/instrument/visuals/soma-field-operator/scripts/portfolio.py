#!/usr/bin/env python3
"""Assemble the print set from `capture.mjs --only print` into a landscape
portfolio PDF (one full-bleed image per page, 300 dpi).

    python scripts/portfolio.py            # A3 -> Part2/book/field-atlas/bld/soma-machine-portfolio.pdf
    python scripts/portfolio.py --size a4  # A4 -> .../soma-machine-portfolio-a4.pdf
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

APP = Path(__file__).resolve().parents[1]
REPO = APP.parents[3]
PRINT = REPO / "Part2/book/field-atlas/figures/app/print"
BLD = REPO / "Part2/book/field-atlas/bld"
SIZES = {"a3": (4961, 3508), "a4": (3508, 2480)}  # landscape pixels at 300 dpi


def page(path: Path, size: tuple[int, int]) -> Image.Image:
    # Fit the whole screenshot (never crop the app) on the app's dark background.
    image = Image.open(path).convert("RGB")
    scale = min(size[0] / image.width, size[1] / image.height)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.LANCZOS)
    sheet = Image.new("RGB", size, (5, 7, 14))
    sheet.paste(image, ((size[0] - image.width) // 2, (size[1] - image.height) // 2))
    return sheet


def main() -> None:
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--size", choices=sorted(SIZES), default="a3")
    size_name = parser.parse_args().size
    files = sorted(PRINT.glob("*.png"))
    if not files:
        sys.exit(f"no images in {PRINT}: run node scripts/capture.mjs --only print --width 1920 --height 1200 --scale 2.585 first")
    out = BLD / ("soma-machine-portfolio.pdf" if size_name == "a3" else f"soma-machine-portfolio-{size_name}.pdf")
    BLD.mkdir(parents=True, exist_ok=True)
    first, *rest = (page(path, SIZES[size_name]) for path in files)
    first.save(out, "PDF", resolution=300, save_all=True, append_images=rest, quality=95)
    print(f"wrote {out} ({len(files)} pages, {size_name.upper()} landscape, 300 dpi)")


if __name__ == "__main__":
    main()
