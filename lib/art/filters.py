"""Art filters for the art book and the Gallery (ISS-097).

    python lib/art/filters.py SOURCE OUT_DIR      # a strip of every filter on one image

Each filter takes and returns a PIL RGB image; parameters are explicit, so a book build is
repeatable. The programme's two colours, pink and blue, enter as the development goes on:
`stage(img, t)` runs from a raw pencil drawing (t = 0) with the faintest trace of them, to the
full picture (t = 1).
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

PINK = np.array([255, 59, 206], float) / 255   # the Soma Machine's --pink
BLUE = np.array([0, 199, 255], float) / 255    # its blue


def _arr(img: Image.Image) -> np.ndarray:
    return np.asarray(img.convert("RGB"), float) / 255


def _img(a: np.ndarray) -> Image.Image:
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def pencil(img: Image.Image, strength: float = 1.0) -> Image.Image:
    """A graphite drawing on paper: the image's edges as strokes, light where it is dark (the
    Soma Machine draws light on black; pencil draws dark on white)."""
    g = ImageOps.grayscale(img)
    lum = np.asarray(g, float) / 255
    paper_ink = 1 - lum                          # dark background becomes paper
    edges = np.asarray(g.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(0.6)), float) / 255
    shade = np.asarray(Image.fromarray((paper_ink * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)), float) / 255
    sketch = np.clip(0.55 + 0.45 * shade - 2.2 * strength * edges, 0, 1)
    rng = np.random.default_rng(7)
    grain = rng.normal(0, 0.035, sketch.shape)   # the tooth of the paper
    sketch = np.clip(sketch + grain, 0, 1)
    return _img(np.stack([sketch] * 3, -1) * np.array([1.0, 0.98, 0.94]))


def grade(img: Image.Image, t: float) -> Image.Image:
    """Colour as the programme gains it: grey at t = 0, the picture's own colour at t = 1, pink
    and blue pulled up on the way so they are the first colours to arrive."""
    a = _arr(img)
    grey = a.mean(-1, keepdims=True).repeat(3, -1)
    pinkness = np.clip(((a - grey) * (PINK - PINK.mean())).sum(-1, keepdims=True) * 6, 0, 1)
    blueness = np.clip(((a - grey) * (BLUE - BLUE.mean())).sum(-1, keepdims=True) * 6, 0, 1)
    early = grey + np.clip(t * 2.5, 0, 1) * (pinkness * (PINK - grey) + blueness * (BLUE - grey)) * 0.6
    return _img((1 - t) * early + t * a)


def stage(img: Image.Image, t: float) -> Image.Image:
    """A stage of the programme's development. Early (t < 0.7) it is a pencil drawing on paper,
    with the pink and blue in the strokes from the start, faint, fitting in but not quite, and
    growing; late (t from 0.7 to 1) the drawing gives way to the picture itself."""
    sketch = _arr(pencil(img))
    a = _arr(img)
    grey = a.mean(-1, keepdims=True)
    colour = np.clip(((a - grey) ** 2).sum(-1, keepdims=True) * 10, 0, 1)    # where the picture has colour
    hue = np.where(a[..., 0:1] > a[..., 2:3], PINK, BLUE)
    tint = 0.10 + 0.55 * min(t / 0.7, 1.0)                                      # faint at first
    drawing = sketch * (1 - tint * colour) + tint * colour * hue * sketch.mean(-1, keepdims=True) ** 0.3
    if t <= 0.7:
        return _img(drawing)
    w = (t - 0.7) / 0.3
    w = w * w * (3 - 2 * w)                                                      # smoothstep: brief crossing
    return _img((1 - w) * drawing + w * a)


def retro_bw(img: Image.Image, seed: int = 1966) -> Image.Image:
    """Black-and-white film, 1966: hard contrast, grain, a vignette, a scratch or two."""
    g = np.asarray(ImageOps.grayscale(img), float) / 255
    g = np.clip((g - 0.12) * 1.9, 0, 1) ** 0.85
    rng = np.random.default_rng(seed)
    g = g + rng.normal(0, 0.07, g.shape)
    h, w = g.shape
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.hypot((xx - w / 2) / (w / 2), (yy - h / 2) / (h / 2))
    g = g * np.clip(1.15 - 0.55 * r ** 2, 0, 1)
    for _ in range(2):                         # a faint scratch, broken, not a ruled line
        x = int(rng.integers(0, w)); y0 = int(rng.integers(0, h // 2)); y1 = int(rng.integers(h // 2, h))
        g[y0:y1, x:x + 1] += rng.uniform(0.06, 0.12)
    return _img(np.stack([np.clip(g, 0, 1)] * 3, -1))


def field_distort(img: Image.Image, amplitude: float = 1.0, seed: int = 8) -> Image.Image:
    """Distortion as the field's amplitude: the picture is pushed along a smooth field of a few
    modes (a sum of standing waves), more as the amplitude rises."""
    from scipy.ndimage import map_coordinates
    a = _arr(img)
    h, w = a.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    rng = np.random.default_rng(seed)
    dx = np.zeros((h, w)); dy = np.zeros((h, w))
    for _ in range(6):
        kx, ky = rng.uniform(1, 5, 2) * 2 * np.pi / np.array([w, h])
        ph = rng.uniform(0, 2 * np.pi, 2)
        dx += np.sin(kx * xx + ky * yy + ph[0]); dy += np.cos(kx * yy - ky * xx + ph[1])
    s = amplitude * 0.012 * min(h, w)
    out = np.stack([map_coordinates(a[..., c], [yy + s * dy / 6, xx + s * dx / 6], order=1, mode="reflect")
                    for c in range(3)], -1)
    return _img(out)


def engraving(img: Image.Image, spacing: int = 7) -> Image.Image:
    """A copperplate engraving, Leibniz's 1714: sepia ink on laid paper, the tone made by
    parallel lines that swell in the shadows, cross-hatched in the deepest. A picture drawn
    light on dark (as the Soma Machine draws) is read the other way round, so its light is ink."""
    g = np.asarray(ImageOps.grayscale(img).filter(ImageFilter.GaussianBlur(1.5)), float) / 255
    tone = g if g.mean() < 0.4 else 1 - g                        # how much ink
    tone = np.clip((tone - np.percentile(tone, 5)) / (np.percentile(tone, 97) - np.percentile(tone, 5) + 1e-6), 0, 1)
    h, w = g.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    spacing = max(4, int(spacing * max(h, w) / 1600))
    phase = (yy + 0.3 * xx) % spacing / spacing
    cross = (yy - 1.2 * xx) % spacing / spacing
    ink = (np.abs(phase - 0.5) < 0.45 * tone).astype(float)
    ink = np.maximum(ink, (np.abs(cross - 0.5) < 0.5 * np.clip(tone - 0.6, 0, 1) / 0.4).astype(float))
    rng = np.random.default_rng(1714)
    paper = 0.94 + 0.015 * np.sin(yy / max(2, spacing // 3)) + rng.normal(0, 0.01, g.shape)   # laid lines
    sepia_ink, sepia_paper = np.array([0.22, 0.14, 0.08]), np.array([0.97, 0.92, 0.81])
    out = paper[..., None] * sepia_paper * (1 - 0.9 * ink[..., None]) + 0.9 * ink[..., None] * sepia_ink
    return _img(out).filter(ImageFilter.GaussianBlur(0.5))


PALETTE_1911 = {"black": [0.06, 0.05, 0.07], "ultramarine": [0.12, 0.22, 0.62], "yellow": [0.96, 0.78, 0.12],
                "vermilion": [0.86, 0.20, 0.12], "green": [0.18, 0.52, 0.32], "ground": [0.95, 0.91, 0.82],
                "violet": [0.42, 0.22, 0.55]}


def abstraction_1911(img: Image.Image, cells: int = 150) -> Image.Image:
    """Abstraction as it began around 1911 (the Blaue Reiter years, when Principia was being
    written): the picture reduced to flat fields of a few strong colours on a warm ground, with
    black contours. Kandinsky's palette, not his pictures: the forms are the programme's own."""
    import colorsys
    w0, h0 = img.size
    small = img.convert("RGB").resize((cells, max(1, round(cells * h0 / w0))), Image.Resampling.BOX)
    small = small.filter(ImageFilter.MedianFilter(3))
    a = _arr(small)
    hsv = np.array([[colorsys.rgb_to_hsv(*px) for px in row] for row in a])
    hue, sat, val = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    names = np.full(hue.shape, "ground", dtype=object)
    coloured = sat > 0.18
    names[coloured & ((hue < 40) | (hue >= 300))] = "vermilion"   # the programme's pink
    names[coloured & (hue >= 40) & (hue < 75)] = "yellow"
    names[coloured & (hue >= 75) & (hue < 165)] = "green"
    names[coloured & (hue >= 165) & (hue < 250)] = "ultramarine"  # its blue
    names[coloured & (hue >= 250) & (hue < 300)] = "violet"
    names[(~coloured) & (val > 0.8)] = "yellow" if a.mean() < 0.4 else "ground"
    names[val < 0.16] = "black"
    out = np.array([[PALETTE_1911[n] for n in row] for row in names])
    flat = _img(out).resize((w0, h0), Image.Resampling.NEAREST).filter(ImageFilter.ModeFilter(9))
    edges = np.asarray(flat.convert("L").filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(5)), float) / 255
    b = _arr(flat.filter(ImageFilter.GaussianBlur(2)))
    k = np.clip(edges * 4, 0, 1)[..., None]
    b = b * (1 - k) + k * np.array(PALETTE_1911["black"])
    rng = np.random.default_rng(1911)
    b = b * (1 + rng.normal(0, 0.025, b.shape[:2])[..., None])   # the brush, a little uneven
    return _img(b)


def fill(img: Image.Image, width: int, height: int) -> Image.Image:
    """Crop to the page's shape (centred) and scale to width x height: plates print to the edge."""
    w, h = img.size
    target = width / height
    if w / h > target:
        nw = round(h * target); img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = round(w / target); img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return img.resize((width, height), Image.Resampling.LANCZOS)


