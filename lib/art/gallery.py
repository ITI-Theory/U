"""Render the plates of A Gallery of Thoughts (ISS-097) from registry/gallery.yaml.

    python lib/art/gallery.py OUT_DIR [--format lulu-a4|a3|projector] [--only ID,...]

For each format, every plate (and the cover) is the programme's own picture put through its
filter chain (lib/art/filters.py), cropped to the page's shape with its bleed and saved as
OUT_DIR/<format>/<id>.jpg. tones.json beside them says whether the corner where the caption
sits is light or dark, so the layout can choose the caption's colours; tstops.json gives each
plate's [T]-stop, the settings that made it. Images only: the book's
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
SNAPS = ROOT / "bld" / "gallery" / "snaps"


def plates(reg: dict) -> list[dict]:
    out = [{"id": "cover", **reg["cover"]}]
    for room in reg["rooms"]:
        out += room["plates"]
    return out


def source(src: str, hires_ok: bool = True) -> Path:
    """The plate's picture: the 4K recapture of an app view if one has been made (`make hires`:
    the app's captures are 1920 wide, soft at A3), else the committed one. `hires: false` on a
    plate keeps the committed capture (a moving view can be caught at another moment)."""
    if src.startswith("hires:"):                       # a Gallery capture (registry `captures`)
        return ROOT / "bld" / "gallery" / "hires" / "voyage" / f"{src[6:]}.png"
    if src.startswith("snap:"):                        # a somagram the author took (SNAP in the app)
        return SNAPS / f"{src[5:]}.png"
    path = ROOT / src
    hires = ROOT / "bld" / "gallery" / "hires" / "voyage" / path.name
    return hires if hires_ok and "/app/voyage/" in src and hires.exists() else path


# The [T]-stop (author, 14 Oct): as a photobook records the f-stop, the film and the exposure,
# each plate (a somagram: the record the Soma Machine, the somagraph, makes) records the
# reading of the field when it was taken: what stood out, the moment, the limbic field, the
# process.
PROCESS = {"pencil": "graphite, 1989", "engraving": "copperplate, 1714", "abstraction_1911": "flat colour, 1911",
           "retro_bw": "16 mm black and white, 1966"}


def views(reg: dict) -> dict[str, str]:
    """Each captured picture's address in the app: the Atlas's voyage plates and the Gallery's own."""
    atlas = yaml.safe_load((ROOT / "Part2/book/field-atlas/atlas.yaml").read_text(encoding="utf-8"))
    out = {}
    groups = [[s["world"] for s in atlas.get("sectors", []) if s.get("world")], atlas.get("palace", {}).get("plates", []),
              atlas.get("code_city", {}).get("plates", [])] + [s.get("plates", []) for s in atlas.get("voyage", {}).get("stops", [])]
    for plates in groups:
        for p in plates:
            out[p["id"]] = p["view"]
    for c in reg.get("captures", []):
        out[c["id"]] = c["view"]
    return out


def score_at(t: float) -> dict[str, float]:
    """The River Film's seven feelings at story-time t (its keyframes, linearly between)."""
    score = yaml.safe_load((ROOT / "registry/scores/river-film.yaml").read_text(encoding="utf-8"))
    ids = [m["id"] for m in score["modes"]]
    keys = score["keyframes"]
    for (t0, v0), (t1, v1) in zip(keys, keys[1:]):
        if t0 <= t <= t1:
            w = (t - t0) / (t1 - t0) if t1 > t0 else 0
            return {k: a + w * (b - a) for k, a, b in zip(ids, v0, v1)}
    return dict(zip(ids, keys[-1][1]))


def phase_at(t: float) -> str:
    score = yaml.safe_load((ROOT / "registry/scores/river-film.yaml").read_text(encoding="utf-8"))
    name = ""
    for ph in score["phases"]:
        if ph["t"] <= t:
            name = ph["name"]
    return name


