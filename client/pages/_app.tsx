import '../scss/main.scss';
import type { AppProps } from 'next/app';
import Layout from '../src/components/Layout';
import { StateContext } from '../src/hooks/context/StateContext';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Creating a new client instance
const client = new ApolloClient({
	// setup graphql endpoint
	uri: 'http://localhost:5002',
	// store and reuse query results so it doesn't have to make as many network requests
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		// make a configured Apollo Client instance available throughout a React component tree
		<ApolloProvider client={client}>
			<StateContext>
				<Layout>
					{/* children of the layout component */}
					<Component {...pageProps} />
				</Layout>
			</StateContext>
		</ApolloProvider>
	);
}
