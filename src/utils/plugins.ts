import { BrowserWindow, app } from "electron";
import type { PluginData, PluginExport, PluginGitHub } from "#types/plugin";
import { lstatSync, readdirSync, statSync } from "fs";
import { store, updateStore } from "@config/store";

import type { NewSchema } from "#types/config";
import type { Schema } from "electron-store";
import is from "electron-is";
import path from "path";

export function toggleEnabled(pluginName: string) {
	store.set(pluginName, !store.get(pluginName));
}
export function getInstalledPlugins() {
	const installed = readdirSync(
		path.join(app.getPath("userData"), "plugins")
	);
	return installed;
}
export async function getPlugins(): Promise<PluginData[]> {
	//Get files
	const pluginsFolderPath = is.dev()
		? path.join(__dirname, "../../src/plugins")
		: path.join(app.getPath("userData"), "plugins");
	console.log(
		`TCL -> file: plugins.ts:17 -> getPlugins -> pluginsFolderPath:`,
		pluginsFolderPath
	);
	const pluginDirs = readdirSync(pluginsFolderPath)
		.map((dir) => path.join(pluginsFolderPath, dir))
		.filter(
			(dir) =>
				lstatSync(dir).isDirectory() &&
				readdirSync(dir).length > 0 &&
				path.basename(dir) !== "template" &&
				path.basename(dir) !== "test"
		);
	const pluginFiles = pluginDirs.map((pluginDir) => {
		const files = readdirSync(pluginDir, { withFileTypes: true }).map(
			(file) => ({
				fileName: file.name,
				stats: statSync(path.join(pluginDir, file.name)),
			})
		);
		const size = files.reduce((acc, cur) => acc + cur.stats.size, 0);
		return {
			dirName: path.basename(pluginDir),
			dir: pluginDir,
			files: files,
			totalSize: size,
		};
	});
	const plugins = await Promise.all(
		pluginFiles.map(async (plugin) => {
			const pluginDataRaw = await import(
				/* webpackInclude: /\.mts$/ */
				/* webpackChunkName: "plugin-data" */
				/* webpackMode: "eager" */
				`../plugins/${plugin.dirName}/index.mts`
			);
			const pluginData: PluginExport = pluginDataRaw.default();
			//Get config schema
			const schema: Schema<NewSchema> = pluginData.schema;
			//Get store
			const pluginConfig: typeof schema = store.get(
				`plugins.${plugin.dirName}`
			);
			//Fetch github
			// const pluginGitHub: PluginGitHub = await fetch(
			// 	`https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins/${plugin.dirName}`
			// ).then((response) => response.json());

			return {
				id: plugin.dirName,
				files: {
					dirName: plugin.dirName,
					path: plugin.dir,
					files: plugin.files,
					totalSize: plugin.totalSize,
				},
				displayName: pluginData.displayName,
				start: pluginData.start,
				stop: pluginData.stop,
				schema: schema,
				menu: pluginData.menu,
				// github: pluginConfig.github,
				config: pluginConfig,
			};
		})
	);
	return plugins;
}
// export function getAllPlugins(): PluginFiles[] {
// 	const pluginsFolderPath = path.join(__dirname, "../../src/plugins");
// 	const pluginsFolder = readdirSync(pluginsFolderPath)
// 		.map((dir) => path.join(pluginsFolderPath, dir))
// 		.filter(
// 			(dir) =>
// 				lstatSync(dir).isDirectory() &&
// 				readdirSync(dir).length > 0 &&
// 				path.basename(dir) !== "template" &&
// 				path.basename(dir) !== "test"
// 		);
// 	const plugins = pluginsFolder.map((plugin) => {
// 		const files = readdirSync(plugin, { withFileTypes: true }).map(
// 			(file) => ({
// 				fileName: file.name,
// 				stats: statSync(path.join(plugin, file.name)),
// 			})
// 		);
// 		const size = files.reduce((acc, cur) => acc + cur.stats.size, 0);
// 		return {
// 			name: path.basename(plugin),
// 			dir: plugin,
// 			files: files,
// 			totalSize: size,
// 		};
// 	});

// 	return plugins;
// }

// export async function setPluginSchemas(plugins: PluginFiles[]) {
// 	const schemas: Schema<NewSchema>[] = await Promise.all(
// 		plugins.map(async (plugin) => {
// 			const pluginData = await import(
// 				/* webpackInclude: /\.mts$/ */
// 				/* webpackChunkName: "plugin-data" */
// 				/* webpackMode: "eager" */
// 				`../plugins/${plugin.name}/index.mts`
// 			);
// 			const schema: Schema<NewSchema> = pluginData.default().schema;
// 			console.log(
// 				`TCL -> file: plugins.ts:147 -> plugins.map -> schema:`,
// 				schema
// 			);
// 			return schema;
// 		})
// 	);
// 	updateStore("plugins", Object.assign({}, ...schemas));
// }
export async function loadPlugins(win: BrowserWindow) {
	// const plugins = getAllPlugins();
	if (!store.has("plugins")) {
		store.set("plugins", {});
	}
	// Update store with plugin schemas
	//? Could implement function to detect if schema already exists and only update if it doesn't and have another function to override schema
	// await setPluginSchemas(plugins);

	// Get enabled plugins and run each plugin startup function
	// store.get("plugins").forEach((plugin: PluginConfig) => {})
}
