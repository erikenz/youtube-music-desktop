// Export object declaring what to display in the plugin config
//e.g
import type { PluginMenuConstructorOptions } from "#types/plugin";

export const pluginMenu: PluginMenuConstructorOptions[] = [
	{
		label: { text: "Next Song" },
		submenu: [
			{
				type: "shortcut",
				defaultValue: "Ctrl+Shift+Alt+ArrowRight",
			},
			{
				type: "select",
				options: ["local", "global"],
			},
		],
		saveLocation: "actions.next",
	},
];
