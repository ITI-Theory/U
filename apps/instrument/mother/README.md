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
'{ "notebook_id": "<id>" }' | Set-Content mother.local.json   # gitignored
.\run_bridge.ps1                        # http://127.0.0.1:8765
```

Then in the app: Settings → MOTHER → API / LOCAL BRIDGE, and press ASK MOTHER.

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
