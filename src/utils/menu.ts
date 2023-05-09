import {
	BrowserWindow,
	Item,
	Menu,
	MenuItemConstructorOptions,
} from "electron";
import { readFileSync, readdirSync } from "fs";

import { Windows } from "@src/types/window";
import { getAllPlugins } from "@utils/plugins";
import { mainMenuTemplate } from "@src/menu";
import path from "path";
import { store } from "@config/store";

export async function getPluginMenu(path: string) {
	try {
		const getPluginMenu = await import(path);
		return getPluginMenu.default;
	} catch (error) {
		console.error(error);
	}
}

export function getPluginsMenu(win?: BrowserWindow) {
	// Promise.resolve(setTimeout(() => {}, 1000));
	return getAllPlugins().map(async (plugin) => {
		const hasMenu = plugin.files.includes("menu.ts");
		let menu: MenuItemConstructorOptions | Item;
		if (hasMenu) {
			try {
				const menuPath = path.join(plugin.dir, "menu.ts");
				console.log(
					`TCL -> file: plugins.ts:45 -> menuArray -> menuPath:`,
					menuPath
				);
				// console.log(readFileSync(menuPath, { encoding: "utf-8" }));
				import(menuPath)
					.then((menuModule) => {
						console.log(
							`TCL -> file: menu.ts:36 -> import -> menuModule:`,
							menuModule
						);
						menu = menuModule.default();
						console.log(
							`TCL -> file: menu.ts:37 -> import -> menu:`,
							menu
						);
					})
					.catch((error) => console.error(error));
			} catch (error) {
				console.error(error);
			}
		} else {
			menu = {
				label: plugin.label,
				type: "checkbox",
				checked: store.get(`plugins.${plugin.label}.enabled`),
				click: () =>
					store.set(
						`plugins.${plugin.label}.enabled`,
						!store.get(`plugins.${plugin.label}.enabled`)
					),
			};
		}
		return menu;
	});
	// return Promise.resolve(menuArray);
}

// export async function setWindowMenu(win: BrowserWindow, menu: Menu) {
// 	// const menuArray = getPluginsMenu();
// 	// const menu = Menu.buildFromTemplate(menuArray);
// 	// const menu = Menu.buildFromTemplate(menuArray);
// 	// win.setMenu(menu);

//     // const menuTemplate = [...mainMenuTemplate(win)];
// 	// const menu = Menu.buildFromTemplate(menuTemplate);
// 	// Menu.setApplicationMenu(menu);
//     win.setMenu(menu);

// }
export function setAppMenu(windows: Windows) {
	const menuTemplate = [...mainMenuTemplate(windows)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
