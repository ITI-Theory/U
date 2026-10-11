---
fields: issue=ISS-065
---

# Sergeant Major: admin reminders pushed to H-AL

**Issue:** [ISS-065](../../../ISSUES.md#iss-065-sergeant-major-admin-reminders-pushed-to-h-al-a-maintenance-deck-a-releasable-voice--open)

## Scope

Author, 11 Oct 2026: ADHD makes admin the weak spot; this is the final
project (after Sherlock, ISS-055). Reminders are pushed out to H-AL; a
Maintenance deck sits below the engine room; H-AL speaks them. The author's
own voice (ISS-054) stays parked: use a stock voice with the H-AL-ifier on
top, which is quicker.

## End state

1. `HAL remind` collects the reminders from where they already live, and
   never keeps a list of its own: unchecked author items in ISSUES.md and
   the epic files, CURRENT.md, uncommitted and unpushed files in the four
   repos, pending uploads in Dist/PAPERS.yaml, UAT items (`bin/uat`,
   ISS-013), and dated items. Output: JSON, each reminder with a source
   (file and line), one next action, a size (minutes) and a due date if any.
2. H-AL's briefing: at most three items, one at a time, each a single next
   action; never a backlog dump. At `HAL copilot start`, on demand, and on
   the Maintenance deck.
3. The Maintenance deck: a fourth window role in `screens.js` (level,
   cockpit, engine, maintenance), "below the engine room". A view of the
   reminders with done and snooze only; done edits the source (ticks the
   box) through the bridge, snooze is kept in Me.
4. The voice: a stock Piper voice whose licence allows release, with the
   H-AL-ifier on its WAV: lower pitch, slower, an even contour, longer
   pauses at sentence ends (ISS-054 delivery rules), plus the pronunciation
   lexicon. The HAL 9000 imitation stays private for testing; the author's
   own trained voice replaces the stock one later without other changes.

## Design decisions

- D1 Read, never copy (the repo rule "facts are pointed to"): a list the
  author must maintain is the first thing ADHD drops.
- D2 Push, short, one at a time: three items at most, each sized.
- D3 Two kinds of admin. Programme admin (papers, UAT, commits) may live
  in U; personal admin (appointments, letters) lives in Me only. The app is
  public and its data is compiled in, so personal reminders reach the deck
  only through the local bridge (like the voice), never a public build.
- D4 The browser's built-in voice cannot be processed (its audio never
  passes through the page; only rate and pitch can be set), so the
  H-AL-ifier needs the speech as audio: Piper via the bridge returns WAV,
  and the H-AL-ifier runs in the bridge or in Web Audio. The browser voice
  stays the fallback.
- D5 (author, 11 Oct 20:43) The stock voice is the preferred end state,
  not a stopgap: H-AL should not be the author's own voice. Recording and
  training his voice (ISS-054) is dropped unless he asks again.

## Sub-issues (to open when the work starts)

- Reminder collector and briefing (`HAL remind`).
- Maintenance deck.
- Stock Piper voice and the H-AL-ifier (updates ISS-054).
- Personal admin source in Me and the bridge endpoint.