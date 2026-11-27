import App
import AppAudit

/-!
# The visual audit's findings (USC; ISS-127)

Errors first (what leaks, what is missing), then where the screenshot and the page disagree. Run by
`make -C sherlock app-audit`.
-/

open App AppAudit

#guard !observations.isEmpty
#guard observations.all rendersAsked
-- Errors: a layer that is off shows on screen (soundness), and what should show is not seen (completeness).
#eval observations.filterMap fun o => let l := leaks forbidden o; if l.isEmpty then none else some (o.level, o.dim, l)
#eval observations.filterMap fun o => let m := missing rules omissions o; if m.isEmpty then none else some (o.level, o.dim, m)
-- Warnings: the boxes disagree.
#eval observations.filterMap fun o => let c := canvasOnly o; if c.isEmpty then none else some (o.level, o.dim, "drawn, not in the page", c)
#eval observations.filterMap fun o => let u := unseen o; if u.isEmpty then none else some (o.level, o.dim, "in the page, not readable", u)
-- The deliberate omissions, each with its reason (26 Nov: "if I left something out deliberately that has to be tagged").
#eval omissions.map fun o => (o.level, o.dim, o.label, o.reason)
-- Summary: screens with a leak, and screens complete once the omissions are counted.
#eval ((observations.filter fun o => !ScreenSound forbidden o).length, (observations.filter fun o => ScreenComplete rules omissions o).length, observations.length)
