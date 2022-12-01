import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import Footer from "../../src/components/Footer";
import Header, { HeaderProps } from "../../src/components/Header";
import Table from "../../src/components/Table";

import Alphabet from "../../public/svg/Alphabet.svg";
import Share from "../../public/svg/Share.svg";
import Update from "../../public/svg/Update.svg";
import Status from "../../public/svg/Status.svg";
import Upload from "../../public/svg/Upload.svg";

import { DATA } from "../index";

export default function ProjectItem() {
	const { query } = useRouter();
	const project = DATA.rows.find(
		(i) => Number(i.project?.id) === Number(query?.id),
	);

	const [projectName, setProjectName] = React.useState<string>();

	const [navItems, setNavItems] = React.useState<HeaderProps["items"]>([
		{ link: "/", title: "Проекты" },
	]);

	if (navItems?.length == 1 && project?.project?.id) {
		setNavItems((i) => {
			i!.push({
				link: "/projects/" + project.project?.id,
				title: project.cells[0].text,
			});
			return i;
		});
	}

	React.useEffect(() => {
		setProjectName(project?.cells[0].text);
	}, [project?.cells[0].text]);

	const [headerOptions, setHeaderOptions] = React.useState<HeaderProps>({
		items: navItems,
	});

	return (
		<>
			<Head>
				<title>Piybeep Manager - {projectName}</title>
				<meta name="description" content="Piybeep Manager Panel" />
				<link rel="icon" href={"/favicon.ico"} />
			</Head>
			<Header {...headerOptions} />
			<main className="home_page">
				<Table
					titles={[
						{ text: "Название сервера", icon: Alphabet },
						{ text: "IP-адрес", icon: Share },
						{ text: "Обновление", icon: Update },
						{ text: "Загрузка", icon: Status },
					]}
					rows={[
						{
							project: { id: 1 },
							cells: [
								{ text: "Сервер #1" },
								{ text: "176.57.208.229" },
								{ text: "2022.01.10 12:32", type: "date" },
								{ text: "Загрузить", type: "button", icon: Upload },
							],
						},
						{
							project: { id: 1 },
							cells: [
								{ text: "Сервер #2" },
								{ text: "176.57.208.229" },
								{ text: "2022.11.15 12:32", type: "date" },
								{ text: "Загрузить", type: "button", icon: Upload },
							],
						},
						{
							project: { id: 1 },
							cells: [
								{ text: "Сервер #3" },
								{ text: "176.57.208.229" },
								{ text: "2022.08.20 12:32:10", type: "date" },
								{ text: "Загрузить", type: "button", icon: Upload },
							],
						},
					]}
				/>
			</main>
			<Footer />
		</>
	);
}

