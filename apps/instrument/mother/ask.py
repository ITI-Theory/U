#!/usr/bin/env python3
"""Ask MOTHER or H-AL one question from the command line (HAL mother ask / HAL hal ask).

    .venv/Scripts/python.exe ask.py mother "How does time bend in [T]-Theory?"
    .venv/Scripts/python.exe ask.py hal "Where did we leave the course book?" [--compare] [--dry-run]

Uses the same Bridge class as the MOTHER panel in the Soma Machine, so the app,
the terminal and AI sessions share one code path to NotebookLM and one pace:
calls are at least PACE seconds apart across all of them (recorded in
~/.cache/hal/nlm-last). Notebooks come from mother.local.json (notebook_id,
hal_notebook_id, baseline_notebook_id). Uses the bridge's NotebookLM login
(`.venv/Scripts/notebooklm login` if it has expired).
"""
from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

from bridge import Bridge, baseline_id, hal_id, notebook_id  # one code path with the app
from notebooklm.exceptions import RateLimitError

PACE = 30.0  # seconds between NotebookLM calls (free accounts have a daily chat limit)
STAMP = Path.home() / ".cache" / "hal" / "nlm-last"


def wait_for_pace() -> None:
    try:
        last = float(STAMP.read_text(encoding="utf-8").strip())
    except (OSError, ValueError):
        last = 0.0
    gap = PACE - (time.time() - last)
    if gap > 0:
        print(f"[pace] waiting {gap:.0f} s (NotebookLM calls are at least {PACE:.0f} s apart)", file=sys.stderr)
        time.sleep(gap)
    STAMP.parent.mkdir(parents=True, exist_ok=True)
    STAMP.write_text(f"{time.time():.0f}\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("persona", choices=["mother", "hal"])
    ap.add_argument("question")
    ap.add_argument("--compare", action="store_true", help="also ask the mainstream baseline and show the difference")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    target = hal_id() if a.persona == "hal" else notebook_id()
    if not target:
        sys.exit("no H-AL notebook configured (hal_notebook_id in mother.local.json)")
    if a.dry_run:
        print(f"[would] ask {a.persona.upper()} (notebook {target}){' with compare' if a.compare else ''}: {a.question}")
        return 0
    wait_for_pace()
    bridge = Bridge(notebook_id(), baseline_id(), hal_id())
    try:
        result = bridge.ask(a.question, a.question, a.compare, a.persona)
    except RateLimitError:
        sys.exit("NotebookLM chat quota reached for this account; try again later")
    print(result["answer"].strip())
    if result.get("citations"):
        print("\nSources: " + "; ".join(result["citations"]))
    if result.get("diff"):
        print("\nWhat [T]-Theory adds:\n" + result["diff"].strip())
    return 0


if __name__ == "__main__":
    sys.exit(main())
