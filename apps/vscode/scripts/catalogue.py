#!/usr/bin/env python3
"""USF in the extension (ISS-132): the papers, datasets and books of Dist/PAPERS.yaml as media/catalogue.json.

Run by `npm run package` (and `npm run catalogue`); data only, the extension lays it out in a quick pick.
"""
import json
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
DIST = HERE.parents[3] / "Dist" / "PAPERS.yaml"
OUT = HERE.parent / "media" / "catalogue.json"
KINDS = (("canonical_papers", "paper"), ("datasets", "dataset"), ("collections", "book"))


def main() -> int:
    reg = yaml.safe_load(DIST.read_text(encoding="utf-8"))
    items = []
    for key, kind in KINDS:
        for x in reg.get(key) or []:
            items.append({"id": x["id"], "kind": kind, "title": " ".join(str(x.get("title", "")).split()),
                          "discipline": x.get("discipline", ""), "doi": x.get("doi") or "",
                          "status": x.get("status", ""), "file": x.get("file", "")})
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"source": "Dist/PAPERS.yaml", "items": items}, ensure_ascii=False, indent=1) + "\n",
                   encoding="utf-8", newline="\n")
    print(f"catalogue: {len(items)} items, {sum(1 for i in items if i['doi'])} with a DOI -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
