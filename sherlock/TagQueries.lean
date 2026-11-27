import Tag
import Tags
import Issue
import Issues

/-!
# Questions to the tags (USC; ISS-126)

The {{usc:...}} tags in the originals (the chats, ISSUES.md), joined to U's issues. Guards fail the build
when a tag breaks a rule; `#eval` lists what to look at.
-/

open Tag

-- Every idea is triaged where it was said, and every issue it is queued to exists.
#guard (ideas Tags.all).all (·.triaged)
#guard (ideas Tags.all).all fun t => t.ref.isEmpty || (Issue.parseRef t.ref).all fun n => (Issue.find Issues.all n).isSome
-- The ideas, by the issue that takes them.
#eval (ideas Tags.all).map fun t => (t.ref, t.id, t.note)
-- Open branches and wildcard jumps (none yet).
#eval ((counterfactuals Tags.all).length, (wildcards Tags.all).length)
