export default function CellDate({ date }: { date: Date }) {
	return (
		<td>
			<time title={new Date(date).toLocaleString()}>
				{new Date(date).toLocaleDateString()}
			</time>
		</td>
	);
}

