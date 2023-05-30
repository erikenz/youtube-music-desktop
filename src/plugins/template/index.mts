import { PluginExport } from "#types/plugin";
import { getPluginSchema } from "./config";
export default (): PluginExport => {
	return {
		name: "name", //Name of the plugin
		displayName: "displayName", //Name displayed in the store
		start: () => {
			//Function to start the plugin
		},
		stop: () => {
			//Function to stop the plugin
		},
		getConfig: getPluginSchema,
	};
};
// const index: Export = {
// 	front: "pathToFront",
// 	back: "pathToBack",
// 	config: "pathToConfig",
// 	init: registerShortcuts,
// 	displayName: "Global Shortcuts",
// };
// export default index;
