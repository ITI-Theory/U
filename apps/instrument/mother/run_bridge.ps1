# Start the MOTHER bridge (local only). First time: .\.venv\Scripts\notebooklm login
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not (Test-Path "$here\.venv\Scripts\python.exe")) {
    python -m venv "$here\.venv"
    & "$here\.venv\Scripts\python.exe" -m pip install -q -r "$here\requirements.txt"
}
& "$here\.venv\Scripts\python.exe" "$here\bridge.py"
