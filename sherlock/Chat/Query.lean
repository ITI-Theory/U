import Chat.Basic

/-!
# Questions to the chats

What grep answered by searching the words, the model answers from what the chats were read to
say: which chats are about a concept, which threads, and what is still open or untriaged.
-/
namespace Chat

/-- The chats about a concept, as (date, file). -/
def about (cs : List Chat) (k : String) : List (String × String) :=
  (cs.filter (·.mentions k)).map fun c => (c.date, c.file)

/-- The threads about a concept, as (date, file, thread topic). -/
def threadsAbout (cs : List Chat) (k : String) : List (String × String × String) :=
  cs.flatMap fun c => (c.threads.filter (·.concepts.contains k)).map fun t => (c.date, c.file, t.topic)

/-- Every open thread (deferred or an unexplored fork), as (date, file, topic). -/
def openEnds (cs : List Chat) : List (String × String × String) :=
  cs.flatMap fun c => c.openThreads.map fun t => (c.date, c.file, t.topic)

/-- The chats that fail the triage: not read yet, or a thread not routed. -/
def untriaged (cs : List Chat) : List String :=
  (cs.filter (!·.triaged)).map (·.file)

end Chat
