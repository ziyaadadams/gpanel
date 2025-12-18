# Changelog

All notable changes to GPanel will be documented in this file.

## [2.0.0] - 2024-12-18

### Added
- **Extended GNOME Support**: Now supports GNOME 40-48 (previously 45-48)
- **Icon Magnification**: Smooth zoom effect on dock icons with customizable scale (1.0-2.5x)
- **Running App Indicators**: Dots under active applications in dock
- **Rounded Panel Corners**: Customizable corner radius (0-24px) for floating panel effect
- **Enhanced Blur**: Improved backdrop-filter blur effects for panel
- **Auto-hide Dock**: Dock slides away when not hovering
- **Better Animations**: Smoother transitions throughout the extension
- **Traffic Light Gradients**: More realistic macOS-style button colors
- **Reload Script**: Quick development reload script for testing

### Improved
- **Dock Performance**: More efficient running app tracking
- **Panel Styling**: Better macOS-like translucency and colors
- **Button Interactions**: Enhanced hover and click effects
- **Code Organization**: Better separation of concerns in managers
- **Settings Validation**: More robust settings handling
- **Memory Management**: Better cleanup on disable

### Changed
- Default panel opacity from variable to 200 for better consistency
- Dock container height increased to 120px for better visibility
- Panel button padding increased for easier clicking
- Global menu items spacing reduced for compact look
- Font weights adjusted to match macOS more closely

### Fixed
- Dock autohide timeout cleanup on disable
- Running app indicators not updating
- Panel style not resetting properly on disable
- Settings signals not disconnecting properly
- Magnification not applying to all dock items

## [1.0.0] - 2024-12-17

### Initial Release
- macOS-style traffic lights (window controls)
- Dynamic notch with animations
- App menu showing current application
- Global menu (experimental)
- Panel blur effect
- Customizable panel height and opacity
- Bottom dock with favorites
- Basic preferences window
- GNOME 45-48 support
