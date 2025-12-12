# GPanel

A GNOME extension that transforms the top bar into a MacOS-like bar with notch animations.

## Features
- **MacOS-style Top Bar**: Transparent/Translucent background.
- **Dynamic Notch**: The center clock is styled as a notch that expands on hover (Dynamic Island style).
- **Clean Aesthetics**: Simplified button styles.

## Installation

1. Run the install script:
   ```bash
   ./install.sh
   ```
2. Restart GNOME Shell:
   - **Wayland**: Log out and log back in.
   - **X11**: Press `Alt` + `F2`, type `r`, and press `Enter`.
3. Enable the extension:
   ```bash
   gnome-extensions enable gpanel@ziyaadsmada.github.com
   ```

## Notes
- This extension focuses on the **Top Bar** and **Notch**.
- For a full MacOS experience, we recommend using **Dash to Dock** (for the dock) and **Fildem Global Menu** (for the application menu).
