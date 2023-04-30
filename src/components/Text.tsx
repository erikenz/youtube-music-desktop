import { FC, HTMLAttributes, ReactNode } from "react";

import { Tag } from "#types/components";
import classnames from "classnames";

interface ComponentProps {
	children?: ReactNode;
	cn?: string;
	tag?: Tag;
}
export default function Text({
	children,
	cn,
	tag = "span",
	...props
}: ComponentProps) {
	const Tag: keyof JSX.IntrinsicElements = `${tag}`;
	return (
		<Tag className={classnames("", { [`${cn}`]: cn })} {...props}>
			{children}
		</Tag>
	);
}
