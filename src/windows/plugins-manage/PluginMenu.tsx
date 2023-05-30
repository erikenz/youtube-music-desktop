import {
	Cog6ToothIcon,
	EllipsisHorizontalIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import {
	IconButton,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
} from "@material-tailwind/react";

import DeletePluginDialog from "./DeletePluginDialog";
import type { PluginData } from "#types/plugin";
import PluginOptionsDialog from "./PluginOptionsDialog";
import { useState } from "react";

interface PluginMenuProps {
	plugin: PluginData;
}
export default function PluginMenu({ plugin }: PluginMenuProps) {
	const [openPluginConfig, setOpenPluginConfig] = useState(false);
	const [openPluginDelete, setOpenPluginDelete] = useState(false);
	const handleConfigDialog = () => setOpenPluginConfig((prev) => !prev);
	const handleDeleteDialog = () => setOpenPluginDelete((prev) => !prev);
	const handleConfigSave = () => {
		setOpenPluginConfig(false);
	};
	const handleConfigCancel = () => {
		setOpenPluginConfig(false);
	};
	return (
		<>
			<Menu placement="bottom-start">
				<MenuHandler>
					<IconButton variant="text" size="sm" color="gray">
						<EllipsisHorizontalIcon className="h-6 w-6 text-[#E0E5E6]" />
					</IconButton>
				</MenuHandler>
				<MenuList className="bg-[#33333B] text-[#E0E5E6]">
					{plugin.menu && (
						<MenuItem className="flex" onClick={handleConfigDialog}>
							<Cog6ToothIcon className="w-4 h-4 mr-2" /> Options
						</MenuItem>
					)}
					<MenuItem className="flex" onClick={handleDeleteDialog}>
						<TrashIcon className="w-4 h-4 mr-2" /> Delete
					</MenuItem>
				</MenuList>
			</Menu>
			<PluginOptionsDialog
				currentPlugin={plugin}
				open={openPluginConfig}
				handler={handleConfigDialog}
				onSave={handleConfigSave}
				onCancel={handleConfigCancel}
			/>
			<DeletePluginDialog
				currentPlugin={plugin}
				open={openPluginDelete}
				handler={handleDeleteDialog}
			/>
		</>
	);
}

// const PluginMenu = ({ plugin }: { plugin: PluginData }) => {
// 	return (
// 		<Menu placement="bottom-start">
// 			<MenuHandler>
// 				<IconButton variant="text" size="sm" color="gray">
// 					<EllipsisHorizontalIcon className="h-6 w-6 text-[#E0E5E6]" />
// 				</IconButton>
// 			</MenuHandler>
// 			<MenuList className="bg-[#33333B] text-[#E0E5E6]">
// 				{plugin.menu && (
// 					<MenuItem
// 						className="flex"
// 						onClick={() => {
// 							setCurrentPlugin(plugin);
// 							handleOpen();
// 						}}>
// 						<Cog6ToothIcon className="w-4 h-4 mr-2" /> Options
// 					</MenuItem>
// 				)}
// 				<MenuItem
// 					className="flex"
// 					onClick={() => {
// 						setCurrentPlugin(plugin);
// 						handleOpenDelete();
// 					}}>
// 					<TrashIcon className="w-4 h-4 mr-2" /> Delete
// 				</MenuItem>
// 			</MenuList>
// 		</Menu>
// 	);
// };
