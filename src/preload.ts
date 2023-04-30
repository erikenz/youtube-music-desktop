// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
	loadPreferences: () => ipcRenderer.invoke("load-prefs"),
	openPage: (page: string) => ipcRenderer.send("open_page", page),
	greet: (message: string) => ipcRenderer.send("greet", message),
	fetchPlugins: () => ipcRenderer.sendSync("fetch-plugins"),
});

window.addEventListener("DOMContentLoaded", () => {
	ipcRenderer.on("asynchronous-reply", (event, arg) => {
		console.log(arg);
	});
});
