import { BrowserWindow, app, ipcMain } from "electron";
import type {
	DeletePlugin,
	PluginDataOld,
	PluginGitHub,
	UpdatePluginConfig,
} from "#types/plugin";
import { createStore, store } from "@config/store";
import { existsSync, rmSync } from "fs";
import { getAllPlugins, getPlugins, loadPlugins } from "@utils/plugins";

import type { MainSchema } from "#types/config";
import type { PluginConfig } from "#types/config";
import type { Windows } from "#types/window";
import { createMainWindow } from "@windows/main";
import { createPluginsInstallWindow } from "@windows/plugins-install/create";
import { download } from "electron-dl";
import { join } from "path";
import { plugins } from "./../webpack.plugins";
import { setAppMenu } from "@utils/menu";

console.log("youtube-music-desktop started");

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
// declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// Plugin Install Window
// declare const PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY: string;
// declare const PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

export const windows: Windows = {
	main: null,
	pluginsInstall: null,
	pluginsManage: null,
	themesInstall: null,
	themesManage: null,
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
	createStore();
	windows.main = createMainWindow();
	loadPlugins(windows.main);
	setAppMenu(windows);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		windows.main = createMainWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// IPC Handlers
ipcMain.on("open-install-plugin-window", () => {
	windows.pluginsInstall = createPluginsInstallWindow({ windows });
	windows.pluginsInstall.webContents.openDevTools();
});
ipcMain.handle("fetch-plugins", async () => {
	const plugin: PluginGitHub = await fetch(
		`https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins`
	).then((response) => response.json());

	return plugin;
});
ipcMain.handle("fetch-plugin", async (_, pluginName: string) => {
	const plugin: PluginGitHub = await fetch(
		`https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins/${pluginName}`
	).then((response) => response.json());

	return plugin;
});
ipcMain.on("store-remote-plugins", (_, plugins: PluginGitHub[]) => {
	const pluginsObj = plugins.reduce(
		(obj, item) => Object.assign(obj, { [item.name]: item }),
		{}
	);
	store.set("pluginsRemote", pluginsObj);
});
ipcMain.handle("get-remote-plugins", () => {
	const remotePlugins = store.get("pluginsRemote");
	return Array.from(Object.values(remotePlugins));
});
ipcMain.on("download-plugin", async (e, payload: PluginGitHub) => {
	try {
		if (payload.type !== "dir") return Error("Not a directory");
		const pluginFolder = await fetch(
			`https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins/${payload.name}`
		).then((res) => res.json());
		const pluginSize = pluginFolder.reduce(
			(acc: number, file: PluginGitHub) => {
				return acc + file.size;
			},
			0
		);
		console.log(
			`TCL -> file: main.ts:104 -> pluginSize -> pluginSize:`,
			pluginSize
		);
		pluginFolder.forEach(async (file: PluginGitHub) => {
			console.log(`downloading file: `, file.name);
			const pluginDownload = download(
				windows.pluginsInstall,
				file.download_url,
				{
					directory: join(
						app.getPath("userData"),
						"plugins",
						payload.name
					),
					onProgress(progress) {
						// console.log("Progress:", progress);
					},
					onTotalProgress(totalProgress) {
						// console.log("Total:", totalProgress);
						console.log(
							`Total progress: ${
								totalProgress.transferredBytes
							} / ${pluginSize} => ${
								totalProgress.transferredBytes / pluginSize
							}`
						);
						// windows.pluginsInstall.webContents.send(
						// 	"download-progress",
						// 	totalProgress
						// );
						e.sender.send(
							"download-progress",
							totalProgress.transferredBytes === 0
								? 0
								: totalProgress.transferredBytes / pluginSize
						);
					},
					onCompleted(item) {
						// console.log("Completed:", item);
						windows.pluginsInstall.webContents.send(
							"download-completed",
							item
						);
					},
					onCancel(item) {
						console.log("Cancelled:", item);
					},
					overwrite: true,
				}
			);
		});
	} catch (error) {
		console.error(error);
	}
});

ipcMain.on("get-installed-plugins", (e) => {
	const plugins = getAllPlugins();
	const pluginConfig = store.get("plugins") as PluginConfig;
	// console.log(
	// 	`TCL -> file: main.ts:108 -> ipcMain.on -> pluginConfig:`,
	// 	pluginConfig
	// );

	const pluginArr: PluginDataOld[] = plugins.map((plugin) => {
		if (pluginConfig) {
			return {
				files: {
					...plugin,
				},
				config: {
					...pluginConfig[plugin.name],
				},
			};
		}
	});
	e.returnValue = pluginArr;
});

ipcMain.handle("get-plugins-data", async () => {
	const pluginsData = await getPlugins();
	return JSON.stringify(pluginsData);
});

ipcMain.on("update-plugin-config", (_, payload: UpdatePluginConfig) => {
	store.set(`${payload.property}`, payload.newConfig);
});

ipcMain.on("delete-plugin", (_, payload: DeletePlugin) => {
	console.log(
		`TCL -> file: main.ts:139 -> ipcMain.on("delete-plugin") -> payload:`,
		payload
	);
	//Delete from store
	if (!store.has(`plugins.${payload.name}`)) return;
	console.log(store.get(`plugins.${payload.name}`));
	store.delete<keyof MainSchema>(
		`plugins.${payload.name}` as keyof MainSchema
	);
	// store.delete(`plugins.${payload.name}`);
	//Delete from plugins folder
	const pluginPath = join(app.getPath("userData"), "plugins", payload.name);
	if (!existsSync(pluginPath)) return;
	rmSync(pluginPath, { recursive: true, force: true });
});

ipcMain.on("get-current-theme", (e) => {
	const currentTheme = store.get("themes.currentTheme");
	e.returnValue = currentTheme;
});
