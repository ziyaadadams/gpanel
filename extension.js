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
const SETTINGS_KEY_DOCK_MAGNIFY = 'dock-magnify';
const SETTINGS_KEY_DOCK_MAGNIFY_SCALE = 'dock-magnify-scale';
const SETTINGS_KEY_DOCK_POSITION = 'dock-position';
const SETTINGS_KEY_SHOW_RUNNING_INDICATORS = 'show-running-indicators';
const SETTINGS_KEY_PANEL_ROUNDED_CORNERS = 'panel-rounded-corners';
const SETTINGS_KEY_CORNER_RADIUS = 'corner-radius';
const SETTINGS_KEY_ENABLE_STAGE_MANAGER = 'enable-stage-manager';
const SETTINGS_KEY_STAGE_MANAGER_POSITION = 'stage-manager-position';

class StageManager {
    constructor() {
        this._container = null;
        this._strip = null;
        this._settings = null;
        this._monitor = Main.layoutManager.primaryMonitor;
        this._windowTracker = Shell.WindowTracker.get_default();
        this._appSystem = Shell.AppSystem.get_default();
        this._focusSignal = null;
        this._activeApp = null;
        this._isUpdating = false;
    }

    enable(settings) {
        this._settings = settings;
        this._createStrip();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_ENABLE_STAGE_MANAGER, 
            () => this._updateVisibility());
        this._posSignal = this._settings.connect('changed::' + SETTINGS_KEY_STAGE_MANAGER_POSITION,
            () => this._updatePosition());
            
        this._focusSignal = global.display.connect('notify::focus-window', () => this._onFocusChanged());
        
