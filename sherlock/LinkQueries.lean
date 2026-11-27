import Links

/-!
# The linker's questions: the models put together (USC; ISS-126)

The 23 Nov design ("put the document models together, directly or through a core"), directly first: one
graph of papers, issues, chats and the method's rows, with only the edges the sources state. Built by
`make -C sherlock links`.
-/

open Links

def ids : List String := nodes.map (·.2)
def kind (k : String) : List String := (nodes.filter (·.1 == k)).map (·.2)
def touched : List String := (edges.map (·.1) ++ edges.map (·.2.1)).eraseDups

-- Every edge lands on a node.
#guard edges.all fun e => ids.contains e.1 && ids.contains e.2.1
#eval [("papers", (kind "paper").length), ("issues", (kind "issue").length), ("chats", (kind "chat").length),
       ("rows", (kind "row").length), ("edges", edges.length)]
-- Papers no issue, chat or row links to.
#eval (kind "paper").filter fun p => !touched.contains p
-- How many chats reach an issue (routed or tagged), and how many issues are reached from a chat.
#eval ((edges.filter fun e => (kind "chat").contains e.1).map (·.1)).eraseDups.length
#eval ((edges.filter fun e => (kind "chat").contains e.1).map (·.2.1)).eraseDups
-- The most linked issues.
#eval (((kind "issue").map fun i => (i, (edges.filter fun e => e.1 == i || e.2.1 == i).length)).filter (·.2 ≥ 25))
