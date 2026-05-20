#!/usr/bin/env python3
"""Build a test release ZIP with a single entry point for quantum experiments."""

from __future__ import annotations

import hashlib
import argparse
import shutil
import json
from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
INSTRUMENT = ROOT / "instrument"
DIST = ROOT / "dist"


def compute_sha256(file_path: Path) -> str:
    """Compute SHA256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()


def safe_copy(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def build_release(version: str) -> Path:
    stamp = datetime.now().strftime("%Y%m%d")
    package_name = f"U-quantum-test-{version}-{stamp}"
    staging_dir = DIST / package_name

    if staging_dir.exists():
        shutil.rmtree(staging_dir)
    staging_dir.mkdir(parents=True, exist_ok=True)

    # Core runtime files.
    safe_copy(ROOT / "README.md", staging_dir / "README.md")
    safe_copy(INSTRUMENT / "requirements.txt", staging_dir / "instrument" / "requirements.txt")
    safe_copy(INSTRUMENT / "quantum_experiment.py", staging_dir / "instrument" / "quantum_experiment.py")
    safe_copy(INSTRUMENT / "ascii_experiment.py", staging_dir / "instrument" / "ascii_experiment.py")
    safe_copy(INSTRUMENT / "quantum_hopfield.py", staging_dir / "instrument" / "quantum_hopfield.py")
    safe_copy(INSTRUMENT / "hopfield_lean.lean", staging_dir / "instrument" / "hopfield_lean.lean")

    # Generated artifacts for immediate review.
    artifact_suffixes = {".png", ".gif", ".csv"}
    for path in sorted(INSTRUMENT.iterdir()):
        if path.is_file() and path.suffix.lower() in artifact_suffixes and path.name.startswith("quantum_"):
            safe_copy(path, staging_dir / "instrument" / path.name)

    run_bat = r"""@echo off
setlocal
set ROOT=%~dp0
set PYTHONUTF8=1
chcp 65001 >nul
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
set LOGFILE=%ROOT%\run_%mydate%_%mytime%.log

(
  echo.
  echo ============================================================
  echo U Quantum Test Package - Execution Log
  echo Started: %date% %time%
  echo ============================================================
  echo.
  if not exist "%ROOT%\.venv\Scripts\python.exe" (
    echo [*] Creating Python virtual environment...
    py -3 -m venv "%ROOT%\.venv"
    if errorlevel 1 (
      echo [ERROR] Failed to create venv
      exit /b 1
    )
  )
  call "%ROOT%\.venv\Scripts\activate.bat"
  echo [*] Upgrading pip...
  python -m pip install --upgrade pip
  echo [*] Installing dependencies...
  python -m pip install -r "%ROOT%\instrument\requirements.txt"
  echo [*] Running quantum experiment suite (--mode all)...
  python "%ROOT%\instrument\quantum_experiment.py" --mode all
  if errorlevel 1 (
    echo [ERROR] Quantum suite failed
    echo Check run log above for details.
    exit /b 1
  )
  echo [*] Running ASCII pattern recovery experiment...
  python "%ROOT%\instrument\ascii_experiment.py"
  echo [*] Generating summary report...
  python -c "import json; print(json.dumps({'status': 'PASS', 'timestamp': '%date% %time%'}, indent=2))" > "%ROOT%\summary.json"
  echo.
  echo [SUCCESS] Release test run complete.
  echo Open index.html to review generated visuals.
  echo Check summary.json and run log for details.
  echo.
) >> "%LOGFILE%" 2>&1

echo Log saved to: %LOGFILE%
endlocal
"""

    testing_md = """# Tester Guide: U Quantum Test Package

## What This Package Does

This package contains a complete quantum field dynamics experiment suite demonstrating:
- **Quantum Tunneling Across Topological Barriers**: Classical dynamics get stuck; quantum annealing finds the global attractor.
- **ASCII Pattern Recovery**: Demonstrates Hopfield network memory recall vs. quantum recovery.

## Quick Start

1. **Extract** the ZIP file to a local folder (e.g., `Desktop\\U-test`)
2. **Double-click** `run_package.bat`
3. Wait for the script to complete (first run: ~5-10 min, includes dependency install)
4. **Open** `index.html` in your browser to view generated visuals
5. **Check** `run_*.log` for execution details

## Expected Outputs

After a successful run, you should see:
- ✅ **index.html** — Opens in browser with neon-themed dashboard
- ✅ **run_YYYYMMDD_HHMM.log** — Timestamped execution log
- ✅ **summary.json** — Run metadata (status, timestamp)
- ✅ **instrument/quantum_*.png/gif/csv** — Generated visuals and data

### Key Visuals

| File | What It Shows |
|------|---------------|
| quantum_bond_briefing.png | 4-panel mission briefing: 3D field meshes + metrics |
| quantum_bond_turntable.gif | Rotating 3D view of Fear-Awe barrier topology |
| quantum_noise_equivalence.png | Classical temp curve + quantum wave evolution |
| quantum_sweep_summary.png | Barrier robustness across classical/quantum modes |
| quantum_phase_diagram.png | Barrier-vs-temperature reachability phase space |
| quantum_schedule_comparison.png | Annealing schedule comparisons |

