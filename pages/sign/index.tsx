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
					content="Страница авторизации Piybeep Manager"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="sign__header">
				<Image alt="" src={Logo} />
				Piybeep. Сервер-менеджер.
			</header>
			<main className="sign__page">
				<Form />
			</main>
			<Footer center />
		</>
	);
}

