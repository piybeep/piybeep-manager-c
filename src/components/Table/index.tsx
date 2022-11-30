import Button from "../Button";
import s from "./Table.module.scss";
import SortPopup from "../SortPopup";
import React from "react";

type TitleType = {
	text: string;
	icon?: any;
	sort?: "up" | "down" | false;
};

type RowType = {
	text: string;
	type?: "date" | "link" | "enum";
};

export interface TableProps {
	titles: TitleType[];
	rows: {
		project: Record<string, any>;
		cells: RowType[];
	}[];
}

export default function Table(props: TableProps) {
	const [showPopup, setShowPopup] = React.useState(false);
	const COLORS = {
		"В планах": "#8E8E8E",
		"В очереди": "#FDBB8B",
		"В разработке (приоритет)": "#FF8D8D",
		"В разработке (дизайн)": "#FF8DED",
		"В разработке": "#BF8DFF",
		"В заморозке": "#7EB2FF",
		"Поддержка": "#FFE68B",
		"Завершено": "#93FF82",
	};

	const close = () => {
		console.log("close", showPopup);

		setShowPopup((v) => !v);
	};
	return (
		<table className={s.table}>
			<SortPopup
				className={s.sort_popup}
				show={showPopup}
				close={close}
				list={[
					{ text: "В планах", color: COLORS["В планах"] },
					{ text: "В очереди", color: COLORS["В очереди"], active: true },
					{
						text: "В разработке (приоритет)",
						color: COLORS["В разработке (приоритет)"],
					},
					{
						text: "В разработке (дизайн)",
						color: COLORS["В разработке (дизайн)"],
						active: true,
					},
					{
						text: "В разработке",
						color: COLORS["В разработке"],
					},
					{
						text: "В заморозке",
						color: COLORS["В заморозке"],
					},
					{
						text: "Поддержка",
						color: COLORS["Поддержка"],
					},
					{
						text: "Завершено",
						color: COLORS["Завершено"],
						active: true,
					},
				]}
			/>
			<thead>
				<tr>
					{props.titles.map((t) => (
						<th key={t.text}>
							<span
								className={t.sort ? (t.sort === "down" ? s.down : s.up) : ""}
							>
								{t.text == "Статус" ? (
									<Button icon={t.icon} text={t.text} onClick={close} />
								) : (
									<Button icon={t.icon} text={t.text} />
								)}
							</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{props.rows.map((row) => (
					<tr key={row.project?.id}>
						{row.cells.map((cell) => {
							switch (cell.type) {
								case "enum": {
									const colors = {
										"В планах": "#8E8E8E",
										"В очереди": "#FDBB8B",
										"В разработке (приоритет)": "#FF8D8D",
										"В разработке (дизайн)": "#FF8DED",
										"В разработке": "#BF8DFF",
										"В заморозке": "#7EB2FF",
										"Поддержка": "#FFE68B",
										"Завершено": "#93FF82",
									};
									return (
										// @ts-ignore
										<td key={cell.text} style={{ color: colors[cell.text] }}>
											{cell.text}
										</td>
									);
								}
								case "link": {
									return (
										<td key={cell.text} title={cell.text}>
											<a href={cell.text} target="_blank">
												{cell.text
													.replace("https://", "")
													.replace("http://", "")}
											</a>
										</td>
									);
								}
								case "date": {
									return (
										<td
											key={cell.text}
											title={new Date(cell.text).toLocaleString()}
										>
											{new Date(cell.text).toLocaleDateString()}
										</td>
									);
								}
								default: {
									return <td key={cell.text}>{cell.text}</td>;
								}
							}
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}


