import Issue
import Issues

/-!
# Questions to U's issues (USC; ISS-126)

What `grep ISSUES.md` did, from the model. Guards for the rules that hold (they fail the build if
the file breaks them); `#eval` for the findings, the issues' loose ends.
-/

open Issue

-- The model holds what the file holds.
#guard Issues.all.length == 126
#guard (Issue.find Issues.all 126).map (·.status) == some Status.inProgress
#guard Issue.parseRef "ISS-126 (the bait)" == some 126

-- The rules. A closed issue keeps no empty box (as bin/issues-check).
#guard Issues.all.all Issue.settled

-- Counts by status.
#eval [("open", (Issues.all.filter (·.status == .open_)).length),
       ("in progress", (Issues.all.filter (·.status == .inProgress)).length),
       ("parked", (Issues.all.filter (·.status == .parked)).length),
       ("someday", (Issues.all.filter (·.status == .someday)).length),
       ("closed", (Issues.all.filter (·.status == .closed)).length)]

-- Findings: rules the fields break.
-- Closed without an end date: 28 on 27 Nov, the issues from before the fields (ISS-001 to 036, 077, 088).
#eval (Issues.all.filter (!·.ended)).map (·.id)
#eval (Issues.all.filter (!·.started)).map (·.id)      -- in progress without a start date
#eval (Issues.all.filter (!·.tagsKnown Issues.vocabulary)).map fun i => (i.id, i.tags)
#eval dangling Issues.all                              -- (issue, a reference to no issue)

-- Loose ends: live issues with every box settled (close them, or give them a next step).
#eval (Issues.all.filter (·.readyToClose)).map fun i => (i.id, i.title)

-- The author's desk: open AUTHOR steps in live issues.
#eval (Issues.all.filter (·.live)).flatMap fun i => (i.desk).map fun t => (i.id, t.line, t.text.take 90)
