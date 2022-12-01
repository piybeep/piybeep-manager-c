import Image from "next/image";
import s from "./CellButton.module.scss";

export default function CellButton({
	text,
	icon,
	action,
}: {
	text: string;
	icon?: any;
	action?: () => void;
}) {
	return (
		<td className={s.cell_button}>
			<button onClick={action}>
				{text} {icon ? <Image src={icon} alt="" /> : ""}
			</button>
		</td>
	);
}


