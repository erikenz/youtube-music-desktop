import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import path from "path";

interface PromptInterface extends BrowserWindowConstructorOptions {
	win?: BrowserWindow;
	fileURL?: string;
}
export default function Prompt(params: PromptInterface): void {
	const { fileURL } = params;
	const win = new BrowserWindow({
		...params,
	});
	if (fileURL) {
		win.loadFile(fileURL);
	} else {
		win.loadFile(
			path.join(__dirname, "../../../src/components/prompt/index.html")
		);
	}
}
