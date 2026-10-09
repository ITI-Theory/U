# MOTHER

Ask the programme's NotebookLM notebook about the current Soma Machine view.
Three modes, chosen in the app's Settings:

| Mode | What happens | Who |
| --- | --- | --- |
| OFF | MOTHER is hidden (default). | everyone |
| WEB | The question, with the current view as context, is copied to the clipboard and the public notebook opens in a new tab; paste to ask. Answered under the visitor's own Google account. | any visitor |
| API | Answers appear inline, through this local bridge. | the author, locally |

## API mode (local bridge)

The bridge uses [notebooklm-py](https://pypi.org/project/notebooklm-py/), an
unofficial client of NotebookLM's internal web API, with **your own** login.
Google offers no official NotebookLM API, so this can break when Google
changes things, and it must never be deployed publicly: it acts with your
Google account. It binds to `127.0.0.1` and accepts browser requests only from
localhost pages.

```powershell
cd apps/instrument/mother
python -m venv .venv; .\.venv\Scripts\python -m pip install -r requirements.txt
.\.venv\Scripts\python -m playwright install chromium   # browser for the login step
.\.venv\Scripts\notebooklm login        # once; opens a browser to sign in
.\.venv\Scripts\notebooklm list         # find the notebook id
'{ "notebook_id": "<id>", "shell": true }' | Set-Content mother.local.json   # gitignored
.\run_bridge.ps1                        # http://127.0.0.1:8765
```

Then in the app: Settings → MOTHER → API / LOCAL BRIDGE, and press ASK MOTHER.

The Google session expires now and then. The bridge renews it itself, with no
login window: on a failed call it runs `notebooklm auth refresh` (which rotates
the stored cookies), falling back to `--browser-cookies chrome` (the cookies of
the signed-in Chrome), and it refreshes every 20 minutes while it runs.
`notebooklm login` is needed only when both fail. Tablets need no login: the
bridge runs on the PC, and tablet screens (spacedesk, or a browser on the local
network) only talk to the app.

## Local SHELL tab

The Soma Machine MOTHER panel can open a local terminal tab backed by this
bridge. It is **off by default**. Enable it only on your own machine:

```json
{
  "notebook_id": "<id>",
  "hal_notebook_id": "<optional>",
  "baseline_notebook_id": "<optional>",
  "shell": true,
  "shell_limit": 2,
  "shell_cwd": "<path-to-your-clone>"
}
```

Install the bridge dependencies in the local venv:

```powershell
cd apps/instrument/mother
.\.venv\Scripts\python -m pip install -r requirements.txt
.\run_bridge.ps1
```

Shell profiles:

- `bash`: Git Bash, detected at `C:\Program Files\Git\bin\bash.exe`
  (or `bash.exe` on `PATH`).
- `python`: the bridge venv's interactive Python.
- `nvim`: enabled only when `nvim` is already on `PATH`; otherwise the app
  shows the disabled profile with the hint `install Neovim, e.g. scoop install neovim`.

Security model:

- The server binds only to `127.0.0.1`.
- HTTP and WebSocket requests reject foreign `Origin` headers with `403`.
- `/health` returns a random per-run shell token only to allowed local origins;
  `/shell` requires that token on the WebSocket URL.
- Each socket owns one PTY and the bridge kills it when the socket closes.
- Concurrent shells are capped (`shell_limit`, default `2`).

Risk: enabling `"shell": true` gives the browser page a local command prompt
under your user account. Keep the bridge local, never expose the port, never
put secrets in MOTHER chat or code blocks, and turn the bridge off when done.

## H-AL

H-AL ("Hologram Al") is the author's private notebook: MOTHER's sources plus
Phase Dot and the chat archive. Pick MOTHER or H-AL with the switch in the
terminal header (API mode only; WEB mode is always MOTHER). Configure with
`hal_notebook_id` in `mother.local.json`. H-AL's terminal is red.

Compare mode (API): also set `baseline_notebook_id`, a notebook of mainstream
reference sources (lens off). The terminal then shows the answer, WHAT
[T]-THEORY ADDS, and the mainstream answer.

## Voice (SPEAK)

Tick SPEAK in the terminal header (or `/speak on`; `/stop` or Esc to silence).
MOTHER reads answers with the browser's built-in voice. H-AL uses the HAL 9000
Piper voice when the bridge has it, and falls back to a lower browser voice
otherwise. The HAL 9000 model is private use only and stays outside the repo:

```powershell
.\.venv\Scripts\python.exe -m pip install piper-tts
$d = "$HOME\.voice-admin\models\hal9000"; New-Item -ItemType Directory -Force $d
foreach ($f in 'hal.onnx', 'hal.onnx.json') {
  curl.exe -sSL -o "$d\$f" "https://huggingface.co/campwill/HAL-9000-Piper-TTS/resolve/main/$f" }
```

Another model path can be set with `voice_model` in `mother.local.json` or
`MOTHER_VOICE_MODEL`. `GET /health` reports `"voice": true` when it is ready;
`POST /speak {"text": "..."}` returns `audio/wav` (localhost origins only).

## Observatory mode and tours

Tick OBSERVATORY (or `/observatory on`). Each question then asks the notebook
to end its answer with a `soma-tour` block: two to five Soma Machine views,
each with one sentence and an evidence label. The panel removes the block from
the answer, checks every step against the registry ids, drops any invalid step
(and says so), and runs the tour in a card at the bottom left. With SPEAK on,
each stop is read aloud (H-AL in the HAL voice) and the tour moves on when the
line ends; otherwise it waits long enough to read.

- In API mode this happens automatically. In WEB mode, copy the answer back
  from NotebookLM and type `/play`.
- `/tours` lists the presets in `registry/tours/`; `/tour <id>` plays one.
- In the app, `#tour=<id>` plays a preset and `#tour=<id>&stop=<n>` opens one
  stop; the Field Atlas textbook names its stops this way.
- The language is specified in `docs/TOUR-LANGUAGE.md`. Upload
  `bld/app/observatory-guide.md` (`make observatory-guide`) to the MOTHER and
  H-AL notebooks as a source: NotebookLM has no system prompt, so the guide
  is how the notebook learns the format and the allowed ids.

## Notes

- Every question carries the view (level, scale, response time, path, model,
  lens and dimension, reader register) and asks the notebook to separate
  established science from the programme's interpretation.
- Answers are shown with the notebook's cited sources and an
  `INTERPRETIVE / MAY ERR` marker.
- `mother.local.json` and `.venv/` are gitignored; login cookies stay in
  notebooklm-py's own storage outside the repository.
- The public notebook is `https://notebook.google.com/notebook/16368cb3-6c5f-47b3-8e79-781b77084944`;
  it is the app's default for WEB mode and must be shared as *anyone with the
  link can view* for visitors to use it.
- The name is a private homage to MU/TH/UR 6000 in *Alien* (1979); choose an
  original name before any public release.