        this._updateVisibility();
    }

    disable() {
        if (this._container) {
            Main.layoutManager.removeChrome(this._container);
            this._container.destroy();
            this._container = null;
        }
        
        if (this._focusSignal) {
            global.display.disconnect(this._focusSignal);
            this._focusSignal = null;
        }
        
        if (this._settings) {
            if (this._settingsSignal) this._settings.disconnect(this._settingsSignal);
            if (this._posSignal) this._settings.disconnect(this._posSignal);
        }
    }

    _createStrip() {
        if (this._container) this._container.destroy();

        this._strip = new St.BoxLayout({
            style_class: 'gpanel-stage-strip',
            vertical: true,
            reactive: true,
            x_align: Clutter.ActorAlign.START,
            y_align: Clutter.ActorAlign.CENTER
        });

        this._container = new St.Bin({
            child: this._strip,
            x_align: Clutter.ActorAlign.START,
            y_align: Clutter.ActorAlign.CENTER,
            height: this._monitor.height - 200, // Leave space for panel and dock
            width: 100
        });

        Main.layoutManager.addChrome(this._container, {
            affectsInputRegion: true,
            trackFullscreen: true
        });
        
        this._updatePosition();
    }

    _updatePosition() {
        if (!this._container) return;
        
        let position = this._settings.get_string(SETTINGS_KEY_STAGE_MANAGER_POSITION);
        let xPos = position === 'left' ? 0 : this._monitor.width - 100;
        
        this._container.set_position(xPos, 100); // Offset from top
    }

    _updateVisibility() {
        let enabled = this._settings.get_boolean(SETTINGS_KEY_ENABLE_STAGE_MANAGER);
        if (this._container) {
            this._container.visible = enabled;
        }
        if (enabled) {
            this._onFocusChanged();
        }
    }

    _onFocusChanged() {
        if (!this._settings.get_boolean(SETTINGS_KEY_ENABLE_STAGE_MANAGER)) return;
        if (this._isUpdating) return;

        let win = global.display.focus_window;
        if (!win) return;

        let app = this._windowTracker.get_window_app(win);
        if (!app || app === this._activeApp) return;

        this._activeApp = app;
        this._updateStage();
    }

    _updateStage() {
        this._isUpdating = true;
        this._strip.destroy_all_children();

        let runningApps = this._appSystem.get_running();
        
        runningApps.forEach(app => {
            // Skip current app
            if (app === this._activeApp) {
                // Ensure windows are shown
                app.get_windows().forEach(w => {
                    if (w.minimized) w.unminimize();
                    w.raise();
                });
                return;
            }

            // Skip apps with no windows
            let windows = app.get_windows();
            if (windows.length === 0) return;

            // Minimize windows of other apps
            windows.forEach(w => {
                if (!w.minimized) w.minimize();
            });

            // Add to strip
            this._createStageItem(app);
        });

        this._isUpdating = false;
    }

    _createStageItem(app) {
        let icon = app.create_icon_texture(48);
        let btn = new St.Button({
            style_class: 'gpanel-stage-item',
            child: icon,
            reactive: true,
            can_focus: true
        });

        btn.connect('clicked', () => {
            this._activeApp = app;
            this._updateStage();
            app.activate();
        });

        this._strip.add_child(btn);
    }
}

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
        try {
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
            if (leftBox) {
                leftBox.insert_child_at_index(this._container, 0);
            } else {
                console.error('GPanel: Main.panel._leftBox not found');
            }
        } catch (e) {
            console.error('GPanel: Error creating traffic lights', e);
        }
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
        try {
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
            if (leftBox) {
                leftBox.add_child(this._container);
            }
            
            this._updateGlobalMenu();
        } catch (e) {
            console.error('GPanel: Error creating app menu', e);
        }
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
        this._runningApps = [];
        this._appSystem = Shell.AppSystem.get_default();
        this._autohideTimeout = null;
        this._isHovering = false;
        this._windowTracker = Shell.WindowTracker.get_default();
    }

    enable(settings) {
        this._settings = settings;
        this._createDock();
        
        this._settingsSignal = this._settings.connect('changed::' + SETTINGS_KEY_ENABLE_DOCK, 
            () => this._updateVisibility());
        this._sizeSignal = this._settings.connect('changed::' + SETTINGS_KEY_DOCK_ICON_SIZE,
            () => this._rebuildDock());
        this._magnifySignal = this._settings.connect('changed::' + SETTINGS_KEY_DOCK_MAGNIFY,
            () => this._rebuildDock());
        this._autohideSignal = this._settings.connect('changed::' + SETTINGS_KEY_DOCK_AUTOHIDE,
            () => this._updateAutohide());
            
        // Track running apps
        this._appStateSignal = this._appSystem.connect('app-state-changed', 
            () => this._updateRunningApps());
            
        this._updateVisibility();
    }

    disable() {
        if (this._autohideTimeout) {
            GLib.source_remove(this._autohideTimeout);
            this._autohideTimeout = null;
        }
        
        if (this._dock) {
            this._dock.destroy();
            this._dock = null;
        }
        if (this._dockContainer) {
            Main.layoutManager.removeChrome(this._dockContainer);
            this._dockContainer.destroy();
            this._dockContainer = null;
        }
        if (this._settings) {
            if (this._settingsSignal) this._settings.disconnect(this._settingsSignal);
            if (this._sizeSignal) this._settings.disconnect(this._sizeSignal);
            if (this._magnifySignal) this._settings.disconnect(this._magnifySignal);
            if (this._autohideSignal) this._settings.disconnect(this._autohideSignal);
        }
        if (this._appStateSignal) {
            this._appSystem.disconnect(this._appStateSignal);
        }
    }

    _createDock() {
        try {
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
                height: 120
            });

            // Connect hover events for autohide
            this._dockContainer.connect('enter-event', () => {
                this._isHovering = true;
                this._showDock();
            });
            
            this._dockContainer.connect('leave-event', () => {
                this._isHovering = false;
                this._scheduleDockHide();
            });

            Main.layoutManager.addChrome(this._dockContainer, {
                affectsInputRegion: true,
                trackFullscreen: true
            });
            
            // Position at bottom
            this._dockContainer.set_position(0, this._monitor.height - 120);
            
            this._populateDock();
        } catch (e) {
            console.error('GPanel: Error creating dock', e);
        }
    }

    _populateDock() {
        try {
            this._dock.destroy_all_children();
            let iconSize = this._settings.get_int(SETTINGS_KEY_DOCK_ICON_SIZE);
            let enableMagnify = this._settings.get_boolean(SETTINGS_KEY_DOCK_MAGNIFY);
            let magnifyScale = this._settings.get_double(SETTINGS_KEY_DOCK_MAGNIFY_SCALE);
            
            // Get favorites
            let favorites = [];
            if (AppFavorites.getAppFavorites) {
                favorites = AppFavorites.getAppFavorites().getFavorites();
            }

            favorites.forEach(app => {
                this._createDockIcon(app, iconSize, enableMagnify, magnifyScale);
            });
            
            // Separator
            let sep = new St.Widget({ 
                style_class: 'gpanel-dock-separator', 
                width: 1, 
                height: iconSize + 8 
            });
            this._dock.add_child(sep);
            
            // Show App Grid Button
            let gridIcon = new St.Icon({
                icon_name: 'view-app-grid-symbolic',
                icon_size: iconSize
            });
            let gridBtn = new St.Button({
                style_class: 'gpanel-dock-item gpanel-dock-grid',
                child: gridIcon
            });
            gridBtn.connect('clicked', () => {
                Main.overview.toggle();
            });
            
            if (enableMagnify) {
                gridBtn.connect('enter-event', () => {
                    gridBtn.ease({
                        scale_x: magnifyScale,
                        scale_y: magnifyScale,
                        duration: 200,
                        mode: Clutter.AnimationMode.EASE_OUT_QUAD
                    });
                });
                gridBtn.connect('leave-event', () => {
                    gridBtn.ease({
                        scale_x: 1.0,
                        scale_y: 1.0,
                        duration: 200,
                        mode: Clutter.AnimationMode.EASE_OUT_QUAD
                    });
                });
            }
            
            this._dock.add_child(gridBtn);
            
            this._updateRunningApps();
        } catch (e) {
            console.error('GPanel: Error populating dock', e);
        }
    }

    _createDockIcon(app, iconSize, enableMagnify, magnifyScale) {
        let iconContainer = new St.BoxLayout({
            style_class: 'gpanel-dock-icon-container',
            vertical: true,
            reactive: true
        });
        
        let icon = app.create_icon_texture(iconSize);
        let btn = new St.Button({
            style_class: 'gpanel-dock-item',
            child: icon,
            reactive: true,
            can_focus: true
        });
        
        // Running indicator
        let indicator = new St.Widget({
            style_class: 'gpanel-dock-running-indicator',
            width: 4,
            height: 4,
            opacity: 0
        });
        
        btn.connect('clicked', () => {
            app.activate();
        });
        
        // Magnification effect
        if (enableMagnify) {
            btn.connect('enter-event', () => {
                btn.ease({
                    scale_x: magnifyScale,
                    scale_y: magnifyScale,
                    duration: 200,
                    mode: Clutter.AnimationMode.EASE_OUT_QUAD
                });
            });
            
            btn.connect('leave-event', () => {
                btn.ease({
                    scale_x: 1.0,
                    scale_y: 1.0,
                    duration: 200,
                    mode: Clutter.AnimationMode.EASE_OUT_QUAD
                });
            });
        }
        
        iconContainer.add_child(btn);
        iconContainer.add_child(indicator);
        iconContainer._app = app;
        iconContainer._indicator = indicator;
        
        this._dock.add_child(iconContainer);
    }

    _updateRunningApps() {
        if (!this._dock || !this._settings.get_boolean(SETTINGS_KEY_SHOW_RUNNING_INDICATORS)) return;
        
        let runningApps = this._appSystem.get_running();
        
        this._dock.get_children().forEach(child => {
            if (child._app && child._indicator) {
                let isRunning = runningApps.includes(child._app);
                child._indicator.opacity = isRunning ? 255 : 0;
            }
        });
    }
    
    _rebuildDock() {
        if (this._dock) {
            this._populateDock();
        }
    }

    _updateVisibility() {
        if (this._dockContainer) {
            this._dockContainer.visible = this._settings.get_boolean(SETTINGS_KEY_ENABLE_DOCK);
        }
    }

    _updateAutohide() {
        if (this._settings.get_boolean(SETTINGS_KEY_DOCK_AUTOHIDE)) {
            this._scheduleDockHide();
        } else {
            this._showDock();
        }
    }

    _showDock() {
        if (!this._dockContainer) return;
        
        if (this._autohideTimeout) {
            GLib.source_remove(this._autohideTimeout);
            this._autohideTimeout = null;
        }
        
        this._dockContainer.ease({
            opacity: 255,
            translation_y: 0,
            duration: 250,
            mode: Clutter.AnimationMode.EASE_OUT_QUAD
        });
    }

    _scheduleDockHide() {
        if (!this._settings.get_boolean(SETTINGS_KEY_DOCK_AUTOHIDE) || this._isHovering) return;
        
        if (this._autohideTimeout) {
            GLib.source_remove(this._autohideTimeout);
        }
        
        this._autohideTimeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
            if (!this._isHovering) {
                this._dockContainer.ease({
                    opacity: 0,
                    translation_y: 80,
                    duration: 250,
                    mode: Clutter.AnimationMode.EASE_IN_QUAD
                });
            }
            this._autohideTimeout = null;
            return GLib.SOURCE_REMOVE;
        });
    }
}

