export interface IElectronAPI {
	loadPreferences: () => Promise<void>;
	greet: (message: string) => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
	// interface API extends Window {
	// 	electronAPI: IElectronAPI;
	// }
}
