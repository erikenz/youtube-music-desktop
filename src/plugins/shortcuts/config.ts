import { PluginConfig } from "./types";
import { Schema } from "electron-store";
export const getPluginSchema = (): Schema<PluginConfig> => {
	return {
		shortcuts: {
			type: "object",
			properties: {
				enabled: {
					type: "boolean",
					default: true,
				},
				actions: {
					type: "object",
					properties: {
						next: {
							type: "string",
						},
						previous: {
							type: "string",
						},
						playPause: {
							type: "string",
						},
						volumeUp: {
							type: "string",
						},
						volumeDown: {
							type: "string",
						},
						mute: {
							type: "string",
						},
						like: {
							type: "string",
						},
						dislike: {
							type: "string",
						},
						shuffle: {
							type: "string",
						},
						repeat: {
							type: "string",
						},
					},
					default: {
						nextSong: "",
						previousSong: "",
						playPause: "",
						volumeUp: "",
						volumeDown: "",
						mute: "",
						like: "",
						dislike: "",
						shuffle: "",
						repeat: "",
					},
				},
				overrideMediaKeys: {
					type: "boolean",
					default: false,
				},
			},
			default: {},
		},
	};
};
