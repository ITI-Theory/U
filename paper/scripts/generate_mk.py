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

def src_of(e, file_key="bld_file"):
    bld = SRCS.get(e.get("build", "paper"), "$(PAPER)")
    if e.get(file_key):
        filename = e[file_key]
    elif e.get("build") == "fractal" and e.get("slug", "").startswith("ttheory-book-"):
        filename = f"book-{e['slug'].removeprefix('ttheory-book-')}.pdf"
    else:
        filename = e["slug"] + ".pdf"
    return f"{bld}/{filename}"


def is_distributable(entry):
    return entry.get("distribution", True) and entry.get("build") != "manual" and entry.get("file")

def build_targets(entry):
    targets = entry.get("make_targets")
    if targets:
        return targets
    if entry.get("make_alias"):
        return [entry["make_alias"]]
    if entry.get("build") == "fractal" and entry.get("slug", "").startswith("ttheory-book-"):
        return [f"book-{entry['slug'].removeprefix('ttheory-book-')}"]
    return []

paper_targets = []
paper_royal_targets = []
fractal_targets = []
fractal_prerequisites = []
for entry in entries:
    if entry.get("build") == "manual":
        continue
    targets = build_targets(entry)
    if entry.get("build", "paper") == "fractal":
        fractal_targets.extend(targets)
        fractal_prerequisites.extend(entry.get("make_prerequisites", []))
    else:
        paper_targets.extend(targets)
        paper_royal_targets.extend(entry.get("make_targets_royal", []))

paper_targets = list(dict.fromkeys(paper_targets))
paper_royal_targets = list(dict.fromkeys(paper_royal_targets))
fractal_targets = list(dict.fromkeys(fractal_targets))
fractal_prerequisites = list(dict.fromkeys(fractal_prerequisites))

lines = [
    "# dist.mk -- distribution copy rules",
    "# GENERATED from Dist/PAPERS.yaml by paper/scripts/generate_mk.py",
    "# DO NOT EDIT -- run: make generate",
    "",
    "# Candidate build inputs adopted from PAPERS.yaml at generation time.",
    f"REGISTRY_PAPER_TARGETS := {' '.join(paper_targets)}",
    f"REGISTRY_PAPER_ROYAL_TARGETS := {' '.join(paper_royal_targets)}",
    f"REGISTRY_FRACTAL_PREREQUISITES := {' '.join(fractal_prerequisites)}",
    f"REGISTRY_FRACTAL_TARGETS := {' '.join(fractal_targets)}",
    "",
    ".PHONY: papers papers-royal ttheory zenodo zenodo-papers zenodo-ttheory nlm nlm-papers nlm-ttheory lulu stuff dist",
    "",
]

# Papers and [T]-Theory distribution: ------------------------------------
lines += ["papers: registry-papers"]
for e in entries:
    if not is_distributable(e) or e.get("build") == "fractal":
        continue
    dst = f"{DIST}/{e['file']}"
    lines.append(cp(src_of(e), dst))
lines.append("")

lines += ["papers-royal: registry-papers-royal"]
for e in entries:
    if not is_distributable(e) or e.get("build") == "fractal" or not e.get("file_royal"):
        continue
    lines.append(cp(src_of(e, "bld_file_royal"), f"{DIST}/{e['file_royal']}"))
lines.append("")

lines += ["ttheory: registry-fractal"]
for e in entries:
    if not is_distributable(e) or e.get("build") != "fractal":
        continue
    lines.append(cp(src_of(e), f"{DIST}/{e['file']}"))
lines.append("")

# zenodo: ----------------------------------------------------------------
lines += ["zenodo-papers: registry-papers"]
for e in entries:
    if e.get("build") == "fractal":
        continue
    zf = e.get("zenodo_file")
    if zf:
        lines.append(cp(src_of(e), f"{DIST}/{zf}"))
    elif e.get("make_class") and e.get("id", "").startswith("P"):
        pid = e["id"]
        lines.append(cp(src_of(e), f"{DIST}/zenodo/{pid}-{e['slug']}.pdf"))
lines.append("")

lines += ["zenodo-ttheory: registry-fractal"]
for e in entries:
    if e.get("build") != "fractal" or not e.get("zenodo_file"):
        continue
    lines.append(cp(src_of(e), f"{DIST}/{e['zenodo_file']}"))
lines.append("")

lines += ["zenodo: zenodo-papers zenodo-ttheory"]
lines.append("")

# nlm: -------------------------------------------------------------------
lines += ["nlm-papers: papers"]
for e in entries:
    if e.get("build") != "fractal" and e.get("nlm_min"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-min/{e['nlm_min']}.pdf"))
for e in entries:
    if e.get("build") != "fractal" and e.get("nlm"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-max/{e['nlm']}.pdf"))
lines.append("")

lines += ["nlm-ttheory: ttheory"]
for e in entries:
    if e.get("build") == "fractal" and e.get("nlm_min"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-min/{e['nlm_min']}.pdf"))
for e in entries:
    if e.get("build") == "fractal" and e.get("nlm"):
        src = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-max/{e['nlm']}.pdf"))
lines.append(cp(f"{DIST}/PROMPTS.md", f"{DIST}/nlm-max/PROMPTS.md"))
lines.append("")

lines += ["nlm: nlm-papers nlm-ttheory"]
lines.append("")

# lulu: ------------------------------------------------------------------
lines += ["lulu: registry-fractal"]
for e in entries:
    if e.get("lulu"):
        lines.append(cp(src_of(e), f"{DIST}/lulu/{e['lulu']}.pdf"))
lines.append("")

# stuff: -----------------------------------------------------------------
lines += ["stuff: registry-fractal"]
for e in entries:
    if e.get("stuff"):
        lines.append(cp(src_of(e), f"{DIST}/stuff/{e['stuff']}"))
lines.append("")

lines += ["dist: papers ttheory zenodo nlm lulu stuff nlm-uat", ""]

# nlm-uat: four files for NotebookLM QA comparison -----------------------
# Each entry generates two rules: copy current PDF as AFTER target.
# The BEFORE snapshot must be taken manually before a rebuild.
lines += ["nlm-uat: papers ttheory"]
for e in entries:
    if e.get("nlm_uat"):
        slug = e["nlm_uat"]
        src  = f"{DIST}/{e['file']}"
        lines.append(cp(src, f"{DIST}/nlm-uat/{slug}-AFTER.pdf"))
lines.append("")

(OUT / "dist.mk").write_text("\n".join(lines), encoding="utf-8")
n = len([e for e in entries if e.get("file")])
print(f"Generated mk/dist.mk  ({n} entries, source: {YAML.name})")
