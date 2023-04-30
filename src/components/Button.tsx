import type { ButtonHTMLAttributes, ReactNode } from "react";

import classnames from "classnames";
interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	cn?: string;
	icon?: ReactNode; // button is only an icon
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}
export default function Button({ children, cn, ...props }: ComponentProps) {
	return (
		<div>
			<button className={classnames("", { [`${cn}`]: cn })} {...props}>
				{children}
			</button>
		</div>
	);
}
