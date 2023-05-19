import {
	Button,
	IconButton,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Spinner,
	Switch,
	Typography,
} from "@material-tailwind/react";
import {
	Cog6ToothIcon,
	EllipsisHorizontalIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import DeletePluginDialog from "./DeletePluginDialog";
import type { PluginData } from "#types/plugin";
import PluginOptionsDialog from "./PluginOptionsDialog";
import { RenderApp } from "..";

function ManagePlugins() {
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState<PluginData[]>([]);
	const [isEnabled, setIsEnabled] = useState<{ [key: string]: boolean }>({});

	useEffect(() => {
		document.title = "Manage Plugins";
		async function getPluginsData() {
			setLoading(true);
			setPlugins([]);
			const pluginDataRaw = await window.electronAPI.getPluginsData();

			const parsed: PluginData[] = JSON.parse(pluginDataRaw);
			console.log(
				`TCL -> file: index.tsx:54 -> getPluginsData -> parsed:`,
				parsed
			);
			setPlugins(parsed);
			parsed.forEach((plugin) =>
				setIsEnabled((prev) => ({
					...prev,
					[plugin.id]: plugin.config.enabled,
				}))
			);
			setLoading(false);
		}
		getPluginsData();
	}, []);

	const [pluginLoading, setPluginLoading] = useState(false);
	const handleTogglePlugin = (plugin: PluginData) => {
		setPluginLoading(true);
		const pluginName = plugin.id;
		const prevIsEnabled = isEnabled[pluginName];
		setIsEnabled((prev) => ({
			...prev,
			[pluginName]: !isEnabled[pluginName],
		}));
		setPlugins((prev) => {
			const newPlugins = [...prev];
			const pluginIndex = newPlugins.findIndex(
				(p) => p.id === pluginName
			);
			newPlugins[pluginIndex].config.enabled = !isEnabled[pluginName];
			return newPlugins;
		});
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
	const deletePlugin = (plugin: string) => {
		window.electronAPI.deletePlugin({
			name: plugin,
		});
		setPlugins((prev) => prev.filter((p) => p.id !== plugin));
		setIsEnabled((prev) => {
			const newIsEnabled = { ...prev };
			delete newIsEnabled[plugin];
			return newIsEnabled;
		});
	};
	const [windowExists, setWindowExists] = useState(false);
	const createPluginStoreWindow = () => {
		if (!windowExists) {
			setWindowExists(true);
			window.electronAPI.openInstallPluginWindow();
		}
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const [currentPlugin, setCurrentPlugin] = useState<PluginData | null>(null);
	const handleSave = () => {
		handleOpen();
		// window.electronAPI.updatePluginConfig({})
	};
	const handleCancel = () => {
		handleOpen();
	};
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const handleOpenDelete = () => {
		setOpenDeleteDialog((cur) => !cur);
	};

	const PluginMenu = ({ plugin }: { plugin: PluginData }) => {
		return (
			<Menu placement="bottom-start">
				<MenuHandler>
					<IconButton variant="text" size="sm" color="gray">
						<EllipsisHorizontalIcon className="h-6 w-6 text-[#E0E5E6]" />
					</IconButton>
				</MenuHandler>
				<MenuList className="bg-[#33333B] text-[#E0E5E6]">
					{plugin.menu && (
						<MenuItem
							className="flex"
							onClick={() => {
								setCurrentPlugin(plugin);
								handleOpen();
							}}>
							<Cog6ToothIcon className="w-4 h-4 mr-2" /> Options
						</MenuItem>
					)}
					<MenuItem
						className="flex"
						onClick={() => {
							setCurrentPlugin(plugin);
							handleOpenDelete();
						}}>
						<TrashIcon className="w-4 h-4 mr-2" /> Delete
					</MenuItem>
				</MenuList>
			</Menu>
		);
	};

	return (
		<div className="w-full h-full relative">
			{loading ? (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Spinner className="w-8 h-8" />
				</div>
			) : (
				<>
					<header className="flex flex-row justify-between px-4 pt-2">
						<div className="pb-2">
							<Typography
								variant="h1"
								className="text-2xl text-[#E0E5E6]">
								{`Installed - ${
									Object.values(plugins).length
								} plugins`}
							</Typography>
						</div>
					</header>
					<div className="w-full h-px bg-[#E0E5E6]" />
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
										checked={isEnabled[plugin.id]}
										onChange={() =>
											handleTogglePlugin(plugin)
										}
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
						<PluginOptionsDialog
							currentPlugin={currentPlugin}
							open={open}
							handler={handleOpen}
							onSave={handleSave}
							onCancel={handleCancel}
						/>
						<DeletePluginDialog
							open={openDeleteDialog}
							handler={handleOpenDelete}
							onDelete={() => {
								deletePlugin(currentPlugin.id);
								setOpenDeleteDialog(false);
							}}
							onCancel={() => setOpenDeleteDialog(false)}
						/>
					</div>
					<footer className="absolute bottom-0 w-full">
						<div className="w-full h-px bg-[#E0E5E6]" />
						<div className="flex justify-end py-2 px-4">
							<Button onClick={createPluginStoreWindow}>
								Get new plugins
							</Button>
						</div>
					</footer>
				</>
			)}
		</div>
	);
}

RenderApp(<ManagePlugins />);
