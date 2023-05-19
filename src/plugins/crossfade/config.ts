import { PluginConfig } from "./types";
import { Schema } from "electron-store";
export const pluginSchema: Schema<PluginConfig> = {
	crossfade: {
		type: "object",
		properties: {
			enabled: {
				type: "boolean",
				default: true,
			},
			crossfadeTime: {
				type: "number",
				default: 3,
			},
		},
		default: {},
	},
};