export default class GPanelExtension extends Extension {
    enable() {
        console.log('GPanel: Enabling extension...');
        try {
            this._settings = this.getSettings();
            
            // Managers
            this._trafficLights = new TrafficLightsManager();
            this._notch = new NotchManager();
            this._appMenu = new AppMenuManager();
            this._dock = new DockManager();
            this._stageManager = new StageManager();
            
            // Initialize Managers
            this._trafficLights.enable(this._settings);
            this._notch.enable(this._settings);
            this._appMenu.enable(this._settings);
            this._dock.enable(this._settings);
            this._stageManager.enable(this._settings);
            
            // Panel Styling
            this._updatePanelStyle();
            this._settings.connect('changed::' + SETTINGS_KEY_PANEL_HEIGHT, () => this._updatePanelStyle());
            this._settings.connect('changed::' + SETTINGS_KEY_PANEL_OPACITY, () => this._updatePanelStyle());
            this._settings.connect('changed::' + SETTINGS_KEY_BLUR_EFFECT, () => this._updatePanelStyle());
            this._settings.connect('changed::' + SETTINGS_KEY_PANEL_ROUNDED_CORNERS, () => this._updatePanelStyle());
            this._settings.connect('changed::' + SETTINGS_KEY_CORNER_RADIUS, () => this._updatePanelStyle());
            
            console.log('GPanel: Extension enabled successfully');
        } catch (e) {
            console.error('GPanel: Fatal error enabling extension', e);
        }
    }

