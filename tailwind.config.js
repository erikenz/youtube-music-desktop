/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,js,ts,tsx}",
		"./src/components/plugins/install/*.{html,js,ts,tsx}",
		"./src/components/plugins/manage/*.{html,js,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
