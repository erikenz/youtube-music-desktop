import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";

import type { Windows } from "#types/main";
import { getAllPluginMenus } from "@utils/plugins";
import { makeWindow } from "@utils/window";
import path from "path";

// Plugin Install Window
declare const PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY: string;
declare const PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// true only if in-app-menu was loaded on launch
// const inAppMenuActive = config.plugins.isEnabled("in-app-menu");

// const electron = window.require("electron");
// const ipcRenderer = electron.ipcRenderer;
export function mainMenuTemplate(
	windows: Windows
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
									parent: windows.main,
								});
								console.log("dirname => ", __dirname);
								store.loadURL(
									path.join(
										__dirname,
										"../../src/components/plugins/manage/index.html"
									)
								);
							},
						},
						{
							label: "Install plugins",
							click: () => {
								windows.pluginsInstall = makeWindow({
									URL: PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY,
									title: "Install Plugins",
									// width: 600,
									// height: 400,
									parent: windows.main,
								});
								windows.pluginsInstall.webContents.openDevTools();
								// window.electronAPI.openPage("plugin_install_window");
								// ipcRenderer.send(
								// 	"open_page",
								// 	"plugin_install_window"
								// );
								// Open plugins store
								// const store = new BrowserWindow({
								// 	// width: 400,
								// 	// height: 400,
								// 	parent: win,
								// 	webPreferences: {
								// 		nodeIntegration: true,
								// 		contextIsolation: false,
								// 	},
								// });
								// store.webContents.openDevTools();
								// Install from file
								// dialog.showOpenDialog(win, { title: "Plugins store" });
							},
						},
						...getAllPluginMenus(windows.main),
					],
				},
				{
					label: "Themes",
					submenu: [
						{
							label: "Manage themes",
							click: () => {
								// Open plugins configuration
								const store = new BrowserWindow({
									width: 400,
									height: 400,
									parent: windows.main,
								});
								store.loadFile(
									path.join(
										__dirname,
										"../src/components/themes/manage/index.html"
									)
								);
							},
						},
						{
							label: "Install themes",
							click: () => {
								// Open plugins store
								const store = new BrowserWindow({
									width: 400,
									height: 400,
									parent: windows.main,
								});
								store.loadFile(
									path.join(
										__dirname,
										"../src/components/themes/install/index.html"
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
export function setApplicationMenu(windows: Windows) {
	const menuTemplate = [...mainMenuTemplate(windows)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
