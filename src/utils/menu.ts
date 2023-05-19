import { Menu } from "electron";
import { Windows } from "@src/types/window";
import { mainMenuTemplate } from "@src/menu";

export function setAppMenu(windows: Windows) {
	const menuTemplate = [...mainMenuTemplate(windows)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}
