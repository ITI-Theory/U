"""Render the plates of A Gallery of Thoughts (ISS-097) from registry/gallery.yaml.

    python lib/art/gallery.py OUT_DIR [--format lulu-a4|a3|projector] [--only ID,...]

For each format, every plate (and the cover) is the programme's own picture put through its
filter chain (lib/art/filters.py), cropped to the page's shape with its bleed and saved as
OUT_DIR/<format>/<id>.jpg. tones.json beside them says whether the corner where the caption
sits is light or dark, so the layout can choose the caption's colours. Images only: the book's
layout is the Lua filter's (docs/BUILD.md).
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import numpy as np
import yaml
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
import filters  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]


def plates(reg: dict) -> list[dict]:
    out = [{"id": "cover", **reg["cover"]}]
    for room in reg["rooms"]:
        out += room["plates"]
    return out


def tone(img: Image.Image) -> str:
    """Light or dark, where the caption sits (the lower left of the page)."""
    w, h = img.size
    corner = np.asarray(img.crop((0, int(h * 0.8), int(w * 0.5), h)).convert("L"), float)
    return "light" if corner.mean() > 128 else "dark"


def render(reg: dict, out: Path, fmt: str, only: set[str] | None) -> None:
    w, h = reg["formats"][fmt]["px"]
    d = out / fmt
    d.mkdir(parents=True, exist_ok=True)
    tones_path = d / "tones.json"
    tones = json.loads(tones_path.read_text()) if tones_path.exists() else {}
    cache: dict[tuple, Image.Image] = {}
    for p in plates(reg):
        if only and p["id"] not in only:
            continue
        src = Image.open(ROOT / p["src"]).convert("RGB")
        # Filter at a working size close to the page, so strokes and grain scale with the print.
        scale = max(w / src.width, h / src.height)
        if scale > 1:
            src = src.resize((round(src.width * scale), round(src.height * scale)), Image.Resampling.LANCZOS)
        key = (p["src"], tuple(p["chain"]), src.size)
        img = cache.get(key) or filters.apply(src, p["chain"])
        cache[key] = img
        page = filters.fill(img, w, h)
        page.save(d / f"{p['id']}.jpg", quality=92, dpi=(round(w / (reg["formats"][fmt]["paper_mm"][0] / 25.4)),) * 2)
        tones[p["id"]] = tone(page)
        print(f"{fmt}/{p['id']}.jpg {tones[p['id']]}")
    tones_path.write_text(json.dumps(tones, indent=1, sort_keys=True) + "\n")


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("out", type=Path)
    ap.add_argument("--registry", type=Path, default=ROOT / "registry" / "gallery.yaml")
    ap.add_argument("--format", action="append", help="format(s) to render (default: all)")
    ap.add_argument("--only", help="comma-separated plate ids")
    a = ap.parse_args(argv)
    reg = yaml.safe_load(a.registry.read_text(encoding="utf-8"))
    only = set(a.only.split(",")) if a.only else None
    for fmt in a.format or list(reg["formats"]):
        render(reg, a.out, fmt, only)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
