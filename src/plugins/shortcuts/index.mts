import { registerShortcuts, unregisterShortcuts } from "./back";

import { Plugin } from "#types/plugin";
import { getPluginSchema } from "./config";
export default (): Plugin => {
	return {
		name: "shortcuts",
		displayName: "Global Shortcuts",
		start: registerShortcuts,
		stop: unregisterShortcuts,
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
