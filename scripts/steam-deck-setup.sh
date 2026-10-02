#!/usr/bin/env bash
# Waddle Forever — Steam Deck (SteamOS) installer
#
# Run this on the Deck in Desktop Mode (Konsole):
#   curl -fsSL https://raw.githubusercontent.com/redninja225-source/Waddle-Forever/main/scripts/steam-deck-setup.sh | bash
#
# It downloads the latest AppImage release into ~/Applications, makes it
# executable, and creates a menu entry so it can be added to Steam as a
# non-Steam game for Game Mode.
#
# After install, the app updates itself via GitHub releases — no need to
# re-run this script unless you want to reinstall.

set -euo pipefail

REPO="redninja225-source/Waddle-Forever"
DEST="$HOME/Applications/WaddleForever"
APPIMAGE="$DEST/WaddleForever.AppImage"
DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/waddle-forever.desktop"

echo "=== Waddle Forever — Steam Deck installer ==="

mkdir -p "$DEST" "$DESKTOP_DIR"

echo "Fetching latest release..."
URL="$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
  | grep -oE "https://[^\"]+\.AppImage" | head -n 1)"

if [ -z "$URL" ]; then
  echo "ERROR: No AppImage found in the latest GitHub release."
  echo "Make sure a release exists: https://github.com/${REPO}/releases"
  exit 1
fi

echo "Downloading: $URL"
curl -fSL --progress-bar "$URL" -o "$APPIMAGE"
chmod +x "$APPIMAGE"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=Waddle Forever
Comment=Singleplayer Club Penguin
Exec=${APPIMAGE}
Icon=waddle-forever
Type=Application
Categories=Game;
EOF

update-desktop-database "$DESKTOP_DIR" 2>/dev/null || true

echo
echo "Done! Installed to: $APPIMAGE"
echo
echo "To play in Game Mode:"
echo "  1. Switch back to Game Mode (or open Steam in Desktop Mode)"
echo "  2. Steam -> Library -> (plus) Add a Game -> Add a Non-Steam Game"
echo "  3. Check 'Waddle Forever' in the list and add it"
echo
echo "The game will update itself automatically when you publish a new"
echo "GitHub release on ${REPO}."
