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
	[window: string]: BrowserWindow | null;
	main: BrowserWindow | null;
	pluginsInstall: BrowserWindow | null;
}
export interface WindowProps extends BrowserWindowConstructorOptions {
	PRELOAD?: WebPreferences["preload"];
	URL: string;
}

export interface CustomWindowConstructorProps {
	urlToLoad: string;
	windowProps?: BrowserWindowConstructorOptions;
	position?: { x: number; y: number };
	size?: { width: number; height: number };
	preloadPath?: string;
}
export interface CustomWindowProps {
	window: BrowserWindow;
}

export interface CreateWindowProps {
	urlToLoad: string;
	preloadPath?: string;
	windowProps?: BrowserWindowConstructorOptions;
	position?: { x: number; y: number };
	size?: { width: number; height: number };
	// getWindow?(this: CreateWindowProps): BrowserWindow;
	onPageTitleUpdated?: (
		event: Event,
		title: string,
		explicitSet: boolean
	) => void;
	onClose?: (event: Event) => void;
	onClosed?: () => void;
	onSessionEnd?: () => void;
	onUnresponsive?: () => void;
	onResponsive?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onShow?: () => void;
	onHide?: () => void;
	onReadyToShow?: () => void;
	onMaximize?: () => void;
	onUnmaximize?: () => void;
	onMinimize?: () => void;
	onRestore?: () => void;
	onWillResize?: (
		event: Event,
		newBounds: Rectangle,
		details: WillResizeDetails
	) => void;
	onResize?: () => void;
	onResized?: () => void;
	onWillMove?: (event: Event, newBounds: Rectangle) => void;
	onMove?: () => void;
	onMoved?: () => void;
	onEnterFullScreen?: () => void;
	onLeaveFullScreen?: () => void;
	onEnterHtmlFullScreen?: () => void;
	onLeaveHtmlFullScreen?: () => void;
	onAlwaysOnTopChanged?: (event: Event, isAlwaysOnTop: boolean) => void;
	onAppCommand?: (event: Event, command: string) => void;
	onSwipe?: (event: Event, direction: string) => void;
	onRotateGesture?: (event: Event, rotation: number) => void;
	onSheetBegin?: () => void;
	onSheetEnd?: () => void;
	onNewWindowForTab?: () => void;
	onSystemContextMenu?: (event: Event, point: Point) => void;
	onIsAlwaysOnTop?: (event: Event, isAlwaysOnTop: boolean) => void;
}
