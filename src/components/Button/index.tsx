import Image from "next/image";
import s from './Button.module.scss'

export default function Button({ icon, text, ...props }: Record<any, any>) {
	return (
		<button {...props} className={[props.className, s.button].join(" ")}>
			{text}
			{icon ? <Image alt="" src={icon} /> : ""}
		</button>
	);
}
