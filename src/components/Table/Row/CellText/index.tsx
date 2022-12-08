export default function CellText({
	text,
	copy = false,
}: {
	text: string;
	copy?: boolean;
}) {
	return (
		<td>
			{copy ? (
				<span
					onClick={() => navigator.clipboard.writeText(text)}
					title={"Нажмите, чтобы скопировать"}
				>
					{text}
				</span>
			) : (
				text
			)}
		</td>
	);
}
