import Button from "../Button";
import s from "./SortPopup.module.scss";

import Sort from "../../../public/svg/Sort.svg";

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
	return (
		<div
			className={[s.sort_popup, props.className, props.show ? "popup__show" : ""].join(
				" ",
			)}
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
