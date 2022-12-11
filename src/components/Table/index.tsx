import Button from "../Button";
import s from "./Table.module.scss";
import SortPopup from "../SortPopup";
import React from "react";
import Router from "next/router";
import Row from "./Row";

type TitleType = {
	text: string;
	icon?: any;
	sort?: "up" | "down" | false;
};

export type RowType = {
	text: string;
	type?: "date" | "link" | "enum" | "button";
	action?: () => void;
	icon?: any;
};

export interface TableProps {
	titles: TitleType[];
	rows: {
		project: Record<string, any>;
		cells: RowType[];
	}[];
}

export const COLORS: Record<string, string> = {
	"В планах": "#8E8E8E",
	"В очереди": "#FDBB8B",
	"В разработке (приоритет)": "#FF8D8D",
	"В разработке (дизайн)": "#FF8DED",
	"В разработке": "#BF8DFF",
	"В заморозке": "#7EB2FF",
	"Поддержка": "#FFE68B",
	"Завершено": "#93FF82",
};

export default function Table(props: TableProps) {
	const [showPopup, setShowPopup] = React.useState(false);

	const close = () => setShowPopup(false);

	const [popupList, setPopupList] = React.useState([
		{ text: "В планах", color: COLORS["В планах"] },
		{ text: "В очереди", color: COLORS["В очереди"] },
		{
			text: "В разработке (приоритет)",
			color: COLORS["В разработке (приоритет)"],
		},
		{
			text: "В разработке (дизайн)",
			color: COLORS["В разработке (дизайн)"],
		},
		{ text: "В разработке", color: COLORS["В разработке"] },
		{ text: "В заморозке", color: COLORS["В заморозке"] },
		{ text: "Поддержка", color: COLORS["Поддержка"] },
		{ text: "Завершено", color: COLORS["Завершено"] },
	]);

	console.log(props);

	return (
		<div className={s.table_wrapper}>
			<SortPopup
				className={s.sort_popup}
				show={showPopup}
				close={close}
				list={popupList}
				updateList={(payload) => setPopupList(payload)}
			/>
			<table>
				<thead>
					<tr>
						{props.titles?.map((t) => (
							<th key={t.text}>
								<span
									className={t.sort ? (t.sort === "down" ? s.down : s.up) : ""}
								>
									{t.text === "Статус" ? (
										<Button
											icon={t.icon}
											value={t.text}
											onClick={() => {
												setShowPopup(true);
											}}
										/>
									) : (
										<Button icon={t.icon} value={t.text} disabled />
									)}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.rows?.map((row, index) => (
						<tr
							key={index}
							onClick={(e: any) => {
								e.target.tagName !== "A" &&
									Router.push("/projects/" + row.project?.id);
							}}
						>
							{row.cells?.map((cell) => (
								<Row key={cell.text} cell={cell} />
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

