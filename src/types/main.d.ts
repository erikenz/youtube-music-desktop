import type { BrowserWindow } from "electron";

export interface Windows {
	[window: string]: BrowserWindow | null;
	main: BrowserWindow | null;
	pluginsInstall: BrowserWindow | null;
}
