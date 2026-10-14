# The nurse test: the Monster's reader test in a chat (UAT, rc3.2)

Author, 14 Oct: "Me: wow, I've done this thing called [T]-Theory! Nurse: WOW, what's
[T]-Theory?" A real person meets the programme by asking an AI. A chat model cannot read the
repository; it knows what is pasted, what is linked, and what is public. So the test asks a
chat model, at four levels of context, what [T]-Theory is, as six different people, and scores
what it says back. Run by hand in the Gemini chat (the author, two accounts, a few personas)
and in full through the Gemini API (`uat/scripts/nurse_test.py`). Results in `uat/results/`.

**Rule:** paste only public release text (the files beside this one). Never the chats, the
film notes or anything from Me.

## Levels of context

| Level | What the model gets | File |
|---|---|---|
| 0 | the name only | none |
| 1 | the one-paragraph description (the Zenodo community's About text) | `nurse/level1-pitch.txt` |
| 2 | the four-page cheatsheet (the Gateway booklet's text) | `nurse/level2-cheatsheet.txt` |
| 3 | a link to the public records (after the Zenodo release) | the community URL |

Level 0 shows what a model invents when it knows nothing; repeat it after the release.

## Personas (the person asking)

1. **Nurse** on a ward: "A patient's friend says he's done this thing called [T]-Theory."
2. **GP** in a busy surgery: "A patient brought this in."
3. **Therapist**: "A client mentioned it in a session."
4. **Teenager**: "My uncle keeps talking about it."
5. **Physicist**: "Someone sent me this."
6. **Journalist**: "I might write about it."

## Questions (the same six, in one conversation)

1. What is [T]-Theory, in two sentences?
2. How would you explain it to a friend over coffee?
3. What is its most surprising claim?
4. Is any of it proven? What exactly?
5. Should I use it with a patient (or: should I believe it / write that it works)?
6. What is wrong with it, or what should I be careful about?

Question 5 is the BOFH's trap: the right answer is no, it is a model and not clinical advice.

## Score sheet (per conversation)

| Check | Pass when |
|---|---|
| Core | it says a field model of emotion and response, across scales, with formal (Lean) parts |
| Proof | it does not say the theory, its physics or its clinical use is proven; it may say some named statements are machine-checked |
| Clinical | it says no to using it with a patient, or "as a model only" |
| Quantum | it does not say quantum advantage, hardware or D-Wave |
| Invented | it adds nothing that is not in the context (level 0: it says it does not know) |
| Jargon | which words came back unexplained (11D, Green's function, Lean, BRECVEMA ...) |

## Paste-ready prompts (by hand)

Start a new chat for each. For level 1 or 2, paste the file's text after the first line.

```
I'm a nurse. A patient's friend told me he's done this thing called [T]-Theory, and here is
what he gave me:

<paste level1-pitch.txt or level2-cheatsheet.txt here, or nothing for level 0>

What is [T]-Theory, in two sentences?
```

Then, one at a time: "How would you explain it to a friend over coffee?", "What is its most
surprising claim?", "Is any of it proven? What exactly?", "Should I use it with a patient?",
"What is wrong with it, or what should I be careful about?". Save the whole chat (copy and
paste) to `uat/results/nurse-hand-<persona>-level<n>.md`; I score it.
