import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Shell from 'gi://Shell';
import Meta from 'gi://Meta';
import * as AppFavorites from 'resource:///org/gnome/shell/ui/appFavorites.js';

const SETTINGS_KEY_PANEL_HEIGHT = 'panel-height';
const SETTINGS_KEY_PANEL_OPACITY = 'panel-opacity';
const SETTINGS_KEY_SHOW_NOTCH = 'show-notch';
const SETTINGS_KEY_NOTCH_WIDTH = 'notch-width';
const SETTINGS_KEY_SHOW_TRAFFIC_LIGHTS = 'show-traffic-lights';
const SETTINGS_KEY_SHOW_APP_MENU = 'show-app-menu';
const SETTINGS_KEY_BLUR_EFFECT = 'blur-effect';
const SETTINGS_KEY_ENABLE_DOCK = 'enable-dock';
const SETTINGS_KEY_DOCK_ICON_SIZE = 'dock-icon-size';
const SETTINGS_KEY_DOCK_AUTOHIDE = 'dock-autohide';
const SETTINGS_KEY_ENABLE_GLOBAL_MENU = 'enable-global-menu';

class TrafficLightsManager {
    constructor(panel) {
        this._panel = panel;
        this._container = null;
        this._settings = null;
    }

    enable(settings) {
        this._settings = settings;
        this._createWidget();
        this._updateVisibility();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_SHOW_TRAFFIC_LIGHTS, 
            () => this._updateVisibility());
    }

    disable() {
        if (this._container) {
            this._container.destroy();
            this._container = null;
        }
        if (this._settings && this._settingsSignal) {
            this._settings.disconnect(this._settingsSignal);
            this._settingsSignal = null;
        }
    }

    _createWidget() {
        this._container = new St.BoxLayout({
            style_class: 'gpanel-traffic-lights',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });

        const actions = ['close', 'minimize', 'maximize'];
        actions.forEach(action => {
            let btn = new St.Button({
                style_class: `gpanel-traffic-light ${action}`,
                can_focus: true,
                reactive: true
            });
            
            btn.connect('clicked', () => this._handleAction(action));
            this._container.add_child(btn);
        });

        let leftBox = Main.panel._leftBox;
        leftBox.insert_child_at_index(this._container, 0);
    }

    _handleAction(action) {
        let win = global.display.focus_window;
        if (!win) return;

        switch(action) {
            case 'close':
                win.delete(global.get_current_time());
                break;
            case 'minimize':
                win.minimize();
                break;
            case 'maximize':
                if (win.get_maximized())
                    win.unmaximize(Meta.MaximizeFlags.BOTH);
                else
                    win.maximize(Meta.MaximizeFlags.BOTH);
                break;
        }
    }

    _updateVisibility() {
        if (this._container) {
            this._container.visible = this._settings.get_boolean(SETTINGS_KEY_SHOW_TRAFFIC_LIGHTS);
        }
    }
}

class NotchManager {
    constructor() {
        this._dateMenu = Main.panel.statusArea.dateMenu;
        this._settings = null;
        this._hoverSignalId = null;
    }

    enable(settings) {
        this._settings = settings;
        this._updateNotch();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_SHOW_NOTCH, 
            () => this._updateNotch());
        
        this._widthSignal = this._settings.connect('changed::' + SETTINGS_KEY_NOTCH_WIDTH,
            () => this._updateWidth());
    }

    disable() {
        this._destroyNotch();
        if (this._settings) {
            if (this._settingsSignal) this._settings.disconnect(this._settingsSignal);
            if (this._widthSignal) this._settings.disconnect(this._widthSignal);
        }
    }

    _updateNotch() {
        const enabled = this._settings.get_boolean(SETTINGS_KEY_SHOW_NOTCH);
        if (enabled) {
            this._setupNotch();
        } else {
            this._destroyNotch();
        }
    }

    _setupNotch() {
        if (!this._dateMenu) return;
        
        if (!this._dateMenu.has_style_class_name('gpanel-notch')) {
            this._dateMenu.add_style_class_name('gpanel-notch');
            
            let label = this._dateMenu.get_first_child();
            if (label) label.y_align = Clutter.ActorAlign.CENTER;

            if (!this._hoverSignalId) {
                this._hoverSignalId = this._dateMenu.connect('notify::hover', () => {
                    this._animateNotch(this._dateMenu.hover);
                });
            }
            
            this._updateWidth();
        }
    }

    _updateWidth() {
        if (this._dateMenu && this._dateMenu.has_style_class_name('gpanel-notch')) {
            // Width handled by CSS/Padding for now
        }
    }

    _destroyNotch() {
        if (this._dateMenu) {
            this._dateMenu.remove_style_class_name('gpanel-notch');
            
            if (this._hoverSignalId) {
                this._dateMenu.disconnect(this._hoverSignalId);
                this._hoverSignalId = null;
            }
            
            this._dateMenu.ease({
                scale_x: 1,
                scale_y: 1,
                duration: 200,
                mode: Clutter.AnimationMode.EASE_OUT_QUAD
            });
        }
    }

    _animateNotch(isHovering) {
        const targetScaleY = isHovering ? 1.2 : 1.0;
        const targetScaleX = isHovering ? 1.05 : 1.0;
        
        this._dateMenu.ease({
            scale_x: targetScaleX,
            scale_y: targetScaleY,
            duration: 300,
            mode: Clutter.AnimationMode.EASE_OUT_ELASTIC
        });
    }
}

