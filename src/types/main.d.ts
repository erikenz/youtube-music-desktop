import type {
	BrowserWindow,
	WebPreferences,
	BrowserWindowConstructorOptions,
} from "electron";

export interface Windows {
	[window: string]: BrowserWindow | null;
	main: BrowserWindow | null;
	pluginsInstall: BrowserWindow | null;
}
export interface WindowProps extends BrowserWindowConstructorOptions {
	PRELOAD?: WebPreferences["preload"];
	URL: string;
}
