import Chat
import Chats

/-!
# Questions to the chats (USC iteration 1)

Run by `make -C sherlock chats`. The chats are private, so this file names them only by their
time stamps. The acceptance test of iteration 1: the model answers what grep answered on
27 Nov 2026 (USC, putting the models together, Einstein), for the chats of the Takeout of 27 Nov.
-/
open Chat

#eval s!"{Chats.all.length} chats, {(Chats.all.filter (·.read)).length} read, {(Chat.untriaged Chats.all).length} untriaged, {(Chats.all.foldl (· + ·.prompts.length) 0)} prompts"

/-- Is the chat with this time stamp among the chats about `k`? -/
def has (k stamp : String) : Bool := (Chat.about Chats.all k).any (·.2.startsWith stamp)

/-! What grep found on 27 Nov 2026, now asked of the model. -/
#eval Chat.about Chats.all "USC"
#eval Chat.threadsAbout Chats.all "CombineModels"
#eval Chat.threadsAbout Chats.all "EinsteinBacktest"
/-- Every time stamp in the list is among the chats about `k`. -/
def hasAll (k : String) (stamps : List String) : Bool := stamps.all (has k)

-- USC: grep found it in six chats of 18-26 Nov.
#guard hasAll "USC" ["20261118_215825", "20261120_140700", "20261121_171224", "20261122_173241", "20261124_002519", "20261126_140957"]
-- Putting the models together: the chat of 23 Nov (the history, 5 and 12 Jun, is the next iteration).
#guard hasAll "CombineModels" ["20261123_171439"]
-- Einstein: every new chat where the author named him; the backtest of 26 Nov.
#guard hasAll "Einstein" ["20260807_144000", "20261008_190711", "20261106_112758", "20261122_173241", "20261123_235038", "20261126_130508", "20261126_140957", "20261126_181207"]
#guard hasAll "EinsteinBacktest" ["20261126_140957"]

/-! What the model adds to grep: the open threads and the triage. -/
#eval s!"open threads (deferred or unexplored forks): {(Chat.openEnds Chats.all).length}"
#eval Chat.openEnds Chats.all
