#!/usr/bin/env python3
"""Build venue-specific submission bundles for Frontiers and arXiv."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
PAPER = ROOT / "paper"
DIST = ROOT / "dist"
FIGURES = PAPER / "figures"



def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()



def copy_required(src: Path, dst: Path) -> None:
    if not src.exists():
        raise FileNotFoundError(f"Required file missing: {src}")
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)



def write_manifest(staging: Path) -> None:
    manifest = {}
    for f in sorted(staging.rglob("*")):
        if f.is_file():
            rel = str(f.relative_to(staging)).replace(chr(92), "/")
            manifest[rel] = sha256(f)
    (staging / "MANIFEST.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")



def zip_staging(staging: Path, out_zip: Path) -> None:
    if out_zip.exists():
        out_zip.unlink()
    with ZipFile(out_zip, "w", compression=ZIP_DEFLATED) as zf:
        for f in staging.rglob("*"):
            if f.is_file():
                zf.write(f, arcname=f.relative_to(staging))



def generate_docx(md_path: Path, docx_path: Path) -> None:
    cmd = [
        "pandoc",
        md_path.name,
        "--bibliography",
        "bibliography.bib",
        "--citeproc",
        "-o",
        str(docx_path),
    ]
    subprocess.run(cmd, check=True, cwd=str(PAPER))



def build_frontiers(version: str, stamp: str) -> Path:
    name = f"U-submission-frontiers-{version}-{stamp}"
    staging = DIST / name
    if staging.exists():
        shutil.rmtree(staging)
    (staging / "paper").mkdir(parents=True, exist_ok=True)

    md = PAPER / "soma-field-paper.md"
    pdf = PAPER / "soma-field-paper.pdf"
    docx = PAPER / "soma-field-paper.docx"

    # Always refresh DOCX for current submission package.
    generate_docx(md, docx)

    copy_required(md, staging / "paper" / md.name)
    copy_required(pdf, staging / "paper" / pdf.name)
    copy_required(docx, staging / "paper" / docx.name)
    copy_required(PAPER / "bibliography.bib", staging / "paper" / "bibliography.bib")
    copy_required(PAPER / "apa-7th.csl", staging / "paper" / "apa-7th.csl")
    copy_required(PAPER / "SUBMISSION_FRONTIERS_CHECKLIST.md", staging / "paper" / "SUBMISSION_FRONTIERS_CHECKLIST.md")

    metadata = {
        "venue": "Frontiers in Computational Neuroscience",
        "article_type": "Hypothesis and Theory",
        "title": "The Soma-Field: A Wave-Based Model of Emotional Dynamics and Its Clinical Implications",
        "author": "Alistair Johnson",
        "orcid": "0009-0007-2194-0850",
        "affiliation": "Independent Researcher, Zurich, Switzerland",
        "ethics_statement": "No human subjects or animal experiments were conducted.",
        "conflict_of_interest": "None.",
        "data_availability": "All code and source files at https://github.com/Alistair-Johnson/U",
        "generated_at": datetime.now().isoformat(),
    }
    (staging / "paper" / "frontiers_submission_metadata.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )

    if FIGURES.exists():
        fig_out = staging / "paper" / "figures"
        fig_out.mkdir(parents=True, exist_ok=True)
        for fig in sorted(FIGURES.iterdir()):
            if fig.is_file() and fig.suffix.lower() in {".pdf", ".png", ".jpg", ".jpeg", ".tif", ".tiff"}:
                shutil.copy2(fig, fig_out / fig.name)

    readme = f"""# Frontiers Submission Bundle

Version: {version}
Generated: {datetime.now().isoformat()}

Included:
- soma-field-paper.md, soma-field-paper.pdf, soma-field-paper.docx
- bibliography.bib, apa-7th.csl
- figures/ (if found)
- SUBMISSION_FRONTIERS_CHECKLIST.md
- frontiers_submission_metadata.json
- MANIFEST.json
"""
    (staging / "README.md").write_text(readme, encoding="utf-8")

    write_manifest(staging)
    out_zip = DIST / f"{name}.zip"
    zip_staging(staging, out_zip)
    return out_zip



def build_arxiv(version: str, stamp: str) -> Path:
    name = f"U-submission-arxiv-{version}-{stamp}"
    staging = DIST / name
    if staging.exists():
        shutil.rmtree(staging)
    (staging / "paper").mkdir(parents=True, exist_ok=True)

    md = PAPER / "mathematical-co-identification.md"
    pdf = PAPER / "mathematical-co-identification.pdf"

    copy_required(md, staging / "paper" / md.name)
    copy_required(pdf, staging / "paper" / pdf.name)
    copy_required(PAPER / "bibliography.bib", staging / "paper" / "bibliography.bib")
    copy_required(PAPER / "SUBMISSION_ARXIV_CHECKLIST.md", staging / "paper" / "SUBMISSION_ARXIV_CHECKLIST.md")

    metadata = {
        "venue": "arXiv",
        "primary_category": "math-ph",
        "secondary_category": "q-bio.NC",
        "title": "Mathematical Co-identification: A Method for Structural Import Across Scientific Domains",
        "author": "Alistair Johnson",
        "orcid": "0009-0007-2194-0850",
        "comments": "Methodology paper for structural import across domains.",
        "generated_at": datetime.now().isoformat(),
    }
    (staging / "paper" / "arxiv_submission_metadata.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )

    readme = f"""# arXiv Submission Bundle

Version: {version}
Generated: {datetime.now().isoformat()}

Included:
- mathematical-co-identification.md
- mathematical-co-identification.pdf
- bibliography.bib
- SUBMISSION_ARXIV_CHECKLIST.md
- arxiv_submission_metadata.json
- MANIFEST.json
"""
    (staging / "README.md").write_text(readme, encoding="utf-8")

    write_manifest(staging)
    out_zip = DIST / f"{name}.zip"
    zip_staging(staging, out_zip)
    return out_zip



def main() -> None:
    parser = argparse.ArgumentParser(description="Build submission bundles for Frontiers and arXiv")
    parser.add_argument("--version", default="v1.0.0", help="Submission bundle version")
    args = parser.parse_args()

    DIST.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d")

    frontiers_zip = build_frontiers(args.version, stamp)
    arxiv_zip = build_arxiv(args.version, stamp)

    print(f"Frontiers bundle created: {frontiers_zip}")
    print(f"arXiv bundle created: {arxiv_zip}")


if __name__ == "__main__":
    main()
