import type { ModuleOptions } from "webpack";

export const rules: Required<ModuleOptions>["rules"] = [
	// Add support for native node modules
	{
		// We're specifying native_modules in the test because the asset relocator loader generates a
		// "fake" .node file which is really a cjs file.
		test: /native_modules[/\\].+\.node$/,
		use: "node-loader",
	},
	{
		test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: "@vercel/webpack-asset-relocator-loader",
			options: {
				outputAssetBase: "native_modules",
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|\.webpack)/,
		use: {
			loader: "ts-loader",
			options: {
				transpileOnly: true,
			},
		},
	},
	{
		test: /\.mts?$/,
		exclude: /(node_modules|\.webpack)/,
		use: {
			loader: "ts-loader",
		},
	},
	// {
	// 	test: /\.config\.ts$/,
	// 	exclude: /node_modules/,
	// 	loader: "file-loader",
	// 	options: { name: "./conf/[name]-[hash:base36:4].[ext]" },
	// },
];