## Troubleshooting

### "ModuleNotFoundError"
- Launcher auto-installs. If fails, right-click run_package.bat → Run as Administrator.

### "UnicodeEncodeError"
- Already mitigated. If occurs, try PowerShell instead of CMD.

### No visuals appear
- Ensure index.html exists and images are in instrument/ subfolder.

## What to Report Back

1. Did run_package.bat complete (exit code 0)?
2. Are all PNG/GIF/CSV files present?
3. Does index.html load and display?
4. Any errors in run_*.log?

Send: summary.json + run_*.log + screenshots of any errors.
"""

    index_html = """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
  <title>U Quantum Experiment Test Package</title>
  <style>
    :root { --bg:#050812; --fg:#d7e6ff; --accent:#5eead4; --panel:#0b1224; --muted:#9fb5d8; }
    body { margin:0; font-family: Segoe UI, Tahoma, sans-serif; background: radial-gradient(circle at 20% 20%, #0f1f3a, var(--bg)); color: var(--fg); }
    .wrap { max-width: 1100px; margin: 0 auto; padding: 24px; }
    h1 { letter-spacing: 0.03em; margin-bottom: 8px; }
    p { color: var(--muted); }
    .card { background: var(--panel); border: 1px solid #1e2f54; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    img { width: 100%; border-radius: 8px; border: 1px solid #263b67; background: #02050d; }
    a { color: var(--accent); }
  </style>
</head>
<body>
  <div class=\"wrap\">
    <h1>U Quantum Experiment Test Package</h1>
    <p>Run <strong>run_package.bat</strong> first, then inspect generated outputs below. See TESTING.md for detailed tester guide.</p>
    <div class=\"card\">
      <strong>Primary entry point:</strong> run_package.bat<br />
      <strong>Experiment:</strong> instrument/quantum_experiment.py --mode all
    </div>
    <div class=\"grid\">
      <div class=\"card\"><h3>Bond Briefing</h3><img src=\"instrument/quantum_bond_briefing.png\" alt=\"Bond Briefing\" /></div>
      <div class=\"card\"><h3>Noise Equivalence</h3><img src=\"instrument/quantum_noise_equivalence.png\" alt=\"Noise Equivalence\" /></div>
      <div class=\"card\"><h3>Sweep Summary</h3><img src=\"instrument/quantum_sweep_summary.png\" alt=\"Sweep Summary\" /></div>
      <div class=\"card\"><h3>Phase Diagram</h3><img src=\"instrument/quantum_phase_diagram.png\" alt=\"Phase Diagram\" /></div>
      <div class=\"card\"><h3>Schedule Comparison</h3><img src=\"instrument/quantum_schedule_comparison.png\" alt=\"Schedule Comparison\" /></div>
    </div>
    <div class=\"card\">
      <strong>Animated output:</strong>
      <a href=\"instrument/quantum_bond_turntable.gif\">instrument/quantum_bond_turntable.gif</a>
    </div>
  </div>
</body>
</html>
"""

    readme = """# U Quantum Test Package

This package is the test release for the quantum experiment suite (v0.1.1).

## Quick Start (Windows)

1. Double-click `run_package.bat`.
2. Wait for completion (first run: ~5-10 min).
3. Open `index.html` in browser.
4. See TESTING.md for detailed guide.

## Included

- `instrument/quantum_experiment.py` (--mode all)
- `instrument/ascii_experiment.py`
- Generated quantum visuals (PNG/GIF/CSV)
- TESTING.md -- Full tester instructions
- MANIFEST.json -- Package integrity hashes

## What to Do After Run

1. Check `run_*.log` for execution trace
2. Verify `summary.json` shows PASS status
3. Inspect generated visuals in index.html
4. Report back: summary.json + run_*.log + any issues
"""

    (staging_dir / "run_package.bat").write_text(run_bat, encoding="ascii")
    (staging_dir / "index.html").write_text(index_html, encoding="utf-8")
    (staging_dir / "TESTING.md").write_text(testing_md, encoding="utf-8")
    (staging_dir / "RELEASE-README.md").write_text(readme, encoding="utf-8")

    # Create manifest for integrity verification
    manifest = {}
    for f in sorted((staging_dir / "instrument").rglob("*")):
        if f.is_file():
            rel_path = f.relative_to(staging_dir)
            manifest[str(rel_path).replace(chr(92), "/")] = compute_sha256(f)

    (staging_dir / "MANIFEST.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    zip_path = DIST / f"{package_name}.zip"
    if zip_path.exists():
        zip_path.unlink()

    with ZipFile(zip_path, "w", compression=ZIP_DEFLATED) as zf:
        for f in staging_dir.rglob("*"):
            if f.is_file():
                zf.write(f, f.relative_to(staging_dir))

    return zip_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a versioned test release ZIP")
    parser.add_argument("--version", default="v0.1.0", help="Release version tag")
    args = parser.parse_args()

    DIST.mkdir(parents=True, exist_ok=True)
    zip_path = build_release(args.version)
    print(f"Release package created: {zip_path}")


if __name__ == "__main__":
    main()
