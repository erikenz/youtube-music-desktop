const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			transitionProperty: {
				height: "height",
			},
			// keyframes: {
			// 	"text-open": {
			// 		"0%": {
			// 			"line-clamp": 2,
			// 			"-webkit-line-clamp": 2,
			// 		},
			// 		"100%": {
			// 			"line-clamp": "initial",
			// 			"-webkit-line-clamp": "initial",
			// 		},
			// 	},
			// 	"text-close": {
			// 		"0%": {
			// 			"line-clamp": "initial",
			// 			"-webkit-line-clamp": "initial",
			// 		},
			// 		"100%": {
			// 			"line-clamp": 2,
			// 			"-webkit-line-clamp": 2,
			// 		},
			// 	},
			// },
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("child-hover", "& > *:hover");
			addVariant("second", "& > *:nth-child(2)");
		},
	],
});

// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: [
// 		"./src/**/*.{html,js,ts,tsx}",
// 		"./src/components/plugins/install/*.{html,js,ts,tsx}",
// 		"./src/components/plugins/manage/*.{html,js,ts,tsx}",
// 	],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [],
// };
