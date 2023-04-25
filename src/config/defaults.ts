interface MainConfig {
	windowSize: {
		width: number;
		height: number;
	};
	url: string;
	lang: "en" | "es";
	options: {
		autoUpdates: boolean;
		resumeOnStart: boolean;
		disableHardwareAcceleration: boolean;
		startAtLogin: boolean;
	};
	plugins: Object;
}

const mainConfig: MainConfig = {
	windowSize: {
		width: 1100,
		height: 550,
	},
	url: "https://music.youtube.com",
	lang: "en",
	options: {
		autoUpdates: false,
		resumeOnStart: false,
		disableHardwareAcceleration: false,
		startAtLogin: false,
	},
	plugins: {},
};
export default mainConfig;
