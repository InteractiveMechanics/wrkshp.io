import dotenv from "dotenv";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import history from './utils/history';
import ApolloWrapper from './ApolloWrapper';
import { Auth0Provider } from './utils/auth';
import { Footer } from "./components/General";
import { Login, Register, Dashboard, Workshop, Agenda } from "./pages";

import './App.css';

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
		<ApolloWrapper>
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
		</ApolloWrapper>
	</Auth0Provider>
  );
}
