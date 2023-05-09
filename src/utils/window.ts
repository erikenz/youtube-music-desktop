import type { CreateWindowProps, WindowProps } from "#types/window";

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

		window.on("page-title-updated", function (event, title, explicitSet) {
			if (onPageTitleUpdated) {
				const win = this;
				onPageTitleUpdated(event, title, explicitSet, win);
			}
		});
		window.on("close", function (event) {
			if (onClose) {
				const win = this;
				onClose(event, win);
			}
		});
		window.on("closed", function () {
			if (onClosed) {
				const win = this;
				onClosed(win);
			}
		});
		window.on("session-end", function () {
			if (onSessionEnd) {
				const win = this;
				onSessionEnd(win);
			}
		});
		window.on("unresponsive", function () {
			if (onUnresponsive) {
				const win = this;
				onUnresponsive(win);
			}
		});
		window.on("responsive", function () {
			if (onResponsive) {
				const win = this;
				onResponsive(win);
			}
		});
		window.on("blur", function () {
			if (onBlur) {
				const win = this;
				onBlur(win);
			}
		});
		window.on("focus", function () {
			if (onFocus) {
				const win = this;
				onFocus(win);
			}
		});
		window.on("show", function () {
			if (onShow) {
				const win = this;
				onShow(win);
			}
		});
		window.on("hide", function () {
			if (onHide) {
				const win = this;
				onHide(win);
			}
		});
		window.on("ready-to-show", function () {
			window.show();
			//! Disabled in testing because of hot reload
			// win.focus();
			const win = this;
			// Spawn child window near parent window
			if (windowProps?.parent) {
				const parentCoords = windowProps.parent.getPosition();
				const parentSize = windowProps.parent.getSize();
				const parentCenter = {
					x:
						parentCoords[0] +
						parentSize[0] / 2 -
						win.getSize()[0] / 2 -
						4,
					y: parentCoords[1],
				};
				win.setPosition(parentCenter.x, parentCenter.y);
			}
			if (onReadyToShow) {
				onReadyToShow(win);
			}
		});
		window.on("maximize", function () {
			if (onMaximize) {
				const win = this;
				onMaximize(win);
			}
		});
		window.on("unmaximize", function () {
			if (onUnmaximize) {
				const win = this;
				onUnmaximize(win);
			}
		});
		window.on("minimize", function () {
			if (onMinimize) {
				const win = this;
				onMinimize(win);
			}
		});
		window.on("restore", function () {
			if (onRestore) {
				const win = this;
				onRestore(win);
			}
		});
		window.on("will-resize", function (event, newBounds, details) {
			if (onWillResize) {
				const win = this;
				onWillResize(event, newBounds, details, win);
			}
		});
		window.on("resize", function () {
			if (onResize) {
				const win = this;
				onResize(win);
			}
		});
		window.on("resized", function () {
			if (onResized) {
				const win = this;
				onResized(win);
			}
		});
		window.on("will-move", function (event, newBounds) {
			if (onWillMove) {
				const win = this;
				onWillMove(event, newBounds, win);
			}
		});
		window.on("move", function () {
			if (onMove) {
				const win = this;
				onMove(win);
			}
		});
		window.on("moved", function () {
			if (onMoved) {
				const win = this;
				onMoved(win);
			}
		});
		window.on("enter-full-screen", function () {
			if (onEnterFullScreen) {
				const win = this;
				onEnterFullScreen(win);
			}
		});
		window.on("leave-full-screen", function () {
			if (onLeaveFullScreen) {
				const win = this;
				onLeaveFullScreen(win);
			}
		});
		window.on("enter-html-full-screen", function () {
			if (onEnterHtmlFullScreen) {
				const win = this;
				onEnterHtmlFullScreen(win);
			}
		});
		window.on("leave-html-full-screen", function () {
			if (onLeaveHtmlFullScreen) {
				const win = this;
				onLeaveHtmlFullScreen(win);
			}
		});
		window.on("always-on-top-changed", function (event, isAlwaysOnTop) {
			if (onAlwaysOnTopChanged) {
				const win = this;
				onAlwaysOnTopChanged(event, isAlwaysOnTop, win);
			}
		});
		window.on("app-command", function (event, command) {
			if (onAppCommand) {
				const win = this;
				onAppCommand(event, command, win);
			}
		});
		window.on("swipe", function (event, direction) {
			if (onSwipe) {
				const win = this;
				onSwipe(event, direction, win);
			}
		});
		window.on("rotate-gesture", function (event, rotation) {
			if (onRotateGesture) {
				const win = this;
				onRotateGesture(event, rotation, win);
			}
		});
		window.on("sheet-begin", function () {
			if (onSheetBegin) {
				const win = this;
				onSheetBegin(win);
			}
		});
		window.on("sheet-end", function () {
			if (onSheetEnd) {
				const win = this;
				onSheetEnd(win);
			}
		});
		window.on("new-window-for-tab", function () {
			if (onNewWindowForTab) {
				const win = this;
				onNewWindowForTab(win);
			}
		});
		window.on("system-context-menu", function (event, point) {
			if (onSystemContextMenu) {
				const win = this;
				onSystemContextMenu(event, point, win);
			}
		});

		return window;
	} catch (error) {
		console.error(error);
	}
}

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
