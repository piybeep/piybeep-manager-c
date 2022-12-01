import Image from "next/image";
import s from "./CellButton.module.scss";

export default function CellButton({
	text,
	icon,
}: {
	text: string;
	icon?: any;
}) {
	return (
		<td className={s.cell_button}>
			<button>
				{text} {icon ? <Image src={icon} alt="" /> : ""}
			</button>
		</td>
	);
}
