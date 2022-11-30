import Button from "../Button";
import s from "./Table.module.scss";

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
	return (
		<table className={s.table}>
			<thead>
				<tr>
					{props.titles.map((t) => (
						<th key={t.text}>
							<span
								className={t.sort ? (t.sort === "down" ? s.down : s.up) : ""}
							>
								<Button icon={t.icon} text={t.text} />
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
										<td style={{ color: colors[cell.text] }}>{cell.text}</td>
									);
								}
								case "link": {
									return (
										<td title={cell.text}>
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
										<td title={new Date(cell.text).toLocaleString()}>
											{new Date(cell.text).toLocaleDateString()}
										</td>
									);
								}
								default: {
									return <td>{cell.text}</td>;
								}
							}
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}

