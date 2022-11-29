import type { AppProps } from "next/app";

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
					* {
						box-sizing: border-box;
					}
					html {
						font-family: ${inter.style.fontFamily}, sans-serif;
					}
					body,
					#__next {
						margin: 0;
						background: #100f13;
						color: #dcdcdc;
						height: 100vh;
						display: flex;
						flex-direction: column;
					}
					header,
					footer {
						flex: 0 0 auto;
					}

					main {
						flex: 1 0 auto;
					}
				`}
			</style>
		</>
	);
}


