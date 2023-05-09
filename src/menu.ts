import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";

import type { Windows } from "#types/window";
import { createWindow } from "@utils/window";
import path from "path";

// Plugin Install Window
// declare const PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY: string;
// declare const PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// Plugin Manage Window
declare const PLUGIN_MANAGE_WINDOW_WEBPACK_ENTRY: string;
declare const PLUGIN_MANAGE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// true only if in-app-menu was loaded on launch
// const inAppMenuActive = config.plugins.isEnabled("in-app-menu");

export function mainMenuTemplate(
	windows: Windows
): MenuItemConstructorOptions[] {
	return [
		{
			label: "Settings",
			submenu: [
				{
					label: "Preferences",
				},
				{
					label: "Plugins",
					click: () => {
						// Open plugins page
						windows.pluginsManage = createWindow({
							urlToLoad: PLUGIN_MANAGE_WINDOW_WEBPACK_ENTRY,
							preloadPath:
								PLUGIN_MANAGE_WINDOW_PRELOAD_WEBPACK_ENTRY,
							windowProps: {
								title: "Manage Plugins",
								width: 800,
								height: 600,
								parent: windows.main,
							},
						});
						windows.pluginsManage.webContents.openDevTools();
					},
					// submenu: [
					// 	{
					// 		label: "Manage plugins",
					// 		click: () => {
					// 			// Open plugins configuration
					// 			const store = new BrowserWindow({
					// 				width: 400,
					// 				height: 400,
					// 				parent: windows.main,
					// 			});
					// 			console.log("dirname => ", __dirname);
					// 			store.loadURL(
					// 				path.join(
					// 					__dirname,
					// 					"../../src/components/plugins/manage/index.html"
					// 				)
					// 			);
					// 		},
					// 	},
					// 	{
					// 		label: "Install plugins",
					// 		click: () => {
					// 			windows.pluginsInstall = makeWindow({
					// 				URL: PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY,
					// 				title: "Install Plugins",
					// 				// width: 600,
					// 				// height: 400,
					// 				parent: windows.main,
					// 			});
					// 			windows.pluginsInstall.webContents.openDevTools();
					// 		},
					// 	},
					// ],
				},
				{
					label: "Themes",
					submenu: [
						{
							label: "Manage themes",
							click: () => {
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
							},
						},
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
// export function setApplicationMenu(windows: Windows) {
// 	const menuTemplate = [...mainMenuTemplate(windows)];
// 	const menu = Menu.buildFromTemplate(menuTemplate);
// 	Menu.setApplicationMenu(menu);
// }

// function refreshMenu(this: Menu) {
// 	// refreshMenu(this: Menu)
// 	this.setApplicationMenu(win);
// 	// if (inAppMenuActive) {
// 	// 	win.webContents.send("refreshMenu");
// 	// }
// }
