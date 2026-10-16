"""The UAT runner: walk uat/checklist.yaml step by step in a terminal (HAL uat, make uat-run).

Plain text in, plain text out, so it runs anywhere: Git Bash, the Soma Machine's own shell
(MOTHER /shell), a tablet over ssh. Each answer is recorded at once in
uat/results/uat-<run>.yaml, so a run can stop and resume. A finding can go straight to the
VS Code chat with `c` (`code chat -r`, VS Code 1.100 or later), the step and the note as the
prompt, a file attached when there is one. At any note, `v` speaks it instead (dictate.py:
faster-whisper, local; ISS-111); `v` at the step's prompt is a spoken note.

    python uat/scripts/uat.py                 # resume the latest run, or start one
    python uat/scripts/uat.py --new           # a fresh run
    python uat/scripts/uat.py --report        # the latest run as a table
    python uat/scripts/uat.py --step app-palace
"""
from __future__ import annotations

import argparse
import datetime as dt
import glob
import os
import shutil
import subprocess
import sys
import webbrowser
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[2]
CHECKLIST = U / "uat" / "checklist.yaml"
RESULTS = U / "uat" / "results"
APP = os.environ.get("SOMA_URL", "http://127.0.0.1:5199/")
BASH = os.environ.get("UAT_BASH") or ("C:/Program Files/Git/bin/bash.exe" if os.name == "nt" else "bash")
MARK = {"pass": "PASS", "fail": "FAIL", "skip": "skip", "note": "note"}


def latest() -> Path | None:
    runs = sorted(RESULTS.glob("uat-*.yaml"))
    return runs[-1] if runs else None


def load(path: Path) -> dict:
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def save(path: Path, data: dict) -> None:
    RESULTS.mkdir(parents=True, exist_ok=True)
    path.write_text(yaml.safe_dump(data, sort_keys=False, allow_unicode=True), encoding="utf-8", newline="\n")


def head() -> str:
    try:
        return subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=U, capture_output=True, text=True).stdout.strip()
    except OSError:
        return "?"


def open_file(path: str) -> None:
    if os.name == "nt":
        os.startfile(path)  # noqa: S606 (the user's own default viewer)
    else:
        subprocess.Popen(["xdg-open", path])


def to_copilot(step: dict, note: str, attach: str | None) -> None:
    code = shutil.which("code") or shutil.which("code.cmd")
    if not code:
        print("  (no `code` on PATH: the note is recorded; send it from VS Code by hand)")
        return
    prompt = f"UAT {step['id']} ({step['title']}): {note}"
    args = [code, "chat", "-r", "-m", "agent", prompt]
    if attach:
        args[2:2] = ["-a", attach]
    subprocess.run(args, check=False)
    print("  sent to the VS Code chat")


def run_gate(step: dict) -> None:
    print(f"  $ {step['run']}")
    r = subprocess.run([BASH, "-lc", f"cd '{U.as_posix()}' && {step['run']}"], capture_output=True, text=True)
    out = (r.stdout + r.stderr).strip().splitlines()[-25:]
    for line in out:
        print("  | " + line[:160])
    print(f"  (exit {r.returncode})")


