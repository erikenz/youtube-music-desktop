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
			label: "Settings",
			submenu: [
				{
					label: "Preferences",
				},
				{
					label: "Plugins",
					submenu: [
						{
							label: "Manage plugins",
							click: () => {
								// Open plugins configuration
								const store = new BrowserWindow({
									width: 400,
									height: 400,
									parent: win,
								});
								store.loadFile(
									path.join(
										__dirname,
										"../src/components/store/plugins/manage.html"
									)
								);
							},
						},
						{
							label: "Install plugins",
							click: () => {
								// Open plugins store
								const store = new BrowserWindow({
									// width: 400,
									// height: 400,
									parent: win,
								});
								store.loadFile(
									path.join(
										__dirname,
										"../src/components/store/plugins/install.html"
									)
								);
								store.webContents.openDevTools();
								// Install from file
								// dialog.showOpenDialog(win, { title: "Plugins store" });
							},
						},
						...getAllPluginMenus(win),
					],
				},
				{
					label: "Themes",
					submenu: [
						{
							label: "Manage themes",
							click: () => {
								// Open plugins configuration
							},
						},
						{
							label: "Install themes",
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
										"../src/components/store/themes/index.html"
									)
								);

								// Install from file
								// dialog.showOpenDialog(win, { title: "Plugins store" });
							},
						},
						// ...getAllPluginMenus(win),
					],
				},
			],
		},
		{
			label: "View",
			submenu: [
				{
					label: "Zoom In",
					role: "zoomIn",
				},
				{
					label: "Zoom Out",
					role: "zoomOut",
				},
			],
		},
		{
			label: "Extra",
			submenu: [{ label: "Contribute", click: () => {} }],
		},
		{
			label: "Help",
			submenu: [
				{
					label: "About",
					click: () => {
						// Open about window
					},
				},
				{
					label: "Check for updates",
					click: () => {
						// Check for updates
					},
				},
				{
					label: "Report a bug",
					click: () => {
						// Open bug report page
					},
				},
				{
					label: "Toggle developer tools",
					role: "toggleDevTools",
				},
			],
		},
	];
}
export function setApplicationMenu(win: BrowserWindow) {
	const menuTemplate = [...mainMenuTemplate(win)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
