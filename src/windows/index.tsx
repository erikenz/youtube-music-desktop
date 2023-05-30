import "./global.css";

import { ReactNode, StrictMode } from "react";

import { ThemeProvider } from "@material-tailwind/react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

const Render = ({ children }: { children: ReactNode }) => {
	const customTheme = window.pluginAPI.getCurrentTheme();

	return (
		<StrictMode>
			<ThemeProvider value={customTheme}>{children}</ThemeProvider>
		</StrictMode>
	);
};

export const RenderApp = (Child: ReactNode) => {
	root.render(<Render>{Child}</Render>);
};
