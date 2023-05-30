// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import type {
	DeletePlugin,
	PluginGitHub,
	UpdatePluginConfig,
} from "#types/plugin";
import { contextBridge, ipcRenderer } from "electron";

import { Navigation } from "@components/Navigation";
import React from "react";
import ReactDOM from "react-dom";

// document.addEventListener("DOMContentLoaded", () => {
//Load the front end part of plugins
// const navBar = document.getElementsByClassName(
// 	"center-content style-scope ytmusic-nav-bar"
// )[0];
// console.log(
// 	`TCL -> file: preload.ts:20 -> document.addEventListener -> navBar:`,
// 	navBar
// );
// const navigationComponent = document.createElement("div");
// navBar.appendChild(navigationComponent);
// ReactDOM.render(React.createElement(Navigation), navigationComponent);
// });
window.addEventListener("DOMContentLoaded", () => {
	const navBar = document.getElementsByClassName(
		"center-content style-scope ytmusic-nav-bar"
	)[0];
	console.log(
		`TCL -> file: preload.ts:20 -> document.addEventListener -> navBar:`,
		navBar
	);
	const navigationComponent = document.createElement("div");
	navBar.appendChild(navigationComponent);
	ReactDOM.render(React.createElement(Navigation), navigationComponent);
});

contextBridge.exposeInMainWorld("electronAPI", {
	// //Fetch from github
	// fetchPlugins: () => ipcRenderer.invoke("fetch-plugins"),
	// fetchPlugin: (pluginName: string) =>
	// 	ipcRenderer.invoke("fetch-plugin", pluginName),
	// //Store fetched plugins
	// storeRemotePlugins: (plugins: PluginGitHub[]) =>
	// 	ipcRenderer.send("store-remote-plugins", plugins),
	// getRemotePlugins: () => ipcRenderer.invoke("get-remote-plugins"),
	// //Install plugin
	// installPlugin: (payload: PluginGitHub) =>
	// 	ipcRenderer.send("install-plugin", payload),
	// receiveDownloadProgress: (listener: (data: {}) => void) =>
	// 	ipcRenderer.on("download-progress", (_, data) => listener(data)),
	// receiveDownloadCompleted: (listener: (data: {}) => void) =>
	// 	ipcRenderer.on("download-completed", (_, data) => listener(data)),
	// //Get installed plugins
	// getPluginsData: () => ipcRenderer.invoke("get-plugins-data"),
	// getInstalledPlugins: () => ipcRenderer.invoke("get-installed-plugins"),
	// //Update plugin config
	// updatePluginConfig: (payload: UpdatePluginConfig) =>
	// 	ipcRenderer.send("update-plugin-config", payload),
	// //Delete plugin
	// deletePlugin: (payload: DeletePlugin) =>
	// 	ipcRenderer.send("delete-plugin", payload),
	//Fetch themes from github
	//Store fetched themes
	//Install theme
	//Get installed themes
	//Update theme config
	//Get active theme
	getCurrentTheme: () => ipcRenderer.sendSync("get-current-theme"),
	//Delete theme

	// //Open link
	// openLink: (payload: string) => ipcRenderer.send("open-link", payload),
	//Load plugin
	ping: () => ipcRenderer.sendSync("ping"),
});
