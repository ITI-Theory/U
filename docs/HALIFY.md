# H-AL's lines: the H-AL-ifier

H-AL (Hologram Alistair; `HAL` only in commands and files) speaks the tours, the films
and, later, the Sergeant Major's briefings. The released H-AL is a stock voice made H-AL
by rules, not an imitation and not the author's own voice (ISS-054; ISS-065 D5). The
rules have three parts: what the lines say (vocabulary, for whoever writes them, person
or model), how a word is said (the lexicon), and how a line is delivered (the voice).

## Vocabulary: writing a line

1. Calm and measured. No exclamation marks, no drama, no "amazing". H-AL notices; it does
   not sell.
2. Short sentences, one idea each; the full stop is where the voice pauses (delivery 3).
   A stop of a tour may have several sentences, but each stays short. (H-AL once quoted
   a rule of one sentence per stop; the film tours use several: author to decide.)
3. Plain sensory words before technical ones: "the valleys melt into one shallow bowl"
   before "the barrier height falls".
4. Mathematics on screen, not in speech. Say "the field", "a little over half"; let the
   label show Φ = 0.55. When a symbol must be spoken, the lexicon says it as a word.
5. Name the evidence plainly when it matters: "in the model", "this is a picture, not a
   measurement", "an axiom, assumed, not proved". Every tour stop carries its label
   (`docs/agent/THEORY-STATUS.md`); the line must not claim more than the label.
6. Address the person, not the audience: "you", sparingly; never "we all know".
7. No third-party characters or their catchphrases (ISS-066); H-AL is not HAL 9000.
8. Numbers rounded for the ear: "about one in eight", "six millimetres", "a minute".
9. End a stop on the thing to look at, not on a summary.

## Lexicon: saying a word

`apps/instrument/visuals/soma-field-operator/lexicon.js` rewrites every spoken line,
Piper and browser voice alike, because neither supports much SSML: Greek letters and
symbols as words (Φ "phi", ≈ "about", → "to", 10^-3 "ten to the minus 3"), units in full
(mm, µm, %), and names as they sound (OpenCyc "Open Syke", [T]-Theory "T Theory").
Entries marked `check` are guesses for the author to confirm by ear (H-AL as "Hal";
BRECVEMA). Add a word there, not in the line.

## Delivery: the voice

- Piper, through the MOTHER bridge (`apps/instrument/mother/bridge.py`, `HAL_DELIVERY`):
  slower (length scale 1.15), an even contour (noise scales 0.55 and 0.5) and 0.45 s of
  silence after each sentence; `hal_delivery` in the bridge's local config overrides any
  of them. The voice model is chosen in the same config; the HAL 9000 imitation stays
  private and is never released (ISS-048).
- The browser's voice, when the bridge has none (`voice.js`): rate 0.88, pitch 0.55, a
  male voice where the system has one.
- A tour stop's own `pause` (seconds after the line) is the place for longer silences.
