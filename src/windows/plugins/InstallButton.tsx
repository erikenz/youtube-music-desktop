import type { FetchPlugin, InstalledPlugins } from "#types/plugin";

import { Button } from "@material-tailwind/react";
import { useState } from "react";

interface InstallButtonProps {
	plugin: FetchPlugin;
	installed: InstalledPlugins;
	onInstalled: (pluginId: FetchPlugin["id"]) => void;
}
export default function InstallButton({
	plugin,
	installed,
}: InstallButtonProps) {
	const [isInstalling, setIsInstalling] = useState<boolean>(false);
	const [downloadProgress, setDownloadProgress] = useState<number>(0);
	const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);

	async function handleInstall(plugin: FetchPlugin) {
		setIsInstalling(true);
		setDownloadProgress(0);

		window.pluginAPI.installPlugin(plugin);
		window.pluginAPI.receiveDownloadProgress((data: number) => {
			console.log(
				`TCL -> file: InstallPlugins.tsx:113 -> window.pluginAPI.receiveDownloadProgress -> data:`,
				data
			);
			setDownloadProgress(data * 100);
		});
		window.pluginAPI.receiveDownloadCompleted((data: {}) => {
			console.log("download completed", data);
			setDownloadCompleted(true);
			setIsInstalling(false);
		});
	}
	function handleCancel() {
		setIsInstalling(false);
	}
	function handleDelete() {
		setDownloadCompleted(false);
		window.pluginAPI.deletePlugin(plugin);
	}

	return (
		<>
			{isInstalling ? (
				<Button
					className="relative w-24 border-[1px] border-[#444]"
					name="cancel-button"
					onClick={(e) => {
						e.stopPropagation();
						console.log("clicked cancel button");
						handleCancel();
					}}>
					<p className="z-20 relative text-white/95">Cancel</p>
					<div
						className={`bg-black/20 h-full rounded-lg absolute top-0 left-0 z-10`}
						style={{ width: `${downloadProgress}%` }}></div>
				</Button>
			) : downloadCompleted ? (
				<Button
					className="w-24"
					name="delete-button"
					onClick={(e) => {
						e.stopPropagation();
						console.log("clicked delete button");
						handleDelete();
					}}>
					Delete
				</Button>
			) : installed.includes(plugin.id) ? (
				<Button disabled>Installed</Button>
			) : (
				<Button
					className="w-24 border-[1px] border-[#444]"
					name="install-button"
					onClick={(e) => {
						e.stopPropagation();
						console.log("clicked install button");
						handleInstall(plugin);
					}}>
					Install
				</Button>
			)}
		</>
	);
}
