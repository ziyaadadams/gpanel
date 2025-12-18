# Contributing to GPanel

Thank you for your interest in contributing! GPanel is a community-driven project, and we welcome contributions of all kinds.

## 🤝 Ways to Contribute

### 1. Report Bugs 🐛
Found a bug? Please open an issue with:
- Your GNOME Shell version
- Distribution (Ubuntu, Fedora, Arch, etc.)
- Steps to reproduce
- Screenshots if relevant
- Error logs from: `journalctl -f -o cat /usr/bin/gnome-shell`

### 2. Suggest Features 💡
Have an idea? Open an issue describing:
- The feature you'd like
- Why it would be useful
- How it might work
- Reference images if applicable

### 3. Improve Documentation 📚
- Fix typos
- Add examples
- Improve clarity
- Translate to other languages

### 4. Write Code 💻
- Fix bugs
- Implement features
- Optimize performance
- Add tests

---

## 🛠️ Development Setup

### Prerequisites
- GNOME Shell 40+ installed
- `glib-compile-schemas` available
- Basic JavaScript knowledge
- Git

### Getting Started

1. **Fork the repository**
   ```bash
   # On GitHub, click "Fork"
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gpanel.git
   cd gpanel
   ```

3. **Install for development**
   ```bash
   ./install.sh
   ```

4. **Make changes**
   Edit files in your favorite editor (VS Code recommended)

5. **Test changes**
   ```bash
   ./reload.sh
   ```
   Or restart GNOME Shell manually

6. **Check for errors**
   ```bash
   journalctl -f -o cat /usr/bin/gnome-shell
   ```

---

## 📁 Project Structure

```
gpanel/
├── extension.js          # Main extension code
├── prefs.js             # Settings UI
├── metadata.json        # Extension metadata
├── stylesheet.css       # All styling
├── schemas/
│   └── *.gschema.xml   # Settings schema
├── install.sh          # Installation script
├── reload.sh           # Quick reload for dev
└── *.md                # Documentation
```

### Key Files

**extension.js**
- `TrafficLightsManager`: Window controls
- `NotchManager`: Dynamic notch
- `AppMenuManager`: App name display
- `DockManager`: Bottom dock
- `GPanelExtension`: Main extension class

**prefs.js**
- Settings UI using Adwaita
- All preference controls

**stylesheet.css**
- All visual styling
- CSS classes for each component

---

## 🎨 Code Style

### JavaScript
- Use ES6+ features
- Indent with 4 spaces
- Use descriptive variable names
- Add comments for complex logic
- Use `try/catch` for error handling

Example:
```javascript
_createDockIcon(app, iconSize) {
    try {
        // Create icon container
        let container = new St.BoxLayout({
            style_class: 'gpanel-dock-icon-container',
            vertical: true
        });
        
        // Add icon
        let icon = app.create_icon_texture(iconSize);
        container.add_child(icon);
        
        return container;
    } catch (e) {
        console.error('GPanel: Error creating dock icon', e);
        return null;
    }
}
```

### CSS
- Group related styles
- Comment sections
- Use meaningful class names
- Prefer `rem` and `em` over `px` where appropriate

Example:
```css
/* Dock Item Styling */
.gpanel-dock-item {
    background-color: transparent;
    border-radius: 16px;
    padding: 8px;
    transition-duration: 200ms;
}

.gpanel-dock-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

**Panel:**
- [ ] Traffic lights work (close, minimize, maximize)
- [ ] App menu updates on window switch
- [ ] Notch appears and animates
- [ ] Panel height/opacity changes work
- [ ] Rounded corners apply correctly
- [ ] Blur effect works (if supported)

**Dock:**
- [ ] Icons appear correctly
- [ ] Apps launch on click
- [ ] Magnification works (if enabled)
- [ ] Running indicators show
- [ ] Autohide works (if enabled)
- [ ] App grid button works

**Settings:**
- [ ] All toggles work
- [ ] Sliders update values
- [ ] Changes apply immediately

**Cleanup:**
- [ ] Extension disables cleanly
- [ ] No errors in logs
- [ ] Panel returns to normal

### Test on Multiple Environments
- Test on both Wayland and X11
- Test with different themes
- Test with other extensions

---

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): brief description

Longer description if needed.

Fixes #123
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

### Examples
```bash
git commit -m "feat(dock): add icon magnification"
git commit -m "fix(panel): correct opacity calculation"
git commit -m "docs(readme): add installation steps"
git commit -m "style(css): improve dock styling"
```

---

## 🔄 Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Write code
   - Test thoroughly
   - Update documentation

3. **Commit**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

4. **Push**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in description
   - Link related issues

### PR Checklist
- [ ] Code follows style guidelines
- [ ] All features tested
- [ ] Documentation updated
- [ ] No console errors
- [ ] Changelog updated (if significant)

---

## 🐛 Debugging Tips

### View Logs
```bash
# Real-time logs
journalctl -f -o cat /usr/bin/gnome-shell

# Filter for GPanel
journalctl -f -o cat /usr/bin/gnome-shell | grep GPanel
```

### Common Issues

**Extension won't load**
- Check metadata.json syntax
- Verify shell-version array
- Ensure schemas compiled

**Features not working**
- Check console for errors
- Verify settings are saved
- Test with other extensions disabled

**Visual issues**
- Check CSS syntax
- Verify class names match
- Test with different themes

### Debug Logging
Add temporary debug logs:
```javascript
console.log('GPanel DEBUG:', variable);
console.error('GPanel ERROR:', error);
console.warn('GPanel WARNING:', warning);
```

---

## 💡 Feature Development Guide

### Adding a New Setting

1. **Add to schema** (`schemas/*.gschema.xml`)
   ```xml
   <key name="my-setting" type="b">
       <default>true</default>
       <summary>My Setting</summary>
       <description>Description of my setting</description>
   </key>
   ```

2. **Add to prefs.js**
   ```javascript
   const myRow = new Adw.SwitchRow({ title: _('My Setting') });
   settings.bind('my-setting', myRow, 'active', Gio.SettingsBindFlags.DEFAULT);
   group.add(myRow);
   ```

3. **Add constant** (extension.js)
   ```javascript
   const SETTINGS_KEY_MY_SETTING = 'my-setting';
   ```

4. **Use in code**
   ```javascript
   if (this._settings.get_boolean(SETTINGS_KEY_MY_SETTING)) {
       // Do something
   }
   ```

5. **Compile schemas**
   ```bash
   glib-compile-schemas schemas/
   ```

---

## 🎯 Priority Areas

Currently seeking help with:

1. **Global Menu Integration**
   - DBus menu implementation
   - Real app menu support

2. **Performance Optimization**
   - Reduce memory usage
   - Improve animation performance

3. **Multi-Monitor Support**
   - Per-monitor docks
   - Better positioning

4. **Testing**
   - Unit tests
   - Integration tests

5. **Documentation**
   - Video tutorials
   - Translations

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

---

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in commits

---

## 💬 Questions?

- Open a discussion on GitHub
- Comment on relevant issues
- Check existing documentation

---

**Thank you for making GPanel better! 🎉**
