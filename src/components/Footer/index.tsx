import { Source_Code_Pro } from "@next/font/google";
import React from "react";
import s from "./Footer.module.scss";
import classNames from "classnames";

const SCP = Source_Code_Pro({
	weight: ["400"],
	subsets: ["cyrillic", "latin"],
});

export default function Footer(props: { center?: boolean }) {
	const [year, setYear] = React.useState(new Date().getFullYear());
	return (
		<footer
			className={classNames(s.footer, {
				[s.center]: props.center,
			})}
		>
			<span className={classNames(s.info, SCP.className)}>
				<span onClick={() => setYear((v) => ++v)}>{year}</span> piybeep. v0.0.1
			</span>
		</footer>
	);
}

