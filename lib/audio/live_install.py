#!/usr/bin/env python3
"""live_install.py: put the Soma control script into Ableton Live's User Library (ISS-118).

Copies lib/audio/ableton/Soma and the compiled rig (bld/live/rig.json, `make live-rig`) to
<User Library>/Remote Scripts/Soma, found where Live keeps it (Documents, or Documents in OneDrive), and
leaves anything Live wrote there (soma-devices.json) in place. Live reads control scripts when it
starts: restart it, then Settings > Link, Tempo & MIDI > Control Surface: Soma, its Input the virtual
MIDI port the Soma Machine's MIDI OUT sends to.

  python lib/audio/live_install.py [--user-library <path>] [--dry-run]
"""

from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def user_library(given: str | None) -> Path | None:
    if given:
        return Path(given)
    home = Path(os.environ.get("USERPROFILE") or Path.home())
    for c in (home / "OneDrive" / "Documents" / "Ableton" / "User Library", home / "Documents" / "Ableton" / "User Library",
              home / "Music" / "Ableton" / "User Library"):
        if c.exists():
            return c
    return None


def main(argv: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    lib = user_library(argv[argv.index("--user-library") + 1] if "--user-library" in argv else None)
    if not lib:
        print("Live's User Library not found: give --user-library")
        return 1
    rig = ROOT / "bld" / "live" / "rig.json"
    if not rig.exists():
        print("no bld/live/rig.json: run `make live-rig` first")
        return 1
    dest = lib / "Remote Scripts" / "Soma"
    print(f"install the Soma script to {dest}")
    if "--dry-run" in argv:
        return 0
    dest.mkdir(parents=True, exist_ok=True)
    for f in (ROOT / "lib" / "audio" / "ableton" / "Soma").glob("*.py"):
        shutil.copy2(f, dest / f.name)
    shutil.copy2(rig, dest / "rig.json")
    print("done: restart Live, then Settings > Link, Tempo & MIDI > Control Surface: Soma (Input: the app's MIDI OUT port)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
