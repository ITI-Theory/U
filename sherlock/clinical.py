"""clinical.py: no clinical claim without its evidence (ISS-055, the disclaimers as a check).

The papers and books disclaim: a score is a design proposal, not a treatment; the app is a
teaching picture, not medical advice. This check reads every registry document (the
affidavits' sources, as the ledger does) for sentences that claim a clinical EFFECT (a
treatment, a cure, an improvement in patients) and lists those that carry no hedge and no
evidence label in the same paragraph. A candidate is for a person to read, not a verdict.

Microtheories (ISS-063): registry/microtheories.yaml says which context each document speaks
in, as OpenCyc files a claim in a microtheory. In ClinicalMt (patients, therapy, trauma) and
ArtisticDesignMt (music, film, art as design) the document must carry its own disclaimer, a
sentence saying it is a model, not clinical advice, a treatment or a diagnosis: the
disclaimer is what puts it in that context. In ArtisticDesignMt a clinical-effect sentence
has left its context, so a hedge is not enough: it needs an evidence label. Every other
document speaks in TheoryMt, where the first rule holds.

    python sherlock/clinical.py          # -> bld/sherlock/clinical.md
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

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


def load_microtheories() -> tuple[dict[str, str], re.Pattern, dict]:
    data = yaml.safe_load((U / "registry" / "microtheories.yaml").read_text(encoding="utf-8"))
    mt_of = {doc: mt for mt, docs in data["documents"].items() for doc in docs}
    disclaimer = re.compile("|".join(f"(?:{p})" for p in data["disclaimer_patterns"]), re.I)
    return mt_of, disclaimer, data["microtheories"]


def candidates(path: Path, mt: str = "TheoryMt"):
    for start, para in paragraphs(path.read_text(encoding="utf-8")):
        if LABEL.search(para):
            continue  # the paragraph states its evidence label
        for sentence in re.split(r"(?<=[.!?])\s+", para):
            if sentence.lstrip().startswith(("*", ">", "- [")) or re.search(r"\(\d{4}\)|\b(19|20)\d\d[a-z]?\)", sentence[:80]):
                continue  # a title, a quotation, a reference
            if CONTEXT.search(sentence) and EFFECT.search(sentence):
                # in a design context a hedge does not bring a clinical claim back into context
                if mt == "ArtisticDesignMt" or not HEDGE.search(sentence):
                    yield start, sentence.strip()


def disclaimer_line(path: Path, disclaimer: re.Pattern) -> int | None:
    """The line where the disclaimer starts; a sentence may wrap across lines."""
    text = path.read_text(encoding="utf-8")
    m = disclaimer.search(re.sub(r"\s", " ", text))
    return text.count("\n", 0, m.start()) + 1 if m else None


def main() -> int:
    docs = registry_documents()
    mt_of, disclaimer, mts = load_microtheories()
    unknown = sorted(set(mt_of) - set(docs))
    out = ["# Sherlock: clinical claims without a hedge or a label", "",
           "Sentences that claim a clinical effect, with no hedge in the sentence and no evidence",
           "label in the paragraph, and documents whose context needs a disclaimer they lack.",
           "Candidates for a person to read, not verdicts (sherlock/clinical.py; contexts in",
           "registry/microtheories.yaml).", ""]
    total = missing = 0
    table = ["## Contexts", "", "| document | microtheory | disclaimer |", "|---|---|---|"]
    for f in docs:
        mt = mt_of.get(f, "TheoryMt")
        needs = mts[mt].get("disclaimer") == "required"
        line = disclaimer_line(U / f, disclaimer) if needs else None
        if needs and line is None:
            missing += 1
            print(f"{f}:1: warning: a {mt} document with no disclaimer (not clinical advice, a treatment or a diagnosis)")
        table.append(f"| {Path(f).stem} | {mt} | {('line ' + str(line)) if line else ('**missing**' if needs else '-')} |")
        found = list(candidates(U / f, mt))
        if not found:
            continue
        total += len(found)
        for line, sentence in found:  # compiler style, for VS Code's Problems panel
            print(f"{f}:{line}: warning: a clinical claim with no {'evidence label' if mt == 'ArtisticDesignMt' else 'hedge or evidence label'} ({mt}): {sentence[:140]}")
        out += [f"## {Path(f).stem} ({mt})", ""]
        out += [f"- line {line}: {s[:300]}" for line, s in found]
        out.append("")
    for f in unknown:
        print(f"registry/microtheories.yaml: warning: {f} is not a registry document")
    out.insert(6, f"{total} candidates in {len(docs)} documents; {missing} documents without the disclaimer their context needs.\n")
    out += table + [""]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "clinical.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"bld/sherlock/clinical.md: {total} candidates in {len(docs)} documents; {missing} missing disclaimers")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
