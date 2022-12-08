import React from "react";
import { ApolloError, gql } from "@apollo/client";
import Head from "next/head";

import client from "../../src/api/apollo-client";

import Preloader from "../../src/components/Preloader";
import Header, { HeaderProps } from "../../src/components/Header";
import Table from "../../src/components/Table";
import Footer from "../../src/components/Footer";

import Alphabet from "../../public/svg/Alphabet.svg";
import Share from "../../public/svg/Share.svg";
import Update from "../../public/svg/Update.svg";
import Status from "../../public/svg/Status.svg";

export const DATA = {
	titles: [
		{ text: "Название проекта", icon: Alphabet },
		{ text: "Ссылка", icon: Share },
		{ text: "Обновление", icon: Update },
		{ text: "Статус", icon: Status },
	],
};

export default function Projects(props: any) {
	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: [{ link: "/projects", title: "Проекты" }],
	});

	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		const _rows = props?.projects.map((pr: any) => {
			return {
				project: { id: pr.id },
				cells: [
					{ text: pr.name },
					{ text: pr.link, type: "link" },
					{ text: new Date(pr.updatedAt), type: "date" },
					{ text: pr.status, type: "enum" },
				],
			};
		});
		setRows(_rows);
	}, [props.projects]);

	const [loading, setLoading] = React.useState(props?.loading);
	const [error, setError] = React.useState(
		props.error ? JSON.parse(props.error) : null,
	);

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
				<Table titles={DATA.titles} rows={rows} />
			</main>
			<Footer />
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data, loading } = await client.query({
			query: gql`
				query {
					projects {
						id
						name
						link
						updatedAt
						status
					}
				}
			`,
			errorPolicy: "ignore",
		});

		return {
			props: {
				projects: data.projects,
				loading,
				error: null,
			},
		};
	} catch (error: any) {
		return {
			props: {
				projects: [],
				error: JSON.stringify(error),
			},
		};
	}
}

