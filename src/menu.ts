import { MenuItemConstructorOptions } from "electron";
import type { Windows } from "#types/window";
import { createWindow } from "@utils/window";
import is from "electron-is";

// Plugin Install Window
// declare const PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY: string;
// declare const PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// Plugin Manage Window
declare const PLUGIN_MANAGE_WINDOW_WEBPACK_ENTRY: string;
declare const PLUGIN_MANAGE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const PLUGINS_WINDOW_WEBPACK_ENTRY: string;
declare const PLUGINS_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// true only if in-app-menu was loaded on launch
// const inAppMenuActive = config.plugins.isEnabled("in-app-menu");

export function mainMenuTemplate(
	windows: Windows
): MenuItemConstructorOptions[] {
	return [
		{
			label: "Plugins",
			click: () => {
				windows.plugins = createWindow({
					urlToLoad: PLUGINS_WINDOW_WEBPACK_ENTRY,
					preloadPath: PLUGINS_WINDOW_PRELOAD_WEBPACK_ENTRY,
					windowProps: {
						title: "Plugins",
						width: 800,
						height: 600,
						parent: windows.main,
					},
				});
				windows.plugins.removeMenu();
				if (is.dev()) {
					windows.plugins.webContents.openDevTools();
				}
			},
		},
		{
			label: "Extensions(OLD)",
			submenu: [
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
				},
				{
					label: "Manage themes",
					click: () => {
						// const store = new BrowserWindow({
						// 	width: 400,
						// 	height: 400,
						// 	parent: windows.main,
						// });
						// store.loadFile(
						// 	path.join(
						// 		__dirname,
						// 		"../src/components/themes/manage/index.html"
						// 	)
						// );
					},
				},
			],
		},
		{
			label: "Preferences",
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
