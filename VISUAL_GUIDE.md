# 🎨 GPanel Visual Guide

A text-based visual guide to understanding GPanel's layout and features.

---

## 📺 Full Desktop Layout

```
╔════════════════════════════════════════════════════════════════════╗
║  🔴🟡🟢  Finder  File  Edit  View           📶 🔋 🔊  🕐 2:30 PM  ║  ← Top Panel
╚════════════════════════════════════════════════════════════════════╝
     ▲         ▲                                         ▲
     │         │                                         │
Traffic    App Menu                                   Notch
Lights     + Global                                   (Clock)


                    Your Desktop / Windows Here
                           (Activities)


        ╔════════════════════════════════════════════╗
        ║  📁  🌐  📧  📝  🎵  📺  │  🔍           ║  ← Dock
        ║  ●      ●      ●              ●           ║
        ╚════════════════════════════════════════════╝
         ▲                                  ▲
         │                                  │
     Running dots                      App Grid
```

---

## 🎯 Panel Components (Left to Right)

### 1. Traffic Lights (Left)
```
┌─────────────┐
│ 🔴 🟡 🟢    │
└─────────────┘
 │  │  │
 │  │  └─ Maximize/Restore
 │  └──── Minimize
 └─────── Close
```

### 2. App Menu
```
┌────────────────────────────────────┐
│ Finder  File  Edit  View  Window  │
└────────────────────────────────────┘
  ▲       └────────────────────┘
  │              │
Current App   Global Menu
  Name        (Experimental)
```

### 3. Center Area
```
┌──────────────┐
│  🕐 2:30 PM  │  ← Notch (optional)
└──────────────┘
```

### 4. System Indicators (Right)
```
┌─────────────────────┐
│  📶  🔋  🔊  👤    │
└─────────────────────┘
```

---

## 🚀 Dock Layout

### Normal State
```
╔═══════════════════════════════════════════════════╗
║  📁   🌐   📧   📝   🎵   📺   │   🔍          ║
║  ●        ●        ●              ●              ║
╚═══════════════════════════════════════════════════╝
  ▲                                  │        ▲
  │                                  │        │
Favorite apps                   Separator  App Grid
with running dots
```

### With Magnification (Hover)
```
╔═════════════════════════════════════════════════════╗
║  📁   🌐      📧      📝   🎵   📺   │   🔍       ║
║  ●        ●   👆 ●        ●              ●         ║
╚═════════════════════════════════════════════════════╝
                  ▲
              Hovering icon
            becomes larger
```

### Auto-hide State
```
                Desktop visible


     ╔════════════════════════════════╗
     ║  (dock hidden at bottom)       ║  ← Move cursor here
     ╚════════════════════════════════╝        to reveal
```

---

## 🎨 Style Variations

### Style 1: Classic macOS
```
Panel:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🔴🟡🟢  Finder  File              📶 🔋  🕐 2:30 PM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Rounded                           Notch
 corners                          visible

Dock:
     ╔════════════════════════════════════╗
     ║  📁  🌐  📧  📝  │  🔍            ║
     ║  ●      ●      ●      ●             ║
     ╚════════════════════════════════════╝
      Magnification ON, Always visible
```

### Style 2: Minimal Pro
```
Panel:
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  Finder                          📶  🕐 2:30 PM
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
 No traffic lights, No notch, Straight edges

Dock:
     ┌────────────────────────────┐
     │  📁  🌐  📧  │  🔍        │
     │  ●      ●      ●            │
     └────────────────────────────┘
      Smaller, Auto-hide, No magnification
```

---

## 🎭 Animation States

### Notch Animation
```
Normal:
  ┌──────────┐
  │ 2:30 PM  │
  └──────────┘

Hover:
  ┌────────────┐
  │  2:30 PM   │  ← Slightly expands
  └────────────┘
```

### Icon Magnification
```
Before Hover:
📁  🌐  📧  📝  🎵

During Hover:
📁  🌐  📧  📝  🎵
        ▲
    [cursor]

After Hover:
📁  🌐  📧  📝  🎵
        ▲
  Gets bigger!
```

