import dotenv from "dotenv";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

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
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			client_id={process.env.REACT_APP_CLIENT_ID}
			audience={process.env.REACT_APP_AUDIENCE}
			redirect_uri={window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/dashboard"}
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
