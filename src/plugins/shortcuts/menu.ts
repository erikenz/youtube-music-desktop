import {} from "@plugins/utils";

import type { BrowserWindow, MenuItemConstructorOptions } from "electron";

function getPluginMenu(): MenuItemConstructorOptions {
	return {
		label: "Keyboard Shortcuts",
		click: () => {
			console.log(`clicked keyboard shortcuts`);
			// Open shortcut configuration window
		},
	};
}
export default getPluginMenu;