### Dock Auto-hide
```
Step 1: Dock visible
╔══════════════╗
║  📁 🌐 📧   ║
╚══════════════╝

Step 2: Cursor leaves
       ↓
╔══════════════╗
║  📁 🌐 📧   ║ ← Starts fading
╚══════════════╝

Step 3: Hidden
════════════════  ← Invisible
```

---

## 🖱️ Interactive Elements

### Traffic Lights
```
Idle:     🔴 🟡 🟢
Hover:    🔴 🟡 🟢  ← Slightly larger
Click:    🔴 🟡 🟢  ← Performs action
```

### Dock Icons
```
Idle:     📁
Hover:    📁  ← Background appears
                  Size increases (if magnification ON)
Click:    📁  ← Launches app
```

### Panel Buttons
```
Idle:     [📶]
Hover:    [📶]  ← Light highlight
Click:    [📶]  ← Opens menu
```

---

## 📐 Size Comparisons

### Panel Heights
```
Compact (24px):
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃

Default (32px):
▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅

Large (48px):
██████████████████████████
```

### Icon Sizes
```
Small (32px):   📁
Medium (48px):  📁
Large (64px):   📁
```

### Magnification Scales
```
1.0x (off):    📁
1.5x:          📁
2.0x:          📁
```

---

## 🎨 Color Scheme

### Panel
```
Background: ░░░░░░░░ (Translucent dark with blur)
Text:       ████████ (White)
Hover:      ▓▓▓▓▓▓▓▓ (Light white overlay)
```

### Dock
```
Background: ░░░░░░░░ (Translucent white with blur)
Icons:      Full color
Separator:  ▒▒▒▒▒▒▒▒ (Semi-transparent white)
Dots:       ████████ (White)
```

### Traffic Lights
```
Close:      🔴 #FF5F57 (Red gradient)
Minimize:   🟡 #FEBC2E (Yellow gradient)
Maximize:   🟢 #28C840 (Green gradient)
```

---

## 📱 Responsive Behavior

### On Small Screens
```
Panel: Maintains same height
Dock: Icons may be smaller
Layout: Adjusts to screen width
```

### On Ultrawide Monitors
```
Panel: Spans full width
Dock: Centers at bottom
Notch: Can be made wider
```

### Multi-Monitor
```
Primary: Full panel + dock
Secondary: Standard GNOME panel
```

---

## 🎯 Feature Indicators

### Panel Features On/Off

All features ON:
```
🔴🟡🟢 Finder File Edit   📶🔋  ┌───────┐
                                │ Clock │
                                └───────┘
```

Minimal (some off):
```
Finder                          📶🔋 Clock
```

### Dock Features

All features ON:
```
     ╔════════════════════════════╗
     ║  📁  🌐  📧  │  🔍        ║
     ║  ●      ●      ●            ║
     ╚════════════════════════════╝
       ▲              │        ▲
   Magnify      Separator   Grid
   Running dots
```

Minimal:
```
     ┌────────────────────┐
     │  📁  🌐  📧       │
     └────────────────────┘
        No extras
```

---

## 💡 Visual Tips

### For macOS Look
- Enable ALL features
- Use rounded corners (12px)
- Set blur to ON
- Panel height 26-28px
- Dock icons 48-56px

### For Clean Look
- Disable notch
- Disable traffic lights
- Straight corners
- Lower opacity

### For Performance
- Disable blur
- Disable magnification
- Smaller icons
- No auto-hide

---

## 🔍 Zoom In: Details

### Traffic Light Close-up
```
Individual button:
  ┌────┐
  │ 🔴 │  ← 12px circle
  └────┘     Gradient fill
             Shadow effect
```

### Notch Detail
```
  ╔═══════════╗
  ║ 🕐 2:30 PM║  ← Rounded bottom
  ╚═══════════╝     Black background
                     Elastic animation
```

### Running Indicator
```
App icon
  📁
  ●    ← 4px white dot
       Fades in/out
```

---

**This visual guide helps you understand what each feature does and how it looks!**

For actual screenshots and photos, check the GitHub repository.
