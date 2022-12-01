import React from "react";
import Head from "next/head";

import Header, { HeaderProps } from "../src/components/Header";
import Footer from "../src/components/Footer";
import Table from "../src/components/Table";

import Alphabet from "../public/svg/Alphabet.svg";
import Share from "../public/svg/Share.svg";
import Update from "../public/svg/Update.svg";
import Status from "../public/svg/Status.svg";
import { TableProps } from '../src/components/Table/index';

export const DATA: TableProps = {
	titles: [
		{ text: "Название проекта", icon: Alphabet },
		{ text: "Ссылка", icon: Share },
		{ text: "Обновление", icon: Update },
		{ text: "Статус", icon: Status },
	],
	rows: [
		{
			project: { id: 1 },
			cells: [
				{ text: "piybeep" },
				{ text: "https://piybeep.com", type: "link" },
				{ text: "2022.01.10 12:32", type: "date" },
				{ text: "В разработке", type: "enum" },
			],
		},
		{
			project: { id: 2 },
			cells: [
				{ text: "IKT54" },
				{ text: "https://ikt54.ru", type: "link" },
				{ text: "2022.11.15 12:32", type: "date" },
				{ text: "Поддержка", type: "enum" },
			],
		},
		{
			project: { id: 3 },
			cells: [
				{ text: "Gate 2025" },
				{ text: "http://176.57.208.229", type: "link" },
				{ text: "2022.08.20 12:32:10", type: "date" },
				{ text: "Завершено", type: "enum" },
			],
		},
	],
};

export default function Index() {
	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: [{ link: "/", title: "Проекты" }],
	});
	return (
		<>
			<Head>
				<title>Piybeep Manager</title>
				<meta name="description" content="Piybeep Manager Panel" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header {...headerOptions} />
			<main className="home_page">
				<Table
					titles={DATA.titles}
					rows={DATA.rows}
				/>
			</main>
			<Footer />
		</>
	);
}




