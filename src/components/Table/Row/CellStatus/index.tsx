const COLORS: Record<string, string> = {
	"В планах": "#8E8E8E",
	"В очереди": "#FDBB8B",
	"В разработке (приоритет)": "#FF8D8D",
	"В разработке (дизайн)": "#FF8DED",
	"В разработке": "#BF8DFF",
	"В заморозке": "#7EB2FF",
	"Поддержка": "#FFE68B",
	"Завершено": "#93FF82",
};

interface CellStatusProps {
	text: string;
}

export default function CellStatus({ text }: CellStatusProps) {
	return <td style={{ color: COLORS[text] }}>{text}</td>;
}
