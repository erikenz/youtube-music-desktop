import {
	Card,
	CardBody,
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from "@material-tailwind/react";
import { GlobeAmericasIcon, PuzzlePieceIcon } from "@heroicons/react/24/solid";
import { createElement, useEffect, useState } from "react";

import Browse from "./Browse";
import Installed from "./Installed";
import { RenderApp } from "..";

interface ExtensionsProps {}
function Extensions({}: ExtensionsProps) {
	useEffect(() => {
		document.title = "Plugins";
	}, []);
	const data = [
		{
			label: "Installed",
			value: "installed",
			icon: PuzzlePieceIcon,
			content: <Installed />,
		},
		{
			label: "Browse",
			value: "browse",
			icon: GlobeAmericasIcon,
			content: <Browse />,
		},
	];
	return (
		<div className="p-2 flex justify-center">
			<Card className="bg-[#242424] max-w-lg">
				<CardBody className="p-4">
					<Tabs id="custom-animation" value="browse" className="">
						<TabsHeader className="bg-[#363636]">
							{data.map(({ label, value, icon }) => (
								<Tab
									key={value}
									value={value}
									className="second:bg-[#444444]">
									<div className="flex items-center gap-2 text-white">
										{createElement(icon, {
											className: "w-5 h-5",
										})}
										{label}
									</div>
								</Tab>
							))}
						</TabsHeader>
						<TabsBody
							className="bg-[#363636] rounded-md mt-2"
							animate={{
								initial: { y: 250 },
								mount: { y: 0 },
								unmount: { y: 250 },
							}}>
							{data.map(({ value, content }) => (
								<TabPanel
									key={value}
									value={value}
									className="p-0">
									{content}
								</TabPanel>
							))}
						</TabsBody>
					</Tabs>
				</CardBody>
			</Card>
		</div>
	);
}

RenderApp(<Extensions />);
