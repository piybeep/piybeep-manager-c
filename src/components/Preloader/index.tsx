import React from "react";
import classNames from "classnames";
import Image from "next/image";

import s from "./Preloader.module.scss";
import Spin from "../../../public/svg/Spin.svg";

export default function Preloader(props: { show: boolean }) {
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(props.show);
	}, [props.show]);

	return (
		<div
			className={classNames(s.wrapper, {
				[s.show]: show,
			})}
		>
			<h3>
				<Image src={Spin} alt="" />
				Загрузка
			</h3>
		</div>
	);
}
