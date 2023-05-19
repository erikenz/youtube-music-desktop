import type {
	PluginGitHub,
	PluginDataOld,
	DeletePlugin,
	UpdatePluginConfig,
	PluginData,
} from "#types/plugin";
import type { MainSchema } from "#types/store";
export interface IElectronAPI {
	loadPreferences: () => Promise<void>;
	fetchPlugins: () => PluginGitHub[];
	fetchPlugin: (pluginName: string) => PluginGitHub;
	storeRemotePlugins: (plugins: PluginGitHub[]) => void;
	getRemotePlugins: () => PluginGitHub[];
	downloadPlugin: (payload: PluginGitHub) => void;
	receiveDownloadProgress: (progress: {}) => {};
	receiveDownloadCompleted: (item: {}) => {};
	getInstalledPlugins: () => PluginDataOld[];
	// getPluginsData: () => Promise<PluginData[]>;
	getPluginsData: () => string;
	updatePluginConfig: ({ property, newConfig }: UpdatePluginConfig) => void;
	deletePlugin: (payload: DeletePlugin) => void;
	getCurrentTheme: () => string;
	openInstallPluginWindow: () => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
	// interface API extends Window {
	// 	electronAPI: IElectronAPI;
	// }
}
