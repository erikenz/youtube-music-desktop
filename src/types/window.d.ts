import type {
	BrowserWindowConstructorOptions,
	Event,
	Point,
	Rectangle,
	WillResizeDetails,
	BrowserWindow,
	WebPreferences,
} from "electron";

export interface Windows {
	// [window: string]: BrowserWindow | null;
	main: BrowserWindow | null;
	pluginsInstall: BrowserWindow | null;
	pluginsManage: BrowserWindow | null;
	themesManage: BrowserWindow | null;
	themesInstall: BrowserWindow | null;
	extensions: BrowserWindow | null;
	plugins: BrowserWindow | null;
	themes: BrowserWindow | null;
}
export interface WindowProps extends BrowserWindowConstructorOptions {
	PRELOAD?: WebPreferences["preload"];
	URL: string;
}

export interface CreateWindowProps {
	beforeCreate?: () => void;
	urlToLoad: string;
	preloadPath?: string;
	windowProps?: BrowserWindowConstructorOptions;
	position?: { x: number; y: number };
	size?: { width: number; height: number };
	// getWindow?(this: CreateWindowProps): BrowserWindow;
	onPageTitleUpdated?: (
		event: Event,
		title: string,
		explicitSet: boolean,
		win?: BrowserWindow
	) => void;
	onClose?: (event: Event, win?: BrowserWindow) => void;
	onClosed?: (win?: BrowserWindow) => void;
	onSessionEnd?: (win?: BrowserWindow) => void;
	onUnresponsive?: (win?: BrowserWindow) => void;
	onResponsive?: (win?: BrowserWindow) => void;
	onBlur?: (win?: BrowserWindow) => void;
	onFocus?: (win?: BrowserWindow) => void;
	onShow?: (win?: BrowserWindow) => void;
	onHide?: (win?: BrowserWindow) => void;
	onReadyToShow?: (win?: BrowserWindow) => void;
	onMaximize?: (win?: BrowserWindow) => void;
	onUnmaximize?: (win?: BrowserWindow) => void;
	onMinimize?: (win?: BrowserWindow) => void;
	onRestore?: (win?: BrowserWindow) => void;
	onWillResize?: (
		event: Event,
		newBounds: Rectangle,
		details: WillResizeDetails,
		win?: BrowserWindow
	) => void;
	onResize?: (win?: BrowserWindow) => void;
	onResized?: (win?: BrowserWindow) => void;
	onWillMove?: (
		event: Event,
		newBounds: Rectangle,
		win?: BrowserWindow
	) => void;
	onMove?: (win?: BrowserWindow) => void;
	onMoved?: (win?: BrowserWindow) => void;
	onEnterFullScreen?: (win?: BrowserWindow) => void;
	onLeaveFullScreen?: (win?: BrowserWindow) => void;
	onEnterHtmlFullScreen?: (win?: BrowserWindow) => void;
	onLeaveHtmlFullScreen?: (win?: BrowserWindow) => void;
	onAlwaysOnTopChanged?: (
		event: Event,
		isAlwaysOnTop: boolean,
		win?: BrowserWindow
	) => void;
	onAppCommand?: (event: Event, command: string, win?: BrowserWindow) => void;
	onSwipe?: (event: Event, direction: string, win?: BrowserWindow) => void;
	onRotateGesture?: (
		event: Event,
		rotation: number,
		win?: BrowserWindow
	) => void;
	onSheetBegin?: (win?: BrowserWindow) => void;
	onSheetEnd?: (win?: BrowserWindow) => void;
	onNewWindowForTab?: (win?: BrowserWindow) => void;
	onSystemContextMenu?: (
		event: Event,
		point: Point,
		win?: BrowserWindow
	) => void;
	onIsAlwaysOnTop?: (
		event: Event,
		isAlwaysOnTop: boolean,
		win?: BrowserWindow
	) => void;
}
export interface CreateInstallPluginsWindowProps {
	windows: Windows;
}
