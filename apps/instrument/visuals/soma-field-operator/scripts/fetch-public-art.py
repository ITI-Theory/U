"""Public-domain avant-garde art for the visual thoughts (ISS-077, the public tier).

    python scripts/fetch-public-art.py      # -> public/art/*.jpg, public/art/manifest.json

Only works in the public domain (Kandinsky d. 1944, Klee d. 1940: more than 70 years
after death in Switzerland and the EU), and only from museum open-access files marked
CC0, never scans from books (a book's photographs and layout have rights of their own).
Each is credited in public/art/manifest.json and in CREDITS.md. The list is fixed, so
the folder is reproducible; the images are committed (small, CC0).
"""
from __future__ import annotations

import io
import json
import urllib.request
from pathlib import Path

from PIL import Image

APP = Path(__file__).resolve().parents[1]
OUT = APP / "public" / "art"
UA = {"User-Agent": "soma-machine (ITI-Theory; alistair.johnson@johnsonusm.com)",
      "AIC-User-Agent": "soma-machine (ITI-Theory; alistair.johnson@johnsonusm.com)"}

# (museum, object id): the Art Institute of Chicago (CC0 for public-domain works) and the
# Cleveland Museum of Art (share_license_status CC0)
WORKS = [("aic", 8991), ("aic", 8980), ("aic", 8987), ("aic", 8983), ("aic", 129849), ("aic", 150806),
         ("cma", 137078), ("cma", 151945), ("cma", 136592), ("cma", 144705), ("cma", 149352), ("cma", 156571)]


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()


def aic(oid: int) -> dict:
    a = json.loads(get(f"https://api.artic.edu/api/v1/artworks/{oid}?fields=id,title,artist_title,date_display,"
                       "image_id,is_public_domain,credit_line"))["data"]
    assert a["is_public_domain"], f"AIC {oid} is not public domain"
    return {"artist": a["artist_title"], "title": a["title"], "date": a["date_display"],
            "museum": "Art Institute of Chicago", "licence": "CC0",
            "url": f"https://www.artic.edu/artworks/{oid}", "credit": a.get("credit_line") or "",
            "image": f"https://www.artic.edu/iiif/2/{a['image_id']}/full/843,/0/default.jpg"}


def cma(oid: int) -> dict:
    a = json.loads(get(f"https://openaccess-api.clevelandart.org/api/artworks/{oid}"))["data"]
    assert a["share_license_status"] == "CC0", f"CMA {oid} is not CC0"
    who = a["creators"][0]["description"].split(" (")[0]
    return {"artist": who, "title": a["title"], "date": a.get("creation_date") or "",
            "museum": "Cleveland Museum of Art", "licence": "CC0", "url": a["url"],
            "credit": a.get("credit_line") or "", "image": a["images"]["web"]["url"]}


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for museum, oid in WORKS:
        w = (aic if museum == "aic" else cma)(oid)
        name = f"{museum}-{oid}.jpg"
        img = Image.open(io.BytesIO(get(w.pop("image")))).convert("RGB")
        img.thumbnail((900, 900))
        img.save(OUT / name, "JPEG", quality=84, optimize=True)
        manifest.append({"src": f"art/{name}", **w})
        print(f"{name}: {w['artist']}, {w['title']} ({w['date']})")
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n",
                                       encoding="utf-8", newline="\n")
    print(f"public/art: {len(manifest)} works")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
