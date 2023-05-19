import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Dialog,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemSuffix,
	Progress,
	Spinner,
	Typography,
} from "@material-tailwind/react";
import {
	Cog6ToothIcon,
	EllipsisHorizontalIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

import type { PluginGitHub } from "#types/plugin";
import { RenderApp } from "..";

// import { ipcRenderer } from "electron";

// ipcRenderer.on("download-progress", (event, progress) => {
// 	console.log(
// 		`TCL -> file: InstallPlugins.tsx:29 -> ipcRenderer.on -> event:`,
// 		event
// 	);

// 	console.log(
// 		`TCL -> file: InstallPlugins.tsx:32 -> ipcRenderer.on -> progress:`,
// 		progress
// 	);
// });

function InstallPlugins() {
	const [loading, setLoading] = useState(true);
	const [plugins, setPlugins] = useState<PluginGitHub[]>([]);
	useEffect(() => {
		document.title = "Install Plugins";
		async function fetchPlugins() {
			setLoading(true);
			const remotePlugins = await window.electronAPI.getRemotePlugins();
			console.log(
				`TCL -> file: InstallPlugins.tsx:50 -> fetchPlugins -> remotePlugins:`,
				remotePlugins
			);
			if (remotePlugins.length > 0) {
				setPlugins(remotePlugins);
			} else {
				const res = await window.electronAPI.fetchPlugins();

				console.log(
					`TCL -> file: InstallPlugins.tsx:13 -> useEffect -> res:`,
					res
				);
				window.electronAPI.storeRemotePlugins(res);
				setPlugins(res);
			}
			setLoading(false);
		}
		fetchPlugins();
	}, []);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const [currentPlugin, setCurrentPlugin] = useState<PluginGitHub | null>(
		null
	);
	const PluginOptionsDialog = () => {
		if (!currentPlugin) return null;

		return (
			<Dialog
				size="xxl"
				open={open}
				handler={handleOpen}
				className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardHeader
						variant="gradient"
						color="blue"
						className="mt-4 mb-4 grid h-20 place-items-center">
						<Typography variant="h3" color="white">
							{currentPlugin.name} details
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="-ml-2.5">
							<Checkbox label="Remember Me" />
						</div>
						<Typography>{currentPlugin.size}</Typography>
					</CardBody>
					<CardFooter className="pt-0 flex justify-between">
						<Button variant="outlined" onClick={handleOpen}>
							Cancel
						</Button>
						<InstallButton plugin={currentPlugin} />
					</CardFooter>
				</Card>
			</Dialog>
		);
	};

	const InstallButton = ({ plugin }: { plugin: PluginGitHub }) => {
		const [isInstalling, setIsInstalling] = useState<boolean>(false);
		const [downloadProgress, setDownloadProgress] = useState<number>(0);
		const [downloadCompleted, setDownloadCompleted] =
			useState<boolean>(false);

		// let interval: any;
		// useEffect(() => {
		// 	if (isInstalling) {
		// 		interval = setInterval(() => {
		// 			// console.log(downloadProgress);
		// 			setDownloadProgress(downloadProgress + 1);
		// 		}, 100);
		// 		return () => {
		// 			clearInterval(interval);
		// 		};
		// 	}
		// }, [isInstalling, downloadProgress]);
		async function handleInstall(plugin: PluginGitHub) {
			console.log(
				`TCL -> file: InstallPlugins.tsx:105 -> handleInstall -> plugin:`,
				plugin
			);
			setIsInstalling(true);
			setDownloadProgress(0);

			// setTimeout(() => {
			// 	setIsInstalling(false);
			// 	clearInterval(interval);
			// 	setDownloadCompleted(true);
			// }, 10000);
			// useEffect(() => {
			// 	if (downloadProgress < 100) {
			// 		const timeout = setTimeout(() => {
			// 			setDownloadProgress(downloadProgress + 5);
			// 		}, 1000);
			// 		return () => {
			// 			clearTimeout(timeout);
			// 		};
			// 	} else {
			// 		// setDownloadProgress(0);
			// 		// setIsInstalling(false);
			// 	}
			// }, [downloadProgress]);

			await window.electronAPI.downloadPlugin(plugin);
			window.electronAPI.receiveDownloadProgress((data: number) => {
				console.log(
					`TCL -> file: InstallPlugins.tsx:113 -> window.electronAPI.receiveDownloadProgress -> data:`,
					data
				);
				setDownloadProgress(data * 100);
			});
			window.electronAPI.receiveDownloadCompleted((data: {}) => {
				console.log("download completed", data);
				setDownloadCompleted(true);
				setIsInstalling(false);
			});
		}
		function handleCancel() {
			setIsInstalling(false);
			// clearInterval(interval);
		}
		function handleDelete() {
			setDownloadCompleted(false);
			window.electronAPI.deletePlugin(plugin);
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
							// handleInstall(plugin);
							handleCancel();
						}}>
						<p className="z-20 relative text-white/95">Cancel</p>
						<div
							className={`bg-black/20 h-full rounded-lg absolute top-0 left-0 z-10`}
							style={{ width: `${downloadProgress}%` }}

							// style={{
							// 	width: `${downloadProgress * 100}%`,
							// }}
						></div>
					</Button>
				) : downloadCompleted ? (
					<Button
						className="w-24"
						name="delete-button"
						onClick={(e) => {
							e.stopPropagation();
							console.log("clicked delete button");
							// handleInstall(plugin);
							handleDelete();
						}}>
						Delete
					</Button>
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
	};
	return (
		<div className="w-full h-full relative">
			{loading ? (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Spinner className="w-8 h-8" />
				</div>
			) : (
				<>
					<header className="flex flex-row justify-between px-4 py-2">
						<div className="flex items-center">
							<Typography
								variant="h1"
								className="text-2xl text-[#E0E5E6]">
								{`All Plugins - ${
									Object.values(plugins).length
								} items`}
							</Typography>
						</div>
						<div className="flex items-center">
							<Input
								type="search"
								placeholder="Search..."></Input>
						</div>
					</header>
					<div className="w-full h-px bg-[#E0E5E6]" />
					{plugins.length > 0 ? (
						<>
							<List className="flex flex-col px-4 py-2">
								{plugins.map((plugin: PluginGitHub, index) => (
									<ListItem
										onClick={() => {
											console.log("clicked plugin item");
											setCurrentPlugin(plugin);
											handleOpen();
										}}
										className="flex justify-between my-2 p-2 bg-[#33333B] rounded-md border-[1px] border-[#54545B]"
										key={index}>
										<div className="flex flex-col justify-center ml-2">
											<Typography className="text-[#E0E5E6]">
												{plugin.name}
											</Typography>
											<Typography variant="small">
												description
											</Typography>
										</div>
										<ListItemSuffix>
											<InstallButton plugin={plugin} />
										</ListItemSuffix>
									</ListItem>
								))}
							</List>
							<PluginOptionsDialog />
						</>
					) : (
						<Typography variant="h2" color="red">
							Couldn't fetch plugins
						</Typography>
					)}
				</>
			)}
		</div>
	);
}

RenderApp(<InstallPlugins />);
