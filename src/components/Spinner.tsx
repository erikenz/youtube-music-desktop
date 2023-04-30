import type { ReactNode } from "react";
import classnames from "classnames";
import { twSize } from "#types/components";
interface ComponentProps {
	children?: ReactNode;
	cn?: string;
	color?: string;
	size?: twSize;
	border?: string | number;
}
export default function Component({
	cn,
	color,
	size,
	border,
	...props
}: ComponentProps) {
	return (
		<div className={classnames({ [`w-${size} h-${size}`]: size })}>
			<div
				className={classnames(
					"animate-spin inline-block border-current border-t-transparent rounded-full",
					{
						[`${cn}`]: cn,
						"text-blue-600": !color,
						[`text-${color}`]: color,
						"w-6 h-6": !size,
						[`w-${size} h-${size}`]: size,
						"border-[3px]": !border,
						[`border-[${border}]`]: border,
					}
				)}
				role="status"
				aria-label="loading"
				{...props}>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

// .lds-ring {
// 	display: inline-block;
// 	position: relative;
// 	width: 80px;
// 	height: 80px;
// }
// .lds-ring div {
// 	box-sizing: border-box;
// 	display: block;
// 	position: absolute;
// 	width: 64px;
// 	height: 64px;
// 	margin: 8px;
// 	border: 8px solid #000;
// 	border-radius: 50%;
// 	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
// 	border-color: #000 transparent transparent transparent;
// }
// .lds-ring div:nth-child(1) {
// 	animation-delay: -0.45s;
// }
// .lds-ring div:nth-child(2) {
// 	animation-delay: -0.3s;
// }
// .lds-ring div:nth-child(3) {
// 	animation-delay: -0.15s;
// }
// @keyframes lds-ring {
// 	0% {
// 		transform: rotate(0deg);
// 	}
// 	100% {
// 		transform: rotate(360deg);
// 	}
// }
