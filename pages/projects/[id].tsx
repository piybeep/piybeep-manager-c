import Head from "next/head";
import React from "react";

import Footer from "../../src/components/Footer";
import Header, { HeaderProps } from "../../src/components/Header";
import Table from "../../src/components/Table";

import Alphabet from "../../public/svg/Alphabet.svg";
import Share from "../../public/svg/Share.svg";
import Update from "../../public/svg/Update.svg";
import Status from "../../public/svg/Status.svg";
import Upload from "../../public/svg/Upload.svg";
import client from "../../src/api/apollo-client";
import { gql } from "@apollo/client";

export default function ProjectItem(props: any) {
	const { project } = props?.servers[0];
	const projectName = project?.name ?? undefined;

	const [navItems, setNavItems] = React.useState<HeaderProps["items"]>([
		{ link: "/projects", title: "Проекты" },
	]);

	if (navItems?.length == 1 && project?.id) {
		setNavItems((i) => {
			i?.push({
				link: "/projects/" + project?.id,
				title: projectName,
			});
			return i;
		});
	}

	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		const _rows = props?.servers?.map((sr: any) => {
			return {
				server: { id: sr.id },
				project: { id: sr.project.id },
				cells: [
					{ text: sr.name },
					{ text: sr.ip, copy: true },
					{ text: new Date(sr.updatedAt), type: "date" },
					{
						text: "Загрузить",
						type: "button",
						icon: Upload,
						action: () => alert("in dev"),
					},
				],
			};
		});
		setRows(_rows);
	}, [props.servers]);

	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: navItems,
	});

	return (
		<>
			<Head>
				<title>
					{projectName ? projectName + " - piybeep manager" : "piybeep manager"}
				</title>
				<meta name="description" content={"Страница проекта " + projectName} />
				<link rel="icon" href={"/favicon.ico"} />
			</Head>
			<Header {...headerOptions} />
			<main className="home_page">
				{props.servers?.length ? (
					<Table
						titles={[
							{ text: "Название сервера", icon: Alphabet },
							{ text: "IP-адрес", icon: Share },
							{ text: "Обновление", icon: Update },
							{ text: "Загрузка", icon: Status },
						]}
						rows={rows}
					/>
				) : (
					<p>Не найдено</p>
				)}
			</main>
			<Footer />
		</>
	);
}

export async function getServerSideProps(context: any) {
	try {
		const { data, loading } = await client.query({
			query: gql`
				query {
					servers(projectId: ${context.params.id}) {
						id
						name
						ip
						updatedAt
						project {
							id
							name
						}
					}
				}
			`,
			errorPolicy: "ignore",
		});

		if (!data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				servers: data.servers,
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



