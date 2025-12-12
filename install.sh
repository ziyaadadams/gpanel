#!/bin/bash

UUID="gpanel@ziyaadsmada.github.com"
INSTALL_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "Installing GPanel Extension..."

# Create directory
mkdir -p "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR/schemas"

# Copy files
cp metadata.json "$INSTALL_DIR/"
cp extension.js "$INSTALL_DIR/"
cp stylesheet.css "$INSTALL_DIR/"
cp prefs.js "$INSTALL_DIR/"
cp schemas/org.gnome.shell.extensions.gpanel.gschema.xml "$INSTALL_DIR/schemas/"

# Compile schemas
echo "Compiling schemas..."
glib-compile-schemas "$INSTALL_DIR/schemas"

echo "Extension installed to $INSTALL_DIR"
echo "Please restart GNOME Shell:"
echo "  - On Wayland: Log out and log back in."
echo "  - On X11: Press Alt+F2, type 'r', and press Enter."
echo ""
echo "Then enable the extension with:"
echo "  gnome-extensions enable $UUID"
