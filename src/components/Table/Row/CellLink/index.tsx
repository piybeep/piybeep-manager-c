export default function CellLink({ text }: { text: string }) {
	return (
		<td title={text}>
			<a href={text} target="_blank" rel="noreferrer">
				{text.replace("https://", "").replace("http://", "")}
			</a>
		</td>
	);
}
