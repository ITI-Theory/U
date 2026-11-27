import Tag
import Tags
import Issue
import Issues

/-!
# Questions to the tags (USC; ISS-126)

The {{usc:...}} tags in the originals (the chats, ISSUES.md), joined to U's issues. A broken reference fails
the build; what is not yet triaged is listed, class by class (errors first, then warnings).
-/

open Tag

-- Errors: every issue a tag points to exists.
#guard (classed Tags.all).all fun t => t.ref.isEmpty || (Issue.parseRef t.ref).all fun n => (Issue.find Issues.all n).isSome
-- Counts by class: (class, all, triaged).
#eval classes.map fun c => (c, (ofClass c Tags.all).length, ((ofClass c Tags.all).filter (·.triaged)).length)
-- Warnings: what is not yet triaged, by class (file, line, note).
#eval classes.map fun c => (c, ((ofClass c Tags.all).filter (!·.triaged)).map fun t => (t.file, t.line, t.note))
-- By issue: what each issue has taken from the chats.
#eval ((classed Tags.all).filter (·.triaged)).map fun t => (t.ref, t.status, t.id)
-- Open branches and wildcard jumps.
#eval ((counterfactuals Tags.all).length, (wildcards Tags.all).length)
