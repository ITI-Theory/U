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

/-! Iteration 2 (27 Nov): every chat in the Inbox read; the history asked of the model.
Passing mentions (a name in a joke) are not what a chat is about, so the model leaves them out. -/
-- Putting the models together, from the start: two models of the EMF (5 Jun), the federated Lean as one model (12 Jun).
#guard hasAll "CombineModels" ["20260605_204722", "20260612_184004", "20261123_171439"]
-- The tags' line of descent: {{Sherlock}}/{{Moriarty}} (13 May), {{Start X}}/{{End X}} (7 and 11 Aug), {{usc:...}} (26 Nov).
#guard hasAll "UscTags" ["20260513_190707", "20260807_120707", "20260811_182331", "20261126_140957"]
-- Einstein in the history: T-Theory's gravity and cosmological constant against his.
#guard hasAll "Einstein" ["20260605_204722", "20260612_184004", "20260807_144833", "20260812_202133", "20260818_163522", "20260818_175047", "20260908_174528", "20260928_223150"]
-- Sherlock's origin (the June brainstorms) and the chat model's (11 Aug: thoughts as code).
#guard hasAll "Sherlock" ["ShelockBS", "SherlockBS2"]
#guard hasAll "ChatModel" ["20260811_182331", "20261120_140700", "20261123_171439"]

/-! What the model adds to grep: the open threads and the triage. -/
#eval s!"open threads (deferred or unexplored forks): {(Chat.openEnds Chats.all).length}"
#eval Chat.openEnds Chats.all
