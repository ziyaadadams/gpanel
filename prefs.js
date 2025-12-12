import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';

export default class GPanelPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        const page = new Adw.PreferencesPage();
        
        // --- Appearance Group ---
        const groupAppearance = new Adw.PreferencesGroup({ title: _('Panel Appearance') });
        page.add(groupAppearance);

        // Panel Height
        const heightRow = new Adw.ActionRow({ title: _('Panel Height') });
        const heightScale = Gtk.Scale.new_with_range(Gtk.Orientation.HORIZONTAL, 20, 60, 1);
        heightScale.set_draw_value(true);
        heightScale.set_value_pos(Gtk.PositionType.RIGHT);
        heightScale.set_hexpand(true);
        settings.bind('panel-height', heightScale.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT);
        heightRow.add_suffix(heightScale);
        groupAppearance.add(heightRow);

        // Panel Opacity
        const opacityRow = new Adw.ActionRow({ title: _('Panel Opacity') });
        const opacityScale = Gtk.Scale.new_with_range(Gtk.Orientation.HORIZONTAL, 0, 255, 1);
        opacityScale.set_draw_value(true);
        opacityScale.set_value_pos(Gtk.PositionType.RIGHT);
        opacityScale.set_hexpand(true);
        settings.bind('panel-opacity', opacityScale.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT);
        opacityRow.add_suffix(opacityScale);
        groupAppearance.add(opacityRow);

        // Blur Effect
        const blurRow = new Adw.SwitchRow({ title: _('Blur Effect') });
        settings.bind('blur-effect', blurRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupAppearance.add(blurRow);

        // --- Features Group ---
        const groupFeatures = new Adw.PreferencesGroup({ title: _('Panel Features') });
        page.add(groupFeatures);

        // Notch
        const notchRow = new Adw.SwitchRow({ title: _('Show Notch') });
        settings.bind('show-notch', notchRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupFeatures.add(notchRow);

        // Notch Width
        const notchWidthRow = new Adw.ActionRow({ title: _('Notch Width') });
        const notchWidthScale = Gtk.Scale.new_with_range(Gtk.Orientation.HORIZONTAL, 100, 300, 1);
        notchWidthScale.set_draw_value(true);
        notchWidthScale.set_hexpand(true);
        settings.bind('notch-width', notchWidthScale.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT);
        notchWidthRow.add_suffix(notchWidthScale);
        groupFeatures.add(notchWidthRow);

        // Traffic Lights
        const trafficRow = new Adw.SwitchRow({ title: _('Show Traffic Lights') });
        settings.bind('show-traffic-lights', trafficRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupFeatures.add(trafficRow);

        // App Menu
        const appMenuRow = new Adw.SwitchRow({ title: _('Show App Menu') });
        settings.bind('show-app-menu', appMenuRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupFeatures.add(appMenuRow);

        // Global Menu
        const globalMenuRow = new Adw.SwitchRow({ title: _('Enable Global Menu (Experimental)') });
        globalMenuRow.set_subtitle(_('Requires DBus menu support from applications'));
        settings.bind('enable-global-menu', globalMenuRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupFeatures.add(globalMenuRow);

        // --- Dock Group ---
        const groupDock = new Adw.PreferencesGroup({ title: _('Dock') });
        page.add(groupDock);

        // Enable Dock
        const dockRow = new Adw.SwitchRow({ title: _('Enable Dock') });
        settings.bind('enable-dock', dockRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupDock.add(dockRow);

        // Dock Icon Size
        const dockSizeRow = new Adw.ActionRow({ title: _('Icon Size') });
        const dockSizeScale = Gtk.Scale.new_with_range(Gtk.Orientation.HORIZONTAL, 24, 128, 4);
        dockSizeScale.set_draw_value(true);
        dockSizeScale.set_hexpand(true);
        settings.bind('dock-icon-size', dockSizeScale.adjustment, 'value', Gio.SettingsBindFlags.DEFAULT);
        dockSizeRow.add_suffix(dockSizeScale);
        groupDock.add(dockSizeRow);

        // Dock Autohide
        const dockHideRow = new Adw.SwitchRow({ title: _('Autohide Dock') });
        settings.bind('dock-autohide', dockHideRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        groupDock.add(dockHideRow);

        window.add(page);
    }
}
