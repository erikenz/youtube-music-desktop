// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import type {
	DeletePlugin,
	PluginGitHub,
	UpdatePluginConfig,
} from "#types/plugin";
import { contextBridge, ipcRenderer } from "electron";

// document.addEventListener("DOMContentLoaded", () => {
// 	const homeText = document.getElementsByClassName(
// 		"tab-title style-scope ytmusic-pivot-bar-item-renderer"
// 	)[0];
// 	homeText.innerHTML = "Test";
// });

contextBridge.exposeInMainWorld("pluginAPI", {
	//Fetch from github
	fetchPlugins: () => ipcRenderer.invoke("fetch-plugins"),
	fetchPlugin: (pluginName: string) =>
		ipcRenderer.invoke("fetch-plugin", pluginName),
	//Store fetched plugins
	storeRemotePlugins: (plugins: PluginGitHub[]) =>
		ipcRenderer.send("store-remote-plugins", plugins),
	getRemotePlugins: () => ipcRenderer.invoke("get-remote-plugins"),
	//Install plugin
	installPlugin: (payload: PluginGitHub) =>
		ipcRenderer.send("install-plugin", payload),
	receiveDownloadProgress: (listener: (data: {}) => void) =>
		ipcRenderer.on("download-progress", (_, data) => listener(data)),
	receiveDownloadCompleted: (listener: (data: {}) => void) =>
		ipcRenderer.on("download-completed", (_, data) => listener(data)),
	//Get installed plugins
	getPluginsData: () => ipcRenderer.invoke("get-plugins-data"),
	getInstalledPlugins: () => ipcRenderer.invoke("get-installed-plugins"),
	//Update plugin config
	updatePluginConfig: (payload: UpdatePluginConfig) =>
		ipcRenderer.send("update-plugin-config", payload),
	//Delete plugin
	deletePlugin: (payload: DeletePlugin) =>
		ipcRenderer.send("delete-plugin", payload),
	//Open plugin link
	openPluginLink: (payload: string) => ipcRenderer.send("open-link", payload),
	//Load plugin

	//! Don't remove this, idk why but it's needed here instead of in the main preload
	//Get active theme
	getCurrentTheme: () => ipcRenderer.sendSync("get-current-theme"),
});
