@echo off
REM ============================================
REM  Waddle Forever - standalone server launcher
REM  Just double-click this on the server PC.
REM ============================================
cd /d "%~dp0"
title Waddle Forever Server

REM Keep all user data (penguins, settings.json, mods) in this folder
if not exist .uselocal type nul > .uselocal
set "WF_DATA_DIR=%~dp0"

REM Create a starter settings.json if none exists (port 4004)
if not exist settings.json (
    echo {"server_port": 4004, "game_mode": "main"}> settings.json
    echo.
    echo Created settings.json - the server will run on port 4004.
    echo To let other players connect, edit settings.json and set
    echo "server_host" to this machine's LAN IP or your domain, e.g.:
    echo    {"server_port": 4004, "server_host": "192.168.1.50", "game_mode": "main"}
    echo.
)

REM --- Prefer a prebuilt server binary if one exists (no Node.js needed) ---
for %%f in (dist\WaddleForeverServer*.exe) do (
    echo Starting %%f ...
    "%%f"
    goto :done
)

REM --- Otherwise run from source with Node.js ---
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo Node.js is not installed on this machine.
    echo Install it from https://nodejs.org ^(version 20 or newer^), then run this file again.
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Installing dependencies...
    where yarn >nul 2>nul
    if errorlevel 1 (call npm install) else (call yarn install)
    if errorlevel 1 goto :failed
)

if not exist src\server\game-data\package-info.ts (
    echo Generating package info...
    if exist media\clothing (
        call npx tsx scripts/build-packages.ts
    ) else (
        echo export const PACKAGE_INFO = {clothing: new Set^<string^>^(^)};> src\server\game-data\package-info.ts
    )
)

if not exist compiled\server\main.js (
    echo Building server...
    call npx tsc
    if errorlevel 1 goto :failed
    call npx tsc-alias
    if errorlevel 1 goto :failed
)

if not exist media\default (
    echo WARNING: media\default is missing - the game will not work without the media folder.
    echo If you downloaded a release instead of the repository, extract default.zip into media\default.
)

node compiled\server\main.js
goto :done

:failed
echo.
echo Something went wrong during setup. Check the errors above.
:done
pause
