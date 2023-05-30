import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
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
import PluginList from "./PluginList";
import PluginOptionsDialog from "./PluginOptionsDialog";
import { RenderApp } from "..";

function ManagePlugins() {
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState<PluginData[]>([]);

	useEffect(() => {
		document.title = "Manage Plugins";
		async function getPluginsData() {
			setLoading(true);
			setPlugins([]);
			const pluginDataRaw = await window.electronAPI.getPluginsData();

			const parsed: PluginData[] = JSON.parse(pluginDataRaw);
			// console.log(
			// 	`TCL -> file: index.tsx:54 -> getPluginsData -> parsed:`,
			// 	parsed
			// );
			setPlugins(parsed);

			setLoading(false);
		}
		getPluginsData();
	}, []);

	// const deletePlugin = (plugin: string) => {
	// 	window.electronAPI.deletePlugin({
	// 		name: plugin,
	// 	});
	// 	setPlugins((prev) => prev.filter((p) => p.id !== plugin));
	// 	setIsEnabled((prev) => {
	// 		const newIsEnabled = { ...prev };
	// 		delete newIsEnabled[plugin];
	// 		return newIsEnabled;
	// 	});
	// };
	const [windowExists, setWindowExists] = useState(false);
	const createPluginStoreWindow = () => {
		if (!windowExists) {
			setWindowExists(true);
			window.electronAPI.openInstallPluginWindow();
		}
	};

	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen((cur) => !cur);
	// const [currentPlugin, setCurrentPlugin] = useState<PluginData | null>(null);
	// const handleSave = () => {
	// 	handleOpen();
	// 	// window.electronAPI.updatePluginConfig({})
	// };
	// const handleCancel = () => {
	// 	handleOpen();
	// };

	// const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	// const handleOpenDelete = () => {
	// 	setOpenDeleteDialog((cur) => !cur);
	// };

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
									plugins.length
										? Object.values(plugins).length
										: "0"
								} plugins`}
							</Typography>
						</div>
					</header>
					<div className="w-full h-px bg-[#E0E5E6]" />
					<div className="flex flex-col px-4 py-2">
						<PluginList
							plugins={plugins}
							onTogglePlugin={(pluginID, enabled) => {
								setPlugins((prev) => {
									const newPlugins = [...prev];
									const pluginIndex = newPlugins.findIndex(
										(p) => p.id === pluginID
									);
									newPlugins[pluginIndex].config.enabled =
										enabled;
									return newPlugins;
								});
							}}
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
	// return (
	// 	<>
	// 		<div className="w-full h-full relative">
	// 			{loading ? (
	// 				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
	// 					<Spinner className="w-8 h-8" />
	// 				</div>
	// 			) : (
	// 				<>
	// 					<header className="flex flex-row justify-between px-4 pt-2">
	// 						<div className="pb-2">
	// 							<Typography
	// 								variant="h1"
	// 								className="text-2xl text-[#E0E5E6]">
	// 								{`Installed - ${
	// 									plugins.length
	// 										? Object.values(plugins).length
	// 										: "0"
	// 								} plugins`}
	// 							</Typography>
	// 						</div>
	// 					</header>
	// 					<div className="w-full h-px bg-[#E0E5E6]" />
	// 					<div className="flex flex-col px-4 py-2">
	// 						{plugins.length &&
	// 							plugins.map((plugin: PluginData, index) => (
	// 								<div
	// 									className="flex justify-between my-2 p-2 bg-[#33333B] rounded-md border-[1px] border-[#54545B]"
	// 									key={index}>
	// 									<div className="flex items-center  ml-2">
	// 										<Switch
	// 											id={`toggle-plugin-${plugin.id}`}
	// 											label={
	// 												<Typography
	// 													variant="h2"
	// 													className="text-xl text-[#E0E5E6]">
	// 													{plugin.displayName}
	// 												</Typography>
	// 											}
	// 											checked={isEnabled[plugin.id]}
	// 											onChange={() =>
	// 												handleTogglePlugin(plugin)
	// 											}
	// 											disabled={pluginLoading}
	// 										/>
	// 									</div>
	// 									<div className="flex items-center">
	// 										<Typography
	// 											variant="small"
	// 											className="text-xs text-[#666] mr-1">
	// 											{plugin.files.totalSize} B
	// 										</Typography>
	// 										<PluginMenu plugin={plugin} />
	// 									</div>
	// 									{plugin.menu && (
	// 										<PluginOptionsDialog
	// 											currentPlugin={plugin}
	// 											open={open}
	// 											handler={handleOpen}
	// 											onSave={handleSave}
	// 											onCancel={handleCancel}
	// 										/>
	// 									)}
	// 								</div>
	// 							))}
	// 					</div>
	// 					<footer className="absolute bottom-0 w-full">
	// 						<div className="w-full h-px bg-[#E0E5E6]" />
	// 						<div className="flex justify-end py-2 px-4">
	// 							<Button onClick={createPluginStoreWindow}>
	// 								Get new plugins
	// 							</Button>
	// 						</div>
	// 					</footer>
	// 				</>
	// 			)}
	// 		</div>
	// 		{/* <Dialog open={open} handler={handleOpen}>
	// 			<DialogHeader>Its a simple dialog.</DialogHeader>
	// 			<DialogBody divider>
	// 				Lorem, ipsum dolor sit amet consectetur adipisicing elit.
	// 				Accusamus ad reprehenderit omnis perspiciatis aut odit! Unde
	// 				architecto perspiciatis, dolorum dolorem iure quia saepe
	// 				autem accusamus eum praesentium magni corrupti explicabo!
	// 			</DialogBody>
	// 			<DialogFooter>
	// 				<Button
	// 					variant="text"
	// 					color="red"
	// 					onClick={handleOpen}
	// 					className="mr-1">
	// 					<span>Cancel</span>
	// 				</Button>
	// 				<Button
	// 					variant="gradient"
	// 					color="green"
	// 					onClick={handleOpen}>
	// 					<span>Confirm</span>
	// 				</Button>
	// 			</DialogFooter>
	// 		</Dialog> */}
	// 		{/* {open && (
	// 			<PluginOptionsDialog
	// 				currentPlugin={currentPlugin}
	// 				open={open}
	// 				handler={handleOpen}
	// 				onSave={handleSave}
	// 				onCancel={handleCancel}
	// 			/>
	// 		)}
	// 		{openDeleteDialog && (
	// 			<DeletePluginDialog
	// 				currentPlugin={currentPlugin}
	// 				open={openDeleteDialog}
	// 				handler={handleOpenDelete}
	// 				onDelete={() => {
	// 					deletePlugin(currentPlugin.id);
	// 					setOpenDeleteDialog(false);
	// 				}}
	// 				onCancel={() => setOpenDeleteDialog(false)}
	// 			/>
	// 		)} */}
	// 	</>
	// );
}

RenderApp(<ManagePlugins />);
