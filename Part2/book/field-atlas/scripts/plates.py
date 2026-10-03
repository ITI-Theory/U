#!/usr/bin/env python3
"""Compose biology-atlas plates from clean Soma Machine captures.

Input comes from:

    npm run capture -- --only atlas-plates --width 1920 --height 1200 --scale 2

Outputs:
    figures/plates/<level>-triptych.png
    figures/plates/<level>-callouts.png
    figures/plates/plates.json
"""
from __future__ import annotations

import argparse
import json
import math
import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps, ImageStat


ATLAS = Path(__file__).resolve().parents[1]
DEFAULT_IN = ATLAS / "figures" / "app" / "atlas-plates"
DEFAULT_OUT = ATLAS / "figures" / "plates"
TRIPTYCH_WIDTH = 4724  # 400 mm at 300 dpi, rounded for safe image handling.
CALLOUT_WIDTH = 4724
BG = (244, 239, 226)
INK = (28, 33, 36)
MUTED = (96, 97, 88)
HAIRLINE = (42, 48, 50)
BAND = (232, 223, 203)
CYAN = (20, 128, 150)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/calibrib.ttf" if bold else "C:/Windows/Fonts/calibri.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


FONT_TITLE = font(54, True)
FONT_LABEL = font(38, True)
FONT_SMALL = font(27)
FONT_SMALL_BOLD = font(27, True)
FONT_KEY = font(42)
FONT_KEY_BOLD = font(46, True)
FONT_BADGE = font(38, True)


def print_tone(image: Image.Image) -> Image.Image:
    """Lift screen-dark captures into a print-friendly tonal range."""
    toned = image.convert("RGB")
    lut = [min(255, int((value / 255) ** 0.64 * 255)) for value in range(256)]
    toned = toned.point(lut * 3)
    toned = ImageEnhance.Contrast(toned).enhance(1.18)
    toned = ImageEnhance.Color(toned).enhance(1.18)
    toned = ImageEnhance.Brightness(toned).enhance(1.06)
    toned = ImageEnhance.Sharpness(toned).enhance(1.08)
    return ImageOps.autocontrast(toned, cutoff=0.2)


def draw_centered_text(draw: ImageDraw.ImageDraw, center: tuple[float, float], text: str, text_font, fill=INK) -> None:
    bbox = draw.textbbox((0, 0), text, font=text_font)
    x = center[0] - (bbox[2] - bbox[0]) / 2 - bbox[0]
    y = center[1] - (bbox[3] - bbox[1]) / 2 - bbox[1]
    draw.text((x, y), text, fill=fill, font=text_font)


def draw_letter_badge(draw: ImageDraw.ImageDraw, center: tuple[float, float], letter: str, radius: int = 34) -> None:
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=BG, outline=HAIRLINE, width=3)
    draw_centered_text(draw, (x, y - 1), letter, FONT_BADGE, INK)


