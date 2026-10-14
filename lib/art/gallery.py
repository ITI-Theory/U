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


def source(src: str, hires_ok: bool = True) -> Path:
    """The plate's picture: the 4K recapture of an app view if one has been made (`make hires`:
    the app's captures are 1920 wide, soft at A3), else the committed one. `hires: false` on a
    plate keeps the committed capture (a moving view can be caught at another moment)."""
    path = ROOT / src
    hires = ROOT / "bld" / "gallery" / "hires" / "voyage" / path.name
    return hires if hires_ok and "/app/voyage/" in src and hires.exists() else path


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
        src = Image.open(source(p["src"], p.get("hires", True))).convert("RGB")
        # Filter at a working size close to the page, so strokes and grain scale with the print.
        scale = max(w / src.width, h / src.height)
        if scale > 1:
            src = src.resize((round(src.width * scale), round(src.height * scale)), Image.Resampling.LANCZOS)
        key = (str(source(p["src"], p.get("hires", True))), tuple(p["chain"]), src.size)
        img = cache.get(key) or filters.apply(src, p["chain"])
        cache[key] = img
        page = filters.fill(img, w, h)
        page.save(d / f"{p['id']}.jpg", quality=92, dpi=(round(w / (reg["formats"][fmt]["paper_mm"][0] / 25.4)),) * 2)
        tones[p["id"]] = tone(page)
        print(f"{fmt}/{p['id']}.jpg {tones[p['id']]}")
    tones_path.write_text(json.dumps(tones, indent=1, sort_keys=True) + "\n")


def contact(reg: dict, out: Path, fmt: str) -> Path:
    """A numbered contact sheet of every plate, room by room, for the curator's cut: the
    author strikes the weak ones; a candidate (new, not yet chosen) has a pink frame."""
    from PIL import ImageDraw, ImageFont
    try:
        font = ImageFont.truetype("arial.ttf", 16); big = ImageFont.truetype("arialbd.ttf", 22)
    except OSError:
        font = big = ImageFont.load_default()
    tw, th, cols, pad = 360, 257, 6, 10
    rows = []
    n = 0
    for room in reg["rooms"]:
        rows.append(("room", room))
        cells = room["plates"]
        for i in range(0, len(cells), cols):
            rows.append(("plates", cells[i:i + cols]))
    height = sum(40 if kind == "room" else th + 46 for kind, _ in rows) + pad
    sheet = Image.new("RGB", (cols * (tw + pad) + pad, height), (24, 26, 32))
    draw = ImageDraw.Draw(sheet)
    y = pad
    for kind, item in rows:
        if kind == "room":
            draw.text((pad, y + 8), f"{item['title'].upper()}  ({item['when']})", fill=(240, 200, 90), font=big)
            y += 40
            continue
        for k, p in enumerate(item):
            n += 1
            x = pad + k * (tw + pad)
            im = Image.open(out / fmt / f"{p['id']}.jpg"); im.thumbnail((tw, th))
            sheet.paste(im, (x, y))
            if p.get("candidate"):
                draw.rectangle([x - 3, y - 3, x + tw + 2, y + th + 2], outline=(255, 59, 206), width=3)
            draw.text((x, y + th + 6), f"{n}. {p['id']}", fill=(235, 235, 235), font=font)
            draw.text((x, y + th + 25), " ".join(p["chain"]), fill=(150, 160, 180), font=font)
        y += th + 46
    path = out.parent / f"contact-{fmt}.jpg"
    sheet.save(path, quality=88)
    return path


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("out", type=Path)
    ap.add_argument("--registry", type=Path, default=ROOT / "registry" / "gallery.yaml")
    ap.add_argument("--format", action="append", help="format(s) to render (default: all)")
    ap.add_argument("--only", help="comma-separated plate ids")
    ap.add_argument("--contact", action="store_true", help="also write a numbered contact sheet (the curator's cut)")
    a = ap.parse_args(argv)
    reg = yaml.safe_load(a.registry.read_text(encoding="utf-8"))
    only = set(a.only.split(",")) if a.only else None
    for fmt in a.format or list(reg["formats"]):
        render(reg, a.out, fmt, only)
        if a.contact:
            print(contact(reg, a.out, fmt))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
