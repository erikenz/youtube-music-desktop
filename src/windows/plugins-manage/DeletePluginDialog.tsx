import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react";
interface DeletePluginDialogProps {
	open: boolean;
	handler: () => void;
	onDelete: () => void;
	onCancel: () => void;
}
export default function DeletePluginDialog({
	open,
	handler,
	onDelete,
	onCancel,
}: DeletePluginDialogProps) {
	return (
		<Dialog open={open} handler={handler} size="lg">
			<DialogHeader>
				Are you sure you want to delete the plugin?
			</DialogHeader>
			<DialogBody divider>
				All the plugin files and configurations will be deleted.
			</DialogBody>
			<DialogFooter className="flex justify-between">
				<Button
					variant="text"
					color="gray"
					onClick={onCancel}
					className="mr-1">
					<span>Cancel</span>
				</Button>
				<Button variant="gradient" color="red" onClick={onDelete}>
					<span>Delete</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