FILTERS = {
    "stage": lambda im, x: stage(im, float(x)),
    "pencil": lambda im, x: pencil(im, float(x or 1.0)),
    "retro_bw": lambda im, x: retro_bw(im),
    "distort": lambda im, x: field_distort(im, float(x or 1.0)),
    "engraving": lambda im, x: engraving(im),
    "abstraction_1911": lambda im, x: abstraction_1911(im),
}


def apply(img: Image.Image, chain: list[str]) -> Image.Image:
    """Apply a chain of filters named as in the registry: "stage:0.3", "distort:2", "retro_bw"."""
    for step in chain:
        name, _, arg = str(step).partition(":")
        img = FILTERS[name](img, arg or None)
    return img


def main(argv: list[str]) -> int:
    src, out = Image.open(argv[0]).convert("RGB"), Path(argv[1])
    out.mkdir(parents=True, exist_ok=True)
    src.thumbnail((900, 900))
    frames = [("t0", stage(src, 0.0)), ("t25", stage(src, 0.25)), ("t50", stage(src, 0.5)),
              ("t75", stage(src, 0.75)), ("t100", stage(src, 1.0)), ("retro", retro_bw(src)),
              ("distort", field_distort(src, 2.5)), ("1714", engraving(src)),
              ("1911", abstraction_1911(src)), ("1989", pencil(src))]
    for name, im in frames:
        im.save(out / f"{name}.png")
    w, h = frames[0][1].size
    strip = Image.new("RGB", (w * 4 + 30, h * 3 + 20), "white")
    for k, (_, im) in enumerate(frames):
        strip.paste(im, ((k % 4) * (w + 10), (k // 4) * (h + 10)))
    strip.save(out / "strip.png")
    print(out / "strip.png")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
