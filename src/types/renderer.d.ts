import { PluginGitHub, PluginFiles } from "#types/plugin";
export interface IElectronAPI {
	loadPreferences: () => Promise<void>;
	greet: (message: string) => void;
	fetchPlugins: () => PluginGitHub[];
	getInstalledPlugins: () => PluginFiles[];
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
	// interface API extends Window {
	// 	electronAPI: IElectronAPI;
	// }
}
