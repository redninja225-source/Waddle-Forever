#!/bin/bash
# Waddle Forever - standalone server launcher
cd "$(dirname "$0")"

# Keep all user data (penguins, settings.json, mods) in this folder
touch .uselocal
export WF_DATA_DIR="$(pwd)"

# Create a starter settings.json if none exists (port 4004)
if [ ! -f settings.json ]; then
    HOSTIP=$(hostname -I 2>/dev/null | awk '{print $1}')
    if [ -n "$HOSTIP" ]; then
        echo "{\"server_port\": 4004, \"server_host\": \"$HOSTIP\", \"game_mode\": \"main\"}" > settings.json
        echo "Created settings.json advertising $HOSTIP on port 4004."
    else
        echo '{"server_port": 4004, "game_mode": "main"}' > settings.json
        echo "Created settings.json on port 4004. Set \"server_host\" in it to your LAN IP or domain so remote players can connect."
    fi
fi

# Prefer a prebuilt server binary if one exists (no Node.js needed)
for f in dist/WaddleForeverServer*; do
    if [ -f "$f" ] && [ "${f%.exe}" = "$f" ]; then
        echo "Starting $f ..."
        chmod +x "$f"
        exec "./$f"
    fi
done

if ! command -v node >/dev/null 2>&1; then
    echo ""
    echo "Node.js is not installed on this machine."
    echo "Install version 20 or newer, then run this script again."
    exit 1
fi

if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    if command -v yarn >/dev/null 2>&1; then
        yarn install || exit 1
    else
        npm install || exit 1
    fi
fi

if [ ! -f src/server/game-data/package-info.ts ]; then
    echo "Generating package info..."
    if [ -d media/clothing ]; then
        npx tsx scripts/build-packages.ts || exit 1
    else
        echo 'export const PACKAGE_INFO = {clothing: new Set<string>()};' > src/server/game-data/package-info.ts
    fi
fi

if [ ! -f compiled/server/main.js ]; then
    echo "Building server..."
    npx tsc || exit 1
    npx tsc-alias || exit 1
fi

if [ ! -d media/default ]; then
    echo "WARNING: media/default is missing - the game will not work without the media folder."
    echo "If you downloaded a release instead of the repository, extract default.zip into media/default."
fi

exec node compiled/server/main.js
