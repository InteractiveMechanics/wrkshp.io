import { useState, useEffect } from "react";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { useAuth0 } from "./utils/auth";

export default  function ApolloWrapper({ children }) {
	const { isAuthenticated, getTokenSilently } = useAuth0();
	const [ bearerToken, setBearerToken ] = useState("");
	
	useEffect(() => {
		const getToken = async ()  => {
			const token = isAuthenticated ? await getTokenSilently() : "";
			setBearerToken(token);
		}
		getToken();
	}, [isAuthenticated, getTokenSilently]);
	
	const PORT = process.env.PORT || 4000;
	
	const httpLink = new HttpLink({
	  uri: `http://localhost:${PORT}/graphql`,
	  credentials: 'same-origin'
	});
	
	const authLink = setContext((_, { headers, ...rest }) => {
		if (!bearerToken) return { headers, ...rest }
		
		return {
			...rest,
			headers: {
				...headers,
				authorization: `Bearer ${bearerToken}`
			}
		}
	})
		
	const client = new ApolloClient({
	  uri: `http://localhost:${PORT}/graphql`,
	  cache: new InMemoryCache({
		  typePolicies: {
		    Agenda: {
		      fields: {
		        activities: {
		          merge(existing, incoming) {
		            return incoming;
		          },
		        },
		      },
		    },
		  },
		}),
	  link: authLink.concat(httpLink),
	});
	
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}