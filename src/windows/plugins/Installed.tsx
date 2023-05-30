import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	Card,
	IconButton,
	List,
	ListItem,
	ListItemSuffix,
} from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import type { PluginData } from "#types/plugin";

export default function Installed() {
	const [open, setOpen] = useState(0);

	const handleOpen = (value: number) => {
		setOpen(open === value ? 0 : value);
	};
	const [plugins, setPlugins] = useState<PluginData[]>([]);
	useEffect(() => {}, []);
	return (
		<>
			{plugins.map((plugin, index) => (
				<Accordion
					open={open === index}
					icon={
						open === index ? (
							<ChevronDownIcon />
						) : (
							<ChevronRightIcon />
						)
					}>
					<AccordionHeader onClick={() => handleOpen(index)}>
						What is Material Tailwind?
					</AccordionHeader>
					<AccordionBody>
						We&apos;re not always in the position that we want to be
						at. We&apos;re constantly growing. We&apos;re constantly
						making mistakes. We&apos;re constantly trying to express
						ourselves and actualize our dreams.
					</AccordionBody>
				</Accordion>
			))}
		</>
	);
}
