import type { Configuration } from "webpack";
import path from "path";
import { plugins } from "./webpack.plugins";
import { rules } from "./webpack.rules";

rules.push({
	test: /\.css$/,
	use: [
		{ loader: "style-loader" },
		{ loader: "css-loader" },
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: [require("tailwindcss"), require("autoprefixer")],
				},
			},
		},
	],
});

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
		alias: {
			"@src": path.resolve(__dirname, "./src/"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@plugins": path.resolve(__dirname, "./src/plugins"),
			"@themes": path.resolve(__dirname, "./src/themes"),
			"@windows": path.resolve(__dirname, "./src/windows"),
			"#types": path.resolve(__dirname, "./src/types"),
		},
		fallback: {
			path: false,
			buffer: false,
			crypto: false,
		},
		// preferRelative: true,
		// fallback: {
		// 	path: require.resolve("path-browserify"),
		// 	// "path": false,
		// 	fs: require.resolve("fs"),
		// 	crypto: false,
		// 	stream: false,
		// 	buffer: false,
		// 	util: false,
		// 	assert: false,
		// 	os: false,
		// 	zlib: false,
		// 	http: false,
		// 	https: false,
		// 	tty: false,
		// 	child_process: false,
		// },
	},
};
