#!/bin/bash

# GPanel Installation Verification Script
# Run this to check if everything is properly installed

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

UUID="gpanel@ziyaadsmada.github.com"
INSTALL_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "🔍 GPanel Installation Verification"
echo "===================================="
echo ""

# Check if extension is installed
echo -n "Checking if extension is installed... "
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${GREEN}✓ Found${NC}"
else
    echo -e "${RED}✗ Not found${NC}"
    echo "Run ./install.sh to install"
    exit 1
fi

# Check required files
echo ""
echo "Checking required files:"
FILES=("metadata.json" "extension.js" "prefs.js" "stylesheet.css")
for file in "${FILES[@]}"; do
    echo -n "  - $file... "
    if [ -f "$INSTALL_DIR/$file" ]; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
    fi
done

# Check schema
echo -n "  - schemas/gschemas.compiled... "
if [ -f "$INSTALL_DIR/schemas/gschemas.compiled" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "    Run: glib-compile-schemas $INSTALL_DIR/schemas/"
fi

# Check if extension is enabled
echo ""
echo -n "Checking if extension is enabled... "
if gnome-extensions list --enabled | grep -q "$UUID"; then
    echo -e "${GREEN}✓ Enabled${NC}"
else
    echo -e "${YELLOW}⚠ Not enabled${NC}"
    echo "  Run: gnome-extensions enable $UUID"
fi

# Check GNOME Shell version
echo ""
echo -n "Checking GNOME Shell version... "
GNOME_VERSION=$(gnome-shell --version | grep -oP '\d+\.\d+' | cut -d. -f1)
if [ "$GNOME_VERSION" -ge 40 ] && [ "$GNOME_VERSION" -le 48 ]; then
    echo -e "${GREEN}✓ $GNOME_VERSION (Compatible)${NC}"
else
    echo -e "${YELLOW}⚠ $GNOME_VERSION (May not be compatible)${NC}"
    echo "  GPanel supports GNOME 40-48"
fi

# Summary
echo ""
echo "===================================="
echo "Summary:"
echo ""

if [ -d "$INSTALL_DIR" ] && [ -f "$INSTALL_DIR/schemas/gschemas.compiled" ]; then
    echo -e "${GREEN}✓ Installation looks good!${NC}"
    echo ""
    if ! gnome-extensions list --enabled | grep -q "$UUID"; then
        echo "Next steps:"
        echo "  1. Enable extension: gnome-extensions enable $UUID"
        echo "  2. Restart GNOME Shell (Alt+F2, type 'r', Enter)"
        echo "  3. Configure: gnome-extensions prefs $UUID"
    else
        echo "Extension is installed and enabled!"
        echo ""
        echo "To configure:"
        echo "  gnome-extensions prefs $UUID"
    fi
else
    echo -e "${RED}✗ Installation incomplete${NC}"
    echo ""
    echo "Please run ./install.sh to fix issues"
fi

echo ""
