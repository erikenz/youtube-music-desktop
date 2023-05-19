// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import type {
	DeletePlugin,
	PluginGitHub,
	UpdatePluginConfig,
} from "#types/plugin";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
	loadPreferences: () => ipcRenderer.invoke("load-prefs"),
	fetchPlugins: () => ipcRenderer.invoke("fetch-plugins"),
	fetchPlugin: (pluginName: string) =>
		ipcRenderer.invoke("fetch-plugin", pluginName),
	storeRemotePlugins: (plugins: PluginGitHub[]) =>
		ipcRenderer.send("store-remote-plugins", plugins),
	getRemotePlugins: () => ipcRenderer.invoke("get-remote-plugins"),
	downloadPlugin: (payload: PluginGitHub) =>
		ipcRenderer.send("download-plugin", payload),
	receiveDownloadProgress: (listener: (data: {}) => void) =>
		ipcRenderer.on("download-progress", (_, data) => listener(data)),
	receiveDownloadCompleted: (listener: (data: {}) => void) =>
		ipcRenderer.on("download-completed", (_, data) => listener(data)),
	getInstalledPlugins: () => ipcRenderer.sendSync("get-installed-plugins"),
	getPluginsData: () => ipcRenderer.invoke("get-plugins-data"),
	updatePluginConfig: (payload: UpdatePluginConfig) =>
		ipcRenderer.send("update-plugin-config", payload),
	deletePlugin: (payload: DeletePlugin) =>
		ipcRenderer.send("delete-plugin", payload),
	getCurrentTheme: () => ipcRenderer.sendSync("get-current-theme"),
	openInstallPluginWindow: () =>
		ipcRenderer.send("open-install-plugin-window"),
});
