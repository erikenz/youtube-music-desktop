import "./global.css";

import { ReactNode, StrictMode } from "react";

import { ThemeProvider } from "@material-tailwind/react";
import { createRoot } from "react-dom/client";

const customTheme = window.electronAPI.getCurrentTheme();
const root = createRoot(document.getElementById("root"));

// export const RenderApp = (Child: ReactNode) => root.render(Child);
export const RenderApp = (Child: ReactNode) =>
	root.render(
		<StrictMode>
			<ThemeProvider value={customTheme}>{Child}</ThemeProvider>
		</StrictMode>
	);

// root.render(
// 	<StrictMode>
// 		<ThemeProvider>
// 			<App />
// 		</ThemeProvider>
// 	</StrictMode>
// );
