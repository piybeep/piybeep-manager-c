import type { AppProps } from "next/app";
import "../src/global.scss";

import { Inter } from "@next/font/google";

const inter = Inter({
	weight: ["400", "500"],
	subsets: ["cyrillic", "latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<style jsx global>
				{`
					html {
						font-family: ${inter.style.fontFamily}, sans-serif;
					}
				`}
			</style>
		</>
	);
}

