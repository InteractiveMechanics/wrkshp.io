import React from 'react';
import { Redirect } from "react-router-dom";
import { useAuth0 } from '../../utils/auth';

import './Login.css';

export function Login(props) {  
	const activeUser = props.activeUser;
	const { isAuthenticated, loading: authLoading, loginWithRedirect, loginWithPopup, logout, user } = useAuth0();

  return (
	 	<>
		  { !isAuthenticated ? (
				<main>
					<h1>Login</h1>
					{ !isAuthenticated && (<button onClick={loginWithPopup}>Login</button>) }
					
				</main>
			) : (
				<Redirect to="/dashboard" />
			) }
		</>
  );
}
