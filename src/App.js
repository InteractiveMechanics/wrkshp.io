import dotenv from "dotenv";
import React from "react";

import history from './utils/history';
import ApolloWrapper from './ApolloWrapper';
import { Auth0Provider } from './utils/auth';
import { AppWrapper } from "./AppWrapper";

import './App.css';

const onRedirectCallback = (appState) => {	 
	history.push(
		appState && appState.targetUrl ? appState.targetUrl : "/dashboard"
	)
}

export default function App() {	
  return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			client_id={process.env.REACT_APP_CLIENT_ID}
			audience={process.env.REACT_APP_AUDIENCE}
			redirect_uri={window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/dashboard"}
			useRefreshTokens={true}
			onRedirectCallback={onRedirectCallback}
			>
			<ApolloWrapper>
				<AppWrapper />
			</ApolloWrapper>
		</Auth0Provider>
  );
}
