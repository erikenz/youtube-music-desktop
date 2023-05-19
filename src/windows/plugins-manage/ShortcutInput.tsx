import { KeyboardEvent, useEffect, useState } from "react";

import { Input } from "@material-tailwind/react";

interface ShortcutInputProps {
	onShortcutChange: (shortcut: string) => void;
	defaultValue?: string;
}

export default function ShortcutInput({
	onShortcutChange,
	defaultValue = "",
}: ShortcutInputProps) {
	const [shortcut, setShortcut] = useState<string>(defaultValue);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const { key, ctrlKey, shiftKey, altKey, metaKey } = event;
		const modifierKeys = ["Control", "Shift", "Alt", "Meta"];

		if (modifierKeys.includes(key)) {
			// Exclude the individual key press of modifier keys
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		let newShortcut = "";

		if (ctrlKey) newShortcut += "Ctrl+";
		if (shiftKey) newShortcut += "Shift+";
		if (altKey) newShortcut += "Alt+";
		if (metaKey) newShortcut += "Meta+";

		newShortcut += key;
		setShortcut(newShortcut);

		event.preventDefault();
		event.stopPropagation();
	};

	useEffect(() => {
		onShortcutChange(shortcut);
	}, [shortcut, onShortcutChange]);

	return (
		<Input
			type="text"
			value={shortcut}
			onKeyDown={handleKeyDown}
			onChange={(e) => setShortcut(e.target.value)}
			placeholder="Press a key combination..."
		/>
	);
}
