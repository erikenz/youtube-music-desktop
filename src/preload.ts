// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
	loadPreferences: () => ipcRenderer.invoke("load-prefs"),
	fetchPlugins: () => ipcRenderer.sendSync("fetch-plugins"),
	getInstalledPlugins: () => ipcRenderer.sendSync("get-installed-plugins"),
});
