import React from "react";

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
	// const [viewText, setViewText] = React.useState(text);
	switch (text) {
		case "IN_PLANS": {
			text = "В планах";
			break;
		}
		case "IN_QUEUE": {
			text = "В очереди";
			break;
		}
		case "IN_DEVELOPMENT_PRIORITY": {
			text = "В разработке (приоритет)";
			break;
		}
		case "IN_DEVELOPMENT_DESIGN": {
			text = "В разработке (дизайн)";
			break;
		}
		case "IN_DEVELOPMENT": {
			text = "В разработке";
			break;
		}
		case "FROZEN": {
			text = "В заморозке";
			break;
		}
		case "SUPPORT": {
			text = "Поддержка";
			break;
		}
		case "COMPLITED": {
			text = "Завершено";
			break;
		}
	}
	return <td style={{ color: COLORS[text] }}>{text}</td>;
}

