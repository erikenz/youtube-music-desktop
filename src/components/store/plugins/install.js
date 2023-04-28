const spinner = document.getElementById("spinner");
const pluginsContainer = document.getElementById("plugins-container");

const plugins = fetch(
	"https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins"
)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);

		spinner.style.display = "none";
		pluginsContainer.append(
			...data.map((plugin) => {
				const elem = document.createElement("div");
				elem.className = "my-2 p-2 bg-gray-100 rounded-md";
				elem.innerText = plugin.name;
				return elem;
			})
		);

		// data.forEach((plugin) => {
		// 	const elem = (document.createElement("div").innerText =
		// 		plugin.name);
		// 	pluginsContainer.appendChild(elem);
		// });
	});

// const plugins = setTimeout(() => {
// 	spinner.style.display = "none";
// }, 5000);
