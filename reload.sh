#!/bin/bash

UUID="gpanel@ziyaadsmada.github.com"
INSTALL_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "🔄 Reloading GPanel Extension..."

# Disable extension
gnome-extensions disable $UUID 2>/dev/null

# Copy files
echo "📦 Copying files..."
cp metadata.json "$INSTALL_DIR/" 2>/dev/null
cp extension.js "$INSTALL_DIR/" 2>/dev/null
cp stylesheet.css "$INSTALL_DIR/" 2>/dev/null
cp prefs.js "$INSTALL_DIR/" 2>/dev/null
cp schemas/org.gnome.shell.extensions.gpanel.gschema.xml "$INSTALL_DIR/schemas/" 2>/dev/null

# Compile schemas
echo "🔨 Compiling schemas..."
glib-compile-schemas "$INSTALL_DIR/schemas"

# Re-enable extension
echo "✅ Re-enabling extension..."
gnome-extensions enable $UUID

echo ""
echo "✨ Extension reloaded! You may need to restart GNOME Shell:"
echo "  - On X11: Press Alt+F2, type 'r', and press Enter"
echo "  - On Wayland: Log out and log back in"
