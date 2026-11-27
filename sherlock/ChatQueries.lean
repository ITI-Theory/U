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
#guard has "USC" "20261126_140957"
#guard has "CombineModels" "20261123_171439"
#guard has "EinsteinBacktest" "20261126_140957"