class AppMenuManager {
    constructor() {
        this._container = null;
        this._appLabel = null;
        this._globalMenuBox = null;
        this._settings = null;
        this._focusSignal = null;
    }

    enable(settings) {
        this._settings = settings;
        this._createWidget();
        this._updateVisibility();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_SHOW_APP_MENU, 
            () => this._updateVisibility());
        this._globalMenuSignal = this._settings.connect('changed::' + SETTINGS_KEY_ENABLE_GLOBAL_MENU,
            () => this._updateGlobalMenu());
            
        this._focusSignal = global.display.connect('notify::focus-window', () => this._updateAppTitle());
        this._updateAppTitle();
    }

    disable() {
        if (this._container) {
            this._container.destroy();
            this._container = null;
        }
        if (this._focusSignal) {
            global.display.disconnect(this._focusSignal);
            this._focusSignal = null;
        }
        if (this._settings) {
            if (this._settingsSignal) this._settings.disconnect(this._settingsSignal);
            if (this._globalMenuSignal) this._settings.disconnect(this._globalMenuSignal);
        }
    }

    _createWidget() {
        this._container = new St.BoxLayout({
            style_class: 'gpanel-app-menu',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });

        this._appLabel = new St.Label({
            text: 'Finder',
            style_class: 'gpanel-app-menu-label',
            y_align: Clutter.ActorAlign.CENTER
        });

        this._globalMenuBox = new St.BoxLayout({
            style_class: 'gpanel-global-menu-box',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER
        });

        this._container.add_child(this._appLabel);
        this._container.add_child(this._globalMenuBox);

        let leftBox = Main.panel._leftBox;
        leftBox.add_child(this._container);
        
        this._updateGlobalMenu();
    }

    _updateVisibility() {
        if (this._container) {
            this._container.visible = this._settings.get_boolean(SETTINGS_KEY_SHOW_APP_MENU);
        }
    }

    _updateGlobalMenu() {
        if (!this._globalMenuBox) return;
        
        this._globalMenuBox.destroy_all_children();
        
        if (this._settings.get_boolean(SETTINGS_KEY_ENABLE_GLOBAL_MENU)) {
            // Mock Global Menu Items for visual parity
            // In a real implementation, this would connect to DBus
            const items = ['File', 'Edit', 'View', 'Window', 'Help'];
            items.forEach(label => {
                let btn = new St.Button({
                    style_class: 'gpanel-global-menu-item',
                    label: label,
                    y_align: Clutter.ActorAlign.CENTER
                });
                this._globalMenuBox.add_child(btn);
            });
        }
    }

    _updateAppTitle() {
        if (!this._appLabel) return;
        
        let win = global.display.focus_window;
        if (win) {
            let tracker = Shell.WindowTracker.get_default();
            let app = tracker.get_window_app(win);
            if (app) {
                this._appLabel.text = app.get_name();
            } else {
                this._appLabel.text = win.get_title() || 'Unknown';
            }
        } else {
            this._appLabel.text = 'Desktop';
        }
    }
}

class DockManager {
    constructor() {
        this._dock = null;
        this._settings = null;
        this._monitor = Main.layoutManager.primaryMonitor;
    }

    enable(settings) {
        this._settings = settings;
        this._createDock();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_ENABLE_DOCK, 
            () => this._updateVisibility());
        this._sizeSignal = this._settings.connect('changed::' + SETTINGS_KEY_DOCK_ICON_SIZE,
            () => this._rebuildDock());
            
