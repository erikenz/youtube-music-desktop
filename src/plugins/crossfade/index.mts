import { Plugin } from "#types/plugin";
import { pluginSchema } from "./config";
export default (): Plugin => {
	return {
		id: "crossfade",
		displayName: "Crossfade",
		start: () => console.log("start plugin crossfade"),
		stop: () => console.log("stop plugin crossfade"),
		schema: pluginSchema,
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
