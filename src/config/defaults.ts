interface defaultConfig {
	url: string;
	options: {
		autoUpdates: boolean;
		resumeOnStart: boolean;
		disableHardwareAcceleration: boolean;
		startAtLogin: boolean;
	};
}

const defaultConfig: defaultConfig = {
	url: "https://music.youtube.com",
	options: {
		autoUpdates: false,
		resumeOnStart: false,
		disableHardwareAcceleration: false,
		startAtLogin: false,
	},
};
export default defaultConfig;
