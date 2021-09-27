import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { Footer } from "./components/General";
import { Login, Register, Dashboard, Workshop, Agenda } from "./pages";

import './App.css';

const link = createHttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  link
});

export default function App() {
  return (
	<ApolloProvider client={client}>
		<Router>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/register">
				<Register />
			</Route>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Switch>
				<Route path="/workshop/:id/agenda">
	      	<Agenda />
				</Route>
				<Route path="/workshop/:id">
					<Workshop />
				</Route>
			</Switch>
			<Footer />
		</Router>
	</ApolloProvider>
  );
}
