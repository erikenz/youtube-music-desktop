export type Lang = "en" | "es";

export interface WindowPos {
	x?: number;
	y?: number;
}
export interface WindowSize {
	width?: number;
	height?: number;
}
export interface WindowConfig {
	pos?: WindowPos;
	size?: WindowSize;
}
export interface AppConfig {
	autoUpdates: boolean;
	resumeOnStart: boolean;
	disableHardwareAcceleration: boolean;
	startAtLogin: boolean;
}
export interface MainSchema {
	window: WindowConfig;
	url: string;
	lang: Lang;
	options: AppConfig;
	plugins: object;
}
