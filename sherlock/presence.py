"""The programme's presence (ISS-109): do the places link to each other as they should?

    python sherlock/presence.py        # writes bld/sherlock/presence.md; exit 1 on a broken link

Reads registry/presence.yaml. For each place with a file: every place in `links_to` must be
linked (its URL, or a path to it) in that file, or it fails; every place in `should_link_to`
not yet linked is reported as a gap (not a failure). The attribution and the licence holder are
checked against registry/licences.yaml. No network: URLs are not fetched.

QR codes (`qr_codes:`): each image is decoded (OpenCV, normal and inverted) and must carry its
place's URL exactly, so a change of the web address cannot silently orphan a sticker or a
booklet. A code marked `printed` is already out in the world: its URL must keep working for good
(a redirect if the address ever moves). Without OpenCV the decode is reported as a gap.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "presence.md"


def linked(text: str, place: dict) -> bool:
    url = place.get("url", "").rstrip("/")
    bare = re.sub(r"^https?://(www\.)?", "", url)
    if bare and bare in text:
        return True
    # a relative link to the app from the web page
    return place.get("title") == "The Soma Machine" and re.search(r'href="\.?/?app/?"', text) is not None


def norm_url(u: str) -> str:
    return re.sub(r"^https?://(www\.)?", "", str(u or "")).rstrip("/").lower()


def decode_qr(path: Path) -> str | None:
    try:
        import cv2
    except ImportError:
        return None
    img = cv2.imread(str(path))
    if img is None:
        return ""
    det = cv2.QRCodeDetector()
    for im, pad in ((img, (255, 255, 255)), (255 - img, (0, 0, 0))):
        for s in (1, 2):
            x = cv2.resize(im, None, fx=s, fy=s, interpolation=cv2.INTER_NEAREST) if s > 1 else im
            v, _, _ = det.detectAndDecode(cv2.copyMakeBorder(x, 40, 40, 40, 40, cv2.BORDER_CONSTANT, value=pad))
            if v:
                return v
    return ""


def main() -> int:
    reg = yaml.safe_load((U / "registry" / "presence.yaml").read_text(encoding="utf-8"))
    lic = yaml.safe_load((U / "registry" / "licences.yaml").read_text(encoding="utf-8"))
    places = reg["places"]
    fails, gaps, ok = [], [], []
    if not str(lic.get("holder", "")).startswith(reg["holder"]):
        fails.append(f"holder: presence says {reg['holder']!r}, licences say {lic.get('holder')!r}")
    for pid, p in places.items():
        f = p.get("file")
        if not f:
            continue
        path = (U / f).resolve()
        if not path.exists():
            gaps.append(f"{pid}: its file {f} is not here (another repository not checked out?)")
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for want in p.get("links_to", []):
            (ok if linked(text, places[want]) else fails).append(f"{pid} -> {want}" + ("" if linked(text, places[want]) else f": no link to {places[want].get('url')} in {f}"))
        for want in p.get("should_link_to", []):
            if not linked(text, places[want]):
                gaps.append(f"{pid} -> {want}: not linked yet ({places[want]['title']})")
            else:
                ok.append(f"{pid} -> {want}")
    printed = []
    for q in reg.get("qr_codes", []):
        f, want = q["file"], places.get(q["place"], {}).get("url", "")
        path = (U / f).resolve()
        if not path.exists():
            gaps.append(f"QR {f}: not here (another repository not checked out?)")
            continue
        got = decode_qr(path)
        if got is None:
            gaps.append(f"QR {f}: not decoded (pip install opencv-python-headless)")
        elif norm_url(got) != norm_url(want):
            fails.append(f"QR {f}: carries {got or 'nothing readable'}, its place {q['place']} is {want}")
        else:
            ok.append(f"QR {f} -> {q['place']} ({got})")
            if q.get("printed"):
                printed.append(f"{got} ({f}): printed, so it must keep working for good")
    def cand(v):
        return "; ".join(f"{k}: {', '.join(map(str, x))}" for k, x in v.items()) if isinstance(v, dict) else ", ".join(map(str, v))
    out = ["# The programme's presence (ISS-109)", "", f"Attribution: {reg['attribution']}", "",
           f"## Failures ({len(fails)})", "", *([f"- {x}" for x in fails] or ["- none"]), "",
           f"## Gaps ({len(gaps)})", "", *([f"- {x}" for x in gaps] or ["- none"]), "",
           f"## Linked ({len(ok)})", "", *[f"- {x}" for x in ok], "",
           "## Printed codes (their URLs must never break)", "", *([f"- {x}" for x in printed] or ["- none"]), "",
           "## Not claimed yet (the author decides)", "",
           *[f"- {k}: {cand(v)}" for k, v in reg.get("candidates", {}).items() if k != "checked"], ""]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(out), encoding="utf-8")
    print(f"bld/sherlock/presence.md: {len(ok)} linked, {len(gaps)} gaps, {len(fails)} failures")
    for x in fails:
        print(f"  FAIL {x}")
    for x in gaps:
        print(f"  gap  {x}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
