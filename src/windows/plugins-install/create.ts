import { CreateInstallPluginsWindowProps } from "#types/window";
import { createWindow } from "@utils/window";
declare const PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY: string;
declare const PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
export const createPluginsInstallWindow = ({
	windows,
}: CreateInstallPluginsWindowProps) => {
	return createWindow({
		urlToLoad: PLUGIN_INSTALL_WINDOW_WEBPACK_ENTRY,
		preloadPath: PLUGIN_INSTALL_WINDOW_PRELOAD_WEBPACK_ENTRY,
		windowProps: {
			title: "Install Plugins",
			width: 800,
			height: 600,
			parent: windows.pluginsManage,
		},
	});
};
