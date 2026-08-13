#!/usr/bin/env python3
"""
sync_dist.py — Sync built PDFs from U repo into the sibling Dist repo.

Run after any paper/omnibus/fractal rebuild to keep Dist current.
Expects ITI-Theory/U and ITI-Theory/Dist to sit side-by-side.

Usage (from anywhere):
    python U/paper/scripts/sync_dist.py           # sync all
    python U/paper/scripts/sync_dist.py --papers  # papers/ only
    python U/paper/scripts/sync_dist.py --nlm     # nlm-min and nlm-max only
    python U/paper/scripts/sync_dist.py --lulu    # lulu/ only
    python U/paper/scripts/sync_dist.py --stuff   # stuff/ only
    python U/paper/scripts/sync_dist.py --zenodo  # zenodo/ staging only
"""

import argparse
import shutil
from pathlib import Path

# ── paths ────────────────────────────────────────────────────────────────────
SCRIPTS = Path(__file__).parent          # U/paper/scripts/
U_ROOT  = SCRIPTS.parent.parent          # U/
DIST    = U_ROOT.parent / "Dist"         # ITI-Theory/Dist/
PAPER   = U_ROOT / "paper" / "bld"
FRAC    = U_ROOT / "Part2" / "fractal-programme" / "bld"

def cp(src: Path, dst: Path):
    if not src.exists():
        print(f"  SKIP (missing): {src.name}")
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  {src.name} → {dst.relative_to(DIST)}")

# ── paper catalogue ───────────────────────────────────────────────────────────
PAPER_FILES = [
    ("soma-field-paper.pdf",                  "soma-field-paper.pdf"),
    ("quantum-soma-penrose.pdf",               "quantum-soma-penrose.pdf"),
    ("mathematical-co-identification.pdf",     "mathematical-co-identification.pdf"),
    ("soma-field-synthesis.pdf",               "soma-field-synthesis.pdf"),
    ("soma-physical-substrate.pdf",            "soma-physical-substrate.pdf"),
    ("soma-field-book.pdf",                    "soma-field-book.pdf"),
    ("soma-field-patient-pov.pdf",             "soma-field-patient-pov.pdf"),
    ("the-tensor.pdf",                         "the-tensor.pdf"),
    ("music-affect-dynamics.pdf",              "music-affect-dynamics.pdf"),
    ("soma-temporal-dynamics.pdf",             "soma-temporal-dynamics.pdf"),
    ("zoomable-somatic-field.pdf",             "zoomable-somatic-field.pdf"),
    ("experimental-validation.pdf",            "experimental-validation.pdf"),
    ("missing-limbic-layer.pdf",               "missing-limbic-layer.pdf"),
    ("usf-euclidean-qft.pdf",                  "P14-usf-euclidean-qft.pdf"),
    ("usf-interacting-qft.pdf",                "P15-usf-interacting-qft.pdf"),
    ("geographic-somatic-field.pdf",           "geographic-somatic-field.pdf"),
    ("gestalt-field-dynamics.pdf",             "gestalt-field-dynamics.pdf"),
    ("preverbal-manifold.pdf",                 "preverbal-manifold.pdf"),
    ("swarm-propagator.pdf",                   "swarm-propagator.pdf"),
    ("universal-somatic-field.pdf",            "universal-somatic-field.pdf"),
    ("cosmological-constant-derivation.pdf",   "cosmological-constant-derivation.pdf"),
    ("dark-matter-spatial-vacuum.pdf",         "dark-matter-spatial-vacuum.pdf"),
    ("g2-symmetry-breaking.pdf",               "g2-symmetry-breaking.pdf"),
    ("ttheory-phenomena.pdf",                  "ttheory-phenomena.pdf"),
    ("lean-proofs-appendix.pdf",               "lean-proofs-appendix.pdf"),
    ("ttheory-cheatsheet.pdf",                 "ttheory-cheatsheet.pdf"),
    ("omnibus-a4.pdf",                         "omnibus-a4.pdf"),
]

FRAC_FILES = [
    ("ttheory-omnibus.pdf",   "ttheory-omnibus.pdf"),
    ("ttheory-vol1.pdf",      "ttheory-vol1-foundation.pdf"),
    ("ttheory-vol2.pdf",      "ttheory-vol2-application.pdf"),
]

NLM_MIN = [
    ("omnibus-a4.pdf",      "01-omnibus-v2.pdf"),
    ("ttheory-omnibus.pdf", "02-ttheory-fractal-programme.pdf"),
]

