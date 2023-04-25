import Store from "electron-store";
import defaults from "./defaults";

const store = new Store({
	defaults,
	clearInvalidConfig: false,
});
export default store;
