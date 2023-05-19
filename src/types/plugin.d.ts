import type { MainSchema, NewSchema } from "#types/config";
import { Stats } from "fs";
import type { Schema } from "electron-store";
export interface Plugin {
	id: string;
	displayName: string;
	start: () => void;
	stop: () => void;
	schema: Schema<NewSchema>;
	front?: () => void;
	back?: () => void;
	menu?: PluginMenuConstructorOptions[];
}
export interface PluginFiles {
	name: string;
	dir: string;
	files: {
		fileName: string;
		stats: Stats;
	}[];
	totalSize: number;
}
export interface PluginGitHub {
	download_url: string | null;
	git_url: string;
	html_url: string;
	name: string;
	path: string;
	sha: string;
	size: number;
	type: "dir" | "file";
	url: string;
	_links: {
		git: string;
		html: string;
		self: string;
	};
}
export interface PluginDataOld {
	files: PluginFiles;
	config: {
		enabled: boolean;
		[key: string]: any;
	};
}
export interface UpdatePluginConfig {
	property: object | string;
	newConfig: object | string | number | boolean | Array<any>;
}
export interface DeletePlugin {
	name: string;
}
export interface PluginMenuConstructorOptions {
	label?: { text: string; position?: "outside" | "inside" };
	type?: "input" | "shortcut" | "select" | "checkbox" | "button";
	options?: string[] | number[];
	defaultValue?: any;
	submenu?: PluginMenuConstructorOptions[];
	saveLocation?: string;
}
export interface PluginData {
	id: string;
	displayName: string;
	start: () => void;
	stop: () => void;
	schema: Schema<NewSchema>;
	menu?: PluginMenuConstructorOptions[];
	files: {
		dirName: string;
		path: string;
		files: {
			fileName: string;
			stats: Stats;
		}[];
		totalSize: number;
	};
	github?: PluginGitHub;
	config: {
		// enabled: boolean;
		[key: string]: any;
	};
}
