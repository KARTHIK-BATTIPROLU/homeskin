<#
    .SYNOPSIS
    Deploy HOMSKIN to Vercel Production from PowerShell CLI.
#>

$env:PATH = "C:\Program Files\nodejs;C:\Users\akshi\AppData\Roaming\npm;" + $env:PATH
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -ErrorAction SilentlyContinue

Write-Host "========================================================" -ForegroundColor DarkCyan
Write-Host "      HOMSKIN - Auto Deploy to Vercel Production       " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor DarkCyan
Write-Host ""

& "C:\Users\akshi\AppData\Roaming\npm\vercel.cmd" --prod --yes
