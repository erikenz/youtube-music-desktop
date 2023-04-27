import {} from "@utils/plugins";

import { BrowserWindow, MenuItemConstructorOptions } from "electron";

import Prompt from "@components/prompt/index";

function getPluginMenu(win: BrowserWindow): MenuItemConstructorOptions {
	return {
		label: "Keyboard Shortcuts",
		click: () => {
			console.log(`clicked keyboard shortcuts`);
			// Open shortcut configuration window
			Prompt({ parent: win, width: 400, height: 400 });
			// const shortcuts = new BrowserWindow({
			// 	width: 400,
			// 	height: 400,
			// 	parent: win,
			// });
		},
	};
}
export default getPluginMenu;
