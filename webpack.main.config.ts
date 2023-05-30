import type { Configuration } from "webpack";
import path from "path";
import { rules } from "./webpack.rules";
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

export const mainConfig: Configuration = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	entry: ["./src/main.ts"],
	// Put your normal webpack config below here
	module: {
		rules,
	},
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", "..."],
		// Add support for TypeScripts fully qualified ESM imports.
		extensionAlias: {
			".js": [".js", ".ts"],
			".cjs": [".cjs", ".cts"],
			".mjs": [".mjs", ".mts"],
		},
		alias: {
			"@config": path.resolve(__dirname, "./src/config"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@plugins": path.resolve(__dirname, "./src/plugins"),
			"@themes": path.resolve(__dirname, "./src/themes"),
			"@windows": path.resolve(__dirname, "./src/windows"),
			"#types": path.resolve(__dirname, "./src/types"),
		},
	},
	// plugins: [new NodePolyfillPlugin()],
};
