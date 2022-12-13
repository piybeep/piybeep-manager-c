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
import Link from "next/link";
import Router from 'next/router';

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

	console.log(props.error);
	

	return (
		<>
			<Head>
				<title>Проекты - piybeep manager</title>
				<meta
					name="description"
					content="Страница с проектами piybeep manager"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Preloader show={loading} />
			<Header {...headerOptions} />
			<main className="home_page">
				{props.error ? (
					<Table
						titles={DATA.titles}
						rows={rows}
						// add={() => alert("add")}
					/>
				) : (
					<div className="not_found__servers">
						<h2>Ошибка</h2>
						<samp>
							{typeof JSON.parse(props.error) !== "object"
								? "Неизвестная ошибка"
								: JSON.parse(props.error).message}
						</samp>
						<span>
							<span className="link" onClick={() => Router.back()}>
								Вернуться назад
							</span>{" "}
							или <Link href={"/"}>перейти на главную</Link>
						</span>
					</div>
				)}
			</main>
			<Footer />
		</>
	);
}

export async function getServerSideProps(context: any) {
	try {
		let { statusFilter } = context.query;
		if (typeof statusFilter == "string") {
			statusFilter = [statusFilter];
		}

		const { data, loading } = await client.query({
			query: gql`
				query {
					projects(${
						statusFilter?.length
							? `statusFilter: [${statusFilter.map((i: any) => `"${i}"`)}],`
							: ""
					}, statusSort: true) {
						id
						name
						link
						updatedAt
						status
					}
				}
			`,
			// errorPolicy: "ignore",
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






