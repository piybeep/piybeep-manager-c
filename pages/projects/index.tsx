import React from "react";
import { useRouter } from "next/router";

export default function Projects() {
	const router = useRouter();

	React.useEffect(() => {
		router.push("/");
	}, []);

	return <p>Перенаправление...</p>;
}

