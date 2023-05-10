import "./global.css";

import { ReactNode, StrictMode } from "react";

// import { ThemeProvider } from "@material-tailwind/react";
import { createRoot } from "react-dom/client";

// import { store } from "@config/store";

const container = document.getElementById("root");
const root = createRoot(container);
// const customTheme = store.get("themes.currentTheme");

export const RenderApp = (Child: ReactNode) => root.render(Child);
// export const RenderApp = (Child: ReactNode) =>
// 	root.render(
// 		<StrictMode>
// 			<ThemeProvider value={customTheme}>{Child}</ThemeProvider>
// 		</StrictMode>
// 	);
