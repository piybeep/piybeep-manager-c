import React from "react";
import { COLORS } from "../../index";

interface CellStatusProps {
	text: string;
}

export default function CellStatus({ text }: CellStatusProps) {
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

