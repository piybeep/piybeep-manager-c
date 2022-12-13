import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let token: string | null;

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "include",
});

const authLink = setContext((_, { headers }) => {
	// const token = localStorage.getItem("token");
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	ssrMode: typeof window === "undefined",
	connectToDevTools: true,
});

export default client;

