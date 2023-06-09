import type { MenuItemConstructorOptions } from "electron";
import { existsSync } from "fs";
import { getAllPlugins } from "@utils/plugins";
import path from "path";
import store from "./store";

//? Move Plugins menu creation here
const pluginsConfig = new Map();
export function getAllPluginMenu(): MenuItemConstructorOptions[] {
	const menuArray = getAllPlugins().map((plugin) => {
		const hasMenu = plugin.files.includes("menu.js");
		if (hasMenu) {
			const menuPath = path.join(plugin.dir, "menu.js");
			const getPluginMenu = require(menuPath);
			const menu = getPluginMenu.default();
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
		// const pluginPath = path.join(
		// 	__dirname,
		// 	"plugins",
		// 	plugin,
		// 	"menu.ts"
		// );
		// if (existsSync(pluginPath)) {
		// 	const getPluginMenu = require(pluginPath);
		// 	const menu = getPluginMenu();
		// 	console.log(menu);
		// 	return menu;
		// }
	});

	return menuArray;
}
export default pluginsConfig;
// const pluginConfig = {
// 	// List of plugins autogenerated by reading the plugins folder and adding an enabled property
// 	// Example
// 	shortcuts: {
// 		enabled: true,
// 	},
// };