    disable() {
        console.log('GPanel: Disabling extension...');
        try {
            if (this._trafficLights) this._trafficLights.disable();
            if (this._notch) this._notch.disable();
            if (this._appMenu) this._appMenu.disable();
            if (this._dock) this._dock.disable();
            if (this._stageManager) this._stageManager.disable();
            
            // Reset Panel Style
            Main.panel.remove_style_class_name('gpanel-top-bar');
            Main.panel.remove_style_class_name('blurred');
            Main.panel.height = -1;
            
            this._settings = null;
        } catch (e) {
            console.error('GPanel: Error disabling extension', e);
        }
    }
    
    _updatePanelStyle() {
        try {
            Main.panel.add_style_class_name('gpanel-top-bar');
            
            let height = this._settings.get_int(SETTINGS_KEY_PANEL_HEIGHT);
            Main.panel.height = height;
            
            let opacity = this._settings.get_int(SETTINGS_KEY_PANEL_OPACITY);
            let blur = this._settings.get_boolean(SETTINGS_KEY_BLUR_EFFECT);
            
            if (blur) {
                Main.panel.add_style_class_name('blurred');
            } else {
                Main.panel.remove_style_class_name('blurred');
            }
            
            // Rounded corners
            let roundedCorners = this._settings.get_boolean(SETTINGS_KEY_PANEL_ROUNDED_CORNERS);
            if (roundedCorners) {
                Main.panel.add_style_class_name('rounded-corners');
                let radius = this._settings.get_int(SETTINGS_KEY_CORNER_RADIUS);
                Main.panel.set_style(`border-radius: 0 0 ${radius}px ${radius}px;`);
            } else {
                Main.panel.remove_style_class_name('rounded-corners');
                Main.panel.set_style(null);
            }
        } catch (e) {
            console.error('GPanel: Error updating panel style', e);
        }
    }
}
