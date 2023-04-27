import { lstatSync, readdirSync } from "fs";

import type { BrowserWindow } from "electron";
import path from "path";
import store from "@config/store";

export default function getAllPlugins() {
	const plugins = readdirSync(__dirname)
		.map((dirName) => path.join(__dirname, dirName))
		.filter(
			(source) =>
				lstatSync(source).isDirectory() &&
				path.basename(source) !== "template"
		)
		.map((dir) => {
			return {
				label: path.basename(dir),
				dir,
				files: readdirSync(dir, { withFileTypes: true }).map(
					(file) => file.name
				),
			};
		});
	return plugins;
}

export function toggleEnabled(pluginName: string) {
	store.set(pluginName, !store.get(pluginName));
}

export function initializePlugins(win: BrowserWindow) {
	const plugins = getAllPlugins().forEach((plugin) => {
		console.log(`🚀 => file: utils.ts:39 => plugins => plugin:`, plugin);
		const configExists = store.has(`plugins.${plugin.label}`);
		console.log(
			`🚀 => file: utils.ts:35 => plugins => configExists:`,
			configExists
		);
		if (!configExists) {
			store.set(`plugins.${plugin.label}`, true);
		}
	});
}
