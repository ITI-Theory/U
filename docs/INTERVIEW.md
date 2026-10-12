# The composer's interview: setting the knobs from your own answers

The protocol for ISS-053, the externalising machine. A person writes the story of their
film by hand (at most ten A5 pages, note style); an interviewer asks; the person's own
answers set the score's knobs. The interviewer may be an AI, a therapist, or both: the
script is the same. **The person is the composer. The interviewer asks and reflects; it
never authors, interprets or diagnoses.** Status: a draft for the author's review; not a
clinical protocol, and not therapy by itself.

## Before: safety and consent

1. Say what this is: "We will turn your pages into a score you can see and change. I will
   ask; you decide every value. You can stop at any time, and nothing is kept unless you
   say so."
2. Agree a stop word, and that "I don't know" is a full answer.
3. Ground first, before any deep question: the room, the chair, the breath; one minute.
   If the person is already distressed, do not begin (stop rules, below).
4. Privacy: pages, answers and the score stay in the person's private store (for the
   author: `Me/`, never `U/`); a score is shared only by the person's choice.

## The five questions (The Tensor, "Composing with the Score")

Each question is asked of the person's own pages, with their words quoted back. Each
answer sets named values; the right column is what the answer writes.

| # | Question, as asked | Sets |
|---|---|---|
| 1 | **Which feelings carry this story?** "Reading your pages, which of these are the main ones: safety, fear, curiosity, awe, grief, words, the wordless? Any I have missed?" | the mode mask (`km`) and, for music, which of the 13 categories (Cowen et al.) are live |
| 2 | **What is the arc?** "Where does it start, how does it change, where does it end, for each of those? Draw it with your finger if words do not come." | the keyframes of each mode over story-time |
| 3 | **Where are the turning points?** "Is there a moment after which nothing is the same? Where on the pages is it?" | the thresholds (`t`, and which mode crosses) |
| 4 | **How deep does it go?** "At the deepest point, how far down: a dip, a long way, or as far as it goes?" | depth `κd`, and how long a threshold holds |
| 5 | **Where does it come back to?** "At the end, are you back where you started, or somewhere else? What is different?" | the return basin: a round trip, or a reorganised return |

Probes, one at a time and only from the person's words: "You wrote 'the river narrowed':
is that fear, curiosity, or something else?" "When you say that, what do you notice in your
body?" (the Gestalt question, *what are you feeling now, as you say that?*). Offer at most
two candidate names, and always "or something else". Never supply a feeling the person has
not reached for.

## Provenance: every value has a sentence

Each value the interview writes carries the answer it came from:

```yaml
keyframes:
  - t: 0.52
    F: 0.7
    because: "p. 6: 'the river narrowed and I could not see the bank' (answer 3, 21:14)"
```

The person sees every value next to its sentence, can change any of them, and a changed
value records "set by hand". The score's front matter names the author (the person), the
interviewer (AI, therapist, or both) and the date. An interviewer's proposal that the
person did not accept is not written.

## Stop rules

Stop the interview, return to grounding (step 3) and offer to end when any of these occur:

- the person says the stop word, or asks to stop, or goes silent for long after a deep
  question;
- signs of overwhelm: shaking, tears that do not ease, breath that does not settle, a
  rising heart that keeps rising (with a strap: Ḣ above about 0.5 bpm/s for more than
  a minute, the same signal the film uses to slow down);
- dissociation: "I'm not here", a fixed stare, answers that drift away from the question;
- any mention of harm to self or others: stop, and follow the therapist's or local
  emergency procedure; an AI interviewer says plainly that it cannot help with this and
  gives the local emergency number.

An AI interviewer does not decide that a person is safe to go deeper; depth (question 4)
is asked only after the person has said, in their words, that they want to.

## After

Show the whole score: the curves, the turning points, the return. Ask one last question:
"Is this your film?" Play it once at low depth (`κd` 0.3) before any full viewing. Keep
the pages, the answers and the score where the person chose.

## For an AI interviewer (system rules)

1. Ask only the five questions and probes built from the person's words; one question at
   a time; wait.
2. Quote, do not paraphrase into feelings: "you wrote ..." not "you felt ...".
3. Never interpret, diagnose, reassure about outcomes, or name a feeling first.
4. Every value written has its sentence; nothing else is written.
5. Follow the stop rules before anything else.

References: The Tensor ("Composing with the Score"); ISS-053 and H-AL's answer
(`uat/RC3/hal-externalising-2026-10-10.md`); Cowen and Keltner (PNAS 2017, 27 categories
in video); Cowen et al. (PNAS 2020, 13 in music).
