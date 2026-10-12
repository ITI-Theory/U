"""clinical.py: no clinical claim without its evidence (ISS-055, the disclaimers as a check).

The papers and books disclaim: a score is a design proposal, not a treatment; the app is a
teaching picture, not medical advice. This check reads every registry document (the
affidavits' sources, as the ledger does) for sentences that claim a clinical EFFECT (a
treatment, a cure, an improvement in patients) and lists those that carry no hedge and no
evidence label in the same paragraph. A candidate is for a person to read, not a verdict:
the later, Lean version files such claims in OpenCyc microtheories (a ClinicalMt claim needs
a ClinicalEvidence fact; an ArtisticDesignMt claim does not).

    python sherlock/clinical.py          # -> bld/sherlock/clinical.md
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ledger import registry_documents  # noqa: E402

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"

CONTEXT = re.compile(r"\b(patients?|clients?|therap(y|ies|eutic|ist)|clinic(al|ally)?|treatments?|diagnos\w*|PTSD|trauma|depress\w*|anxiety disorder)\b", re.I)
# "treats X as Y" means "regards": not an effect verb
EFFECT = re.compile(r"\b(cures?|heals?|reduces?|improves?|relieves?|resolves?|restores?|prevents?|is effective|are effective|works for|recovery)\b", re.I)
HEDGE = re.compile(r"\b(may|might|could|would|hypothes\w+|proposal|proposed|propose|design target|not (a |an )?(clinical|medical|treatment|therapy|diagnos\w*)|"
                   r"no clinical|untested|to be tested|predict\w*|if\b|whether|not promised|not evidence|teaching|model(led)?|in the model|"
                   r"simulat\w*|interpretive|open-hypothesis|derived-under-assumptions|speculat\w*|aim|goal|should|future|pilot|preregist\w*|"
                   r"falsif\w*|not yet|metaphor|picture|illustrat\w*|cannot|does not|do not|never|without)\b", re.I)
LABEL = re.compile(r"`(interpretive|open-hypothesis|derived-under-assumptions|simulated|empirical-result|kernel-verified)`")


def paragraphs(text: str):
    """(first line, paragraph) for each prose paragraph; tables, code and headings skipped."""
    start, buf, fenced = 0, [], False
    for i, line in enumerate(text.splitlines() + [""], 1):
        if re.match(r"^#+\s*(references|bibliography|sources|further reading)\b", line, re.I):
            break  # the reference list: titles, not claims
        if line.lstrip().startswith("```"):
            fenced = not fenced
            continue
        if fenced:
            continue
        if line.strip() and not line.lstrip().startswith(("|", "#", "{{", "!")):
            if not buf:
                start = i
            buf.append(line)
        elif buf:
            yield start, " ".join(buf)
            buf = []


def candidates(path: Path):
    for start, para in paragraphs(path.read_text(encoding="utf-8")):
        if LABEL.search(para):
            continue  # the paragraph states its evidence label
        for sentence in re.split(r"(?<=[.!?])\s+", para):
            if sentence.lstrip().startswith(("*", ">", "- [")) or re.search(r"\(\d{4}\)|\b(19|20)\d\d[a-z]?\)", sentence[:80]):
                continue  # a title, a quotation, a reference
            if CONTEXT.search(sentence) and EFFECT.search(sentence) and not HEDGE.search(sentence):
                yield start, sentence.strip()


def main() -> int:
    docs = registry_documents()
    out = ["# Sherlock: clinical claims without a hedge or a label", "",
           "Sentences that claim a clinical effect, with no hedge in the sentence and no evidence",
           "label in the paragraph. Candidates for a person to read, not verdicts (sherlock/clinical.py).", ""]
    total = 0
    for f in docs:
        found = list(candidates(U / f))
        if not found:
            continue
        total += len(found)
        out += [f"## {Path(f).stem}", ""]
        out += [f"- line {line}: {s[:300]}" for line, s in found]
        out.append("")
    out.insert(4, f"{total} candidates in {len(docs)} documents.\n")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "clinical.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"bld/sherlock/clinical.md: {total} candidates in {len(docs)} documents")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
