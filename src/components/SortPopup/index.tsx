import s from "./SortPopup.module.scss";

import Sort from "../../../public/svg/Sort.svg";
import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

type ListItem = {
	text: string;
	color: string;
	active?: boolean;
};

export interface SortPopupProps {
	list: ListItem[];
	className: string;
	show?: boolean;
	close: () => void;
	updateList: (list: ListItem[]) => void;
}

export default function SortPopup(props: SortPopupProps) {
	const ref = React.useRef<any>();
	const router = useRouter();

	React.useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				props.close && props.close();
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [props.close]);

	const selectItem = async (text: string) => {
		const query = { ...router.query };
		if (!query.hasOwnProperty("statusFilter")) {
			await router.push({
				pathname: router.pathname,
				query: {
					statusFilter: [text],
				},
			});
		} else {
			const index = query?.statusFilter?.indexOf(text) as number;

			if (index > -1) {
				if (typeof query?.statusFilter == "object") {
					query?.statusFilter?.splice(index, 1);

					await router.replace({
						pathname: router.pathname,
						query: query,
					});
				} else {
					await router.replace({
						pathname: router.pathname,
						query: {},
					});
				}
			} else {
				if (typeof query?.statusFilter == "object") {
					query.statusFilter?.push(text);
				} else if (typeof query?.statusFilter == "string") {
					query.statusFilter = [query.statusFilter, text];
				}

				await router.replace({
					pathname: router.pathname,
					query: query,
				});
			}
		}
	};

	const searchActive = (text: string) => {
		if (router.query.hasOwnProperty("statusFilter")) {
			if (typeof router.query?.statusFilter == "object") {
				return router.query.statusFilter.includes(text);
			} else if (typeof router.query?.statusFilter == "string") {
				return router.query.statusFilter == text;
			}
		}
		return false;
	};

	return (
		<div
			className={classNames(s.sort_popup, {
				[String(props.className)]: props.className,
				"popup__show": props.show,
			})}
			ref={ref}
		>
			{/* <h4>
				<Button value={"Сортировать"} icon={Sort} className={s.button} />
			</h4> */}
			<ul className={s.list}>
				{props.list?.length
					? props.list.map((i) => {
							return (
								<li
									key={i.text}
									style={{ color: i.color }}
									onClick={() => selectItem(i.text)}
								>
									<span className={searchActive(i.text) ? s.active : ""}>
										•
									</span>{" "}
									{i.text}
								</li>
							);
					  })
					: ""}
			</ul>
		</div>
	);
}

