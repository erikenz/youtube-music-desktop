import { WindowPos, WindowSize } from "#types/config";

// import type { Windows } from "#types/window";
import { createWindow } from "@utils/window";
import defaultConfig from "@config/defaults";
import is from "electron-is";
import { screen } from "electron";
import { store } from "@config/store";

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createMainWindow = () => {
	const urlToLoad = store.get("options.resumeOnStart")
		? store.get("url")
		: defaultConfig.url;
	let moveTimer: ReturnType<typeof setTimeout>;
	let resizeTimer: ReturnType<typeof setTimeout>;
	return createWindow({
		urlToLoad: urlToLoad,
		preloadPath: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		onReadyToShow: (win) => {
			//? Set window last config or default config
			const hasPos = store.has("windowPos");
			const hasSize = store.has("windowSize");
			if (hasPos && hasSize) {
				//? Check if window is offscreen
				const pos: WindowPos = store.get("windowPos");
				const size: WindowSize = store.get("windowSize");
				const displaySize = screen.getDisplayNearestPoint({
					x: pos.x,
					y: pos.y,
				}).bounds;
				if (
					pos.x + size.width < displaySize.x - 8 ||
					pos.x - size.width > displaySize.x + displaySize.width ||
					pos.y < displaySize.y - 8 ||
					pos.y > displaySize.y + displaySize.height
				) {
					//Window is offscreen
					if (is.dev()) {
						console.error(
							`Window tried to render offscreen, windowSize=${size}, displaySize=${displaySize}, position=${pos}`
						);
					}
				} else {
					win.setPosition(pos.x - 4, pos.y - 2);
					win.setSize(size.width, size.height);
					console.log(
						`main.ts => line:86 => window spawned at position: [${pos.x} | ${pos.y}] and size: [${size.width} | ${size.height}]`
					);
				}
			} else {
				const [xPos, yPos] = win.getPosition();
				store.set({ windowPos: { x: xPos, y: yPos } });
				const [width, height] = win.getSize();
				store.set({
					windowSize: {
						width: width,
						height: height,
					},
				});
			}
			if (store.get("windowMaximized")) {
				win.maximize();
			}
			if (store.get("windowAlwaysOnTop")) {
				win.setAlwaysOnTop(true);
			}
		},
		onMove: (win) => {
			clearTimeout(moveTimer);
			moveTimer = setTimeout(() => {
				const [xPos, yPos] = win.getPosition();
				if (xPos && yPos) {
					try {
						store.set({ windowPos: { x: xPos, y: yPos } });
						console.log(`saved window coords [${xPos} | ${yPos}]`);
					} catch (error) {
						console.error(error);
					}
				}
			}, 5000);
		},
		onResize: (win) => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const [width, height] = win.getSize();
				if (width && height) {
					try {
						store.set({
							windowSize: { width: width, height: height },
						});
						console.log(`saved window size [${width} | ${height}]`);
					} catch (error) {
						console.error(error);
					}
				}
			}, 5000);
		},
	});
};
