import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";

import Preloader from "../../src/components/Preloader";
import Header, { HeaderProps } from "../../src/components/Header";
import Table from "../../src/components/Table";
import Footer from "../../src/components/Footer";

import Alphabet from "../../public/svg/Alphabet.svg";
import Share from "../../public/svg/Share.svg";
import Update from "../../public/svg/Update.svg";
import Status from "../../public/svg/Status.svg";
import client from "../../src/api/apollo-client";

export const DATA = {
	titles: [
		{ text: "Название проекта", icon: Alphabet },
		{ text: "Ссылка", icon: Share },
		{ text: "Обновление", icon: Update },
		{ text: "Статус", icon: Status },
	],
};

const PROJECTS_QUERY = (statusFilter: any) => gql`
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
			`;

export default function Projects(props: any) {
	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: [{ link: "/projects", title: "Проекты" }],
	});

	const [rows, setRows] = React.useState([]);
	const [serverData, setServerData] = React.useState<
		Record<any, any> | Record<any, any>[] | null
	>();
	const [globalError, setGlobalError] = React.useState<Record<
		any,
		any
	> | null>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [token, setToken] = React.useState<string | null>();
	// const [session, setSession] = React.useState();
	const router = useRouter();

	let { statusFilter } = router.query;
	if (typeof statusFilter == "string") {
		statusFilter = [statusFilter];
	}

	const [mutateFunction, { loading: s_loading, error: s_error }] =
		useMutation(gql`
			mutation {
				refresh {
					access_token
				}
			}
		`);

	if (!globalError && !token) {
		mutateFunction().then((res) => {
			setToken(res.data.refresh?.access_token);
		});
	}

	const {
		data: project_data,
		loading: p_loading,
		error: projects_error,
		refetch,
	} = useQuery(PROJECTS_QUERY(statusFilter), {
		context: {
			headers: {
				"authorization": token ? `Bearer ${token}` : "",
			},
		},
		errorPolicy: "ignore",
	});

	React.useLayoutEffect(() => {
		if (token) {
			refetch();
		}
	}, [token, refetch]);

	React.useLayoutEffect(() => {
		if (project_data) {
			setServerData(project_data);
		}
	}, [project_data]);

	React.useLayoutEffect(() => {
		setLoading(s_loading || p_loading);
	}, [s_loading, p_loading]);

	React.useLayoutEffect(() => {
		if (projects_error) {
			setGlobalError(projects_error);
		}
	}, [projects_error]);

	React.useEffect(() => {
		const _rows = serverData?.projects.map((pr: any) => {
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
	}, [serverData]);

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
				{!globalError ? (
					<Table
						titles={DATA.titles}
						rows={rows}
						// add={() => alert("add")}
					/>
				) : (
					<div className="not_found__servers">
						<h2>Ошибка</h2>
						{globalError && <samp>{globalError?.message}</samp>}
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

// export async function getServerSideProps(context: any) {
// 	try {
// 		let { statusFilter } = context.query;
// 		if (typeof statusFilter == "string") {
// 			statusFilter = [statusFilter];
// 		}

// 		return {
// 			props: {
// 				statusFilter,
// 			},
// 		};
// 	} catch (error: any) {
// 		return {
// 			props: {
// 				error: JSON.stringify(error),
// 			},
// 		};
// 	}
// }

