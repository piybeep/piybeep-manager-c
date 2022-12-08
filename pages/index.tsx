import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Index() {
	const router = useRouter();

	React.useEffect(() => {
		router.push("/projects");
	}, []);

	return (
		<>
			<Head>
				<title>Piybeep Manager</title>
				<meta
					name="description"
					content={"Огранизация и управление производственными проектами."}
				/>
				<link rel="icon" href={"/favicon.ico"} />
			</Head>
			<p>Перенаправление...</p>;
		</>
	);
}

