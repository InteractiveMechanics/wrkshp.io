import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { Login, Register, Dashboard, Footer, Workshop } from "./components/Layout";

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
	        <Route path="/workshop/:id">
	        	<Workshop />
	        </Route>
	        
			<Footer />
		</Router>
	</ApolloProvider>
  );
}
