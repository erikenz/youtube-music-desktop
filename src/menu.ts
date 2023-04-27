import { BrowserWindow, MenuItemConstructorOptions } from "electron";
import { Menu, dialog } from "electron";

import { getAllPluginMenus } from "@utils/plugins";
import path from "path";

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
			submenu: [
				{
					label: "Manage plugins",
					click: () => {
						// Open plugins configuration
					},
				},
				{
					label: "Install plugins",
					click: () => {
						// Open plugins store
						const store = new BrowserWindow({
							width: 400,
							height: 400,
							parent: win,
						});
						store.loadFile(
							path.join(
								__dirname,
								"../src/components/store/plugins/app.tsx"
							)
						);

						// Install from file
						// dialog.showOpenDialog(win, { title: "Plugins store" });
					},
				},
				...getAllPluginMenus(win),
			],
		},
		{
			label: "Themes",
		},
		{
			label: "Options",
		},
		{
			label: "Extra",
			submenu: [{ label: "Contribute", click: () => {} }],
		},
	];
}
export function setApplicationMenu(win: BrowserWindow) {
	const menuTemplate = [...mainMenuTemplate(win)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
