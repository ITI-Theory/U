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


def main(argv: list[str]) -> int:
    src, out = Image.open(argv[0]).convert("RGB"), Path(argv[1])
    out.mkdir(parents=True, exist_ok=True)
    src.thumbnail((900, 900))
    frames = [("t0", stage(src, 0.0)), ("t25", stage(src, 0.25)), ("t50", stage(src, 0.5)),
              ("t75", stage(src, 0.75)), ("t100", stage(src, 1.0)), ("retro", retro_bw(src)),
              ("distort", field_distort(src, 2.5))]
    for name, im in frames:
        im.save(out / f"{name}.png")
    w, h = frames[0][1].size
    strip = Image.new("RGB", (w * 4 + 30, h * 2 + 10), "white")
    for k, (_, im) in enumerate(frames):
        strip.paste(im, ((k % 4) * (w + 10), (k // 4) * (h + 10)))
    strip.save(out / "strip.png")
    print(out / "strip.png")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
