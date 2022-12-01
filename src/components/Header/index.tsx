import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/svg/Logo.svg";
import Shape from "../../../public/svg/Shape.svg";
import Logout from "../../../public/svg/Logout.svg";

import s from "./Header.module.scss";
import Button from "../Button";

type NavItem = {
	title: string;
	link: string;
};

export interface HeaderProps {
	items?: NavItem[];
}

export default function Header(props: HeaderProps) {	
	return (
		<header className={s.header}>
			<span className={s.left}>
				<div className={s.logo}>
					<Image alt="" src={Logo} />
					Piybeep. Сервер-менеджер.
				</div>
				{props.items?.length ? (
					<div className={s.nav}>
						{props.items.map((v) => (
							<div key={v.link} className={s.nav_item}>
								<Image alt="" src={Shape} />
								<Link href={v.link}>{v.title}</Link>
							</div>
						))}
					</div>
				) : (
					""
				)}
			</span>
			<span className={s.right}>
				<Button icon={Logout} text="Выйти" />
			</span>
		</header>
	);
}

