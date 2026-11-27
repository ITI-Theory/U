/-!
# U's issues as a model (USC; ISS-126)

ISSUES.md compiled, as the chats are: the issues, their boxes and the author's steps, with the
format's own rules (the header of ISSUES.md; `bin/issues-check` checks the first in Lua) as
functions. The data are generated (`sherlock/chats.py issues`, into bld/); the questions are in
`IssueQueries.lean`, and the join with the chats in `ChatQueries.lean`.
-/

namespace Issue

/-- The header's statuses. -/
inductive Status where
  | open_ | inProgress | onHold (trigger : String) | someday | parked | closed
  deriving Repr, DecidableEq

/-- A box: `[x]` done, `[-]` not done (superseded, moved, won't do), `[ ]` empty. -/
inductive Box where
  | done | dropped | empty
  deriving Repr, DecidableEq

structure Item where
  box : Box
  /-- The author's step (the item starts with AUTHOR). -/
  author : Bool
  /-- The parenthesised note before the text, usually the date: "(27 Nov)". -/
  note : String
  line : Nat
  text : String
  deriving Repr

structure Issue where
  id : Nat
  title : String
  status : Status
  tags : List String
  created : String
  start : String
  end_ : String
  epic : String
  line : Nat
  items : List Item
  /-- The other issues its body names (ISS-NNN). -/
  refs : List Nat
  deriving Repr

namespace Issue

/-- Checked every session (the header): OPEN and IN-PROGRESS. -/
def live (i : Issue) : Bool := i.status == .open_ || i.status == .inProgress

def emptyBoxes (i : Issue) : List Item := i.items.filter (·.box == .empty)

/-- The author's open steps. -/
def desk (i : Issue) : List Item := i.items.filter fun t => t.author && t.box == .empty

/-- Rule (header, `bin/issues-check`): a closed issue keeps no empty box. -/
def settled (i : Issue) : Bool := i.status != .closed || i.emptyBoxes.isEmpty

/-- Rule (the fields): a closed issue has an end date. -/
def ended (i : Issue) : Bool := i.status != .closed || !i.end_.isEmpty

/-- Rule (the fields): an issue in progress has a start date. -/
def started (i : Issue) : Bool := i.status != .inProgress || !i.start.isEmpty

/-- Rule (front matter): every tag is in the vocabulary. -/
def tagsKnown (vocab : List String) (i : Issue) : Bool := i.tags.all vocab.contains

/-- A loose end: live, with boxes, and none of them empty: ready to close, or to be given its next step. -/
def readyToClose (i : Issue) : Bool := i.live && !i.items.isEmpty && i.emptyBoxes.isEmpty

end Issue

def find (all : List Issue) (n : Nat) : Option Issue := all.find? (·.id == n)

/-- References to issues that do not exist. -/
def dangling (all : List Issue) : List (Nat × Nat) :=
  all.flatMap fun i => (i.refs.filter fun r => (find all r).isNone).map (i.id, ·)

/-- "ISS-126" and "ISS-126 (...)" as 126. -/
def parseRef (s : String) : Option Nat :=
  let cs := s.toList.dropWhile Char.isWhitespace
  if cs.take 4 == "ISS-".toList then (String.ofList ((cs.drop 4).takeWhile Char.isDigit)).toNat? else none

end Issue
