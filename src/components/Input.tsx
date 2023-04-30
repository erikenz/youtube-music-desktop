import { InputHTMLAttributes } from "react";
import type { ReactNode } from "react";
import classnames from "classnames";

interface ComponentProps extends InputHTMLAttributes<HTMLInputElement> {
	children?: ReactNode;
	cn?: string;
	label?: string;
	name?: string;
}
export default function Component({
	children,
	cn,
	name,
	label,
	placeholder,
	type = "text",
	...props
}: ComponentProps) {
	return (
		<div className={classnames("", { [`${cn}`]: cn })} {...props}>
			<label htmlFor={name}>{label}</label>
			<input id={name} type={type} placeholder={placeholder} {...props} />
			{children}
		</div>
	);
}
