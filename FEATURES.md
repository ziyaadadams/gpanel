# GPanel Features & Customization Guide

## 🎨 Complete Feature List

### Top Panel Features

#### 1. **Traffic Lights (Window Controls)**
Adds macOS-style colored buttons (red, yellow, green) to control windows:
- **Red**: Close window
- **Yellow**: Minimize window
- **Green**: Maximize/Unmaximize window

**Customization:**
- Toggle on/off in preferences
- Located on the left side of the panel
- Interactive hover effects

#### 2. **Dynamic Notch**
iPhone/MacBook-style notch around the clock:
- Smooth elastic animations on hover
- Customizable width (100-300px)
- Black background with rounded corners
- Can be toggled on/off

**Best Settings:**
- Width: 160px for standard monitors
- Width: 200px+ for ultrawide monitors

#### 3. **App Menu**
Displays the current active application name:
- Updates automatically when switching apps
- Shows "Desktop" when no window is focused
- macOS-style font weight and spacing

#### 4. **Global Menu (Experimental)**
Shows application menus (File, Edit, View, Window, Help):
- Currently displays static menu items
- Future: Will integrate with DBus for real app menus
- Can be toggled independently

#### 5. **Blur Effect**
Beautiful backdrop blur behind the panel:
- Uses CSS backdrop-filter
- Two modes: light blur and strong blur
- Performance impact varies by GPU

**Note:** May not work on all systems. Disable if you experience performance issues.

#### 6. **Rounded Corners**
Adds elegant rounded corners to the panel bottom:
- Adjustable radius (0-24px)
- Creates a floating panel effect
- Recommended: 10-12px for macOS look

#### 7. **Custom Height & Opacity**
Full control over panel appearance:
- **Height:** 20-60px (macOS default: 26px)
- **Opacity:** 0-255 (recommended: 180-220)

---

### Dock Features

#### 1. **Favorite Apps Integration**
Automatically displays your pinned applications:
- Syncs with GNOME favorites
- One-click app launching
- Persistent across sessions

#### 2. **Icon Magnification**
Smooth zoom effect when hovering over icons:
- **Scale:** 1.0x to 2.5x (default: 1.5x)
- Elastic animation
- Can be disabled for minimal style

**Recommended Settings:**
- Minimal: 1.2x
- macOS-like: 1.5x
- Dramatic: 2.0x

#### 3. **Running App Indicators**
Small dots appear under running applications:
- Updates in real-time
- Subtle white indicators
- Can be toggled on/off

#### 4. **Auto-hide**
Dock slides away when not needed:
- Appears on mouse hover
- Smooth slide animation
- 500ms delay before hiding

#### 5. **App Grid Launcher**
Quick access to all applications:
- Launches GNOME overview
- Separated by divider
- Always visible

#### 6. **Custom Icon Size**
Adjustable from tiny to huge:
- **Range:** 24-128px
- **Recommended:**
  - Small: 32-40px
  - Medium: 48-56px (macOS default)
  - Large: 64-80px

---

## 🎯 Preset Configurations

### Configuration 1: "True macOS"
**Closest to real macOS Big Sur/Ventura**

Panel:
- Height: 26px
- Opacity: 200
- Blur: ON
- Rounded Corners: ON (10px)
- Traffic Lights: ON
- Notch: ON (160px)
- App Menu: ON
- Global Menu: OFF

Dock:
- Icon Size: 52px
- Magnification: ON (1.5x)
- Autohide: OFF
- Running Indicators: ON

---

### Configuration 2: "Minimal Clean"
**For productivity-focused users**

Panel:
- Height: 24px
- Opacity: 150
- Blur: OFF
- Rounded Corners: OFF
- Traffic Lights: OFF
- Notch: OFF
- App Menu: ON
- Global Menu: OFF

Dock:
- Icon Size: 40px
- Magnification: OFF
- Autohide: ON
- Running Indicators: ON

---

### Configuration 3: "Maximum Bling"
**Show off all features!**

Panel:
- Height: 32px
- Opacity: 220
- Blur: ON
- Rounded Corners: ON (12px)
- Traffic Lights: ON
- Notch: ON (200px)
- App Menu: ON
- Global Menu: ON

Dock:
- Icon Size: 64px
- Magnification: ON (2.0x)
- Autohide: OFF
- Running Indicators: ON

---

### Configuration 4: "Performance"
**For older hardware**

Panel:
- Height: 28px
- Opacity: 180
- Blur: OFF
- Rounded Corners: OFF
- Traffic Lights: ON
- Notch: OFF
- App Menu: ON
- Global Menu: OFF

Dock:
- Icon Size: 48px
- Magnification: OFF
- Autohide: ON
- Running Indicators: OFF

---

## 🔧 Advanced Tips

### Combining with Other Extensions

**Works well with:**
- Dash to Dock (disable GPanel dock)
- Blur my Shell (enhanced blur effects)
- Just Perfection (hide activities button)
- User Themes (customize colors)

**May conflict with:**
- Other panel modifiers
- Other dock extensions (if both enabled)

### Color Customization

Edit `stylesheet.css` to customize colors:

**Panel background:**
```css
.gpanel-top-bar {
    background-color: rgba(30, 30, 30, 0.75);
}
```

**Dock background:**
```css
.gpanel-dock {
    background-color: rgba(255, 255, 255, 0.15);
}
```

**Traffic light colors:**
```css
.gpanel-traffic-light.close { 
    background: linear-gradient(135deg, #ff6b6b 0%, #ff5f57 100%);
}
```

### Font Customization

Change font sizes in `stylesheet.css`:
```css
.gpanel-app-menu-label {
    font-size: 14px;
    font-weight: 700;
}
```

---

## 🐛 Known Limitations

1. **Blur Effect**: Doesn't work on all systems (GPU dependent)
2. **Global Menu**: Currently displays static items only
3. **Dock Position**: Only bottom position supported (left/right in roadmap)
4. **Traffic Lights**: Don't show window titles on hover yet

---

## 🚀 Roadmap

### Planned Features
- [ ] Left/Right dock positions
- [ ] Real global menu integration via DBus
- [ ] Window title in traffic lights tooltip
- [ ] Multi-monitor support improvements
- [ ] Dock item reordering
- [ ] Custom keyboard shortcuts
- [ ] Light/Dark mode auto-switching
- [ ] Active app indicator styles
- [ ] Export/Import settings

---

## 📊 Performance Impact

**Low Impact:**
- Panel height/opacity changes
- Traffic lights
- App menu
- Running indicators

**Medium Impact:**
- Rounded corners
- Icon magnification
- Notch animations

**High Impact:**
- Blur effect (GPU dependent)
- Large icon sizes (80px+)
- Multiple simultaneous animations

**Recommendation:** Start with all features enabled, then disable performance-heavy features if needed.

---

## 💡 Pro Tips

1. **Match your wallpaper**: Adjust panel opacity based on your wallpaper darkness
2. **Keyboard shortcuts**: Use Super+A to open app grid from dock
3. **Quick toggle**: Create a shortcut to disable extension when gaming
4. **Theme coordination**: Use User Themes extension to match GTK theme colors
5. **Monitor positioning**: Works best on primary monitor
6. **File manager**: Set Files (Nautilus) as first favorite for Finder-like access

---

**Need more help?** Check the main README.md or open an issue on GitHub!
