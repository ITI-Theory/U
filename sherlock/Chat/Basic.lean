/-!
# A chat, as Sherlock reads it

The Universal Semantic Compiler's model of a chat (USC, iteration 1). The design is the
author's, in his AI Mode chats of 20-26 Nov 2026: a chat is one realised path through his
prompts; the assistant's offers and the threads the chat opens are kept, each with what
became of it (23 Nov: pursued, deferred, drifted, an unexplored fork). A chat is triaged when
every thread is routed: implemented, queued (an issue), parked or discarded (20 Nov: "each chat
file would generally fail unless at the end there was some notes on what was discarded and
what done").

The chats are private: the modules `Chats.*` are generated from `Me/chats` and the chats'
affidavits into `bld/sherlock/lean` and never committed (`make -C sherlock chats`).
-/
namespace Chat

/-- What became of a thread (the chats' own words, 23 Nov 2026). -/
inductive Status where
  | pursued | deferred | drifted | unexploredFork
  deriving Repr, DecidableEq, BEq

/-- Where a thread went (20 Nov 2026). -/
inductive Disposition where
  | implemented (ref : String)
  | queued (issue : String)
  | parked
  | discarded (reason : String)
  | untriaged
  deriving Repr, DecidableEq, BEq

/-- One of the author's prompts: its place in the chat file and its words. -/
structure Prompt where
  index : Nat
  time : String
  line : Nat
  text : String
  deriving Repr

/-- A follow-up the assistant offered in its answer to prompt `after`. -/
structure Offer where
  after : Nat
  text : String
  deriving Repr

/-- A thread of the chat, as the LLM pass read it (the chat's affidavit). -/
structure Thread where
  id : String
  topic : String
  status : Status
  prompts : List Nat
  disposition : Disposition
  concepts : List String
  deriving Repr

structure Chat where
  file : String
  date : String
  source : String
  account : String
  summary : String
  concepts : List String
  prompts : List Prompt
  offers : List Offer
  threads : List Thread
  /-- Has the LLM pass read the chat (does it have an affidavit)? -/
  read : Bool
  deriving Repr

namespace Thread
def triaged (t : Thread) : Bool := t.disposition != .untriaged
def isOpen (t : Thread) : Bool := t.status == .unexploredFork || t.status == .deferred
end Thread

namespace Chat
/-- Read, and every thread routed. -/
def triaged (c : Chat) : Bool := c.read && c.threads.all Thread.triaged
def openThreads (c : Chat) : List Thread := c.threads.filter Thread.isOpen
def mentions (c : Chat) (k : String) : Bool :=
  c.concepts.contains k || c.threads.any (·.concepts.contains k)
end Chat

end Chat
