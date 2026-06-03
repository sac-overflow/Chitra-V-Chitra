@echo off
title Chitra Vichitra Events - Dev Server
set "PROJECT=C:\Users\sachh\Desktop\CVC\chitra-vichitra-events"
echo.
echo  Chitra Vichitra Events
echo  Starting dev server (runs from path without # in folder name)...
echo.
cd /d "%PROJECT%"
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
start http://localhost:5173/
call npm run dev
pause