NAMES = {"S": "safety", "F": "fear", "C": "curiosity", "A": "awe", "G": "grief", "L": "language", "PV": "pre-verbal"}


def salient(feel: dict[str, float]) -> str:
    """What stood out when the picture was taken (author, 14 Oct: "oh wow, look how high the awe
    is"): the feelings that were very high or very low, at most three; if none was, the two
    strongest."""
    marked = sorted(((v, k) for k, v in feel.items() if v >= 0.7 or v <= 0.1), key=lambda x: -(abs(x[0] - 0.5) + (0.06 if x[0] >= 0.5 else 0)))[:3]   # a high reads first
    if not marked:
        marked = sorted(((v, k) for k, v in feel.items()), reverse=True)[:2]
    return ", ".join(f"{NAMES[k]} {'high' if v >= 0.5 else 'low'} {v:.2f}" for v, k in marked)


def threshold_at(t: float) -> str:
    score = yaml.safe_load((ROOT / "registry/scores/river-film.yaml").read_text(encoding="utf-8"))
    for th in score.get("thresholds", []):
        if abs(th["t"] - t) <= 0.02:
            return f", at threshold {th['id']} ({th['from']} to {th['to']})"
    return ""


def tstop(p: dict, address: dict[str, str]) -> str:
    """The plate's [T]-stop as one line: limbic field, dimension, level or stop, story-time and
    phase with the seven feelings, and the process (the filter)."""
    stem = Path(p["src"].split(":", 1)[-1]).stem
    parts = []
    snap = None
    if p["src"].startswith("snap:"):                   # the reading the app wrote when the author snapped
        snap = json.loads((SNAPS / f"{p['src'][5:]}.json").read_text(encoding="utf-8"))
        address = {**address, stem: snap.get("address", "")}
    if "--" in stem:                                   # an Atlas level plate: NN-level--11d
        level, dim = stem.split("--")
        parts += [dim.upper(), level.split("-", 1)[1].replace("-", " ")]
        q = {}
    else:
        q = dict(x.split("=", 1) for x in address.get(stem, "").split("&") if "=" in x)
        if snap:                                       # live values beat the address's start values
            q.update({k: str(v) for k, v in (("phi", snap.get("phi")), ("dim", snap.get("dim")), ("st", snap.get("storyTime")),
                                              ("voyage", snap.get("stop"))) if v is not None})
        if "phi" in q:
            parts.append(f"Φ {float(q['phi']):.2f}")
        if "dim" in q:
            parts.append(f"{q['dim']}D")
        if q.get("level"):
            parts.append(q["level"].replace("-", " "))
        if q.get("voyage"):
            parts.append(f"stop: {q['voyage']}")
        if q.get("voyage") == "score" and "st" in q:
            st = float(q["st"])
            parts.insert(0, f"{phase_at(st)}, t {st:.2f}" + threshold_at(st))
            live = snap.get("modes") if snap else None   # the feelings as they were, knobs and all
            parts.insert(1, salient(live or score_at(st)))
    if snap:
        local = snap.get("local")                       # "YYYYMMDD HH:MM", the author's own clock
        when = f"{local[:4]}-{local[4:6]}-{local[6:8]}{local[8:]}" if local else snap["taken"][:16].replace("T", " ") + " UTC"
        parts.append(f"snapped {when}")
    steps = []
    for step in p["chain"]:
        name, _, arg = step.partition(":")
        if name == "stage":
            steps.append("the app's own picture" if float(arg) >= 1 else f"stage {float(arg):.2f} of the programme")
        elif name == "distort":
            steps.append(f"field distortion {arg}")
        else:
            steps.append(PROCESS.get(name, name))
    parts.append(", ".join(steps))
    return "[T]-stop " + " · ".join(parts)


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
    address = views(reg)
    stops = {p["id"]: tstop(p, address) for p in plates(reg)}
    (d / "tstops.json").write_text(json.dumps(stops, indent=1, sort_keys=True, ensure_ascii=False) + "\n", encoding="utf-8")
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
