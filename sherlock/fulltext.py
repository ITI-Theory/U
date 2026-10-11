"""All of OpenCyc (NextKB), as text sources for a language model.

    python sherlock/fulltext.py      # -> bld/sherlock/opencyc-full/opencyc-NN.txt

Every CycL file of NextKB (898 files: every microtheory, the lexicon, the
rules), in order, nothing left out, split at fact boundaries into parts of
at most 480,000 words (NotebookLM's per-source limit is 500,000). Each part
starts with a short key to CycL; each file starts with a line naming its
microtheory.
"""
from __future__ import annotations

import sys
import zipfile
from pathlib import Path

U = Path(__file__).resolve().parents[1]
ZIP = U / "bld" / "sherlock" / "raw" / "nextkb_files_20190107.zip"
OUT = U / "bld" / "sherlock" / "opencyc-full"
LIMIT = 480_000
KEY = """OpenCyc (NextKB, Northwestern QRG, CC BY 4.0), part {n} of {total}: CycL sentences.
(isa X C) X is an instance of collection C; (genls C D) every C is a D; (disjointWith C D)
nothing is both; (typeGenls T C) every instance of type T specialises C; (genlPreds P Q)
whatever P relates, Q relates; (genlInverse P Q) Q relates it in reverse; (implies A B) a rule;
?X is a variable. Each file below belongs to the microtheory named in its (in-microtheory ...)
line; a statement holds in its microtheory and in those that inherit it (genlMt).

"""


def main() -> int:
    with zipfile.ZipFile(ZIP) as z:
        files = sorted(n for n in z.namelist() if n.endswith(".krf"))
        parts: list[list[str]] = [[]]
        words = 0
        for n in files:
            text = z.read(n).decode("utf-8", "replace")
            block = [f";;; FILE {n}"]
            for line in text.splitlines():
                w = len(line.split())
                # split only between top-level sentences (a line starting with "(")
                if words + w > LIMIT and line.startswith("("):
                    parts[-1].append("\n".join(block))
                    parts.append([])
                    block, words = [f";;; FILE {n} (continued)"], 0
                block.append(line)
                words += w
            parts[-1].append("\n".join(block))
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("opencyc-*.txt"):
        old.unlink()
    for i, p in enumerate(parts, 1):
        (OUT / f"opencyc-{i:02d}.txt").write_text(KEY.format(n=i, total=len(parts)) + "\n\n".join(p) + "\n",
                                                  encoding="utf-8", newline="\n")
    print(f"{OUT.relative_to(U).as_posix()}: {len(parts)} parts from {len(files)} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
