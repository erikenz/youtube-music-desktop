export type Lang = "en" | "es";

export interface WindowPos {
	x?: number;
	y?: number;
}
export interface WindowSize {
	width?: number;
	height?: number;
}
export interface AppConfig {
	autoUpdates: boolean;
	resumeOnStart: boolean;
	disableHardwareAcceleration: boolean;
	startAtLogin: boolean;
}
export interface PluginConfig {
	[key: string]: {
		enabled: boolean;
		config: object;
	};
}
export interface MainSchema {
	windowSize: WindowSize;
	windowPos: WindowPos;
	windowMaximized: boolean;
	windowAlwaysOnTop: boolean;
	url: string;
	lang: Lang;
	options: AppConfig;
	plugins: object;
	themes: object;
}
export interface NewSchema {
	[key: string]: {};
}
