console.log("ytm-desktop started");

import { BrowserWindow, Menu, app, globalShortcut, ipcMain } from "electron";

import defaultConfig from "@config/defaults";
import { initializePlugins } from "@utils/plugins";
import path from "path";
import { setApplicationMenu } from "./menu";

const createMainWindow = () => {
	const mainWindow = new BrowserWindow({
		width: defaultConfig.windowSize.width,
		height: defaultConfig.windowSize.height,
		webPreferences: {
			preload: path.join(__dirname, "preload.ts"),
		},
		show: false,
	});

	mainWindow.loadURL(defaultConfig.url);
	mainWindow.once("ready-to-show", () => mainWindow.show());
	initializePlugins(mainWindow);
	setApplicationMenu(mainWindow);
};

app.whenReady()
	.then(() => {
		globalShortcut.register("Alt+CommandOrControl+Shift+I", () => {
			console.log("Electron loves global shortcuts!");
		});
	})
	.then(createMainWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});
