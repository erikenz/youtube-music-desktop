import { useEffect, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import type { PluginGitHub } from "#types/plugin";
import { RenderApp } from "..";
import Spinner from "@components/Spinner";

const ipcRenderer = window.require("electron").ipcRenderer;

function InstallPlugins() {
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState([]);
	useEffect(() => {
		setLoading(true);
		setPlugins([]);
		const rawPlugins = ipcRenderer.sendSync("fetch-plugins");
		console.log(
			`🚀 => file: index.tsx:17 => useEffect => rawPlugins:`,
			rawPlugins
		);
		setPlugins(rawPlugins);
		setLoading(false);
		// window?.electronAPI?.greet("Erik");
		// fetch(
		// 	"https://api.github.com/repos/erikenz/youtube-music-desktop-add-ons/contents/plugins"
		// )
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 		setLoading(false);
		// 		setPlugins(
		// 			data.map((plugin: Plugin) => {
		// 				return `<div class="my-2 p-2 bg-gray-100 rounded-md">${plugin.label}</div>`;
		// 			})
		// 		);
		// 		// spinner.style.display = "none";
		// 		// pluginsContainer.append(
		// 		//     ...data.map((plugin) => {
		// 		//         const elem = document.createElement("div");
		// 		//         elem.className = "my-2 p-2 bg-gray-100 rounded-md";
		// 		//         elem.innerText = plugin.name;
		// 		//         return elem;
		// 		//     })
		// 		// );
		// 	});
		// session.defaultSession;
	}, []);

	return (
		<div className="p-4">
			<header className="flex flex-row justify-between">
				<div>
					<h1>Plugins Store</h1>
				</div>
				{/* TODO: leave for later, would need to set up some kind of database */}
				{/* <select>
                <option value="a-z">Sort Alphabetically A-Z</option>
                <option value="z-a">Sort Alphabetically Z-A</option>
                <option value="most-recent">Most Recent</option>
                <option value="most-downloads">Most Downloads</option>
                <option value="highest-rated">Highest Rated</option>
            </select> */}
				<div className="flex">
					<select>
						<option value="list">List</option>
						<option value="grid">Grid</option>
					</select>
					<Input name="search" placeholder="Search..." />
				</div>
			</header>
			<div>
				{loading ? (
					<Spinner color="red-500" size={8} />
				) : (
					<div>
						<div>
							{/* TODO: Explain this better (that I could have missed something while reviewing the code or something else) */}
							<button></button>
							<div className="rounded-md border-orange-500 border-2">
								Warning: These plugins have been made by the
								community and could contain bugs or
								vulnerabilities. You can check the code of each
								plugin before installing.
							</div>
						</div>
						<div id="plugins-container" className="flex flex-col">
							{...plugins.map((plugin: PluginGitHub) => (
								<div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
									<div className="">{plugin.name}</div>
									<Button
										onClick={() => {
											console.log(
												`download file ${plugin.html_url}`
											);
											ipcRenderer.send(
												"download-plugin",
												plugin
												// {
												// 	// payload: {
												// 	// 	fileName: plugin.name,
												// 	// 	fileURL:
												// 	// 		plugin.html_url,
												// 	// },
												// }
											);
										}}>
										Install
									</Button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

RenderApp(<InstallPlugins />);
