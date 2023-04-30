import { BrowserWindow, BrowserWindowConstructorOptions, app } from "electron";

import type { WindowProps } from "#types/main";

export const makeWindow = ({ PRELOAD, URL, ...props }: WindowProps) => {
	// Create the browser window.
	const win = new BrowserWindow({
		show: false,
		resizable: true,
		maximizable: true,
		transparent: false,
		autoHideMenuBar: true,
		backgroundColor: "#23272E",
		webPreferences: {
			preload: PRELOAD,
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: true,
			// enableRemoteModule: true,
			devTools: !app.isPackaged,
		},
		...props,
	});

	win.loadURL(URL);
	win.on("ready-to-show", function () {
		win.show();
		// win.focus();
	});

	return win;
};
