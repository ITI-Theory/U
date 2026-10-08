# RC3 UAT session, 7 Oct 2026 (author)

Epic: ISS-047. Cleaned on 8 Oct; the raw notes are kept privately (Me/chats/Inbox).
Personal details are left out of this public copy.

## What I tested

A quick demo of the Soma Machine as it stands, to a non-specialist viewer who
had seen the original levels 1-5 before but not the newer ones. She flipped
through the levels twice. In an earlier session I had asked her to suggest a
topic for a new "test" book (or two or three papers) that does not come from me;
that is still open.

Her question: how could one person suddenly write 16 books? A fair question, and
a sign that the app conveys the scale of the programme.

## What worked

- Levels 1-20 viewed without problems.

## Problems found

- MOTHER starts with a local NotebookLM login, which only works for the author.
  Fine for a demo, unusable for anyone else.

## Ideas

1. **Where it came from.** Her question points to *Phase Dot*, the book that
   records how the programme was made. It is out of scope and hard to finish;
   this prompted a rethink.
2. **Cloud GPUs** (48 GB and more) are affordable and could change how the work
   is done. (Researched 8 Oct: ISS-048, parked for now.)
3. **The Soma Machine as the workstation.** It could replace the Android/Linux
   tablet setup: a prompt UI (exists: MOTHER chat), a shell to local or remote
   machines, Neovim, a file browser (through Neovim). On a tablet, open the app
   full screen in a browser. HAL installation on the tablets goes on hold; HAL
   stays useful for cloud machines. No Conky; perhaps the app can run lean
   enough to stand in for it.
4. **A local app server** for several screens (the laptop and three tablets
   showing one web app), rather than relying on the cloud.
5. **A fractal journey** through each level (see 7).
6. **MOTHER as a chain.** Adding H-AL, compare mode and more makes MOTHER look
   like the LangChain-style design documented in the chats; it needs a stronger
   LLM behind it.
7. **Cockpit and HUD.** With more screens: a view out of a cockpit. The main HUD
   is Sherlock giving very concise feedback; the window shows a fractal journey
   through a landscape for the current level; a settings slider for effects
   (more FX, more polish). Models: flight simulators, SpaceEngine, *Fantastic
   Voyage* (size), *The Time Machine* (time), Doctor Who (time and place). It
   must stay abstract. Pokes (user sources) must work so their effect is
   visible. Historical views show the world at that time and level: mountains
   as in *2001: A Space Odyssey*, towers of code as in *Hackers*.
8. **Sherlock.** Build the neuro-symbolic checker for [T]-Theory. In functional
   programming there are data and types; in RDF there are data and OWL. Map OWL
   classes to Lean types (more in the chats).
9. **Autopilot, corrected.** The Autopilot prompt was meant for speech-to-text:
   the AI always repeats back what it understood before acting, and a planned
   task must be armed before it is confirmed.
10. **Engine room.** One clean, fun view in the app for all system settings.
11. **MOTHER follows a wandering chat.** When each message half-finishes the
    last and adds a new angle, MOTHER sorts it out with Sherlock: each time the
    chat goes off course, log the departure and tag it, so the chat becomes a
    path that can be viewed, revisited and continued, like branches in git. In
    the cockpit view, go back and steer into another version. Sound effects
    would be good.
12. **Bulk sorting.** Dump files onto a GPU and let it help sort them.
13. **HAL's private knowledge.** Add the AJ wiki, saved links and books to the
    private HAL, with a switch per source to leave some out.
