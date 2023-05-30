import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	Button,
	Card,
	IconButton,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Spinner,
	Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import type {
	FetchPlugin,
	InstalledPlugins,
	PluginData,
	PluginGitHub,
} from "#types/plugin";
import { useEffect, useState } from "react";

import InstallButton from "./InstallButton";
import classnames from "classnames";

const Browse = () => {
	const [open, setOpen] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState<FetchPlugin[]>([]);
	const [installedPlugins, setInstalledPlugins] = useState<InstalledPlugins>(
		[]
	);
	useEffect(() => {
		document.title = "Install Plugins";
		async function fetchPlugins() {
			setLoading(true);
			const remotePlugins = await window.pluginAPI.getRemotePlugins();
			console.log(
				`TCL -> file: InstallPlugins.tsx:50 -> fetchPlugins -> remotePlugins:`,
				remotePlugins
			);
			const installed = await window.pluginAPI.getInstalledPlugins();
			setInstalledPlugins(installed);
			if (remotePlugins.length > 0) {
				setPlugins(remotePlugins);
			} else {
				const res = await window.pluginAPI.fetchPlugins();

				console.log(
					`TCL -> file: InstallPlugins.tsx:13 -> useEffect -> res:`,
					res
				);
				window.pluginAPI.storeRemotePlugins(res);
				setPlugins(res);
			}
			setLoading(false);
		}
		fetchPlugins();
	}, []);
	const handleOpen = (value: number) => {
		setOpen(open === value ? null : value);
	};
	// const handleInstall = (plugin: PluginGitHub) => {
	// 	console.log(
	// 		`TCL -> file: InstallPlugins.tsx:36 -> handleInstall -> plugin`,
	// 		plugin
	// 	);
	// 	window.pluginAPI.installPlugin(plugin);
	// };
	return (
		<List className="p-0 m-0 gap-0">
			{loading ? (
				<div className="flex justify-center items-center w-full h-full p-4">
					<Spinner className="w-8 h-8 z-10" />
				</div>
			) : !plugins.length ? (
				<Typography className="text-white p-4">
					Couldn't fetch plugins
				</Typography>
			) : (
				plugins.map((plugin, index) => (
					<ListItem
						key={`plugin-${index}-${plugin.name}`}
						onClick={() => handleOpen(index)}
						className={classnames(
							"rounded-none hover:bg-gray-700 hover:text-white focus:bg-gray-600 focus:text-white active:text-white grid grid-cols-[2fr,_1fr)] gap-0 text-white transition-[grid-template-rows] duration-300 ease-in-out max-w-[30rem] items-start",
							{
								["rounded-t-md"]: index === 0,
								["rounded-b-md"]: index === plugins.length - 1,
								["border-b border-b-blue-gray-100"]:
									index < plugins.length - 1,
								["grid-rows-[1.5em,_1.5em,_2.5em,_1fr,_auto]"]:
									open === index,
								["grid-rows-[1.5em,_1.5em,_2.5em,_0fr,_0fr]"]:
									open !== index,
							}
						)}>
						<div className="row-start-1 col-start-1 row-end-2 col-end-2 flex items-center h-full">
							<Typography variant="h3" className="text-lg">
								{plugin.displayName}
							</Typography>
						</div>
						<div className="row-start-2 col-start-1 row-end-3 col-end-2 flex items-center h-full">
							<Typography variant="small" className="">
								{plugin.author}
							</Typography>
						</div>
						<div className="row-start-3 col-start-1 row-end-5 col-end-2">
							<Typography
								variant="paragraph"
								className={classnames(
									"text-sm read-more-text",
									{
										["read-more-text-open"]: open === index,
									}
								)}>
								{plugin.description}
							</Typography>
						</div>
						<ListItemSuffix className="row-start-1 col-start-2 row-end-4 col-end-3 flex items-center h-full">
							<InstallButton
								plugin={plugin}
								installed={installedPlugins}
								onInstalled={(pluginId) =>
									setInstalledPlugins((prev) => [
										...prev,
										pluginId,
									])
								}
							/>
							<div className="ml-2">
								{open === index ? (
									<ChevronDownIcon className="w-4 h-4 text-white" />
								) : (
									<ChevronRightIcon className="w-4 h-4 text-white" />
								)}
							</div>
						</ListItemSuffix>
						<div
							className={classnames(
								"row-start-5 col-start-1 row-end-6 col-end-3 overflow-hidden max-h-0 transition-[max-height] duration-300 flex justify-between",
								{ ["max-h-10"]: open === index }
							)}>
							<Button
								variant="outlined"
								onClick={() => {
									window.pluginAPI.openPluginLink(
										plugin.html_url
									);
								}}>
								GitHub
							</Button>
							<Button>More</Button>
							{installedPlugins.includes(plugin.id) && (
								<Button color="red">Delete</Button>
							)}
						</div>
					</ListItem>
				))
			)}
		</List>
	);
};
export default Browse;
