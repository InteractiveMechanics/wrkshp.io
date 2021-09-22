import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { Agenda, Dashboard, Footer, Workshop } from "./components/Layout";

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export default function App() {
  return (
	<ApolloProvider client={client}>
		<Router>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Route path="/workshop/:id/agenda">
	        	<Agenda />
	        </Route>
	        <Route path="/workshop/:id">
	        	<Workshop />
	        </Route>
			<Footer />
		</Router>
	</ApolloProvider>
  );
}
