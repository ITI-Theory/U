"""Biological leakage (ISS-094, Moriarty (b)): a model object said to BE a body part.

    python sherlock/leakage.py        # -> bld/sherlock/leakage.md

H-AL's first attack on the programme: a matrix of the 8D-11D model equated with tissue, with
no transduction map between them ("the coupling matrix W is the amygdala"). The typing check
(level_types.py) sees this only in axioms and concepts; this reads the prose. A candidate is a
sentence where a model object (a coupling or weight matrix, an attractor, a propagator, a
Green's function, a pole, an eigenmode, the field, a Hamiltonian ...) is joined by "is", "are"
or "equals" to a body part, the body parts being OpenCyc's own (every collection under
OrganismPart or AnimalBodyPart in NextKB, plants left out: amygdala, hippocampus, insula, vagus nerve, heart ...),
and the sentence neither hedges ("modelled by", "corresponds to", "represents", "in the
model" ...) nor carries an interpretive or open-hypothesis label. A model object and an organ are
different kinds (OpenCyc: a mathematical object and a partially tangible one), so the
coherent reading is a map, and the sentence should say so. Candidates for a person to read.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from clinical import paragraphs  # noqa: E402
from ledger import registry_documents  # noqa: E402
from readings import ancestors  # noqa: E402
from semtrans import load  # noqa: E402

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"

MODEL = (r"(?:coupling|weight|connectivity|interaction)\s+matri(?:x|ces)|\$W(?:_\{?\w+\}?)?\$|\bW\b|attractors?|"
         r"propagators?|Green'?s functions?|\bpoles?\b|eigen(?:modes?|values?|vectors?)|Hamiltonians?|"
         r"energy landscape|Hopfield (?:network|energy|minim\w+)|field modes?|the (?:somatic |soma-)?field|tensor")
LINK = r"\b(?:is|are|equals|is identical to|is literally|is simply|is nothing but)\b"
HEDGE = re.compile(r"\b(model(?:led|s|ing)?|represent\w*|correspond\w*|analog\w*|like|as if|stands? for|maps?|"
                   r"mapped|reading|interpret\w*|metaphor\w*|proxy|correlat\w*|may|might|could|would|propos\w*|"
                   r"hypothes\w*|candidate|not|no|never|without|whether|if|implement\w*|encod\w*|realis\w*|"
                   r"carried by|hosted|substrate|resembl\w*|plays the role)\b", re.I)
LABELLED = re.compile(r"`(interpretive|open-hypothesis|derived-under-assumptions)`")


def body_parts(kb: dict) -> list[str]:
    words = set()
    for c in kb["genls"]:
        up = ancestors(kb, c)
        # animal parts only: OpenCyc's OrganismPart also holds plants (green, muskmelon, pistachio)
        if ("OrganismPart" in up or "AnimalBodyPart" in up) and not {"PlantPart", "PlantBodyPart", "FruitOrVegetable"} & set(up):
            # the whole name: a hyphen qualifies (Green-EyeColor is an eye colour, not "green")
            phrase = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", c.replace("-", " ")).lower().strip()
            phrase = re.sub(r"\s+", " ", phrase)
            if len(phrase) >= 5 and not re.search(r"\d", phrase):
                words.add(phrase)
    return sorted(words, key=len, reverse=True)


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    _, kb = load()
    parts = body_parts(kb)
    part = "(?:" + "|".join(re.escape(p) for p in parts) + r")s?"
    rx = re.compile(rf"({MODEL})[^.;:]{{0,40}}?{LINK}\s+(?:the\s+|an?\s+|literally\s+)?(?:[\w-]+\s+)?\b({part})\b", re.I)
    docs = registry_documents()
    out, total = [], 0
    for f in docs:
        found = []
        for start, para in paragraphs((U / f).read_text(encoding="utf-8")):
            for sentence in re.split(r"(?<=[.!?])\s+", para):
                m = rx.search(sentence)
                if not m or HEDGE.search(sentence) or LABELLED.search(sentence):
                    continue
                found.append((start, m.group(1), m.group(2), sentence.strip()))
        if found:
            total += len(found)
            out += [f"## {Path(f).stem}", ""] + [f"- line {l}: *{a}* is *{b}*: {s[:260]}" for l, a, b, s in found] + [""]
            for l, a, b, s in found:
                print(f"{f}:{l}: warning: a model object said to be a body part ({a} / {b}), no map stated: {s[:120]}")
    head = ["# Sherlock: model objects said to be body parts (ISS-094)", "",
            f"{total} candidates in {len(docs)} documents; body parts are OpenCyc's ({len(parts)} names under",
            "OrganismPart and AnimalBodyPart). A model object and an organ are different kinds: say the map",
            "(modelled by, corresponds to, represents) or label the sentence (sherlock/leakage.py).", ""]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "leakage.md").write_text("\n".join(head + out) + "\n", encoding="utf-8", newline="\n")
    print(f"bld/sherlock/leakage.md: {total} candidates in {len(docs)} documents")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
