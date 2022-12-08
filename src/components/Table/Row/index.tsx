import CellButton from "./CellButton";
import CellDate from "./CellDate";
import CellLink from "./CellLink";
import CellStatus from "./CellStatus";
import CellText from "./CellText";

export default function Row({ cell }: Record<string, any>) {
	switch (cell.type) {
		case "enum":
			return <CellStatus text={cell.text} />;
		case "link":
			return <CellLink text={cell.text} />;
		case "date":
			return <CellDate date={cell.text} />;
		case "button":
			return <CellButton text={cell.text} icon={cell.icon} action={cell.action} />;
		default:
			return <CellText text={cell.text} copy={cell.copy} />;
	}
}


