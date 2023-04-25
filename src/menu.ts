import type { BrowserWindow, MenuItemConstructorOptions } from "electron";

import { Menu } from "electron";
import { getAllPluginMenu } from "@config/plugins";

// true only if in-app-menu was loaded on launch
// const inAppMenuActive = config.plugins.isEnabled("in-app-menu");

export function mainMenuTemplate(
	win: BrowserWindow
): MenuItemConstructorOptions[] {
	// function refreshMenu(this: Menu) {
	// 	// refreshMenu(this: Menu)
	// 	this.setApplicationMenu(win);
	// 	// if (inAppMenuActive) {
	// 	// 	win.webContents.send("refreshMenu");
	// 	// }
	// }
	return [
		{
			label: "Plugins",
			submenu: getAllPluginMenu(),
		},
		{
			label: "Themes",
		},
		{
			label: "Options",
		},
	];
}
export function setApplicationMenu(win: BrowserWindow) {
	const menuTemplate = [...mainMenuTemplate(win)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
