import type { AppProps } from "next/app";
import "../src/global.scss";

import { Inter } from "@next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "../src/api/apollo-client";

const inter = Inter({
	weight: ["400", "500"],
	subsets: ["cyrillic", "latin"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
			<style jsx global>
				{`
					html {
						font-family: ${inter.style.fontFamily}, sans-serif;
					}
				`}
			</style>
		</ApolloProvider>
	);
}





