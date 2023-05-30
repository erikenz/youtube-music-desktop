import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react";

import type { PluginData } from "#types/plugin";

interface DeletePluginDialogProps {
	currentPlugin: PluginData | null;
	open: boolean;
	handler: () => void;
}
export default function DeletePluginDialog({
	currentPlugin,
	open,
	handler,
}: DeletePluginDialogProps) {
	if (!currentPlugin || !currentPlugin.displayName) return null;

	const handleDelete = () => {
		window.electronAPI.deletePlugin({
			name: currentPlugin.id,
		});
	};
	return (
		<Dialog open={open} handler={handler} size="lg">
			<DialogHeader>
				{`Are you sure you want to delete the plugin "${currentPlugin.displayName}"?`}
			</DialogHeader>
			<DialogBody divider>
				All the plugin files and configurations will be deleted.
			</DialogBody>
			<DialogFooter className="flex justify-between">
				<Button
					variant="text"
					color="gray"
					onClick={handler}
					className="mr-1">
					<span>Cancel</span>
				</Button>
				<Button variant="gradient" color="red" onClick={handleDelete}>
					<span>Delete</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
