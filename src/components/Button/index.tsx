import React from "react";
import Image from "next/image";

import s from "./Button.module.scss";
import classNames from "classnames";

export interface ButtonProps
	extends React.DetailedHTMLProps<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		React.AriaAttributes {
	value: string;
	icon?: any;
}

export default function Button({ icon = null, value, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={classNames(s.button, {
				[String(props.className)]: props.className,
				[s.disabled]: props.disabled,
			})}
		>
			{value}
			{icon ? <Image alt="" src={icon} /> : ""}
		</button>
	);
}