NLM_MAX_FROM_PAPERS = [
    ("omnibus-a4.pdf",                    "01-omnibus-v2.pdf"),
    ("ttheory-omnibus.pdf",               "02-fractal-programme.pdf"),
    ("ttheory-vol1-foundation.pdf",       "03-fractal-vol1-foundation.pdf"),
    ("ttheory-vol2-application.pdf",      "04-fractal-vol2-application.pdf"),
    ("lean-proofs-appendix.pdf",          "05-lean-proofs-appendix.pdf"),
    ("soma-field-paper.pdf",              "P01-soma-field.pdf"),
    ("quantum-soma-penrose.pdf",          "P02-quantum-penrose.pdf"),
    ("mathematical-co-identification.pdf","P03-mathematical-co-identification.pdf"),
    ("soma-field-synthesis.pdf",          "P04-synthesis.pdf"),
    ("soma-physical-substrate.pdf",       "P05-physical-substrate.pdf"),
    ("soma-field-book.pdf",               "P06-field-book.pdf"),
    ("soma-field-patient-pov.pdf",        "P07-patient-pov.pdf"),
    ("the-tensor.pdf",                    "P08-the-tensor.pdf"),
    ("music-affect-dynamics.pdf",         "P09-music-affect.pdf"),
    ("soma-temporal-dynamics.pdf",        "P10-temporal-dynamics.pdf"),
    ("zoomable-somatic-field.pdf",        "P11-zoomable-field.pdf"),
    ("experimental-validation.pdf",       "P12-experimental-validation.pdf"),
    ("missing-limbic-layer.pdf",          "P13-missing-limbic-layer.pdf"),
    ("P14-usf-euclidean-qft.pdf",         "P14-euclidean-qft.pdf"),
    ("P15-usf-interacting-qft.pdf",       "P15-interacting-qft.pdf"),
    ("geographic-somatic-field.pdf",      "P16-geographic-field.pdf"),
    ("gestalt-field-dynamics.pdf",        "P17-gestalt-dynamics.pdf"),
    ("preverbal-manifold.pdf",            "P18-preverbal-manifold.pdf"),
    ("swarm-propagator.pdf",              "P19-swarm-propagator.pdf"),
    ("universal-somatic-field.pdf",       "P20-universal-somatic-field.pdf"),
    ("cosmological-constant-derivation.pdf", "P21-cosmological-constant.pdf"),
    ("dark-matter-spatial-vacuum.pdf",    "P22-dark-matter-spatial-vacuum.pdf"),
    ("ttheory-phenomena.pdf",             "P23-ttheory-phenomena.pdf"),
    ("g2-symmetry-breaking.pdf",          "P24-g2-symmetry-breaking.pdf"),
    ("ttheory-cheatsheet.pdf",            "cheatsheet.pdf"),
]

# ── sync functions ────────────────────────────────────────────────────────────

def sync_papers():
    print("── papers/ ──────────────────────────")
    for src_name, dst_name in PAPER_FILES:
        cp(PAPER / src_name, DIST / "papers" / dst_name)
    for src_name, dst_name in FRAC_FILES:
        cp(FRAC / src_name, DIST / "papers" / dst_name)

def sync_nlm():
    print("── nlm-min/ ─────────────────────────")
    for src_name, dst_name in NLM_MIN:
        src = PAPER / src_name if src_name == "omnibus-a4.pdf" else FRAC / src_name
        cp(src, DIST / "nlm-min" / dst_name)
    print("── nlm-max/ ─────────────────────────")
    for src_name, dst_name in NLM_MAX_FROM_PAPERS:
        cp(DIST / "papers" / src_name, DIST / "nlm-max" / dst_name)
    cp(DIST / "PROMPTS.md", DIST / "nlm-max" / "PROMPTS.md")

def sync_lulu():
    print("── lulu/ ────────────────────────────")
    cp(PAPER / "omnibus-a4.pdf",   DIST / "lulu" / "01-omnibus-v2.pdf")
    cp(FRAC  / "ttheory-vol1.pdf", DIST / "lulu" / "03-ttheory-vol1-foundation.pdf")
    cp(FRAC  / "ttheory-vol2.pdf", DIST / "lulu" / "04-ttheory-vol2-application.pdf")

def sync_stuff():
    print("── stuff/ ────────────────────────────")
    cp(PAPER / "ttheory-cheatsheet.pdf", DIST / "stuff" / "ttheory-cheatsheet.pdf")

def sync_zenodo():
    print("── zenodo/ ──────────────────────────")
    cp(FRAC / "ttheory-omnibus.pdf", DIST / "zenodo" / "C2-ttheory-fractal-programme.pdf")

# ── main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync built PDFs into Dist subdirs.")
    parser.add_argument("--papers",  action="store_true")
    parser.add_argument("--nlm",     action="store_true")
    parser.add_argument("--lulu",    action="store_true")
    parser.add_argument("--stuff",   action="store_true")
    parser.add_argument("--zenodo",  action="store_true")
    args = parser.parse_args()

    if not any(vars(args).values()):
        sync_papers(); sync_nlm(); sync_lulu(); sync_stuff(); sync_zenodo()
    else:
        if args.papers:  sync_papers()
        if args.nlm:     sync_nlm()
        if args.lulu:    sync_lulu()
        if args.stuff:   sync_stuff()
        if args.zenodo:  sync_zenodo()

    print("\nDone. Run: cd Dist && git add -A && git commit -m 'dist: sync' && git push")