        this._updateVisibility();
    }

    disable() {
        if (this._dock) {
            this._dock.destroy();
            this._dock = null;
        }
        if (this._settings) {
            if (this._settingsSignal) this._settings.disconnect(this._settingsSignal);
            if (this._sizeSignal) this._settings.disconnect(this._sizeSignal);
        }
    }

    _createDock() {
        if (this._dock) this._dock.destroy();

        this._dock = new St.BoxLayout({
            style_class: 'gpanel-dock',
            vertical: false,
            reactive: true,
            x_align: Clutter.ActorAlign.CENTER,
            y_align: Clutter.ActorAlign.END
        });

        this._dockContainer = new St.Bin({
            style_class: 'gpanel-dock-container',
            child: this._dock,
            x_align: Clutter.ActorAlign.CENTER,
            y_align: Clutter.ActorAlign.END,
            width: this._monitor.width,
            height: 100 // Approximate
        });

        Main.layoutManager.addChrome(this._dockContainer, {
            affectsInputRegion: true,
            trackFullscreen: true
        });
        
        // Position at bottom
        this._dockContainer.set_position(0, this._monitor.height - 100);
        
        this._populateDock();
    }

    _populateDock() {
        let iconSize = this._settings.get_int(SETTINGS_KEY_DOCK_ICON_SIZE);
        let appSystem = Shell.AppSystem.get_default();
        let favorites = AppFavorites.getAppFavorites().getFavorites();

        favorites.forEach(app => {
            let icon = app.create_icon_texture(iconSize);
            let btn = new St.Button({
                style_class: 'gpanel-dock-item',
                child: icon,
                reactive: true,
                can_focus: true
            });
            
            btn.connect('clicked', () => {
                app.activate();
            });
            
            this._dock.add_child(btn);
        });
        
        // Separator
        let sep = new St.Widget({ style_class: 'gpanel-dock-separator', width: 1, height: iconSize });
        this._dock.add_child(sep);
        
        // Show App Grid Button
        let gridIcon = new St.Icon({
            icon_name: 'view-app-grid-symbolic',
            icon_size: iconSize
        });
        let gridBtn = new St.Button({
            style_class: 'gpanel-dock-item',
            child: gridIcon
        });
        gridBtn.connect('clicked', () => {
            Main.overview.toggle();
        });
        this._dock.add_child(gridBtn);
    }
    
    _rebuildDock() {
        if (this._dock) {
            this._dock.destroy_all_children();
            this._populateDock();
        }
    }

    _updateVisibility() {
        if (this._dockContainer) {
            this._dockContainer.visible = this._settings.get_boolean(SETTINGS_KEY_ENABLE_DOCK);
        }
    }
}

export default class GPanelExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        
        // Managers
        this._trafficLights = new TrafficLightsManager();
        this._notch = new NotchManager();
        this._appMenu = new AppMenuManager();
        this._dock = new DockManager();
        
        // Initialize Managers
        this._trafficLights.enable(this._settings);
        this._notch.enable(this._settings);
        this._appMenu.enable(this._settings);
        this._dock.enable(this._settings);
        
        // Panel Styling
        this._updatePanelStyle();
        this._settings.connect('changed::' + SETTINGS_KEY_PANEL_HEIGHT, () => this._updatePanelStyle());
        this._settings.connect('changed::' + SETTINGS_KEY_PANEL_OPACITY, () => this._updatePanelStyle());
        this._settings.connect('changed::' + SETTINGS_KEY_BLUR_EFFECT, () => this._updatePanelStyle());
    }

    disable() {
        this._trafficLights.disable();
        this._notch.disable();
        this._appMenu.disable();
        this._dock.disable();
        
        // Reset Panel Style
        Main.panel.remove_style_class_name('gpanel-top-bar');
        Main.panel.remove_style_class_name('blurred');
        Main.panel.height = -1;
        
        this._settings = null;
    }
    
    _updatePanelStyle() {
        Main.panel.add_style_class_name('gpanel-top-bar');
        
        let height = this._settings.get_int(SETTINGS_KEY_PANEL_HEIGHT);
        Main.panel.height = height;
        
        let blur = this._settings.get_boolean(SETTINGS_KEY_BLUR_EFFECT);
        if (blur) {
            Main.panel.add_style_class_name('blurred');
        } else {
            Main.panel.remove_style_class_name('blurred');
        }
    }
}
