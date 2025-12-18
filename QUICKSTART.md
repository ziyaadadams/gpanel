# Quick Start Guide - GPanel

Get your macOS-style GNOME desktop running in 5 minutes!

## 🚀 Installation (3 steps)

### 1. Install the Extension

```bash
cd ~/Downloads  # or wherever you cloned the repo
git clone https://github.com/ziyaadsmada/gpanel.git
cd gpanel
./install.sh
```

### 2. Restart GNOME Shell

**On X11 (most desktop systems):**
1. Press `Alt` + `F2`
2. Type `r`
3. Press `Enter`

**On Wayland (newer systems/laptops):**
1. Log out
2. Log back in

### 3. Enable the Extension

```bash
gnome-extensions enable gpanel@ziyaadsmada.github.com
```

**Or** use GNOME Extensions app (GUI method).

---

## ⚙️ First Configuration (2 minutes)

### Open Settings

**Method 1: Terminal**
```bash
gnome-extensions prefs gpanel@ziyaadsmada.github.com
```

**Method 2: GUI**
1. Open "Extensions" app
2. Find "GPanel - MacOS Style Top Bar"
3. Click the settings gear icon ⚙️

### Quick Setup - Choose Your Style

#### Style 1: "Classic macOS" (Recommended)
1. **Panel Appearance**
   - Panel Height: `28`
   - Panel Opacity: `200`
   - Blur Effect: `ON`
   - Rounded Corners: `ON`
   - Corner Radius: `12`

2. **Panel Features**
   - Show Notch: `ON`
   - Show Traffic Lights: `ON`
   - Show App Menu: `ON`
   - Enable Global Menu: `OFF` (experimental)

3. **Dock**
   - Enable Dock: `ON`
   - Icon Size: `52`
   - Autohide: `OFF`
   - Icon Magnification: `ON`
   - Magnification Scale: `1.5`
   - Show Running Indicators: `ON`

#### Style 2: "Minimal Pro"
1. **Panel Appearance**
   - Panel Height: `24`
   - Panel Opacity: `150`
   - Blur Effect: `OFF`
   - Rounded Corners: `OFF`

2. **Panel Features**
   - Show Notch: `OFF`
   - Show Traffic Lights: `OFF`
   - Show App Menu: `ON`
   - Enable Global Menu: `OFF`

3. **Dock**
   - Enable Dock: `ON`
   - Icon Size: `40`
   - Autohide: `ON`
   - Icon Magnification: `OFF`
   - Show Running Indicators: `ON`

---

## 🎨 Test Your Setup

### Check the Panel
1. Look at the top of your screen
2. You should see:
   - Traffic lights (red/yellow/green) on the left
   - App name next to traffic lights
   - Clock in a notch (center)
   - System icons on the right

### Check the Dock
1. Look at the bottom of your screen
2. You should see:
   - Your favorite apps in a rounded container
   - Hover over icons to see magnification
   - Running apps have dots underneath
   - App grid icon on the right (after separator)

### Test Interactions
- **Click traffic lights**: Control the focused window
- **Hover notch**: Watch it expand
- **Hover dock icons**: See magnification effect
- **Click dock icons**: Launch applications
- **Move cursor away from dock**: (If autohide ON) Watch it hide

---

## ❓ Troubleshooting

### Extension not showing?
```bash
# Check if it's enabled
gnome-extensions list --enabled | grep gpanel

# If not, enable it
gnome-extensions enable gpanel@ziyaadsmada.github.com
```

### Dock not visible?
1. Open settings
2. Check "Enable Dock" is ON
3. If autohide is ON, move cursor to bottom of screen

### Panel looks wrong?
1. Open settings
2. Click "Reset to defaults" (if available)
3. Or manually adjust opacity and height

### Blur not working?
- This is normal on some systems
- Try disabling blur and adjusting opacity instead

### Want to remove it?
```bash
gnome-extensions disable gpanel@ziyaadsmada.github.com
gnome-extensions uninstall gpanel@ziyaadsmada.github.com
```

---

## 🎯 Next Steps

### Customize Further
- Read [FEATURES.md](FEATURES.md) for all options
- Experiment with different settings
- Try the preset configurations

### Make it Perfect
1. **Match your wallpaper**: Adjust opacity
2. **Coordinate themes**: Use GNOME Tweaks
3. **Add favorites**: Pin your most-used apps
4. **Try keyboard shortcuts**: `Super + A` for app grid

### Share & Contribute
- Take a screenshot and share your setup!
- Report bugs on GitHub
- Suggest new features
- Contribute improvements

---

## 📚 Learn More

- **Full Documentation**: [README.md](README.md)
- **All Features**: [FEATURES.md](FEATURES.md)
- **Updates**: [CHANGELOG.md](CHANGELOG.md)

---

## 💬 Need Help?

1. Check [FEATURES.md](FEATURES.md) troubleshooting section
2. Look at GitHub issues
3. Open a new issue with:
   - Your GNOME version
   - Screenshot
   - Error logs (if any)

---

**Enjoy your new macOS-style desktop! 🎉**

*Made with ❤️ for GNOME users who love macOS aesthetics*
