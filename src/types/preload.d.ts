import type {
	PluginGitHub,
	PluginDataOld,
	DeletePlugin,
	UpdatePluginConfig,
	PluginData,
	FetchPlugin,
	InstalledPlugins,
} from "#types/plugin";
import type { MainSchema } from "#types/store";
export interface ElectronAPI {
	//Fetch themes from github
	//Store fetched themes
	//Install theme
	//Get installed themes
	//Update theme config
	//Get active theme
	getCurrentTheme: () => string;
	//Delete theme
	ping: () => string;
}
export interface PluginAPI {
	//Fetch from github
	fetchPlugins: () => FetchPlugin[];
	fetchPlugin: (pluginName: string) => FetchPlugin;
	//Store fetched plugins
	storeRemotePlugins: (plugins: FetchPlugin[]) => void;
	getRemotePlugins: () => FetchPlugin[];
	//Install plugin
	installPlugin: (payload: PluginGitHub) => void;
	receiveDownloadProgress: (progress: {}) => {};
	receiveDownloadCompleted: (item: {}) => {};
	//Get installed plugins
	getPluginsData: () => string;
	getInstalledPlugins: () => InstalledPlugins;
	//Update plugin config
	updatePluginConfig: ({ property, newConfig }: UpdatePluginConfig) => void;
	//Delete plugin
	deletePlugin: (payload: DeletePlugin) => void;
	//Open plugin link
	openPluginLink: (payload: string) => void;

	//Get active theme
	getCurrentTheme: () => string;
}
declare global {
	interface Window {
		electronAPI: ElectronAPI;
		pluginAPI: PluginAPI;
	}
}
