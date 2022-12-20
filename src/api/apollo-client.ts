import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
	uri: "http://localhost:5000/graphql",
	credentials: "include",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	ssrMode: typeof window === "undefined",
	connectToDevTools: true,
});

export default client;

