#!/usr/bin/env python3
"""Ask HAL-UAT the questions in a file (## Qn headings) and write the answers beside it.

    apps/instrument/mother/.venv/Scripts/python uat/scripts/hal_uat.py uat/RC3/hal-uat-questions-rc3.2.md

Each question goes through apps/instrument/mother/ask.py (one code path and one pace with the
app and the terminal). Answers: <file>-answers.md, each under its heading.
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

U = Path(__file__).resolve().parents[2]
MOTHER = U / "apps" / "instrument" / "mother"


def main(argv):
    src = Path(argv[0])
    text = src.read_text(encoding="utf-8")
    parts = re.split(r"(?m)^## ", text)[1:]
    out = [f"# HAL-UAT answers ({src.name})", ""]
    for part in parts:
        title, _, body = part.partition("\n")
        q = " ".join(body.split())
        print(f"ask: {title}", flush=True)
        # NotebookLM answers carry emoji; the Windows console code page cannot print them
        env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}
        r = subprocess.run([sys.executable, "ask.py", "hal", q], cwd=MOTHER, capture_output=True,
                           text=True, encoding="utf-8", errors="replace", env=env)
        answer = r.stdout.strip() or f"(no answer; exit {r.returncode}: {r.stderr.strip()[-400:]})"
        out += [f"## {title.strip()}", "", answer, ""]
        dest = src.with_name(src.stem + "-answers.md")
        dest.write_text("\n".join(out) + "\n", encoding="utf-8", newline="\n")
    print(f"written: {dest}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
