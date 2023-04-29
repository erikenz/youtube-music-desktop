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
		// { loader: "style-loader" },
		// { loader: "css-loader" },
	],
});

// {
//     test: /\.css$/,
//     use: [
//         "style-loader",
//         "css-loader",

//         {
//             loader: "postcss-loader",
//             options: {
//                 postcssOptions: {
//                     plugins: [
//                         require("tailwindcss"),
//                         require("autoprefixer"),
//                     ],
//                 },
//             },
//         },
//         // { loader: "style-loader" },
//         // { loader: "css-loader" },
//     ],
// },

export const rendererConfig: Configuration = {
	module: {
		rules,
	},
	plugins,
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
		alias: {
			"@config": path.resolve(__dirname, "./src/config"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@plugins": path.resolve(__dirname, "./src/plugins"),
			"@themes": path.resolve(__dirname, "./src/themes"),
		},
		// alias: Object.keys(tsconfig.compilerOptions.paths).reduce(
		// 	(aliases, aliasName) => {
		// 		aliases[aliasName] = path.resolve(
		// 			__dirname,
		// 			`src/${tsconfig.compilerOptions.paths[aliasName][0]}`
		// 		);
		// 		console.log(aliases);
		// 		return aliases;
		// 	},
		// 	{}
		// ),
	},
	// entry: {
	// 	window1: path.resolve(
	// 		__dirname,
	// 		"./src/components/plugins/install/index.html"
	// 	),
	// 	window2: path.resolve(
	// 		__dirname,
	// 		"./src/components/plugins/manage/index.html"
	// 	),
	// },
	// entry: {
	// 	window1: [
	// 		require.resolve("./src/components/plugins/install/index.html"),
	// 	],
	// 	window2: [
	// 		require.resolve("./src/components/plugins/manage/index.html"),
	// 	],
	// },
};
