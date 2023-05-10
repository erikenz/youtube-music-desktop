import type { MainSchema, NewSchema } from "#types/config";
import Store, { Schema } from "electron-store";

export const configSchema: Schema<MainSchema> = {
	windowPos: {
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
		},
	},
	windowSize: {
		type: "object",
		properties: {
			size: {
				type: "object",
				properties: {
					width: {
						type: "number",
					},
					height: {
						type: "number",
					},
				},
			},
		},
	},
	windowMaximized: {
		type: "boolean",
		default: false,
	},
	windowAlwaysOnTop: {
		type: "boolean",
		default: false,
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
		properties: {},
		default: {},
	},
	themes: {
		type: "object",
		properties: {
			currentTheme: {
				type: "string",
			},
		},
		default: {
			currentTheme: "dark",
		},
	},
};
export let store: Store<MainSchema>;
export const createStore = () => {
	store = new Store<MainSchema>({
		schema: configSchema,
		clearInvalidConfig: true,
		accessPropertiesByDotNotation: true,
	});
};

export const updateStore = (
	parent: keyof Schema<MainSchema>,
	newSchema: Schema<NewSchema>
) => {
	configSchema[parent].properties = newSchema;

	createStore();
};
// export const store = new Store<MainSchema>({
// 	schema: configSchema,
// 	clearInvalidConfig: true,
// 	accessPropertiesByDotNotation: true,
// });
