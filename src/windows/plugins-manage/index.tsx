import { useEffect, useState } from "react";

import Button from "@components/Button";
// import Input from "@components/Input";
import type { PluginFiles } from "#types/plugin";
import { RenderApp } from "..";
import Spinner from "@components/Spinner";
import { Switch } from "@material-tailwind/react";

// import ToggleSwitch from "@components/ToggleSwitch";
// import { store } from "@config/store";

function ManagePlugins() {
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState<PluginFiles[]>([]);
	useEffect(() => {
		document.title = "Manage Plugins";
		setLoading(true);
		setPlugins([]);
		// const pluginsRaw = window.electronAPI.fetchPlugins();
		const pluginsRaw = window.electronAPI.getInstalledPlugins();
		console.log(
			`TCL -> file: index.tsx:19 -> useEffect -> pluginsRaw:`,
			pluginsRaw
		);
		// const pluginConfig = store.get("plugins");
		// console.log(
		// 	`TCL -> file: index.tsx:24 -> useEffect -> pluginConfig:`,
		// 	pluginConfig
		// );
		const pluginArr = pluginsRaw.map((plugin) => {
			return {
				...plugin,
				// ...pluginConfig[plugin.name]
			};
		});
		setPlugins(pluginArr);
		setLoading(false);
	}, []);

	return (
		<div className="p-4">
			<header className="flex flex-row justify-between border-b-[1px] border-[#E0E5E6] mb-2">
				<div className="pb-2">
					<h1 className="text-[#E0E5E6]">
						Installed - {plugins.length} plugins
					</h1>
				</div>
			</header>
			<div>
				{loading ? (
					<Spinner color="red-500" size={8} />
				) : (
					<div id="plugins-container" className="flex flex-col">
						{plugins.map((plugin: PluginFiles, index) => (
							<div
								className="flex justify-between my-2 p-2 bg-[#33333B] rounded-md border-[1px] border-[#54545B]"
								key={index}>
								<div className="flex items-center">
									<Switch
										id={`toggle-plugin-${plugin.name}`}
										label={plugin.name}
									/>
								</div>
								<div className="flex">
									<div>size</div>
									<Button
										onClick={() => {
											console.log("remove plugin ");
										}}
										className="text-[#E0E5E6]">
										Remove
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

RenderApp(<ManagePlugins />);
