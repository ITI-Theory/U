"""Private avant-garde art for the visual thoughts (ISS-077, the private tier).

    python art_private.py            # extract pictures from the author's art books
    python art_private.py --list     # what is there

The pictures are the books' picture pages, rendered from the author's Calibre library (pdftoppm)
into a private folder outside every repository (SOMA_ART_DIR, default
%LOCALAPPDATA%/SomaMachine/art), and served only by the local MOTHER bridge (GET /art/...,
local origins only), only when RICE is on. They are never copied into the app's public/
(a vite build publishes all of public/). For the author's own use on this machine.
Needs Pillow and pdftoppm (xpdf or poppler); run with the system Python.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

CALIBRE = Path(os.environ.get("CALIBRE_LIBRARY", r"C:\Users\alist\OneDrive\Apps\Calibre Portable\Calibre Library"))
ART_DIR = Path(os.environ.get("SOMA_ART_DIR") or Path(os.environ.get("LOCALAPPDATA", Path.home())) / "SomaMachine" / "art")

# (artist, book, path in the Calibre library)
BOOKS = [
    ("Wassily Kandinsky", "On the Spiritual in Art", r"Kandinsky, Wassily, 1866-1944\On the spiritual in art _ (161)\On the spiritual in art _ - Kandinsky, Wassily, 1866-1944.pdf"),
    ("Wassily Kandinsky", "Kandinsky in Munich, 1896-1914", r"Wassily Kandinsky\Kandinsky in Munich, 1896-1914 (138)\Kandinsky in Munich, 1896-1914 - Wassily Kandinsky.pdf"),
    ("Wassily Kandinsky", "Kandinsky: Russian and Bauhaus Years", r"Wassily Kandinsky\Kandinsky_ Russian and Bauhaus Year (140)\Kandinsky_ Russian and Bauhaus - Wassily Kandinsky.pdf"),
    ("Paul Klee", "Notebook 1: The Thinking Eye", r"Paul Klee\Paul Klee Notebook 1 (143)\Paul Klee Notebook 1 - Paul Klee.pdf"),
    ("Art Gallery of New South Wales", "The Moderns", r"Art Gallery of New South Wales; Sol\The Moderns (159)\The Moderns - Art Gallery of New South Wales;.pdf"),
    ("Martha Cooper and Henry Chalfant", "Subway Art", r"Martha Cooper\Subway Art (319)\Subway Art - Martha Cooper.pdf"),
    ("Banksy", "Wall and Piece", r"Banksy\Wall and Piece (308)\Wall and Piece - Banksy.pdf"),
    ("Banksy", "Banging Your Head Against a Brick Wall", r"Banksy\Banging Your Head Against a Brick W (318)\Banging Your Head Against a Bri - Banksy.pdf"),
]
PER_BOOK = 40      # at most this many pictures from one book, spread through it
MIN_SATURATION = 0.10  # below this a page is mostly grey: text, diagrams


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:48]


def saturation(img) -> float:
    from PIL import ImageStat
    return ImageStat.Stat(img.convert("HSV").resize((64, 64))).mean[1] / 255


def extract(artist: str, book: str, rel: str) -> list[dict]:
    from PIL import Image
    pdf = CALIBRE / rel
    if not pdf.exists():
        print(f"  missing: {pdf}")
        return []
    out = ART_DIR / slug(book)
    shutil.rmtree(out, ignore_errors=True)
    out.mkdir(parents=True)
    items = []
    with tempfile.TemporaryDirectory() as tmp:
        # render the pages as a viewer draws them (pdfimages mis-decodes some scanned books'
        # image streams); small first, to choose
        subprocess.run(["pdftoppm", "-r", "18", str(pdf), str(Path(tmp) / "p")], check=False)
        keep = []  # pages in book order that look like pictures: colour, not mostly paper
        for f in sorted(Path(tmp).glob("p*.ppm")):
            with Image.open(f) as img:
                rgb = img.convert("RGB")
                sat = saturation(rgb)
                light = sum(1 for v in rgb.convert("L").getdata() if v > 225) / (rgb.width * rgb.height)
            if sat >= MIN_SATURATION and light < 0.6:
                keep.append(int(re.search(r"(\d+)", f.stem).group(1)))
        step = max(1, len(keep) / PER_BOOK)
        for k in range(min(PER_BOOK, len(keep))):
            page = keep[int(k * step)]
            stem = Path(tmp) / f"big{k:03d}"
            subprocess.run(["pdftoppm", "-r", "110", "-f", str(page), "-l", str(page), str(pdf), str(stem)], check=False)
            big = next(Path(tmp).glob(f"big{k:03d}*.ppm"), None)
            if not big:
                continue
            img = Image.open(big).convert("RGB")
            img.thumbnail((1024, 1024))
            name = f"{k:03d}.jpg"
            img.save(out / name, "JPEG", quality=82)
            items.append({"src": f"{slug(book)}/{name}", "artist": artist, "book": book, "page": page, "private": True})
        print(f"  {book}: {len(items)} pictures (of {len(keep)} candidates)")
    return items


def main() -> int:
    if "--list" in sys.argv:
        m = ART_DIR / "manifest.json"
        print(m.read_text(encoding="utf-8") if m.exists() else f"nothing in {ART_DIR}")
        return 0
    if not shutil.which("pdftoppm"):
        print("pdftoppm (xpdf or poppler) is needed", file=sys.stderr)
        return 1
    ART_DIR.mkdir(parents=True, exist_ok=True)
    print(f"{ART_DIR}")
    manifest = []
    for artist, book, rel in BOOKS:
        manifest += extract(artist, book, rel)
    (ART_DIR / "manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(manifest)} pictures; served by the MOTHER bridge at /art/ when RICE is on")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
