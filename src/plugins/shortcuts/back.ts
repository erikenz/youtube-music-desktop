import { Shortcuts } from "./types";
import { globalShortcut } from "electron";
import is from "electron-is";
import { store } from "@config/store";

export function registerShortcuts() {
	if (store.has("plugins.shortcuts")) {
		const shortcuts = store.get("plugin.shortcuts") as Shortcuts;
		Object.entries(shortcuts).forEach((shortcut: any) => {
			if (shortcut) {
				globalShortcut.register(shortcut, () => {
					console.log(`[+] ${shortcut} pressed`);
				});
			}
		});
	}
}
export function unregisterShortcuts() {}
export default function back() {
	console.log("this if from plugins/shortcuts/back.ts");
}
