# mother-beep.ps1: Copilot's "I'm done / I need you" call, in MOTHER's voice (author, 16 Oct:
# "can you try a MOTHER version?"). A 1979 ship's computer in the console's square-wave beeps: a
# data trill, then two rising bleeps; -Need adds a third, lower, a question. Windows only.
param([switch]$Need)
$r = [System.Random]::new()
for ($k = 0; $k -lt 9; $k++) { [console]::Beep(1400 + 220 * $r.Next(0, 8), 38) }
Start-Sleep -Milliseconds 90
[console]::Beep(2093, 90)
[console]::Beep(2637, 140)
if ($Need) { Start-Sleep -Milliseconds 120; [console]::Beep(1568, 220) }
