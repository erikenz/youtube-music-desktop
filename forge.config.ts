import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
	packagerConfig: {},
	rebuildConfig: {},
	makers: [
		new MakerSquirrel({}),
		new MakerZIP({}, ["darwin"]),
		new MakerRpm({}),
		new MakerDeb({}),
	],
	plugins: [
		new WebpackPlugin({
			mainConfig,
			renderer: {
				config: rendererConfig,
				entryPoints: [
					//? Main window
					{
						html: "./src/windows/index.html",
						// js: "./src/windows/main/App.tsx",
						js: "./src/renderer.ts",
						name: "main_window",
						preload: {
							js: "./src/preload.ts",
						},
					},
					//? Plugins window
					{
						html: "./src/windows/index.html",
						js: "./src/windows/plugins/Plugins.tsx",
						name: "plugins_window",
						preload: {
							// js: "./src/preload.ts",
							js: "./src/windows/plugins/preload.ts",
						},
					},
				],
			},
			devServer: {
				hot: true,
				liveReload: false,
			},
		}),
	],
};

export default config;
