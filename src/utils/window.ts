import type {
	CreateWindowProps,
	CustomWindowConstructorProps,
} from "#types/window";
import type { CustomWindowProps, WindowProps } from "#types/window";

import { BrowserWindow } from "electron";

export const makeWindow = ({ PRELOAD, URL, ...props }: WindowProps) => {
	// Create the browser window.
	const win = new BrowserWindow({
		show: false,
		resizable: true,
		maximizable: true,
		transparent: false,
		autoHideMenuBar: true,
		backgroundColor: "#23272E",
		webPreferences: {
			preload: PRELOAD,
			nodeIntegration: false,
			contextIsolation: true,
			webSecurity: true,
			// enableRemoteModule: true,
			// devTools: !app.isPackaged,
			devTools: true,
		},
		...props,
	});

	win.loadURL(URL);
	win.on("ready-to-show", function () {
		win.show();
		//! Disabled in testing because of hot reload
		// win.focus();
	});

	return win;
};

export function createWindow({
	urlToLoad,
	preloadPath,
	windowProps,
	onPageTitleUpdated,
	onClose,
	onClosed,
	onSessionEnd,
	onUnresponsive,
	onResponsive,
	onBlur,
	onFocus,
	onShow,
	onHide,
	onReadyToShow,
	onMaximize,
	onUnmaximize,
	onMinimize,
	onRestore,
	onWillResize,
	onResize,
	onResized,
	onWillMove,
	onMove,
	onMoved,
	onEnterFullScreen,
	onLeaveFullScreen,
	onEnterHtmlFullScreen,
	onLeaveHtmlFullScreen,
	onAlwaysOnTopChanged,
	onAppCommand,
	onSwipe,
	onRotateGesture,
	onSheetBegin,
	onSheetEnd,
	onNewWindowForTab,
	onSystemContextMenu,
}: CreateWindowProps): BrowserWindow {
	try {
		const window = new BrowserWindow({
			show: false,
			resizable: true,
			maximizable: true,
			transparent: false,
			autoHideMenuBar: true,
			backgroundColor: "#23272E",
			webPreferences: {
				preload: preloadPath,
				nodeIntegration: false,
				contextIsolation: true,
				webSecurity: true,
				// enableRemoteModule: true,
				// devTools: !app.isPackaged,
				devTools: true,
			},
			...windowProps,
		});
		// this.window = window;
		window.loadURL(urlToLoad);

		window.on("page-title-updated", (event, title, explicitSet) => {
			if (onPageTitleUpdated) {
				onPageTitleUpdated(event, title, explicitSet);
			}
		});
		window.on("close", (event) => {
			if (onClose) {
				onClose(event);
			}
		});
		window.on("closed", () => {
			if (onClosed) {
				onClosed();
			}
		});
		window.on("session-end", () => {
			if (onSessionEnd) {
				onSessionEnd();
			}
		});
		window.on("unresponsive", () => {
			if (onUnresponsive) {
				onUnresponsive();
			}
		});
		window.on("responsive", () => {
			if (onResponsive) {
				onResponsive();
			}
		});
		window.on("blur", () => {
			if (onBlur) {
				onBlur();
			}
		});
		window.on("focus", () => {
			if (onFocus) {
				onFocus();
			}
		});
		window.on("show", () => {
			if (onShow) {
				onShow();
			}
		});
		window.on("hide", () => {
			if (onHide) {
				onHide();
			}
		});
		window.on("ready-to-show", () => {
			window.show();
			//! Disabled in testing because of hot reload
			// win.focus();
			if (onReadyToShow) {
				onReadyToShow();
			}
		});
		window.on("maximize", () => {
			if (onMaximize) {
				onMaximize();
			}
		});
		window.on("unmaximize", () => {
			if (onUnmaximize) {
				onUnmaximize();
			}
		});
		window.on("minimize", () => {
			if (onMinimize) {
				onMinimize();
			}
		});
		window.on("restore", () => {
			if (onRestore) {
				onRestore();
			}
		});
		window.on("will-resize", (event, newBounds, details) => {
			if (onWillResize) {
				onWillResize(event, newBounds, details);
			}
		});
		window.on("resize", () => {
			if (onResize) {
				onResize();
			}
		});
		window.on("resized", () => {
			if (onResized) {
				onResized();
			}
		});
		window.on("will-move", (event, newBounds) => {
			if (onWillMove) {
				onWillMove(event, newBounds);
			}
		});
		window.on("move", () => {
			if (onMove) {
				onMove();
			}
		});
		window.on("moved", () => {
			if (onMoved) {
				onMoved();
			}
		});
		window.on("enter-full-screen", () => {
			if (onEnterFullScreen) {
				onEnterFullScreen();
			}
		});
		window.on("leave-full-screen", () => {
			if (onLeaveFullScreen) {
				onLeaveFullScreen();
			}
		});
		window.on("enter-html-full-screen", () => {
			if (onEnterHtmlFullScreen) {
				onEnterHtmlFullScreen();
			}
		});
		window.on("leave-html-full-screen", () => {
			if (onLeaveHtmlFullScreen) {
				onLeaveHtmlFullScreen();
			}
		});
		window.on("always-on-top-changed", (event, isAlwaysOnTop) => {
			if (onAlwaysOnTopChanged) {
				onAlwaysOnTopChanged(event, isAlwaysOnTop);
			}
		});
		window.on("app-command", (event, command) => {
			if (onAppCommand) {
				onAppCommand(event, command);
			}
		});
		window.on("swipe", (event, direction) => {
			if (onSwipe) {
				onSwipe(event, direction);
			}
		});
		window.on("rotate-gesture", (event, rotation) => {
			if (onRotateGesture) {
				onRotateGesture(event, rotation);
			}
		});
		window.on("sheet-begin", () => {
			if (onSheetBegin) {
				onSheetBegin();
			}
		});
		window.on("sheet-end", () => {
			if (onSheetEnd) {
				onSheetEnd();
			}
		});
		window.on("new-window-for-tab", () => {
			if (onNewWindowForTab) {
				onNewWindowForTab();
			}
		});
		window.on("system-context-menu", (event, point) => {
			if (onSystemContextMenu) {
				onSystemContextMenu(event, point);
			}
		});

		return window;
	} catch (error) {
		console.error(error);
	}
}

// testing createWindow() as a class
export class CustomWindow implements CustomWindowProps {
	window: BrowserWindow;
	constructor({ windowProps }: CustomWindowConstructorProps) {
		this.window = new BrowserWindow(windowProps);
	}
	// this.window.on("")
}
new CustomWindow({ urlToLoad: "" });

// function showUnresponsiveDialog(win, details) {
// 	if (!!details) {
// 		console.log("Unresponsive Error!\n"+JSON.stringify(details, null, "\t"))
// 	}
// 	electron.dialog.showMessageBox(win, {
// 		type: "error",
// 		title: "Window Unresponsive",
// 		message: "The Application is Unresponsive",
// 		details: "We are sorry for the inconvenience! please choose what to do:",
// 		buttons: ["Wait", "Relaunch", "Quit"],
// 		cancelId: 0
// 	}).then( result => {
// 		switch (result.response) {
// 			case 1: restart(); break;
// 			case 2: app.quit(); break;
// 		}
// 	});
// }
