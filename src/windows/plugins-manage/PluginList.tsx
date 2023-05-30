import { Switch, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import type { PluginData } from "#types/plugin";
import PluginMenu from "./PluginMenu";
import PluginOptionsDialog from "./PluginOptionsDialog";

interface PluginListProps {
	plugins: PluginData[];
	onTogglePlugin: (pluginName: string, enabled: boolean) => void;
}
export default function PluginList({
	plugins,
	onTogglePlugin,
}: PluginListProps) {
	if (plugins.length === 0) return null;
	const [isEnabled, setIsEnabled] = useState<{ [key: string]: boolean }>({});
	const [pluginLoading, setPluginLoading] = useState(false);
	useEffect(() => {
		plugins.forEach((plugin) =>
			setIsEnabled((prev) => ({
				...prev,
				[plugin.id]: plugin.config.enabled,
			}))
		);
	}, []);

	const handleTogglePlugin = (plugin: PluginData) => {
		setPluginLoading(true);
		const pluginName = plugin.id;
		const prevIsEnabled = isEnabled[pluginName];
		setIsEnabled((prev) => ({
			...prev,
			[pluginName]: !isEnabled[pluginName],
		}));
		onTogglePlugin(pluginName, !isEnabled[pluginName]);

		window.electronAPI.updatePluginConfig({
			property: `plugins.${pluginName}.enabled`,
			newConfig: !isEnabled[pluginName],
		});
		if (!prevIsEnabled) {
			console.log("run start function");
			// plugin.start();
		} else {
			console.log("run stop function");
			// plugin.stop();
		}
		setPluginLoading(false);
	};
	return (
		<div className="flex flex-col px-4 py-2">
			{plugins.map((plugin: PluginData, index) => (
				<div
					className="flex justify-between my-2 p-2 bg-[#33333B] rounded-md border-[1px] border-[#54545B]"
					key={index}>
					<div className="flex items-center  ml-2">
						<Switch
							id={`toggle-plugin-${plugin.id}`}
							label={
								<Typography
									variant="h2"
									className="text-xl text-[#E0E5E6]">
									{plugin.displayName}
								</Typography>
							}
							checked={
								isEnabled[plugin.id] || plugin.config.enabled
							}
							onChange={() => handleTogglePlugin(plugin)}
							disabled={pluginLoading}
						/>
					</div>
					<div className="flex items-center">
						<Typography
							variant="small"
							className="text-xs text-[#666] mr-1">
							{plugin.files.totalSize} B
						</Typography>
						<PluginMenu plugin={plugin} />
					</div>
				</div>
			))}
		</div>
	);
}

// const [pluginLoading, setPluginLoading] = useState(false);
// const handleTogglePlugin = (plugin: PluginData) => {
// 	setPluginLoading(true);
// 	const pluginName = plugin.id;
// 	const prevIsEnabled = isEnabled[pluginName];
// 	setIsEnabled((prev) => ({
// 		...prev,
// 		[pluginName]: !isEnabled[pluginName],
// 	}));
// 	setPlugins((prev) => {
// 		const newPlugins = [...prev];
// 		const pluginIndex = newPlugins.findIndex(
// 			(p) => p.id === pluginName
// 		);
// 		newPlugins[pluginIndex].config.enabled = !isEnabled[pluginName];
// 		return newPlugins;
// 	});
// 	window.electronAPI.updatePluginConfig({
// 		property: `plugins.${pluginName}.enabled`,
// 		newConfig: !isEnabled[pluginName],
// 	});
// 	if (!prevIsEnabled) {
// 		console.log("run start function");
// 		// plugin.start();
// 	} else {
// 		console.log("run stop function");
// 		// plugin.stop();
// 	}
// 	setPluginLoading(false);
// };
