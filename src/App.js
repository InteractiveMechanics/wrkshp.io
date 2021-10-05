import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { Footer } from "./components/General";
import { Login, Register, Dashboard, Workshop, Agenda } from "./pages";

import './App.css';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
  link
});

export default function App() {
  return (
	<ApolloProvider client={client}>
		<Router>
			<Route path="/login" component={() => <Login />} />
			<Route path="/register" component={() => <Register />} />
			<Route path="/dashboard" render={() => <Dashboard />} />
			<Switch>
				<Route path="/workshop/:id/agenda" render={() => <Agenda />} />
				<Route path="/workshop/:id" render={() => <Workshop />} />
			</Switch>
			<Footer />
		</Router>
	</ApolloProvider>
  );
}
