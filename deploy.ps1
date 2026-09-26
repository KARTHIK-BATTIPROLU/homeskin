<#
    .SYNOPSIS
    Deploy HOMSKIN to Vercel Production from PowerShell CLI.
#>

$env:PATH = "C:\Program Files\nodejs;$env:APPDATA\npm;" + $env:PATH
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -ErrorAction SilentlyContinue

Write-Host "========================================================" -ForegroundColor DarkCyan
Write-Host "      HOMSKIN - Auto Deploy to Vercel Production       " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor DarkCyan
Write-Host ""

if (Get-Command vercel -ErrorAction SilentlyContinue) {
    vercel --prod --yes
} elseif (Test-Path "$env:APPDATA\npm\vercel.cmd") {
    & "$env:APPDATA\npm\vercel.cmd" --prod --yes
} else {
    npx --yes vercel --prod --yes
}
