import Head from "next/head";
import Image from "next/image";

import Footer from "../../src/components/Footer";

import Logo from "../../public/svg/Logo.svg";
import Form from "../../src/components/Form";

export default function SignPage() {
	return (
		<>
			<Head>
				<title>Авторизация</title>
				<meta
					name="description"
					content="Страница авторизации piybeep manager"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header
				className="sign__header"
				style={{
					cursor: "default",
				}}
			>
				<Image alt="" src={Logo} />
				piybeep. Панель управления.
			</header>
			<main className="sign__page">
				<Form />
			</main>
			<Footer center />
		</>
	);
}


