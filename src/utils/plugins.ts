import type { BrowserWindow, MenuItemConstructorOptions } from "electron";
import { lstatSync, readdirSync } from "fs";

import path from "path";
// import store from "../config/store";
import { store } from "@config/store";

export function toggleEnabled(pluginName: string) {
	store.set(pluginName, !store.get(pluginName));
}

export function getAllPlugins() {
	const pluginsPath = path.join(__dirname, "../..", "src/plugins");
	const dir = readdirSync(pluginsPath);
	const rawPlugins = dir
		.map((dirName) => path.join(pluginsPath, dirName))
		.filter(
			(source) =>
				lstatSync(source).isDirectory() &&
				path.basename(source) !== "template"
		);
	const plugins = rawPlugins.map((dir) => {
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
export function getAllPluginMenus(
	win: BrowserWindow
): MenuItemConstructorOptions[] {
	const menuArray = getAllPlugins().map((plugin) => {
		const hasMenu = plugin.files.includes("menu.js");
		if (hasMenu) {
			const menuPath = path.join(plugin.dir, "menu.js");
			const getPluginMenu = require(menuPath);
			const menu = getPluginMenu.default(win);
			return menu;
		}
		return {
			label: plugin.label,
			type: "checkbox",
			checked: store.get(`plugins.${plugin.label}.enabled`),
			click: () =>
				store.set(
					`plugins.${plugin.label}.enabled`,
					!store.get(`plugins.${plugin.label}.enabled`)
				),
		};
	});
	return menuArray;
}

export function initializePlugins(win: BrowserWindow) {
	const plugins = getAllPlugins();
	if (!store.has("plugins")) {
		store.set("plugins", {});
	}
	plugins.forEach((plugin) => {
		const configExists = store.has(`plugins.${plugin.label}`);
		if (!configExists) {
			store.set(`plugins.${plugin.label}`, true);
		}
	});
}
