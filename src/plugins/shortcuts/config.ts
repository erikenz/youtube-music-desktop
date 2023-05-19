import { PluginConfig } from "./types";
import { Schema } from "electron-store";
export const pluginSchema: Schema<PluginConfig> = {
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
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					previous: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					playPause: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					volumeUp: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					volumeDown: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					mute: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					like: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					dislike: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					shuffle: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
					repeat: {
						type: "object",
						properties: {
							scope: {
								type: "string",
								enum: ["global", "local"],
							},
							shortcut: {
								type: "string",
							},
						},
					},
				},
				default: {
					next: {
						scope: "global",
						shortcut: "",
					},
					previous: {
						scope: "global",
						shortcut: "",
					},
					playPause: {
						scope: "global",
						shortcut: "",
					},
					volumeUp: {
						scope: "global",
						shortcut: "",
					},
					volumeDown: {
						scope: "global",
						shortcut: "",
					},
					mute: {
						scope: "global",
						shortcut: "",
					},
					like: {
						scope: "local",
						shortcut: "",
					},
					dislike: {
						scope: "local",
						shortcut: "",
					},
					shuffle: {
						scope: "local",
						shortcut: "",
					},
					repeat: {
						scope: "local",
						shortcut: "",
					},
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