def ask(step: dict, record: dict, path: Path, data: dict) -> bool:
    """Run one step; record its answer. False: the user quit."""
    print()
    print(f"[{step['id']}] {step['title']}")
    attach = None
    if step["kind"] == "gate":
        run_gate(step)
    elif step["kind"] == "pdf":
        files = sorted({f for g in step["files"] for f in glob.glob(str(U / g))})
        print(f"  {len(files)} file(s)" + ("" if files else ": none built yet"))
        for f in files:
            rel = Path(f).relative_to(U).as_posix()
            a = input(f"  open {rel}? [enter] open, s skip the rest: ").strip().lower()
            if a == "s":
                break
            open_file(f)
            attach = f
    elif step["kind"] == "app":
        url = APP + step.get("url", "")
        print(f"  {url}")
        print(f"  try: {step.get('do', '')}")
        webbrowser.open(url)
    else:
        print(f"  do: {step.get('do', '')}")
    while True:
        a = input("  p pass, f fail, n note, v spoken note, s skip, c to Copilot, q quit > ").strip().lower()
        if a in ("p", "f", "s"):
            note = note_in("  note (optional, v to speak): ") if a == "f" else ""
            record[step["id"]] = {"result": {"p": "pass", "f": "fail", "s": "skip"}[a], "note": note, "at": dt.datetime.now().isoformat(timespec="minutes")}
            save(path, data)
            return True
        if a in ("n", "v"):
            note = note_in("  note (v to speak): ") if a == "n" else _spoken()
            prev = record.get(step["id"], {})
            record[step["id"]] = {**prev, "result": prev.get("result", "note"), "note": (prev.get("note", "") + " " + note).strip(), "at": dt.datetime.now().isoformat(timespec="minutes")}
            save(path, data)
        elif a == "c":
            note = note_in("  what should Copilot know? (v to speak) ")
            to_copilot(step, note, attach)
            prev = record.get(step["id"], {})
            record[step["id"]] = {**prev, "result": prev.get("result", "note"), "note": (prev.get("note", "") + " [to Copilot] " + note).strip(), "at": dt.datetime.now().isoformat(timespec="minutes")}
            save(path, data)
        elif a == "q":
            return False


def _spoken() -> str:
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from dictate import dictate
    said = dictate()
    if said:
        print(f"  heard: {said}")
        said = input("  [enter] keep, or type a correction: ").strip() or said
    return said


def note_in(prompt: str) -> str:
    """A typed note, or `v` to speak it (dictate.py, local faster-whisper)."""
    text = input(prompt).strip()
    if text.lower() != "v":
        return text
    return _spoken() or input("  (nothing heard) type it: ").strip()


def report(path: Path) -> None:
    data = load(path)
    steps = load(CHECKLIST)["steps"]
    rec = data.get("results", {})
    print(f"{data.get('title')} · run {path.stem} · started at {data.get('commit')}")
    counts: dict[str, int] = {}
    for s in steps:
        r = rec.get(s["id"], {})
        res = r.get("result", "-")
        counts[res] = counts.get(res, 0) + 1
        print(f"  {MARK.get(res, '  - '):5} {s['id']:22} {s['title'][:60]}" + (f"  · {r['note']}" if r.get("note") else ""))
    print("  " + ", ".join(f"{k} {v}" for k, v in counts.items()))


def main() -> int:
    for f in (sys.stdout, sys.stderr):
        f.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="the [T]-Theory UAT, step by step")
    ap.add_argument("--new", action="store_true", help="start a fresh run")
    ap.add_argument("--report", action="store_true", help="show the latest run")
    ap.add_argument("--step", help="run one step by id")
    args = ap.parse_args()
    checklist = load(CHECKLIST)
    path = latest()
    if args.report:
        if not path:
            print("no UAT run yet")
            return 1
        report(path)
        return 0
    if args.new or not path:
        path = RESULTS / f"uat-{dt.datetime.now():%Y%m%d-%H%M}.yaml"
        save(path, {"title": checklist["title"], "commit": head(), "results": {}})
    data = load(path)
    record = data.setdefault("results", {})
    steps = checklist["steps"]
    if args.step:
        steps = [s for s in steps if s["id"] == args.step]
    else:
        steps = [s for s in steps if s["id"] not in record]
    print(f"{checklist['title']} · {path.relative_to(U).as_posix()} · {len(steps)} step(s) to go")
    for s in steps:
        if not ask(s, record, path, data):
            print("stopped; resume with: HAL uat")
            break
    else:
        report(path)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (KeyboardInterrupt, EOFError):
        print("\nstopped; resume with: HAL uat")
