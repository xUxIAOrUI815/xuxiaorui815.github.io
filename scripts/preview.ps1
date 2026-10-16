param([int]$Port = 1313)
$ErrorActionPreference = 'Stop'
$blogRoot = Split-Path $PSScriptRoot -Parent
$hugoCommand = Get-Command hugo -ErrorAction SilentlyContinue
if ($hugoCommand) {
    $hugoExecutable = $hugoCommand.Source
} else {
    $hugoExecutable = Join-Path (Split-Path $blogRoot -Parent) '.tools\hugo-0.168.0\hugo.exe'
}
if (-not (Test-Path -LiteralPath $hugoExecutable)) {
    throw 'Install Hugo Extended 0.168.0 and add it to PATH. See README.md.'
}
Push-Location $blogRoot
try {
    & $hugoExecutable server -D --bind 127.0.0.1 --port $Port
    if ($LASTEXITCODE -ne 0) { throw "Hugo exited with code $LASTEXITCODE" }
} finally {
    Pop-Location
}
