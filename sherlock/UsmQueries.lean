import Usm
import UsmData

/-!
# Questions to the USM model (USC; ISS-127)
-/

open Usm UsmData

-- The 4D start shows only physical rows, and none of them interpretive: the world as it is.
#guard (shown start4D rows).all fun r => r.row == "physical" && r.claim != "INTERPRETIVE"
-- Each step up the ladder only adds (visible_mono), and the top shows every row.
#guard (shown (ladder.getLast!) rows).length == rows.length
#eval ladder.map fun o => (o.dim, o.on, (shown o rows).length, ((shown o rows).filter (·.claim == "INTERPRETIVE")).length)
-- The app's start today, against the 4D start.
#eval (appDefault.dim, appDefault.on, (shown appDefault rows).length, ((shown appDefault rows).filter (·.claim == "INTERPRETIVE")).length)
-- The switches the page has.
#eval toggles
-- Coverage: the papers neither a level, a concept, a question nor a tour shows (what the documents claim that nothing shows).
def onScreen : List String := (papersShown rows ++ concepts.flatMap (·.2.2.2) ++ others.flatMap (·.2)).eraseDups
#eval s!"{onScreen.length} of {papers.length} papers on screen"
#eval (papers.filter fun p => !onScreen.contains p.1).map fun p => (p.1, p.2.1)
-- Interpretive concepts the Sherlock panel shows whatever the dimension (a 4D start would still show them).
#eval (concepts.filter fun c => c.2.1 != "" ).length
-- And the reverse: levels that cite no paper.
#eval ((rows.filter (·.papers.isEmpty)).map (·.level)).eraseDups
