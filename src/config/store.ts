import Store, { Schema } from "electron-store";

import type { MainSchema } from "#types/config";

export const configSchema: Schema<MainSchema> = {
	window: {
		type: "object",
		properties: {
			pos: {
				type: "object",
				properties: {
					x: {
						type: "number",
					},
					y: {
						type: "number",
					},
				},
			},
			size: {
				type: "object",
				properties: {
					width: {
						type: "number" || "null",
					},
					height: {
						type: "number" || "null",
					},
				},
			},
			maximized: {
				type: "boolean",
				default: false,
			},
			alwaysOnTop: {
				type: "boolean",
				default: false,
			},
		},
		default: {
			maximized: false,
			alwaysOnTop: false,
		},
	},
	url: {
		type: "string",
		default: "https://music.youtube.com",
	},
	lang: {
		type: "string",
		default: "en",
	},
	options: {
		type: "object",
		properties: {
			autoUpdates: {
				type: "boolean",
				default: false,
			},
			resumeOnStart: {
				type: "boolean",
				default: false,
			},
			disableHardwareAcceleration: {
				type: "boolean",
				default: false,
			},
			startAtLogin: {
				type: "boolean",
				default: false,
			},
		},
		default: {},
	},
	plugins: {
		type: "object",
		default: {},
	},
};

export const store = new Store<MainSchema>({
	schema: configSchema,
	clearInvalidConfig: true,
	accessPropertiesByDotNotation: true,
});
