# GPanel - macOS Style Top Bar for GNOME

Transform your GNOME desktop into a beautiful macOS-like experience! GPanel brings the elegance of macOS to your Linux desktop with a feature-rich top bar, sleek dock, and extensive customization options.

## ✨ Features

### 🎨 Top Bar
- **macOS-style Traffic Lights** - Red, yellow, and green window control buttons
- **Dynamic Notch** - iPhone-style notch around the clock with smooth animations
- **App Menu** - Shows the current application name (just like macOS)
- **Global Menu Bar** - File, Edit, View, Window, Help menus (experimental)
- **Blur Effect** - Beautiful translucent panel with backdrop blur
- **Rounded Corners** - Customizable corner radius for a polished look
- **Adjustable Opacity & Height** - Make the panel exactly how you want it

### 🚀 Dock
- **Icon Magnification** - Smooth zoom effect on hover (adjustable scale)
- **Running App Indicators** - Subtle dots under active applications
- **Auto-hide** - Dock slides away when not needed
- **Favorite Apps** - Quick access to your pinned applications
- **App Grid Launcher** - Quick access to all applications
- **Customizable Icon Size** - From tiny to massive (24-128px)

### 🎯 Perfect for
- Users who love macOS aesthetics
- Anyone wanting a cleaner, more elegant GNOME experience
- Productivity enthusiasts who want quick app switching
- Designers and developers who appreciate beautiful UIs

## 📦 Installation

### Method 1: Using Install Script (Recommended)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/ziyaadsmada/gpanel.git
   cd gpanel
   ```

2. **Run the install script**
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

3. **Restart GNOME Shell**
   - On X11: Press `Alt + F2`, type `r`, and press Enter
   - On Wayland: Log out and log back in

4. **Enable the extension**
   ```bash
   gnome-extensions enable gpanel@ziyaadsmada.github.com
   ```

### Method 2: Manual Installation

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/gpanel@ziyaadsmada.github.com
cp -r * ~/.local/share/gnome-shell/extensions/gpanel@ziyaadsmada.github.com/
cd ~/.local/share/gnome-shell/extensions/gpanel@ziyaadsmada.github.com/
glib-compile-schemas schemas/
```

Then restart GNOME Shell and enable the extension.

## ⚙️ Configuration

Open the extension preferences:
```bash
gnome-extensions prefs gpanel@ziyaadsmada.github.com
```

Or use GNOME Extensions app (recommended).

### Available Settings

#### Panel Appearance
- **Panel Height** (20-60px) - Default: 32px
- **Panel Opacity** (0-255) - Default: 200
- **Blur Effect** - Enable/disable backdrop blur
- **Rounded Corners** - Add rounded bottom corners
- **Corner Radius** (0-24px) - Default: 12px

#### Panel Features
- **Show Notch** - iPhone-style notch around clock
- **Notch Width** (100-300px) - Default: 160px
- **Show Traffic Lights** - Window control buttons
- **Show App Menu** - Current application name
- **Enable Global Menu** - File, Edit, etc. menus (experimental)

#### Dock
- **Enable Dock** - Show/hide the dock
- **Icon Size** (24-128px) - Default: 48px
- **Autohide Dock** - Hide when not in use
- **Icon Magnification** - Zoom effect on hover
- **Magnification Scale** (1.0-2.5x) - Default: 1.5x
- **Show Running Indicators** - Dots under active apps

## 🎨 Customization Tips

### For a True macOS Look
1. Set **Panel Height** to 26-28px
2. Enable **Blur Effect** and **Rounded Corners**
3. Set **Corner Radius** to 10-12px
4. Enable **Traffic Lights**, **Notch**, and **App Menu**
5. Set **Dock Icon Size** to 48-56px
6. Enable **Icon Magnification** with scale 1.5x

### For a Minimal Look
1. Disable **Notch** and **Traffic Lights**
2. Set **Panel Opacity** to 100-150
3. Disable **Rounded Corners**
4. Set **Dock Icon Size** to 32-40px
5. Disable **Icon Magnification**

### For Maximum Performance
1. Disable **Blur Effect**
2. Disable **Icon Magnification**
3. Disable **Global Menu**

## 🐛 Troubleshooting

### Extension doesn't load
- Check GNOME Shell version compatibility (40-48 supported)
- Make sure schemas are compiled: `glib-compile-schemas schemas/`
- Check logs: `journalctl -f -o cat /usr/bin/gnome-shell`

### Dock not showing
- Make sure "Enable Dock" is turned on in preferences
- Check if autohide is enabled (move cursor to bottom of screen)
- Restart GNOME Shell

### Blur effect not working
- Blur effects may not work on all systems/hardware
- Try adjusting opacity instead

### Panel looks weird
- Reset settings to default in preferences
- Restart GNOME Shell

## 🔧 Compatibility

- **GNOME Shell**: 40, 41, 42, 43, 44, 45, 46, 47, 48
- **Tested on**: Ubuntu 22.04+, Fedora 36+, Arch Linux, Pop!_OS 22.04+

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

MIT License - Feel free to use and modify as needed.

## 🙏 Acknowledgments

Inspired by:
- macOS Big Sur, Ventura & Sonoma design
- MyDockFinder extension concept
- GNOME Shell extension developers community

## 📧 Support

For bugs and feature requests, please open an issue on GitHub.

---

**Enjoy your beautiful new GNOME desktop! 🎉**
