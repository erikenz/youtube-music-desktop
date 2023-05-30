import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	IconButton,
	Input,
	Typography,
} from "@material-tailwind/react";

import type { PluginData } from "#types/plugin";
import ShortcutInput from "./ShortcutInput";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface PluginOptionsDialogProps {
	currentPlugin: PluginData | null;
	open: boolean;
	onSave: () => void;
	onCancel: () => void;
	handler: () => void;
}
export default function PluginOptionsDialog({
	currentPlugin,
	open,
	onSave,
	onCancel,
	handler,
}: PluginOptionsDialogProps) {
	if (!currentPlugin || !currentPlugin.menu) return null;
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const [openUnsavedDialog, setOpenUnsavedDialog] = useState(false);
	const handleOpen = () => setOpenUnsavedDialog(!openUnsavedDialog);

	const handleShortcutChange = (shortcut: string) => {
		console.log("Shortcut changed:", shortcut);
		setUnsavedChanges(true);
		// Do something with the shortcut (e.g., store it in state, send it to the server, etc.)
	};
	const handleClose = () => {
		if (unsavedChanges) {
			// Show a dialog asking if the user wants to save their changes.
			// If they do, call onSave, otherwise call onCancel.
			setOpenUnsavedDialog(true);
		} else onCancel();
	};
	const handleCancel = () => {
		setOpenUnsavedDialog(false);
		setUnsavedChanges(false);
	};
	const handleSave = () => {
		setUnsavedChanges(false);
		setOpenUnsavedDialog(false);
		handler();
		// Save the changes
		onSave();
	};

	return (
		<>
			<Dialog
				open={open}
				handler={handler}
				size="xl"
				className="relative">
				<IconButton
					className="absolute right-0 top-0"
					variant="text"
					size="sm"
					onClick={handler}>
					<XMarkIcon
						strokeWidth={2}
						className="text-black h-4 w-4"
						title="Close"
					/>
				</IconButton>
				<DialogHeader>
					<Typography>
						{`${currentPlugin.displayName} options`}
					</Typography>
				</DialogHeader>
				<DialogBody divider className="h-[20rem] overflow-y-scroll">
					{currentPlugin.menu.map((menuItem, i) => (
						<div key={i}>
							<Typography variant="h6">
								{menuItem.label.text}
							</Typography>
							{menuItem.submenu &&
								menuItem.submenu.map((subMenuItem, j) => (
									<div key={j}>
										{subMenuItem.type === "shortcut" && (
											<ShortcutInput
												onShortcutChange={
													handleShortcutChange
												}
												defaultValue={
													subMenuItem.defaultValue
												}
											/>
										)}
									</div>
								))}
						</div>
					))}
				</DialogBody>
				<DialogFooter className="space-x-2">
					<Button
						variant="outlined"
						color="red"
						onClick={handleClose}>
						close
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</Dialog>
			<Dialog open={openUnsavedDialog} handler={handleOpen} size="lg">
				<DialogHeader>Do you want to save the changes?</DialogHeader>
				<DialogBody divider>
					Your changes will be lost if you don't save them.
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleCancel}
						className="mr-1">
						<span>Don't Save</span>
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleSave}>
						<span>Save</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
	return (
		<>
			{/* make it dark themed */}
			<Dialog open={open} handler={handler} size="xl">
				<Card>
					<CardHeader>
						{`${currentPlugin.displayName} options`}
					</CardHeader>
					<CardBody className="h-[20rem] overflow-y-scroll">
						{currentPlugin.menu.map((menuItem, i) => {
							return (
								<div key={i}>
									<Typography variant="h6">
										{menuItem.label.text}
									</Typography>
									{menuItem.submenu &&
										menuItem.submenu.map(
											(subMenuItem, j) => (
												<div key={j}>
													{subMenuItem.type ===
														"shortcut" && (
														<ShortcutInput
															onShortcutChange={
																handleShortcutChange
															}
															defaultValue={
																subMenuItem.defaultValue
															}
														/>
													)}
												</div>
											)
										)}
								</div>
							);
						})}
					</CardBody>
					<CardFooter>
						<Button
							variant="outlined"
							color="red"
							onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="gradient"
							color="green"
							onClick={handleSave}>
							Save
						</Button>
					</CardFooter>
				</Card>
				{/* <DialogHeader>{`${currentPlugin.displayName} options`}</DialogHeader>
				<DialogBody divider className="h-[20rem] overflow-y-scroll">
					{currentPlugin.menu.map((menuItem, i) => {
						return (
							<div key={i}>
								<Typography variant="h6">
									{menuItem.label.text}
								</Typography>
								{menuItem.submenu &&
									menuItem.submenu.map((subMenuItem, j) => (
										<div key={j}>
											{subMenuItem.type ===
												"shortcut" && (
												<ShortcutInput
													onShortcutChange={
														handleShortcutChange
													}
													defaultValue={
														subMenuItem.defaultValue
													}
												/>
											)}
										</div>
									))}
							</div>
						);
					})}
				</DialogBody>
				<DialogFooter className="space-x-2">
					{/* <Button variant="outlined" color="red" onClick={handleOpen}>
						close
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleOpen}>
						Save changes
					</Button> 
					<Button
						variant="outlined"
						color="red"
						onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleSave}>
						Save
					</Button>
				</DialogFooter> */}
			</Dialog>
			{/* <Dialog open={openUnsavedDialog} handler={handleOpen} size="lg">
				<DialogHeader>Do you want to save the changes?</DialogHeader>
				<DialogBody divider>
					Your changes will be lost if you don't save them.
				</DialogBody>
				<DialogFooter className="flex justify-between">
					<Button
						variant="text"
						color="red"
						onClick={handleCancel}
						className="mr-1">
						<span>Cancel</span>
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleSave}>
						<span>Save</span>
					</Button>
				</DialogFooter>
			</Dialog> */}
			<Dialog
				size="xxl"
				open={open}
				handler={handler}
				className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardHeader
						variant="gradient"
						color="blue"
						className="mt-4 mb-4 grid h-20 place-items-center">
						<Typography variant="h3" color="white">
							{`${currentPlugin.displayName} options`}
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						{currentPlugin.menu.map((menuItem, i) => {
							return (
								<div key={i}>
									<Typography variant="h6">
										{menuItem.label.text}
									</Typography>
									{menuItem.submenu &&
										menuItem.submenu.map(
											(subMenuItem, j) => (
												<div key={j}>
													{subMenuItem.type ===
														"shortcut" && (
														<ShortcutInput
															onShortcutChange={
																handleShortcutChange
															}
															defaultValue={
																subMenuItem.defaultValue
															}
														/>
													)}
												</div>
											)
										)}
								</div>
							);
						})}
					</CardBody>
					<CardFooter className="pt-0 flex justify-between">
						<Button variant="outlined" onClick={handleClose}>
							Close
						</Button>
						<Button variant="filled" onClick={handleSave}>
							Save
						</Button>
					</CardFooter>
				</Card>
			</Dialog>
		</>
	);
}
