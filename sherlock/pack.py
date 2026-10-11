"""An OpenCyc pack for a language model: the facts about given constants, as Markdown.

    python sherlock/pack.py                       # seeds from the registry, plus SEED_WORDS
    python sherlock/pack.py Fear Language ...     # extra seed constants

For the NotebookLM experiment (can a language model do Sherlock's job from
an uploaded source?): every UniversalVocabularyMt fact about the seed
constants and all their ancestors (isa, genls up to Thing), their direct
specialisations and up to 15 instances, every disjointWith touching them,
and the properties of the predicates they use (arity, argument types,
genlPreds, genlInverse, transitivity, ...). Seeds: the constants in the
registry's mappings and formal forms, plus the constants the papers' key
words map to (lookup). Writes bld/sherlock/opencyc-pack.md.
"""
from __future__ import annotations

import re
import sys
import zipfile
from collections import defaultdict, deque
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
ZIP = U / "bld" / "sherlock" / "raw" / "nextkb_files_20190107.zip"
OUT = U / "bld" / "sherlock" / "opencyc-pack.md"
PREDS = ("isa", "genls", "disjointWith", "comment", "typeGenls", "genlPreds", "genlInverse", "arity",
         "arg1Isa", "arg2Isa", "arg1Genl", "arg2Genl", "negationPreds", "prettyString-Canonical")
# Constants for the papers' other key words (not only the claims Sherlock checked)
SEED_WORDS = ["Emotion", "FeelingAttribute", "Consciousness", "Perceiving", "Language", "Movie-CW",
              "MovieShowing", "WatchingSomething", "VisualWork", "ConceptualWork", "InformationBearingThing",
              "MusicalComposition-CW", "Psychotherapy", "River", "Heart", "HeartBeat", "Brain", "Neuron",
              "Memory", "Trauma", "Fear", "Awe", "Grief", "Curiosity", "Shame", "Calmness", "Security-Emotion",
              "Safety", "MathematicalObject", "MathematicalFunction", "Quantity", "PhysicalField",
              "ElectromagneticField", "Molecule", "Protein", "Star", "BlackHole", "Galaxy", "Universe",
              "Atom", "AtomicNucleus", "Organism", "Society", "City", "Planet"]


def load_uv() -> tuple[dict, dict, set]:
    facts = defaultdict(list)       # constant -> CycL lines where it is the first argument
    mentions = defaultdict(list)    # constant -> disjointWith lines where it is the second
    names = set()
    with zipfile.ZipFile(ZIP) as z:
        for n in z.namelist():
            if not re.search(r"/UniversalVocabularyMt\.krf$|^UniversalVocabularyMt\.krf$", n):
                continue
            t = z.read(n).decode("utf-8", "replace")
            for m in re.finditer(r'^\((%s) ([\w-]+) ((?:"(?:[^"\\]|\\.)*")|[^\n]*?)\)\s*$' % "|".join(PREDS), t, re.M):
                p, a, rest = m.groups()
                line = m.group(0).strip()
                if p == "comment":
                    line = f'(comment {a} "{" ".join(rest.strip(chr(34)).replace("#$", "").split())[:600]}")'
                facts[a].append((p, rest, line))
                names.add(a)
                if p == "disjointWith":
                    mentions[rest.strip()].append(line)
    return facts, mentions, names


def seeds_from_registry() -> set[str]:
    out = set()
    for f in (U / "registry" / "affidavits").glob("*.yaml"):
        for c in yaml.safe_load(f.read_text(encoding="utf-8")).get("claims") or []:
            out.update(v for v in (c.get("mapping") or {}).values() if isinstance(v, str) and " " not in v)
            out.update(re.findall(r"\b[A-Z][\w-]+\b", c.get("formal", "")))
    return out


def main() -> int:
    facts, mentions, names = load_uv()
    seeds = (seeds_from_registry() | set(SEED_WORDS) | set(sys.argv[1:])) & names
    keep: set[str] = set()
    q = deque(seeds)
    while q:  # ancestors via isa and genls
        x = q.popleft()
        if x in keep:
            continue
        keep.add(x)
        for p, rest, _ in facts.get(x, []):
            if p in ("isa", "genls") and re.fullmatch(r"[\w-]+", rest.strip()):
                q.append(rest.strip())
    down = set()
    for s in seeds:  # one level down: specialisations and instances, a few each
        specs = [a for a in names if any(p == "genls" and r.strip() == s for p, r, _ in facts[a])][:15] \
            if False else []
        down.update(specs)
    # instances and direct specialisations, via a reverse index
    rev = defaultdict(lambda: defaultdict(list))
    for a, fs in facts.items():
        for p, rest, _ in fs:
            if p in ("isa", "genls"):
                rev[rest.strip()][p].append(a)
    for s in seeds:
        down.update(rev[s]["genls"][:15])
        down.update(rev[s]["isa"][:15])
    keep |= down
    preds = {p for x in keep for p, _, _ in facts.get(x, [])} | {"genlWorks", "performanceOfWork",
                                                                   "instantiationOfWork", "parts"}
    keep |= {p for p in preds if p in names}
    lines = ["# OpenCyc pack: facts from UniversalVocabularyMt (NextKB, CC BY 4.0)", "",
             "OpenCyc is a knowledge base of common-sense consensus. Each line is a CycL sentence:",
             "`(isa X C)` X is an instance of collection C; `(genls C D)` every C is a D;",
             "`(disjointWith C D)` nothing is both a C and a D; `(typeGenls T C)` every instance of",
             "the collection type T is a specialisation of C; `(genlPreds P Q)` whatever P relates, Q",
             "relates; `(genlInverse P Q)` whatever P relates, Q relates in reverse; `(comment X \"...\")`",
             "OpenCyc's own description. isa and genls chain: if X isa C and C genls D then X isa D.",
             f"Constants: {len(keep)} (seeds {len(seeds)}, their ancestors to Thing, and some",
             "specialisations and instances).", ""]
    for x in sorted(keep):
        fs = facts.get(x, [])
        if not fs:
            continue
        lines.append(f"## {x}")
        lines += [line for _, _, line in fs] + mentions.get(x, [])
        lines.append("")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    words = sum(len(l.split()) for l in lines)
    print(f"{OUT.relative_to(U).as_posix()}: {len(keep)} constants, {sum(len(facts.get(x, [])) for x in keep)} facts, "
          f"{words} words")
    return 0


if __name__ == "__main__":
    sys.exit(main())
