import { BrowserWindow, app } from "electron";
import { lstatSync, readdirSync } from "fs";
import { store, updateStore } from "@config/store";

import type { NewSchema } from "#types/config";
import type { PluginFiles } from "#types/plugin";
import type { Schema } from "electron-store";
import path from "path";

export function toggleEnabled(pluginName: string) {
	store.set(pluginName, !store.get(pluginName));
}

export function getAllPlugins(): PluginFiles[] {
	const pluginsFolderPath = path.join(__dirname, "../../src/plugins");
	const pluginsFolder = readdirSync(pluginsFolderPath)
		.map((dir) => path.join(pluginsFolderPath, dir))
		.filter(
			(dir) =>
				lstatSync(dir).isDirectory() &&
				readdirSync(dir).length > 0 &&
				path.basename(dir) !== "template" &&
				path.basename(dir) !== "test"
		);
	const plugins = pluginsFolder.map((plugin) => {
		return {
			name: path.basename(plugin),
			dir: plugin,
			files: readdirSync(plugin, { withFileTypes: true }).map(
				(file) => file.name
			),
		};
	});

	return plugins;
}

export async function setPluginSchemas(plugins: PluginFiles[]) {
	const schemas: Schema<NewSchema>[] = await Promise.all(
		plugins.map(async (plugin) => {
			const pluginData = await import(
				/* webpackInclude: /\.mts$/ */
				/* webpackChunkName: "plugin-data" */
				/* webpackMode: "eager" */
				`../plugins/${plugin.name}/index.mts`
			);
			const schema: Schema<NewSchema> = pluginData.default().getConfig();
			return schema;
		})
	);
	console.log(
		`TCL -> file: plugins.ts:49 -> schemas -> schemas:`,
		Object.assign({}, ...schemas)
	);
	updateStore("plugins", Object.assign({}, ...schemas));
}
export async function loadPlugins(win: BrowserWindow) {
	const plugins = getAllPlugins();
	if (!store.has("plugins")) {
		store.set("plugins", {});
	}
	// Update store with plugin schemas
	//? Could implement function to detect if schema already exists and only update if it doesn't and have another function to override schema
	await setPluginSchemas(plugins);

	// Get enabled plugins and run each plugin startup function
	// store.get("plugins").forEach((plugin: PluginConfig) => {})
}
