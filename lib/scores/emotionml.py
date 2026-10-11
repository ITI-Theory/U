"""EmotionML export of the emotional scores (registry/scores, The Tensor; ISS-054).

Each score becomes one W3C EmotionML 1.0 document: the score's modes are an
inline dimension vocabulary, and each mode's keyframes are a <trace> sampled
at story-time steps over the film's length (minutes at kappa_v = 1). Coupling,
thresholds, phases and the kappa defaults stay in the native YAML; <info>
points back to it. The output is data for other tools, not a document build.

    python lib/scores/emotionml.py            # all scores -> bld/scores/<id>.emotionml
    python lib/scores/emotionml.py --check F  # check an existing file only
"""
from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[2]
SCORES = U / "registry" / "scores"
OUT = U / "bld" / "scores"
NS = "http://www.w3.org/2009/10/emotionml"
TNS = "https://t-theory.org/ns/tensor"
FREQ = re.compile(r"^[0-9]*\.?[0-9]+(e-?[0-9]+)?Hz$")


def uniform_samples(keyframes: list, n_modes: int) -> tuple[float, list[list[float]]]:
    """The keyframes as samples on a uniform story-time grid (step, per-mode values).

    Keyframes already on one step are used as they are; otherwise they are
    linearly interpolated (the score's own reading) onto the smallest step."""
    ts = [float(t) for t, _ in keyframes]
    steps = [round(b - a, 9) for a, b in zip(ts, ts[1:])]
    step = min(steps)
    if any(abs(s - step) > 1e-9 for s in steps):
        grid = [round(ts[0] + i * step, 9) for i in range(int(round((ts[-1] - ts[0]) / step)) + 1)]
    else:
        grid = ts
    out = [[] for _ in range(n_modes)]
    for t in grid:
        j = max(i for i, k in enumerate(ts) if k <= t + 1e-12)
        if j == len(ts) - 1:
            vals = keyframes[j][1]
        else:
            s = (t - ts[j]) / (ts[j + 1] - ts[j])
            vals = [a * (1 - s) + b * s for a, b in zip(keyframes[j][1], keyframes[j + 1][1])]
        for m, v in enumerate(vals):
            out[m].append(round(float(v), 4))
    return step, out


def mode_name(mode: dict) -> str:
    return re.sub(r"[^a-z0-9-]+", "-", mode["name"].lower()).strip("-")


def to_emotionml(score: dict, source: str) -> ET.ElementTree:
    ET.register_namespace("", NS)
    ET.register_namespace("tensor", TNS)
    q = lambda tag: f"{{{NS}}}{tag}"
    modes = score["modes"]
    step, samples = uniform_samples(score["keyframes"], len(modes))
    duration_s = float(score["minutes"]) * 60
    freq = 1 / (step * duration_s)

    root = ET.Element(q("emotionml"), {"version": "1.0"})
    info = ET.SubElement(root, q("info"))
    ET.SubElement(info, f"{{{TNS}}}score", {
        "id": score["id"], "title": score["title"], "version": str(score.get("version", "")),
        "source": source, "paper": score.get("source", ""),
        "note": "The score is what the film proposes, not what a viewer feels. "
                "Story-time 0..1 is mapped onto the film's length at kappa_v = 1; "
                "coupling, thresholds, phases and kappa defaults are in the source YAML.",
    })
    vocab_id = f"{score['id']}-modes"
    vocab = ET.SubElement(root, q("vocabulary"), {"type": "dimension", "id": vocab_id})
    for mode in modes:
        item = ET.SubElement(vocab, q("item"), {"name": mode_name(mode)})
        ET.SubElement(ET.SubElement(item, q("info")), f"{{{TNS}}}mode", {"symbol": mode["id"], "name": mode["name"]})
    emotion = ET.SubElement(root, q("emotion"), {
        "id": score["id"], "dimension-set": f"#{vocab_id}",
        "start": "0", "duration": str(int(round(duration_s * 1000))),
    })
    for mode, vals in zip(modes, samples):
        dim = ET.SubElement(emotion, q("dimension"), {"name": mode_name(mode)})
        ET.SubElement(dim, q("trace"), {"freq": f"{freq:.9g}Hz", "samples": " ".join(f"{v:g}" for v in vals)})
    ET.indent(root, space="  ")
    return ET.ElementTree(root)


def check(path: Path) -> list[str]:
    """The EmotionML 1.0 rules this export relies on; returns the problems found."""
    q = lambda tag: f"{{{NS}}}{tag}"
    root = ET.parse(path).getroot()
    errs = []
    if root.tag != q("emotionml") or root.get("version") != "1.0":
        errs.append("root must be emotionml version 1.0 in the EmotionML namespace")
    vocabs = {v.get("id"): v for v in root.iter(q("vocabulary"))}
    for v in vocabs.values():
        if v.get("type") not in {"category", "dimension", "appraisal", "action-tendency"}:
            errs.append(f"vocabulary {v.get('id')}: bad type {v.get('type')}")
    for e in root.iter(q("emotion")):
        ref = e.get("dimension-set") or root.get("dimension-set")
        dims = list(e.iter(q("dimension")))
        if not dims:
            errs.append(f"emotion {e.get('id')}: no descriptor")
        if dims:
            if not ref or not ref.startswith("#") or ref[1:] not in vocabs:
                errs.append(f"emotion {e.get('id')}: dimension-set {ref} does not resolve to a vocabulary in this file")
                continue
            vocab = vocabs[ref[1:]]
            if vocab.get("type") != "dimension":
                errs.append(f"emotion {e.get('id')}: dimension-set {ref} is not a dimension vocabulary")
            names = {i.get("name") for i in vocab.iter(q("item"))}
            seen = set()
            for d in dims:
                n = d.get("name")
                if n not in names:
                    errs.append(f"dimension {n}: not in {ref}")
                if n in seen:
                    errs.append(f"dimension {n}: given twice")
                seen.add(n)
                traces = d.findall(q("trace"))
                if (d.get("value") is None) == (len(traces) != 1):
                    errs.append(f"dimension {n}: needs exactly one of value or trace")
                for t in traces:
                    if not FREQ.match(t.get("freq", "")):
                        errs.append(f"dimension {n}: trace freq {t.get('freq')} is not a number followed by Hz")
                    vals = [float(x) for x in t.get("samples", "").split()]
                    if not vals or not all(0 <= x <= 1 for x in vals):
                        errs.append(f"dimension {n}: trace samples empty or outside [0, 1]")
        for attr in ("start", "duration"):
            if e.get(attr) is not None and not e.get(attr).isdigit():
                errs.append(f"emotion {e.get('id')}: {attr} must be a non-negative integer (ms)")
    return errs


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--check", type=Path, help="check an existing EmotionML file only")
    args = ap.parse_args()
    if args.check:
        errs = check(args.check)
        print("\n".join(errs) or f"OK {args.check}")
        return 1 if errs else 0
    OUT.mkdir(parents=True, exist_ok=True)
    failed = 0
    for src in sorted(SCORES.glob("*.yaml")):
        score = yaml.safe_load(src.read_text(encoding="utf-8"))
        out = OUT / f"{score['id']}.emotionml"
        to_emotionml(score, src.relative_to(U).as_posix()).write(out, encoding="utf-8", xml_declaration=True)
        errs = check(out)
        failed += bool(errs)
        print("\n".join(f"{out.name}: {e}" for e in errs) or f"{out.relative_to(U).as_posix()}: {len(score['modes'])} modes, EmotionML 1.0 OK")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
