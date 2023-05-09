import { ReactNode, useState } from "react";

import classnames from "classnames";

interface ComponentProps {
	children?: ReactNode;
	cn?: string;
}
export default function ToggleButton({
	children,
	cn,
	...props
}: ComponentProps) {
	const [checked, setChecked] = useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};
	return (
		<div className="flex items-center">
			<button
				className={classnames(
					"rounded-xl w-10 h-6 border border-black  flex items-center",
					{
						[`justify-end bg-blue-500`]: checked,
						[`justify-start bg-gray-500`]: !checked,
					}
				)}
				onClick={handleChange}>
				<div
					className={classnames(
						"rounded-full w-[21px] h-[21px] bg-slate-100",
						{}
					)}></div>
			</button>
		</div>
	);
}
