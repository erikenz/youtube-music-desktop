export interface IElectronAPI {
	loadPreferences: () => Promise<void>;
}

declare global {
	interface Test extends Window {
		electronAPI: IElectronAPI;
	}
}
