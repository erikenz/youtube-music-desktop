import { Menu } from "electron";
import { Windows } from "#types/window";
import { mainMenuTemplate } from "../menu";

export function setAppMenu(windows: Windows) {
	const menuTemplate = [...mainMenuTemplate(windows)];
	const menu = Menu.buildFromTemplate(menuTemplate);
	windows.main.setMenu(menu);
	// Menu.setApplicationMenu(menu);
}
