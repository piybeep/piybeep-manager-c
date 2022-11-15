import Head from "next/head";

export default function Home() {
	return (
		<section
			style={{
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				padding: 20,
				flexDirection: "column",
			}}
		>
			<Head>
				<title>Piybeep Manager</title>
				<meta name="description" content="Piybeep Manager Panel" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<samp>[В разарботке]</samp>
			<a href="https://piybeep.com" target="_blank">
				piybeep
			</a>
		</section>
	);
}
