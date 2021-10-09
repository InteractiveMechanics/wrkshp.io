import dotenv from "dotenv";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import history from './utils/history';
import { Auth0Provider } from './utils/auth';
import { Footer } from "./components/General";
import { Login, Register, Dashboard, Workshop, Agenda } from "./pages";

import './App.css';

const PORT = process.env.PORT || 4000;

const link = createHttpLink({
  uri: `http://localhost:${PORT}/graphql`,
  credentials: 'same-origin'
});

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
  link
});

const onRedirectCallback = (appState) => {	 
	history.push(
		appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
	)
}

export default function App() {
  return (
	<Auth0Provider
		domain="dev-4epe1avp.us.auth0.com"
		client_id="7evN3Cf0KtjvGezfZdzUxDRkcjbQUA3l"
		audience="http://workshopio-api"
		redirect_uri="http://localhost:3000"
		onRedirectCallback={onRedirectCallback}
		>
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
	</Auth0Provider>
  );
}
