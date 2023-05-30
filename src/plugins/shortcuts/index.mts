import { registerShortcuts, unregisterShortcuts } from "./back";

import { PluginExport } from "#types/plugin";
import { pluginMenu } from "./menu";
import { pluginSchema } from "./config";

export default (): PluginExport => {
	return {
		id: "shortcuts",
		displayName: "Global Shortcuts",
		start: registerShortcuts,
		stop: unregisterShortcuts,
		schema: pluginSchema,
		menu: pluginMenu,
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
