import type { BrowserWindow, MenuItemConstructorOptions } from "electron";
import { existsSync, lstatSync, readdirSync } from "fs";

import { app } from "electron";
import path from "path";
import store from "../config/store";

export function toggleEnabled(pluginName: string) {
	store.set(pluginName, !store.get(pluginName));
}

export function getAllPlugins() {
	const pluginsPath = path.join(__dirname, "..", "plugins");
	// const pluginsPath = `${app.getPath("userData")}/content.txt`;
	console.log(
		`🚀 => file: plugins.ts:13 => getAllPlugins => pluginsPath:`,
		pluginsPath
	);
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
	console.log(
		`🚀 => file: plugins.ts:33 => getAllPlugins => plugins:`,
		plugins
	);
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
			// console.log(
			// 	`🚀 => file: plugins.ts:48 => menuArray => menu:`,
			// 	menu
			// );
			return menu;

			// const getMenu = async (): Promise<MenuItemConstructorOptions> => {
			// 	const getPluginMenu = await import(menuPath);
			// 	const menu = getPluginMenu.default();
			// 	return menu;
			// };
			// return getMenu();
			return { label: "test" };
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
	console.log(
		`🚀 => file: plugins.ts:63 => menuArray => menuArray:`,
		menuArray
	);
	return menuArray;
	// return [{ label: "test" }];
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
	console.log(`🚀 => file: plugins.ts:70 => plugins => plugins:`, plugins);
}
