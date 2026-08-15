#!/usr/bin/env python3
"""
generate_mk.py -- Generate U/mk/dist.mk from Dist/PAPERS.yaml.
PAPERS.yaml is the single source of truth. No hardcoded data here.
Run: make generate  (from U/ root)
"""
import yaml
from pathlib import Path

U_ROOT = Path(__file__).resolve().parent.parent.parent
YAML   = U_ROOT.parent / "Dist" / "PAPERS.yaml"
OUT    = U_ROOT / "mk"
OUT.mkdir(exist_ok=True)

SRCS = {"paper": "$(PAPER)", "fractal": "$(FRAC)"}
DIST = "$(DIST)"

data    = yaml.safe_load(YAML.read_text(encoding="utf-8"))
entries = (data.get("canonical_papers") or []) + \
          (data.get("datasets") or []) + \
          (data.get("collections") or [])

def cp(src, dst):
    return f"\tcp -f {src:<58} {dst}"

def src_of(e):
    bld = SRCS.get(e.get("build", "paper"), "$(PAPER)")
    return f"{bld}/{e['slug']}.pdf"

lines = [
    "# dist.mk -- distribution copy rules",
    "# GENERATED from Dist/PAPERS.yaml by paper/scripts/generate_mk.py",
    "# DO NOT EDIT -- run: make generate",
    "",
    ".PHONY: papers zenodo nlm lulu stuff dist",
    "",
]

# papers: ----------------------------------------------------------------
lines += ["papers: all"]
for e in entries:
    if not e.get("file"):
        continue
    dst = f"{DIST}/{e['file']}"
    lines.append(cp(src_of(e), dst))
    if e.get("file_royal"):
        lines.append(cp(src_of(e), f"{DIST}/{e['file_royal']}"))
lines.append("")

# zenodo: ----------------------------------------------------------------
lines += ["zenodo: all"]
for e in entries:
    zf = e.get("zenodo_file")
    if zf:
        lines.append(cp(src_of(e), f"{DIST}/{zf}"))
    elif e.get("make_class") and e.get("id", "").startswith("P"):
        pid = e["id"]
        lines.append(cp(src_of(e), f"{DIST}/zenodo/{pid}-{e['slug']}.pdf"))
lines.append("")

# nlm: -------------------------------------------------------------------
lines += ["nlm: papers"]
for e in entries:
    if e.get("nlm_min"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-min/{e['nlm_min']}.pdf"))
for e in entries:
    if e.get("nlm"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-max/{e['nlm']}.pdf"))
lines.append(cp(f"{DIST}/PROMPTS.md", f"{DIST}/nlm-max/PROMPTS.md"))
lines.append("")

# lulu: ------------------------------------------------------------------
lines += ["lulu: all"]
for e in entries:
    if e.get("lulu"):
        lines.append(cp(src_of(e), f"{DIST}/lulu/{e['lulu']}.pdf"))
lines.append("")

# stuff: -----------------------------------------------------------------
lines += ["stuff: all"]
for e in entries:
    if e.get("stuff"):
        lines.append(cp(src_of(e), f"{DIST}/stuff/{e['stuff']}"))
lines.append("")

lines += ["dist: papers zenodo nlm lulu stuff", ""]

(OUT / "dist.mk").write_text("\n".join(lines), encoding="utf-8")
n = len([e for e in entries if e.get("file")])
print(f"Generated mk/dist.mk  ({n} entries, source: {YAML.name})")
