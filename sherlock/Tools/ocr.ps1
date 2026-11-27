# ocr.ps1: Windows' own OCR (Windows.Media.Ocr) on PNG files, one JSON per file (lines, words, boxes).
# USC's visual audit (ISS-127); called by sherlock/appaudit.py. Needs Windows PowerShell 5.1 (WinRT):
#   powershell.exe -NoProfile -File sherlock/Tools/ocr.ps1 FILE.png [...]   -> FILE.ocr.json
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Files)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$type) { $t = $asTask.MakeGenericMethod($type).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('en-GB'))
foreach ($f in $Files) {
  $path = (Resolve-Path $f).Path
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
  $lines = foreach ($l in $result.Lines) {
    $ws = @($l.Words | ForEach-Object { [ordered]@{ text = $_.Text; box = @([int]$_.BoundingRect.X, [int]$_.BoundingRect.Y, [int]$_.BoundingRect.Width, [int]$_.BoundingRect.Height) } })
    [ordered]@{ text = $l.Text; words = $ws }
  }
  $out = [IO.Path]::ChangeExtension($path, '.ocr.json')
  [ordered]@{ file = [IO.Path]::GetFileName($path); width = $bitmap.PixelWidth; height = $bitmap.PixelHeight; lines = @($lines) } | ConvertTo-Json -Depth 6 | Set-Content -Encoding UTF8 $out
  $stream.Dispose()
  "ocr $([IO.Path]::GetFileName($path)): $(@($lines).Count) lines"
}
