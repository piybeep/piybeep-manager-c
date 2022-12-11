import Head from "next/head";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header/index";
import Router from "next/router";
import Link from "next/link";
export default function NotFound() {
	return (
		<>
			<Head>
				<title>Страница не найдена - piybeep manager</title>
			</Head>
			<Header />
			<main>
				<div className="not_found">
					<h2>Запрашиваемая страница не найдена :(</h2>
					<button className="not_found__btn" onClick={() => Router.back()}>
						Вернуться назад
					</button>
					<span>
						или <Link href={"/"}>перейти на главную</Link>
					</span>
				</div>
			</main>
			<Footer />
		</>
	);
}
