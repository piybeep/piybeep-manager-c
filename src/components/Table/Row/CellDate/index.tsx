export default function CellDate({ date }: { date: Date }) {
	return (
		<td title={new Date(date).toLocaleString()}>
			{new Date(date).toLocaleDateString()}
		</td>
	);
}
