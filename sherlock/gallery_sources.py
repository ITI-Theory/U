"""gallery_sources.py: every picture in A Gallery of Thoughts is the programme's own (ISS-097,
"Sources and licences": the author's avant-garde collection is inspiration only, its works are
others' copyright).

A plate's (or the cover's) `src` in registry/gallery.yaml must be one of:
  - a file under Part2/book/field-atlas/figures/app/ (the Atlas's captures of the app), present;
  - hires:<id>, a capture the gallery itself makes of the app (registry `captures`; a burst's
    frames are <id>-1 ... <id>-n);
  - snap:<name>, a somagram taken with SNAP in the app.
Anything else (another folder, a URL, a download) fails: it may be someone else's picture.

    python sherlock/gallery_sources.py     # exit 1 on a source that is not the programme's own
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OWN = "Part2/book/field-atlas/figures/app/"


def sources(node, where="gallery"):
    if isinstance(node, dict):
        if "src" in node:
            yield node.get("id", where), str(node["src"])
        for k, v in node.items():
            yield from sources(v, node.get("id", k) if isinstance(k, str) else where)
    elif isinstance(node, list):
        for v in node:
            yield from sources(v, where)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    reg = yaml.safe_load((U / "registry" / "gallery.yaml").read_text(encoding="utf-8")) or {}
    captures = reg.get("captures") or {}
    items = captures.values() if isinstance(captures, dict) else captures
    capture_ids = set()
    for c in items:
        if isinstance(c, dict) and c.get("id"):
            capture_ids.add(c["id"])
            # a burst of frames: <id>-1 ... <id>-n
            capture_ids.update(f"{c['id']}-{k}" for k in range(1, len(c.get("frames") or []) + 1))
    bad, seen = [], 0
    for pid, src in sources(reg):
        seen += 1
        if src.startswith("hires:"):
            if src[6:] not in capture_ids:
                bad.append(f"{pid}: {src} is not one of the gallery's captures")
        elif src.startswith("snap:"):
            continue
        elif src.startswith(OWN):
            if not (U / src).exists():
                bad.append(f"{pid}: {src} is missing")
        else:
            bad.append(f"{pid}: {src} is not the programme's own (an app capture, hires: or snap:)")
    print(f"gallery sources: {seen} pictures, {seen - len(bad)} the programme's own, {len(bad)} not")
    for b in bad:
        print(f"  FAIL {b}")
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
