import Button from "../Button";
import s from "./SortPopup.module.scss";

import Sort from "../../../public/svg/Sort.svg";
import React from "react";

type ListItem = {
	text: string;
	color?: string;
	active?: boolean;
};

export interface SortPopupProps {
	list: ListItem[];
	className: string;
	show?: boolean;
	close?: any;
}

export default function SortPopup(props: SortPopupProps) {
	const ref = React.useRef<any>();

	React.useEffect(() => {
		const handleClickOutside = (event: any) => {
			console.log(event);

			if (ref.current && !ref.current.contains(event.target)) {
				// if (event.target.innerText != "Статус")
				// props.close && props.close();
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [props.close]);

	return (
		<div
			className={[
				s.sort_popup,
				props.className,
				props.show ? "popup__show" : "",
			].join(" ")}
			ref={ref}
		>
			<h4>
				<Button text={"Сортировать"} icon={Sort} className={s.button} />
			</h4>
			<ul className={s.list}>
				{props.list?.length
					? props.list.map((i) => {
							return (
								<li key={i.text} style={{ color: i.color }}>
									<span className={i.active ? s.active : ""}>•</span> {i.text}
								</li>
							);
					  })
					: ""}
			</ul>
		</div>
	);
}
