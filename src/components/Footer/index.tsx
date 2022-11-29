import { Source_Code_Pro } from "@next/font/google";
import React from "react";
import s from "./Footer.module.scss";

const SCP = Source_Code_Pro({
	weight: ["400"],
	subsets: ["cyrillic", "latin"],
});

export default function Footer() {
	const [year, setYear] = React.useState(new Date().getFullYear());
	return (
		<footer className={s.footer}>
			<span className={[s.info, SCP.className].join(" ")}>
				<span onClick={() => setYear((v) => ++v)}>{year}</span> piybeep. v0.0.1
			</span>
		</footer>
	);
}

