"""NotebookLM compute usage for the signed-in account (five-hour and weekly windows).

Reads `notebooklm usage --json` (notebooklm-py 0.8+): used and remaining percent per
window, the server's reset times, and the estimated cost of each action. A chat
question (`qna`) costs about 1.6 % of the five-hour window; audio and video
overviews about 44 %. Used by the bridge (`GET /usage`, the engine room FUEL), the
UAT runner (checks before a run) and `make nlm-usage`.
"""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path


def _cli() -> str:
    folder = Path(sys.executable).parent
    for name in ("notebooklm.exe", "notebooklm"):
        if (folder / name).exists():
            return str(folder / name)
    return "notebooklm"


def usage() -> dict:
    """{'windows': [{kind, used_percent, remaining_percent, resets_at, resets_local}],
    'qna_cost': percent per question, 'questions_left': int, 'exhausted': bool}."""
    result = subprocess.run([_cli(), "usage", "--json"], capture_output=True, text=True, timeout=90)
    if result.returncode != 0:
        raise RuntimeError((result.stderr or result.stdout).strip()[-300:] or "notebooklm usage failed")
    data = json.loads(result.stdout)
    cost = next((a.get("estimated_cost_percent") for a in data.get("actions", []) if a.get("kind") == "qna"), None) or 1.6
    windows = []
    for window in data.get("windows", []):
        reset = window.get("resets_at")
        local = datetime.fromisoformat(reset).astimezone().strftime("%a %d %b %H:%M") if reset else ""
        windows.append({**window, "resets_local": local})
    five = next((w for w in windows if w["kind"] == "five_hour"), None)
    remaining = five["remaining_percent"] if five else 100.0
    return {"windows": windows, "qna_cost": cost, "questions_left": int(remaining // cost),
            "exhausted": bool(data.get("is_exhausted"))}


def enough_for(questions: int) -> tuple[bool, str]:
    """Whether the five-hour window has room for this many questions, with a one-line report."""
    info = usage()
    five = next((w for w in info["windows"] if w["kind"] == "five_hour"), {})
    line = (f"NotebookLM five-hour window: {five.get('remaining_percent', 0):.0f}% left, about "
            f"{info['questions_left']} questions; resets {five.get('resets_local', '?')}")
    return (not info["exhausted"] and info["questions_left"] >= questions), line


def main() -> None:
    info = usage()
    for window in info["windows"]:
        print(f"{window['kind']:10} used {window['used_percent']:5.1f}%  left {window['remaining_percent']:5.1f}%  resets {window['resets_local']}")
    print(f"a question costs about {info['qna_cost']:.1f}% of the five-hour window: about {info['questions_left']} questions left")


if __name__ == "__main__":
    main()
