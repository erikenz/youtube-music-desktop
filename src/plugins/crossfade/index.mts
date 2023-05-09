import { Plugin } from "#types/plugin";
import { getPluginSchema } from "./config";
export default (): Plugin => {
	return {
		name: "crossfade",
		displayName: "Crossfade",
		start: () => console.log("start plugin crossfade"),
		stop: () => console.log("stop plugin crossfade"),
		getConfig: getPluginSchema,
	};
};
// const index: Export = {
// 	front: "pathToFront",
// 	back: "pathToBack",
// 	config: "pathToConfig",
// 	init: () => console.log("init"),
// 	displayName: "Global Shortcuts",
// };
// export default index;
