export default function CellLink({ text }: { text: string }) {
	return (
		<td>
			{text ? (
				<a href={text} target="_blank" rel="noreferrer" title={text}>
					{text.replace("https://", "").replace("http://", "")}
				</a>
			) : (
				"Отсутствует"
			)}
		</td>
	);
}

