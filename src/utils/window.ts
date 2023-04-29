import { BrowserWindow, BrowserWindowConstructorOptions, app } from "electron";

import type { WebPreferences } from "electron";
export const makeWindow = (
	PRELOAD: WebPreferences["preload"],
	URL: string,
	more?: BrowserWindowConstructorOptions
) => {
	// Create the browser window.
	const win = new BrowserWindow({
		show: false,
		resizable: true,
		maximizable: true,
		transparent: false,
		autoHideMenuBar: true,
		backgroundColor: "black",
		webPreferences: {
			preload: PRELOAD,
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false,
			// enableRemoteModule: true,
			devTools: !app.isPackaged,
		},
		...more,
	});

	win.loadURL(URL);
	win.on("ready-to-show", function () {
		win.show();
		win.focus();
	});

	return win;
};
