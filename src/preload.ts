// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
	loadPreferences: () => ipcRenderer.invoke("load-prefs"),
});

window.addEventListener("DOMContentLoaded", () => {
	ipcRenderer.on("asynchronous-reply", (event, arg) => {
		console.log(arg);
	});
});
