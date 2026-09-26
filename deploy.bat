@echo off
setlocal
set PATH=C:\Program Files\nodejs;%APPDATA%\npm;%PATH%
echo ========================================================
echo       HOMSKIN - Auto Deploy to Vercel Production
echo ========================================================
echo.
echo Deploying static website to Vercel...
echo.
vercel --prod --yes
echo.
echo ========================================================
pause