def load_anchor(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def image_point(anchor: dict, image: Image.Image) -> tuple[float, float] | None:
    screen = anchor.get("screen")
    if not screen:
        return None
    viewport = anchor.get("_viewport") or {}
    width = viewport.get("width") or image.width
    height = viewport.get("height") or image.height
    return (screen["x"] * image.width / width, screen["y"] * image.height / height)


def visible_anchors(anchor_doc: dict, image: Image.Image) -> list[dict]:
    viewport = anchor_doc.get("viewport", {})
    anchors = []
    for anchor in anchor_doc.get("anchors", []):
        screen = anchor.get("screen", {})
        if not screen.get("visible", True):
            continue
        copy = dict(anchor)
        copy["_viewport"] = viewport
        point = image_point(copy, image)
        if point:
            copy["_point"] = point
            anchors.append(copy)
    return anchors


def union_crop(points: list[tuple[float, float]], size: tuple[int, int], margin: int = 460) -> tuple[int, int, int, int]:
    width, height = size
    if not points:
      return (int(width * 0.16), int(height * 0.13), int(width * 0.84), int(height * 0.87))
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    left = max(0, int(min(xs) - margin))
    top = max(0, int(min(ys) - margin))
    right = min(width, int(max(xs) + margin))
    bottom = min(height, int(max(ys) + margin))
    min_w = int(width * 0.34)
    min_h = int(height * 0.34)
    if right - left < min_w:
        mid = (left + right) / 2
        left = max(0, int(mid - min_w / 2))
        right = min(width, left + min_w)
        left = max(0, right - min_w)
    if bottom - top < min_h:
        mid = (top + bottom) / 2
        top = max(0, int(mid - min_h / 2))
        bottom = min(height, top + min_h)
        top = max(0, bottom - min_h)
    return (left, top, right, bottom)


def fit_crop_to_aspect(crop: tuple[int, int, int, int], size: tuple[int, int], aspect: float) -> tuple[int, int, int, int]:
    left, top, right, bottom = crop
    width, height = size
    current = (right - left) / max(1, bottom - top)
    if current < aspect:
        new_w = int((bottom - top) * aspect)
        mid = (left + right) / 2
        left = max(0, int(mid - new_w / 2))
        right = min(width, left + new_w)
        left = max(0, right - new_w)
    else:
        new_h = int((right - left) / aspect)
        mid = (top + bottom) / 2
        top = max(0, int(mid - new_h / 2))
        bottom = min(height, top + new_h)
        top = max(0, bottom - new_h)
    return (left, top, right, bottom)


def cover_resize(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    target_w, target_h = box
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((math.ceil(image.width * scale), math.ceil(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def draw_label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, fill=INK) -> None:
    draw.text(xy, text, fill=fill, font=FONT_LABEL)


def compose_triptych(level: str, label: str, images: dict[str, Image.Image], anchors: dict[str, dict], out: Path) -> dict:
    dims = [("4d", "4D / BODY"), ("8d", "8D / FEELING"), ("11d", "11D / MIND")]
    all_points: list[tuple[float, float]] = []
    for dim, _ in dims:
        all_points.extend(anchor["_point"] for anchor in visible_anchors(anchors[dim], images[dim]))
    col_w = TRIPTYCH_WIDTH // 3
    band_h = 172
    gutter = 18
    panel_w = col_w - gutter * 2
    panel_h = 1430
    crop = fit_crop_to_aspect(union_crop(all_points, images["11d"].size), images["11d"].size, panel_w / panel_h)
    canvas = Image.new("RGB", (TRIPTYCH_WIDTH, band_h + panel_h + 118), BG)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, TRIPTYCH_WIDTH, band_h), fill=BAND)
    draw.text((54, 38), label.upper(), fill=INK, font=FONT_TITLE)
    for index, (dim, title) in enumerate(dims):
        x = index * col_w + gutter
        y = band_h
        panel = cover_resize(images[dim].crop(crop), (panel_w, panel_h))
        canvas.paste(panel, (x, y))
        draw.rectangle((x, y, x + panel_w, y + panel_h), outline=HAIRLINE, width=3)
        draw.text((x + 24, 105), title, fill=INK, font=FONT_SMALL_BOLD)
    draw.text((54, band_h + panel_h + 38), "Same subject crop across 4D baseline, 8D response, and 11D integration views.", fill=MUTED, font=FONT_SMALL)
    canvas.save(out)
    return {
        "file": out.relative_to(ATLAS).as_posix(),
        "caption": f"Figure for {label}: aligned 4D, 8D, and 11D views cropped to the same atlas subject field.",
        "crop": crop,
    }


def rounded_paste(base: Image.Image, image: Image.Image, xy: tuple[int, int], radius: int = 38) -> None:
    mask = Image.new("L", image.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, image.width, image.height), radius=radius, fill=255)
    base.paste(image, xy, mask)


def wrap(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, replace_whitespace=False) or [""]


def anchor_crop(image: Image.Image, point: tuple[float, float], source_w: int, source_h: int) -> Image.Image:
    left, top, right, bottom = anchor_crop_box(image, point, source_w, source_h)
    return image.crop((left, top, right, bottom))


def anchor_crop_box(image: Image.Image, point: tuple[float, float], source_w: int, source_h: int) -> tuple[int, int, int, int]:
    x, y = point
    left = max(0, int(x - source_w / 2))
    top = max(0, int(y - source_h / 2))
    right = min(image.width, left + source_w)
    bottom = min(image.height, top + source_h)
    left = max(0, right - source_w)
    top = max(0, bottom - source_h)
    return (left, top, right, bottom)


def iou(a: tuple[int, int, int, int], b: tuple[int, int, int, int]) -> float:
    left = max(a[0], b[0])
    top = max(a[1], b[1])
    right = min(a[2], b[2])
    bottom = min(a[3], b[3])
    if right <= left or bottom <= top:
        return 0.0
    intersection = (right - left) * (bottom - top)
    area_a = (a[2] - a[0]) * (a[3] - a[1])
    area_b = (b[2] - b[0]) * (b[3] - b[1])
    return intersection / max(1, area_a + area_b - intersection)


def signal_score(crop: Image.Image) -> float:
    gray = crop.convert("L")
    stat = ImageStat.Stat(gray)
    mean = stat.mean[0]
    std = stat.stddev[0]
    edges = ImageStat.Stat(gray.filter(ImageFilter.FIND_EDGES)).mean[0]
    return std * 0.75 + edges * 1.65 + min(mean, 180) * 0.025


def anchor_scale_profile(anchor_id: str) -> tuple[float, ...]:
    if anchor_id in {"soma", "disc", "halo", "void", "web-filament", "flock-envelope", "group-boundary", "catchment"}:
        return (2.15, 1.75, 1.35, 1.0)
    if any(part in anchor_id for part in ("nucleus", "hillock", "synapse", "head", "tail", "node", "core", "well")):
        return (1.0, 1.18, 1.38, 1.65)
    if any(part in anchor_id for part in ("myelin", "dendrite", "orbit", "line", "lane", "stream", "arm", "jet", "fault")):
        return (1.18, 1.0, 1.45, 1.75)
    return (1.35, 1.0, 1.65, 2.0)


def candidate_anchors(anchor_id: str, images: dict[str, Image.Image], anchors: dict[str, dict], inset_size: tuple[int, int]) -> list[dict]:
    candidates = []
    seen = set()
    for dim in ("11d", "8d", "4d"):
        for anchor in visible_anchors(anchors[dim], images[dim]):
            if anchor["id"] != anchor_id:
                continue
            for scale in anchor_scale_profile(anchor_id):
                source_w = min(images[dim].width, max(inset_size[0], int(inset_size[0] * scale)))
                source_h = min(images[dim].height, max(inset_size[1], int(inset_size[1] * scale)))
                key = (dim, source_w, source_h)
                if key in seen:
                    continue
                seen.add(key)
                crop_box = anchor_crop_box(images[dim], anchor["_point"], source_w, source_h)
                crop = images[dim].crop(crop_box)
                score = signal_score(crop) - (scale - 1) * 2.0
                selected = dict(anchor)
                selected["_source_dim"] = dim
                selected["_source_size"] = (source_w, source_h)
                selected["_score"] = round(score, 2)
                selected["_crop"] = crop
                selected["_crop_box"] = crop_box
                selected["_scale"] = scale
                candidates.append(selected)
    return sorted((candidate for candidate in candidates if candidate["_score"] >= 7.0), key=lambda item: item["_score"], reverse=True)


def pick_callout_anchors(ordered_ids: list[str], images: dict[str, Image.Image], anchors: dict[str, dict], inset_size: tuple[int, int]) -> list[dict]:
    selected: list[dict] = []
    for anchor_id in ordered_ids:
        candidates = candidate_anchors(anchor_id, images, anchors, inset_size)
        choice = None
        for candidate in candidates:
            overlaps = [
                iou(candidate["_crop_box"], existing["_crop_box"])
                for existing in selected
                if existing["_source_dim"] == candidate["_source_dim"]
            ]
            if not overlaps or max(overlaps) <= 0.5:
                choice = candidate
                break
        if choice is None and candidates:
            choice = min(
                candidates,
                key=lambda candidate: max(
                    [iou(candidate["_crop_box"], existing["_crop_box"]) for existing in selected if existing["_source_dim"] == candidate["_source_dim"]] or [0.0],
                ),
            )
        if choice:
            selected.append(choice)
        if len(selected) == 6:
            break
    return selected


def compose_callouts(level: str, label: str, images: dict[str, Image.Image], anchors: dict[str, dict], out: Path) -> dict:
    source_dim = "11d"
    source = images[source_dim]
    inset_w, inset_h = 730, 500
    ordered_ids = []
    for dim in ("11d", "8d", "4d"):
        for anchor in visible_anchors(anchors[dim], images[dim]):
            if anchor["id"] not in ordered_ids:
                ordered_ids.append(anchor["id"])
    anchor_list = pick_callout_anchors(ordered_ids, images, anchors, (inset_w, inset_h))
    points = []
    main_anchors_by_id = {anchor["id"]: anchor for anchor in visible_anchors(anchors[source_dim], source)}
    for anchor in anchor_list:
        main_anchor = main_anchors_by_id.get(anchor["id"])
        points.append((main_anchor or anchor)["_point"])
    main_crop = fit_crop_to_aspect(union_crop(points, source.size, margin=540), source.size, 1.62)
    height = 3300 if len(anchor_list) > 4 else 2920
    canvas = Image.new("RGB", (CALLOUT_WIDTH, height), BG)
    draw = ImageDraw.Draw(canvas)
    draw.text((70, 58), f"{label.upper()} — CALLOUT PLATE", fill=INK, font=FONT_TITLE)
    main_x, main_y, main_w, main_h = 910, 360, 2900, 1788
    main = cover_resize(source.crop(main_crop), (main_w, main_h))
    canvas.paste(main, (main_x, main_y))
    draw.rectangle((main_x, main_y, main_x + main_w, main_y + main_h), outline=HAIRLINE, width=3)
    left_x, right_x = 94, CALLOUT_WIDTH - 94 - inset_w
    rows = [360, 945, 1530] if len(anchor_list) > 4 else [430, 1090, 0]
    letters = "ABCDEF"
    keys = []
    crop_l, crop_t, crop_r, crop_b = main_crop
    sx = main_w / max(1, crop_r - crop_l)
    sy = main_h / max(1, crop_b - crop_t)
    anchor_rows = []
    for anchor in anchor_list:
        main_anchor = main_anchors_by_id.get(anchor["id"], anchor)
        anchor_rows.append({
            "anchor": anchor,
            "main_anchor": main_anchor,
            "ax": main_x + (main_anchor["_point"][0] - crop_l) * sx,
            "ay": main_y + (main_anchor["_point"][1] - crop_t) * sy,
        })
    sorted_rows = sorted(anchor_rows, key=lambda item: item["ax"])
    left_count = min(3, math.ceil(len(sorted_rows) / 2))
    left_rows = sorted(sorted_rows[:left_count], key=lambda item: item["ay"])
    right_rows = sorted(sorted_rows[left_count:], key=lambda item: item["ay"])
    layout_rows = [(item, True, index) for index, item in enumerate(left_rows)] + [(item, False, index) for index, item in enumerate(right_rows)]
    letter_by_id = {anchor["id"]: letters[index] for index, anchor in enumerate(anchor_list)}
    for item, side_left, row in layout_rows:
        anchor = item["anchor"]
        x = left_x if side_left else right_x
        y = rows[row]
        letter = letter_by_id[anchor["id"]]
        inset_source = anchor["_crop"]
        inset = inset_source.resize((inset_w, inset_h), Image.Resampling.LANCZOS)
        rounded_paste(canvas, inset, (x, y))
        draw.rounded_rectangle((x, y, x + inset_w, y + inset_h), radius=38, outline=HAIRLINE, width=3)
        draw_letter_badge(draw, (x + 55, y + 55), letter)
        ax = item["ax"]
        ay = item["ay"]
        target_x = x + (inset_w if side_left else 0)
        target_y = y + inset_h / 2
        draw.line((ax, ay, target_x, target_y), fill=CYAN, width=3)
        draw.ellipse((ax - 10, ay - 10, ax + 10, ay + 10), fill=CYAN)
        draw_letter_badge(draw, (ax + (42 if side_left else -42), ay - 34), letter, radius=28)
        keys.append({"letter": letter, "id": anchor["id"], "label": anchor["label"], "caption": anchor["caption"], "source_dim": anchor["_source_dim"], "score": anchor["_score"]})
    key_y = main_y + main_h + 125
    draw.line((70, key_y - 40, CALLOUT_WIDTH - 70, key_y - 40), fill=(194, 184, 160), width=2)
    keys.sort(key=lambda item: item["letter"])
    col_w = (CALLOUT_WIDTH - 180) // 3
    for index, item in enumerate(keys):
        x = 90 + (index % 3) * col_w
        y = key_y + (index // 3) * 235
        draw.text((x, y), f"{item['letter']}  {item['label'].upper()}", fill=INK, font=FONT_KEY_BOLD)
        for line_index, line in enumerate(wrap(item["caption"], 30)):
            draw.text((x, y + 58 + line_index * 50), line, fill=MUTED, font=FONT_KEY)
    canvas.save(out)
    return {
        "file": out.relative_to(ATLAS).as_posix(),
        "caption": f"Figure for {label}: magnified anchor details with leader lines and key.",
        "keys": keys,
        "main_crop": main_crop,
    }


def load_level(input_dir: Path, stem: str) -> tuple[str, str, dict[str, Image.Image], dict[str, dict]]:
    match = re.match(r"^\d+-(.+)$", stem)
    level = match.group(1) if match else stem
    images: dict[str, Image.Image] = {}
    anchors: dict[str, dict] = {}
    label = level
    for dim in ("4d", "8d", "11d"):
        path = input_dir / f"{stem}--{dim}.png"
        anchors_path = input_dir / f"{stem}--{dim}.anchors.json"
        images[dim] = print_tone(Image.open(path))
        anchors[dim] = load_anchor(anchors_path)
        label = anchors[dim].get("label") or label
    return level, label, images, anchors


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=DEFAULT_IN)
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    stems = sorted(path.name.removesuffix("--4d.png") for path in args.input.glob("*--4d.png"))
    if not stems:
        raise SystemExit(f"no atlas captures found in {args.input}")
    manifest: dict[str, dict] = {"generated_from": args.input.relative_to(ATLAS).as_posix(), "levels": {}}
    for stem in stems:
        level, label, images, anchors = load_level(args.input, stem)
        triptych = args.out / f"{level}-triptych.png"
        callouts = args.out / f"{level}-callouts.png"
        manifest["levels"][level] = {
            "label": label,
            "triptych": compose_triptych(level, label, images, anchors, triptych),
            "callouts": compose_callouts(level, label, images, anchors, callouts),
        }
        print(f"plate {level}: {triptych.name}, {callouts.name}")
        for image in images.values():
            image.close()
    (args.out / "plates.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {args.out / 'plates.json'}")


if __name__ == "__main__":
    main()
