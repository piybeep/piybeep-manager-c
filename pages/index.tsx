import React from "react";
import Head from "next/head";

import Header, { HeaderProps } from "../src/components/Header";
import Footer from "../src/components/Footer";
import Table from "../src/components/Table";

import Alphabet from "../public/svg/Alphabet.svg";
import Share from "../public/svg/Share.svg";
import Update from "../public/svg/Update.svg";
import Status from "../public/svg/Status.svg";
import Spin from "../public/svg/Spin.svg";
import Image from "next/image";
import Preloader from "../src/components/Preloader";

export const DATA = {
	titles: [
		{ text: "Название проекта", icon: Alphabet },
		{ text: "Ссылка", icon: Share },
		{ text: "Обновление", icon: Update },
		{ text: "Статус", icon: Status },
	],
};

export default function Index(props: any) {
	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: [{ link: "/", title: "Проекты" }],
	});

	const [loading, setLoading] = React.useState(false);

	return (
		<>
			<Head>
				<title>Проекты - Piybeep Manager</title>
				<meta
					name="description"
					content="Страница с проектами Piybeep Manager"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Preloader show={loading} />
			<Header {...headerOptions} />
			<main className="home_page">
				<Table titles={DATA.titles} rows={props.rows} />
			</main>
			<Footer />
		</>
	);
}

export async function getServerSideProps() {
	const response = await fetch("http://localhost:3000/api/projects");
	const data = await response.json();

	return {
		props: {
			rows: data,
		},
	};
}

